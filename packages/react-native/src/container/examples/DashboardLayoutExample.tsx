import { Container } from "../Container";
import { Box, Stack, Typography, Card } from "../..";

export const DashboardLayoutExample = () => {
  return (
    <Container maxWidth="xl" padding={20}>
      <Stack gap={16}>
        <Box backgroundColor="#4A90E2" padding={20} borderRadius={8}>
          <Typography variant="title-1" style={{ color: "#FFFFFF" }}>
            Dashboard Overview
          </Typography>
          <Typography
            variant="callout"
            style={{ color: "#FFFFFF", marginTop: 4 }}
          >
            Welcome back, Sarah
          </Typography>
        </Box>

        <Box flexDirection="row" gap={16}>
          <Box flex={1}>
            <Card>
              <Stack gap={8}>
                <Typography variant="caption-1" style={{ color: "#6B7280" }}>
                  Total Revenue
                </Typography>
                <Typography variant="title-2">$45,231</Typography>
                <Typography variant="footnote" style={{ color: "#10B981" }}>
                  +12.5% from last month
                </Typography>
              </Stack>
            </Card>
          </Box>
          <Box flex={1}>
            <Card>
              <Stack gap={8}>
                <Typography variant="caption-1" style={{ color: "#6B7280" }}>
                  Active Users
                </Typography>
                <Typography variant="title-2">2,483</Typography>
                <Typography variant="footnote" style={{ color: "#10B981" }}>
                  +8.2% from last month
                </Typography>
              </Stack>
            </Card>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};
