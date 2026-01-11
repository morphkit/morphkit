/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-require-imports */
/**
 * PRODUCTION NOTE: Remove the eslint-disable comment above when implementing
 * this flow. It exists only because handler functions are empty templates.
 * Once you implement the handlers and use all variables, this comment should be deleted.
 */
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  Typography,
  Button,
  Container,
  Stack,
  Box,
  Divider,
  useTheme,
} from "@warp-ui/react-native";

type SocialProvider = "apple" | "google" | "facebook";

export interface WelcomeProps {
  logo?: ImageSourcePropType;
}

export default function Welcome({ logo }: WelcomeProps = {}) {
  const router = useRouter();
  const { theme } = useTheme();
  const [loading, setLoading] = useState<SocialProvider | null>(null);

  const handleSocialLogin = (provider: SocialProvider) => {
    setLoading((prev) => (prev === provider ? null : provider));
  };

  const handleContinueWithEmail = () => {
    router.push("/flows/auth/(default)/email");
  };

  return (
    <Container insets={["bottom"]}>
      <Stack gap={theme.primitive.spacing[6]} style={styles.container}>
        <Box style={styles.centeredContent}>
          <Stack gap={theme.primitive.spacing[6]} align="center">
            {logo && (
              <Image source={logo} style={styles.logo} resizeMode="contain" />
            )}
            <Typography variant="title-2" style={styles.centeredText}>
              Sign up or log in to start exploring
            </Typography>
            <Stack
              gap={theme.primitive.spacing[3]}
              style={[
                styles.fullWidth,
                { paddingTop: theme.primitive.spacing[10] },
              ]}
            >
              <Button
                variant="secondary"
                size="lg"
                iconAbsoluteLeft={<Ionicons name="logo-apple" size={20} />}
                onPress={() => handleSocialLogin("apple")}
                loading={loading === "apple"}
              >
                Continue with Apple
              </Button>
              <Button
                variant="secondary"
                size="lg"
                iconAbsoluteLeft={<AntDesign name="google" size={20} />}
                onPress={() => handleSocialLogin("google")}
                loading={loading === "google"}
              >
                Continue with Google
              </Button>
              <Button
                variant="secondary"
                size="lg"
                iconAbsoluteLeft={<FontAwesome name="facebook" size={20} />}
                onPress={() => handleSocialLogin("facebook")}
                loading={loading === "facebook"}
              >
                Continue with Facebook
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Stack
          direction="horizontal"
          gap={theme.primitive.spacing[4]}
          align="center"
        >
          <Divider style={styles.divider} />
          <Typography variant="footnote">or</Typography>
          <Divider style={styles.divider} />
        </Stack>
        <Button size="lg" onPress={handleContinueWithEmail}>
          Continue with email
        </Button>
        <Typography variant="caption-1" style={styles.centeredText}>
          By continuing, you agree to our Terms & Privacy Policy
        </Typography>
      </Stack>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: "85%",
    height: 80,
  },
  centeredText: {
    textAlign: "center",
  },
  fullWidth: {
    width: "100%",
  },
  divider: {
    flex: 1,
  },
});
