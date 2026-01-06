import { textStyles, fontFamilies } from "../semantic/typography";
import { light, dark } from "../semantic/colors";

export const typography = {
  styles: textStyles,
  fontFamilies,
  variant: {
    light: {
      text: light.text.primary,
    },
    dark: {
      text: dark.text.primary,
    },
  },
} as const;
