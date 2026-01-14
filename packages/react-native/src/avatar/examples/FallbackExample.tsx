import { Stack } from "../../stack";
import { Avatar } from "../Avatar";

export const FallbackExample = () => {
  return (
    <Stack direction="horizontal" gap="md" align="center">
      <Avatar size="md" fallback="JD" />
      <Avatar size="md" fallback="AS" />
      <Avatar size="md" fallback="MK" />
      <Avatar size="md" fallback="" />
    </Stack>
  );
};
