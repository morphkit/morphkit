import { Stack } from "../../stack";
import { Skeleton } from "../Skeleton";

export const CustomDimensionsExample = () => {
  return (
    <Stack gap="md">
      <Skeleton width={200} height={100} />
      <Skeleton variant="circle" width={60} height={60} />
      <Skeleton variant="text" width="75%" />
    </Stack>
  );
};
