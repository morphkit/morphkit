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
import {
  fetchFlows,
  filterFlows,
  findFlow,
  getFlowDisplayName,
} from "../utils/flow-registry.js";
import {
  copyComponent,
  copyFlow,
  componentExists,
  flowExists,
} from "../utils/file-operations.js";
import {
  ConfigNotFoundError,
  ComponentNotFoundError,
  FlowNotFoundError,
} from "../utils/errors.js";
import { validateComponentName } from "../utils/validation.js";
import { addComponentVariablesToConfig } from "../utils/morphkit-config-manager.js";
import { isInteractive } from "../utils/context.js";
import { isJsonMode, outputSuccess, outputList } from "../utils/output.js";
import type {
  ComponentMeta,
  FlowMeta,
  ComponentVariables,
  PullOptions,
} from "../types/index.js";

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

async function listComponents(config: {
  type: "react-native" | "react";
}): Promise<void> {
  const allComponents = await fetchComponents();
  const filtered = filterComponents(allComponents, config.type);

  outputList(
    filtered.map((c) => ({ name: c.name, description: c.description })),
    `Available components for ${config.type}:`,
  );
}

async function listFlows(config: {
  type: "react-native" | "react";
}): Promise<void> {
  const allFlows = await fetchFlows();
  const filtered = filterFlows(allFlows, config.type);

  outputList(
    filtered.map((f) => ({
      name: getFlowDisplayName(f),
      description: `${f.description} (${f.screenCount} screens)`,
    })),
    "Available flows:",
  );
}

async function pullComponents(
  items: string[],
  options: PullOptions,
  config: {
    type: "react-native" | "react";
    paths: { components: string; flows: string };
  },
): Promise<void> {
  const interactive = isInteractive(options.yes);

  if (interactive && !isJsonMode()) {
    intro(pc.cyan("Pull morphkit components"));
  }

  const s = !isJsonMode() ? spinner() : null;
  s?.start("Fetching available components...");

  let allComponents: ComponentMeta[];
  try {
    allComponents = await fetchComponents();
    s?.stop("Components loaded");
  } catch (error) {
    s?.stop("Failed to fetch components");
    throw error;
  }

  let selectedComponents: string[];

  if (items.length > 0) {
    items.forEach(validateComponentName);

    for (const name of items) {
      const component = allComponents.find((c) => c.name === name);
      if (!component) {
        throw new ComponentNotFoundError(name);
      }
    }

    if (options.skipDependencies) {
      selectedComponents = items;
    } else {
      selectedComponents = resolveComponentDependencies(items, allComponents);

      const hasDependencies = selectedComponents.length > items.length;
      if (hasDependencies && !isJsonMode()) {
        const dependencies = selectedComponents.filter(
          (name) => !items.includes(name),
        );
        console.log(
          pc.cyan(
            `Resolved ${dependencies.length} ${dependencies.length === 1 ? "dependency" : "dependencies"}: ${dependencies.join(", ")}`,
          ),
        );
      }
    }
  } else if (interactive) {
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

    selectedComponents = options.skipDependencies
      ? (selected as string[])
      : resolveComponentDependencies(selected as string[], allComponents);

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
  } else {
    throw new Error(
      "No components specified. Provide component names or use interactive mode.",
    );
  }

  if (options.dryRun) {
    if (isJsonMode()) {
      outputSuccess("Dry run completed", {
        components: selectedComponents,
        wouldPull: selectedComponents.length,
      });
    } else {
      console.log(pc.cyan("\nDry run - would pull:"));
      for (const name of selectedComponents) {
        console.log(`  ${pc.bold(name)}`);
      }
    }
    return;
  }

  let pulled = 0;
  let skipped = 0;
  const pulledComponents: string[] = [];

  for (const name of selectedComponents) {
    const exists = await componentExists(config.paths.components, name);

    if (exists && !options.overwrite) {
      if (interactive) {
        const shouldOverwrite = await confirm({
          message: `${name} already exists. Overwrite?`,
          initialValue: false,
        });

        if (isCancel(shouldOverwrite)) {
          outro(pc.red("Operation cancelled"));
          process.exit(0);
        }

        if (!shouldOverwrite) {
          if (!isJsonMode()) {
            console.log(pc.yellow(`Skipped ${name}`));
          }
          skipped++;
          continue;
        }
      } else {
        if (!isJsonMode()) {
          console.log(pc.yellow(`Skipped ${name} (already exists)`));
        }
        skipped++;
        continue;
      }
    }

    const pullSpinner = !isJsonMode() ? spinner() : null;
    pullSpinner?.start(`Pulling ${name}...`);

    try {
      await copyComponent(name, config.paths.components, config.type, {
        withTests: options.withTests,
      });
      pullSpinner?.stop(pc.green(`Pulled ${name}`));
      pulled++;
      pulledComponents.push(name);
    } catch (error) {
      pullSpinner?.stop(pc.red(`Failed to pull ${name}`));
      throw error;
    }
  }

  if (pulled > 0) {
    const configSpinner = !isJsonMode() ? spinner() : null;
    configSpinner?.start(
      "Adding component variables to morphkit.config.mjs...",
    );

    try {
      const componentVariables = new Map<string, ComponentVariables>();

      for (const name of pulledComponents) {
        const metaPath = join(config.paths.components, name, "meta.json");
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
        configSpinner?.stop(pc.green("Component variables added"));
      } else {
        configSpinner?.stop(pc.dim("No variables to add"));
      }
    } catch (error) {
      configSpinner?.stop(pc.yellow("Could not update morphkit.config.mjs"));
      if (!isJsonMode() && error instanceof Error) {
        console.log(pc.dim(`Note: ${error.message}`));
        console.log(
          pc.dim("You can manually add variables to morphkit.config.mjs"),
        );
      }
    }
  }

  const successMessage = `Successfully pulled ${pulled} component${pulled !== 1 ? "s" : ""}`;

  if (isJsonMode()) {
    outputSuccess(successMessage, {
      pulled: pulledComponents,
      skipped,
    });
  } else if (pulled > 0) {
    if (interactive) {
      outro(pc.green(successMessage));
    } else {
      console.log(pc.green(successMessage));
    }
  } else if (skipped > 0) {
    if (interactive) {
      outro(
        pc.yellow(`Skipped ${skipped} component${skipped !== 1 ? "s" : ""}`),
      );
    } else {
      console.log(
        pc.yellow(`Skipped ${skipped} component${skipped !== 1 ? "s" : ""}`),
      );
    }
  }
}

