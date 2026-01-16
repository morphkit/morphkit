export const GeneratedAssetType = {
  LOGO: "logo",
  ICON: "icon",
  ILLUSTRATION: "illustration",
  CHARACTER: "character",
  SPRITE: "sprite",
  PATTERN: "pattern",
  PHOTOGRAPH: "photograph",
  UI_ELEMENT: "ui-element",
} as const;

export type GeneratedAssetType =
  (typeof GeneratedAssetType)[keyof typeof GeneratedAssetType];

export const GeneratedImageExtension = {
  PNG: "png",
  SVG: "svg",
  WEBP: "webp",
  JPEG: "jpeg",
} as const;

export type GeneratedImageExtension =
  (typeof GeneratedImageExtension)[keyof typeof GeneratedImageExtension];

export const ImagenModel = {
  IMAGEN_4_ULTRA: "imagen-4.0-ultra-generate-001",
  IMAGEN_4: "imagen-4.0-generate-001",
  IMAGEN_3: "imagen-3.0-generate-002",
  IMAGEN_3_FAST: "imagen-3.0-fast-generate-001",
} as const;

export type ImagenModel = (typeof ImagenModel)[keyof typeof ImagenModel];

export interface VectorizerConfig {
  colorMode: "color" | "binary";
  hierarchical: "stacked" | "cutout";
  filterSpeckle: number;
  colorPrecision: number;
  layerDifference: number;
  mode: "spline" | "polygon" | "none";
  cornerThreshold: number;
  lengthThreshold: number;
  maxIterations: number;
  spliceThreshold: number;
  pathPrecision: number;
}

export interface ImageGenerationRequest {
  outputPath: string;
  extension: GeneratedImageExtension;
  prompt: string;
  images?: string[];
}

export interface StylePreferences {
  colorScheme?: string;
  artStyle?: string;
  mood?: string;
}
