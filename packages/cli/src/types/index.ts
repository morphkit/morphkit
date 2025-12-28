import { z } from "zod";

export interface ComponentVariables {
  [key: string]: string | number;
}

export const ComponentMetaSchema = z.object({
  type: z.enum(["react-native", "react"]),
  name: z.string(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  variables: z.record(z.union([z.string(), z.number()])).optional(),
});

export type ComponentMeta = z.infer<typeof ComponentMetaSchema>;

export const ConfigSchema = z.object({
  type: z.enum(["react-native", "react"]),
  paths: z.object({
    ui: z.string(),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;

export type ProjectType = Config["type"];
