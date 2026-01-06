import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const label = {
  fontSize: {
    sm: primitive.fontSize.xs,
    md: primitive.fontSize.sm,
    lg: primitive.fontSize.lg,
  },
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
