export const fontSize = {
  xs: 11,
  sm: 12,
  md: 13,
  base: 14,
  lg: 16,
  xl: 17,
  "2xl": 20,
  "3xl": 22,
  "4xl": 28,
  "5xl": 34,
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const lineHeight = {
  none: 1.0,
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.5,
  loose: 1.6,
} as const;

export const letterSpacing = {
  tighter: -0.34,
  tight: -0.224,
  normal: 0,
  wide: 0.11,
} as const;
