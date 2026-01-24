import { Flex } from "../../flex";
import { Button } from "../Button";

export const InteractiveExample = () => {
  return (
    <Flex gap="md">
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </Flex>
  );
};
