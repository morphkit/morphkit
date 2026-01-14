import { useTheme } from "../../theme";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Box } from "../Box";

export const FlexboxLayoutExample = () => {
  const { theme } = useTheme();

  const itemStyle = {
    backgroundColor: theme.semantic.colors.status.info.surface,
    padding: theme.primitive.spacing[3],
    borderRadius: theme.primitive.borderRadius.sm,
  };

  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Typography variant="caption-1">flexDirection="row"</Typography>
        <Box
          flexDirection="row"
          gap="sm"
          padding={12}
          backgroundColor={theme.semantic.colors.surface.secondary}
          borderRadius={8}
        >
          <Box style={itemStyle}>
            <Typography variant="footnote">First</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">Second</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">Third</Typography>
          </Box>
        </Box>
      </Stack>

      <Stack gap="xs">
        <Typography variant="caption-1">
          justifyContent="space-between"
        </Typography>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          padding={12}
          backgroundColor={theme.semantic.colors.surface.secondary}
          borderRadius={8}
        >
          <Box style={itemStyle}>
            <Typography variant="footnote">Start</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">Middle</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">End</Typography>
          </Box>
        </Box>
      </Stack>

      <Stack gap="xs">
        <Typography variant="caption-1">alignItems="center"</Typography>
        <Box
          flexDirection="row"
          alignItems="center"
          gap="sm"
          padding={12}
          backgroundColor={theme.semantic.colors.surface.secondary}
          borderRadius={8}
        >
          <Box style={{ ...itemStyle, padding: theme.primitive.spacing[2] }}>
            <Typography variant="footnote">Small</Typography>
          </Box>
          <Box style={{ ...itemStyle, padding: theme.primitive.spacing[5] }}>
            <Typography variant="footnote">Large</Typography>
          </Box>
          <Box style={{ ...itemStyle, padding: theme.primitive.spacing[3] }}>
            <Typography variant="footnote">Medium</Typography>
          </Box>
        </Box>
      </Stack>

      <Stack gap="xs">
        <Typography variant="caption-1">
          Centered content (justify + align center)
        </Typography>
        <Box
          justifyContent="center"
          alignItems="center"
          padding={24}
          backgroundColor={theme.semantic.colors.surface.secondary}
          borderRadius={8}
        >
          <Box style={itemStyle}>
            <Typography variant="footnote">Centered</Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};
