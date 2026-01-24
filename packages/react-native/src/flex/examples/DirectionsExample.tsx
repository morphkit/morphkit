import { useTheme } from "../../theme";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { Flex } from "../Flex";

export const DirectionsExample = () => {
  const { theme } = useTheme();
  const boxColor = theme.semantic.colors.surface.secondary;

  return (
    <Flex gap="lg">
      <Flex gap="sm">
        <Typography variant="subhead">Vertical (default)</Typography>
        <Flex direction="vertical" gap="sm">
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 1</Typography>
          </Box>
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 2</Typography>
          </Box>
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 3</Typography>
          </Box>
        </Flex>
      </Flex>
      <Flex gap="sm">
        <Typography variant="subhead">Horizontal</Typography>
        <Flex direction="horizontal" gap="sm">
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 1</Typography>
          </Box>
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 2</Typography>
          </Box>
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 3</Typography>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
