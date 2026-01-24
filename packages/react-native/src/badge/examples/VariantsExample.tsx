import { useTheme } from "../../theme";
import { Flex } from "../../flex";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { Badge } from "../Badge";

export const VariantsExample = () => {
  const { theme } = useTheme();

  return (
    <Flex gap="lg" direction="horizontal">
      <Flex gap="xs" align="center">
        <Badge count={3} color="red">
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
        <Typography variant="caption-1">Red</Typography>
      </Flex>
      <Flex gap="xs" align="center">
        <Badge count={7} color="blue">
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
        <Typography variant="caption-1">Blue</Typography>
      </Flex>
    </Flex>
  );
};
