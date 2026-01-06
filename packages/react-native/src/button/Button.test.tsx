import { StyleSheet } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "./Button";
import { View } from "react-native";

describe("<Button />", () => {
  test("renders children correctly", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toBeTruthy();
  });

  test("applies primary variant by default", () => {
    const { getByText } = render(<Button>Primary</Button>);
    const element = getByText("Primary");
    const flatStyle = StyleSheet.flatten(element.props.style);
    expect(flatStyle).toMatchObject({
      color: "#FFFFFF",
    });
  });

  test("applies secondary variant styles", () => {
    const { getByText } = render(
      <Button variant="secondary">Secondary</Button>,
    );
    const element = getByText("Secondary");
    const flatStyle = StyleSheet.flatten(element.props.style);
    expect(flatStyle).toMatchObject({
      color: "#333333",
    });
  });

  test("applies tonal variant styles", () => {
    const { getByText } = render(<Button variant="tonal">Tonal</Button>);
    const element = getByText("Tonal");
    const flatStyle = StyleSheet.flatten(element.props.style);
    expect(flatStyle).toMatchObject({
      color: "#1565C0",
    });
  });

  test("applies plain variant styles", () => {
    const { getByText } = render(<Button variant="plain">Plain</Button>);
    const element = getByText("Plain");
    const flatStyle = StyleSheet.flatten(element.props.style);
    expect(flatStyle).toMatchObject({
      color: "#4A90E2",
    });
  });

  test("applies small size styles", () => {
    const { UNSAFE_getAllByType } = render(
      <Button size="sm" testID="button-sm">
        Small
      </Button>,
    );
    const views = UNSAFE_getAllByType(View);
    const container = views.find((v) => {
      const style = StyleSheet.flatten(v.props.style);
      return style && style.paddingHorizontal === 12 && style.minHeight === 32;
    });
    expect(container).toBeTruthy();
  });

  test("applies medium size styles by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Button testID="button-md">Medium</Button>,
    );
    const views = UNSAFE_getAllByType(View);
    const container = views.find((v) => {
      const style = StyleSheet.flatten(v.props.style);
      return style && style.paddingHorizontal === 16 && style.minHeight === 40;
    });
    expect(container).toBeTruthy();
  });

  test("applies large size styles", () => {
    const { UNSAFE_getAllByType } = render(
      <Button size="lg" testID="button-lg">
        Large
      </Button>,
    );
    const views = UNSAFE_getAllByType(View);
    const container = views.find((v) => {
      const style = StyleSheet.flatten(v.props.style);
      return style && style.paddingHorizontal === 20 && style.minHeight === 48;
    });
    expect(container).toBeTruthy();
  });

  test("applies icon size circular shape", () => {
    const { UNSAFE_getAllByType } = render(
      <Button size="icon" testID="button-icon">
        ❤️
      </Button>,
    );
    const views = UNSAFE_getAllByType(View);
    const container = views.find((v) => {
      const style = StyleSheet.flatten(v.props.style);
      return (
        style &&
        style.width === 40 &&
        style.height === 40 &&
        style.borderRadius === 20
      );
    });
    expect(container).toBeTruthy();
  });

  test("renders iconLeft correctly", () => {
    const IconLeft = <View testID="icon-left" />;
    const { getByTestId, getByText } = render(
      <Button iconLeft={IconLeft}>Button Text</Button>,
    );
    expect(getByTestId("icon-left")).toBeTruthy();
    expect(getByText("Button Text")).toBeTruthy();
  });

  test("renders iconRight correctly", () => {
    const IconRight = <View testID="icon-right" />;
    const { getByTestId, getByText } = render(
      <Button iconRight={IconRight}>Button Text</Button>,
    );
    expect(getByText("Button Text")).toBeTruthy();
    expect(getByTestId("icon-right")).toBeTruthy();
  });

  test("renders both iconLeft and iconRight with text", () => {
    const IconLeft = <View testID="icon-left" />;
    const IconRight = <View testID="icon-right" />;
    const { getByText, getByTestId } = render(
      <Button iconLeft={IconLeft} iconRight={IconRight}>
        Button Text
      </Button>,
    );
    expect(getByTestId("icon-left")).toBeTruthy();
    expect(getByText("Button Text")).toBeTruthy();
    expect(getByTestId("icon-right")).toBeTruthy();
  });

  test("icon button renders children directly", () => {
    const { getByText } = render(<Button size="icon">❤️</Button>);
    expect(getByText("❤️")).toBeTruthy();
  });

  test("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Button onPress={onPressMock}>Press Me</Button>,
    );
    fireEvent.press(getByRole("button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Button onPress={onPressMock} disabled>
        Disabled
      </Button>,
    );
    fireEvent.press(getByRole("button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  test("does not call onPress when loading", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Button onPress={onPressMock} loading>
        Loading
      </Button>,
    );
    fireEvent.press(getByRole("button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  test("shows ActivityIndicator when loading", () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button loading>Loading</Button>,
    );
    expect(queryByText("Loading")).toBeNull();
    expect(UNSAFE_getByType("ActivityIndicator")).toBeTruthy();
  });

  test("hides icons when loading", () => {
    const IconLeft = <View testID="icon-left" />;
    const IconRight = <View testID="icon-right" />;
    const { queryByTestId, UNSAFE_getByType } = render(
      <Button iconLeft={IconLeft} iconRight={IconRight} loading>
        Loading
      </Button>,
    );
    expect(queryByTestId("icon-left")).toBeNull();
    expect(queryByTestId("icon-right")).toBeNull();
    expect(UNSAFE_getByType("ActivityIndicator")).toBeTruthy();
  });

  test("applies disabled styles", () => {
    const { UNSAFE_getAllByType } = render(<Button disabled>Disabled</Button>);
    const views = UNSAFE_getAllByType(View);
    const disabledView = views.find((v) => {
      const style = StyleSheet.flatten(v.props.style);
      return style && style.opacity === 0.5;
    });
    expect(disabledView).toBeTruthy();
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getAllByType } = render(
      <Button style={{ backgroundColor: "red" }}>Custom</Button>,
    );
    const views = UNSAFE_getAllByType(View);
    const styledView = views.find((v) => {
      const style = StyleSheet.flatten(v.props.style);
      return style && style.backgroundColor === "red";
    });
    expect(styledView).toBeTruthy();
  });

  test("forwards accessibility props", () => {
    const { getByRole } = render(
      <Button accessibilityLabel="Custom Button">Button</Button>,
    );
    const button = getByRole("button");
    expect(button.props.accessibilityLabel).toBe("Custom Button");
  });

  test("sets accessibilityRole to button", () => {
    const { getByRole } = render(<Button>Button</Button>);
    const button = getByRole("button");
    expect(button.props.accessibilityRole).toBe("button");
  });

  test("sets accessibilityState disabled when disabled", () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    const button = getByRole("button");
    expect(button.props.accessibilityState).toMatchObject({ disabled: true });
  });

  test("sets accessibilityState busy when loading", () => {
    const { getByRole } = render(<Button loading>Loading</Button>);
    const button = getByRole("button");
    expect(button.props.accessibilityState).toMatchObject({ busy: true });
  });

  test("handles size none with no padding", () => {
    const { getByRole } = render(
      <Button size="none" testID="button-none">
        None
      </Button>,
    );
    const button = getByRole("button");
    expect(button).toBeTruthy();
  });
});
