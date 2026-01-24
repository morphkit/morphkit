#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";

import { getImageGenerationPromptInstructionsTool } from "./tools/prompt-instructions/get-image-generation-prompt-instructions.js";
import { generateImagesTool } from "./tools/image-generation/generate-images.js";
import { vectorizeImageTool } from "./tools/vectorization/vectorize-image.js";
// import { removeBackgroundTool } from "./tools/background-removal/remove-background.js";

dotenv.config();

const server = new McpServer({
  name: "asset-gen-mcp",
  version: "0.1.0",
});

getImageGenerationPromptInstructionsTool(server);
generateImagesTool(server);
vectorizeImageTool(server);
// removeBackgroundTool(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("AssetGen MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
