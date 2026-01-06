import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const radio = {
  size: {
    sm: 16,
    md: 20,
    lg: 24,
  },
  borderRadius: primitive.borderRadius.full,
  variant: {
    light: {
      checked: {
        border: light.action.primary,
        dot: light.action.primary,
      },
      unchecked: {
        border: light.border.secondary,
        dot: "transparent",
      },
      disabled: {
        border: light.border.primary,
        dot: light.text.disabled,
      },
    },
    dark: {
      checked: {
        border: dark.action.primary,
        dot: dark.action.primary,
      },
      unchecked: {
        border: dark.border.secondary,
        dot: "transparent",
      },
      disabled: {
        border: dark.border.primary,
        dot: dark.text.disabled,
      },
    },
  },
} as const;
