import { Flex } from "../../flex";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { FAB } from "../FAB";

export const PlacementsExample = () => {
  return (
    <Flex gap="lg">
      <Box style={{ height: 100, position: "relative" }}>
        <Typography variant="caption-1">Bottom Right (default)</Typography>
        <FAB
          placement="bottom-right"
          size="sm"
          icon={<Typography variant="caption-1">BR</Typography>}
          onPress={() => {}}
        />
      </Box>
      <Box style={{ height: 100, position: "relative" }}>
        <Typography variant="caption-1">Bottom Left</Typography>
        <FAB
          placement="bottom-left"
          size="sm"
          icon={<Typography variant="caption-1">BL</Typography>}
          onPress={() => {}}
        />
      </Box>
      <Box style={{ height: 100, position: "relative" }}>
        <Typography variant="caption-1">Bottom Center</Typography>
        <FAB
          placement="bottom-center"
          size="sm"
          icon={<Typography variant="caption-1">BC</Typography>}
          onPress={() => {}}
        />
      </Box>
      <Box style={{ height: 100, position: "relative" }}>
        <Typography variant="caption-1">Top Right</Typography>
        <FAB
          placement="top-right"
          size="sm"
          icon={<Typography variant="caption-1">TR</Typography>}
          onPress={() => {}}
        />
      </Box>
      <Box style={{ height: 100, position: "relative" }}>
        <Typography variant="caption-1">Top Left</Typography>
        <FAB
          placement="top-left"
          size="sm"
          icon={<Typography variant="caption-1">TL</Typography>}
          onPress={() => {}}
        />
      </Box>
      <Box style={{ height: 100, position: "relative" }}>
        <Typography variant="caption-1">Top Center</Typography>
        <FAB
          placement="top-center"
          size="sm"
          icon={<Typography variant="caption-1">TC</Typography>}
          onPress={() => {}}
        />
      </Box>
    </Flex>
  );
};
