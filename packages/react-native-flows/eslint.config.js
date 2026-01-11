import { config as reactNativeConfig } from "@morph-ui/eslint-config/react-native";

export default [
  ...reactNativeConfig,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
