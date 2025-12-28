import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Typography } from "@warp-ui/nativewind";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Typography className="text-2xl font-bold">Hello World</Typography>
      <StatusBar style="auto" />
    </View>
  );
}
