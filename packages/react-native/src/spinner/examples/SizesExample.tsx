import { Flex } from "../../flex";
import { Spinner } from "../Spinner";

export const SizesExample = () => {
  return (
    <Flex gap="md" direction="horizontal" align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Flex>
  );
};
