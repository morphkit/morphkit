import * as primitive from '../primitive';
import { light, dark } from '../semantic/colors';

export const container = {
  maxWidth: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  padding: primitive.spacing[4],
} as const;

export const divider = {
  thickness: 1,
  variant: {
    light: {
      color: light.border.primary,
    },
    dark: {
      color: dark.border.primary,
    },
  },
} as const;

export const label = {
  fontSize: primitive.fontSize.sm,
  fontWeight: primitive.fontWeight.medium,
  marginBottom: primitive.spacing[1.5],
  variant: {
    light: {
      text: light.text.secondary,
      required: light.status.error.main,
    },
    dark: {
      text: dark.text.secondary,
      required: dark.status.error.main,
    },
  },
} as const;
