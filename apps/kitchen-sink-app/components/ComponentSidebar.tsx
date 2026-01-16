import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter, usePathname } from "expo-router";
import { Typography, useTheme } from "@morphkit/react-native";
import registry from "@morphkit/react-native/src/registry.json";
import flowsRegistry from "@morphkit/react-native-flows/src/registry.json";
import type { FlowRegistryEntry } from "@morphkit/react-native-flows";

export const ComponentSidebar = (props: DrawerContentComponentProps) => {
  const { theme } = useTheme();
  const colors = theme.semantic.colors;
  const router = useRouter();
  const pathname = usePathname();

  const handleComponentPress = (componentName: string) => {
    router.push(`/docs/${componentName}`);
    props.navigation.closeDrawer();
  };

  const handleFlowPress = (flow: FlowRegistryEntry) => {
    const path = `/flows/${flow.type}/(${flow.variant})/${flow.entryPoint}`;
    router.push(path);
    props.navigation.closeDrawer();
  };

  const isFlowActive = (flow: FlowRegistryEntry): boolean => {
    return pathname.startsWith(`/flows/${flow.type}/(${flow.variant})`);
  };

  const renderSectionHeader = (title: string) => (
    <Typography
      variant="title-3"
      style={{
        marginBottom: theme.primitive.spacing[4],
        color: colors.text.primary,
      }}
    >
      {title}
    </Typography>
  );

  const renderEmptyState = () => (
    <View
      style={{
        padding: theme.primitive.spacing[4],
        backgroundColor: colors.surface.secondary,
        borderRadius: theme.primitive.borderRadius.md,
      }}
    >
      <Typography
        variant="footnote"
        style={{
          color: colors.text.tertiary,
          textAlign: "center",
        }}
      >
        No flows available yet
      </Typography>
    </View>
  );

  const renderFlowItem = (flow: FlowRegistryEntry) => {
    const isActive = isFlowActive(flow);
    const displayName = `${flow.type} (${flow.variant})`;

    return (
      <Pressable
        key={`${flow.type}-${flow.variant}`}
        onPress={() => handleFlowPress(flow)}
        style={[
          styles.item,
          {
            backgroundColor: isActive
              ? colors.surface.secondary
              : colors.surface.primary,
          },
        ]}
      >
        <Typography
          variant="callout"
          style={[
            styles.itemText,
            {
              color: isActive ? colors.text.primary : colors.text.secondary,
            },
          ]}
        >
          {displayName}
        </Typography>
        <Typography
          variant="caption-2"
          style={{
            color: colors.text.tertiary,
            marginTop: theme.primitive.spacing[1],
          }}
        >
          {flow.description}
        </Typography>
      </Pressable>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surface.primary }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {renderSectionHeader("Components")}
          {registry.components.map((component) => {
            const isActive = pathname === `/docs/${component.name}`;

            return (
              <Pressable
                key={component.name}
                onPress={() => handleComponentPress(component.name)}
                style={[
                  styles.item,
                  {
                    backgroundColor: isActive
                      ? colors.surface.secondary
                      : colors.surface.primary,
                  },
                ]}
              >
                <Typography
                  variant="callout"
                  style={[
                    styles.itemText,
                    {
                      color: isActive
                        ? colors.text.primary
                        : colors.text.secondary,
                    },
                  ]}
                >
                  {component.name}
                </Typography>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.section}>
          {renderSectionHeader("Flows")}
          {flowsRegistry.flows.length > 0
            ? flowsRegistry.flows.map(renderFlowItem)
            : renderEmptyState()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    textTransform: "capitalize",
    fontWeight: "bold",
  },
});
