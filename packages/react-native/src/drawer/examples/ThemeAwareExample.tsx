import { Drawer } from "../Drawer";

export const ThemeAwareExample = () => {
  return (
    <Drawer
      screenOptions={({ themeContext }) => ({
        headerTitle:
          themeContext.colorScheme === "dark" ? "Dark Mode" : "Light Mode",
        drawerStyle: {
          backgroundColor:
            themeContext.theme.navigation.drawer.drawer[
              themeContext.colorScheme
            ].background,
        },
      })}
    >
      <Drawer.Screen name="home" />
      <Drawer.Screen name="settings" />
    </Drawer>
  );
};
