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

export interface Config {
  type: "react-native" | "react";
  paths: {
    ui: string;
  };
}

export const ConfigSchema = z.object({
  type: z.enum(["react-native", "react"]),
  paths: z.object({
    ui: z.string(),
  }),
});

export type ProjectType = Config["type"];
