import { config as baseConfig } from "@morph-ui/eslint-config/base";

export default [
  ...baseConfig,
  {
    ignores: ["node_modules/**", "dist/**", "coverage/**"],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ]
    }
  }
];
