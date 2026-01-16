/**
 * TEMPLATE NOTE: This flow is a template meant to be copied to consumer projects.
 * Customize the handler functions for your specific authentication flow.
 */
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Container,
  Stack,
  useTheme,
} from "@morphkit/react-native";

export default function Email() {
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    router.push("/flows/auth/(default)/password");
  };

  return (
    <Container insets={["bottom"]}>
      <Stack
        gap="lg"
        style={[styles.container, { paddingTop: theme.primitive.spacing[6] }]}
      >
        <Stack gap="md">
          <Input
            size="lg"
            label="Email address"
            type="email"
            value={email}
            onChange={setEmail}
            error={error}
            placeholder="your@email.com"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            autoFocus
            onSubmitEditing={handleContinue}
          />
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
