import { z } from 'zod';

// Component metadata schema
export const ComponentMetaSchema = z.object({
  type: z.enum(['expo', 'react-native-cli']),
  lib: z.enum(['stylesheet', 'nativewind', 'tailwind']),
  name: z.string(),
  componentName: z.string(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  version: z.string().optional()
});

export type ComponentMeta = z.infer<typeof ComponentMetaSchema>;

// Configuration file schema
export const ConfigSchema = z.object({
  type: z.enum(['expo', 'react-native-cli']),
  lib: z.enum(['stylesheet', 'nativewind', 'tailwind']),
  paths: z.object({
    ui: z.string()
  }),
  registryUrl: z.string().url().optional(),
  $schema: z.string().optional()
});

export type Config = z.infer<typeof ConfigSchema>;

// Project type and styling library types
export type ProjectType = Config['type'];
export type StylingLib = Config['lib'];
