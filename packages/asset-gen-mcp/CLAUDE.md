# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
bun install              # Install dependencies
bun run dev              # Run server with hot reload (tsx)
bun run build            # Compile TypeScript to dist/
bun run start            # Run compiled server
bun run test             # Run Jest test suite
bun run lint             # ESLint (zero warnings enforced)
bun run check-types      # TypeScript type checking
```

## Environment Setup

Copy `.env.example` to `.env` and configure:

- `GOOGLE_API_KEY` - Required. Get from [Google AI Studio](https://aistudio.google.com/apikey)
- `IMAGEN_DEFAULT_MODEL` - Optional. Default: `imagen-4.0-generate-001`
- `IMAGEN_TIMEOUT_MS` - Optional. Default: `30000`

## Architecture

This is an MCP (Model Context Protocol) server providing 4 tools for AI-powered image asset generation.

### Server Entry Point

`src/index.ts` initializes the MCP server and registers tools via factory functions:

```
McpServer → Tool registration (factory functions) → StdioServerTransport
```

### Tool Structure

Each tool follows this pattern:

- Located in `src/tools/{category}/{tool-name}.ts`
- Exports a factory function receiving `McpServer` instance
- Uses Zod schemas for input validation
- Returns `{ content: [{ type: "text", text: JSON.stringify(result) }] }`
- Errors include `isError: true` flag

### Tools

| Tool                                       | Purpose                                     | Key Dependencies                               |
| ------------------------------------------ | ------------------------------------------- | ---------------------------------------------- |
| `get-image-generation-prompt-instructions` | Asset-type-specific prompt guidance         | None                                           |
| `generate-images`                          | Google Imagen generation with batch support | `@google/genai`, `sharp`, `@neplex/vectorizer` |
| `vectorize-image`                          | Raster to SVG conversion                    | `@neplex/vectorizer`, `sharp`                  |
| `remove-background`                        | AI background removal                       | `transparent-background` (requires Python)     |

### Key Implementation Details

- **Batch processing**: `generate-images` chunks requests into batches of 10 for parallel processing
- **Auto-vectorization**: SVG output automatically converts PNG through vectorizer
- **Reference images**: Supports file paths or URLs (auto base64 encoding)
- **Format conversion**: Sharp handles PNG/JPEG/WebP conversions

## Testing

Tests are colocated with source files (`*.test.ts`). Jest uses ts-jest with ESM support.

Run a single test file:

```bash
bun run test -- src/tools/image-generation/generate-images.test.ts
```

## Adding a New Tool

1. Create directory: `src/tools/{category}/`
2. Implement tool: `{tool-name}.ts` with factory function and Zod schema
3. Add test: `{tool-name}.test.ts`
4. Register in `src/index.ts`
