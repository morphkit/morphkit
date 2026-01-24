import { writeFile, access } from "fs/promises";
import { join, resolve } from "path";
import { pathToFileURL } from "url";
import { Config, ConfigSchema } from "../types/index.js";
import { createInitialConfigContent } from "./morphkit-config-manager.js";

const CONFIG_FILE = "morphkit.config.mjs";

export function getConfigPath(cwd?: string): string {
  return join(cwd || process.cwd(), CONFIG_FILE);
}

export async function configExists(cwd?: string): Promise<boolean> {
  try {
    await access(getConfigPath(cwd));
    return true;
  } catch {
    return false;
  }
}

export async function readConfig(cwd?: string): Promise<Config | null> {
  try {
    const configPath = resolve(cwd || process.cwd(), CONFIG_FILE);
    const fileUrl = pathToFileURL(configPath).href;
    const module = await import(fileUrl);
    const configData = module.config;
    return ConfigSchema.parse(configData);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function writeConfig(config: Config, cwd?: string): Promise<void> {
  const configPath = getConfigPath(cwd);
  const content = createInitialConfigContent(
    config.type,
    config.paths.components,
    config.paths.flows,
  );
  await writeFile(configPath, content, "utf-8");
}
