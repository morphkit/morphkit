/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * PRODUCTION NOTE: Remove the eslint-disable comment above when implementing
 * this flow. It exists only because handler functions are empty templates.
 * Once you implement the handlers and use all variables, this comment should be deleted.
 */
import { View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Typography,
  Input,
  type InputRef,
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

  const lastNameInputRef = useRef<InputRef>(null);

  const handleFinish = () => {
    router.push("/");
  };

  const handleNameSubmit = () => {
    lastNameInputRef.current?.focus();
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
            label="First name"
            value={firstName}
            onChange={setFirstName}
            error={firstNameError}
            placeholder="John"
            autoCapitalize="words"
            autoComplete="given-name"
            autoFocus
            onSubmitEditing={handleNameSubmit}
          />
          <Input
            ref={lastNameInputRef}
            size="lg"
            label="Last name"
            value={lastName}
            onChange={setLastName}
            error={lastNameError}
            placeholder="Doe"
            autoCapitalize="words"
            autoComplete="family-name"
            onSubmitEditing={handleFinish}
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
