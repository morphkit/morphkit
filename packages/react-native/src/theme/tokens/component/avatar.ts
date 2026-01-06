import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const avatar = {
  size: {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  },
  borderRadius: primitive.borderRadius.full,
  variant: {
    light: {
      background: light.action.primary,
      text: light.text.inverse,
      border: light.border.primary,
    },
    dark: {
      background: dark.action.primary,
      text: dark.text.inverse,
      border: dark.border.primary,
    },
  },
} as const;
