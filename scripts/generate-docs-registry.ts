import { join } from "path";
import { existsSync } from "fs";
import { getDirectories, writeTypeScriptFile } from "./utils";

const OUTPUT_FILE = join(
  __dirname,
  "../packages/react-native/src/docs-registry.ts",
);

function toPascalCase(kebabCase: string): string {
  return kebabCase
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function generateDocsRegistry(): void {
  console.log("Generating docs registry...");

  const componentDirectories = getDirectories(false);
  const componentsWithDocs: Array<{ name: string; importName: string }> = [];

  for (const dir of componentDirectories) {
    const readmePath = join(
      __dirname,
      `../packages/react-native/src/${dir}/README.mdx`,
    );

    if (!existsSync(readmePath)) {
      console.warn(`Warning: Skipping ${dir} - README.mdx not found`);
      continue;
    }

    componentsWithDocs.push({
      name: dir,
      importName: `${toPascalCase(dir)}Docs`,
    });
  }

  if (componentsWithDocs.length === 0) {
    console.error("Error: No components found with README.mdx files");
    process.exit(1);
  }

  componentsWithDocs.sort((a, b) => a.name.localeCompare(b.name));

  const imports = componentsWithDocs
    .map(
      ({ name, importName }) =>
        `import ${importName} from "./${name}/README.mdx";`,
    )
    .join("\n");

  const registryEntries = componentsWithDocs
    .map(({ name, importName }) => `  "${name}": ${importName},`)
    .join("\n");

  const content = `import React from "react";

${imports}

export const docsRegistry: Record<string, React.FC> = {
${registryEntries}
};
`;

  writeTypeScriptFile(OUTPUT_FILE, content);

  console.log(
    `✓ Generated docs registry with ${componentsWithDocs.length} components`,
  );
}

generateDocsRegistry();
