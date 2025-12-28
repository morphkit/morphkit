import { config as reactNativeConfig } from "@repo/eslint-config/react-native";

export default [
  ...reactNativeConfig,
  {
    ignores: ["node_modules/**", "coverage/**"],
  },
];
