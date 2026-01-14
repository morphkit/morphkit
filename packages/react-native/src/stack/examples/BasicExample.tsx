import { useTheme } from "../../theme";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { Stack } from "../Stack";

export const BasicExample = () => {
  const { theme } = useTheme();

  return (
    <Stack gap="md">
      <Box
        padding={16}
        borderRadius={8}
        backgroundColor={theme.semantic.colors.surface.secondary}
      >
        <Typography variant="body">First Item</Typography>
      </Box>
      <Box
        padding={16}
        borderRadius={8}
        backgroundColor={theme.semantic.colors.surface.secondary}
      >
        <Typography variant="body">Second Item</Typography>
      </Box>
      <Box
        padding={16}
        borderRadius={8}
        backgroundColor={theme.semantic.colors.surface.secondary}
      >
        <Typography variant="body">Third Item</Typography>
      </Box>
    </Stack>
  );
};
