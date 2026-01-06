import { light, dark } from "../semantic/colors";

export const divider = {
  thickness: 1,
  variant: {
    light: {
      color: light.border.primary,
    },
    dark: {
      color: dark.border.primary,
    },
  },
} as const;
