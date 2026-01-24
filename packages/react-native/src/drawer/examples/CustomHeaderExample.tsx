import { Drawer } from "../Drawer";

export const CustomHeaderExample = () => {
  return (
    <Drawer
      screenOptions={{
        headerTitle: "My App",
        headerShadowVisible: true,
      }}
    >
      <Drawer.Screen name="home" />
      <Drawer.Screen name="profile" />
    </Drawer>
  );
};
