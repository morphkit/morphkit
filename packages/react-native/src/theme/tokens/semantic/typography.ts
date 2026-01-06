import * as primitive from "../primitive/typography";
import * as fonts from "../primitive/fonts";

export const fontFamilies = {
  display: fonts.fontFamily.system,
  body: fonts.fontFamily.system,
  mono: fonts.fontFamily.systemMono,
} as const;

export const textStyles = {
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
} as const;
