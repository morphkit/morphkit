import { config } from "@morph-ui/eslint-config/base";

export default [
  ...config,
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    rules: {
      "turbo/no-undeclared-env-vars": "off",
    },
  },
];