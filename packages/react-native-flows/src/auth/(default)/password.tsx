/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Container,
  Stack,
} from "@warp-ui/react-native";

export default function Password() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = useState("");
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
          <Typography variant="title-1">Create a password</Typography>
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            error={error}
            placeholder="Enter password"
          />
          <Stack direction="vertical" gap={4}>
            <Typography variant="caption-1">Password must contain:</Typography>
            <Typography variant="caption-2">• At least 8 characters</Typography>
            <Typography variant="caption-2">• One uppercase letter</Typography>
            <Typography variant="caption-2">• One number</Typography>
          </Stack>
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
