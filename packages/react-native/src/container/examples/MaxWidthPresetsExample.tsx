import { Box } from "../../box";
import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Container } from "../Container";

export const MaxWidthPresetsExample = () => {
  return (
    <Flex gap="lg">
      <Container maxWidth="sm">
        <Box backgroundColor="#FEE2E2" padding={12} borderRadius={8}>
          <Typography variant="subhead">Small (640px)</Typography>
          <Typography variant="footnote">
            Best for forms and narrow content
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="md">
        <Box backgroundColor="#FEF3C7" padding={12} borderRadius={8}>
          <Typography variant="subhead">Medium (768px)</Typography>
          <Typography variant="footnote">
            Best for articles and reading content
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Box backgroundColor="#D1FAE5" padding={12} borderRadius={8}>
          <Typography variant="subhead">Large (1024px) - Default</Typography>
          <Typography variant="footnote">
            Best for standard page layouts
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="xl">
        <Box backgroundColor="#E0E7FF" padding={12} borderRadius={8}>
          <Typography variant="subhead">Extra Large (1280px)</Typography>
          <Typography variant="footnote">
            Best for dashboards and data displays
          </Typography>
        </Box>
      </Container>
    </Flex>
  );
};
