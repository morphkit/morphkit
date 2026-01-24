/**
 * TEMPLATE NOTE: This flow is a template meant to be copied to consumer projects.
 * Customize the handler functions and password requirements for your specific use case.
 */
import { View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Container,
  Flex,
  useTheme,
} from "@morphkit/react-native";

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
      <Flex
        gap="lg"
        style={[styles.container, { paddingTop: theme.primitive.spacing[6] }]}
      >
        <Flex gap="md">
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
          <Flex gap="xs">
            <Typography variant="body">Password must contain:</Typography>
            <Typography variant="caption-2">• At least 8 characters</Typography>
            <Typography variant="caption-2">• One uppercase letter</Typography>
            <Typography variant="caption-2">• One number</Typography>
          </Flex>
        </Flex>
        <View style={styles.spacer} />
        <Button size="lg" loading={loading} onPress={handleContinue}>
          Continue
        </Button>
      </Flex>
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
