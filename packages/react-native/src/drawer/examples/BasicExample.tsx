import { Drawer } from "../Drawer";

export const BasicExample = () => {
  return (
    <Drawer>
      <Drawer.Screen name="home" />
      <Drawer.Screen name="settings" />
    </Drawer>
  );
};
