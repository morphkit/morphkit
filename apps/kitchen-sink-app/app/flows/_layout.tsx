import { Stack } from "expo-router";

export default function FlowsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="auth/(default)" />
    </Stack>
  );
}
