global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
  return 0;
};

global.cancelAnimationFrame = () => {};

/* global jest */
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

jest.mock("expo-font", () => ({
  useFonts: () => [true, null],
  loadAsync: jest.fn(),
}));
