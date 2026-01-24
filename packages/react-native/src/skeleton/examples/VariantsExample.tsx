import { Flex } from "../../flex";
import { Skeleton } from "../Skeleton";

export const VariantsExample = () => {
  return (
    <Flex gap="md">
      <Skeleton variant="rect" />
      <Skeleton variant="circle" />
      <Skeleton variant="text" />
    </Flex>
  );
};
