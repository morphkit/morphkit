import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const SRC_DIR = join(__dirname, "../packages/react-native/src");

export interface ComponentMeta {
  type: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  dependencies: string[];
}

export function getDirectories(includeTheme: boolean): string[] {
  const entries = readdirSync(SRC_DIR);

  const directories = entries.filter((entry) => {
    const fullPath = join(SRC_DIR, entry);
    const isDirectory = statSync(fullPath).isDirectory();

    if (!isDirectory) {
      return false;
    }

    if (entry === "theme" && !includeTheme) {
      return false;
    }

    return true;
  });

  return directories.sort();
}

export function readMetaJson(componentName: string): ComponentMeta {
  const metaPath = join(SRC_DIR, componentName, "meta.json");
  const content = readFileSync(metaPath, "utf-8");
  return JSON.parse(content) as ComponentMeta;
}

export function formatDate(): string {
  return new Date().toISOString();
}

export function writeJsonFile(path: string, data: unknown): void {
  const jsonString = JSON.stringify(data, null, 2) + "\n";
  writeFileSync(path, jsonString, "utf-8");
}

export function writeTypeScriptFile(path: string, content: string): void {
  writeFileSync(path, content, "utf-8");
}
