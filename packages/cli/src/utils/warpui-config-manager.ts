import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { pathToFileURL } from "url";
import type { ComponentVariables } from "../types/index.js";

const WARPUI_CONFIG_FILENAME = "warpui.config.js";

export async function readWarpuiConfig(
  projectRoot: string,
): Promise<Record<string, unknown>> {
  try {
    const configPath = join(projectRoot, WARPUI_CONFIG_FILENAME);
    const fileUrl = pathToFileURL(configPath).href;
    const config = await import(fileUrl);
    return config.default || config;
  } catch (error) {
    throw new Error(
      `Could not load ${WARPUI_CONFIG_FILENAME}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function addComponentVariablesToConfig(
  projectRoot: string,
  componentVariables: Map<string, ComponentVariables>,
): Promise<void> {
  const configPath = join(projectRoot, WARPUI_CONFIG_FILENAME);

  try {
    const content = await readFile(configPath, "utf-8");
    const updatedContent = mergeVariablesIntoConfig(
      content,
      componentVariables,
    );
    await writeFile(configPath, updatedContent, "utf-8");
  } catch (error) {
    throw new Error(
      `Could not update ${WARPUI_CONFIG_FILENAME}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

function mergeVariablesIntoConfig(
  configContent: string,
  componentVariables: Map<string, ComponentVariables>,
): string {
  let updatedContent = configContent;

  for (const [, variables] of componentVariables) {
    for (const [varName, varValue] of Object.entries(variables)) {
      if (!variableExistsInConfig(updatedContent, varName)) {
        updatedContent = addVariableToThemes(updatedContent, varName, varValue);
      }
    }
  }

  return updatedContent;
}

function variableExistsInConfig(content: string, varName: string): boolean {
  const escapedVarName = varName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const varRegex = new RegExp(`['"]${escapedVarName}['"]\\s*:`);
  return varRegex.test(content);
}

function addVariableToThemes(
  content: string,
  varName: string,
  varValue: string | number,
): string {
  const formattedValue =
    typeof varValue === "string" ? `'${varValue}'` : varValue;
  const variableLine = `    '${varName}': ${formattedValue},`;

  const lightVarsRegex = /light:\s*vars\(\{([^}]*)\}\)/s;
  const darkVarsRegex = /dark:\s*vars\(\{([^}]*)\}\)/s;

  let updatedContent = content;

  const lightMatch = content.match(lightVarsRegex);
  if (lightMatch && lightMatch[1] !== undefined) {
    const lightVars = lightMatch[1];
    const hasVariables = lightVars.trim().length > 0;

    if (hasVariables) {
      const updatedLightVars = `${lightVars.trimEnd()}\n${variableLine}\n  `;
      updatedContent = updatedContent.replace(
        lightVarsRegex,
        `light: vars({${updatedLightVars}})`,
      );
    } else {
      updatedContent = updatedContent.replace(
        lightVarsRegex,
        `light: vars({\n${variableLine}\n  })`,
      );
    }
  }

  const darkMatch = updatedContent.match(darkVarsRegex);
  if (darkMatch && darkMatch[1] !== undefined) {
    const darkVars = darkMatch[1];
    const hasVariables = darkVars.trim().length > 0;

    const darkValue =
      typeof varValue === "string" ? getDarkModeValue(varValue) : varValue;
    const formattedDarkValue =
      typeof darkValue === "string" ? `'${darkValue}'` : darkValue;
    const darkVariableLine = `    '${varName}': ${formattedDarkValue},`;

    if (hasVariables) {
      const updatedDarkVars = `${darkVars.trimEnd()}\n${darkVariableLine}\n  `;
      updatedContent = updatedContent.replace(
        darkVarsRegex,
        `dark: vars({${updatedDarkVars}})`,
      );
    } else {
      updatedContent = updatedContent.replace(
        darkVarsRegex,
        `dark: vars({\n${darkVariableLine}\n  })`,
      );
    }
  }

  return updatedContent;
}

function getDarkModeValue(lightValue: string): string {
  if (lightValue.startsWith("#")) {
    const colorMap: Record<string, string> = {
      "#ef4444": "#fca5a5",
      "#dc2626": "#fca5a5",
      "#b91c1c": "#fca5a5",
      "#3b82f6": "#60a5fa",
      "#2563eb": "#60a5fa",
      "#1d4ed8": "#60a5fa",
      "#10b981": "#6ee7b7",
      "#059669": "#6ee7b7",
      "#047857": "#6ee7b7",
    };

    return colorMap[lightValue.toLowerCase()] || lightValue;
  }

  return lightValue;
}

export function createInitialConfigContent(
  type: "react-native" | "react",
  uiPath: string,
): string {
  return `import { vars } from 'nativewind'

export default {
  light: vars({
    // Component variables will be added here
  }),
  dark: vars({
    // Component variables will be added here
  })
}

export const config = {
  type: '${type}',
  paths: {
    ui: '${uiPath}'
  }
}
`;
}
