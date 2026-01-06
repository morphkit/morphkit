import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

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
  variant: {
    light: {
      color: light.action.primary,
    },
    dark: {
      color: dark.action.primary,
    },
  },
} as const;
