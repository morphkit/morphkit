import { Stack, ScreenOptionsCallbackProps } from "../Stack";

export const ThemeAwareExample = () => {
  return (
    <Stack
      screenOptions={({ themeContext }: ScreenOptionsCallbackProps) => ({
        headerTitle:
          themeContext.colorScheme === "dark" ? "Dark Mode" : "Light Mode",
      })}
    >
      <Stack.Screen name="home" />
    </Stack>
  );
};
