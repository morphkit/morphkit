import { View, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Typography } from "@warp-ui/react-native";
import registry from "@warp-ui/react-native/src/registry.json";
import { docsRegistry } from "@warp-ui/react-native/src/docs-registry";

export default function ComponentDocPage() {
  const colorScheme = useColorScheme() ?? "light";
  const { component } = useLocalSearchParams<{ component: string }>();

  const componentMeta = registry.components.find((c) => c.name === component);

  if (!componentMeta) {
    return (
      <View style={[styles.notFoundContainer, containerTheme[colorScheme]]}>
        <Typography variant="heading" style={textTheme[colorScheme]}>
          Component &ldquo;{component}&rdquo; not found
        </Typography>
      </View>
    );
  }

  const ComponentDocs = component ? docsRegistry[component] : null;

  if (!ComponentDocs) {
    return (
      <View style={[styles.notFoundContainer, containerTheme[colorScheme]]}>
        <Typography variant="heading" style={textTheme[colorScheme]}>
          Documentation not available for &ldquo;{component}&rdquo;
        </Typography>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.scrollView, containerTheme[colorScheme]]}>
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

const containerTheme = StyleSheet.create({
  light: {
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#000000",
  },
});

const textTheme = StyleSheet.create({
  light: {
    color: "#6b7280",
  },
  dark: {
    color: "#9CA3AF",
  },
});
