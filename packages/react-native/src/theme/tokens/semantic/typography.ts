import * as primitive from '../primitive/typography';

export const textStyles = {
  largeTitle: {
    fontSize: primitive.fontSize['5xl'],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize['5xl'] * primitive.lineHeight.tight,
    letterSpacing: primitive.letterSpacing.tighter,
  },
  title1: {
    fontSize: primitive.fontSize['4xl'],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize['4xl'] * primitive.lineHeight.tight,
    letterSpacing: primitive.letterSpacing.tight,
  },
  title2: {
    fontSize: primitive.fontSize['3xl'],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize['3xl'] * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.tight,
  },
  title3: {
    fontSize: primitive.fontSize['2xl'],
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize['2xl'] * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
  },
  heading: {
    fontSize: primitive.fontSize.xl,
    fontWeight: primitive.fontWeight.semibold,
    lineHeight: primitive.fontSize.xl * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
  },
  body: {
    fontSize: primitive.fontSize.xl,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.xl * primitive.lineHeight.relaxed,
    letterSpacing: primitive.letterSpacing.normal,
  },
  callout: {
    fontSize: primitive.fontSize.lg,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.lg * primitive.lineHeight.relaxed,
    letterSpacing: primitive.letterSpacing.normal,
  },
  subhead: {
    fontSize: primitive.fontSize.base,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.base * primitive.lineHeight.relaxed,
    letterSpacing: primitive.letterSpacing.normal,
  },
  footnote: {
    fontSize: primitive.fontSize.md,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.md * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
  },
  caption1: {
    fontSize: primitive.fontSize.sm,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.sm * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
  },
  caption2: {
    fontSize: primitive.fontSize.xs,
    fontWeight: primitive.fontWeight.regular,
    lineHeight: primitive.fontSize.xs * primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.wide,
  },
} as const;
