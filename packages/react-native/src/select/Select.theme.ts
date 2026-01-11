import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const select = {
  size: {
    sm: {
      height: 36,
      fontSize: primitive.fontSize.sm,
      padding: primitive.spacing[2],
      borderRadius: primitive.borderRadius.lg,
    },
    md: {
      height: 44,
      fontSize: primitive.fontSize.base,
      padding: primitive.spacing[3],
      borderRadius: primitive.borderRadius.lg,
    },
    lg: {
      height: 52,
      fontSize: primitive.fontSize.lg,
      padding: primitive.spacing[4],
      borderRadius: primitive.borderRadius.lg,
    },
  },
  gap: primitive.spacing[2],
  borderWidth: {
    outline: primitive.spacing.hairline,
    filled: 0,
  },
  variant: {
    light: {
      default: {
        background: light.surface.primary,
        text: light.text.primary,
        placeholder: light.text.tertiary,
        border: light.border.primary,
        icon: light.text.secondary,
      },
      filled: {
        background: light.surface.tertiary,
        text: light.text.primary,
        placeholder: light.text.tertiary,
        border: "transparent",
        icon: light.text.secondary,
      },
      focus: {
        border: light.border.focus,
      },
      error: {
        border: light.border.error,
        text: light.status.error.main,
      },
      disabled: {
        background: light.surface.secondary,
        text: light.text.disabled,
        border: light.border.primary,
        opacity: primitive.opacity.disabled,
      },
      label: {
        text: light.text.secondary,
      },
    },
    dark: {
      default: {
        background: dark.surface.primary,
        text: dark.text.primary,
        placeholder: dark.text.tertiary,
        border: dark.border.primary,
        icon: dark.text.secondary,
      },
      filled: {
        background: dark.surface.tertiary,
        text: dark.text.primary,
        placeholder: dark.text.tertiary,
        border: "transparent",
        icon: dark.text.secondary,
      },
      focus: {
        border: dark.border.focus,
      },
      error: {
        border: dark.border.error,
        text: dark.status.error.main,
      },
      disabled: {
        background: dark.surface.secondary,
        text: dark.text.disabled,
        border: dark.border.primary,
        opacity: primitive.opacity.disabled,
      },
      label: {
        text: dark.text.secondary,
      },
    },
  },
} as const;
