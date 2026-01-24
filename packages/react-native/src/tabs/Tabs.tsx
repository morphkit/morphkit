import { Tabs as ExpoRouterTabs } from "expo-router";
import { ComponentProps } from "react";
import { useTheme } from "../theme";
import type { Theme, ColorScheme } from "../theme";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

type ExpoRouterTabsProps = ComponentProps<typeof ExpoRouterTabs>;

export interface TabsThemeContext {
  theme: Theme;
  colorScheme: ColorScheme;
}

export interface TabBarIconProps {
  color: string;
  focused: boolean;
  size: number;
  themeContext: TabsThemeContext;
}

export interface TabsScreenOptionsCallbackProps {
  route: { key: string; name: string; params?: object };
  navigation: unknown;
  theme: unknown;
  themeContext: TabsThemeContext;
}

export type TabsScreenOptionsWithTheme =
  | BottomTabNavigationOptions
  | ((props: TabsScreenOptionsCallbackProps) => BottomTabNavigationOptions);

export interface TabsProps extends Omit<ExpoRouterTabsProps, "screenOptions"> {
  screenOptions?: TabsScreenOptionsWithTheme;
}

const deepMergeTabBarStyle = (
  base: Record<string, unknown>,
  override: Record<string, unknown> | undefined,
): Record<string, unknown> => {
  if (!override) return base;
  return { ...base, ...override };
};

const deepMergeHeaderStyle = (
  base: Record<string, unknown>,
  override: Record<string, unknown> | undefined,
): Record<string, unknown> => {
  if (!override) return base;
  return { ...base, ...override };
};

const mergeScreenOptions = (
  themedOptions: BottomTabNavigationOptions,
  userOptions: BottomTabNavigationOptions | undefined,
): BottomTabNavigationOptions => {
  if (!userOptions) return themedOptions;

  const mergedTabBarStyle = deepMergeTabBarStyle(
    (themedOptions.tabBarStyle as Record<string, unknown>) ?? {},
    userOptions.tabBarStyle as Record<string, unknown> | undefined,
  );

  const mergedHeaderStyle = deepMergeHeaderStyle(
    (themedOptions.headerStyle as Record<string, unknown>) ?? {},
    userOptions.headerStyle as Record<string, unknown> | undefined,
  );

  return {
    ...themedOptions,
    ...userOptions,
    tabBarStyle: mergedTabBarStyle,
    headerStyle: mergedHeaderStyle,
  };
};

interface TabsComponent {
  (props: TabsProps): React.JSX.Element;
  Screen: typeof ExpoRouterTabs.Screen;
}

const TabsBase = ({
  screenOptions,
  children,
  ...props
}: TabsProps): React.JSX.Element => {
  const { theme, colorScheme } = useTheme();

  const tabsTokens = theme.navigation.tabs;
  const tabBarTokens = tabsTokens.tabBar[colorScheme];
  const headerTokens = tabsTokens.header[colorScheme];
  const titleTokens = tabsTokens.headerTitle;
  const labelTokens = tabsTokens.tabBarLabel;
  const badgeTokens = tabsTokens.badge[colorScheme];

  const themeContext: TabsThemeContext = { theme, colorScheme };

  const wrapTabBarIcon = (
    tabBarIcon:
      | ((props: {
          color: string;
          focused: boolean;
          size: number;
        }) => React.ReactNode)
      | undefined,
  ) => {
    if (!tabBarIcon) return undefined;
    return (iconProps: { color: string; focused: boolean; size: number }) => {
      return tabBarIcon({
        ...iconProps,
        themeContext,
      } as TabBarIconProps);
    };
  };

  const themedScreenOptions: BottomTabNavigationOptions = {
    headerShadowVisible: tabsTokens.shadowVisible,
    headerTintColor: headerTokens.tint,
    headerStyle: {
      backgroundColor: headerTokens.background,
    },
    headerTitleStyle: {
      color: headerTokens.title,
      fontSize: titleTokens.fontSize,
      fontWeight: titleTokens.fontWeight,
    },
    tabBarActiveTintColor: tabBarTokens.activeTint,
    tabBarInactiveTintColor: tabBarTokens.inactiveTint,
    tabBarStyle: {
      backgroundColor: tabBarTokens.background,
    },
    tabBarLabelStyle: {
      fontSize: labelTokens.fontSize,
      fontWeight: labelTokens.fontWeight,
    },
    tabBarBadgeStyle: {
      backgroundColor: badgeTokens.background,
      color: badgeTokens.text,
    },
  };

  const resolveScreenOptions = (): ExpoRouterTabsProps["screenOptions"] => {
    if (!screenOptions) {
      return themedScreenOptions;
    }

    if (typeof screenOptions === "function") {
      return (navigationProps) => {
        const userOptions = screenOptions({
          route:
            navigationProps.route as TabsScreenOptionsCallbackProps["route"],
          navigation: navigationProps.navigation,
          theme: navigationProps.theme,
          themeContext,
        });

        const wrappedUserOptions = {
          ...userOptions,
          tabBarIcon: wrapTabBarIcon(
            userOptions.tabBarIcon as
              | ((props: {
                  color: string;
                  focused: boolean;
                  size: number;
                }) => React.ReactNode)
              | undefined,
          ),
        };

        return mergeScreenOptions(themedScreenOptions, wrappedUserOptions);
      };
    }

    const wrappedScreenOptions = {
      ...screenOptions,
      tabBarIcon: wrapTabBarIcon(
        screenOptions.tabBarIcon as
          | ((props: {
              color: string;
              focused: boolean;
              size: number;
            }) => React.ReactNode)
          | undefined,
      ),
    };

    return mergeScreenOptions(themedScreenOptions, wrappedScreenOptions);
  };

  return (
    <ExpoRouterTabs screenOptions={resolveScreenOptions()} {...props}>
      {children}
    </ExpoRouterTabs>
  );
};

export const Tabs: TabsComponent = Object.assign(TabsBase, {
  Screen: ExpoRouterTabs.Screen,
});
