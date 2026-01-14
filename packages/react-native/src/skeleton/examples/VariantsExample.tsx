import { Stack } from "../../stack";
import { Skeleton } from "../Skeleton";

export const VariantsExample = () => {
  return (
    <Stack gap="md">
      <Skeleton variant="rect" />
      <Skeleton variant="circle" />
      <Skeleton variant="text" />
    </Stack>
  );
};
