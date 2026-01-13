import { loadScaffdog } from "scaffdog";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "child_process";

interface ComponentConfig {
  name: string;
  description: string;
  baseComponent: "View" | "Pressable" | "TextInput" | "ScrollView";
  hasVariants: boolean;
  variants?: string;
  hasSizes: boolean;
  sizes?: string;
  needsForwardRef: boolean;
  hasIcons: boolean;
  hasLoading: boolean;
  hasDisabled: boolean;
  dependencies?: string;
  category?: string;
  tags?: string;
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

async function scaffoldComponent(config: ComponentConfig): Promise<void> {
  const pascalName = toPascalCase(config.name);
  const kebabName = toKebabCase(config.name);
  const outputDir = join(process.cwd(), "packages/react-native/src");
  const targetDir = join(outputDir, kebabName);

  if (existsSync(targetDir)) {
    console.error(`❌ Error: Component directory already exists: ${targetDir}`);
    process.exit(1);
  }

  console.log(`\n📦 Scaffolding component: ${pascalName} (${kebabName})...\n`);

  const tagsArray = config.tags
    ? config.tags.split(",").map((t) => `"${t.trim()}"`)
    : [];
  const depsArray = config.dependencies
    ? config.dependencies.split(",").map((d) => `"${d.trim()}"`)
    : [];

  try {
    const scaffdog = await loadScaffdog(process.cwd());

    const documents = await scaffdog.list();
    const componentDoc = documents.find((d) => d.name === "component");

    if (!componentDoc) {
      throw new Error("Component template not found in .scaffdog/");
    }

    const files = await scaffdog.generate(componentDoc, outputDir, {
      inputs: {
        name: config.name,
        description: config.description,
        baseComponent: config.baseComponent,
        hasVariants: config.hasVariants,
        variants: config.variants || "",
        hasSizes: config.hasSizes,
        sizes: config.sizes || "",
        needsForwardRef: config.needsForwardRef,
        hasIcons: config.hasIcons,
        hasLoading: config.hasLoading,
        hasDisabled: config.hasDisabled,
        dependencies: config.dependencies || "",
        category: config.category || "display",
        tags: config.tags || "",
        tagsJson: tagsArray.join(", "),
        dependenciesJson: depsArray.join(", "),
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

    console.log(`\n✅ Generated ${writtenCount} files!\n`);

    console.log("📝 Updating theme exports...");
    updateThemeExports(pascalName, kebabName);
    console.log("  ✔ Theme exports updated\n");

    console.log("🔄 Regenerating registries...");
    execSync("bun run generate", { stdio: "inherit" });
    console.log("  ✔ Registries regenerated\n");

    console.log("✨ Formatting code...");
    execSync("bun run format", { stdio: "inherit" });
    console.log("  ✔ Code formatted\n");

    console.log("🎉 Component scaffolding complete!\n");
    console.log("📋 Next steps:");
    console.log(
      `  1. Customize theme tokens in src/${kebabName}/${pascalName}.theme.ts`,
    );
    console.log(
      `  2. Implement component logic in src/${kebabName}/${pascalName}.tsx`,
    );
    console.log(
      `  3. Add comprehensive tests in src/${kebabName}/${pascalName}.test.tsx`,
    );
    console.log(`  4. Update README.mdx with examples`);
    console.log(
      `  5. Run verification: bun run check-types && bun run lint && bun run test\n`,
    );
  } catch (error) {
    console.error("\n❌ Scaffolding failed:", error);
    process.exit(1);
  }
}

function updateThemeExports(pascalName: string, kebabName: string): void {
  const themePath = join(
    process.cwd(),
    "packages/react-native/src/theme/tokens/components.ts",
  );

  const content = readFileSync(themePath, "utf-8");
  const exportLine = `export * from "../../${kebabName}/${pascalName}.theme";`;

  if (content.includes(exportLine)) {
    console.log("  ⊘ Export already exists, skipping");
    return;
  }

  const lines = content.split("\n").filter((line) => line.trim());
  lines.push(exportLine);
  lines.sort();

  writeFileSync(themePath, lines.join("\n") + "\n", "utf-8");
}

const configJson = process.argv[2];

if (!configJson) {
  console.error(
    'Usage: bun run scripts/scaffold-component.ts \'{"name":"ComponentName",...}\'',
  );
  process.exit(1);
}

try {
  const config: ComponentConfig = JSON.parse(configJson);
  await scaffoldComponent(config);
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error("❌ Invalid JSON configuration");
  }
  throw error;
}
