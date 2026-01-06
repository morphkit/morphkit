import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const skeleton = {
  borderRadius: primitive.borderRadius.md,
  variant: {
    light: {
      background: light.surface.tertiary,
      shimmer: light.surface.secondary,
    },
    dark: {
      background: dark.surface.tertiary,
      shimmer: dark.surface.secondary,
    },
  },
} as const;
