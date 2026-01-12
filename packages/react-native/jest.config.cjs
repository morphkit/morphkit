module.exports = {
  preset: "react-native",
  collectCoverage: true,
  coverageReporters: ["text", "lcov", "json-summary"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/test-utils.tsx",
    "!**/coverage/**",
    "!**/node_modules/**",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { configFile: "./babel.config.cjs" }],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@testing-library|@expo|expo-.*)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "node",
};
