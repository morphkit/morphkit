import { intro, outro, select, text, confirm, isCancel } from "@clack/prompts";
import pc from "picocolors";
import { rm } from "fs/promises";
import { configExists, writeConfig, getConfigPath } from "../utils/config.js";
import { createDirectory } from "../utils/file-operations.js";
import { validatePath } from "../utils/validation.js";
import { ConfigExistsError, ValidationError } from "../utils/errors.js";
import { isInteractive } from "../utils/context.js";
import { isJsonMode, outputSuccess } from "../utils/output.js";
import type { ProjectType, Config, InitOptions } from "../types/index.js";

export async function initCommand(options: InitOptions): Promise<void> {
  const interactive = isInteractive(options.yes);

  if (interactive && !isJsonMode()) {
    intro(pc.cyan("Initialize morphkit in your project"));
  }

  if (await configExists()) {
    if (options.overwrite) {
      await rm(getConfigPath(), { force: true });
    } else {
      throw new ConfigExistsError();
    }
  }

  let projectType: ProjectType;
  let componentPath: string;
  let flowPath: string;

  if (interactive) {
    const selectedType = await select({
      message: "Select your project type",
      options: [
        { value: "react-native" as const, label: "React Native" },
        { value: "react" as const, label: "React (Web)" },
      ],
    });

    if (isCancel(selectedType)) {
      outro(pc.red("Operation cancelled"));
      process.exit(0);
    }

    projectType = selectedType as ProjectType;

    const inputComponentPath = await text({
      message: "Component folder path (relative to project root)",
      placeholder: options.componentPath,
      defaultValue: options.componentPath,
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

    if (isCancel(inputComponentPath)) {
      outro(pc.red("Operation cancelled"));
      process.exit(0);
    }

    componentPath = inputComponentPath as string;

    const inputFlowPath = await text({
      message: "Flow folder path (relative to project root)",
      placeholder: options.flowPath,
      defaultValue: options.flowPath,
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

    if (isCancel(inputFlowPath)) {
      outro(pc.red("Operation cancelled"));
      process.exit(0);
    }

    flowPath = inputFlowPath as string;

    const shouldCreateDirs = await confirm({
      message: `Create directories ${componentPath} and ${flowPath}?`,
      initialValue: true,
    });

    if (isCancel(shouldCreateDirs)) {
      outro(pc.red("Operation cancelled"));
      process.exit(0);
    }

    if (shouldCreateDirs) {
      await createDirectory(componentPath);
      await createDirectory(flowPath);
    }
  } else {
    if (!options.projectType) {
      throw new ValidationError(
        "Project type is required in non-interactive mode. Use --project-type or -t flag.",
      );
    }

    projectType = options.projectType;
    componentPath = options.componentPath ?? "src/components/ui";
    flowPath = options.flowPath ?? "src/flows";

    validatePath(componentPath);
    validatePath(flowPath);

    await createDirectory(componentPath);
    await createDirectory(flowPath);
  }

  const config: Config = {
    type: projectType,
    paths: {
      components: componentPath,
      flows: flowPath,
    },
  };

  await writeConfig(config);

  const successMessage = `Configuration saved! Run \`morphkit pull\` to add components.`;

  if (isJsonMode()) {
    outputSuccess(successMessage, {
      config,
      configPath: getConfigPath(),
    });
  } else if (interactive) {
    outro(pc.green(successMessage));
  } else {
    console.log(pc.green(successMessage));
  }
}
