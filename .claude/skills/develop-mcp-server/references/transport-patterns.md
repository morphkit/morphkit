# MCP Server Transport Patterns

This document provides implementation patterns for both STDIO and Streamable HTTP transport types in MCP servers.

## Transport Type Comparison

| Feature              | STDIO                                 | Streamable HTTP              |
| -------------------- | ------------------------------------- | ---------------------------- |
| **Use Case**         | Local CLI integration, Claude Desktop | Web APIs, remote access      |
| **Setup Complexity** | Simple                                | Moderate (requires Express)  |
| **Port Binding**     | None                                  | Requires port (default 3000) |
| **Client Access**    | Process communication                 | HTTP requests                |
| **Deployment**       | Direct execution                      | Container/server hosting     |
| **Dependencies**     | `@modelcontextprotocol/sdk` only      | Additional: express, cors    |

## STDIO Transport Pattern

### Basic Server Structure

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";

dotenv.config();

const server = new McpServer({
  name: "example-mcp",
  version: "0.1.0",
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Example MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
```

### Tool Registration (STDIO)

```typescript
import { z } from "zod";

const inputSchema = z.object({
  query: z.string(),
  limit: z.number().optional(),
});

server.registerTool(
  "search",
  {
    description: "Search for items",
    inputSchema,
  },
  async (input) => {
    const { query, limit = 10 } = inputSchema.parse(input);

    try {
      const results = await performSearch(query, limit);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  },
);
```

### Package.json (STDIO)

```json
{
  "name": "@morph-ui/example-mcp",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.23.8",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "@morph-ui/typescript-config": "*",
    "@types/node": "^20.0.0",
    "typescript": "~5.9.2",
    "tsx": "^4.0.0"
  }
}
```

### Testing STDIO Server

```bash
# Run in development mode
bun run dev

# Build and run production
bun run build
bun run start

# Test with MCP Inspector
npx @modelcontextprotocol/inspector node dist/index.js
```

## Streamable HTTP Transport Pattern

### Basic Server Structure

```typescript
import express from "express";
import cors from "cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamable-http.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());

const server = new McpServer({
  name: "example-mcp",
  version: "0.1.0",
});

const transport = new StreamableHTTPServerTransport();
server.connect(transport);

app.post("/mcp/v1/tools/:toolName", async (req, res) => {
  const { toolName } = req.params;
  const input = req.body;

  try {
    const result = await server.executeTool(toolName, input);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", server: "example-mcp" });
});

app.listen(PORT, () => {
  console.log(`Example MCP Server running on http://localhost:${PORT}`);
});
```

### Tool Registration (Streamable HTTP)

```typescript
import { z } from "zod";

const inputSchema = z.object({
  query: z.string(),
  limit: z.number().optional(),
});

server.registerTool(
  "search",
  {
    description: "Search for items",
    inputSchema,
  },
  async (input) => {
    const { query, limit = 10 } = inputSchema.parse(input);

    try {
      const results = await performSearch(query, limit);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  },
);
```

### Package.json (Streamable HTTP)

```json
{
  "name": "@morph-ui/example-mcp",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "express": "^4.19.2",
    "cors": "^2.8.5",
    "zod": "^3.23.8",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "@morph-ui/typescript-config": "*",
    "@types/node": "^20.0.0",
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "typescript": "~5.9.2",
    "tsx": "^4.0.0"
  }
}
```

### Testing Streamable HTTP Server

```bash
# Run in development mode
bun run dev

# Test health endpoint
curl http://localhost:3000/health

# Test tool endpoint
curl -X POST http://localhost:3000/mcp/v1/tools/search \
  -H "Content-Type: application/json" \
  -d '{"query": "example", "limit": 5}'

# Build and run production
bun run build
bun run start
```

## Error Handling Patterns

### Input Validation

```typescript
import { z } from "zod";

const inputSchema = z.object({
  email: z.string().email(),
  age: z.number().int().positive(),
  role: z.enum(["admin", "user", "guest"]),
});

server.registerTool(
  "create-user",
  {
    description: "Creates a new user",
    inputSchema,
  },
  async (input) => {
    try {
      const validated = inputSchema.parse(input);

      const user = await createUser(validated);

      return {
        content: [
          {
            type: "text",
            text: `User created: ${user.id}`,
          },
        ],
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          content: [
            {
              type: "text",
              text: `Validation error: ${error.errors.map((e) => e.message).join(", ")}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  },
);
```

### External API Error Handling

```typescript
import { z } from "zod";

const inputSchema = z.object({
  endpoint: z.string().url(),
});

server.registerTool(
  "fetch-data",
  {
    description: "Fetches data from external API",
    inputSchema,
  },
  async (input) => {
    const { endpoint } = inputSchema.parse(input);

    try {
      const response = await fetch(endpoint, {
        timeout: 5000,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return {
          content: [
            {
              type: "text",
              text: "Request timeout - the API took too long to respond",
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Failed to fetch data: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  },
);
```

## Environment Configuration

### .env.example

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# API Keys
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here

# Database (if needed)
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
```

### Loading Environment Variables

```typescript
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default("3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  OPENAI_API_KEY: z.string().min(1),
});

const env = envSchema.parse(process.env);

export { env };
```

## Logging Patterns

### STDIO Logging

```typescript
function logInfo(message: string, meta?: Record<string, unknown>) {
  console.error(`[INFO] ${message}`, meta ? JSON.stringify(meta) : "");
}

function logError(message: string, error?: Error) {
  console.error(`[ERROR] ${message}`, error ? error.stack : "");
}

logInfo("Server starting", { version: "0.1.0" });
logError("Failed to connect", new Error("Connection refused"));
```

### HTTP Logging

```typescript
import express from "express";

const app = express();

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });

  next();
});
```

## Docker Patterns

### Dockerfile (STDIO)

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

CMD ["node", "dist/index.js"]
```

### Dockerfile (Streamable HTTP)

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

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### docker-compose.yaml (STDIO)

```yaml
version: "3.8"

services:
  example-mcp:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: example-mcp
    env_file:
      - .env
    restart: unless-stopped
    stdin_open: true
    tty: true
```

### docker-compose.yaml (Streamable HTTP)

```yaml
version: "3.8"

services:
  example-mcp:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: example-mcp
    ports:
      - "${PORT:-3000}:3000"
    env_file:
      - .env
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Choosing the Right Transport

### Use STDIO when:

- Building tools for Claude Desktop integration
- Creating local CLI utilities
- Simplicity is a priority
- No remote access needed
- Process-to-process communication is sufficient

### Use Streamable HTTP when:

- Building web APIs
- Need remote access to tools
- Multiple clients will connect
- RESTful endpoints are required
- Want to use standard HTTP tooling (curl, Postman)
- Need load balancing or horizontal scaling

## Best Practices

1. **Always validate inputs with Zod** - Never trust raw input
2. **Use proper error handling** - Return descriptive error messages
3. **Log to stderr for STDIO** - stdout is reserved for protocol communication
4. **Add health checks for HTTP** - Enable monitoring and load balancing
5. **Use environment variables** - Keep secrets out of code
6. **Follow MCP response format** - Ensure compatibility with clients
7. **Add timeouts for external calls** - Prevent hanging requests
8. **Use TypeScript strict mode** - Catch errors at compile time
