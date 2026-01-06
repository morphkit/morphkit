import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

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
