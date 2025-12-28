import {
  intro,
  outro,
  multiselect,
  spinner,
  confirm,
  isCancel,
} from "@clack/prompts";
import { readFileSync } from "fs";
import { join } from "path";
import pc from "picocolors";
import { readConfig } from "../utils/config.js";
import {
  fetchComponents,
  filterComponents,
} from "../utils/component-registry.js";
import { copyComponent, componentExists } from "../utils/file-operations.js";
import { ConfigNotFoundError } from "../utils/errors.js";
import { validateComponentName } from "../utils/validation.js";
import { addComponentVariablesToConfig } from "../utils/warpui-config-manager.js";
import type { ComponentMeta, ComponentVariables } from "../types/index.js";

function resolveComponentDependencies(
  componentNames: string[],
  allComponents: ComponentMeta[],
): string[] {
  const resolved = new Set<string>();
  const toProcess = [...componentNames];

  while (toProcess.length > 0) {
    const name = toProcess.pop()!;
    if (resolved.has(name)) continue;

    resolved.add(name);

    const component = allComponents.find((c) => c.name === name);
    if (component?.dependencies) {
      for (const dep of component.dependencies) {
        if (!resolved.has(dep)) {
          toProcess.push(dep);
        }
      }
    }
  }

  return Array.from(resolved);
}

export async function pullCommand(componentNames?: string[]): Promise<void> {
  intro(pc.cyan("Pull warp-ui components"));

  // Read config
  const config = await readConfig();
  if (!config) {
    throw new ConfigNotFoundError();
  }

  let selectedComponents: string[];

  const s = spinner();
  s.start("Fetching available components...");

  let allComponents: ComponentMeta[];
  try {
    allComponents = await fetchComponents();
    s.stop("Components loaded");
  } catch (error) {
    s.stop("Failed to fetch components");
    throw error;
  }

  if (componentNames && componentNames.length > 0) {
    componentNames.forEach(validateComponentName);
    selectedComponents = resolveComponentDependencies(
      componentNames,
      allComponents,
    );

    const hasDependencies = selectedComponents.length > componentNames.length;
    if (hasDependencies) {
      const dependencies = selectedComponents.filter(
        (name) => !componentNames.includes(name),
      );
      console.log(
        pc.cyan(
          `Resolved ${dependencies.length} ${dependencies.length === 1 ? "dependency" : "dependencies"}: ${dependencies.join(", ")}`,
        ),
      );
    }
  } else {
    const filtered = filterComponents(allComponents, config.type);

    if (filtered.length === 0) {
      outro(pc.yellow(`No components available for ${config.type}`));
      return;
    }

    const selected = await multiselect({
      message: "Select components to pull",
      options: filtered.map((c) => ({
        value: c.name,
        label: `${c.name}${c.description ? ` - ${c.description}` : ""}`,
      })),
      required: true,
    });

    if (isCancel(selected)) {
      outro(pc.red("Operation cancelled"));
      process.exit(0);
    }

    selectedComponents = resolveComponentDependencies(
      selected as string[],
      allComponents,
    );

    const hasDependencies =
      selectedComponents.length > (selected as string[]).length;
    if (hasDependencies) {
      const dependencies = selectedComponents.filter(
        (name) => !(selected as string[]).includes(name),
      );
      console.log(
        pc.cyan(
          `Resolved ${dependencies.length} ${dependencies.length === 1 ? "dependency" : "dependencies"}: ${dependencies.join(", ")}`,
        ),
      );
    }
  }

  // Pull components
  let pulled = 0;
  let skipped = 0;

  for (const name of selectedComponents) {
    const exists = await componentExists(config.paths.ui, name);

    if (exists) {
      const shouldOverwrite = await confirm({
        message: `${name} already exists. Overwrite?`,
        initialValue: false,
      });

      if (isCancel(shouldOverwrite)) {
        outro(pc.red("Operation cancelled"));
        process.exit(0);
      }

      if (!shouldOverwrite) {
        console.log(pc.yellow(`Skipped ${name}`));
        skipped++;
        continue;
      }
    }

    const s = spinner();
    s.start(`Pulling ${name}...`);

    try {
      await copyComponent(name, config.paths.ui, config.type);
      s.stop(pc.green(`Pulled ${name}`));
      pulled++;
    } catch (error) {
      s.stop(pc.red(`Failed to pull ${name}`));
      throw error;
    }
  }

  if (pulled > 0) {
    const s = spinner();
    s.start("Adding component variables to warpui.config.mjs...");

    try {
      const componentVariables = new Map<string, ComponentVariables>();

      for (const name of selectedComponents) {
        const metaPath = join(config.paths.ui, name, "meta.json");
        try {
          const metaContent = readFileSync(metaPath, "utf-8");
          const meta = JSON.parse(metaContent) as ComponentMeta;
          if (meta.variables) {
            componentVariables.set(name, meta.variables);
          }
        } catch {
          continue;
        }
      }

      if (componentVariables.size > 0) {
        await addComponentVariablesToConfig(process.cwd(), componentVariables);
        s.stop(pc.green("Component variables added"));
      } else {
        s.stop(pc.dim("No variables to add"));
      }
    } catch (error) {
      s.stop(pc.yellow("Could not update warpui.config.mjs"));
      if (error instanceof Error) {
        console.log(pc.dim(`Note: ${error.message}`));
        console.log(
          pc.dim("You can manually add variables to warpui.config.mjs"),
        );
      }
    }

    outro(
      pc.green(
        `Successfully pulled ${pulled} component${pulled > 1 ? "s" : ""}`,
      ),
    );
  } else if (skipped > 0) {
    outro(pc.yellow(`Skipped ${skipped} component${skipped > 1 ? "s" : ""}`));
  }
}
