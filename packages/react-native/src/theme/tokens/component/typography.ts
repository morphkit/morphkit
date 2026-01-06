import { textStyles } from "../semantic/typography";
import { light, dark } from "../semantic/colors";

export const typography = {
  styles: textStyles,
  variant: {
    light: {
      text: light.text.primary,
    },
    dark: {
      text: dark.text.primary,
    },
  },
} as const;
