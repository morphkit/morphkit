import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter, usePathname } from "expo-router";
import { Typography } from "@warp-ui/react-native";
import registry from "@warp-ui/react-native/src/registry.json";

export const ComponentSidebar = (props: DrawerContentComponentProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();
  const pathname = usePathname();

  const handleComponentPress = (componentName: string) => {
    router.push(`/docs/${componentName}`);
    props.navigation.closeDrawer();
  };

  return (
    <View style={[styles.container, containerTheme[colorScheme]]}>
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
                isActive
                  ? activeItemTheme[colorScheme]
                  : inactiveItemTheme[colorScheme],
              ]}
            >
              <Typography
                variant="callout"
                style={[
                  styles.itemText,
                  isActive
                    ? activeTextTheme[colorScheme]
                    : inactiveTextTheme[colorScheme],
                ]}
              >
                {component.name}
              </Typography>
              {component.description && (
                <Typography
                  variant="footnote"
                  style={[styles.description, descriptionTheme[colorScheme]]}
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

const containerTheme = StyleSheet.create({
  light: {
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#000000",
  },
});

const activeItemTheme = StyleSheet.create({
  light: {
    backgroundColor: "#f3f4f6",
  },
  dark: {
    backgroundColor: "#1a1a1a",
  },
});

const inactiveItemTheme = StyleSheet.create({
  light: {
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#000000",
  },
});

const activeTextTheme = StyleSheet.create({
  light: {
    color: "#000000",
  },
  dark: {
    color: "#ffffff",
  },
});

const inactiveTextTheme = StyleSheet.create({
  light: {
    color: "#666666",
  },
  dark: {
    color: "#aaaaaa",
  },
});

const descriptionTheme = StyleSheet.create({
  light: {
    color: "#999999",
  },
  dark: {
    color: "#666666",
  },
});
