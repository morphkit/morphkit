import { Flex } from "../../flex";
import { Button } from "../Button";

export const SizesExample = () => {
  return (
    <Flex gap="md">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">+</Button>
      <Button size="none">None</Button>
    </Flex>
  );
};
