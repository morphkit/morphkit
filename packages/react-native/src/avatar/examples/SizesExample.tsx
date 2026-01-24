import { Flex } from "../../flex";
import { Avatar } from "../Avatar";

export const SizesExample = () => {
  return (
    <Flex direction="horizontal" gap="md" align="center">
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </Flex>
  );
};
