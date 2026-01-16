# MCP Server Troubleshooting Guide

This document provides solutions for common issues encountered when developing MCP servers.

## Scaffolding Issues

### Scaffdog Generation Fails

**Symptoms:**

- `bun run scaffold:mcp-server` command fails
- Error: "Template not found"
- Error: "Invalid input JSON"

**Solutions:**

1. **Verify template exists:**

```bash
ls -la .scaffdog/mcp-server.md
```

2. **Check JSON formatting:**

```bash
# Invalid - missing quotes
bun run scaffold:mcp-server '{name:calculator}'

# Valid - properly quoted
bun run scaffold:mcp-server '{"name":"calculator","description":"Calculator server"}'
```

3. **Validate required fields:**

```json
{
  "name": "calculator",
  "description": "Calculator MCP server",
  "transportType": "stdio",
  "toolsJson": "[{\"name\":\"calculate-sum\",\"feature\":\"math\",\"description\":\"Calculate sum\"}]",
  "dependenciesJson": "[]"
}
```

4. **Check scaffdog config:**

```bash
cat .scaffdog/config.js
# Ensure mcp-server template is in files array
```

### Files Not Generated

**Symptoms:**

- Scaffdog runs but some files missing
- Directory structure incomplete

**Solutions:**

1. **Check file system permissions:**

```bash
ls -ld packages/
# Ensure write permissions
```

2. **Verify output path in template:**

```markdown
---
output: "packages/{{ inputs.name }}-mcp/**/*"
---
```

3. **Check for file path conflicts:**

```bash
# Remove existing directory if it conflicts
rm -rf packages/existing-mcp/
```

### Tool Files Not Created

**Symptoms:**

- Core files created but tool files missing
- src/tools/ directory empty

**Solutions:**

1. **Check toolsJson formatting:**

```json
{
  "toolsJson": "[{\"name\":\"tool-name\",\"feature\":\"category\",\"description\":\"Description\"}]"
}
```

2. **Verify loop syntax in template:**

```markdown
{{ for tool in inputs.toolsArray }}

# Tool file generation

{{ end }}
```

3. **Parse toolsJson in template:**

```markdown
---
questions:
  toolsJson:
    message: "Tools JSON"
---

{{ toolsArray = JSON.parse(inputs.toolsJson) }}
```

## TypeScript Errors

### Module Resolution Errors

**Symptoms:**

- Error: "Cannot find module"
- Import paths not resolving

**Solutions:**

1. **Check tsconfig.json extends:**

```json
{
  "extends": "@morphkit/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

2. **Use .js extensions in imports:**

```typescript
import { tool } from "./tools/math/calculate-sum.js";
```

3. **Verify package.json type:**

```json
{
  "type": "module"
}
```

4. **Check moduleResolution:**

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### Type Inference Issues

**Symptoms:**

- Zod schema types not working
- Input type is `any`

**Solutions:**

1. **Use z.infer:**

```typescript
const inputSchema = z.object({
  param: z.string(),
});

type Input = z.infer<typeof inputSchema>;

async function handler(input: unknown) {
  const validated: Input = inputSchema.parse(input);
  // validated.param is now typed as string
}
```

2. **Avoid manual type annotations:**

```typescript
const validated = inputSchema.parse(input);
```

### Async/Promise Errors

**Symptoms:**

- Error: "Promise returned in function with void return type"
- Unhandled promise rejections

**Solutions:**

1. **Mark handler as async:**

```typescript
server.registerTool(
  "tool-name",
  { description: "...", inputSchema },
  async (input) => {
    const result = await externalCall();
    return { content: [...] };
  }
);
```

2. **Handle promise rejections:**

```typescript
try {
  const result = await riskyOperation();
  return formatSuccess(result);
} catch (error) {
  return formatError(error);
}
```

## Server Startup Issues

### STDIO Server Won't Start

**Symptoms:**

- Server starts but doesn't respond
- No output visible
- Claude Desktop can't connect

**Solutions:**

1. **Check transport initialization:**

```typescript
const transport = new StdioServerTransport();
await server.connect(transport);
```

2. **Use stderr for logging:**

```typescript
console.error("Server starting");
```

3. **Verify server.connect() is awaited:**

```typescript
async function main() {
  await server.connect(transport);
}

main().catch(console.error);
```

4. **Check Claude Desktop config:**

```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

### HTTP Server Port Issues

**Symptoms:**

- Error: "EADDRINUSE: address already in use"
- Server won't bind to port

**Solutions:**

1. **Check if port is in use:**

```bash
lsof -i :3000
```

2. **Kill existing process:**

```bash
kill -9 <PID>
```

3. **Use different port:**

```bash
PORT=3001 bun run dev
```

4. **Add port configuration:**

```typescript
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT);
```

### Environment Variable Issues

**Symptoms:**

- Environment variables undefined
- Server fails to start due to missing config

**Solutions:**

1. **Load dotenv early:**

```typescript
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;
```

2. **Check .env file location:**

