import "react-native-gesture-handler";
import "../global.css";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ComponentSidebar } from "../components/ComponentSidebar";
import { MDXProvider } from "../components/MDXProvider";
import { ThemeProvider } from "../components/ThemeProvider";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <MDXProvider>
          <Drawer
            drawerContent={(props: DrawerContentComponentProps) => (
              <ComponentSidebar {...props} />
            )}
            screenOptions={{
              headerShown: true,
              headerTitle: "Warp UI Components",
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
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
