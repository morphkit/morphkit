import { Stack } from "../../stack";
import { Button } from "../Button";

export const SizesExample = () => {
  return (
    <Stack gap="md">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">+</Button>
      <Button size="none">None</Button>
    </Stack>
  );
};
