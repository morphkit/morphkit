import { View, StyleSheet } from "react-native";
import { Typography } from "@warp-ui/react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    marginBottom: 16,
  },
  description: {
    color: "#666666",
    textAlign: "center",
  },
});

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Typography variant="title-1" style={styles.title}>
        Warp UI Components
      </Typography>
      <Typography variant="body" style={styles.description}>
        Select a component from the sidebar
      </Typography>
    </View>
  );
}
