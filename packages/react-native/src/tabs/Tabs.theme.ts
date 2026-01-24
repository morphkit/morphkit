import { light, dark } from "../theme/tokens/semantic/colors";
import { textStyles } from "../theme/tokens/semantic/typography";

export const tabs = {
  tabBar: {
    light: {
      activeTint: light.action.primary,
      inactiveTint: light.text.tertiary,
      background: light.surface.primary,
    },
    dark: {
      activeTint: dark.action.primary,
      inactiveTint: dark.text.tertiary,
      background: dark.surface.primary,
    },
  },
  tabBarLabel: {
    fontSize: textStyles.caption1.fontSize,
    fontWeight: textStyles.caption1.fontWeight,
  },
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
  badge: {
    light: {
      background: light.status.error.main,
      text: light.text.inverse,
    },
    dark: {
      background: dark.status.error.main,
      text: dark.text.inverse,
    },
  },
  shadowVisible: false,
} as const;