async function pullFlows(
  items: string[],
  options: PullOptions,
  config: {
    type: "react-native" | "react";
    paths: { components: string; flows: string };
  },
): Promise<void> {
  const interactive = isInteractive(options.yes);

  if (interactive && !isJsonMode()) {
    intro(pc.cyan("Pull morphkit flows"));
  }

  const s = !isJsonMode() ? spinner() : null;
  s?.start("Fetching available flows...");

  let allFlows: FlowMeta[];
  try {
    allFlows = await fetchFlows();
    s?.stop("Flows loaded");
  } catch (error) {
    s?.stop("Failed to fetch flows");
    throw error;
  }

  let selectedFlows: FlowMeta[];

  if (items.length > 0) {
    selectedFlows = [];
    for (const name of items) {
      const flow = findFlow(allFlows, name);
      if (!flow) {
        throw new FlowNotFoundError(name);
      }
      selectedFlows.push(flow);
    }
  } else if (interactive) {
    const filtered = filterFlows(allFlows, config.type);

    if (filtered.length === 0) {
      outro(pc.yellow("No flows available"));
      return;
    }

    const selected = await multiselect({
      message: "Select flows to pull",
      options: filtered.map((f) => ({
        value: getFlowDisplayName(f),
        label: `${getFlowDisplayName(f)} - ${f.description} (${f.screenCount} screens)`,
      })),
      required: true,
    });

    if (isCancel(selected)) {
      outro(pc.red("Operation cancelled"));
      process.exit(0);
    }

    selectedFlows = (selected as string[]).map(
      (name) => findFlow(allFlows, name)!,
    );
  } else {
    throw new Error(
      "No flows specified. Provide flow names or use interactive mode.",
    );
  }

  if (options.dryRun) {
    if (isJsonMode()) {
      outputSuccess("Dry run completed", {
        flows: selectedFlows.map(getFlowDisplayName),
        wouldPull: selectedFlows.length,
      });
    } else {
      console.log(pc.cyan("\nDry run - would pull:"));
      for (const flow of selectedFlows) {
        console.log(
          `  ${pc.bold(getFlowDisplayName(flow))} (${flow.screenCount} screens)`,
        );
      }
    }
    return;
  }

  let pulled = 0;
  let skipped = 0;
  const pulledFlows: string[] = [];

  for (const flow of selectedFlows) {
    const exists = await flowExists(
      config.paths.flows,
      flow.type,
      flow.variant,
    );
    const flowName = getFlowDisplayName(flow);

    if (exists && !options.overwrite) {
      if (interactive) {
        const shouldOverwrite = await confirm({
          message: `${flowName} already exists. Overwrite?`,
          initialValue: false,
        });

        if (isCancel(shouldOverwrite)) {
          outro(pc.red("Operation cancelled"));
          process.exit(0);
        }

        if (!shouldOverwrite) {
          if (!isJsonMode()) {
            console.log(pc.yellow(`Skipped ${flowName}`));
          }
          skipped++;
          continue;
        }
      } else {
        if (!isJsonMode()) {
          console.log(pc.yellow(`Skipped ${flowName} (already exists)`));
        }
        skipped++;
        continue;
      }
    }

    const pullSpinner = !isJsonMode() ? spinner() : null;
    pullSpinner?.start(`Pulling ${flowName}...`);

    try {
      await copyFlow(flow.type, flow.variant, config.paths.flows);
      pullSpinner?.stop(pc.green(`Pulled ${flowName}`));
      pulled++;
      pulledFlows.push(flowName);

      if (!isJsonMode() && flow.components.length > 0) {
        console.log(
          pc.dim(`  Required components: ${flow.components.join(", ")}`),
        );
      }
    } catch (error) {
      pullSpinner?.stop(pc.red(`Failed to pull ${flowName}`));
      throw error;
    }
  }

  const successMessage = `Successfully pulled ${pulled} flow${pulled !== 1 ? "s" : ""}`;

  if (isJsonMode()) {
    outputSuccess(successMessage, {
      pulled: pulledFlows,
      skipped,
    });
  } else if (pulled > 0) {
    if (interactive) {
      outro(pc.green(successMessage));
    } else {
      console.log(pc.green(successMessage));
    }
  } else if (skipped > 0) {
    if (interactive) {
      outro(pc.yellow(`Skipped ${skipped} flow${skipped !== 1 ? "s" : ""}`));
    } else {
      console.log(
        pc.yellow(`Skipped ${skipped} flow${skipped !== 1 ? "s" : ""}`),
      );
    }
  }
}

export async function pullCommand(
  items: string[],
  options: PullOptions,
): Promise<void> {
  const config = await readConfig();
  if (!config) {
    throw new ConfigNotFoundError();
  }

  if (options.list) {
    if (options.type === "flow") {
      await listFlows(config);
    } else {
      await listComponents(config);
    }
    return;
  }

  if (options.type === "flow") {
    await pullFlows(items, options, config);
  } else {
    await pullComponents(items, options, config);
  }
}
