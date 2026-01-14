import { Stack } from "../../stack";
import { Spinner } from "../Spinner";

export const SizesExample = () => {
  return (
    <Stack gap="md" direction="horizontal" align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Stack>
  );
};
