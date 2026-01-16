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
- **generate-images**: Generates images using Google Imagen 4.0 with auto-vectorization for SVG outputs
- **vectorize-image**: Converts raster images to SVG using configurable vectorization options
- **remove-background**: AI-powered background removal using [transparent-background](https://github.com/makinori/transparent-background-npm)

## Requirements

- **Node.js** >= 18
- **Python** (for background removal) - Pre-installed on macOS and most Linux distributions
- **Google API Key** - Get one at [Google AI Studio](https://aistudio.google.com/apikey)

### First Run Notice

On first use, the `remove-background` tool downloads an ML model (~150MB) and creates a Python virtual environment. This takes approximately 3 minutes. Subsequent runs are fast (~2-5 seconds).

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

Generates images using Google Imagen 4.0 with auto-vectorization for SVG outputs

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

### remove-background

AI-powered background removal using InSPyReNet model. Works with complex backgrounds, shadows, and lighting effects. Outputs transparent PNG.

**Usage:**

\`\`\`json
{
"name": "remove-background",
"arguments": {
"inputPath": "/path/to/image.png",
"outputPath": "/path/to/output.png",
"fast": false
}
}
\`\`\`

Set `fast: true` for quicker processing with slightly lower quality (384x384 model vs 1024x1024).

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
