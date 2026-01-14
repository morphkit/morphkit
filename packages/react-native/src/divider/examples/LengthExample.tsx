import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Divider } from "../Divider";

export const LengthExample = () => {
  return (
    <Stack gap="md">
      <Stack gap="sm">
        <Typography variant="caption-1">100% length (default)</Typography>
        <Divider />
      </Stack>
      <Stack gap="sm">
        <Typography variant="caption-1">50% length</Typography>
        <Divider length="50%" />
      </Stack>
      <Stack gap="sm">
        <Typography variant="caption-1">120px fixed length</Typography>
        <Divider length={120} />
      </Stack>
    </Stack>
  );
};
