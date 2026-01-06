import type { Theme } from "./theme";

export type ThemeColor = string & { readonly __brand: "ThemeColor" };
export type ThemeSpacing = number & { readonly __brand: "ThemeSpacing" };

type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

export type ColorPath = PathsToStringProps<Theme["semantic"]["colors"]>;
export type SpacingKey = keyof Theme["primitive"]["spacing"];

export const getThemeColor = (theme: Theme, ...path: string[]): string => {
  let value: unknown = theme.semantic.colors;
  for (const key of path) {
    value = (value as Record<string, unknown>)[key];
  }
  return value as string;
};

export const getThemeSpacing = (theme: Theme, key: SpacingKey): number => {
  return theme.primitive.spacing[key];
};
