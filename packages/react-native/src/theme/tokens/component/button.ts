import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const button = {
  size: {
    sm: {
      height: 32,
      paddingHorizontal: primitive.spacing[3],
      paddingVertical: primitive.spacing[1.5],
      fontSize: primitive.fontSize.sm,
      borderRadius: primitive.borderRadius.md,
      gap: primitive.spacing[1.5],
      iconSize: 16,
    },
    md: {
      height: 40,
      paddingHorizontal: primitive.spacing[4],
      paddingVertical: primitive.spacing[2.5],
      fontSize: primitive.fontSize.base,
      borderRadius: primitive.borderRadius.md,
      gap: primitive.spacing[2],
      iconSize: 20,
    },
    lg: {
      height: 48,
      paddingHorizontal: primitive.spacing[5],
      paddingVertical: primitive.spacing[3.5],
      fontSize: primitive.fontSize.lg,
      borderRadius: primitive.borderRadius.md,
      gap: primitive.spacing[2.5],
      iconSize: 24,
    },
  },
  variant: {
    light: {
      solid: {
        primary: {
          background: light.action.primary,
          text: light.text.inverse,
        },
        secondary: {
          background: light.surface.tertiary,
          text: light.text.primary,
        },
      },
      outline: {
        primary: {
          background: "transparent",
          text: light.action.primary,
          border: light.action.primary,
        },
        secondary: {
          background: "transparent",
          text: light.text.primary,
          border: light.border.primary,
        },
      },
      ghost: {
        primary: {
          background: "transparent",
          text: light.action.primary,
        },
        secondary: {
          background: "transparent",
          text: light.text.primary,
        },
      },
    },
    dark: {
      solid: {
        primary: {
          background: dark.action.primary,
          text: dark.text.inverse,
        },
        secondary: {
          background: dark.surface.tertiary,
          text: dark.text.primary,
        },
      },
      outline: {
        primary: {
          background: "transparent",
          text: dark.action.primary,
          border: dark.action.primary,
        },
        secondary: {
          background: "transparent",
          text: dark.text.primary,
          border: dark.border.primary,
        },
      },
      ghost: {
        primary: {
          background: "transparent",
          text: dark.action.primary,
        },
        secondary: {
          background: "transparent",
          text: dark.text.primary,
        },
      },
    },
  },
} as const;
