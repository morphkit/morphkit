/**
 * TEMPLATE NOTE: This flow is a template meant to be copied to consumer projects.
 * Customize the handler functions and asset paths for your specific use case.
 * Replace require("../../../assets/default-logo.png") with your app's logo.
 */
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  Typography,
  Button,
  Container,
  Flex,
  Box,
  Divider,
  useTheme,
} from "@morphkit/react-native";

type SocialProvider = "apple" | "google" | "facebook";

export default function Welcome() {
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
      <Flex gap="lg" style={styles.container}>
        <Box style={styles.centeredContent}>
          <Flex gap="lg" align="center">
            <Image
              source={require("../../../assets/default-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Typography variant="title-2" style={styles.centeredText}>
              Sign up or log in to start exploring
            </Typography>
            <Flex
              gap="md"
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
            </Flex>
          </Flex>
        </Box>
        <Flex direction="horizontal" gap="md" align="center">
          <Divider style={styles.divider} />
          <Typography variant="footnote">or</Typography>
          <Divider style={styles.divider} />
        </Flex>
        <Button size="lg" onPress={handleContinueWithEmail}>
          Continue with email
        </Button>
        <Typography variant="caption-1" style={styles.centeredText}>
          By continuing, you agree to our Terms & Privacy Policy
        </Typography>
      </Flex>
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
    height: 136,
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
