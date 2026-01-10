/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * PRODUCTION NOTE: Remove the eslint-disable comment above when implementing
 * this flow. It exists only because handler functions are empty templates.
 * Once you implement the handlers and use all variables, this comment should be deleted.
 */
import { View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Container,
  Stack,
  useTheme,
} from "@warp-ui/react-native";

export default function Password() {
  const router = useRouter();
  const { theme } = useTheme();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    router.push("/flows/auth/(default)/name");
  };

  return (
    <Container insets={["bottom"]}>
      <Stack
        gap={theme.primitive.spacing[6]}
        style={[styles.container, { paddingTop: theme.primitive.spacing[6] }]}
      >
        <Stack gap={theme.primitive.spacing[4]}>
          <Input
            size="lg"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            error={error}
            placeholder="Enter password"
            autoComplete="password-new"
            autoFocus
            onSubmitEditing={handleContinue}
          />
          <Stack gap={theme.primitive.spacing[1]}>
            <Typography variant="body">Password must contain:</Typography>
            <Typography variant="caption-2">• At least 8 characters</Typography>
            <Typography variant="caption-2">• One uppercase letter</Typography>
            <Typography variant="caption-2">• One number</Typography>
          </Stack>
        </Stack>
        <View style={styles.spacer} />
        <Button size="lg" loading={loading} onPress={handleContinue}>
          Continue
        </Button>
      </Stack>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
});
