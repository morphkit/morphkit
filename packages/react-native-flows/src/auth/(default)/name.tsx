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

export default function Name() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState<string | undefined>(
    undefined,
  );
  const [lastNameError, setLastNameError] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleFinish = () => {};

  return (
    <Container>
      <Stack direction="vertical" gap={24} style={styles.container}>
        <Button variant="plain" size="sm" onPress={handleGoBack}>
          ← Back
        </Button>
        <Stack direction="vertical" gap={16}>
          <Typography variant="title-1">Enter your name</Typography>
          <Input
            label="First name"
            type="text"
            value={firstName}
            onChange={setFirstName}
            error={firstNameError}
            placeholder="John"
            autoCapitalize="words"
          />
          <Input
            label="Last name"
            type="text"
            value={lastName}
            onChange={setLastName}
            error={lastNameError}
            placeholder="Doe"
            autoCapitalize="words"
          />
        </Stack>
        <View style={styles.spacer} />
        <Button
          variant="primary"
          size="lg"
          loading={loading}
          onPress={handleFinish}
        >
          Finish
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
