import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ComponentMeta {
  type: "expo" | "react-native-cli";
  lib: "stylesheet" | "nativewind" | "tailwind";
  name: string;
  componentName: string;
  description?: string;
  dependencies?: string[];
  version?: string;
}

interface Registry {
  version: string;
  generatedAt: string;
  components: ComponentMeta[];
}

async function generateRegistry() {
  const srcDir = join(__dirname, "..", "src");
  const registryPath = join(srcDir, "registry.json");

  console.log("🔍 Scanning components in:", srcDir);

  // Read all directories in src
  const entries = await readdir(srcDir, { withFileTypes: true });
  const components: ComponentMeta[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const metaPath = join(srcDir, entry.name, "meta.json");

      try {
        const metaContent = await readFile(metaPath, "utf-8");
        const meta = JSON.parse(metaContent) as ComponentMeta;

        // Validate required fields
        if (!meta.type || !meta.lib || !meta.name || !meta.componentName) {
          console.warn(
            `⚠️  Skipping ${entry.name}: missing required fields in meta.json`,
          );
          continue;
        }

        components.push(meta);
        console.log(`✓ Added ${meta.componentName} (${meta.type}/${meta.lib})`);
      } catch (error) {
        // Skip directories without valid meta.json
        console.log(`⊘ Skipped ${entry.name}: no valid meta.json`);
      }
    }
  }

  // Sort components alphabetically by name
  components.sort((a, b) => a.name.localeCompare(b.name));

  // Create registry object
  const registry: Registry = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    components,
  };

  // Write registry file
  await writeFile(registryPath, JSON.stringify(registry, null, 2), "utf-8");

  console.log(`\n✅ Registry generated with ${components.length} components`);
  console.log(`📝 Written to: ${registryPath}`);
}

generateRegistry().catch((error) => {
  console.error("❌ Failed to generate registry:", error);
  process.exit(1);
});
