import { Flex } from "../../flex";
import { Tag } from "../Tag";

export const SizesExample = () => {
  return (
    <Flex gap="md">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </Flex>
  );
};
