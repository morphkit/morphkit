import { Stack } from "../../stack";
import { Label } from "../Label";

export const StatesExample = () => {
  return (
    <Stack gap="md">
      <Label>Normal label</Label>
      <Label required>Required field</Label>
      <Label error>Error state</Label>
      <Label required error>
        Required with error
      </Label>
    </Stack>
  );
};
