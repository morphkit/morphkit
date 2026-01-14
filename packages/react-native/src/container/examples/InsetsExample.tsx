import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Container } from "../Container";

export const InsetsExample = () => {
  return (
    <Stack gap="lg">
      <Container insets={["top"]}>
        <Typography variant="subhead">Top Inset</Typography>
        <Typography variant="footnote">
          Adds safe area padding for device notch
        </Typography>
      </Container>

      <Container insets={["bottom"]}>
        <Typography variant="subhead">Bottom Inset</Typography>
        <Typography variant="footnote">
          Adds safe area padding for home indicator
        </Typography>
      </Container>

      <Container insets={["top", "bottom"]}>
        <Typography variant="subhead">Top and Bottom Insets</Typography>
        <Typography variant="footnote">
          Full vertical safe area protection
        </Typography>
      </Container>
    </Stack>
  );
};
