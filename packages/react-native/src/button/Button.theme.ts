import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const button = {
  size: {
    sm: {
      height: 32,
      paddingHorizontal: primitive.spacing[3],
      paddingVertical: primitive.spacing[1.5],
      fontSize: primitive.fontSize.sm,
      borderRadius: primitive.borderRadius.md,
      gap: primitive.spacing[1.5],
      iconSize: 16,
    },
    md: {
      height: 40,
      paddingHorizontal: primitive.spacing[4],
      paddingVertical: primitive.spacing[2.5],
      fontSize: primitive.fontSize.base,
      borderRadius: primitive.borderRadius.md,
      gap: primitive.spacing[2],
      iconSize: 20,
    },
    lg: {
      height: 48,
      paddingHorizontal: primitive.spacing[5],
      paddingVertical: primitive.spacing[3.5],
      fontSize: primitive.fontSize.lg,
      borderRadius: primitive.borderRadius.md,
      gap: primitive.spacing[2.5],
      iconSize: 24,
    },
  },
  borderWidth: {
    secondary: 1,
    default: 0,
  },
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        backgroundPressed: light.action.primaryPressed,
        text: light.text.inverse,
        border: "transparent",
      },
      secondary: {
        background: light.surface.primary,
        backgroundPressed: light.surface.secondary,
        text: light.text.primary,
        border: light.border.primary,
      },
      tonal: {
        background: light.status.info.surface,
        backgroundPressed: light.surface.tertiary,
        text: light.status.info.text,
        border: "transparent",
      },
      plain: {
        background: "transparent",
        backgroundPressed: light.surface.secondary,
        text: light.action.primary,
        border: "transparent",
      },
      disabled: {
        background: light.surface.tertiary,
        text: light.text.disabled,
        border: light.border.primary,
        opacity: primitive.opacity.disabled,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        backgroundPressed: dark.action.primaryPressed,
        text: dark.text.inverse,
        border: "transparent",
      },
      secondary: {
        background: dark.surface.primary,
        backgroundPressed: dark.surface.secondary,
        text: dark.text.primary,
        border: dark.border.primary,
      },
      tonal: {
        background: dark.status.info.surface,
        backgroundPressed: dark.surface.tertiary,
        text: dark.status.info.text,
        border: "transparent",
      },
      plain: {
        background: "transparent",
        backgroundPressed: dark.surface.tertiary,
        text: dark.action.primary,
        border: "transparent",
      },
      disabled: {
        background: dark.surface.tertiary,
        text: dark.text.disabled,
        border: dark.border.primary,
        opacity: primitive.opacity.disabled,
      },
    },
  },
} as const;
