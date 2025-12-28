import { ComponentMeta, ComponentMetaSchema, Config } from '../types/index.js';
import { z } from 'zod';

const RegistrySchema = z.object({
  version: z.string(),
  generatedAt: z.string(),
  components: z.array(ComponentMetaSchema)
});

export async function fetchComponents(): Promise<ComponentMeta[]> {
  // Fetch registry from GitHub raw URL
  const registryUrl = 'https://raw.githubusercontent.com/warp-ui/warp-ui/main/packages/react-native/src/registry.json';

  try {
    const response = await fetch(registryUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch registry: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const registry = RegistrySchema.parse(data);

    return registry.components;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch component registry: ${error.message}`);
    }
    throw error;
  }
}

export function filterComponents(
  components: ComponentMeta[],
  type: Config['type'],
  lib: Config['lib']
): ComponentMeta[] {
  return components
    .filter(c => c.type === type && c.lib === lib)
    .sort((a, b) => a.name.localeCompare(b.name));
}
