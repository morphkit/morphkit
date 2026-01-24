import { Stack } from "../Stack";

export const BasicExample = () => {
  return (
    <Stack>
      <Stack.Screen name="home" />
      <Stack.Screen name="details" />
    </Stack>
  );
};
