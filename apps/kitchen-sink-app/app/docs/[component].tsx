import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Typography, Tag, useTheme } from "@morphkit/react-native";
import registry from "@morphkit/react-native/src/registry.json";
import { docsRegistry } from "@morphkit/react-native/src/docs-registry";

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function RelatedComponentCard({
  name,
  onPress,
}: {
  name: string;
  onPress: () => void;
}) {
  const { theme } = useTheme();
  const colors = theme.semantic.colors;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.relatedCard,
        {
          backgroundColor: colors.surface.secondary,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Typography variant="footnote" style={{ color: colors.text.primary }}>
        {capitalizeFirstLetter(name)}
      </Typography>
    </Pressable>
  );
}

export default function ComponentDocPage() {
  const { theme } = useTheme();
  const colors = theme.semantic.colors;
  const router = useRouter();
  const { component } = useLocalSearchParams<{ component: string }>();

  const componentMeta = registry.components.find((c) => c.name === component);

  const usedBy = registry.components
    .filter((c) => c.dependencies.includes(component ?? ""))
    .map((c) => c.name);

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
        <Typography
          variant="large-title"
          style={{ color: colors.text.primary }}
        >
          {capitalizeFirstLetter(componentMeta.name)}
        </Typography>

        <View style={styles.metaRow}>
          <Tag variant="primary" size="sm">
            {componentMeta.category}
          </Tag>
          <View style={styles.tagsContainer}>
            {componentMeta.tags.slice(0, 2).map((tag) => (
              <Tag key={tag} variant="default" size="sm">
                {tag}
              </Tag>
            ))}
          </View>
        </View>

        {(componentMeta.dependencies.length > 0 || usedBy.length > 0) && (
          <View style={styles.relatedContainer}>
            {componentMeta.dependencies.length > 0 && (
              <View style={styles.relatedSection}>
                <Typography
                  variant="footnote"
                  style={{ color: colors.text.tertiary }}
                >
                  Uses
                </Typography>
                {componentMeta.dependencies.map((dep) => (
                  <RelatedComponentCard
                    key={dep}
                    name={dep}
                    onPress={() => router.push(`/docs/${dep}`)}
                  />
                ))}
              </View>
            )}
            {usedBy.length > 0 && (
              <View style={styles.relatedSection}>
                <Typography
                  variant="footnote"
                  style={{ color: colors.text.tertiary }}
                >
                  Used by
                </Typography>
                {usedBy.map((name) => (
                  <RelatedComponentCard
                    key={name}
                    name={name}
                    onPress={() => router.push(`/docs/${name}`)}
                  />
                ))}
              </View>
            )}
          </View>
        )}

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
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap",
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  relatedContainer: {
    gap: 12,
    marginTop: 12,
    marginBottom: 24,
  },
  relatedSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  relatedCard: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
