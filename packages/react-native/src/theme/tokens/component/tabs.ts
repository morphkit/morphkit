import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const tabs = {
  padding: primitive.spacing[3],
  gap: primitive.spacing[2],
  borderRadius: primitive.borderRadius.md,
  variant: {
    light: {
      container: {
        background: light.surface.secondary,
        border: light.border.primary,
      },
      tab: {
        active: {
          background: light.surface.primary,
          text: light.text.primary,
          border: light.border.secondary,
        },
        inactive: {
          background: "transparent",
          text: light.text.tertiary,
          border: "transparent",
        },
      },
    },
    dark: {
      container: {
        background: dark.surface.secondary,
        border: dark.border.primary,
      },
      tab: {
        active: {
          background: dark.surface.primary,
          text: dark.text.primary,
          border: dark.border.secondary,
        },
        inactive: {
          background: "transparent",
          text: dark.text.tertiary,
          border: "transparent",
        },
      },
    },
  },
} as const;
