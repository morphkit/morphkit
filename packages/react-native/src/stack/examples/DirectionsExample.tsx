import { useTheme } from "../../theme";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { Stack } from "../Stack";

export const DirectionsExample = () => {
  const { theme } = useTheme();
  const boxColor = theme.semantic.colors.surface.secondary;

  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <Typography variant="subhead">Vertical (default)</Typography>
        <Stack direction="vertical" gap="sm">
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 1</Typography>
          </Box>
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 2</Typography>
          </Box>
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 3</Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack gap="sm">
        <Typography variant="subhead">Horizontal</Typography>
        <Stack direction="horizontal" gap="sm">
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 1</Typography>
          </Box>
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 2</Typography>
          </Box>
          <Box padding={12} borderRadius={6} backgroundColor={boxColor}>
            <Typography variant="body">Item 3</Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
