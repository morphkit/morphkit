import * as primitive from "../primitive/opacity";

export const state = {
  hover: {
    opacity: primitive.opacity.hover,
  },
  pressed: {
    opacity: primitive.opacity.pressed,
  },
  disabled: {
    opacity: primitive.opacity.disabled,
  },
  focus: {},
} as const;
