import { Divider } from "../Divider";
import { Box, Stack, Typography, Card } from "../..";

export const DividersInCardExample = () => {
  return (
    <Card>
      <Stack gap="md">
        <Box>
          <Typography variant="heading">Section 1</Typography>
          <Typography variant="callout" style={{ marginTop: 4 }}>
            Content for the first section with important details
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="heading">Section 2</Typography>
          <Typography variant="callout" style={{ marginTop: 4 }}>
            Content for the second section with more information
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="heading">Section 3</Typography>
          <Typography variant="callout" style={{ marginTop: 4 }}>
            Content for the third section wrapping things up
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};
