import { useTheme } from "../../theme";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { Flex } from "../Flex";

export const GapsExample = () => {
  const { theme } = useTheme();
  const boxColor = theme.semantic.colors.surface.secondary;

  return (
    <Flex gap="lg">
      <Flex gap="sm">
        <Typography variant="subhead">none (0px)</Typography>
        <Flex direction="horizontal" gap="none">
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
      </Flex>
      <Flex gap="sm">
        <Typography variant="subhead">xs (4px)</Typography>
        <Flex direction="horizontal" gap="xs">
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
      </Flex>
      <Flex gap="sm">
        <Typography variant="subhead">sm (8px) - default</Typography>
        <Flex direction="horizontal" gap="sm">
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
      </Flex>
      <Flex gap="sm">
        <Typography variant="subhead">md (16px)</Typography>
        <Flex direction="horizontal" gap="md">
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
      </Flex>
      <Flex gap="sm">
        <Typography variant="subhead">lg (24px)</Typography>
        <Flex direction="horizontal" gap="lg">
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
      </Flex>
      <Flex gap="sm">
        <Typography variant="subhead">xl (32px)</Typography>
        <Flex direction="horizontal" gap="xl">
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
      </Flex>
    </Flex>
  );
};
