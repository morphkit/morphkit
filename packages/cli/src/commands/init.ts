import { intro, outro, select, text, confirm, isCancel } from "@clack/prompts";
import pc from "picocolors";
import { configExists, writeConfig } from "../utils/config.js";
import { createDirectory } from "../utils/file-operations.js";
import { validatePath } from "../utils/validation.js";
import { ConfigExistsError } from "../utils/errors.js";
import type { ProjectType, Config } from "../types/index.js";

export async function initCommand(): Promise<void> {
  intro(pc.cyan("Initialize warp-ui in your project"));

  // Check if config already exists
  if (await configExists()) {
    throw new ConfigExistsError();
  }

  // Project type selection
  const projectType = await select({
    message: "Select your project type",
    options: [
      { value: "react-native" as const, label: "React Native" },
      { value: "react" as const, label: "React (Web)" },
    ],
  });

  if (isCancel(projectType)) {
    outro(pc.red("Operation cancelled"));
    process.exit(0);
  }

  // Component path input
  const componentPath = await text({
    message: "Component folder root (relative to project root)",
    placeholder: "src/components/ui",
    defaultValue: "src/components/ui",
    validate: (value) => {
      try {
        validatePath(value);
        return undefined;
      } catch (error) {
        if (error instanceof Error) {
          return error.message;
        }
        return "Invalid path";
      }
    },
  });

  if (isCancel(componentPath)) {
    outro(pc.red("Operation cancelled"));
    process.exit(0);
  }

  // Confirm directory creation
  const shouldCreate = await confirm({
    message: `Create directory ${componentPath}?`,
    initialValue: true,
  });

  if (isCancel(shouldCreate)) {
    outro(pc.red("Operation cancelled"));
    process.exit(0);
  }

  // Create directory
  if (shouldCreate) {
    await createDirectory(componentPath);
  }

  // Create config file
  const config: Config = {
    type: projectType as ProjectType,
    paths: {
      ui: componentPath as string,
    },
  };

  await writeConfig(config);

  outro(
    pc.green("Configuration saved! Run `npx warp-ui pull` to add components."),
  );
}
