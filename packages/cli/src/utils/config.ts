import { writeFile, access } from "fs/promises";
import { join } from "path";
import { pathToFileURL } from "url";
import { Config, ConfigSchema } from "../types/index.js";
import { createInitialConfigContent } from "./warpui-config-manager.js";

const CONFIG_FILE = "warpui.config.js";

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

export async function writeConfig(config: Config): Promise<void> {
  const configPath = join(process.cwd(), CONFIG_FILE);
  const content = createInitialConfigContent(config.type, config.paths.ui);
  await writeFile(configPath, content, "utf-8");
}
