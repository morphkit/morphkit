import { Flex } from "../../flex";
import { Button } from "../Button";

export const VariantsExample = () => {
  return (
    <Flex gap="md">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="plain">Plain</Button>
    </Flex>
  );
};
