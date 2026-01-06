import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const skeleton = {
  borderRadius: primitive.borderRadius.md,
  duration: primitive.duration.verySlow,
  defaultDimensions: {
    circle: { width: 40, height: 40 },
    text: { width: "100%" as const, height: 12 },
    rect: { width: "100%" as const, height: 20 },
  },
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
