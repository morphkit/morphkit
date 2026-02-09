import {
  renderHook,
  act,
  render as rawRender,
  fireEvent,
} from "@testing-library/react-native";
import { render } from "../test-utils";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { themes } from "./theme";
import { Typography } from "../typography";
import { Text, Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

jest.mock("expo-font", () => ({
  useFonts: jest.fn().mockReturnValue([true, null]),
  loadAsync: jest.fn(),
}));

const useFontsMock = jest.requireMock("expo-font").useFonts as jest.Mock;

describe("ThemeProvider", () => {
  beforeEach(() => {
    useFontsMock.mockReturnValue([true, null]);
  });

  it("provides light theme by default", () => {
    const { getByText } = render(<Typography variant="body">Hello</Typography>);
    expect(getByText("Hello")).toBeTruthy();
  });

  it("provides dark theme when initialColorScheme is dark", () => {
    const { getByText } = render(<Typography variant="body">Dark</Typography>, {
      initialColorScheme: "dark",
    });
    expect(getByText("Dark")).toBeTruthy();
  });

  it("renders fontsLoadingFallback when fonts are loading", () => {
    useFontsMock.mockReturnValue([false, null]);

    const { getByText } = rawRender(
      <SafeAreaProvider>
        <ThemeProvider
          fonts={{ "Custom-Font": 0 }}
          fontsLoadingFallback={<Text>Loading fonts...</Text>}
        >
          <Typography variant="body">Content</Typography>
        </ThemeProvider>
      </SafeAreaProvider>,
    );
    expect(getByText("Loading fonts...")).toBeTruthy();
  });

  it("renders null when fonts loading and no fallback provided", () => {
    useFontsMock.mockReturnValue([false, null]);

    const { queryByText } = rawRender(
      <SafeAreaProvider>
        <ThemeProvider fonts={{ "Custom-Font": 0 }}>
          <Typography variant="body">Content</Typography>
        </ThemeProvider>
      </SafeAreaProvider>,
    );
    expect(queryByText("Content")).toBeNull();
  });

  it("renders children when no fonts prop is provided", () => {
    const { getByText } = rawRender(
      <SafeAreaProvider>
        <ThemeProvider>
          <Text>No fonts</Text>
        </ThemeProvider>
      </SafeAreaProvider>,
    );
    expect(getByText("No fonts")).toBeTruthy();
  });

  it("uses custom theme when provided", () => {
    const customTheme = { light: themes.light, dark: themes.dark };
    const { getByText } = rawRender(
      <SafeAreaProvider>
        <ThemeProvider theme={customTheme}>
          <Text>Themed</Text>
        </ThemeProvider>
      </SafeAreaProvider>,
    );
    expect(getByText("Themed")).toBeTruthy();
  });
});

describe("useTheme", () => {
  beforeEach(() => {
    useFontsMock.mockReturnValue([true, null]);
  });

  it("throws error when used outside ThemeProvider", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const TestComponent = () => {
      useTheme();
      return null;
    };

    expect(() => {
      rawRender(
        <SafeAreaProvider>
          <TestComponent />
        </SafeAreaProvider>,
      );
    }).toThrow("useTheme must be used within a ThemeProvider");

    consoleError.mockRestore();
  });

  it("returns theme and colorScheme", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <SafeAreaProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SafeAreaProvider>
      ),
    });

    expect(result.current.theme).toBeDefined();
    expect(result.current.colorScheme).toBe("light");
    expect(result.current.setColorScheme).toBeDefined();
    expect(result.current.toggleColorScheme).toBeDefined();
  });

  it("toggles color scheme between light and dark", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <SafeAreaProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SafeAreaProvider>
      ),
    });

    expect(result.current.colorScheme).toBe("light");

    act(() => {
      result.current.toggleColorScheme();
    });

    expect(result.current.colorScheme).toBe("dark");

    act(() => {
      result.current.toggleColorScheme();
    });

    expect(result.current.colorScheme).toBe("light");
  });

  it("sets color scheme directly", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <SafeAreaProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SafeAreaProvider>
      ),
    });

    act(() => {
      result.current.setColorScheme("dark");
    });

    expect(result.current.colorScheme).toBe("dark");
  });

  it("toggleColorScheme works via Pressable in component tree", () => {
    const ToggleButton = () => {
      const { colorScheme, toggleColorScheme } = useTheme();
      return (
        <Pressable onPress={toggleColorScheme} testID="toggle">
          <Text>{colorScheme}</Text>
        </Pressable>
      );
    };

    const { getByText, getByTestId } = rawRender(
      <SafeAreaProvider>
        <ThemeProvider>
          <ToggleButton />
        </ThemeProvider>
      </SafeAreaProvider>,
    );
    expect(getByText("light")).toBeTruthy();

    act(() => {
      fireEvent.press(getByTestId("toggle"));
    });

    expect(getByText("dark")).toBeTruthy();
  });
});
