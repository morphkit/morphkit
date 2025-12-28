import { readFile, writeFile, access } from 'fs/promises';
import { join } from 'path';
import { Config, ConfigSchema } from '../types/index.js';

const CONFIG_FILE = 'warp-ui.json';

export async function configExists(): Promise<boolean> {
  try {
    await access(join(process.cwd(), CONFIG_FILE));
    return true;
  } catch {
    return false;
  }
}

export async function readConfig(): Promise<Config | null> {
  try {
    const configPath = join(process.cwd(), CONFIG_FILE);
    const content = await readFile(configPath, 'utf-8');
    const data = JSON.parse(content);
    return ConfigSchema.parse(data);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

export async function writeConfig(config: Config): Promise<void> {
  const configPath = join(process.cwd(), CONFIG_FILE);
  const content = JSON.stringify(config, null, 2);
  await writeFile(configPath, content, 'utf-8');
}
