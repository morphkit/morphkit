import * as primitive from '../primitive';
import { light, dark } from '../semantic/colors';

export const alert = {
  padding: primitive.spacing[4],
  borderRadius: primitive.borderRadius.md,
  gap: primitive.spacing[2],
  iconSize: 20,
  variant: {
    light: {
      success: {
        background: light.status.success.surface,
        border: light.status.success.border,
        text: light.status.success.text,
        icon: light.status.success.main,
      },
      warning: {
        background: light.status.warning.surface,
        border: light.status.warning.border,
        text: light.status.warning.text,
        icon: light.status.warning.main,
      },
      error: {
        background: light.status.error.surface,
        border: light.status.error.border,
        text: light.status.error.text,
        icon: light.status.error.main,
      },
      info: {
        background: light.status.info.surface,
        border: light.status.info.border,
        text: light.status.info.text,
        icon: light.status.info.main,
      },
    },
    dark: {
      success: {
        background: dark.status.success.surface,
        border: dark.status.success.border,
        text: dark.status.success.text,
        icon: dark.status.success.main,
      },
      warning: {
        background: dark.status.warning.surface,
        border: dark.status.warning.border,
        text: dark.status.warning.text,
        icon: dark.status.warning.main,
      },
      error: {
        background: dark.status.error.surface,
        border: dark.status.error.border,
        text: dark.status.error.text,
        icon: dark.status.error.main,
      },
      info: {
        background: dark.status.info.surface,
        border: dark.status.info.border,
        text: dark.status.info.text,
        icon: dark.status.info.main,
      },
    },
  },
} as const;

export const toast = {
  padding: primitive.spacing[4],
  borderRadius: primitive.borderRadius.lg,
  gap: primitive.spacing[2],
  iconSize: 20,
  minWidth: 280,
  maxWidth: 400,
  variant: {
    light: {
      default: {
        background: light.surface.elevated,
        text: light.text.primary,
        border: light.border.primary,
        shadow: primitive.shadowPresets.lg,
      },
      success: {
        background: light.status.success.surface,
        text: light.status.success.text,
        border: light.status.success.border,
        icon: light.status.success.main,
        shadow: primitive.shadowPresets.lg,
      },
      warning: {
        background: light.status.warning.surface,
        text: light.status.warning.text,
        border: light.status.warning.border,
        icon: light.status.warning.main,
        shadow: primitive.shadowPresets.lg,
      },
      error: {
        background: light.status.error.surface,
        text: light.status.error.text,
        border: light.status.error.border,
        icon: light.status.error.main,
        shadow: primitive.shadowPresets.lg,
      },
      info: {
        background: light.status.info.surface,
        text: light.status.info.text,
        border: light.status.info.border,
        icon: light.status.info.main,
        shadow: primitive.shadowPresets.lg,
      },
    },
    dark: {
      default: {
        background: dark.surface.elevated,
        text: dark.text.primary,
        border: dark.border.primary,
        shadow: primitive.shadowPresets.lg,
      },
      success: {
        background: dark.status.success.surface,
        text: dark.status.success.text,
        border: dark.status.success.border,
        icon: dark.status.success.main,
        shadow: primitive.shadowPresets.lg,
      },
      warning: {
        background: dark.status.warning.surface,
        text: dark.status.warning.text,
        border: dark.status.warning.border,
        icon: dark.status.warning.main,
        shadow: primitive.shadowPresets.lg,
      },
      error: {
        background: dark.status.error.surface,
        text: dark.status.error.text,
        border: dark.status.error.border,
        icon: dark.status.error.main,
        shadow: primitive.shadowPresets.lg,
      },
      info: {
        background: dark.status.info.surface,
        text: dark.status.info.text,
        border: dark.status.info.border,
        icon: dark.status.info.main,
        shadow: primitive.shadowPresets.lg,
      },
    },
  },
} as const;

export const progress = {
  height: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  borderRadius: primitive.borderRadius.full,
  variant: {
    light: {
      track: light.surface.tertiary,
      fill: light.action.primary,
    },
    dark: {
      track: dark.surface.tertiary,
      fill: dark.action.primary,
    },
  },
} as const;

export const skeleton = {
  borderRadius: primitive.borderRadius.md,
  variant: {
    light: {
      background: light.surface.tertiary,
      shimmer: light.surface.secondary,
    },
    dark: {
      background: dark.surface.tertiary,
      shimmer: dark.surface.secondary,
    },
  },
} as const;

export const spinner = {
  size: {
    sm: 16,
    md: 24,
    lg: 32,
  },
  strokeWidth: {
    sm: 2,
    md: 3,
    lg: 4,
  },
  variant: {
    light: {
      color: light.action.primary,
    },
    dark: {
      color: dark.action.primary,
    },
  },
} as const;
