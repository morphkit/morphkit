import { useTheme } from "../../theme";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { Stack } from "../Stack";

export const GapsExample = () => {
  const { theme } = useTheme();
  const boxColor = theme.semantic.colors.surface.secondary;

  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <Typography variant="subhead">none (0px)</Typography>
        <Stack direction="horizontal" gap="none">
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">A</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">B</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">C</Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack gap="sm">
        <Typography variant="subhead">xs (4px)</Typography>
        <Stack direction="horizontal" gap="xs">
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">A</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">B</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">C</Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack gap="sm">
        <Typography variant="subhead">sm (8px) - default</Typography>
        <Stack direction="horizontal" gap="sm">
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">A</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">B</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">C</Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack gap="sm">
        <Typography variant="subhead">md (16px)</Typography>
        <Stack direction="horizontal" gap="md">
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">A</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">B</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">C</Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack gap="sm">
        <Typography variant="subhead">lg (24px)</Typography>
        <Stack direction="horizontal" gap="lg">
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">A</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">B</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">C</Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack gap="sm">
        <Typography variant="subhead">xl (32px)</Typography>
        <Stack direction="horizontal" gap="xl">
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">A</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">B</Typography>
          </Box>
          <Box padding={8} borderRadius={4} backgroundColor={boxColor}>
            <Typography variant="caption-1">C</Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
