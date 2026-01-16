import { describe, it, expect } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { vectorizeImageTool } from "./vectorize-image.js";

describe("vectorize-image", () => {
  it("should register tool without errors", () => {
    const server = new McpServer({
      name: "test-server",
      version: "0.1.0",
    });

    expect(() => {
      vectorizeImageTool(server);
    }).not.toThrow();
  });

  it("should export tool function", () => {
    expect(vectorizeImageTool).toBeDefined();
    expect(typeof vectorizeImageTool).toBe("function");
  });
});
