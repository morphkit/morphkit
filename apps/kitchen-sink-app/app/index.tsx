import { View, StyleSheet } from "react-native";
import { Typography, useTheme } from "@morphkit/react-native";

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = theme.semantic.colors;

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surface.primary }]}
    >
      <Typography variant="title-1" style={styles.title}>
        Warp UI Components
      </Typography>
      <Typography
        variant="body"
        style={[styles.description, { color: colors.text.secondary }]}
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
