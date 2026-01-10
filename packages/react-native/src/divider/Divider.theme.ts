import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const divider = {
  thickness: primitive.spacing.hairline,
  variant: {
    light: {
      color: light.border.primary,
    },
    dark: {
      color: dark.border.primary,
    },
  },
} as const;
