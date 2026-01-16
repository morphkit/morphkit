import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";
import { vectorize } from "@neplex/vectorizer";

const VECTORIZER_COLOR_MODE_COLOR = 0;
const VECTORIZER_COLOR_MODE_BINARY = 1;
const VECTORIZER_HIERARCHICAL_STACKED = 0;
const VECTORIZER_HIERARCHICAL_CUTOUT = 1;
const VECTORIZER_PATH_SIMPLIFY_MODE_NONE = 0;
const VECTORIZER_PATH_SIMPLIFY_MODE_POLYGON = 1;
const VECTORIZER_PATH_SIMPLIFY_MODE_SPLINE = 2;

const configSchema = z.object({
  colorMode: z.enum(["color", "binary"]).default("color"),
  hierarchical: z.enum(["stacked", "cutout"]).default("stacked"),
  filterSpeckle: z.number().int().min(0).max(100).default(4),
  colorPrecision: z.number().int().min(1).max(8).default(6),
  layerDifference: z.number().int().min(0).max(100).default(16),
  mode: z.enum(["spline", "polygon", "none"]).default("spline"),
  cornerThreshold: z.number().min(0).max(180).default(60),
  lengthThreshold: z.number().min(0).max(10).default(4),
  maxIterations: z.number().int().min(1).max(20).default(10),
  spliceThreshold: z.number().min(0).max(180).default(45),
  pathPrecision: z.number().int().min(1).max(8).default(3),
});

const inputSchema = z.object({
  inputPath: z.string(),
  outputPath: z.string(),
  config: configSchema.optional(),
});

type Input = z.infer<typeof inputSchema>;
type ConfigInput = z.infer<typeof configSchema>;

interface DefaultConfig {
  colorMode: "color";
  hierarchical: "stacked";
  filterSpeckle: number;
  colorPrecision: number;
  layerDifference: number;
  mode: "spline";
  cornerThreshold: number;
  lengthThreshold: number;
  maxIterations: number;
  spliceThreshold: number;
  pathPrecision: number;
}

const DEFAULT_CONFIG: DefaultConfig = {
  colorMode: "color",
  hierarchical: "stacked",
  filterSpeckle: 4,
  colorPrecision: 6,
  layerDifference: 16,
  mode: "spline",
  cornerThreshold: 60,
  lengthThreshold: 4,
  maxIterations: 10,
  spliceThreshold: 45,
  pathPrecision: 3,
};

function mapColorMode(mode: ConfigInput["colorMode"]): number {
  return mode === "binary"
    ? VECTORIZER_COLOR_MODE_BINARY
    : VECTORIZER_COLOR_MODE_COLOR;
}

function mapHierarchical(hierarchical: ConfigInput["hierarchical"]): number {
  return hierarchical === "cutout"
    ? VECTORIZER_HIERARCHICAL_CUTOUT
    : VECTORIZER_HIERARCHICAL_STACKED;
}

function mapPathSimplifyMode(mode: ConfigInput["mode"]): number {
  switch (mode) {
    case "polygon":
      return VECTORIZER_PATH_SIMPLIFY_MODE_POLYGON;
    case "none":
      return VECTORIZER_PATH_SIMPLIFY_MODE_NONE;
    default:
      return VECTORIZER_PATH_SIMPLIFY_MODE_SPLINE;
  }
}

export function vectorizeImageTool(server: McpServer) {
  server.registerTool(
    "vectorize-image",
    {
      description:
        "Converts raster images (PNG, JPEG, WebP) to SVG using configurable vectorization. Supports color mode, hierarchical rendering, and path smoothing options.",
      inputSchema,
    },
    async (input) => {
      try {
        const validated: Input = inputSchema.parse(input);

        try {
          await access(validated.inputPath);
        } catch {
          return {
            content: [
              {
                type: "text",
                text: `Error: Input file not found: ${validated.inputPath}`,
              },
            ],
            isError: true,
          };
        }

        const mergedConfig: ConfigInput = {
          ...DEFAULT_CONFIG,
          ...validated.config,
        };

        const inputBuffer = await readFile(validated.inputPath);

        const pngBuffer = await sharp(inputBuffer).png().toBuffer();

        const svgContent = await vectorize(pngBuffer, {
          colorMode: mapColorMode(mergedConfig.colorMode),
          hierarchical: mapHierarchical(mergedConfig.hierarchical),
          filterSpeckle: mergedConfig.filterSpeckle,
          colorPrecision: mergedConfig.colorPrecision,
          layerDifference: mergedConfig.layerDifference,
          mode: mapPathSimplifyMode(mergedConfig.mode),
          cornerThreshold: mergedConfig.cornerThreshold,
          lengthThreshold: mergedConfig.lengthThreshold,
          maxIterations: mergedConfig.maxIterations,
          spliceThreshold: mergedConfig.spliceThreshold,
          pathPrecision: mergedConfig.pathPrecision,
        });

        await mkdir(dirname(validated.outputPath), { recursive: true });

        await writeFile(validated.outputPath, svgContent);

        const result = {
          inputPath: validated.inputPath,
          outputPath: validated.outputPath,
          config: mergedConfig,
          success: true,
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
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
