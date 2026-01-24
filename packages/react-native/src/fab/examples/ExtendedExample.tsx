import { Flex } from "../../flex";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { FAB } from "../FAB";

export const ExtendedExample = () => {
  return (
    <Flex gap="lg">
      <Box style={{ height: 80, position: "relative" }}>
        <Typography variant="caption-1">Extended with label</Typography>
        <FAB
          icon={<Typography variant="body">+</Typography>}
          label="Create"
          onPress={() => {}}
        />
      </Box>
      <Box style={{ height: 80, position: "relative" }}>
        <Typography variant="caption-1">Extended secondary</Typography>
        <FAB
          variant="secondary"
          icon={<Typography variant="body">+</Typography>}
          label="Compose"
          onPress={() => {}}
        />
      </Box>
    </Flex>
  );
};
