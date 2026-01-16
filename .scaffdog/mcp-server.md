---
name: "mcp-server"
root: "."
output: "**/*"
questions:
  name:
    message: "MCP server name (kebab-case, e.g., 'calculator', 'database')"
    initial: "example"
  description:
    message: "Server description"
    initial: "An MCP server"
  transportType:
    message: "Transport type"
    initial: "stdio"
  toolsJson:
    message: "Tools JSON array"
    initial: '[{"name":"example-tool","feature":"example","description":"An example tool"}]'
  dependenciesJson:
    message: "Dependencies JSON array"
    initial: "[]"
---

# `{{ inputs.name }}-mcp/package.json`

```json
{
  "name": "@morphkit/{{ inputs.name }}-mcp",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": {{ if inputs.transportType == "stdio" }}"tsx src/index.ts"{{ else }}"tsx watch src/index.ts"{{ end }},
    "start": "node dist/index.js",
    "lint": "eslint --max-warnings 0 src",
    "check-types": "tsc --noEmit",
    "test": "jest"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.23.8",
    "dotenv": "^16.4.5"{{ if inputs.transportType == "streamable-http" }},
    "express": "^4.19.2",
    "cors": "^2.8.5"{{ end }}{{ for dep in inputs.dependenciesArray }},
    "{{ dep }}": "latest"{{ end }}
  },
  "devDependencies": {
    "@morphkit/typescript-config": "*",
    "@morphkit/eslint-config": "*",
    "@types/node": "^20.0.0",{{ if inputs.transportType == "streamable-http" }}
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",{{ end }}
    "typescript": "~5.9.2",
    "tsx": "^4.0.0",
    "jest": "^30.2.0",
    "@jest/globals": "^30.2.0",
    "ts-jest": "^29.2.5"
  }
}
```

# `{{ inputs.name }}-mcp/eslint.config.js`

```javascript
import { config } from "@morphkit/eslint-config/base";

export default [
  ...config,
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    rules: {
      "turbo/no-undeclared-env-vars": "off",
    },
  },
];
```

# `{{ inputs.name }}-mcp/src/index.ts`

```typescript
{{ if inputs.transportType == "stdio" }}import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";

{{ for tool in inputs.toolsArray }}import { {{ tool.name | camel }}Tool } from "./tools/{{ tool.feature }}/{{ tool.name }}.js";
{{ end }}
dotenv.config();

const server = new McpServer({
  name: "{{ inputs.name }}-mcp",
  version: "0.1.0",
});

{{ for tool in inputs.toolsArray }}{{ tool.name | camel }}Tool(server);
{{ end }}
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("{{ inputs.name | pascal }} MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});{{ else }}import express from "express";
import cors from "cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import dotenv from "dotenv";

{{ for tool in inputs.toolsArray }}import { {{ tool.name | camel }}Tool } from "./tools/{{ tool.feature }}/{{ tool.name }}.js";
{{ end }}
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());

const server = new McpServer({
  name: "{{ inputs.name }}-mcp",
  version: "0.1.0",
});

{{ for tool in inputs.toolsArray }}{{ tool.name | camel }}Tool(server);
{{ end }}
app.get("/health", (_req, res) => {
  res.json({
    status: "healthy",
    server: "{{ inputs.name }}-mcp",
    version: "0.1.0"
  });
});

app.listen(PORT, () => {
  console.log(`{{ inputs.name | pascal }} MCP Server running on http://localhost:${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});{{ end }}
```

# `{{ inputs.name }}-mcp/src/tools/index.ts`

```typescript
{{ for tool in inputs.toolsArray }}export { {{ tool.name | camel }}Tool } from "./{{ tool.feature }}/{{ tool.name }}.js";
{{ end }}
```

# `{{ inputs.name }}-mcp/tsconfig.json`

```json
{
  "extends": "@morphkit/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

# `{{ inputs.name }}-mcp/.env.example`

```env
# {{ inputs.name | upper }} MCP Server Configuration

{{ if inputs.transportType == "streamable-http" }}# Server Configuration
PORT=3000
{{ end }}
# API Keys and Secrets
# Add your environment variables here
{{ for tool in inputs.toolsArray }}# {{ tool.name | upper }}_API_KEY=your_key_here
{{ end }}
```

# `{{ inputs.name }}-mcp/Dockerfile`

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g bun

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

{{ if inputs.transportType == "streamable-http" }}EXPOSE 3000
{{ end }}
CMD ["node", "dist/index.js"]
```

# `{{ inputs.name }}-mcp/docker-compose.yaml`

```yaml
version: '3.8'

services:
  {{ inputs.name }}-mcp:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: {{ inputs.name }}-mcp
    {{ if inputs.transportType == "streamable-http" }}ports:
      - "${PORT:-3000}:3000"
    {{ end }}env_file:
      - .env
    restart: unless-stopped{{ if inputs.transportType == "stdio" }}
    stdin_open: true
    tty: true{{ else }}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3{{ end }}
```

# `{{ inputs.name }}-mcp/README.md`

```markdown
# {{ inputs.name | pascal }} MCP Server

{{ inputs.description }}

## Features

{{ for tool in inputs.toolsArray }}- **{{ tool.name }}**: {{ tool.description }}
{{ end }}

## Installation

\`\`\`bash
cd packages/{{ inputs.name }}-mcp
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

{{ if inputs.transportType == "stdio" }}\`\`\`bash
bun run start
\`\`\`
{{ else }}\`\`\`bash
PORT=3000 bun run start
\`\`\`

### Health Check

\`\`\`bash
curl http://localhost:3000/health
\`\`\`
{{ end }}

## Docker

### Build Image

\`\`\`bash
docker build -t {{ inputs.name }}-mcp .
\`\`\`

### Run with Docker Compose

\`\`\`bash
docker-compose up -d
\`\`\`

## Tools

{{ for tool in inputs.toolsArray }}### {{ tool.name }}

{{ tool.description }}

**Usage:**

\`\`\`json
{
"name": "{{ tool.name }}",
"arguments": {
"param": "value"
}
}
\`\`\`

{{ end }}

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
```

# `{{ inputs.name }}-mcp/.gitignore`

```
# Dependencies
node_modules
.pnp
.pnp.js

# Build output
dist
build

# Environment
.env
.env.local
.env.*.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode
.idea
*.swp
*.swo
*~

# Test coverage
coverage
.nyc_output
```

# `{{ inputs.name }}-mcp/jest.config.js`

```javascript
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.test.ts", "!src/**/*.d.ts"],
};
```
