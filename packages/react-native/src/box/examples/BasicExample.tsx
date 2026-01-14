import { useTheme } from "../../theme";
import { Typography } from "../../typography";
import { Box } from "../Box";

export const BasicExample = () => {
  const { theme } = useTheme();

  return (
    <Box
      padding={16}
      backgroundColor={theme.semantic.colors.surface.secondary}
      borderRadius={8}
    >
      <Typography>Content inside a Box container</Typography>
    </Box>
  );
};
