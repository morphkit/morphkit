import { Stack } from "../Stack";

export const CustomHeaderExample = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Custom Title",
        headerLargeTitle: true,
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen
        name="details"
        options={{ headerTitle: "Details Screen" }}
      />
    </Stack>
  );
};
