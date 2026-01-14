import { Stack } from "../../stack";
import { Tag } from "../Tag";

export const VariantsExample = () => {
  return (
    <Stack gap="md">
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
    </Stack>
  );
};
