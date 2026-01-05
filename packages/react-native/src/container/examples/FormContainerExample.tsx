import { Container } from "../Container";
import { Box, Stack, Typography, Card } from "../..";

export const FormContainerExample = () => {
  return (
    <Container maxWidth="sm" padding={20}>
      <Card>
        <Stack gap={16}>
          <Typography variant="title-3">Create Account</Typography>
          <Stack gap={12}>
            <Box padding={12} backgroundColor="#F9FAFB" borderRadius={6}>
              <Typography variant="callout" style={{ color: "#6B7280" }}>Full Name</Typography>
            </Box>
            <Box padding={12} backgroundColor="#F9FAFB" borderRadius={6}>
              <Typography variant="callout" style={{ color: "#6B7280" }}>Email Address</Typography>
            </Box>
            <Box padding={12} backgroundColor="#F9FAFB" borderRadius={6}>
              <Typography variant="callout" style={{ color: "#6B7280" }}>Password</Typography>
            </Box>
          </Stack>
          <Box padding={12} backgroundColor="#4A90E2" borderRadius={8} alignItems="center">
            <Typography variant="callout" style={{ color: "#FFFFFF", fontWeight: "600" }}>
              Sign Up
            </Typography>
          </Box>
        </Stack>
      </Card>
    </Container>
  );
};
