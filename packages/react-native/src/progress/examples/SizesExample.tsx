import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Progress } from "../Progress";

export const SizesExample = () => {
  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <Typography variant="caption-1">Bar Sizes</Typography>
        <Stack gap="md">
          <Stack gap="xs">
            <Typography variant="caption-2">Small (4px)</Typography>
            <Progress size="sm" value={60} />
          </Stack>
          <Stack gap="xs">
            <Typography variant="caption-2">Medium (8px)</Typography>
            <Progress size="md" value={60} />
          </Stack>
          <Stack gap="xs">
            <Typography variant="caption-2">Large (12px)</Typography>
            <Progress size="lg" value={60} />
          </Stack>
        </Stack>
      </Stack>
      <Stack gap="sm">
        <Typography variant="caption-1">Circle Sizes</Typography>
        <Stack direction="horizontal" gap="lg">
          <Stack gap="xs" style={{ alignItems: "center" }}>
            <Progress variant="circle" size="sm" value={60} />
            <Typography variant="caption-2">32px</Typography>
          </Stack>
          <Stack gap="xs" style={{ alignItems: "center" }}>
            <Progress variant="circle" size="md" value={60} />
            <Typography variant="caption-2">48px</Typography>
          </Stack>
          <Stack gap="xs" style={{ alignItems: "center" }}>
            <Progress variant="circle" size="lg" value={60} />
            <Typography variant="caption-2">64px</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
