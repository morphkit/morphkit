import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const otpInput = {
  gap: primitive.spacing[2],
  fieldWidth: {
    sm: 36,
    md: 44,
    lg: 52,
  },
  variant: {
    light: {
      success: {
        border: light.status.success.border,
      },
    },
    dark: {
      success: {
        border: dark.status.success.border,
      },
    },
  },
} as const;
