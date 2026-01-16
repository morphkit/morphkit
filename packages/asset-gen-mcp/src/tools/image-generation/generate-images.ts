import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { writeFile, unlink, mkdir, readFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";
import { vectorize } from "@neplex/vectorizer";
import {
  generateImageWithImagen,
  chunkArray,
  type ReferenceImage,
} from "./imagen-client.js";

const BATCH_SIZE = 10;

const VECTORIZER_COLOR_MODE_COLOR = 0;
const VECTORIZER_HIERARCHICAL_STACKED = 0;
const VECTORIZER_PATH_SIMPLIFY_MODE_SPLINE = 2;

const requestSchema = z.object({
  outputPath: z.string(),
  extension: z.enum(["png", "svg", "webp", "jpeg"]),
  prompt: z.string().min(1).max(2000),
  images: z
    .array(z.string())
    .optional()
    .describe(
      "Optional reference images as file paths or URLs. The tool handles base64 encoding internally.",
    ),
});

const inputSchema = z.object({
  requests: z.array(requestSchema).min(1),
  model: z
    .enum([
      "imagen-4.0-ultra-generate-001",
      "imagen-4.0-generate-001",
      "imagen-4.0-fast-generate-001",
    ])
    .optional()
    .default("imagen-4.0-generate-001")
    .describe(
      "Model selection: imagen-4.0-ultra (highest quality, slowest), imagen-4.0 (default, balanced quality/speed/cost), imagen-4.0-fast (fastest, for prototyping)",
    ),
});

type Input = z.infer<typeof inputSchema>;
type ImageRequest = z.infer<typeof requestSchema>;

interface GenerationResult {
  outputPath: string;
  success: boolean;
  error?: string;
}

async function resolveImageToBase64(imageSource: string): Promise<string> {
  if (imageSource.startsWith("http://") || imageSource.startsWith("https://")) {
    const response = await fetch(imageSource);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer).toString("base64");
  }

  const absolutePath = imageSource.startsWith("/")
    ? imageSource
    : join(process.cwd(), imageSource);

  await access(absolutePath);
  const fileBuffer = await readFile(absolutePath);
  return fileBuffer.toString("base64");
}

async function processImageRequest(
  request: ImageRequest,
  model: Input["model"],
): Promise<GenerationResult> {
  try {
    let referenceImages: ReferenceImage[] | undefined;
    if (request.images && request.images.length > 0) {
      referenceImages = await Promise.all(
        request.images.map(async (src) => ({
          imageBytes: await resolveImageToBase64(src),
        })),
      );
    }

    const { imageData } = await generateImageWithImagen({
      prompt: request.prompt,
      model,
      referenceImages,
    });

    await mkdir(dirname(request.outputPath), { recursive: true });

    if (request.extension === "svg") {
      const tempPngPath = `${request.outputPath}.temp.png`;

      const optimizedPng = await sharp(imageData)
        .png({ compressionLevel: 9 })
        .toBuffer();

      await writeFile(tempPngPath, optimizedPng);

      const svgContent = await vectorize(optimizedPng, {
        colorMode: VECTORIZER_COLOR_MODE_COLOR,
        hierarchical: VECTORIZER_HIERARCHICAL_STACKED,
        filterSpeckle: 4,
        colorPrecision: 6,
        layerDifference: 16,
        mode: VECTORIZER_PATH_SIMPLIFY_MODE_SPLINE,
        cornerThreshold: 60,
        lengthThreshold: 4,
        maxIterations: 10,
        spliceThreshold: 45,
        pathPrecision: 3,
      });

      await writeFile(request.outputPath, svgContent);

      await unlink(tempPngPath);
    } else {
      let outputBuffer: Buffer;

      switch (request.extension) {
        case "png":
          outputBuffer = await sharp(imageData)
            .png({ compressionLevel: 9 })
            .toBuffer();
          break;
        case "webp":
          outputBuffer = await sharp(imageData)
            .webp({ quality: 85 })
            .toBuffer();
          break;
        case "jpeg":
          outputBuffer = await sharp(imageData)
            .jpeg({ quality: 85 })
            .toBuffer();
          break;
        default:
          outputBuffer = imageData;
      }

      await writeFile(request.outputPath, outputBuffer);
    }

    return {
      outputPath: request.outputPath,
      success: true,
    };
  } catch (error) {
    return {
      outputPath: request.outputPath,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export function generateImagesTool(server: McpServer) {
  server.registerTool(
    "generate-images",
    {
      description:
        "Generates images using Google Imagen with auto-vectorization for SVG outputs. Supports batch processing with up to 10 parallel requests. Model options: imagen-4.0-ultra (highest quality), imagen-4.0 (balanced), imagen-3.0 (default, recommended), imagen-3.0-fast (prototyping).",
      inputSchema,
    },
    async (input) => {
      try {
        const validated: Input = inputSchema.parse(input);

        const batches = chunkArray(validated.requests, BATCH_SIZE);
        const allResults: GenerationResult[] = [];

        for (const batch of batches) {
          const batchResults = await Promise.all(
            batch.map((request) =>
              processImageRequest(request, validated.model),
            ),
          );
          allResults.push(...batchResults);
        }

        const successCount = allResults.filter((r) => r.success).length;
        const failureCount = allResults.filter((r) => !r.success).length;

        const summary = {
          totalRequests: validated.requests.length,
          successful: successCount,
          failed: failureCount,
          model: validated.model,
          results: allResults,
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(summary, null, 2),
            },
          ],
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            content: [
              {
                type: "text",
                text: `Validation error: ${error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ")}`,
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
