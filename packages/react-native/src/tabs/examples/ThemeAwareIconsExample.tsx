import { View } from "react-native";
import { Tabs, TabsScreenOptionsCallbackProps, TabBarIconProps } from "../Tabs";

export const ThemeAwareIconsExample = () => {
  return (
    <Tabs
      screenOptions={({ themeContext }: TabsScreenOptionsCallbackProps) => ({
        headerTitle:
          themeContext.colorScheme === "dark" ? "Dark Mode" : "Light Mode",
        tabBarIcon: (iconProps) => {
          const {
            color,
            focused,
            themeContext: ctx,
          } = iconProps as TabBarIconProps;
          return (
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: focused
                  ? ctx.theme.semantic.colors.action.primary
                  : color,
              }}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
    </Tabs>
  );
};
