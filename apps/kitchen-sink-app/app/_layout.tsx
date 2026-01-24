import { Drawer } from "expo-router/drawer";
import { ComponentSidebar } from "../components/ComponentSidebar";
import { MDXProvider } from "../components/MDXProvider";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { ThemeProvider, createTheme, useTheme } from "@morphkit/react-native";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
} from "@expo-google-fonts/jetbrains-mono";
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

function ThemedDrawer() {
  const { theme } = useTheme();
  const colors = theme.semantic.colors;

  return (
    <Drawer
      drawerContent={(props: DrawerContentComponentProps) => (
        <ComponentSidebar {...props} />
      )}
      screenOptions={{
        headerShown: true,
        headerTitle: "Warp UI Components",
        headerStyle: {
          backgroundColor: colors.surface.primary,
        },
        headerTitleStyle: {
          color: colors.text.primary,
        },
        headerTintColor: colors.text.primary,
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
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
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
      <MDXProvider>
        <ThemedDrawer />
      </MDXProvider>
    </ThemeProvider>
  );
}
