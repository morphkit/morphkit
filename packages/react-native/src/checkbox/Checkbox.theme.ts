import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const checkbox = {
  size: {
    sm: 16,
    md: 20,
    lg: 24,
  },
  iconScale: 0.7,
  borderRadius: primitive.borderRadius.sm,
  borderWidth: 2,
  variant: {
    light: {
      checked: {
        background: light.action.primary,
        border: light.action.primary,
        icon: light.text.inverse,
      },
      unchecked: {
        background: "transparent",
        border: light.border.secondary,
        icon: "transparent",
      },
      disabled: {
        background: light.surface.tertiary,
        border: light.border.primary,
        icon: light.text.disabled,
      },
    },
    dark: {
      checked: {
        background: dark.action.primary,
        border: dark.action.primary,
        icon: dark.text.inverse,
      },
      unchecked: {
        background: "transparent",
        border: dark.border.secondary,
        icon: "transparent",
      },
      disabled: {
        background: dark.surface.tertiary,
        border: dark.border.primary,
        icon: dark.text.disabled,
      },
    },
  },
} as const;
