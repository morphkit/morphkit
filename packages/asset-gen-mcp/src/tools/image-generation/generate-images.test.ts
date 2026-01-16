import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { generateImagesTool } from "./generate-images.js";
import { chunkArray } from "./imagen-client.js";

describe("generate-images", () => {
  let server: McpServer;

  beforeEach(() => {
    server = new McpServer({
      name: "test-server",
      version: "0.1.0",
    });
  });

  it("should register tool without errors", () => {
    expect(() => {
      generateImagesTool(server);
    }).not.toThrow();
  });

  it("should export tool function", () => {
    expect(generateImagesTool).toBeDefined();
    expect(typeof generateImagesTool).toBe("function");
  });
});

describe("chunkArray", () => {
  it("should split array into chunks of specified size", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const chunks = chunkArray(array, 3);

    expect(chunks).toHaveLength(4);
    expect(chunks[0]).toEqual([1, 2, 3]);
    expect(chunks[1]).toEqual([4, 5, 6]);
    expect(chunks[2]).toEqual([7, 8, 9]);
    expect(chunks[3]).toEqual([10]);
  });

  it("should handle empty array", () => {
    const chunks = chunkArray([], 5);
    expect(chunks).toHaveLength(0);
  });

  it("should handle array smaller than chunk size", () => {
    const array = [1, 2, 3];
    const chunks = chunkArray(array, 10);

    expect(chunks).toHaveLength(1);
    expect(chunks[0]).toEqual([1, 2, 3]);
  });

  it("should handle exact multiple of chunk size", () => {
    const array = [1, 2, 3, 4, 5, 6];
    const chunks = chunkArray(array, 2);

    expect(chunks).toHaveLength(3);
    expect(chunks[0]).toEqual([1, 2]);
    expect(chunks[1]).toEqual([3, 4]);
    expect(chunks[2]).toEqual([5, 6]);
  });

  it("should work with batch size of 10", () => {
    const array = Array.from({ length: 25 }, (_, i) => i + 1);
    const chunks = chunkArray(array, 10);

    expect(chunks).toHaveLength(3);
    expect(chunks[0]).toHaveLength(10);
    expect(chunks[1]).toHaveLength(10);
    expect(chunks[2]).toHaveLength(5);
  });
});
