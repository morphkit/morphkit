# asset-gen-mcp

AI-powered image asset generation MCP server with prompt engineering guidance and vectorization.

## Quick Install

Add this MCP server to your coding assistant:

**Claude Code:**
```bash
claude mcp add asset-gen -e GOOGLE_API_KEY=YOUR_API_KEY -- npx -y @morphkit/asset-gen-mcp@latest
```

**Claude Desktop** (~/Library/Application Support/Claude/claude_desktop_config.json):
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

**Cursor** (.cursor/mcp.json):
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

**Windsurf** (~/.windsurf/mcp.json):
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

## Requirements

- Node.js >= 18
- Python (pre-installed on macOS/Linux) - required for background removal
- Google API Key with billing enabled - get one at https://aistudio.google.com/apikey

**Note:** Imagen requires a billing-enabled API key. See https://ai.google.dev/pricing#imagen for pricing.

**First Run:** The `remove-background` tool downloads an ML model (~150MB) and creates a Python virtual environment on first use (~3 minutes). Subsequent runs are fast (~2-5 seconds).

## Available Tools

### get-image-generation-prompt-instructions

Returns asset-type-specific prompt engineering best practices for Google Imagen. Use this before generating images to craft optimal prompts.

```json
{
  "assetType": "logo",
  "query": "I need a tech startup logo",
  "stylePreferences": {
    "colorScheme": "blue and white",
    "artStyle": "minimalist",
    "mood": "professional"
  }
}
```

- `assetType` (required): logo | icon | illustration | character | sprite | pattern | photograph | ui-element
- `query` (optional): context for the guidelines
- `stylePreferences` (optional): colorScheme, artStyle, mood

### generate-images

Generates images using Google Imagen with auto-vectorization for SVG outputs. Supports batch processing with up to 10 parallel requests.

```json
{
  "requests": [
    {
      "outputPath": "/path/to/logo.png",
      "extension": "png",
      "prompt": "Minimalist owl logo, flat design",
      "images": ["/path/to/reference.png"],
      "removeBackground": true
    }
  ],
  "model": "imagen-4.0-generate-001"
}
```

- `outputPath` (required): output file path
- `extension` (required): png | svg | webp | jpeg
- `prompt` (required): 1-2000 characters
- `images` (optional): reference images (paths or URLs) for image-to-image generation
- `removeBackground` (optional): AI background removal (png only)
- `model` (optional): imagen-4.0-ultra-generate-001 | imagen-4.0-generate-001 (default) | imagen-4.0-fast-generate-001

### vectorize-image

Converts raster images (PNG, JPEG, WebP) to SVG using configurable vectorization.

```json
{
  "inputPath": "/path/to/input.png",
  "outputPath": "/path/to/output.svg",
  "config": {
    "colorMode": "color",
    "hierarchical": "stacked",
    "mode": "spline",
    "filterSpeckle": 4,
    "colorPrecision": 6,
    "layerDifference": 16,
    "cornerThreshold": 60,
    "lengthThreshold": 4,
    "spliceThreshold": 45,
    "maxIterations": 10,
    "pathPrecision": 3
  }
}
```

### remove-background

AI-powered background removal using InSPyReNet model. Works with complex backgrounds, shadows, and lighting effects. Outputs transparent PNG.

```json
{
  "inputPath": "/path/to/image.png",
  "outputPath": "/path/to/output.png",
  "fast": false
}
```

- `inputPath` (required): source image
- `outputPath` (required): output PNG with transparency
- `fast` (optional): true = 384x384 (faster), false = 1024x1024 (default, higher quality)

## Model Selection

| Model | Use Case |
|-------|----------|
| imagen-4.0-ultra-generate-001 | Highest quality. Best for final marketing assets and premium output. |
| imagen-4.0-generate-001 (default) | Balanced quality, speed, and cost. Recommended for most use cases. |
| imagen-4.0-fast-generate-001 | Speed-optimized. Best for rapid prototyping and iteration. |

## Links

- GitHub: https://github.com/morphkit/morphkit/tree/main/packages/asset-gen-mcp
- npm: https://www.npmjs.com/package/@morphkit/asset-gen-mcp
