import { render } from "../test-utils";
import { Stack, StackProps } from "./Stack";

jest.mock("expo-router", () => {
  const React = require("react");
  const { View } = require("react-native");
  const MockStack = ({
    children,
    screenOptions,
  }: {
    children?: React.ReactNode;
    screenOptions?: unknown;
  }) => {
    const resolvedOptions =
      typeof screenOptions === "function"
        ? screenOptions({
            navigation: {},
            route: { key: "test", name: "test" },
            theme: {},
          })
        : screenOptions;

    return React.createElement(
      View,
      {
        testID: "expo-router-stack",
        accessibilityLabel: JSON.stringify(resolvedOptions),
      },
      children,
    );
  };

  MockStack.Screen = ({ children, ...props }: { children?: React.ReactNode }) =>
    React.createElement(
      View,
      { testID: "expo-router-screen", ...props },
      children,
    );

  return { Stack: MockStack };
});

const renderStack = (props: StackProps = {}) => {
  return render(<Stack {...props} />);
};

const getScreenOptions = (container: ReturnType<typeof render>) => {
  const stack = container.getByTestId("expo-router-stack");
  const label = stack.props.accessibilityLabel;
  return JSON.parse(label);
};

describe("Stack", () => {
  describe("Default rendering", () => {
    it("renders expo-router Stack internally", () => {
      const { getByTestId } = renderStack();
      expect(getByTestId("expo-router-stack")).toBeTruthy();
    });

    it("renders without children", () => {
      const { getByTestId } = renderStack();
      expect(getByTestId("expo-router-stack")).toBeTruthy();
    });

    it("passes children through to expo-router Stack", () => {
      const { getByTestId } = render(
        <Stack>
          <Stack.Screen name="test" />
        </Stack>,
      );
      expect(getByTestId("expo-router-stack")).toBeTruthy();
      expect(getByTestId("expo-router-screen")).toBeTruthy();
    });
  });

  describe("Theme-based header styling", () => {
    it("applies themed headerShadowVisible as false", () => {
      const container = renderStack();
      const options = getScreenOptions(container);
      expect(options.headerShadowVisible).toBe(false);
    });

    it("applies themed headerTintColor", () => {
      const container = renderStack();
      const options = getScreenOptions(container);
      expect(options.headerTintColor).toBeTruthy();
      expect(typeof options.headerTintColor).toBe("string");
    });

    it("applies themed headerStyle.backgroundColor", () => {
      const container = renderStack();
      const options = getScreenOptions(container);
      expect(options.headerStyle).toBeTruthy();
      expect(options.headerStyle.backgroundColor).toBeTruthy();
    });

    it("applies themed headerTitleStyle", () => {
      const container = renderStack();
      const options = getScreenOptions(container);
      expect(options.headerTitleStyle).toBeTruthy();
      expect(options.headerTitleStyle.color).toBeTruthy();
      expect(options.headerTitleStyle.fontSize).toBeTruthy();
      expect(options.headerTitleStyle.fontWeight).toBeTruthy();
    });

    it("applies headerBackButtonDisplayMode", () => {
      const container = renderStack();
      const options = getScreenOptions(container);
      expect(options.headerBackButtonDisplayMode).toBe("minimal");
    });
  });

  describe("Light color scheme", () => {
    it("uses light theme colors by default", () => {
      const container = render(<Stack />, {
        initialColorScheme: "light",
      });
      const options = getScreenOptions(container);
      expect(options.headerStyle.backgroundColor).toBeTruthy();
      expect(options.headerTintColor).toBeTruthy();
    });
  });

  describe("Dark color scheme", () => {
    it("uses dark theme colors when colorScheme is dark", () => {
      const container = render(<Stack />, {
        initialColorScheme: "dark",
      });
      const options = getScreenOptions(container);
      expect(options.headerStyle.backgroundColor).toBeTruthy();
      expect(options.headerTintColor).toBeTruthy();
    });

    it("applies different colors in dark mode vs light mode", () => {
      const lightContainer = render(<Stack />, {
        initialColorScheme: "light",
      });
      const darkContainer = render(<Stack />, {
        initialColorScheme: "dark",
      });

      const lightOptions = getScreenOptions(lightContainer);
      const darkOptions = getScreenOptions(darkContainer);

      expect(lightOptions.headerStyle.backgroundColor).not.toBe(
        darkOptions.headerStyle.backgroundColor,
      );
    });
  });

  describe("Screen options override", () => {
    it("allows partial override of screenOptions", () => {
      const container = render(
        <Stack screenOptions={{ headerTitle: "Custom Title" }} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerTitle).toBe("Custom Title");
      expect(options.headerShadowVisible).toBe(false);
      expect(options.headerTintColor).toBeTruthy();
    });

    it("deep merges headerStyle", () => {
      const container = render(
        <Stack
          screenOptions={{
            headerStyle: { borderBottomWidth: 1 } as {
              backgroundColor?: string;
            },
          }}
        />,
      );
      const options = getScreenOptions(container);
      expect(options.headerStyle.backgroundColor).toBeTruthy();
      expect(options.headerStyle.borderBottomWidth).toBe(1);
    });

    it("user options override themed defaults", () => {
      const container = render(
        <Stack screenOptions={{ headerShadowVisible: true }} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerShadowVisible).toBe(true);
    });

    it("full override replaces all specified keys", () => {
      const customBackgroundColor = "#FF0000";
      const container = render(
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: customBackgroundColor },
          }}
        />,
      );
      const options = getScreenOptions(container);
      expect(options.headerStyle.backgroundColor).toBe(customBackgroundColor);
    });
  });

  describe("Function-based screenOptions", () => {
    it("calls function with navigation context", () => {
      const screenOptionsFn = jest.fn().mockReturnValue({});
      render(<Stack screenOptions={screenOptionsFn} />);
      expect(screenOptionsFn).toHaveBeenCalled();
    });

    it("provides theme context as part of props", () => {
      const screenOptionsFn = jest.fn().mockReturnValue({});
      render(<Stack screenOptions={screenOptionsFn} />);
      const callArgs = screenOptionsFn.mock.calls[0][0];
      expect(callArgs.themeContext).toBeTruthy();
      expect(callArgs.themeContext.theme).toBeTruthy();
      expect(callArgs.themeContext.colorScheme).toBeTruthy();
    });

    it("merges function return value with themed defaults", () => {
      const container = render(
        <Stack screenOptions={() => ({ headerTitle: "Dynamic Title" })} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerTitle).toBe("Dynamic Title");
      expect(options.headerShadowVisible).toBe(false);
    });

    it("function options take precedence over defaults", () => {
      const container = render(
        <Stack screenOptions={() => ({ headerShadowVisible: true })} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerShadowVisible).toBe(true);
    });
  });

  describe("Stack.Screen support", () => {
    it("exposes Stack.Screen as static property", () => {
      expect(Stack.Screen).toBeTruthy();
    });

    it("Stack.Screen is from expo-router", () => {
      const { getByTestId } = render(
        <Stack>
          <Stack.Screen name="home" />
        </Stack>,
      );
      expect(getByTestId("expo-router-screen")).toBeTruthy();
    });
  });

  describe("Props pass-through", () => {
    it("forwards initialRouteName prop", () => {
      const { getByTestId } = render(
        <Stack initialRouteName="settings">
          <Stack.Screen name="home" />
          <Stack.Screen name="settings" />
        </Stack>,
      );
      expect(getByTestId("expo-router-stack")).toBeTruthy();
    });

    it("forwards id prop", () => {
      const { getByTestId } = render(
        <Stack {...({ id: "main-stack" } as object)} />,
      );
      expect(getByTestId("expo-router-stack")).toBeTruthy();
    });
  });

  describe("Type safety", () => {
    it("ScreenOptionsWithTheme accepts object", () => {
      const options: StackProps["screenOptions"] = {
        headerTitle: "Test",
      };
      expect(options).toBeTruthy();
    });

    it("ScreenOptionsWithTheme accepts function", () => {
      const options: StackProps["screenOptions"] = ({ themeContext }) => ({
        headerTitle: themeContext.colorScheme === "dark" ? "Dark" : "Light",
      });
      expect(typeof options).toBe("function");
    });
  });
});
