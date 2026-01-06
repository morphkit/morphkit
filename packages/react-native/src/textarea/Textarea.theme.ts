import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const textarea = {
  size: {
    sm: {
      fontSize: primitive.fontSize.sm,
      padding: primitive.spacing[2],
      borderRadius: primitive.borderRadius.md,
      lineHeight: primitive.lineHeight.relaxed,
    },
    md: {
      fontSize: primitive.fontSize.base,
      padding: primitive.spacing[3],
      borderRadius: primitive.borderRadius.md,
      lineHeight: primitive.lineHeight.relaxed,
    },
    lg: {
      fontSize: primitive.fontSize.lg,
      padding: primitive.spacing[4],
      borderRadius: primitive.borderRadius.md,
      lineHeight: primitive.lineHeight.relaxed,
    },
  },
  borderWidth: 1,
  footer: {
    gap: primitive.spacing[1],
  },
  characterCount: {
    fontSize: primitive.fontSize.xs,
    marginLeft: primitive.spacing[2],
  },
  errorText: {
    fontSize: primitive.fontSize.xs,
  },
  variant: {
    light: {
      default: {
        background: light.surface.primary,
        text: light.text.primary,
        placeholder: light.text.tertiary,
        border: light.border.primary,
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
      count: {
        text: light.text.secondary,
      },
    },
    dark: {
      default: {
        background: dark.surface.primary,
        text: dark.text.primary,
        placeholder: dark.text.tertiary,
        border: dark.border.primary,
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
      count: {
        text: dark.text.secondary,
      },
    },
  },
} as const;
