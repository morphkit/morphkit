import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getImageGenerationPromptInstructionsTool } from "./get-image-generation-prompt-instructions.js";
import { getGuidelinesForAssetType } from "./asset-guidelines.js";

describe("get-image-generation-prompt-instructions", () => {
  let server: McpServer;

  beforeEach(() => {
    server = new McpServer({
      name: "test-server",
      version: "0.1.0",
    });
  });

  it("should register tool without errors", () => {
    expect(() => {
      getImageGenerationPromptInstructionsTool(server);
    }).not.toThrow();
  });

  it("should export tool function", () => {
    expect(getImageGenerationPromptInstructionsTool).toBeDefined();
    expect(typeof getImageGenerationPromptInstructionsTool).toBe("function");
  });
});

describe("getGuidelinesForAssetType", () => {
  const assetTypes = [
    "logo",
    "icon",
    "illustration",
    "character",
    "sprite",
    "pattern",
    "photograph",
    "ui-element",
  ] as const;

  it.each(assetTypes)(
    "should return guidelines for %s asset type",
    (assetType) => {
      const guidelines = getGuidelinesForAssetType(assetType);

      expect(guidelines).toContain("# ");
      expect(guidelines).toContain("## Overview");
      expect(guidelines).toContain("## Three-Element Prompt Structure");
      expect(guidelines).toContain("## Best Practices");
      expect(guidelines).toContain("## Lighting Tips");
      expect(guidelines).toContain("## Quality Modifiers");
      expect(guidelines).toContain("## Example Prompts");
      expect(guidelines).toContain("## Common Mistakes to Avoid");
    },
  );

  it("should include style preferences when provided", () => {
    const guidelines = getGuidelinesForAssetType("logo", {
      colorScheme: "blue and gold",
      artStyle: "minimalist",
      mood: "professional",
    });

    expect(guidelines).toContain("## Style Preferences Applied");
    expect(guidelines).toContain("blue and gold");
    expect(guidelines).toContain("minimalist");
    expect(guidelines).toContain("professional");
  });

  it("should handle partial style preferences", () => {
    const guidelines = getGuidelinesForAssetType("icon", {
      colorScheme: "monochrome",
    });

    expect(guidelines).toContain("## Style Preferences Applied");
    expect(guidelines).toContain("monochrome");
  });

  it("should return specific content for logo asset type", () => {
    const guidelines = getGuidelinesForAssetType("logo");

    expect(guidelines).toContain("Logo Design Guidelines");
    expect(guidelines).toContain("minimalist");
    expect(guidelines).toContain("scalable");
  });

  it("should return specific content for photograph asset type", () => {
    const guidelines = getGuidelinesForAssetType("photograph");

    expect(guidelines).toContain("Photographic Image Guidelines");
    expect(guidelines).toContain("85mm lens");
    expect(guidelines).toContain("golden hour");
  });

  it("should include SVG optimization section for logo", () => {
    const guidelines = getGuidelinesForAssetType("logo");

    expect(guidelines).toContain("## SVG/Vector Output Optimization");
    expect(guidelines).toContain("Recommended for this asset type");
    expect(guidelines).toContain("flat design");
    expect(guidelines).toContain("no shadows");
    expect(guidelines).toContain("Example SVG-Optimized Prompt");
  });

  it("should include SVG optimization section for icon", () => {
    const guidelines = getGuidelinesForAssetType("icon");

    expect(guidelines).toContain("## SVG/Vector Output Optimization");
    expect(guidelines).toContain("Recommended for this asset type");
  });

  it("should not recommend SVG for sprite", () => {
    const guidelines = getGuidelinesForAssetType("sprite");

    expect(guidelines).toContain("## SVG/Vector Output Optimization");
    expect(guidelines).toContain("Use with caution");
  });

  it("should not include SVG section for photograph", () => {
    const guidelines = getGuidelinesForAssetType("photograph");

    expect(guidelines).not.toContain("## SVG/Vector Output Optimization");
  });
});
