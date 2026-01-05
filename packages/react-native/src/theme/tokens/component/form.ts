import * as primitive from '../primitive';
import { light, dark } from '../semantic/colors';

export const checkbox = {
  size: {
    sm: 16,
    md: 20,
    lg: 24,
  },
  borderRadius: primitive.borderRadius.sm,
  variant: {
    light: {
      checked: {
        background: light.action.primary,
        border: light.action.primary,
        icon: light.text.inverse,
      },
      unchecked: {
        background: 'transparent',
        border: light.border.secondary,
        icon: 'transparent',
      },
      disabled: {
        background: light.surface.tertiary,
        border: light.border.primary,
        icon: light.text.disabled,
      },
    },
    dark: {
      checked: {
        background: dark.action.primary,
        border: dark.action.primary,
        icon: dark.text.inverse,
      },
      unchecked: {
        background: 'transparent',
        border: dark.border.secondary,
        icon: 'transparent',
      },
      disabled: {
        background: dark.surface.tertiary,
        border: dark.border.primary,
        icon: dark.text.disabled,
      },
    },
  },
} as const;

export const radio = {
  size: {
    sm: 16,
    md: 20,
    lg: 24,
  },
  borderRadius: primitive.borderRadius.full,
  variant: {
    light: {
      checked: {
        border: light.action.primary,
        dot: light.action.primary,
      },
      unchecked: {
        border: light.border.secondary,
        dot: 'transparent',
      },
      disabled: {
        border: light.border.primary,
        dot: light.text.disabled,
      },
    },
    dark: {
      checked: {
        border: dark.action.primary,
        dot: dark.action.primary,
      },
      unchecked: {
        border: dark.border.secondary,
        dot: 'transparent',
      },
      disabled: {
        border: dark.border.primary,
        dot: dark.text.disabled,
      },
    },
  },
} as const;

export const switchComponent = {
  size: {
    sm: {
      trackWidth: 32,
      trackHeight: 20,
      thumbSize: 16,
      thumbPadding: 2,
    },
    md: {
      trackWidth: 40,
      trackHeight: 24,
      thumbSize: 20,
      thumbPadding: 2,
    },
    lg: {
      trackWidth: 48,
      trackHeight: 28,
      thumbSize: 24,
      thumbPadding: 2,
    },
  },
  variant: {
    light: {
      on: {
        track: light.action.primary,
        thumb: light.text.inverse,
      },
      off: {
        track: light.border.secondary,
        thumb: light.text.inverse,
      },
      disabled: {
        track: light.surface.tertiary,
        thumb: light.surface.secondary,
      },
    },
    dark: {
      on: {
        track: dark.action.primary,
        thumb: dark.text.inverse,
      },
      off: {
        track: dark.border.secondary,
        thumb: dark.text.inverse,
      },
      disabled: {
        track: dark.surface.tertiary,
        thumb: dark.surface.secondary,
      },
    },
  },
} as const;

export const slider = {
  trackHeight: 4,
  thumbSize: {
    sm: 16,
    md: 20,
    lg: 24,
  },
  variant: {
    light: {
      track: {
        active: light.action.primary,
        inactive: light.border.primary,
      },
      thumb: light.text.inverse,
      thumbBorder: light.action.primary,
    },
    dark: {
      track: {
        active: dark.action.primary,
        inactive: dark.border.primary,
      },
      thumb: dark.text.inverse,
      thumbBorder: dark.action.primary,
    },
  },
} as const;
