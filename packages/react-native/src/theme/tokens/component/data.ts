import * as primitive from '../primitive';
import { light, dark } from '../semantic/colors';

export const avatar = {
  size: {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  },
  borderRadius: primitive.borderRadius.full,
  variant: {
    light: {
      background: light.action.primary,
      text: light.text.inverse,
      border: light.border.primary,
    },
    dark: {
      background: dark.action.primary,
      text: dark.text.inverse,
      border: dark.border.primary,
    },
  },
} as const;

export const badge = {
  paddingHorizontal: primitive.spacing[2],
  paddingVertical: primitive.spacing[1],
  borderRadius: primitive.borderRadius.full,
  fontSize: primitive.fontSize.xs,
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

export const tag = {
  paddingHorizontal: primitive.spacing[3],
  paddingVertical: primitive.spacing[1.5],
  borderRadius: primitive.borderRadius.md,
  fontSize: primitive.fontSize.sm,
  gap: primitive.spacing[1],
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
        background: 'transparent',
        text: light.text.primary,
        border: light.border.secondary,
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
        background: 'transparent',
        text: dark.text.primary,
        border: dark.border.secondary,
      },
    },
  },
} as const;
