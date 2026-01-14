import { Stack } from "../../stack";
import { Tag } from "../Tag";

export const SizesExample = () => {
  return (
    <Stack gap="md">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </Stack>
  );
};
