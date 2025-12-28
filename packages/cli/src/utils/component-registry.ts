import { ComponentMeta, ComponentMetaSchema, Config } from "../types/index.js";
import { z } from "zod";
import { getGitHubToken, GitHubAuthError } from "./github-auth.js";

const RegistrySchema = z.object({
  version: z.string(),
  generatedAt: z.string(),
  components: z.array(ComponentMetaSchema),
});

export async function fetchComponents(): Promise<ComponentMeta[]> {
  // Get GitHub token for authentication
  const token = getGitHubToken();
  if (!token) {
    throw new GitHubAuthError();
  }

  // Fetch registry from GitHub raw URL
  const registryUrl =
    "https://raw.githubusercontent.com/warp-ui/warp-ui/main/packages/nativewind/src/registry.json";

  const headers: HeadersInit = {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3.raw",
  };

  try {
    const response = await fetch(registryUrl, { headers });

    if (response.status === 401 || response.status === 403) {
      throw new GitHubAuthError();
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch registry: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    const registry = RegistrySchema.parse(data);

    return registry.components;
  } catch (error) {
    if (error instanceof GitHubAuthError) {
      throw error;
    }
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
