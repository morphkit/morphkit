/**
 * TEMPLATE NOTE: This flow is a template meant to be copied to consumer projects.
 * Customize the handler functions for your specific user registration flow.
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
} from "@morphkit/react-native";

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
        gap="lg"
        style={[styles.container, { paddingTop: theme.primitive.spacing[6] }]}
      >
        <Stack gap="md">
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
