import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const fab = {
  size: {
    sm: {
      width: 40,
      height: 40,
      borderRadius: 20,
      iconSize: 20,
    },
    md: {
      width: 56,
      height: 56,
      borderRadius: 28,
      iconSize: 24,
    },
    lg: {
      width: 64,
      height: 64,
      borderRadius: 32,
      iconSize: 28,
    },
  },
  offset: primitive.spacing[4],
  extended: {
    minWidth: {
      sm: 80,
      md: 96,
      lg: 112,
    },
    gap: primitive.spacing[2],
    paddingHorizontal: primitive.spacing[4],
    fontSize: primitive.fontSize.base,
    fontWeight: primitive.fontWeight.semibold,
    variant: {
      light: {
        primary: {
          icon: light.text.inverse,
          text: light.text.inverse,
        },
        secondary: {
          icon: light.text.primary,
          text: light.text.primary,
        },
      },
      dark: {
        primary: {
          icon: dark.text.inverse,
          text: dark.text.primary,
        },
        secondary: {
          icon: dark.text.inverse,
          text: dark.text.inverse,
        },
      },
    },
  },
  animation: {
    duration: primitive.duration.fast,
    spring: primitive.spring.default,
  },
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        icon: light.text.inverse,
        shadow: primitive.shadowPresets.lg,
      },
      secondary: {
        background: light.surface.elevated,
        icon: light.text.primary,
        shadow: primitive.shadowPresets.lg,
      },
      disabled: {
        opacity: primitive.opacity.disabled,
      },
      hover: {
        opacity: primitive.opacity.hover,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        icon: dark.text.inverse,
        shadow: primitive.shadowPresets.lg,
      },
      secondary: {
        background: dark.surface.elevated,
        icon: dark.text.inverse,
        shadow: primitive.shadowPresets.lg,
      },
      disabled: {
        opacity: primitive.opacity.disabled,
      },
      hover: {
        opacity: primitive.opacity.hover,
      },
    },
  },
} as const;
