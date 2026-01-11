import * as primitive from "../theme/tokens/primitive";

export const box = {
  spacing: {
    none: 0,
    xs: primitive.spacing[1],
    sm: primitive.spacing[2],
    md: primitive.spacing[4],
    lg: primitive.spacing[6],
    xl: primitive.spacing[8],
  },
  borderRadius: {
    none: 0,
    sm: primitive.borderRadius.sm,
    md: primitive.borderRadius.md,
    lg: primitive.borderRadius.lg,
    xl: primitive.borderRadius.xl,
    full: primitive.borderRadius.full,
  },
  gap: {
    none: 0,
    xs: primitive.spacing[1],
    sm: primitive.spacing[2],
    md: primitive.spacing[4],
    lg: primitive.spacing[6],
    xl: primitive.spacing[8],
  },
} as const;
