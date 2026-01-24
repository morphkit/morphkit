import { light, dark } from "../theme/tokens/semantic/colors";
import { textStyles } from "../theme/tokens/semantic/typography";
import { borderRadius } from "../theme/tokens/primitive/radii";

export const stack = {
  header: {
    light: {
      background: light.surface.primary,
      tint: light.action.primary,
      title: light.text.primary,
    },
    dark: {
      background: dark.surface.primary,
      tint: dark.action.primary,
      title: dark.text.primary,
    },
  },
  headerTitle: {
    fontSize: textStyles.heading.fontSize,
    fontWeight: textStyles.heading.fontWeight,
  },
  contentBackgroundColor: {
    light: light.surface.primary,
    dark: dark.surface.primary,
  },
  shadowVisible: false,
  backButtonDisplayMode: "minimal" as const,
  modal: {
    sheetCornerRadius: borderRadius["3xl"],
    sheetElevation: 24,
    sheetGrabberVisible: true,
  },
} as const;
