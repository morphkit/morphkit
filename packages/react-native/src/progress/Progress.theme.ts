import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const progress = {
  height: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  borderRadius: primitive.borderRadius.full,
  circle: {
    size: {
      sm: 32,
      md: 48,
      lg: 64,
    },
    strokeWidthRatio: 0.125,
  },
  label: {
    fontSize: {
      sm: primitive.fontSize.xs,
      md: primitive.fontSize.sm,
    },
    fontWeight: primitive.fontWeight.semibold,
    gap: primitive.spacing[2],
  },
  duration: primitive.duration.slow,
  variant: {
    light: {
      track: light.surface.tertiary,
      fill: light.action.primary,
      text: light.text.secondary,
    },
    dark: {
      track: dark.surface.tertiary,
      fill: dark.action.primary,
      text: dark.text.secondary,
    },
  },
} as const;
