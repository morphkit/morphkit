import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter, usePathname } from "expo-router";
import { Typography } from "@warp-ui/react-native";
import registry from "@warp-ui/react-native/src/registry.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 24,
  },
  itemActive: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#dbeafe",
  },
  itemInactive: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
  },
  itemTextActive: {
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "#2563eb",
  },
  itemTextInactive: {
    textTransform: "capitalize",
    color: "#1f2937",
  },
  description: {
    color: "#6b7280",
    marginTop: 4,
  },
});

export const ComponentSidebar = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleComponentPress = (componentName: string) => {
    router.push(`/docs/${componentName}`);
    props.navigation.closeDrawer();
  };

  return (
    <View style={styles.container}>
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
              style={isActive ? styles.itemActive : styles.itemInactive}
            >
              <Typography
                variant="callout"
                style={
                  isActive ? styles.itemTextActive : styles.itemTextInactive
                }
              >
                {component.name}
              </Typography>
              {component.description && (
                <Typography variant="footnote" style={styles.description}>
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
