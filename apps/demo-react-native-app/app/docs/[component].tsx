import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import registry from "@warp-ui/nativewind/src/registry.json";
import { docsRegistry } from "@warp-ui/nativewind/src/docs-registry";

export default function ComponentDocPage() {
  const { component } = useLocalSearchParams<{ component: string }>();

  const componentMeta = registry.components.find((c) => c.name === component);

  if (!componentMeta) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-xl text-gray-600">
          Component &ldquo;{component}&rdquo; not found
        </Text>
      </View>
    );
  }

  const ComponentDocs = component ? docsRegistry[component] : null;

  if (!ComponentDocs) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-xl text-gray-600">
          Documentation not available for &ldquo;{component}&rdquo;
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <ComponentDocs />
      </View>
    </ScrollView>
  );
}
