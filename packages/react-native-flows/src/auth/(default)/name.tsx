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

export default function Name() {
  const router = useRouter();
  const { theme } = useTheme();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState<string>();
  const [lastNameError, setLastNameError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleFinish = () => {};

  return (
    <Container>
      <Stack
        gap={theme.primitive.spacing[6]}
        style={[styles.container, { padding: theme.primitive.spacing[6] }]}
      >
        <Stack gap={theme.primitive.spacing[4]}>
          <Typography variant="title-1">Enter your name</Typography>
          <Input
            label="First name"
            value={firstName}
            onChange={setFirstName}
            error={firstNameError}
            placeholder="John"
            autoCapitalize="words"
          />
          <Input
            label="Last name"
            value={lastName}
            onChange={setLastName}
            error={lastNameError}
            placeholder="Doe"
            autoCapitalize="words"
          />
        </Stack>
        <View style={styles.spacer} />
        <Button size="lg" loading={loading} onPress={handleFinish}>
          Finish
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
