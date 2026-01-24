import { Flex } from "../../flex";
import { Skeleton } from "../Skeleton";

export const CustomDimensionsExample = () => {
  return (
    <Flex gap="md">
      <Skeleton width={200} height={100} />
      <Skeleton variant="circle" width={60} height={60} />
      <Skeleton variant="text" width="75%" />
    </Flex>
  );
};
