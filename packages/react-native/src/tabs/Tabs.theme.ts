import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const tabs = {
  padding: primitive.spacing[3],
  gap: primitive.spacing[2],
  borderRadius: primitive.borderRadius.md,
  width: {
    vertical: 200,
  },
  borderWidth: {
    line: 2,
    lineVertical: 3,
  },
  iconMargin: primitive.spacing[2],
  label: {
    fontSize: primitive.fontSize.base,
    fontWeight: primitive.fontWeight.medium,
  },
  pill: {
    paddingHorizontal: primitive.spacing[3],
    paddingVertical: primitive.spacing[2],
  },
  horizontal: {
    gap: primitive.spacing[4],
    paddingHorizontal: primitive.spacing[4],
  },
  vertical: {
    paddingVertical: primitive.spacing[2.5],
  },
  content: {
    paddingTop: primitive.spacing[4],
  },
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
      filled: {
        text: light.text.inverse,
      },
      pills: {
        text: light.text.inverse,
      },
      disabled: {
        opacity: primitive.opacity.disabled,
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
      filled: {
        text: dark.text.inverse,
      },
      pills: {
        text: dark.text.inverse,
      },
      disabled: {
        opacity: primitive.opacity.disabled,
      },
    },
  },
} as const;
