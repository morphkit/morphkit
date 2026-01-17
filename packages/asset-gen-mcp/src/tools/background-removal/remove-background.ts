import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { dirname } from "node:path";
import { transparentBackground } from "transparent-background";

const inputSchema = z.object({
  inputPath: z.string().describe("Path to input image"),
  outputPath: z.string().describe("Path for output PNG with transparency"),
  fast: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      "Use faster 384x384 model instead of default 1024x1024. Default: false",
    ),
});

export async function removeBackgroundFromImage(
  imageBuffer: Buffer,
  options: { fast?: boolean } = {},
): Promise<Buffer> {
  const { fast = false } = options;
  return transparentBackground(imageBuffer, "png", { fast });
}

export function removeBackgroundTool(server: McpServer) {
  server.registerTool(
    "remove-background",
    {
      description:
        "AI-powered background removal using InSPyReNet model. Works with complex backgrounds, shadows, and lighting effects. Outputs transparent PNG. Requires Python installed.",
      inputSchema,
    },
    async (input) => {
      try {
        const validated = inputSchema.parse(input);

        await access(validated.inputPath);
        const inputBuffer = await readFile(validated.inputPath);

        const outputBuffer = await removeBackgroundFromImage(inputBuffer, {
          fast: validated.fast,
        });

        await mkdir(dirname(validated.outputPath), { recursive: true });
        await writeFile(validated.outputPath, outputBuffer);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                inputPath: validated.inputPath,
                outputPath: validated.outputPath,
                model: validated.fast
                  ? "384x384 (fast)"
                  : "1024x1024 (default)",
              }),
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
