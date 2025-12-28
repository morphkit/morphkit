import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter, usePathname } from "expo-router";
import registry from "@warp-ui/react-native/src/registry.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
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
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "#2563eb",
  },
  itemTextInactive: {
    fontSize: 16,
    textTransform: "capitalize",
    color: "#1f2937",
  },
  description: {
    fontSize: 14,
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
      <Text style={styles.title}>Components</Text>
      <ScrollView>
        {registry.components.map((component) => {
          const isActive = pathname === `/docs/${component.name}`;

          return (
            <Pressable
              key={component.name}
              onPress={() => handleComponentPress(component.name)}
              style={isActive ? styles.itemActive : styles.itemInactive}
            >
              <Text style={isActive ? styles.itemTextActive : styles.itemTextInactive}>
                {component.name}
              </Text>
              {component.description && (
                <Text style={styles.description}>
                  {component.description}
                </Text>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};
