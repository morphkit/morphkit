import { themes, type Theme, type FontFamilies } from "../theme";
import type { DeepPartial } from "./types";
import { merge } from "./merge";
import * as primitive from "../tokens/primitive/typography";

export interface CreateThemeOptions {
  fonts?: {
    largeTitle?: string;
    title1?: string;
    title2?: string;
    title3?: string;
    heading?: string;
    body?: string;
    callout?: string;
    subhead?: string;
    footnote?: string;
    caption1?: string;
    caption2?: string;
    mono?: string;
  };
  light?: DeepPartial<Theme>;
  dark?: DeepPartial<Theme>;
}

type VariantName =
  | "largeTitle"
  | "title1"
  | "title2"
  | "title3"
  | "heading"
  | "body"
  | "callout"
  | "subhead"
  | "footnote"
  | "caption1"
  | "caption2";

const resolveFontFamily = (
  variant: VariantName,
  fonts: CreateThemeOptions["fonts"],
  defaultFont: string | undefined,
): string | undefined => {
  return fonts?.[variant] ?? defaultFont;
};

const createTextStyles = (
  fonts: CreateThemeOptions["fonts"],
  defaultTextStyles: typeof import("../tokens/semantic/typography").textStyles,
) => ({
  largeTitle: {
    fontSize: primitive.fontSize["5xl"],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize["5xl"] * primitive.lineHeight.tight,
    letterSpacing: primitive.letterSpacing.tighter,
    fontFamily: resolveFontFamily(
      "largeTitle",
      fonts,
      defaultTextStyles.largeTitle.fontFamily,
    ),
  },
  title1: {
    fontSize: primitive.fontSize["4xl"],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize["4xl"] * primitive.lineHeight.tight,
    letterSpacing: primitive.letterSpacing.tight,
    fontFamily: resolveFontFamily(
      "title1",
      fonts,
      defaultTextStyles.title1.fontFamily,
    ),
  },
  title2: {
    fontSize: primitive.fontSize["3xl"],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize["3xl"] * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.tight,
    fontFamily: resolveFontFamily(
      "title2",
      fonts,
      defaultTextStyles.title2.fontFamily,
    ),
  },
  title3: {
    fontSize: primitive.fontSize["2xl"],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize["2xl"] * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: resolveFontFamily(
      "title3",
      fonts,
      defaultTextStyles.title3.fontFamily,
    ),
  },
  heading: {
    fontSize: primitive.fontSize.xl,
    fontWeight: primitive.fontWeight.semibold,
    lineHeight: primitive.fontSize.xl * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: resolveFontFamily(
      "heading",
      fonts,
      defaultTextStyles.heading.fontFamily,
    ),
  },
  body: {
    fontSize: primitive.fontSize.xl,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.xl * primitive.lineHeight.relaxed,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: resolveFontFamily(
      "body",
      fonts,
      defaultTextStyles.body.fontFamily,
    ),
  },
  callout: {
    fontSize: primitive.fontSize.lg,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.lg * primitive.lineHeight.relaxed,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: resolveFontFamily(
      "callout",
      fonts,
      defaultTextStyles.callout.fontFamily,
    ),
  },
  subhead: {
    fontSize: primitive.fontSize.base,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.base * primitive.lineHeight.relaxed,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: resolveFontFamily(
      "subhead",
      fonts,
      defaultTextStyles.subhead.fontFamily,
    ),
  },
  footnote: {
    fontSize: primitive.fontSize.md,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.md * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: resolveFontFamily(
      "footnote",
      fonts,
      defaultTextStyles.footnote.fontFamily,
    ),
  },
  caption1: {
    fontSize: primitive.fontSize.sm,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.sm * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
    fontFamily: resolveFontFamily(
      "caption1",
      fonts,
      defaultTextStyles.caption1.fontFamily,
    ),
  },
  caption2: {
    fontSize: primitive.fontSize.xs,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.xs * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.wide,
    fontFamily: resolveFontFamily(
      "caption2",
      fonts,
      defaultTextStyles.caption2.fontFamily,
    ),
  },
});

export const createTheme = (
  overrides: CreateThemeOptions = {},
): { light: Theme; dark: Theme } => {
  const { fonts, light, dark } = overrides;

  const defaultFamilies: FontFamilies = {
    display: themes.light.semantic.fontFamilies.display,
    body: themes.light.semantic.fontFamilies.body,
    mono: themes.light.semantic.fontFamilies.mono,
  };

  const updatedFontFamilies: FontFamilies = {
    display: fonts?.largeTitle ?? defaultFamilies.display,
    body: fonts?.body ?? defaultFamilies.body,
    mono: fonts?.mono ?? defaultFamilies.mono,
  };

  const baseFonts: DeepPartial<Theme> = fonts
    ? {
        semantic: {
          fontFamilies: updatedFontFamilies,
          textStyles: createTextStyles(fonts, themes.light.semantic.textStyles),
        },
      }
    : {};

  return {
    light: merge(themes.light, baseFonts, light ?? {}) as Theme,
    dark: merge(themes.dark, baseFonts, dark ?? {}) as Theme,
  };
};
