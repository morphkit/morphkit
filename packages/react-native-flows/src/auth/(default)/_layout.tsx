import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button, useTheme } from "@warp-ui/react-native";

export default function AuthLayout() {
  const router = useRouter();
  const { theme, colorScheme } = useTheme();

  const iconColor = theme.component.button.variant[colorScheme].tonal.text;
  const iconSize = theme.component.button.size.md.iconSize;

  const renderBackButton = ({ canGoBack }: { canGoBack?: boolean }) =>
    canGoBack ? (
      <Button size="icon" variant="tonal" onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={iconSize} color={iconColor} />
      </Button>
    ) : null;

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerShadowVisible: false,
        headerTintColor: iconColor,
        headerTitle: "",
        headerBackVisible: false,
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="email" options={{ headerLeft: renderBackButton }} />
      <Stack.Screen
        name="password"
        options={{ headerLeft: renderBackButton }}
      />
      <Stack.Screen name="name" options={{ headerLeft: renderBackButton }} />
    </Stack>
  );
}
