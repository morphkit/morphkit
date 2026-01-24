import { useTheme } from "../../theme";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { Flex } from "../Flex";

export const AlignmentExample = () => {
  const { theme } = useTheme();
  const boxColor = theme.semantic.colors.surface.secondary;
  const containerColor = theme.semantic.colors.surface.tertiary;

  return (
    <Flex gap="lg">
      <Flex gap="sm">
        <Typography variant="subhead">align: start</Typography>
        <Box
          padding={8}
          borderRadius={8}
          backgroundColor={containerColor}
          style={{ height: 80 }}
        >
          <Flex direction="horizontal" gap="sm" align="start">
            <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">A</Typography>
            </Box>
            <Box padding={16} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">B</Typography>
            </Box>
            <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">C</Typography>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Flex gap="sm">
        <Typography variant="subhead">align: center</Typography>
        <Box
          padding={8}
          borderRadius={8}
          backgroundColor={containerColor}
          style={{ height: 80 }}
        >
          <Flex direction="horizontal" gap="sm" align="center">
            <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">A</Typography>
            </Box>
            <Box padding={16} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">B</Typography>
            </Box>
            <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">C</Typography>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Flex gap="sm">
        <Typography variant="subhead">align: end</Typography>
        <Box
          padding={8}
          borderRadius={8}
          backgroundColor={containerColor}
          style={{ height: 80 }}
        >
          <Flex direction="horizontal" gap="sm" align="end">
            <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">A</Typography>
            </Box>
            <Box padding={16} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">B</Typography>
            </Box>
            <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">C</Typography>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Flex gap="sm">
        <Typography variant="subhead">align: stretch (default)</Typography>
        <Box
          padding={8}
          borderRadius={8}
          backgroundColor={containerColor}
          style={{ height: 80 }}
        >
          <Flex
            direction="horizontal"
            gap="sm"
            align="stretch"
            style={{ height: 64 }}
          >
            <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">A</Typography>
            </Box>
            <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">B</Typography>
            </Box>
            <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
              <Typography variant="caption-1">C</Typography>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
