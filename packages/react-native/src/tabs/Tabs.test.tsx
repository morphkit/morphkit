import { render } from "../test-utils";
import { Tabs, TabsProps } from "./Tabs";

jest.mock("expo-router", () => {
  const React = require("react");
  const { View } = require("react-native");
  const MockTabs = ({
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
        testID: "expo-router-tabs",
        accessibilityLabel: JSON.stringify(resolvedOptions),
      },
      children,
    );
  };

  MockTabs.Screen = ({ children, ...props }: { children?: React.ReactNode }) =>
    React.createElement(
      View,
      { testID: "expo-router-screen", ...props },
      children,
    );

  return { Tabs: MockTabs };
});

const renderTabs = (props: TabsProps = {}) => {
  return render(<Tabs {...props} />);
};

const getScreenOptions = (container: ReturnType<typeof render>) => {
  const tabs = container.getByTestId("expo-router-tabs");
  const label = tabs.props.accessibilityLabel;
  return JSON.parse(label);
};

describe("Tabs", () => {
  describe("Default rendering", () => {
    it("renders expo-router Tabs internally", () => {
      const { getByTestId } = renderTabs();
      expect(getByTestId("expo-router-tabs")).toBeTruthy();
    });

    it("renders without children", () => {
      const { getByTestId } = renderTabs();
      expect(getByTestId("expo-router-tabs")).toBeTruthy();
    });

    it("passes children through to expo-router Tabs", () => {
      const { getByTestId } = render(
        <Tabs>
          <Tabs.Screen name="home" />
        </Tabs>,
      );
      expect(getByTestId("expo-router-tabs")).toBeTruthy();
      expect(getByTestId("expo-router-screen")).toBeTruthy();
    });
  });

  describe("Tab bar theming", () => {
    it("applies themed tabBarActiveTintColor", () => {
      const container = renderTabs();
      const options = getScreenOptions(container);
      expect(options.tabBarActiveTintColor).toBeTruthy();
      expect(typeof options.tabBarActiveTintColor).toBe("string");
    });

    it("applies themed tabBarInactiveTintColor", () => {
      const container = renderTabs();
      const options = getScreenOptions(container);
      expect(options.tabBarInactiveTintColor).toBeTruthy();
      expect(typeof options.tabBarInactiveTintColor).toBe("string");
    });

    it("applies themed tabBarStyle.backgroundColor", () => {
      const container = renderTabs();
      const options = getScreenOptions(container);
      expect(options.tabBarStyle).toBeTruthy();
      expect(options.tabBarStyle.backgroundColor).toBeTruthy();
    });

    it("applies themed tabBarLabelStyle", () => {
      const container = renderTabs();
      const options = getScreenOptions(container);
      expect(options.tabBarLabelStyle).toBeTruthy();
      expect(options.tabBarLabelStyle.fontSize).toBeTruthy();
      expect(options.tabBarLabelStyle.fontWeight).toBeTruthy();
    });
  });

  describe("Header theming", () => {
    it("applies themed headerShadowVisible as false", () => {
      const container = renderTabs();
      const options = getScreenOptions(container);
      expect(options.headerShadowVisible).toBe(false);
    });

    it("applies themed headerTintColor", () => {
      const container = renderTabs();
      const options = getScreenOptions(container);
      expect(options.headerTintColor).toBeTruthy();
      expect(typeof options.headerTintColor).toBe("string");
    });

    it("applies themed headerStyle.backgroundColor", () => {
      const container = renderTabs();
      const options = getScreenOptions(container);
      expect(options.headerStyle).toBeTruthy();
      expect(options.headerStyle.backgroundColor).toBeTruthy();
    });

    it("applies themed headerTitleStyle", () => {
      const container = renderTabs();
      const options = getScreenOptions(container);
      expect(options.headerTitleStyle).toBeTruthy();
      expect(options.headerTitleStyle.color).toBeTruthy();
      expect(options.headerTitleStyle.fontSize).toBeTruthy();
      expect(options.headerTitleStyle.fontWeight).toBeTruthy();
    });
  });

  describe("Badge theming", () => {
    it("applies themed tabBarBadgeStyle", () => {
      const container = renderTabs();
      const options = getScreenOptions(container);
      expect(options.tabBarBadgeStyle).toBeTruthy();
      expect(options.tabBarBadgeStyle.backgroundColor).toBeTruthy();
      expect(options.tabBarBadgeStyle.color).toBeTruthy();
    });
  });

  describe("Light color scheme", () => {
    it("uses light theme colors by default", () => {
      const container = render(<Tabs />, {
        initialColorScheme: "light",
      });
      const options = getScreenOptions(container);
      expect(options.headerStyle.backgroundColor).toBeTruthy();
      expect(options.tabBarStyle.backgroundColor).toBeTruthy();
      expect(options.tabBarActiveTintColor).toBeTruthy();
    });
  });

  describe("Dark color scheme", () => {
    it("uses dark theme colors when colorScheme is dark", () => {
      const container = render(<Tabs />, {
        initialColorScheme: "dark",
      });
      const options = getScreenOptions(container);
      expect(options.headerStyle.backgroundColor).toBeTruthy();
      expect(options.tabBarStyle.backgroundColor).toBeTruthy();
      expect(options.tabBarActiveTintColor).toBeTruthy();
    });

    it("applies different colors in dark mode vs light mode", () => {
      const lightContainer = render(<Tabs />, {
        initialColorScheme: "light",
      });
      const darkContainer = render(<Tabs />, {
        initialColorScheme: "dark",
      });

      const lightOptions = getScreenOptions(lightContainer);
      const darkOptions = getScreenOptions(darkContainer);

      expect(lightOptions.tabBarStyle.backgroundColor).not.toBe(
        darkOptions.tabBarStyle.backgroundColor,
      );
      expect(lightOptions.headerStyle.backgroundColor).not.toBe(
        darkOptions.headerStyle.backgroundColor,
      );
    });
  });

  describe("Screen options override", () => {
    it("allows partial override of screenOptions", () => {
      const container = render(
        <Tabs screenOptions={{ headerTitle: "Custom Title" }} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerTitle).toBe("Custom Title");
      expect(options.headerShadowVisible).toBe(false);
      expect(options.tabBarActiveTintColor).toBeTruthy();
    });

    it("deep merges tabBarStyle", () => {
      const container = render(
        <Tabs
          screenOptions={{
            tabBarStyle: { borderTopWidth: 1 } as {
              backgroundColor?: string;
            },
          }}
        />,
      );
      const options = getScreenOptions(container);
      expect(options.tabBarStyle.backgroundColor).toBeTruthy();
      expect(options.tabBarStyle.borderTopWidth).toBe(1);
    });

    it("deep merges headerStyle", () => {
      const container = render(
        <Tabs
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
        <Tabs screenOptions={{ headerShadowVisible: true }} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerShadowVisible).toBe(true);
    });

    it("full override replaces all specified keys", () => {
      const customBackgroundColor = "#FF0000";
      const container = render(
        <Tabs
          screenOptions={{
            tabBarStyle: { backgroundColor: customBackgroundColor },
          }}
        />,
      );
      const options = getScreenOptions(container);
      expect(options.tabBarStyle.backgroundColor).toBe(customBackgroundColor);
    });
  });

  describe("Function-based screenOptions", () => {
    it("calls function with navigation context", () => {
      const screenOptionsFn = jest.fn().mockReturnValue({});
      render(<Tabs screenOptions={screenOptionsFn} />);
      expect(screenOptionsFn).toHaveBeenCalled();
    });

    it("provides theme context as part of props", () => {
      const screenOptionsFn = jest.fn().mockReturnValue({});
      render(<Tabs screenOptions={screenOptionsFn} />);
      const callArgs = screenOptionsFn.mock.calls[0][0];
      expect(callArgs.themeContext).toBeTruthy();
      expect(callArgs.themeContext.theme).toBeTruthy();
      expect(callArgs.themeContext.colorScheme).toBeTruthy();
    });

    it("merges function return value with themed defaults", () => {
      const container = render(
        <Tabs screenOptions={() => ({ headerTitle: "Dynamic Title" })} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerTitle).toBe("Dynamic Title");
      expect(options.headerShadowVisible).toBe(false);
    });

    it("function options take precedence over defaults", () => {
      const container = render(
        <Tabs screenOptions={() => ({ headerShadowVisible: true })} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerShadowVisible).toBe(true);
    });
  });

  describe("Tab bar icon with theme context", () => {
    it("wraps tabBarIcon to include themeContext", () => {
      const tabBarIconFn = jest.fn().mockReturnValue(null);
      render(
        <Tabs
          screenOptions={{
            tabBarIcon: tabBarIconFn,
          }}
        />,
      );
      expect(tabBarIconFn).not.toHaveBeenCalled();
    });

    it("preserves tabBarIcon undefined when not provided", () => {
      const container = render(<Tabs screenOptions={{}} />);
      const options = getScreenOptions(container);
      expect(options.tabBarIcon).toBeUndefined();
    });
  });

  describe("Tabs.Screen support", () => {
    it("exposes Tabs.Screen as static property", () => {
      expect(Tabs.Screen).toBeTruthy();
    });

    it("Tabs.Screen is from expo-router", () => {
      const { getByTestId } = render(
        <Tabs>
          <Tabs.Screen name="home" />
        </Tabs>,
      );
      expect(getByTestId("expo-router-screen")).toBeTruthy();
    });
  });

  describe("Props pass-through", () => {
    it("forwards initialRouteName prop", () => {
      const { getByTestId } = render(
        <Tabs initialRouteName="settings">
          <Tabs.Screen name="home" />
          <Tabs.Screen name="settings" />
        </Tabs>,
      );
      expect(getByTestId("expo-router-tabs")).toBeTruthy();
    });

    it("forwards id prop", () => {
      const { getByTestId } = render(
        <Tabs {...({ id: "main-tabs" } as object)} />,
      );
      expect(getByTestId("expo-router-tabs")).toBeTruthy();
    });
  });

  describe("Type safety", () => {
    it("ScreenOptionsWithTheme accepts object", () => {
      const options: TabsProps["screenOptions"] = {
        headerTitle: "Test",
      };
      expect(options).toBeTruthy();
    });

    it("ScreenOptionsWithTheme accepts function", () => {
      const options: TabsProps["screenOptions"] = ({ themeContext }) => ({
        headerTitle: themeContext.colorScheme === "dark" ? "Dark" : "Light",
      });
      expect(typeof options).toBe("function");
    });
  });
});
