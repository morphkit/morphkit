import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "../Drawer";
import { Typography } from "../../typography";
import { Box } from "../../box";

export const DrawerContentExample = () => {
  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <Box style={{ padding: 16 }}>
            <Typography variant="heading">My App</Typography>
          </Box>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name="home" />
      <Drawer.Screen name="profile" />
      <Drawer.Screen name="settings" />
    </Drawer>
  );
};
