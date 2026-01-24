import { light, dark } from "../theme/tokens/semantic/colors";
import { textStyles } from "../theme/tokens/semantic/typography";

export const drawer = {
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
  drawer: {
    light: {
      background: light.surface.primary,
      overlay: light.surface.overlay,
    },
    dark: {
      background: dark.surface.primary,
      overlay: dark.surface.overlay,
    },
  },
  drawerItem: {
    light: {
      activeTint: light.action.primary,
      inactiveTint: light.text.tertiary,
      activeBackground: light.surface.secondary,
      inactiveBackground: "transparent",
    },
    dark: {
      activeTint: dark.action.primary,
      inactiveTint: dark.text.tertiary,
      activeBackground: dark.surface.secondary,
      inactiveBackground: "transparent",
    },
  },
  drawerLabel: {
    fontSize: textStyles.body.fontSize,
    fontWeight: textStyles.body.fontWeight,
  },
  shadowVisible: false,
} as const;
