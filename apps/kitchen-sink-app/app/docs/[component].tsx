import { View, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Typography, useTheme } from "@morph-ui/react-native";
import registry from "@morph-ui/react-native/src/registry.json";
import { docsRegistry } from "@morph-ui/react-native/src/docs-registry";

export default function ComponentDocPage() {
  const { theme } = useTheme();
  const colors = theme.semantic.colors;
  const { component } = useLocalSearchParams<{ component: string }>();

  const componentMeta = registry.components.find((c) => c.name === component);

  if (!componentMeta) {
    return (
      <View
        style={[
          styles.notFoundContainer,
          { backgroundColor: colors.surface.primary },
        ]}
      >
        <Typography variant="heading" style={{ color: colors.text.secondary }}>
          Component &ldquo;{component}&rdquo; not found
        </Typography>
      </View>
    );
  }

  const ComponentDocs = component ? docsRegistry[component] : null;

  if (!ComponentDocs) {
    return (
      <View
        style={[
          styles.notFoundContainer,
          { backgroundColor: colors.surface.primary },
        ]}
      >
        <Typography variant="heading" style={{ color: colors.text.secondary }}>
          Documentation not available for &ldquo;{component}&rdquo;
        </Typography>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.surface.primary }]}
    >
      <View style={styles.content}>
        <ComponentDocs />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
});
