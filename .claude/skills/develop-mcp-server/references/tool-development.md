# MCP Tool Development Patterns

This document provides comprehensive patterns for implementing MCP tools following modelcontextprotocol.io standards.

## Tool Structure

Every MCP tool consists of:

1. **Tool Registration** - Registering the tool with the server
2. **Input Schema** - Zod schema defining expected parameters
3. **Tool Logic** - Core implementation
4. **Error Handling** - Graceful error responses
5. **Response Formatting** - MCP-compliant output
6. **Unit Tests** - Verification of functionality

## Basic Tool Template

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const inputSchema = z.object({
  param1: z.string(),
  param2: z.number().optional(),
});

type Input = z.infer<typeof inputSchema>;

export function registerExampleTool(server: McpServer) {
  server.registerTool(
    "example-tool",
    {
      description: "Brief description of what this tool does",
      inputSchema,
    },
    async (input) => {
      try {
        const validated = inputSchema.parse(input);
        const result = await executeToolLogic(validated);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
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
}

async function executeToolLogic(input: Input) {
  const { param1, param2 = 10 } = input;
  return { result: `Processed ${param1} with ${param2}` };
}
```

## Input Schema Patterns

### Simple Primitives

```typescript
const inputSchema = z.object({
  name: z.string(),
  age: z.number(),
  active: z.boolean(),
});
```

### Optional Fields

```typescript
const inputSchema = z.object({
  required: z.string(),
  optional: z.string().optional(),
  withDefault: z.number().default(10),
});
```

### Enums and Literals

```typescript
const inputSchema = z.object({
  status: z.enum(["pending", "active", "completed"]),
  type: z.literal("user"),
  role: z.union([z.literal("admin"), z.literal("user")]),
});
```

### Arrays

```typescript
const inputSchema = z.object({
  tags: z.array(z.string()),
  numbers: z.array(z.number()).min(1).max(10),
  items: z.array(
    z.object({
      id: z.string(),
      value: z.number(),
    }),
  ),
});
```

### Nested Objects

```typescript
const inputSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    profile: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
  }),
});
```

### String Validation

```typescript
const inputSchema = z.object({
  email: z.string().email(),
  url: z.string().url(),
  uuid: z.string().uuid(),
  minLength: z.string().min(3),
  maxLength: z.string().max(100),
  pattern: z.string().regex(/^[A-Z]{3}\d{3}$/),
});
```

### Number Validation

```typescript
const inputSchema = z.object({
  positive: z.number().positive(),
  negative: z.number().negative(),
  integer: z.number().int(),
  range: z.number().min(1).max(100),
  multipleOf: z.number().multipleOf(5),
});
```

### Transformations

```typescript
const inputSchema = z.object({
  timestamp: z.string().transform((val) => new Date(val)),
  upperCase: z.string().transform((val) => val.toUpperCase()),
  parsed: z.string().transform((val) => JSON.parse(val)),
});
```

## Response Patterns

### Text Response

```typescript
return {
  content: [
    {
      type: "text",
      text: "Simple text response",
    },
  ],
};
```

### JSON Response

```typescript
const data = {
  id: "123",
  name: "Example",
  items: [1, 2, 3],
};

return {
  content: [
    {
      type: "text",
      text: JSON.stringify(data, null, 2),
    },
  ],
};
```

### Multiple Content Blocks

```typescript
return {
  content: [
    {
      type: "text",
      text: "First part of response",
    },
    {
      type: "text",
      text: JSON.stringify({ data: "structured" }, null, 2),
    },
  ],
};
```

### Error Response

```typescript
return {
  content: [
    {
      type: "text",
      text: `Error: ${errorMessage}`,
    },
  ],
  isError: true,
};
```

## Error Handling Patterns

### Validation Errors

```typescript
import { z } from "zod";

try {
  const validated = inputSchema.parse(input);
} catch (error) {
  if (error instanceof z.ZodError) {
    const messages = error.errors.map(
      (e) => `${e.path.join(".")}: ${e.message}`,
    );
    return {
      content: [
        {
          type: "text",
          text: `Validation errors:\n${messages.join("\n")}`,
        },
      ],
      isError: true,
    };
  }
}
```

### API Errors

```typescript
try {
  const response = await fetch(apiEndpoint);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return formatSuccess(data);
} catch (error) {
  if (error instanceof Error) {
    return {
      content: [
        {
          type: "text",
          text: `Failed to fetch data: ${error.message}`,
        },
      ],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: "text",
        text: "An unknown error occurred",
      },
    ],
    isError: true,
  };
}
```

### Custom Error Types

```typescript
class ToolExecutionError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
    this.name = "ToolExecutionError";
  }
}

