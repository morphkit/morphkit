export interface FlowScreen {
  id: string;
  file: string;
  title: string;
  description: string;
}

export interface FlowDependencies {
  [packageName: string]: string;
}

export interface FlowMeta {
  type: string;
  name: string;
  version: string;
  description: string;
  screens: FlowScreen[];
  components: string[];
  dependencies: FlowDependencies;
  entryPoint: string;
  tags: string[];
}

export interface FlowRegistryEntry {
  type: string;
  name: string;
  variant: string;
  description: string;
  entryPoint: string;
  screenCount: number;
  components: string[];
  tags: string[];
}

export interface FlowRegistry {
  version: string;
  flows: FlowRegistryEntry[];
}
