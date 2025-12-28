import { View, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Typography } from "@warp-ui/react-native";
import registry from "@warp-ui/react-native/src/registry.json";
import { docsRegistry } from "@warp-ui/react-native/src/docs-registry";

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  notFoundText: {
    color: "#6b7280",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 24,
  },
});

export default function ComponentDocPage() {
  const { component } = useLocalSearchParams<{ component: string }>();

  const componentMeta = registry.components.find((c) => c.name === component);

  if (!componentMeta) {
    return (
      <View style={styles.notFoundContainer}>
        <Typography variant="heading" style={styles.notFoundText}>
          Component &ldquo;{component}&rdquo; not found
        </Typography>
      </View>
    );
  }

  const ComponentDocs = component ? docsRegistry[component] : null;

  if (!ComponentDocs) {
    return (
      <View style={styles.notFoundContainer}>
        <Typography variant="heading" style={styles.notFoundText}>
          Documentation not available for &ldquo;{component}&rdquo;
        </Typography>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.content}>
        <ComponentDocs />
      </View>
    </ScrollView>
  );
}
