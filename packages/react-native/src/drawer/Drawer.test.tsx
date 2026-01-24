import { render } from "../test-utils";
import { Drawer, DrawerProps } from "./Drawer";

jest.mock("expo-router/drawer", () => {
  const React = require("react");
  const { View } = require("react-native");
  const MockDrawer = ({
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
        testID: "expo-router-drawer",
        accessibilityLabel: JSON.stringify(resolvedOptions),
      },
      children,
    );
  };

  MockDrawer.Screen = ({
    children,
    ...props
  }: {
    children?: React.ReactNode;
  }) =>
    React.createElement(
      View,
      { testID: "expo-router-drawer-screen", ...props },
      children,
    );

  return { Drawer: MockDrawer };
});

const renderDrawer = (props: DrawerProps = {}) => {
  return render(<Drawer {...props} />);
};

const getScreenOptions = (container: ReturnType<typeof render>) => {
  const drawer = container.getByTestId("expo-router-drawer");
  const label = drawer.props.accessibilityLabel;
  return JSON.parse(label);
};

describe("Drawer", () => {
  describe("Default rendering", () => {
    it("renders expo-router Drawer internally", () => {
      const { getByTestId } = renderDrawer();
      expect(getByTestId("expo-router-drawer")).toBeTruthy();
    });

    it("renders without children", () => {
      const { getByTestId } = renderDrawer();
      expect(getByTestId("expo-router-drawer")).toBeTruthy();
    });

    it("passes children through to expo-router Drawer", () => {
      const { getByTestId } = render(
        <Drawer>
          <Drawer.Screen name="test" />
        </Drawer>,
      );
      expect(getByTestId("expo-router-drawer")).toBeTruthy();
      expect(getByTestId("expo-router-drawer-screen")).toBeTruthy();
    });
  });

  describe("Theme-based header styling", () => {
    it("applies themed headerShadowVisible as false", () => {
      const container = renderDrawer();
      const options = getScreenOptions(container);
      expect(options.headerShadowVisible).toBe(false);
    });

    it("applies themed headerTintColor", () => {
      const container = renderDrawer();
      const options = getScreenOptions(container);
      expect(options.headerTintColor).toBeTruthy();
      expect(typeof options.headerTintColor).toBe("string");
    });

    it("applies themed headerStyle.backgroundColor", () => {
      const container = renderDrawer();
      const options = getScreenOptions(container);
      expect(options.headerStyle).toBeTruthy();
      expect(options.headerStyle.backgroundColor).toBeTruthy();
    });

    it("applies themed headerTitleStyle", () => {
      const container = renderDrawer();
      const options = getScreenOptions(container);
      expect(options.headerTitleStyle).toBeTruthy();
      expect(options.headerTitleStyle.color).toBeTruthy();
      expect(options.headerTitleStyle.fontSize).toBeTruthy();
      expect(options.headerTitleStyle.fontWeight).toBeTruthy();
    });
  });

  describe("Theme-based drawer panel styling", () => {
    it("applies themed drawerStyle.backgroundColor", () => {
      const container = renderDrawer();
      const options = getScreenOptions(container);
      expect(options.drawerStyle).toBeTruthy();
      expect(options.drawerStyle.backgroundColor).toBeTruthy();
    });

    it("applies themed overlayColor", () => {
      const container = renderDrawer();
      const options = getScreenOptions(container);
      expect(options.overlayColor).toBeTruthy();
    });
  });

  describe("Theme-based drawer item styling", () => {
    it("applies themed drawerActiveTintColor", () => {
      const container = renderDrawer();
      const options = getScreenOptions(container);
      expect(options.drawerActiveTintColor).toBeTruthy();
      expect(typeof options.drawerActiveTintColor).toBe("string");
    });

    it("applies themed drawerInactiveTintColor", () => {
      const container = renderDrawer();
      const options = getScreenOptions(container);
      expect(options.drawerInactiveTintColor).toBeTruthy();
      expect(typeof options.drawerInactiveTintColor).toBe("string");
    });

    it("applies themed drawerActiveBackgroundColor", () => {
      const container = renderDrawer();
      const options = getScreenOptions(container);
      expect(options.drawerActiveBackgroundColor).toBeTruthy();
    });

    it("applies themed drawerInactiveBackgroundColor", () => {
      const container = renderDrawer();
      const options = getScreenOptions(container);
      expect(options.drawerInactiveBackgroundColor).toBe("transparent");
    });

    it("applies themed drawerLabelStyle", () => {
      const container = renderDrawer();
      const options = getScreenOptions(container);
      expect(options.drawerLabelStyle).toBeTruthy();
      expect(options.drawerLabelStyle.fontSize).toBeTruthy();
      expect(options.drawerLabelStyle.fontWeight).toBeTruthy();
    });
  });

  describe("Light color scheme", () => {
    it("uses light theme colors by default", () => {
      const container = render(<Drawer />, {
        initialColorScheme: "light",
      });
      const options = getScreenOptions(container);
      expect(options.headerStyle.backgroundColor).toBeTruthy();
      expect(options.headerTintColor).toBeTruthy();
      expect(options.drawerStyle.backgroundColor).toBeTruthy();
    });
  });

  describe("Dark color scheme", () => {
    it("uses dark theme colors when colorScheme is dark", () => {
      const container = render(<Drawer />, {
        initialColorScheme: "dark",
      });
      const options = getScreenOptions(container);
      expect(options.headerStyle.backgroundColor).toBeTruthy();
      expect(options.headerTintColor).toBeTruthy();
      expect(options.drawerStyle.backgroundColor).toBeTruthy();
    });

    it("applies different colors in dark mode vs light mode", () => {
      const lightContainer = render(<Drawer />, {
        initialColorScheme: "light",
      });
      const darkContainer = render(<Drawer />, {
        initialColorScheme: "dark",
      });

      const lightOptions = getScreenOptions(lightContainer);
      const darkOptions = getScreenOptions(darkContainer);

      expect(lightOptions.headerStyle.backgroundColor).not.toBe(
        darkOptions.headerStyle.backgroundColor,
      );
      expect(lightOptions.drawerStyle.backgroundColor).not.toBe(
        darkOptions.drawerStyle.backgroundColor,
      );
    });
  });

  describe("Screen options override", () => {
    it("allows partial override of screenOptions", () => {
      const container = render(
        <Drawer screenOptions={{ headerTitle: "Custom Title" }} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerTitle).toBe("Custom Title");
      expect(options.headerShadowVisible).toBe(false);
      expect(options.headerTintColor).toBeTruthy();
    });

    it("deep merges headerStyle", () => {
      const container = render(
        <Drawer
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

    it("deep merges drawerStyle", () => {
      const container = render(
        <Drawer
          screenOptions={{
            drawerStyle: { width: 300 } as {
              backgroundColor?: string;
            },
          }}
        />,
      );
      const options = getScreenOptions(container);
      expect(options.drawerStyle.backgroundColor).toBeTruthy();
      expect(options.drawerStyle.width).toBe(300);
    });

    it("user options override themed defaults", () => {
      const container = render(
        <Drawer screenOptions={{ headerShadowVisible: true }} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerShadowVisible).toBe(true);
    });

    it("full override replaces all specified keys", () => {
      const customBackgroundColor = "#FF0000";
      const container = render(
        <Drawer
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
      render(<Drawer screenOptions={screenOptionsFn} />);
      expect(screenOptionsFn).toHaveBeenCalled();
    });

    it("provides theme context as part of props", () => {
      const screenOptionsFn = jest.fn().mockReturnValue({});
      render(<Drawer screenOptions={screenOptionsFn} />);
      const callArgs = screenOptionsFn.mock.calls[0][0];
      expect(callArgs.themeContext).toBeTruthy();
      expect(callArgs.themeContext.theme).toBeTruthy();
      expect(callArgs.themeContext.colorScheme).toBeTruthy();
    });

    it("merges function return value with themed defaults", () => {
      const container = render(
        <Drawer screenOptions={() => ({ headerTitle: "Dynamic Title" })} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerTitle).toBe("Dynamic Title");
      expect(options.headerShadowVisible).toBe(false);
    });

    it("function options take precedence over defaults", () => {
      const container = render(
        <Drawer screenOptions={() => ({ headerShadowVisible: true })} />,
      );
      const options = getScreenOptions(container);
      expect(options.headerShadowVisible).toBe(true);
    });
  });

  describe("Drawer.Screen support", () => {
    it("exposes Drawer.Screen as static property", () => {
      expect(Drawer.Screen).toBeTruthy();
    });

    it("Drawer.Screen is from expo-router", () => {
      const { getByTestId } = render(
        <Drawer>
          <Drawer.Screen name="home" />
        </Drawer>,
      );
      expect(getByTestId("expo-router-drawer-screen")).toBeTruthy();
    });
  });

  describe("Props pass-through", () => {
    it("forwards initialRouteName prop", () => {
      const { getByTestId } = render(
        <Drawer initialRouteName="settings">
          <Drawer.Screen name="home" />
          <Drawer.Screen name="settings" />
        </Drawer>,
      );
      expect(getByTestId("expo-router-drawer")).toBeTruthy();
    });

    it("forwards id prop", () => {
      const { getByTestId } = render(
        <Drawer {...({ id: "main-drawer" } as object)} />,
      );
      expect(getByTestId("expo-router-drawer")).toBeTruthy();
    });
  });

  describe("Type safety", () => {
    it("DrawerScreenOptionsWithTheme accepts object", () => {
      const options: DrawerProps["screenOptions"] = {
        headerTitle: "Test",
      };
      expect(options).toBeTruthy();
    });

    it("DrawerScreenOptionsWithTheme accepts function", () => {
      const options: DrawerProps["screenOptions"] = ({ themeContext }) => ({
        headerTitle: themeContext.colorScheme === "dark" ? "Dark" : "Light",
      });
      expect(typeof options).toBe("function");
    });
  });
});
