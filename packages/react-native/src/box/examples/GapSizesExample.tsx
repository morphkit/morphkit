import { useTheme } from "../../theme";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Box } from "../Box";

export const GapSizesExample = () => {
  const { theme } = useTheme();

  const itemStyle = {
    backgroundColor: theme.semantic.colors.surface.tertiary,
    padding: theme.primitive.spacing[2],
    borderRadius: theme.primitive.borderRadius.sm,
  };

  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Typography variant="caption-1">gap="none" (0px)</Typography>
        <Box
          gap="none"
          flexDirection="row"
          padding={8}
          backgroundColor={theme.semantic.colors.surface.secondary}
          borderRadius={8}
        >
          <Box style={itemStyle}>
            <Typography variant="footnote">A</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">B</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">C</Typography>
          </Box>
        </Box>
      </Stack>

      <Stack gap="xs">
        <Typography variant="caption-1">gap="xs" (4px)</Typography>
        <Box
          gap="xs"
          flexDirection="row"
          padding={8}
          backgroundColor={theme.semantic.colors.surface.secondary}
          borderRadius={8}
        >
          <Box style={itemStyle}>
            <Typography variant="footnote">A</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">B</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">C</Typography>
          </Box>
        </Box>
      </Stack>

      <Stack gap="xs">
        <Typography variant="caption-1">gap="sm" (8px)</Typography>
        <Box
          gap="sm"
          flexDirection="row"
          padding={8}
          backgroundColor={theme.semantic.colors.surface.secondary}
          borderRadius={8}
        >
          <Box style={itemStyle}>
            <Typography variant="footnote">A</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">B</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">C</Typography>
          </Box>
        </Box>
      </Stack>

      <Stack gap="xs">
        <Typography variant="caption-1">gap="md" (16px)</Typography>
        <Box
          gap="md"
          flexDirection="row"
          padding={8}
          backgroundColor={theme.semantic.colors.surface.secondary}
          borderRadius={8}
        >
          <Box style={itemStyle}>
            <Typography variant="footnote">A</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">B</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">C</Typography>
          </Box>
        </Box>
      </Stack>

      <Stack gap="xs">
        <Typography variant="caption-1">gap="lg" (24px)</Typography>
        <Box
          gap="lg"
          flexDirection="row"
          padding={8}
          backgroundColor={theme.semantic.colors.surface.secondary}
          borderRadius={8}
        >
          <Box style={itemStyle}>
            <Typography variant="footnote">A</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">B</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">C</Typography>
          </Box>
        </Box>
      </Stack>

      <Stack gap="xs">
        <Typography variant="caption-1">gap="xl" (32px)</Typography>
        <Box
          gap="xl"
          flexDirection="row"
          padding={8}
          backgroundColor={theme.semantic.colors.surface.secondary}
          borderRadius={8}
        >
          <Box style={itemStyle}>
            <Typography variant="footnote">A</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">B</Typography>
          </Box>
          <Box style={itemStyle}>
            <Typography variant="footnote">C</Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};
