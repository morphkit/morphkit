import { Stack } from "../../stack";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { FAB } from "../FAB";

export const InteractiveExample = () => {
  return (
    <Stack gap="lg">
      <Box style={{ height: 80, position: "relative" }}>
        <Typography variant="caption-1">Disabled state</Typography>
        <FAB
          disabled
          icon={<Typography variant="body">+</Typography>}
          onPress={() => {}}
        />
      </Box>
      <Box style={{ height: 80, position: "relative" }}>
        <Typography variant="caption-1">Disabled extended</Typography>
        <FAB
          disabled
          icon={<Typography variant="body">+</Typography>}
          label="Disabled"
          onPress={() => {}}
        />
      </Box>
    </Stack>
  );
};
