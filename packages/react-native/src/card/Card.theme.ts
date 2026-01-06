import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

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
      ghost: {
        background: light.surface.secondary,
        border: "transparent",
        shadow: primitive.shadowPresets.sm,
      },
      filled: {
        background: light.surface.tertiary,
        border: "transparent",
        shadow: primitive.shadowPresets.md,
      },
      pressed: {
        opacity: primitive.opacity.pressed,
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
      ghost: {
        background: dark.surface.secondary,
        border: "transparent",
        shadow: primitive.shadowPresets.sm,
      },
      filled: {
        background: dark.surface.tertiary,
        border: "transparent",
        shadow: primitive.shadowPresets.md,
      },
      pressed: {
        opacity: primitive.opacity.pressed,
      },
    },
  },
} as const;
