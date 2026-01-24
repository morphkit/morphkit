import { Flex } from "../../flex";
import { Tag } from "../Tag";

export const VariantsExample = () => {
  return (
    <Flex gap="md">
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
    </Flex>
  );
};
