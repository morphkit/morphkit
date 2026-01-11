import { config as reactNativeConfig } from "@morph-ui/eslint-config/react-native";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...reactNativeConfig,
  {
    ignores: [".expo/**", "node_modules/**"],
  },
  {
    files: ["*.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
