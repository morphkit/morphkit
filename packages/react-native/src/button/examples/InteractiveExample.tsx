import { Stack } from "../../stack";
import { Button } from "../Button";

export const InteractiveExample = () => {
  return (
    <Stack gap="md">
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </Stack>
  );
};
