import pc from "picocolors";
import type { OutputResult } from "../types/index.js";
import { MorphkitError } from "./errors.js";

let jsonMode = false;
let verboseMode = false;

export function setJsonMode(enabled: boolean): void {
  jsonMode = enabled;
}

export function isJsonMode(): boolean {
  return jsonMode;
}

export function setVerboseMode(enabled: boolean): void {
  verboseMode = enabled;
}

export function isVerboseMode(): boolean {
  return verboseMode;
}

export function outputJson(result: OutputResult): void {
  console.log(JSON.stringify(result, null, 2));
}

export function outputSuccess(
  message: string,
  data?: Record<string, unknown>,
): void {
  if (jsonMode) {
    outputJson({ success: true, message, data });
  } else {
    console.log(pc.green(message));
  }
}

export function outputError(error: MorphkitError): void {
  if (jsonMode) {
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
}

export function outputList(
  items: Array<{ name: string; description?: string }>,
  title?: string,
): void {
  if (jsonMode) {
    outputJson({ success: true, data: { items } });
    return;
  }

  if (title) {
    console.log(pc.cyan(title));
    console.log();
  }

  for (const item of items) {
    if (item.description) {
      console.log(`  ${pc.bold(item.name)} - ${pc.dim(item.description)}`);
    } else {
      console.log(`  ${pc.bold(item.name)}`);
    }
  }
}

export function outputVerbose(message: string): void {
  if (verboseMode && !jsonMode) {
    console.log(pc.dim(`[verbose] ${message}`));
  }
}
