import * as primitive from "../primitive";
import { light, dark } from "../semantic/colors";

export const slider = {
  trackHeight: 4,
  thumbSize: {
    sm: 16,
    md: 20,
    lg: 24,
  },
  thumbBorderWidth: 2,
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
