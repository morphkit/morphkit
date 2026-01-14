import { useTheme } from "../../theme";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Box } from "../Box";

export const SpacingExample = () => {
  const { theme } = useTheme();

  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Typography variant="caption-1">Uniform padding (16px)</Typography>
        <Box
          padding={16}
          backgroundColor={theme.semantic.colors.status.success.surface}
          borderRadius={8}
        >
          <Box
            backgroundColor={theme.semantic.colors.surface.primary}
            padding={8}
            borderRadius={4}
          >
            <Typography variant="footnote">Inner content</Typography>
          </Box>
        </Box>
      </Stack>

      <Stack gap="xs">
        <Typography variant="caption-1">Per-side padding</Typography>
        <Box
          padding={{ top: 8, right: 24, bottom: 8, left: 24 }}
          backgroundColor={theme.semantic.colors.status.info.surface}
          borderRadius={8}
        >
          <Box
            backgroundColor={theme.semantic.colors.surface.primary}
            padding={8}
            borderRadius={4}
          >
            <Typography variant="footnote">
              Horizontal padding larger than vertical
            </Typography>
          </Box>
        </Box>
      </Stack>

      <Stack gap="xs">
        <Typography variant="caption-1">Margin demonstration</Typography>
        <Box
          backgroundColor={theme.semantic.colors.surface.secondary}
          padding={8}
          borderRadius={8}
        >
          <Box
            margin={{ top: 0, right: 16, bottom: 0, left: 16 }}
            padding={12}
            backgroundColor={theme.semantic.colors.status.warning.surface}
            borderRadius={4}
          >
            <Typography variant="footnote">
              Content with horizontal margin
            </Typography>
          </Box>
        </Box>
      </Stack>

      <Stack gap="xs">
        <Typography variant="caption-1">Border styling</Typography>
        <Box
          padding={16}
          borderWidth={2}
          borderColor={theme.semantic.colors.border.focus}
          borderRadius={12}
        >
          <Typography variant="footnote">Box with border</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};
