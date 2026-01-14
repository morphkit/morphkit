import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Container } from "../Container";

export const MaxWidthPresetsExample = () => {
  return (
    <Stack gap="lg">
      <Container maxWidth="sm">
        <Typography variant="subhead">Small (640px)</Typography>
        <Typography variant="footnote">
          Best for forms and narrow content
        </Typography>
      </Container>

      <Container maxWidth="md">
        <Typography variant="subhead">Medium (768px)</Typography>
        <Typography variant="footnote">
          Best for articles and reading content
        </Typography>
      </Container>

      <Container maxWidth="lg">
        <Typography variant="subhead">Large (1024px) - Default</Typography>
        <Typography variant="footnote">
          Best for standard page layouts
        </Typography>
      </Container>

      <Container maxWidth="xl">
        <Typography variant="subhead">Extra Large (1280px)</Typography>
        <Typography variant="footnote">
          Best for dashboards and data displays
        </Typography>
      </Container>
    </Stack>
  );
};
