import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Progress } from "../Progress";

export const InteractiveExample = () => {
  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <Typography variant="caption-1">Determinate with Value</Typography>
        <Progress value={45} showValue />
      </Stack>
      <Stack gap="sm">
        <Typography variant="caption-1">Indeterminate (Loading)</Typography>
        <Progress />
      </Stack>
      <Stack gap="sm">
        <Typography variant="caption-1">Circle with Value</Typography>
        <Progress variant="circle" value={85} showValue />
      </Stack>
    </Stack>
  );
};
