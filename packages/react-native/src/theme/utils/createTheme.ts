import { themes, type Theme, type FontFamilies } from "../theme";
import type { DeepPartial } from "./types";
import { merge } from "./merge";
import * as primitive from "../tokens/primitive/typography";

export interface CreateThemeOptions {
  fonts?: {
    display?: string;
    body?: string;
    mono?: string;
  };
  light?: DeepPartial<Theme>;
  dark?: DeepPartial<Theme>;
}

const createTextStyles = (fontFamilies: FontFamilies) => ({
  largeTitle: {
    fontSize: primitive.fontSize["5xl"],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize["5xl"] * primitive.lineHeight.tight,
    letterSpacing: primitive.letterSpacing.tighter,
    fontFamily: fontFamilies.display,
  },
  title1: {
    fontSize: primitive.fontSize["4xl"],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize["4xl"] * primitive.lineHeight.tight,
    letterSpacing: primitive.letterSpacing.tight,
    fontFamily: fontFamilies.display,
  },
  title2: {
    fontSize: primitive.fontSize["3xl"],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize["3xl"] * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.tight,
    fontFamily: fontFamilies.display,
  },
  title3: {
    fontSize: primitive.fontSize["2xl"],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize["2xl"] * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: fontFamilies.display,
  },
  heading: {
    fontSize: primitive.fontSize.xl,
    fontWeight: primitive.fontWeight.semibold,
    lineHeight: primitive.fontSize.xl * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: fontFamilies.display,
  },
  body: {
    fontSize: primitive.fontSize.xl,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.xl * primitive.lineHeight.relaxed,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: fontFamilies.body,
  },
  callout: {
    fontSize: primitive.fontSize.lg,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.lg * primitive.lineHeight.relaxed,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: fontFamilies.body,
  },
  subhead: {
    fontSize: primitive.fontSize.base,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.base * primitive.lineHeight.relaxed,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: fontFamilies.body,
  },
  footnote: {
    fontSize: primitive.fontSize.md,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.md * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: fontFamilies.body,
  },
  caption1: {
    fontSize: primitive.fontSize.sm,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.sm * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: fontFamilies.body,
  },
  caption2: {
    fontSize: primitive.fontSize.xs,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.xs * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.wide,
    fontFamily: fontFamilies.body,
  },
});

export const createTheme = (
  overrides: CreateThemeOptions = {},
): { light: Theme; dark: Theme } => {
  const { fonts, light, dark } = overrides;

  const updatedFontFamilies: FontFamilies = {
    display: fonts?.display ?? themes.light.semantic.fontFamilies.display,
    body: fonts?.body ?? themes.light.semantic.fontFamilies.body,
    mono: fonts?.mono ?? themes.light.semantic.fontFamilies.mono,
  };

  const baseFonts: DeepPartial<Theme> = fonts
    ? {
        semantic: {
          fontFamilies: updatedFontFamilies,
          textStyles: createTextStyles(updatedFontFamilies),
        },
      }
    : {};

  return {
    light: merge(themes.light, baseFonts, light ?? {}) as Theme,
    dark: merge(themes.dark, baseFonts, dark ?? {}) as Theme,
  };
};
