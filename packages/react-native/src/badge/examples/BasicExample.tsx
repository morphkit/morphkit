import { useTheme } from "../../theme";
import { Box } from "../../box";
import { Badge } from "../Badge";

export const BasicExample = () => {
  const { theme } = useTheme();

  return (
    <Badge count={5}>
      <Box
        style={{
          width: 48,
          height: 48,
        }}
        backgroundColor={theme.semantic.colors.surface.secondary}
        padding={theme.primitive.spacing[2]}
        borderRadius={theme.primitive.borderRadius.md}
      />
    </Badge>
  );
};
