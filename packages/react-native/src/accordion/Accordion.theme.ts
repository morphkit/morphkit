import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const accordion = {
  padding: primitive.spacing[4],
  gap: primitive.spacing[3],
  borderRadius: primitive.borderRadius.md,
  iconSize: 20,
  header: {
    fontSize: primitive.fontSize.lg,
    fontWeight: primitive.fontWeight.medium,
  },
  duration: primitive.duration.normal,
  variant: {
    light: {
      header: {
        background: light.surface.secondary,
        text: light.text.primary,
        border: light.border.primary,
        icon: light.text.tertiary,
        pressed: light.surface.tertiary,
      },
      disabled: {
        opacity: primitive.opacity.disabled,
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
        pressed: dark.surface.tertiary,
      },
      content: {
        background: dark.surface.primary,
        text: dark.text.secondary,
        border: dark.border.primary,
      },
      disabled: {
        opacity: primitive.opacity.disabled,
      },
    },
  },
} as const;