```bash
# Should be in package root
ls -la packages/server-mcp/.env
```

3. **Validate required variables:**

```typescript
import { z } from "zod";

const envSchema = z.object({
  API_KEY: z.string().min(1),
  PORT: z.string().optional(),
});

const env = envSchema.parse(process.env);
```

4. **Check .env syntax:**

```bash
# Correct
API_KEY=value

# Incorrect - no spaces
API_KEY = value
```

## Tool Execution Issues

### Tool Not Found

**Symptoms:**

- Error: "Tool not found"
- Tool doesn't appear in listTools()

**Solutions:**

1. **Verify tool registration:**

```typescript
server.registerTool(
  "exact-tool-name",
  { description: "...", inputSchema },
  handler,
);
```

2. **Check tool is imported:**

```typescript
import { registerToolName } from "./tools/feature/tool-name.js";

registerToolName(server);
```

3. **Verify registration is called:**

```typescript
const server = new McpServer({ name: "...", version: "..." });

registerTool1(server);
registerTool2(server);
```

4. **Check tool name matches:**

```typescript
server.callTool("exact-tool-name", { ... });
```

### Input Validation Fails

**Symptoms:**

- All inputs rejected as invalid
- Zod validation always fails

**Solutions:**

1. **Check schema definition:**

```typescript
const inputSchema = z.object({
  param1: z.string(),
  param2: z.number(),
});
```

2. **Verify input format:**

```json
{
  "param1": "value",
  "param2": 42
}
```

3. **Check for typos in field names:**

```typescript
const schema = z.object({
  paramName: z.string(),
});

const result = inputSchema.parse({
  paramName: "value",
});
```

4. **Use .passthrough() for extra fields:**

```typescript
const inputSchema = z
  .object({
    required: z.string(),
  })
  .passthrough();
```

### Response Format Issues

**Symptoms:**

- Client can't parse response
- Error: "Invalid MCP response"

**Solutions:**

1. **Follow MCP response format:**

```typescript
return {
  content: [
    {
      type: "text",
      text: "response text",
    },
  ],
};
```

2. **Stringify JSON data:**

```typescript
return {
  content: [
    {
      type: "text",
      text: JSON.stringify({ data: "value" }, null, 2),
    },
  ],
};
```

3. **Include isError for errors:**

```typescript
return {
  content: [
    {
      type: "text",
      text: `Error: ${message}`,
    },
  ],
  isError: true,
};
```

### Timeout Errors

**Symptoms:**

- Tools hang indefinitely
- No response returned

**Solutions:**

1. **Add fetch timeout:**

```typescript
const response = await fetch(url, {
  signal: AbortSignal.timeout(5000),
});
```

2. **Handle timeout errors:**

```typescript
try {
  const result = await operation();
} catch (error) {
  if (error.name === "AbortError") {
    return {
      content: [{ type: "text", text: "Operation timeout" }],
      isError: true,
    };
  }
}
```

3. **Add Promise.race wrapper:**

```typescript
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("Timeout")), 5000),
);

const result = await Promise.race([operation(), timeout]);
```

## Testing Issues

### Tests Won't Run

**Symptoms:**

- `bun run test` fails
- Jest configuration errors

**Solutions:**

1. **Check Jest config:**

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

2. **Verify test file naming:**

```bash
# Correct
tool-name.test.ts

# Incorrect
tool-name.spec.ts
```

3. **Check import paths in tests:**

```typescript
import { registerTool } from "./tool-name.js";
```

### Mock Not Working

**Symptoms:**

- External calls still executing
- Mock not being used

**Solutions:**

1. **Mock before import:**

```typescript
jest.mock("./external-api.js", () => ({
  fetchData: jest.fn().mockResolvedValue({ data: "mock" }),
}));

import { registerTool } from "./tool.js";
```

2. **Reset mocks between tests:**

```typescript
afterEach(() => {
  jest.clearAllMocks();
});
```

3. **Verify mock is called:**

```typescript
import { fetchData } from "./external-api.js";

it("calls mocked function", async () => {
  await executeTool();
  expect(fetchData).toHaveBeenCalled();
});
```

### Test Coverage Too Low

**Symptoms:**

- Coverage below 80% threshold
- Branches not covered

**Solutions:**

1. **Test error paths:**

```typescript
it("handles errors", async () => {
  jest.spyOn(api, "call").mockRejectedValue(new Error("fail"));
  const result = await tool.execute();
  expect(result.isError).toBe(true);
});
```

2. **Test edge cases:**

```typescript
it("handles empty array", async () => {
  const result = await tool.execute({ items: [] });
  expect(result.content[0].text).toContain("No items");
});
```

3. **Test all validation scenarios:**

```typescript
it("rejects invalid input", async () => {
  const result = await tool.execute({ invalid: "data" });
  expect(result.isError).toBe(true);
});
```

## Docker Issues

### Build Fails

**Symptoms:**

- `docker build` command fails
- Dockerfile syntax errors

