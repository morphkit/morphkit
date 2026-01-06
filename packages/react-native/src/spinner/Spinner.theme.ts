import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const spinner = {
  size: {
    sm: 16,
    md: 24,
    lg: 32,
  },
  strokeWidth: {
    sm: 2,
    md: 3,
    lg: 4,
  },
  duration: primitive.duration.slow,
  variant: {
    light: {
      color: light.action.primary,
    },
    dark: {
      color: dark.action.primary,
    },
  },
} as const;
