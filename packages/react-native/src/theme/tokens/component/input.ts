import * as primitive from '../primitive';
import { light, dark } from '../semantic/colors';

export const input = {
  size: {
    sm: {
      height: 36,
      fontSize: primitive.fontSize.sm,
      padding: primitive.spacing[2],
      borderRadius: primitive.borderRadius.md,
    },
    md: {
      height: 44,
      fontSize: primitive.fontSize.base,
      padding: primitive.spacing[3],
      borderRadius: primitive.borderRadius.md,
    },
    lg: {
      height: 52,
      fontSize: primitive.fontSize.lg,
      padding: primitive.spacing[4],
      borderRadius: primitive.borderRadius.md,
    },
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
      },
      disabled: {
        background: light.surface.secondary,
        text: light.text.disabled,
        border: light.border.primary,
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
      },
      disabled: {
        background: dark.surface.secondary,
        text: dark.text.disabled,
        border: dark.border.primary,
      },
    },
  },
} as const;
