import { z } from "zod";
import { FlowMetaSchema } from "../types/index.js";
import { fetchPackageFile } from "./npm-registry.js";
import type { FlowMeta, Config } from "../types/index.js";

const FlowRegistrySchema = z.object({
  version: z.string(),
  flows: z.array(FlowMetaSchema),
});

type FlowRegistryData = z.infer<typeof FlowRegistrySchema>;

export async function fetchFlows(): Promise<FlowMeta[]> {
  try {
    const data = await fetchPackageFile<FlowRegistryData>(
      "@morphkit/react-native-flows",
      "src/registry.json",
    );

    const registry = FlowRegistrySchema.parse(data);
    return registry.flows;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch flow registry: ${error.message}`);
    }
    throw error;
  }
}

export function filterFlows(
  flows: FlowMeta[],
  _type: Config["type"],
): FlowMeta[] {
  return flows.sort((a, b) =>
    `${a.type}/${a.variant}`.localeCompare(`${b.type}/${b.variant}`),
  );
}

export function parseFlowName(flowName: string): {
  type: string;
  variant: string;
} {
  const parts = flowName.split("/");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error(
      `Invalid flow name: "${flowName}". Use format: type/variant (e.g., auth/default)`,
    );
  }
  return { type: parts[0], variant: parts[1] };
}

export function getFlowDisplayName(flow: FlowMeta): string {
  return `${flow.type}/${flow.variant}`;
}

export function findFlow(
  flows: FlowMeta[],
  flowName: string,
): FlowMeta | undefined {
  const { type, variant } = parseFlowName(flowName);
  return flows.find((f) => f.type === type && f.variant === variant);
}
