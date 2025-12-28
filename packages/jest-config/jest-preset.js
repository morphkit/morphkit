const jestExpoPreset = require("jest-expo/jest-preset");

module.exports = {
  ...jestExpoPreset,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.cjs",
    "!**/expo-env.d.ts",
    "!**/.expo/**",
    "!**/*.test.{ts,tsx}",
    "!**/README.mdx",
    "!**/eslint.config.js",
  ],
  testMatch: ["**/__tests__/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
};
