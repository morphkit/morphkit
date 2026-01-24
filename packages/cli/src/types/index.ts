import { z } from "zod";

export interface ComponentVariables {
  [key: string]: string | number;
}

export interface ComponentMeta {
  type: "react-native" | "react";
  name: string;
  description?: string;
  dependencies?: string[];
  variables?: ComponentVariables;
}

export const ComponentMetaSchema = z.object({
  type: z.enum(["react-native", "react"]),
  name: z.string(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  variables: z.record(z.union([z.string(), z.number()])).optional(),
});

export interface FlowMeta {
  type: string;
  name: string;
  variant: string;
  description: string;
  entryPoint: string;
  screenCount: number;
  components: string[];
  tags: string[];
}

export const FlowMetaSchema = z.object({
  type: z.string(),
  name: z.string(),
  variant: z.string(),
  description: z.string(),
  entryPoint: z.string(),
  screenCount: z.number(),
  components: z.array(z.string()),
  tags: z.array(z.string()),
});

export interface Config {
  type: "react-native" | "react";
  paths: {
    components: string;
    flows: string;
  };
}

export const ConfigSchema = z.object({
  type: z.enum(["react-native", "react"]),
  paths: z.object({
    components: z.string(),
    flows: z.string(),
  }),
});

export type ProjectType = Config["type"];
export type ItemType = "component" | "flow";

export interface GlobalOptions {
  json: boolean;
  cwd: string;
  verbose: boolean;
}

export interface InitOptions extends GlobalOptions {
  projectType?: ProjectType;
  componentPath?: string;
  flowPath?: string;
  overwrite?: boolean;
  yes?: boolean;
}

export interface PullOptions extends GlobalOptions {
  type: ItemType;
  overwrite?: boolean;
  skipDependencies?: boolean;
  dryRun?: boolean;
  list?: boolean;
  withTests?: boolean;
  yes?: boolean;
}

export interface GenerateOptions extends GlobalOptions {
  name: string;
  output: string;
  screens?: string;
  type?: string;
  yes?: boolean;
}

export interface OutputResult {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  error?: {
    code: string;
    message: string;
  };
}
