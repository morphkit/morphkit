import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Label } from "../Label";

export const SizesExample = () => {
  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Typography variant="caption-1">
          Default Size (callout variant)
        </Typography>
        <Label>Email address</Label>
      </Stack>
      <Stack gap="xs">
        <Typography variant="caption-1">With Required Indicator</Typography>
        <Label required>Password</Label>
      </Stack>
    </Stack>
  );
};
