import { View, Text, Pressable, ScrollView } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter, usePathname } from "expo-router";
import registry from "@warp-ui/nativewind/src/registry.json";

export const ComponentSidebar = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleComponentPress = (componentName: string) => {
    router.push(`/docs/${componentName}`);
    props.navigation.closeDrawer();
  };

  return (
    <View className="flex-1 bg-white pt-12 px-4">
      <Text className="text-2xl font-bold mb-6">Components</Text>
      <ScrollView>
        {registry.components.map((component) => {
          const isActive = pathname === `/docs/${component.name}`;

          return (
            <Pressable
              key={component.name}
              onPress={() => handleComponentPress(component.name)}
              className={`py-3 px-4 mb-2 rounded-lg ${
                isActive ? "bg-blue-100" : "bg-gray-50"
              }`}
            >
              <Text
                className={`text-base capitalize ${
                  isActive ? "font-bold text-blue-600" : "text-gray-800"
                }`}
              >
                {component.name}
              </Text>
              {component.description && (
                <Text className="text-sm text-gray-600 mt-1">
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
