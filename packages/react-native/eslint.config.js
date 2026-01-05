import { config } from "@repo/eslint-config/react-native";

export default [
  ...config,
  {
    ignores: ["src/theme/tokens/**", "**/*.test.tsx", "**/*.test.ts", "**/examples/**"],
  },
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/#[0-9A-Fa-f]{3,8}/]",
          message: "Hardcoded hex colors are not allowed. Use theme.semantic.colors.* or theme.primitive.* instead.",
        },
        {
          selector: "Literal[value=/^rgba?\\(/]",
          message: "Hardcoded rgb/rgba colors are not allowed. Use theme.semantic.colors.* or theme.primitive.* instead.",
        },
      ],
      "no-magic-numbers": [
        "warn",
        {
          ignore: [0, 1, -1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          enforceConst: true,
          detectObjects: false,
        },
      ],
    },
  },
];
