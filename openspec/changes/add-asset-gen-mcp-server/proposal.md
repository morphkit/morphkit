# Change: Add Asset Generation MCP Server

## Why

AI agents lack specialized tooling for generating production-ready image assets with optimal prompting guidance and automatic vectorization. Without asset-type-specific prompt engineering knowledge, generated images often require multiple iterations or manual refinement.

## What Changes

- Add new MCP server package at `packages/asset-gen-mcp/`
- Implement three composable tools:
  - `get-image-generation-prompt-instructions`: Returns asset-type-aware prompt engineering guidelines
  - `generate-images`: Generates images using Google Imagen 3.0 with batch processing and auto-vectorization
  - `vectorize-image`: Converts raster images to SVG using @neplex/vectorizer
- Include HTML documentation with MCP client setup instructions
- Support multiple Imagen models with intelligent defaults

## Impact

- Affected specs: Creates new `asset-gen-mcp` capability
- Affected code: Adds new package `packages/asset-gen-mcp/`
- Dependencies: `@google/genai`, `@neplex/vectorizer`, `sharp`
- Users gain production-ready asset generation with optimal prompting
