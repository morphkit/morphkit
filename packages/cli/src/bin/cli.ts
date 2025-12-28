#!/usr/bin/env node

import { Command } from 'commander';
import pc from 'picocolors';
import { initCommand } from '../commands/init.js';
import { pullCommand } from '../commands/pull.js';
import { WarpUIError } from '../utils/errors.js';

const program = new Command();

program
  .name('warp-ui')
  .description('CLI for warp-ui component library')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize warp-ui configuration in your project')
  .action(async () => {
    try {
      await initCommand();
    } catch (error) {
      handleError(error);
    }
  });

program
  .command('pull')
  .description('Pull components into your project')
  .argument('[components...]', 'Component names to install')
  .action(async (components: string[]) => {
    try {
      await pullCommand(components);
    } catch (error) {
      handleError(error);
    }
  });

function handleError(error: unknown): never {
  if (error instanceof WarpUIError) {
    console.error(pc.red(`Error [${error.code}]: ${error.message}`));
    process.exit(error.exitCode);
  } else if (error instanceof Error) {
    console.error(pc.red(`Unexpected error: ${error.message}`));
    if (process.env.DEBUG) {
      console.error(pc.gray(error.stack || ''));
    }
    process.exit(1);
  } else {
    console.error(pc.red('An unknown error occurred'));
    process.exit(1);
  }
}

program.parse();
