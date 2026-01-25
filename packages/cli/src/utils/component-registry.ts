import { ComponentMeta, ComponentMetaSchema, Config } from "../types/index.js";
import { z } from "zod";
import { fetchPackageFile } from "./npm-registry.js";

const RegistrySchema = z.object({
  version: z.string(),
  generatedAt: z.string(),
  components: z.array(ComponentMetaSchema),
});

type RegistryData = z.infer<typeof RegistrySchema>;

export async function fetchComponents(): Promise<ComponentMeta[]> {
  try {
    const data = await fetchPackageFile<RegistryData>(
      "@morphkit/react-native",
      "src/registry.json",
    );

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
  type: Config["type"],
): ComponentMeta[] {
  return components
    .filter((c) => c.type === type)
    .sort((a, b) => a.name.localeCompare(b.name));
}
