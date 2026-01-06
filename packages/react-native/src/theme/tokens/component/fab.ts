import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const fab = {
  size: {
    sm: {
      width: 40,
      height: 40,
      borderRadius: 20,
      iconSize: 20,
    },
    md: {
      width: 56,
      height: 56,
      borderRadius: 28,
      iconSize: 24,
    },
    lg: {
      width: 64,
      height: 64,
      borderRadius: 32,
      iconSize: 28,
    },
  },
  offset: primitive.spacing[4],
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        icon: light.text.inverse,
        shadow: primitive.shadowPresets.lg,
      },
      secondary: {
        background: light.surface.elevated,
        icon: light.text.primary,
        shadow: primitive.shadowPresets.lg,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        icon: dark.text.inverse,
        shadow: primitive.shadowPresets.lg,
      },
      secondary: {
        background: dark.surface.elevated,
        icon: dark.text.primary,
        shadow: primitive.shadowPresets.lg,
      },
    },
  },
} as const;