try {
  if (!isValid) {
    throw new ToolExecutionError("Invalid operation", "INVALID_OP");
  }
} catch (error) {
  if (error instanceof ToolExecutionError) {
    return {
      content: [
        {
          type: "text",
          text: `${error.code}: ${error.message}`,
        },
      ],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: "text",
        text: `Unexpected error: ${error instanceof Error ? error.message : "Unknown"}`,
      },
    ],
    isError: true,
  };
}
```

## Common Tool Patterns

### Database Query Tool

```typescript
import { z } from "zod";
import { createClient } from "./database.js";

const inputSchema = z.object({
  table: z.string(),
  filters: z.record(z.unknown()).optional(),
  limit: z.number().int().positive().max(1000).default(100),
});

export function registerQueryTool(server: McpServer) {
  server.registerTool(
    "query-database",
    {
      description: "Queries the database with filters",
      inputSchema,
    },
    async (input) => {
      const { table, filters = {}, limit } = inputSchema.parse(input);

      try {
        const client = createClient();
        const results = await client
          .from(table)
          .select()
          .match(filters)
          .limit(limit);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  count: results.length,
                  results,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Database query failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
```

### File System Tool

```typescript
import { z } from "zod";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const inputSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  operation: z.enum(["read", "write"]),
});

export function registerFileSystemTool(server: McpServer) {
  server.registerTool(
    "file-system",
    {
      description: "Reads or writes files",
      inputSchema,
    },
    async (input) => {
      const { path, content, operation } = inputSchema.parse(input);

      try {
        const resolvedPath = resolve(path);

        if (operation === "read") {
          const fileContent = await readFile(resolvedPath, "utf-8");
          return {
            content: [
              {
                type: "text",
                text: fileContent,
              },
            ],
          };
        }

        if (operation === "write") {
          if (!content) {
            throw new Error("Content required for write operation");
          }
          await writeFile(resolvedPath, content, "utf-8");
          return {
            content: [
              {
                type: "text",
                text: `Successfully wrote to ${path}`,
              },
            ],
          };
        }

        throw new Error("Invalid operation");
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `File operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
```

### HTTP Request Tool

```typescript
import { z } from "zod";

const inputSchema = z.object({
  url: z.string().url(),
  method: z.enum(["GET", "POST", "PUT", "DELETE"]).default("GET"),
  headers: z.record(z.string()).optional(),
  body: z.unknown().optional(),
});

export function registerHttpTool(server: McpServer) {
  server.registerTool(
    "http-request",
    {
      description: "Makes HTTP requests to external APIs",
      inputSchema,
    },
    async (input) => {
      const { url, method, headers, body } = inputSchema.parse(input);

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  status: response.status,
                  headers: Object.fromEntries(response.headers.entries()),
                  data,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return {
            content: [
              {
                type: "text",
                text: "Request timeout after 10 seconds",
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: `HTTP request failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
```

### Search Tool

```typescript
import { z } from "zod";

const inputSchema = z.object({
  query: z.string().min(1),
  filters: z
    .object({
      category: z.string().optional(),
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
    })
    .optional(),
  sort: z.enum(["relevance", "price", "date"]).default("relevance"),
  limit: z.number().int().positive().max(100).default(10),
});

export function registerSearchTool(server: McpServer) {
  server.registerTool(
    "search",
    {
      description: "Searches with filters and sorting",
      inputSchema,
    },
    async (input) => {
      const { query, filters, sort, limit } = inputSchema.parse(input);

      try {
        const results = await performSearch({
          query,
          filters,
          sort,
          limit,
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  query,
                  total: results.total,
                  count: results.items.length,
                  items: results.items,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Search failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}

async function performSearch(params: {
  query: string;
  filters?: { category?: string; minPrice?: number; maxPrice?: number };
  sort: string;
  limit: number;
}) {
  return {
    total: 0,
    items: [],
  };
}
```

## Testing Patterns

### Unit Test Template

```typescript
import { describe, it, expect, jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerExampleTool } from "./example-tool.js";

describe("example-tool", () => {
  let server: McpServer;

  beforeEach(() => {
    server = new McpServer({
      name: "test-server",
      version: "0.1.0",
    });
    registerExampleTool(server);
  });

  it("should register tool successfully", () => {
    const tools = server.listTools();
    expect(tools).toContainEqual(
      expect.objectContaining({
        name: "example-tool",
      }),
    );
  });

  it("should execute with valid input", async () => {
    const result = await server.executeTool("example-tool", {
      param1: "test",
      param2: 42,
    });

    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe("text");
    expect(result.isError).toBeUndefined();
  });

  it("should reject invalid input", async () => {
    const result = await server.executeTool("example-tool", {
      param1: 123,
    });

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain("Validation");
  });

  it("should handle errors gracefully", async () => {
    jest.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

    const result = await server.executeTool("example-tool", {
      param1: "test",
    });

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain("Error");
  });
});
```

### Mocking External Dependencies

```typescript
import { jest } from "@jest/globals";

jest.mock("./external-api.js", () => ({
  fetchData: jest.fn().mockResolvedValue({ data: "mocked" }),
}));

it("should use mocked API", async () => {
  const result = await server.executeTool("api-tool", { id: "123" });
  expect(result.content[0].text).toContain("mocked");
});
```

## Best Practices

### Do's

✅ **Always validate inputs with Zod**

```typescript
const validated = inputSchema.parse(input);
```

✅ **Use descriptive error messages**

```typescript
return {
  content: [
    {
      type: "text",
      text: "Invalid email format: expected format is user@domain.com",
    },
  ],
  isError: true,
};
```

✅ **Handle edge cases explicitly**

```typescript
if (array.length === 0) {
  return {
    content: [{ type: "text", text: "No results found" }],
  };
}
```

✅ **Use proper TypeScript types**

```typescript
type Input = z.infer<typeof inputSchema>;
type Result = { id: string; name: string };
```

✅ **Add timeouts for external calls**

```typescript
const response = await fetch(url, {
  signal: AbortSignal.timeout(5000),
});
```

✅ **Return structured JSON responses**

```typescript
return {
  content: [
    {
      type: "text",
      text: JSON.stringify({ success: true, data }, null, 2),
    },
  ],
};
```

### Don'ts

❌ **Never skip input validation**

```typescript
const { param1 } = input;
```

❌ **Never use `any` types**

```typescript
function process(data: any) {
  // Use proper types instead
}
```

❌ **Never return raw error objects**

```typescript
return {
  content: [{ type: "text", text: error }],
};
```

❌ **Never hardcode sensitive values**

```typescript
const API_KEY = "sk-1234567890";
```

❌ **Never ignore error handling**

```typescript
const result = await riskyOperation();
return result;
```

❌ **Never add code comments**

```typescript
const result = calculateTotal(price, quantity);
```

## Tool Organization

### File Structure

```
src/tools/
├── math/
│   ├── calculate-sum.ts
│   ├── format-number.ts
│   ├── calculate-sum.test.ts
│   └── format-number.test.ts
├── database/
│   ├── query.ts
│   ├── insert.ts
│   ├── query.test.ts
│   └── insert.test.ts
└── index.ts
```

### Index File Pattern

```typescript
export { registerCalculateSumTool } from "./math/calculate-sum.js";
export { registerFormatNumberTool } from "./math/format-number.js";
export { registerQueryTool } from "./database/query.js";
export { registerInsertTool } from "./database/insert.js";
```

### Server Registration

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  registerCalculateSumTool,
  registerFormatNumberTool,
  registerQueryTool,
  registerInsertTool,
} from "./tools/index.js";

const server = new McpServer({
  name: "example-mcp",
  version: "0.1.0",
});

registerCalculateSumTool(server);
registerFormatNumberTool(server);
registerQueryTool(server);
registerInsertTool(server);
```

## Performance Considerations

### Caching

```typescript
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function getCached(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCache(key: string, data: unknown) {
  cache.set(key, { data, timestamp: Date.now() });
}
```

### Rate Limiting

```typescript
const rateLimits = new Map<string, number[]>();

function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const requests = rateLimits.get(identifier) || [];
  const recentRequests = requests.filter((time) => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return false;
  }

  recentRequests.push(now);
  rateLimits.set(identifier, recentRequests);
  return true;
}
```

### Batching

```typescript
const batchQueue: Array<{ id: string; resolve: (value: unknown) => void }> = [];
let batchTimeout: NodeJS.Timeout | null = null;

function batchRequest(id: string): Promise<unknown> {
  return new Promise((resolve) => {
    batchQueue.push({ id, resolve });

    if (batchTimeout) {
      clearTimeout(batchTimeout);
    }

    batchTimeout = setTimeout(async () => {
      const batch = [...batchQueue];
      batchQueue.length = 0;

      const results = await fetchBatch(batch.map((item) => item.id));

      batch.forEach((item, index) => {
        item.resolve(results[index]);
      });
    }, 50);
  });
}

async function fetchBatch(ids: string[]) {
  return [];
}
```

## Security Considerations

1. **Validate all inputs** - Never trust user input
2. **Sanitize error messages** - Don't expose internal details
3. **Use environment variables** - Keep secrets secure
4. **Implement rate limiting** - Prevent abuse
5. **Add timeouts** - Prevent resource exhaustion
6. **Validate URLs** - Prevent SSRF attacks
7. **Limit response sizes** - Prevent memory issues
8. **Log security events** - Enable auditing
