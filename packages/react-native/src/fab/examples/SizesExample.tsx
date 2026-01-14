import { Stack } from "../../stack";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { FAB } from "../FAB";

export const SizesExample = () => {
  return (
    <Stack gap="lg">
      <Box style={{ height: 60, position: "relative" }}>
        <Typography variant="caption-1">Small (40px)</Typography>
        <FAB
          size="sm"
          icon={<Typography variant="caption-1">+</Typography>}
          onPress={() => {}}
        />
      </Box>
      <Box style={{ height: 80, position: "relative" }}>
        <Typography variant="caption-1">Medium (56px, default)</Typography>
        <FAB
          size="md"
          icon={<Typography variant="body">+</Typography>}
          onPress={() => {}}
        />
      </Box>
      <Box style={{ height: 100, position: "relative" }}>
        <Typography variant="caption-1">Large (64px)</Typography>
        <FAB
          size="lg"
          icon={<Typography variant="heading">+</Typography>}
          onPress={() => {}}
        />
      </Box>
    </Stack>
  );
};
