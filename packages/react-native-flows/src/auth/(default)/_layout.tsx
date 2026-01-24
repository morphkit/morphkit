import { Stack, Typography } from "@morphkit/react-native";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="email"
        options={{
          headerTitle: () => (
            <Typography variant="title-2">
              {"Let's start with email"}
            </Typography>
          ),
        }}
      />
      <Stack.Screen
        name="password"
        options={{
          headerTitle: () => (
            <Typography variant="title-2">Create a password</Typography>
          ),
        }}
      />
      <Stack.Screen
        name="name"
        options={{
          headerTitle: () => (
            <Typography variant="title-2">Enter your name</Typography>
          ),
        }}
      />
    </Stack>
  );
}
