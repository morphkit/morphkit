import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
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
    fontSize: 20,
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
        <Text style={styles.notFoundText}>
          Component &ldquo;{component}&rdquo; not found
        </Text>
      </View>
    );
  }

  const ComponentDocs = component ? docsRegistry[component] : null;

  if (!ComponentDocs) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          Documentation not available for &ldquo;{component}&rdquo;
        </Text>
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
