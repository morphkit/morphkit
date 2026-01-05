import * as primitive from '../primitive';
import { light, dark } from '../semantic/colors';

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
          background: 'transparent',
          text: light.text.tertiary,
          border: 'transparent',
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
          background: 'transparent',
          text: dark.text.tertiary,
          border: 'transparent',
        },
      },
    },
  },
} as const;

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
    },
    dark: {
      primary: {
        background: dark.action.primary,
        icon: dark.text.inverse,
        shadow: primitive.shadowPresets.lg,
      },
      secondary: {
        background: dark.surface.elevated,
        icon: dark.text.primary,
        shadow: primitive.shadowPresets.lg,
      },
    },
  },
} as const;
