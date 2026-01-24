import { Flex } from "../../flex";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { FAB } from "../FAB";

export const VariantsExample = () => {
  return (
    <Flex gap="lg">
      <Box style={{ height: 80, position: "relative" }}>
        <Typography variant="caption-1">Primary (default)</Typography>
        <FAB
          variant="primary"
          icon={<Typography variant="body">+</Typography>}
          onPress={() => {}}
        />
      </Box>
      <Box style={{ height: 80, position: "relative" }}>
        <Typography variant="caption-1">Secondary</Typography>
        <FAB
          variant="secondary"
          icon={<Typography variant="body">+</Typography>}
          onPress={() => {}}
        />
      </Box>
    </Flex>
  );
};
