import { textStyles, fontFamilies } from "../theme/tokens/semantic/typography";
import { light, dark } from "../theme/tokens/semantic/colors";

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
