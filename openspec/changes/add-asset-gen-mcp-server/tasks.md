## 1. Project Scaffolding

- [ ] 1.1 Run scaffdog to generate MCP server structure
- [ ] 1.2 Install dependencies (@google/genai, @neplex/vectorizer, sharp)
- [ ] 1.3 Configure .env.example with required environment variables

## 2. Type Definitions

- [ ] 2.1 Create src/types.ts with GeneratedAssetType enum
- [ ] 2.2 Add GeneratedImageExtension type
- [ ] 2.3 Add VectorizerConfig interface

## 3. Prompt Instructions Tool

- [ ] 3.1 Create asset-guidelines.ts with prompt templates per asset type
- [ ] 3.2 Implement get-image-generation-prompt-instructions tool
- [ ] 3.3 Add input validation with Zod schema
- [ ] 3.4 Write tests for prompt instructions tool

## 4. Image Generation Tool

- [ ] 4.1 Create imagen-client.ts wrapper for Google Imagen API
- [ ] 4.2 Implement generate-images tool with batch processing (10 requests/batch)
- [ ] 4.3 Add auto-vectorization flow for SVG outputs
- [ ] 4.4 Integrate Sharp for image optimization
- [ ] 4.5 Add model selection parameter with defaults
- [ ] 4.6 Write tests for image generation tool

## 5. Vectorization Tool

- [ ] 5.1 Implement vectorize-image tool
- [ ] 5.2 Add VectorizerConfig parameter handling
- [ ] 5.3 Write tests for vectorization tool

## 6. Documentation

- [ ] 6.1 Create docs/index.html with Tailwind CDN styling
- [ ] 6.2 Add MCP client setup instructions (Claude Desktop, Claude Code, Cursor, Windsurf)
- [ ] 6.3 Document all three tools with usage examples

## 7. Quality Verification

- [ ] 7.1 Run bun run format
- [ ] 7.2 Run bun run check-types
- [ ] 7.3 Run bun run lint
- [ ] 7.4 Run bun run test

## 8. Final Verification

- [ ] 8.1 Test server startup with bun run dev
- [ ] 8.2 Verify Docker build succeeds
