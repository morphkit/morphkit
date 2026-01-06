import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const tag = {
  size: {
    sm: {
      paddingHorizontal: primitive.spacing[1.5],
      paddingVertical: primitive.spacing[0.5],
      minHeight: 20,
      gap: primitive.spacing[1],
      fontSize: primitive.fontSize.xs,
      lineHeight: primitive.lineHeight.normal,
    },
    md: {
      paddingHorizontal: primitive.spacing[3],
      paddingVertical: primitive.spacing[1.5],
      minHeight: 24,
      gap: primitive.spacing[1],
      fontSize: primitive.fontSize.sm,
      lineHeight: primitive.lineHeight.normal,
    },
    lg: {
      paddingHorizontal: primitive.spacing[2.5],
      paddingVertical: primitive.spacing[1.5],
      minHeight: 32,
      gap: primitive.spacing[2],
      fontSize: primitive.fontSize.md,
      lineHeight: primitive.lineHeight.relaxed,
    },
  },
  borderRadius: primitive.borderRadius.md,
  fontWeight: primitive.fontWeight.semibold,
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        text: light.text.inverse,
        border: light.action.primary,
      },
      secondary: {
        background: light.surface.tertiary,
        text: light.text.primary,
        border: light.border.primary,
      },
      outline: {
        background: "transparent",
        text: light.text.primary,
        border: light.border.secondary,
      },
      success: {
        background: light.status.success.surface,
        text: light.status.success.text,
        border: light.status.success.border,
      },
      warning: {
        background: light.status.warning.surface,
        text: light.status.warning.text,
        border: light.status.warning.border,
      },
      error: {
        background: light.status.error.surface,
        text: light.status.error.text,
        border: light.status.error.border,
      },
      info: {
        background: light.status.info.surface,
        text: light.status.info.text,
        border: light.status.info.border,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        text: dark.text.inverse,
        border: dark.action.primary,
      },
      secondary: {
        background: dark.surface.tertiary,
        text: dark.text.primary,
        border: dark.border.primary,
      },
      outline: {
        background: "transparent",
        text: dark.text.primary,
        border: dark.border.secondary,
      },
      success: {
        background: dark.status.success.surface,
        text: dark.status.success.text,
        border: dark.status.success.border,
      },
      warning: {
        background: dark.status.warning.surface,
        text: dark.status.warning.text,
        border: dark.status.warning.border,
      },
      error: {
        background: dark.status.error.surface,
        text: dark.status.error.text,
        border: dark.status.error.border,
      },
      info: {
        background: dark.status.info.surface,
        text: dark.status.info.text,
        border: dark.status.info.border,
      },
    },
  },
} as const;
