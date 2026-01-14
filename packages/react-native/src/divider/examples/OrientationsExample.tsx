import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Divider } from "../Divider";

export const OrientationsExample = () => {
  return (
    <Stack gap="md">
      <Stack gap="sm">
        <Typography variant="caption-1">Horizontal (default)</Typography>
        <Divider />
      </Stack>
      <Stack
        gap="sm"
        direction="horizontal"
        align="center"
        style={{ height: 40 }}
      >
        <Typography variant="caption-1">Vertical</Typography>
        <Divider orientation="vertical" />
      </Stack>
    </Stack>
  );
};
