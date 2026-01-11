import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "react-native";
import { ComponentSidebar } from "../components/ComponentSidebar";
import { MDXProvider } from "../components/MDXProvider";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { ThemeProvider, createTheme } from "@warp-ui/react-native";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const customTheme = createTheme({
  fonts: {
    largeTitle: "Inter_700Bold",
    title1: "Inter_600SemiBold",
    title2: "Inter_600SemiBold",
    title3: "Inter_500Medium",
    heading: "Inter_600SemiBold",
    body: "Inter_400Regular",
    callout: "Inter_500Medium",
    subhead: "Inter_400Regular",
    footnote: "Inter_400Regular",
    caption1: "Inter_500Medium",
    caption2: "Inter_500Medium",
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? "light";

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider theme={customTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MDXProvider>
          <Drawer
            drawerContent={(props: DrawerContentComponentProps) => (
              <ComponentSidebar {...props} />
            )}
            screenOptions={{
              headerShown: true,
              headerTitle: "Warp UI Components",
              headerStyle: {
                backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
              },
              headerTitleStyle: {
                color: colorScheme === "dark" ? "#ffffff" : "#000000",
              },
              headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: "Home",
                title: "Warp UI Components",
              }}
            />
            <Drawer.Screen
              name="docs/[component]"
              options={{
                drawerItemStyle: { display: "none" },
                title: "Component Docs",
              }}
            />
            <Drawer.Screen
              name="flows"
              options={{
                drawerItemStyle: { display: "none" },
                headerShown: false,
                title: "Flows",
              }}
            />
          </Drawer>
        </MDXProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
