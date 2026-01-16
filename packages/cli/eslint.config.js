import { config as baseConfig } from "@morphkit/eslint-config/base";

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
