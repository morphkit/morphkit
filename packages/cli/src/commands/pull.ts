import { intro, outro, multiselect, spinner, confirm, isCancel } from '@clack/prompts';
import pc from 'picocolors';
import { readConfig } from '../utils/config.js';
import { fetchComponents, filterComponents } from '../utils/component-registry.js';
import { copyComponent, componentExists } from '../utils/file-operations.js';
import { ConfigNotFoundError } from '../utils/errors.js';
import { validateComponentName } from '../utils/validation.js';

export async function pullCommand(componentNames?: string[]): Promise<void> {
  intro(pc.cyan('Pull warp-ui components'));

  // Read config
  const config = await readConfig();
  if (!config) {
    throw new ConfigNotFoundError();
  }

  let selectedComponents: string[];

  if (componentNames && componentNames.length > 0) {
    // Validate component names
    componentNames.forEach(validateComponentName);
    selectedComponents = componentNames;
  } else {
    // Fetch available components
    const s = spinner();
    s.start('Fetching available components...');

    try {
      const allComponents = await fetchComponents();
      const filtered = filterComponents(allComponents, config.type, config.lib);

      s.stop('Components loaded');

      if (filtered.length === 0) {
        outro(pc.yellow(`No components available for ${config.type} with ${config.lib}`));
        return;
      }

      // Show multiselect
      const selected = await multiselect({
        message: 'Select components to install',
        options: filtered.map(c => ({
          value: c.name,
          label: `${c.componentName}${c.description ? ` - ${c.description}` : ''}`
        })),
        required: true
      });

      if (isCancel(selected)) {
        outro(pc.red('Operation cancelled'));
        process.exit(0);
      }

      selectedComponents = selected as string[];
    } catch (error) {
      s.stop('Failed to fetch components');
      throw error;
    }
  }

  // Install components
  let installed = 0;
  let skipped = 0;

  for (const name of selectedComponents) {
    const exists = await componentExists(config.paths.ui, name);

    if (exists) {
      const shouldOverwrite = await confirm({
        message: `${name} already exists. Overwrite?`,
        initialValue: false
      });

      if (isCancel(shouldOverwrite)) {
        outro(pc.red('Operation cancelled'));
        process.exit(0);
      }

      if (!shouldOverwrite) {
        console.log(pc.yellow(`Skipped ${name}`));
        skipped++;
        continue;
      }
    }

    const s = spinner();
    s.start(`Installing ${name}...`);

    try {
      await copyComponent(name, config.paths.ui, config.type, config.lib);
      s.stop(pc.green(`Installed ${name}`));
      installed++;
    } catch (error) {
      s.stop(pc.red(`Failed to install ${name}`));
      throw error;
    }
  }

  if (installed > 0) {
    outro(pc.green(`Successfully installed ${installed} component${installed > 1 ? 's' : ''}`));
  } else if (skipped > 0) {
    outro(pc.yellow(`Skipped ${skipped} component${skipped > 1 ? 's' : ''}`));
  }
}
