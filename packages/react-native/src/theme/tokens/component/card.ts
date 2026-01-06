import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const card = {
  padding: primitive.spacing[4],
  borderRadius: primitive.borderRadius.lg,
  gap: primitive.spacing[3],
  variant: {
    light: {
      default: {
        background: light.surface.elevated,
        border: light.border.primary,
        shadow: primitive.shadowPresets.md,
      },
      elevated: {
        background: light.surface.elevated,
        border: "transparent",
        shadow: primitive.shadowPresets.lg,
      },
      outlined: {
        background: light.surface.primary,
        border: light.border.primary,
        shadow: primitive.shadowPresets.sm,
      },
    },
    dark: {
      default: {
        background: dark.surface.elevated,
        border: dark.border.primary,
        shadow: primitive.shadowPresets.md,
      },
      elevated: {
        background: dark.surface.elevated,
        border: "transparent",
        shadow: primitive.shadowPresets.lg,
      },
      outlined: {
        background: dark.surface.primary,
        border: dark.border.primary,
        shadow: primitive.shadowPresets.sm,
      },
    },
  },
} as const;
