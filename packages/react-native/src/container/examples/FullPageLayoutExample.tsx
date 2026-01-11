import { Container } from "../Container";
import { Box, Stack, Typography, Card } from "../..";

export const FullPageLayoutExample = () => {
  return (
    <Container maxWidth="lg" padding={20}>
      <Stack gap={20}>
        <Box backgroundColor="#4A90E2" padding={20} borderRadius={8}>
          <Typography variant="large-title" style={{ color: "#FFFFFF" }}>
            Page Header
          </Typography>
          <Typography variant="body" style={{ color: "#FFFFFF", marginTop: 4 }}>
            Constrained to container width for visual consistency
          </Typography>
        </Box>

        <Card>
          <Stack gap="md">
            <Typography variant="title-3">Main Content Section</Typography>
            <Typography
              variant="body"
              style={{ color: "#6B7280", lineHeight: 24 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Container
              ensures this text does not stretch too wide on large screens,
              maintaining optimal readability across all device sizes.
            </Typography>
          </Stack>
        </Card>

        <Box backgroundColor="#F3F4F6" padding={16} borderRadius={8}>
          <Typography
            variant="callout"
            style={{ fontWeight: "600", marginBottom: 8 }}
          >
            Footer
          </Typography>
          <Typography variant="footnote" style={{ color: "#6B7280" }}>
            © 2025 Your Company
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};
