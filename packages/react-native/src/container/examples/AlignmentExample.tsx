import { Box } from "../../box";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Container } from "../Container";

export const AlignmentExample = () => {
  return (
    <Stack gap="lg">
      <Container centered maxWidth="sm">
        <Box backgroundColor="#DBEAFE" padding={12} borderRadius={8}>
          <Typography variant="subhead">Centered (default)</Typography>
          <Typography variant="footnote">
            Container horizontally centered within parent
          </Typography>
        </Box>
      </Container>

      <Container centered={false} maxWidth="sm">
        <Box backgroundColor="#FCE7F3" padding={12} borderRadius={8}>
          <Typography variant="subhead">Not Centered</Typography>
          <Typography variant="footnote">
            Container aligns to default position (left)
          </Typography>
        </Box>
      </Container>
    </Stack>
  );
};
