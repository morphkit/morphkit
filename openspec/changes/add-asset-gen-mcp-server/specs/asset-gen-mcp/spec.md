## ADDED Requirements

### Requirement: Asset Generation MCP Server

The system SHALL provide an MCP server (`@morph-ui/asset-gen-mcp`) that enables AI agents to generate production-ready image assets with prompt engineering guidance and vectorization capabilities.

#### Scenario: Server initialization

- **WHEN** the server starts via STDIO transport
- **THEN** it registers three tools: get-image-generation-prompt-instructions, generate-images, and vectorize-image
- **AND** loads environment configuration from .env

### Requirement: Generated Asset Types

The system SHALL support the following asset types for prompt guidance: logo, icon, illustration, character, sprite, pattern, photograph, and ui-element.

#### Scenario: Asset type enumeration

- **WHEN** requesting prompt instructions
- **THEN** the assetType parameter accepts one of: logo, icon, illustration, character, sprite, pattern, photograph, ui-element

### Requirement: Prompt Instructions Tool

The system SHALL provide a `get-image-generation-prompt-instructions` tool that returns asset-type-specific prompt engineering best practices for Google Imagen.

#### Scenario: Request prompt guidance for logo

- **WHEN** calling get-image-generation-prompt-instructions with assetType "logo"
- **THEN** return markdown with logo-specific guidance including three-element structure, lighting specs, and quality modifiers

#### Scenario: Include style preferences

- **WHEN** providing optional stylePreferences parameter with colorScheme, artStyle, or mood
- **THEN** incorporate style preferences into the returned guidelines

### Requirement: Image Generation Tool

The system SHALL provide a `generate-images` tool that generates images using Google Imagen API with support for batch processing and automatic vectorization.

#### Scenario: Generate single PNG image

- **WHEN** calling generate-images with a request containing outputPath, extension "png", and prompt
- **THEN** call Google Imagen API, optimize with Sharp, and write to outputPath

#### Scenario: Generate SVG with auto-vectorization

- **WHEN** calling generate-images with extension "svg"
- **THEN** generate PNG via Imagen API, optimize with Sharp, vectorize using @neplex/vectorizer, write SVG to outputPath, and delete temporary PNG

#### Scenario: Batch processing

- **WHEN** providing more than 10 requests
- **THEN** process requests in batches of 10 using Promise.all for parallelization

#### Scenario: Model selection

- **WHEN** specifying model parameter
- **THEN** use the specified Imagen model (imagen-4.0-ultra-generate-001, imagen-4.0-generate-001, imagen-3.0-generate-002, or imagen-3.0-fast-generate-001)
- **AND** default to imagen-3.0-generate-002 when not specified

#### Scenario: Reference image support

- **WHEN** providing images array with base64-encoded reference images
- **THEN** include reference images in Imagen API request

### Requirement: Vectorization Tool

The system SHALL provide a `vectorize-image` tool that converts raster images to SVG using configurable vectorization options.

#### Scenario: Vectorize with default config

- **WHEN** calling vectorize-image with inputPath and outputPath only
- **THEN** apply default vectorizer configuration and write SVG to outputPath

#### Scenario: Vectorize with custom config

- **WHEN** providing config parameter with colorMode, hierarchical, filterSpeckle, or other options
- **THEN** merge provided config with defaults and apply during vectorization

#### Scenario: Input validation

- **WHEN** providing non-existent inputPath
- **THEN** return error indicating file not found

### Requirement: Supported Output Formats

The system SHALL support the following output formats for generated images: png, svg, webp, and jpeg.

#### Scenario: Format handling

- **WHEN** specifying extension in generate-images request
- **THEN** produce output in the specified format with appropriate optimization

### Requirement: Environment Configuration

The server SHALL require a GOOGLE_API_KEY environment variable for Imagen API access.

#### Scenario: Missing API key

- **WHEN** GOOGLE_API_KEY is not set
- **THEN** fail gracefully with clear error message indicating missing configuration

### Requirement: HTML Documentation

The package SHALL include HTML documentation with setup instructions for multiple MCP clients.

#### Scenario: Documentation content

- **WHEN** viewing docs/index.html
- **THEN** display setup instructions for Claude Desktop, Claude Code, Cursor, and Windsurf
- **AND** link to Google AI Studio for API key creation
- **AND** use JetBrains Mono font and minimal black/white styling
