import { themes, type Theme } from "../theme";
import type { DeepPartial } from "./types";
import { merge } from "./merge";

export interface CreateThemeOptions {
  fonts?: {
    display?: string;
    body?: string;
    mono?: string;
  };
  light?: DeepPartial<Theme>;
  dark?: DeepPartial<Theme>;
}

export const createTheme = (
  overrides: CreateThemeOptions = {},
): { light: Theme; dark: Theme } => {
  const { fonts, light, dark } = overrides;

  const baseFonts: DeepPartial<Theme> = fonts
    ? {
        semantic: {
          fontFamilies: {
            display:
              fonts.display ?? themes.light.semantic.fontFamilies.display,
            body: fonts.body ?? themes.light.semantic.fontFamilies.body,
            mono: fonts.mono ?? themes.light.semantic.fontFamilies.mono,
          },
        },
      }
    : {};

  return {
    light: merge(themes.light, baseFonts, light ?? {}) as Theme,
    dark: merge(themes.dark, baseFonts, dark ?? {}) as Theme,
  };
};
