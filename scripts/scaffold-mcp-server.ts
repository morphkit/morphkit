import { loadScaffdog } from "scaffdog";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "child_process";

interface ToolConfig {
  name: string;
  feature: string;
  description: string;
}

interface McpServerConfig {
  name: string;
  description: string;
  transportType: "stdio" | "streamable-http";
  tools: ToolConfig[];
  dependencies?: string[];
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function generateToolImplementation(
  toolName: string,
  camelName: string,
  description: string,
): string {
  return `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const inputSchema = z.object({
  param: z.string(),
});

type Input = z.infer<typeof inputSchema>;

export function ${camelName}Tool(server: McpServer) {
  server.registerTool(
    "${toolName}",
    {
      description: "${description}",
      inputSchema,
    },
    async (input) => {
      try {
        const validated: Input = inputSchema.parse(input);

        const result = {
          message: \`Tool ${toolName} executed with param: \${validated.param}\`,
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            content: [
              {
                type: "text",
                text: \`Validation error: \${error.errors.map((e) => e.message).join(", ")}\`,
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: \`Error: \${error instanceof Error ? error.message : "Unknown error"}\`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
`;
}

function generateToolTest(toolName: string, camelName: string): string {
  return `import { describe, it, expect } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ${camelName}Tool } from "./${toolName}.js";

describe("${toolName}", () => {
  it("should register tool without errors", () => {
    const server = new McpServer({
      name: "test-server",
      version: "0.1.0",
    });

    expect(() => {
      ${camelName}Tool(server);
    }).not.toThrow();
  });

  it("should export tool function", () => {
    expect(${camelName}Tool).toBeDefined();
    expect(typeof ${camelName}Tool).toBe("function");
  });
});
`;
}

async function scaffoldMcpServer(config: McpServerConfig): Promise<void> {
  const kebabName = toKebabCase(config.name);
  const pascalName = toPascalCase(config.name);
  const outputDir = join(process.cwd(), "packages");
  const targetDir = join(outputDir, `${kebabName}-mcp`);

  if (existsSync(targetDir)) {
    console.error(
      `❌ Error: MCP server directory already exists: ${targetDir}`,
    );
    process.exit(1);
  }

  if (!config.tools || config.tools.length === 0) {
    console.error("❌ Error: At least one tool must be defined");
    process.exit(1);
  }

  if (
    config.transportType !== "stdio" &&
    config.transportType !== "streamable-http"
  ) {
    console.error(
      '❌ Error: transportType must be "stdio" or "streamable-http"',
    );
    process.exit(1);
  }

  console.log(
    `\n📦 Scaffolding MCP server: ${pascalName} (${kebabName}-mcp)...\n`,
  );
  console.log(`   Transport: ${config.transportType}`);
  console.log(`   Tools: ${config.tools.length}\n`);

  const toolsArray = config.tools.map((tool) => ({
    name: toKebabCase(tool.name),
    feature: toKebabCase(tool.feature),
    description: tool.description,
  }));

  const dependenciesArray = config.dependencies || [];

  try {
    const scaffdog = await loadScaffdog(process.cwd());

    const documents = await scaffdog.list();
    const mcpServerDoc = documents.find((d) => d.name === "mcp-server");

    if (!mcpServerDoc) {
      throw new Error("MCP server template not found in .scaffdog/");
    }

    const files = await scaffdog.generate(mcpServerDoc, outputDir, {
      inputs: {
        name: kebabName,
        description: config.description,
        transportType: config.transportType,
        toolsJson: JSON.stringify(toolsArray),
        toolsArray,
        dependenciesJson: JSON.stringify(dependenciesArray),
        dependenciesArray,
      },
    });

    let writtenCount = 0;
    for (const file of files) {
      if (file.skip) {
        console.log(`  ⊘ Skipped: ${file.path}`);
        continue;
      }

      await mkdir(join(file.path, ".."), { recursive: true });

      await writeFile(file.path, file.content, "utf-8");
      console.log(`  ✔ Created: ${file.path.replace(process.cwd() + "/", "")}`);
      writtenCount++;
    }

    console.log(`\n✅ Generated ${writtenCount} files from template!\n`);

    console.log("📝 Generating tool files...");
    for (const tool of toolsArray) {
      const toolDir = join(targetDir, "src", "tools", tool.feature);
      await mkdir(toolDir, { recursive: true });

      const toolImplPath = join(toolDir, `${tool.name}.ts`);
      const toolTestPath = join(toolDir, `${tool.name}.test.ts`);

      const camelName = toCamelCase(tool.name);

      const toolImplContent = generateToolImplementation(
        tool.name,
        camelName,
        tool.description,
      );
      const toolTestContent = generateToolTest(tool.name, camelName);

      await writeFile(toolImplPath, toolImplContent, "utf-8");
      console.log(
        `  ✔ Created: ${toolImplPath.replace(process.cwd() + "/", "")}`,
      );
      writtenCount++;

      await writeFile(toolTestPath, toolTestContent, "utf-8");
      console.log(
        `  ✔ Created: ${toolTestPath.replace(process.cwd() + "/", "")}`,
      );
      writtenCount++;
    }

    console.log(`\n✅ Generated ${writtenCount} total files!\n`);

    console.log("📦 Installing dependencies...");
    try {
      execSync(`cd ${targetDir} && bun install`, {
        stdio: "inherit",
      });
      console.log("  ✔ Dependencies installed\n");
    } catch (error) {
      console.error("  ⚠️  Dependency installation failed, run manually\n");
    }

    console.log("✨ Formatting code...");
    try {
      execSync("bun run format", { stdio: "inherit" });
      console.log("  ✔ Code formatted\n");
    } catch (error) {
      console.error("  ⚠️  Formatting failed\n");
    }

    console.log("🎉 MCP server scaffolding complete!\n");
    console.log("📋 Next steps:");
    console.log(`  1. Navigate to packages/${kebabName}-mcp/`);
    console.log(`  2. Configure .env file (copy from .env.example)`);
    console.log(
      `  3. Implement tool logic in src/tools/{feature}/{tool-name}.ts`,
    );
    console.log(`  4. Add comprehensive tests for each tool`);
    console.log(
      `  5. Run verification: bun run check-types && bun run lint && bun run test`,
    );
    console.log(`  6. Test server: bun run dev\n`);

    console.log("🛠️  Tool Implementation:");
    for (const tool of toolsArray) {
      console.log(
        `  - ${tool.name}: packages/${kebabName}-mcp/src/tools/${tool.feature}/${tool.name}.ts`,
      );
    }
    console.log("");
  } catch (error) {
    console.error("\n❌ Scaffolding failed:", error);
    process.exit(1);
  }
}

const configJson = process.argv[2];

if (!configJson) {
  console.error(
    'Usage: bun run scripts/scaffold-mcp-server.ts \'{"name":"server-name","description":"Description","transportType":"stdio","tools":[...]}\'',
  );
  process.exit(1);
}

try {
  const config: McpServerConfig = JSON.parse(configJson);
  await scaffoldMcpServer(config);
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error("❌ Invalid JSON configuration");
  }
  throw error;
}
