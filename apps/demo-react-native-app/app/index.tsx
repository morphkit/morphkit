import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import registry from "@warp-ui/nativewind/src/registry.json";

export default function HomeScreen() {
  const router = useRouter();

  const handleNavigateToFirst = () => {
    if (registry.components.length > 0 && registry.components[0]) {
      router.push(`/docs/${registry.components[0].name}`);
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-6">
      <Text className="text-2xl font-bold mb-4">Warp UI Components</Text>
      <Text className="text-base text-gray-600 text-center mb-6">
        Open the drawer to browse components
      </Text>
      {registry.components.length > 0 && registry.components[0] && (
        <Pressable
          onPress={handleNavigateToFirst}
          className="bg-blue-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">
            View {registry.components[0].name}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
