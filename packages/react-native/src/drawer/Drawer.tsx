import { Drawer as ExpoRouterDrawer } from "expo-router/drawer";
import { ComponentProps } from "react";
import { useTheme } from "../theme";
import type { Theme, ColorScheme } from "../theme";
import type { DrawerNavigationOptions } from "@react-navigation/drawer";

type ExpoRouterDrawerProps = ComponentProps<typeof ExpoRouterDrawer>;

export interface DrawerThemeContext {
  theme: Theme;
  colorScheme: ColorScheme;
}

export interface DrawerScreenOptionsCallbackProps {
  route: { key: string; name: string; params?: object };
  navigation: unknown;
  theme: unknown;
  themeContext: DrawerThemeContext;
}

export type DrawerScreenOptionsWithTheme =
  | DrawerNavigationOptions
  | ((props: DrawerScreenOptionsCallbackProps) => DrawerNavigationOptions);

export interface DrawerProps extends Omit<
  ExpoRouterDrawerProps,
  "screenOptions"
> {
  screenOptions?: DrawerScreenOptionsWithTheme;
}

const deepMergeHeaderStyle = (
  base: Record<string, unknown>,
  override: Record<string, unknown> | undefined,
): Record<string, unknown> => {
  if (!override) return base;
  return { ...base, ...override };
};

const deepMergeDrawerStyle = (
  base: Record<string, unknown>,
  override: Record<string, unknown> | undefined,
): Record<string, unknown> => {
  if (!override) return base;
  return { ...base, ...override };
};

const mergeScreenOptions = (
  themedOptions: DrawerNavigationOptions,
  userOptions: DrawerNavigationOptions | undefined,
): DrawerNavigationOptions => {
  if (!userOptions) return themedOptions;

  const mergedHeaderStyle = deepMergeHeaderStyle(
    (themedOptions.headerStyle as Record<string, unknown>) ?? {},
    userOptions.headerStyle as Record<string, unknown> | undefined,
  );

  const mergedDrawerStyle = deepMergeDrawerStyle(
    (themedOptions.drawerStyle as Record<string, unknown>) ?? {},
    userOptions.drawerStyle as Record<string, unknown> | undefined,
  );

  return {
    ...themedOptions,
    ...userOptions,
    headerStyle: mergedHeaderStyle,
    drawerStyle: mergedDrawerStyle,
  };
};

interface DrawerComponent {
  (props: DrawerProps): React.JSX.Element;
  Screen: typeof ExpoRouterDrawer.Screen;
}

const DrawerBase = ({
  screenOptions,
  children,
  ...props
}: DrawerProps): React.JSX.Element => {
  const { theme, colorScheme } = useTheme();

  const drawerTokens = theme.navigation.drawer;
  const headerTokens = drawerTokens.header[colorScheme];
  const titleTokens = drawerTokens.headerTitle;
  const panelTokens = drawerTokens.drawer[colorScheme];
  const itemTokens = drawerTokens.drawerItem[colorScheme];
  const labelTokens = drawerTokens.drawerLabel;

  const themeContext: DrawerThemeContext = { theme, colorScheme };

  const themedScreenOptions: DrawerNavigationOptions = {
    headerShadowVisible: drawerTokens.shadowVisible,
    headerTintColor: headerTokens.tint,
    headerStyle: {
      backgroundColor: headerTokens.background,
    },
    headerTitleStyle: {
      color: headerTokens.title,
      fontSize: titleTokens.fontSize,
      fontWeight: titleTokens.fontWeight,
    },
    drawerActiveTintColor: itemTokens.activeTint,
    drawerInactiveTintColor: itemTokens.inactiveTint,
    drawerActiveBackgroundColor: itemTokens.activeBackground,
    drawerInactiveBackgroundColor: itemTokens.inactiveBackground,
    drawerStyle: {
      backgroundColor: panelTokens.background,
    },
    overlayColor: panelTokens.overlay,
    drawerLabelStyle: {
      fontSize: labelTokens.fontSize,
      fontWeight: labelTokens.fontWeight,
    },
  };

  const resolveScreenOptions = (): ExpoRouterDrawerProps["screenOptions"] => {
    if (!screenOptions) {
      return themedScreenOptions;
    }

    if (typeof screenOptions === "function") {
      return (navigationProps) => {
        const userOptions = screenOptions({
          route:
            navigationProps.route as DrawerScreenOptionsCallbackProps["route"],
          navigation: navigationProps.navigation,
          theme: navigationProps.theme,
          themeContext,
        });
        return mergeScreenOptions(themedScreenOptions, userOptions);
      };
    }

    return mergeScreenOptions(themedScreenOptions, screenOptions);
  };

  return (
    <ExpoRouterDrawer screenOptions={resolveScreenOptions()} {...props}>
      {children}
    </ExpoRouterDrawer>
  );
};

export const Drawer: DrawerComponent = Object.assign(DrawerBase, {
  Screen: ExpoRouterDrawer.Screen,
});
