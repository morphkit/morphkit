import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const accordion = {
  padding: primitive.spacing[4],
  gap: primitive.spacing[3],
  borderRadius: primitive.borderRadius.md,
  iconSize: 20,
  variant: {
    light: {
      header: {
        background: light.surface.secondary,
        text: light.text.primary,
        border: light.border.primary,
        icon: light.text.tertiary,
      },
      content: {
        background: light.surface.primary,
        text: light.text.secondary,
        border: light.border.primary,
      },
    },
    dark: {
      header: {
        background: dark.surface.secondary,
        text: dark.text.primary,
        border: dark.border.primary,
        icon: dark.text.tertiary,
      },
      content: {
        background: dark.surface.primary,
        text: dark.text.secondary,
        border: dark.border.primary,
      },
    },
  },
} as const;
