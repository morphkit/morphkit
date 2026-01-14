import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Divider } from "../Divider";

export const ThicknessExample = () => {
  return (
    <Stack gap="md">
      <Stack gap="sm">
        <Typography variant="caption-1">Hairline (default)</Typography>
        <Divider />
      </Stack>
      <Stack gap="sm">
        <Typography variant="caption-1">2px thickness</Typography>
        <Divider thickness={2} />
      </Stack>
      <Stack gap="sm">
        <Typography variant="caption-1">4px thickness</Typography>
        <Divider thickness={4} />
      </Stack>
    </Stack>
  );
};
