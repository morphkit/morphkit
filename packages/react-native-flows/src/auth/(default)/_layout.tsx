import { Stack } from "expo-router";
import { useTheme, Typography } from "@morph-ui/react-native";

export default function AuthLayout() {
  const { theme, colorScheme } = useTheme();

  const iconColor = theme.component.button.variant[colorScheme].tonal.text;

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: iconColor,
        headerTitle: "",
        headerBackButtonDisplayMode: "minimal",
        headerStyle: {
          backgroundColor: theme.semantic.colors.surface.primary,
        },
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
