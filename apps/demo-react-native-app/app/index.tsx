import { View, StyleSheet, useColorScheme } from "react-native";
import { Typography } from "@morph-ui/react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <View style={[styles.container, themeStyles[colorScheme]]}>
      <Typography variant="title-1" style={styles.title}>
        Warp UI Components
      </Typography>
      <Typography
        variant="body"
        style={[styles.description, textTheme[colorScheme]]}
      >
        Select a component from the sidebar
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    marginBottom: 16,
  },
  description: {
    textAlign: "center",
  },
});

const themeStyles = StyleSheet.create({
  light: {
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#000000",
  },
});

const textTheme = StyleSheet.create({
  light: {
    color: "#666666",
  },
  dark: {
    color: "#9CA3AF",
  },
});
