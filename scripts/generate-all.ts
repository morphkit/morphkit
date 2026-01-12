import { execSync } from "child_process";
import { join } from "path";

const SCRIPTS_DIR = __dirname;

function runScript(scriptName: string): void {
  const scriptPath = join(SCRIPTS_DIR, scriptName);
  try {
    execSync(`bun run ${scriptPath}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error running ${scriptName}`);
    process.exit(1);
  }
}

function generateAll(): void {
  console.log("Regenerating all registries and exports...\n");

  runScript("generate-component-registry.ts");
  runScript("generate-docs-registry.ts");
  runScript("generate-barrel-exports.ts");

  console.log("\n✓ All registries and exports regenerated successfully!");
}

generateAll();
