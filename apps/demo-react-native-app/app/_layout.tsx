import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "react-native";
import { ComponentSidebar } from "../components/ComponentSidebar";
import { MDXProvider } from "../components/MDXProvider";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { ThemeProvider } from "@warp-ui/react-native";
import { themes } from "../theme";

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ThemeProvider theme={themes}>
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
          </Drawer>
        </MDXProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
