import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const toast = {
  padding: primitive.spacing[4],
  borderRadius: primitive.borderRadius.lg,
  gap: primitive.spacing[2],
  iconSize: 20,
  minWidth: 280,
  maxWidth: 400,
  position: {
    offset: primitive.spacing[12],
    horizontal: primitive.spacing[4],
  },
  text: {
    fontSize: primitive.fontSize.sm,
    lineHeight: primitive.lineHeight.relaxed,
  },
  animation: {
    spring: primitive.spring.gentle,
    duration: primitive.duration.normal,
  },
  variant: {
    light: {
      default: {
        background: light.surface.elevated,
        text: light.text.primary,
        border: light.border.primary,
        shadow: primitive.shadowPresets.lg,
      },
      success: {
        background: light.status.success.surface,
        text: light.status.success.text,
        border: light.status.success.border,
        icon: light.status.success.main,
        shadow: primitive.shadowPresets.lg,
      },
      warning: {
        background: light.status.warning.surface,
        text: light.status.warning.text,
        border: light.status.warning.border,
        icon: light.status.warning.main,
        shadow: primitive.shadowPresets.lg,
      },
      error: {
        background: light.status.error.surface,
        text: light.status.error.text,
        border: light.status.error.border,
        icon: light.status.error.main,
        shadow: primitive.shadowPresets.lg,
      },
      info: {
        background: light.status.info.surface,
        text: light.status.info.text,
        border: light.status.info.border,
        icon: light.status.info.main,
        shadow: primitive.shadowPresets.lg,
      },
    },
    dark: {
      default: {
        background: dark.surface.elevated,
        text: dark.text.primary,
        border: dark.border.primary,
        shadow: primitive.shadowPresets.lg,
      },
      success: {
        background: dark.status.success.surface,
        text: dark.status.success.text,
        border: dark.status.success.border,
        icon: dark.status.success.main,
        shadow: primitive.shadowPresets.lg,
      },
      warning: {
        background: dark.status.warning.surface,
        text: dark.status.warning.text,
        border: dark.status.warning.border,
        icon: dark.status.warning.main,
        shadow: primitive.shadowPresets.lg,
      },
      error: {
        background: dark.status.error.surface,
        text: dark.status.error.text,
        border: dark.status.error.border,
        icon: dark.status.error.main,
        shadow: primitive.shadowPresets.lg,
      },
      info: {
        background: dark.status.info.surface,
        text: dark.status.info.text,
        border: dark.status.info.border,
        icon: dark.status.info.main,
        shadow: primitive.shadowPresets.lg,
      },
    },
  },
} as const;
