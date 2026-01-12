import { join } from "path";
import { existsSync } from "fs";
import {
  getDirectories,
  readMetaJson,
  formatDate,
  writeJsonFile,
  type ComponentMeta,
} from "./utils";

const OUTPUT_FILE = join(
  __dirname,
  "../packages/react-native/src/registry.json",
);

interface RegistryEntry {
  type: string;
  name: string;
  description: string;
  dependencies: string[];
}

interface Registry {
  version: string;
  generatedAt: string;
  components: RegistryEntry[];
}

function generateRegistry(): void {
  console.log("Generating component registry...");

  const componentDirectories = getDirectories(false);
  const components: RegistryEntry[] = [];
  let skippedCount = 0;

  for (const dir of componentDirectories) {
    const metaPath = join(
      __dirname,
      `../packages/react-native/src/${dir}/meta.json`,
    );

    if (!existsSync(metaPath)) {
      console.warn(`Warning: Skipping ${dir} - meta.json not found`);
      skippedCount++;
      continue;
    }

    try {
      const meta: ComponentMeta = readMetaJson(dir);
      components.push({
        type: meta.type,
        name: meta.name,
        description: meta.description,
        dependencies: meta.dependencies,
      });
    } catch (error) {
      console.error(`Error: Failed to parse meta.json for ${dir}:`, error);
      skippedCount++;
      continue;
    }
  }

  if (components.length === 0) {
    console.error("Error: No components found with valid meta.json files");
    process.exit(1);
  }

  components.sort((a, b) => a.name.localeCompare(b.name));

  const registry: Registry = {
    version: "1.0.0",
    generatedAt: formatDate(),
    components,
  };

  writeJsonFile(OUTPUT_FILE, registry);

  console.log(
    `✓ Generated registry with ${components.length} components${skippedCount > 0 ? ` (skipped ${skippedCount})` : ""}`,
  );
}

generateRegistry();
