import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Container } from "../Container";

export const AlignmentExample = () => {
  return (
    <Stack gap="lg">
      <Container centered maxWidth="sm">
        <Typography variant="subhead">Centered (default)</Typography>
        <Typography variant="footnote">
          Container horizontally centered within parent
        </Typography>
      </Container>

      <Container centered={false} maxWidth="sm">
        <Typography variant="subhead">Not Centered</Typography>
        <Typography variant="footnote">
          Container aligns to default position (left)
        </Typography>
      </Container>
    </Stack>
  );
};
