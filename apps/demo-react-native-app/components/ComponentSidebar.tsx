import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter, usePathname } from "expo-router";
import { Typography, useTheme } from "@warp-ui/react-native";
import registry from "@warp-ui/react-native/src/registry.json";

export const ComponentSidebar = (props: DrawerContentComponentProps) => {
  const { theme } = useTheme();
  const colors = theme.semantic.colors;
  const router = useRouter();
  const pathname = usePathname();

  const handleComponentPress = (componentName: string) => {
    router.push(`/docs/${componentName}`);
    props.navigation.closeDrawer();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surface.primary }]}
    >
      <Typography variant="title-2" style={styles.title}>
        Components
      </Typography>
      <ScrollView>
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
              {component.description && (
                <Typography
                  variant="footnote"
                  style={[styles.description, { color: colors.text.tertiary }]}
                >
                  {component.description}
                </Typography>
              )}
            </Pressable>
          );
        })}
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
  title: {
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
  description: {
    marginTop: 4,
  },
});
