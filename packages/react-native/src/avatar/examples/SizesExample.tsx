import { Stack } from "../../stack";
import { Avatar } from "../Avatar";

export const SizesExample = () => {
  return (
    <Stack direction="horizontal" gap="md" align="center">
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </Stack>
  );
};
