# AssetGen MCP Server

AI-powered image asset generation with prompt engineering guidance and vectorization

**[Documentation](https://morphkit.github.io/morphkit/asset-gen-mcp/)**

## Quick Start (npx)

Run the MCP server directly without global installation:

```bash
npx -y @morphkit/asset-gen-mcp@latest
```

For MCP client configuration, use:

```json
{
  "mcpServers": {
    "asset-gen": {
      "command": "npx",
      "args": ["-y", "@morphkit/asset-gen-mcp@latest"],
      "env": {
        "GOOGLE_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

For Claude Code:

```bash
claude mcp add asset-gen -e GOOGLE_API_KEY=YOUR_API_KEY -- npx -y @morphkit/asset-gen-mcp@latest
```

## Features

- **get-image-generation-prompt-instructions**: Returns asset-type-specific prompt engineering best practices and examples for Google Imagen
- **generate-images**: Generates images using Google Imagen 3.0 with auto-vectorization for SVG outputs
- **vectorize-image**: Converts raster images to SVG using configurable vectorization options

## Installation

\`\`\`bash
cd packages/asset-gen-mcp
bun install
\`\`\`

## Configuration

Copy the example environment file and configure:

\`\`\`bash
cp .env.example .env

# Edit .env with your values

\`\`\`

## Development

\`\`\`bash
bun run dev
\`\`\`

## Production

### Build

\`\`\`bash
bun run build
\`\`\`

### Run

\`\`\`bash
bun run start
\`\`\`

## Docker

### Build Image

\`\`\`bash
docker build -t asset-gen-mcp .
\`\`\`

### Run with Docker Compose

\`\`\`bash
docker-compose up -d
\`\`\`

## Tools

### get-image-generation-prompt-instructions

Returns asset-type-specific prompt engineering best practices and examples for Google Imagen

**Usage:**

\`\`\`json
{
"name": "get-image-generation-prompt-instructions",
"arguments": {
"param": "value"
}
}
\`\`\`

### generate-images

Generates images using Google Imagen 3.0 with auto-vectorization for SVG outputs

**Usage:**

\`\`\`json
{
"name": "generate-images",
"arguments": {
"param": "value"
}
}
\`\`\`

### vectorize-image

Converts raster images to SVG using configurable vectorization options

**Usage:**

\`\`\`json
{
"name": "vectorize-image",
"arguments": {
"param": "value"
}
}
\`\`\`

## Testing

\`\`\`bash
bun run test
\`\`\`

## Type Checking

\`\`\`bash
bun run check-types
\`\`\`

## Linting

\`\`\`bash
bun run lint
\`\`\`
