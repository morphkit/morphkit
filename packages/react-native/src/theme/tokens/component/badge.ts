import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const badge = {
  paddingHorizontal: primitive.spacing[2],
  paddingVertical: primitive.spacing[1],
  borderRadius: primitive.borderRadius.full,
  fontSize: primitive.fontSize.xs,
  fontWeight: primitive.fontWeight.semibold,
  dimensions: {
    minWidth: 20,
    height: 20,
  },
  position: {
    top: -6,
    right: {
      oneDigit: -6,
      twoDigits: -8,
      threeDigits: -14,
    },
  },
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        text: light.text.inverse,
      },
      secondary: {
        background: light.surface.tertiary,
        text: light.text.primary,
      },
      success: {
        background: light.status.success.main,
        text: light.text.inverse,
      },
      warning: {
        background: light.status.warning.main,
        text: light.text.inverse,
      },
      error: {
        background: light.status.error.main,
        text: light.text.inverse,
      },
      info: {
        background: light.status.info.main,
        text: light.text.inverse,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        text: dark.text.inverse,
      },
      secondary: {
        background: dark.surface.tertiary,
        text: dark.text.primary,
      },
      success: {
        background: dark.status.success.main,
        text: dark.text.inverse,
      },
      warning: {
        background: dark.status.warning.main,
        text: dark.text.inverse,
      },
      error: {
        background: dark.status.error.main,
        text: dark.text.inverse,
      },
      info: {
        background: dark.status.info.main,
        text: dark.text.inverse,
      },
    },
  },
} as const;
