import { useTheme } from "../../theme";
import { Flex } from "../../flex";
import { Box } from "../../box";
import { Typography } from "../../typography";
import { Badge } from "../Badge";

export const MaxCountExample = () => {
  const { theme } = useTheme();

  return (
    <Flex gap="lg" direction="horizontal">
      <Flex gap="xs" align="center">
        <Badge count={50}>
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
        <Typography variant="caption-1">50</Typography>
      </Flex>
      <Flex gap="xs" align="center">
        <Badge count={99}>
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
        <Typography variant="caption-1">99</Typography>
      </Flex>
      <Flex gap="xs" align="center">
        <Badge count={150}>
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
        <Typography variant="caption-1">150 (99+)</Typography>
      </Flex>
      <Flex gap="xs" align="center">
        <Badge count={150} maxCount={9}>
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
        <Typography variant="caption-1">maxCount=9</Typography>
      </Flex>
    </Flex>
  );
};
