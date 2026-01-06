import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

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
        background: "transparent",
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
        background: "transparent",
        text: dark.text.primary,
        border: dark.border.secondary,
      },
    },
  },
} as const;
