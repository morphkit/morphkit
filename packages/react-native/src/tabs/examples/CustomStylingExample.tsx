import { Tabs } from "../Tabs";

export const CustomStylingExample = () => {
  return (
    <Tabs
      screenOptions={{
        headerTitle: "My App",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarBadge: 3,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
        }}
      />
    </Tabs>
  );
};
