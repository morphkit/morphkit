import { config as reactNativeConfig } from "@repo/eslint-config/react-native";

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
