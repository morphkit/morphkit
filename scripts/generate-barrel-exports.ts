import { join } from "path";
import { getDirectories, writeTypeScriptFile } from "./utils";

const OUTPUT_FILE = join(__dirname, "../packages/react-native/src/index.ts");

function generateBarrelExports(): void {
  console.log("Generating barrel exports...");

  const directories = getDirectories(true);

  const exports = directories
    .map((dir) => `export * from "./${dir}";`)
    .join("\n");

  const content = `${exports}\n`;

  writeTypeScriptFile(OUTPUT_FILE, content);

  console.log(
    `✓ Generated barrel exports for ${directories.length} directories`,
  );
}

generateBarrelExports();
