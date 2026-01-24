import { Stack } from "@morphkit/react-native";

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
