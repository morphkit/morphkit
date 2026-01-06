import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const progress = {
  height: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  borderRadius: primitive.borderRadius.full,
  variant: {
    light: {
      track: light.surface.tertiary,
      fill: light.action.primary,
    },
    dark: {
      track: dark.surface.tertiary,
      fill: dark.action.primary,
    },
  },
} as const;
