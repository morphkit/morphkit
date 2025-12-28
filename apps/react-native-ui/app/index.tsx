import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Typography } from "@warp-ui/react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Typography style={styles.text}>Hello World</Typography>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
