import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ComponentMeta {
  type: "react-native" | "react";
  name: string;
  description?: string;
  dependencies?: string[];
  variables?: Record<string, string | number>;
}

async function generateTheme(outputPath?: string) {
  const srcDir = join(__dirname, "..", "src");
  const defaultOutputPath = join(
    __dirname,
    "..",
    "..",
    "..",
    "apps",
    "demo-react-native-app",
    "warpui.config.mjs",
  );
  const targetPath = outputPath || defaultOutputPath;

  console.log("🎨 Generating theme from component variables...");

  const entries = await readdir(srcDir, { withFileTypes: true });
  const allVariables: Record<string, string | number> = {};

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const metaPath = join(srcDir, entry.name, "meta.json");

      try {
        const metaContent = await readFile(metaPath, "utf-8");
        const meta = JSON.parse(metaContent) as ComponentMeta;

        if (meta.variables) {
          Object.assign(allVariables, meta.variables);
          console.log(
            `✓ Added ${Object.keys(meta.variables).length} variables from ${meta.name}`,
          );
        }
      } catch {
        continue;
      }
    }
  }

  const variableCount = Object.keys(allVariables).length;

  if (variableCount === 0) {
    console.warn("⚠️  No variables found in any components");
    return;
  }

  const formatValue = (value: string | number): string => {
    return typeof value === "string" ? `'${value}'` : String(value);
  };

  const lightVariables = Object.entries(allVariables)
    .map(([key, value]) => `    '${key}': ${formatValue(value)},`)
    .join("\n");

  const darkVariables = Object.entries(allVariables)
    .map(([key, value]) => `    '${key}': ${formatValue(value)},`)
    .join("\n");

  const themeContent = `export const theme = {
  light: {
${lightVariables}
  },
  dark: {
${darkVariables}
  }
}

export const config = {
  type: 'react-native',
  paths: {
    ui: './components'
  }
}
`;

  await writeFile(targetPath, themeContent, "utf-8");

  console.log(`\n✅ Theme generated with ${variableCount} variables`);
  console.log(`📝 Written to: ${targetPath}`);
  console.log(
    "\n💡 Tip: Customize dark theme values in warpui.config.mjs for dark mode support",
  );
}

const outputPath = process.argv[2];
generateTheme(outputPath).catch((error) => {
  console.error("❌ Failed to generate theme:", error);
  process.exit(1);
});
