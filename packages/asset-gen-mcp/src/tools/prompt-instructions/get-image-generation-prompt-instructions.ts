import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getGuidelinesForAssetType } from "./asset-guidelines.js";

const inputSchema = z.object({
  assetType: z.enum([
    "logo",
    "icon",
    "illustration",
    "character",
    "sprite",
    "pattern",
    "photograph",
    "ui-element",
  ]),
  query: z.string().optional(),
  stylePreferences: z
    .object({
      colorScheme: z.string().optional(),
      artStyle: z.string().optional(),
      mood: z.string().optional(),
    })
    .optional(),
});

type Input = z.infer<typeof inputSchema>;

export function getImageGenerationPromptInstructionsTool(server: McpServer) {
  server.registerTool(
    "get-image-generation-prompt-instructions",
    {
      description:
        "Returns asset-type-specific prompt engineering best practices and examples for Google Imagen. Use this before generating images to craft optimal prompts.",
      inputSchema,
    },
    async (input) => {
      try {
        const validated: Input = inputSchema.parse(input);

        const guidelines = getGuidelinesForAssetType(
          validated.assetType,
          validated.stylePreferences,
        );

        let result = guidelines;

        if (validated.query) {
          result += `\n\n## Query Context\nYou asked: "${validated.query}"\n\nApply the guidelines above to craft a prompt that addresses your specific needs.`;
        }

        return {
          content: [
            {
              type: "text",
              text: result,
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
