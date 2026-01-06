import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const alert = {
  padding: primitive.spacing[4],
  borderRadius: primitive.borderRadius.md,
  gap: primitive.spacing[2],
  iconSize: 20,
  contentGap: primitive.spacing[1],
  dismissHitSlop: primitive.spacing[2],
  title: {
    fontSize: primitive.fontSize.base,
    lineHeight: primitive.lineHeight.normal,
  },
  description: {
    fontSize: primitive.fontSize.md,
    lineHeight: primitive.lineHeight.normal,
  },
  variant: {
    light: {
      success: {
        background: light.status.success.surface,
        border: light.status.success.border,
        text: light.status.success.text,
        icon: light.status.success.main,
      },
      warning: {
        background: light.status.warning.surface,
        border: light.status.warning.border,
        text: light.status.warning.text,
        icon: light.status.warning.main,
      },
      error: {
        background: light.status.error.surface,
        border: light.status.error.border,
        text: light.status.error.text,
        icon: light.status.error.main,
      },
      info: {
        background: light.status.info.surface,
        border: light.status.info.border,
        text: light.status.info.text,
        icon: light.status.info.main,
      },
    },
    dark: {
      success: {
        background: dark.status.success.surface,
        border: dark.status.success.border,
        text: dark.status.success.text,
        icon: dark.status.success.main,
      },
      warning: {
        background: dark.status.warning.surface,
        border: dark.status.warning.border,
        text: dark.status.warning.text,
        icon: dark.status.warning.main,
      },
      error: {
        background: dark.status.error.surface,
        border: dark.status.error.border,
        text: dark.status.error.text,
        icon: dark.status.error.main,
      },
      info: {
        background: dark.status.info.surface,
        border: dark.status.info.border,
        text: dark.status.info.text,
        icon: dark.status.info.main,
      },
    },
  },
} as const;