**Solutions:**

1. **Check Dockerfile syntax:**

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

CMD ["node", "dist/index.js"]
```

2. **Verify build context:**

```bash
# Run from package directory
cd packages/server-mcp
docker build -t server-mcp .
```

3. **Check file paths:**

```dockerfile
# Copy from correct location
COPY --from=builder /app/dist ./dist
```

### Container Won't Start

**Symptoms:**

- Container starts then immediately exits
- Error in container logs

**Solutions:**

1. **Check container logs:**

```bash
docker logs <container-id>
```

2. **Run interactively:**

```bash
docker run -it server-mcp sh
```

3. **Verify CMD:**

```dockerfile
CMD ["node", "dist/index.js"]
```

4. **Check environment variables:**

```bash
docker run --env-file .env server-mcp
```

### Environment Variables Not Working

**Symptoms:**

- Variables undefined in container
- Configuration missing

**Solutions:**

1. **Use docker-compose env_file:**

```yaml
services:
  server:
    env_file:
      - .env
```

2. **Pass variables inline:**

```bash
docker run -e API_KEY=value server-mcp
```

3. **Check .env file location:**

```bash
# Should be in same directory as docker-compose.yaml
ls -la .env
```

4. **Verify no quotes in .env:**

```bash
# Correct
API_KEY=value

# Incorrect
API_KEY="value"
```

## Performance Issues

### Slow Tool Execution

**Symptoms:**

- Tools take too long to respond
- Timeout errors

**Solutions:**

1. **Add caching:**

```typescript
const cache = new Map();

function getCached(key: string) {
  return cache.get(key);
}

function setCache(key: string, value: unknown) {
  cache.set(key, value);
}
```

2. **Parallelize operations:**

```typescript
const results = await Promise.all([operation1(), operation2(), operation3()]);
```

3. **Add request timeouts:**

```typescript
const response = await fetch(url, {
  signal: AbortSignal.timeout(3000),
});
```

4. **Use connection pooling:**

```typescript
const pool = new ConnectionPool({
  max: 10,
  min: 2,
});
```

### Memory Leaks

**Symptoms:**

- Memory usage grows over time
- Container OOM killed

**Solutions:**

1. **Clear caches periodically:**

```typescript
setInterval(
  () => {
    cache.clear();
  },
  60 * 60 * 1000,
);
```

2. **Close connections:**

```typescript
try {
  const result = await operation();
  return result;
} finally {
  await connection.close();
}
```

3. **Limit cache size:**

```typescript
function setCache(key: string, value: unknown) {
  if (cache.size >= 1000) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(key, value);
}
```

4. **Use WeakMap for object references:**

```typescript
const cache = new WeakMap();
```

## Security Issues

### Secrets Exposed

**Symptoms:**

- API keys in error messages
- Secrets logged to console

**Solutions:**

1. **Sanitize error messages:**

```typescript
catch (error) {
  const sanitized = error.message.replace(/api[_-]key=\w+/gi, "api_key=[REDACTED]");
  return formatError(sanitized);
}
```

2. **Use environment variables:**

```typescript
const API_KEY = process.env.API_KEY;
```

3. **Don't log sensitive data:**

```typescript
console.log("User:", user.id);
```

4. **Validate .gitignore:**

```bash
cat .gitignore
# Should include:
# .env
# .env.local
```

### SSRF Vulnerability

**Symptoms:**

- URLs not validated
- Internal network access possible

**Solutions:**

1. **Validate URLs:**

```typescript
const inputSchema = z.object({
  url: z
    .string()
    .url()
    .refine((url) => {
      const parsed = new URL(url);
      return (
        !parsed.hostname.includes("localhost") &&
        !parsed.hostname.includes("127.0.0.1") &&
        !parsed.hostname.includes("0.0.0.0")
      );
    }, "Internal URLs not allowed"),
});
```

2. **Whitelist domains:**

```typescript
const ALLOWED_DOMAINS = ["api.example.com", "api.safe.com"];

function isAllowedUrl(url: string): boolean {
  const parsed = new URL(url);
  return ALLOWED_DOMAINS.includes(parsed.hostname);
}
```

## Getting Help

If you're still stuck after trying these solutions:

1. **Check MCP documentation:** https://modelcontextprotocol.io
2. **Review the skill SKILL.md:** `.claude/skills/develop-mcp-server/SKILL.md`
3. **Check reference files:**
   - `references/transport-patterns.md`
   - `references/tool-development.md`
   - `references/validation-checklist.md`
4. **Enable debug logging:**

```typescript
const DEBUG = process.env.DEBUG === "true";

if (DEBUG) {
  console.error("Debug:", data);
}
```

5. **Create minimal reproduction:**

```typescript
const server = new McpServer({ name: "test", version: "0.1.0" });

server.registerTool(
  "test-tool",
  {
    description: "Test",
    inputSchema: z.object({}),
  },
  async () => ({
    content: [{ type: "text", text: "works" }],
  }),
);
```
