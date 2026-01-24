import { Stack as ExpoRouterStack } from "expo-router";
import { ComponentProps } from "react";
import { useTheme } from "../theme";
import type { Theme, ColorScheme } from "../theme";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";

type ExpoRouterStackProps = ComponentProps<typeof ExpoRouterStack>;

export interface ThemeContext {
  theme: Theme;
  colorScheme: ColorScheme;
}

export interface ScreenOptionsCallbackProps {
  route: { key: string; name: string; params?: object };
  navigation: unknown;
  theme: unknown;
  themeContext: ThemeContext;
}

export type ScreenOptionsWithTheme =
  | NativeStackNavigationOptions
  | ((props: ScreenOptionsCallbackProps) => NativeStackNavigationOptions);

export interface StackProps extends Omit<
  ExpoRouterStackProps,
  "screenOptions"
> {
  screenOptions?: ScreenOptionsWithTheme;
}

const deepMergeHeaderStyle = (
  base: Record<string, unknown>,
  override: Record<string, unknown> | undefined,
): Record<string, unknown> => {
  if (!override) return base;
  return { ...base, ...override };
};

const mergeScreenOptions = (
  themedOptions: NativeStackNavigationOptions,
  userOptions: NativeStackNavigationOptions | undefined,
): NativeStackNavigationOptions => {
  if (!userOptions) return themedOptions;

  const mergedHeaderStyle = deepMergeHeaderStyle(
    (themedOptions.headerStyle as Record<string, unknown>) ?? {},
    userOptions.headerStyle as Record<string, unknown> | undefined,
  );

  return {
    ...themedOptions,
    ...userOptions,
    headerStyle: mergedHeaderStyle,
  };
};

export const Stack = ({ screenOptions, children, ...props }: StackProps) => {
  const { theme, colorScheme } = useTheme();

  const stackTokens = theme.navigation.stack;
  const headerTokens = stackTokens.header[colorScheme];
  const titleTokens = stackTokens.headerTitle;

  const themedScreenOptions: NativeStackNavigationOptions = {
    headerShadowVisible: stackTokens.shadowVisible,
    headerTintColor: headerTokens.tint,
    headerStyle: {
      backgroundColor: headerTokens.background,
    },
    headerTitleStyle: {
      color: headerTokens.title,
      fontSize: titleTokens.fontSize,
      fontWeight: titleTokens.fontWeight,
    },
    headerBackButtonDisplayMode: stackTokens.backButtonDisplayMode,
    contentStyle: {
      backgroundColor: stackTokens.contentBackgroundColor[colorScheme],
    },
  };

  const resolveScreenOptions = (): ExpoRouterStackProps["screenOptions"] => {
    if (!screenOptions) {
      return themedScreenOptions;
    }

    if (typeof screenOptions === "function") {
      return (navigationProps) => {
        const themeContext: ThemeContext = { theme, colorScheme };
        const userOptions = screenOptions({
          route: navigationProps.route as ScreenOptionsCallbackProps["route"],
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
    <ExpoRouterStack screenOptions={resolveScreenOptions()} {...props}>
      {children}
    </ExpoRouterStack>
  );
};

Stack.Screen = ExpoRouterStack.Screen;
