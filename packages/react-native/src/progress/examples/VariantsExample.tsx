import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Progress } from "../Progress";

export const VariantsExample = () => {
  return (
    <Stack gap="md">
      <Stack gap="sm">
        <Typography variant="caption-1">Bar (default)</Typography>
        <Progress variant="bar" value={75} />
      </Stack>
      <Stack gap="sm">
        <Typography variant="caption-1">Circle</Typography>
        <Progress variant="circle" value={75} />
      </Stack>
    </Stack>
  );
};
