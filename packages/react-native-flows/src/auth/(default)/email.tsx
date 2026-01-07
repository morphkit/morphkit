/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Container,
  Stack,
} from "@warp-ui/react-native";

export default function Email() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleContinue = () => {};

  return (
    <Container>
      <Stack direction="vertical" gap={24} style={styles.container}>
        <Button variant="plain" size="sm" onPress={handleGoBack}>
          ← Back
        </Button>
        <Stack direction="vertical" gap={16}>
          <Typography variant="title-1">{"Let's start with email"}</Typography>
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={setEmail}
            error={error}
            placeholder="your@email.com"
            autoCapitalize="none"
          />
        </Stack>
        <View style={styles.spacer} />
        <Button
          variant="primary"
          size="lg"
          loading={loading}
          onPress={handleContinue}
        >
          Continue
        </Button>
      </Stack>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  spacer: {
    flex: 1,
  },
});
