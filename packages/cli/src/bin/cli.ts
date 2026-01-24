#!/usr/bin/env node

import { Command, Option } from "commander";
import pc from "picocolors";
import { initCommand } from "../commands/init.js";
import { pullCommand } from "../commands/pull.js";
import { generateCommand } from "../commands/generate.js";
import { MorphkitError, ExitCode } from "../utils/errors.js";
import { setJsonMode, setVerboseMode, outputJson } from "../utils/output.js";
import type {
  GlobalOptions,
  InitOptions,
  PullOptions,
  GenerateOptions,
} from "../types/index.js";

const VERSION = "0.4.0";

const program = new Command();

program
  .name("morphkit")
  .description("CLI for morphkit component library")
  .version(VERSION)
  .addOption(
    new Option("--json", "Output structured JSON for agentic/CI usage").default(
      false,
    ),
  )
  .addOption(
    new Option("--cwd <path>", "Set working directory").default(process.cwd()),
  )
  .addOption(new Option("--verbose", "Enable verbose logging").default(false))
  .hook("preAction", (thisCommand) => {
    const opts = thisCommand.opts() as GlobalOptions;
    setJsonMode(opts.json);
    setVerboseMode(opts.verbose);
    if (opts.cwd !== process.cwd()) {
      process.chdir(opts.cwd);
    }
  });

program
  .command("init")
  .description("Initialize morphkit configuration in your project")
  .addOption(
    new Option("-t, --project-type <type>", "Project type")
      .choices(["react-native", "react"])
      .default(undefined),
  )
  .addOption(
    new Option(
      "-c, --component-path <path>",
      "Component folder path (relative to project root)",
    ).default("src/components/ui"),
  )
  .addOption(
    new Option(
      "-f, --flow-path <path>",
      "Flow folder path (relative to project root)",
    ).default("src/flows"),
  )
  .addOption(
    new Option("--overwrite", "Overwrite existing configuration").default(
      false,
    ),
  )
  .addOption(
    new Option(
      "-y, --yes",
      "Non-interactive mode (requires --project-type)",
    ).default(false),
  )
  .addHelpText(
    "after",
    `
Examples:
  $ morphkit init                                    # Interactive mode
  $ morphkit init -t react-native -y                 # Non-interactive with defaults
  $ morphkit init -t react-native -c src/ui -y       # Custom component path
  $ morphkit init -t react-native --overwrite -y     # Reinitialize

Environment:
  GITHUB_TOKEN    GitHub Personal Access Token for private registry access
  GH_TOKEN        Alternative GitHub token variable

Exit Codes:
  0    Success
  1    General error
  2    Config not found
  3    Config already exists
  5    Authentication required
  6    Validation error
`,
  )
  .action(async (options: Omit<InitOptions, keyof GlobalOptions>) => {
    try {
      const globalOpts = program.opts() as GlobalOptions;
      await initCommand({ ...options, ...globalOpts });
    } catch (error) {
      handleError(error);
    }
  });

program
  .command("pull")
  .description("Pull components or flows into your project")
  .argument("[items...]", "Item names to install (e.g., button input)")
  .addOption(
    new Option("-t, --type <type>", "Item type to pull")
      .choices(["component", "flow"])
      .default("component"),
  )
  .addOption(
    new Option("--overwrite", "Overwrite existing items").default(false),
  )
  .addOption(
    new Option(
      "--skip-dependencies",
      "Skip automatic dependency resolution",
    ).default(false),
  )
  .addOption(
    new Option("--dry-run", "Preview changes without writing files").default(
      false,
    ),
  )
  .addOption(new Option("-l, --list", "List available items").default(false))
  .addOption(new Option("--with-tests", "Include test files").default(false))
  .addOption(new Option("-y, --yes", "Non-interactive mode").default(false))
  .addHelpText(
    "after",
    `
Examples:
  $ morphkit pull                                    # Interactive component selection
  $ morphkit pull button input -y                    # Pull specific components
  $ morphkit pull auth/default --type flow -y        # Pull a flow
  $ morphkit pull --list --type flow                 # List available flows
  $ morphkit pull button --dry-run                   # Preview what would be pulled
  $ morphkit pull button --with-tests -y             # Include test files

Flow names use the format: type/variant (e.g., auth/default)

Exit Codes:
  0    Success
  1    General error
  2    Config not found (run morphkit init first)
  4    Item not found in registry
  5    Authentication required
`,
  )
  .action(
    async (
      items: string[],
      options: Omit<PullOptions, keyof GlobalOptions | "items">,
    ) => {
      try {
        const globalOpts = program.opts() as GlobalOptions;
        await pullCommand(items, { ...options, ...globalOpts });
      } catch (error) {
        handleError(error);
      }
    },
  );

program
  .command("generate")
  .description("Generate templates (theme, screen, layout, flow)")
  .argument("[template]", "Template type: theme, screen, layout, flow")
  .addOption(
    new Option("-n, --name <name>", "Name for the generated template").default(
      undefined,
    ),
  )
  .addOption(
    new Option(
      "-o, --output <path>",
      "Output path for generated files",
    ).default(undefined),
  )
  .addOption(
    new Option(
      "-s, --screens <screens>",
      "Comma-separated screen names for flow template",
    ).default(undefined),
  )
  .addOption(
    new Option(
      "--type <type>",
      "Layout type: stack, tabs, drawer (for layout template)",
    )
      .choices(["stack", "tabs", "drawer"])
      .default("stack"),
  )
  .addOption(new Option("-y, --yes", "Non-interactive mode").default(false))
  .addHelpText(
    "after",
    `
Examples:
  $ morphkit generate theme --name my-theme --output src/theme
  $ morphkit generate screen --name Profile --output src/app/profile
  $ morphkit generate layout --name TabLayout --type tabs --output src/app/(tabs)
  $ morphkit generate flow --name onboarding --screens welcome,setup,done --output src/flows

Templates:
  theme     Create a custom theme configuration with createTheme()
  screen    Create an Expo Router screen component
  layout    Create an Expo Router layout (_layout.tsx) with Stack, Tabs, or Drawer
  flow      Create a multi-screen user flow with navigation

Exit Codes:
  0    Success
  1    General error
  2    Config not found (run morphkit init first)
  6    Validation error
`,
  )
  .action(
    async (
      template: string | undefined,
      options: Omit<GenerateOptions, keyof GlobalOptions>,
    ) => {
      try {
        const globalOpts = program.opts() as GlobalOptions;
        await generateCommand(template, {
          ...options,
          ...globalOpts,
        } as GenerateOptions);
      } catch (error) {
        handleError(error);
      }
    },
  );

function handleError(error: unknown): never {
  if (error instanceof MorphkitError) {
    if (program.opts().json) {
      outputJson({
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    } else {
      console.error(pc.red(`Error [${error.code}]: ${error.message}`));
    }
    process.exit(error.exitCode);
  } else if (error instanceof Error) {
    if (program.opts().json) {
      outputJson({
        success: false,
        error: {
          code: "UNKNOWN_ERROR",
          message: error.message,
        },
      });
    } else {
      console.error(pc.red(`Unexpected error: ${error.message}`));
      if (process.env.DEBUG) {
        console.error(pc.gray(error.stack || ""));
      }
    }
    process.exit(ExitCode.GeneralError);
  } else {
    if (program.opts().json) {
      outputJson({
        success: false,
        error: {
          code: "UNKNOWN_ERROR",
          message: "An unknown error occurred",
        },
      });
    } else {
      console.error(pc.red("An unknown error occurred"));
    }
    process.exit(ExitCode.GeneralError);
  }
}

program.parse();
