import { Box } from "../../box";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Container } from "../Container";

export const InsetsExample = () => {
  return (
    <Stack gap="lg">
      <Container insets={["top"]}>
        <Box backgroundColor="#ECFDF5" padding={12} borderRadius={8}>
          <Typography variant="subhead">Top Inset</Typography>
          <Typography variant="footnote">
            Adds safe area padding for device notch
          </Typography>
        </Box>
      </Container>

      <Container insets={["bottom"]}>
        <Box backgroundColor="#FFF7ED" padding={12} borderRadius={8}>
          <Typography variant="subhead">Bottom Inset</Typography>
          <Typography variant="footnote">
            Adds safe area padding for home indicator
          </Typography>
        </Box>
      </Container>

      <Container insets={["top", "bottom"]}>
        <Box backgroundColor="#F5F3FF" padding={12} borderRadius={8}>
          <Typography variant="subhead">Top and Bottom Insets</Typography>
          <Typography variant="footnote">
            Full vertical safe area protection
          </Typography>
        </Box>
      </Container>
    </Stack>
  );
};
