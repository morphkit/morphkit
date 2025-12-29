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
    expect(element.props.style).toMatchObject({
      color: "#FFFFFF",
    });
  });

  test("applies secondary variant styles", () => {
    const { getByText } = render(
      <Button variant="secondary">Secondary</Button>,
    );
    const element = getByText("Secondary");
    expect(element.props.style).toMatchObject({
      color: "#333333",
    });
  });

  test("applies tonal variant styles", () => {
    const { getByText } = render(<Button variant="tonal">Tonal</Button>);
    const element = getByText("Tonal");
    expect(element.props.style).toMatchObject({
      color: "#1565C0",
    });
  });

  test("applies plain variant styles", () => {
    const { getByText } = render(<Button variant="plain">Plain</Button>);
    const element = getByText("Plain");
    expect(element.props.style).toMatchObject({
      color: "#4A90E2",
    });
  });

  test("applies small size styles", () => {
    const { getByRole } = render(
      <Button size="sm" testID="button-sm">
        Small
      </Button>,
    );
    const button = getByRole("button");
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          paddingHorizontal: 12,
          paddingVertical: 6,
          minHeight: 32,
          gap: 6,
        }),
      ]),
    );
  });

  test("applies medium size styles by default", () => {
    const { getByRole } = render(<Button testID="button-md">Medium</Button>);
    const button = getByRole("button");
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          paddingHorizontal: 16,
          paddingVertical: 10,
          minHeight: 40,
          gap: 8,
        }),
      ]),
    );
  });

  test("applies large size styles", () => {
    const { getByRole } = render(
      <Button size="lg" testID="button-lg">
        Large
      </Button>,
    );
    const button = getByRole("button");
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          paddingHorizontal: 20,
          paddingVertical: 14,
          minHeight: 48,
          gap: 10,
        }),
      ]),
    );
  });

  test("applies icon size circular shape", () => {
    const { getByRole } = render(
      <Button size="icon" testID="button-icon">
        ❤️
      </Button>,
    );
    const button = getByRole("button");
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 40,
          height: 40,
          borderRadius: 20,
        }),
      ]),
    );
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
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    const button = getByRole("button");
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          opacity: 0.5,
        }),
      ]),
    );
  });

  test("merges custom style prop", () => {
    const { getByRole } = render(
      <Button style={{ backgroundColor: "red" }}>Custom</Button>,
    );
    const button = getByRole("button");
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: "red" }]),
    );
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
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({})]),
    );
  });
});
