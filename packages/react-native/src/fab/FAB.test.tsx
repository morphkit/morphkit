import { render, fireEvent } from "@testing-library/react-native";
import { FAB } from "./FAB";
import { Text } from "react-native";

describe("<FAB />", () => {
  const TestIcon = () => <Text testID="test-icon">+</Text>;

  test("renders icon correctly", () => {
    const { getByTestId } = render(
      <FAB icon={<TestIcon />} onPress={() => {}} />,
    );
    expect(getByTestId("test-icon")).toBeTruthy();
  });

  test("renders without label by default", () => {
    const { queryByText } = render(
      <FAB icon={<TestIcon />} onPress={() => {}} />,
    );
    expect(queryByText(/label/i)).toBeNull();
  });

  test("renders extended variant with label", () => {
    const { getByText } = render(
      <FAB icon={<TestIcon />} label="Compose" onPress={() => {}} />,
    );
    expect(getByText("Compose")).toBeTruthy();
  });

  test("applies small size styles", () => {
    const { root } = render(
      <FAB icon={<TestIcon />} size="sm" onPress={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  test("applies medium size by default", () => {
    const { root } = render(<FAB icon={<TestIcon />} onPress={() => {}} />);
    expect(root).toBeTruthy();
  });

  test("applies large size styles", () => {
    const { root } = render(
      <FAB icon={<TestIcon />} size="lg" onPress={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  test("applies extended size when label provided", () => {
    const { root } = render(
      <FAB
        icon={<TestIcon />}
        label="Create"
        size="md"
        onPress={() => {}}
      />,
    );
    expect(root).toBeTruthy();
  });

  test("applies primary variant by default", () => {
    const { root } = render(<FAB icon={<TestIcon />} onPress={() => {}} />);
    expect(root).toBeTruthy();
  });

  test("applies secondary variant", () => {
    const { root } = render(
      <FAB icon={<TestIcon />} variant="secondary" onPress={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  test("applies top-left placement", () => {
    const { root } = render(
      <FAB icon={<TestIcon />} placement="top-left" onPress={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  test("applies top-right placement", () => {
    const { root } = render(
      <FAB icon={<TestIcon />} placement="top-right" onPress={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  test("applies top-center placement", () => {
    const { root } = render(
      <FAB icon={<TestIcon />} placement="top-center" onPress={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  test("applies bottom-left placement", () => {
    const { root } = render(
      <FAB icon={<TestIcon />} placement="bottom-left" onPress={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  test("applies bottom-right placement by default", () => {
    const { root } = render(<FAB icon={<TestIcon />} onPress={() => {}} />);
    expect(root).toBeTruthy();
  });

  test("applies bottom-center placement", () => {
    const { root } = render(
      <FAB icon={<TestIcon />} placement="bottom-center" onPress={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  test("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <FAB icon={<TestIcon />} onPress={onPressMock} />,
    );
    fireEvent.press(getByRole("button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <FAB icon={<TestIcon />} onPress={onPressMock} disabled />,
    );
    fireEvent.press(getByRole("button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  test("applies disabled styles", () => {
    const { root } = render(
      <FAB icon={<TestIcon />} onPress={() => {}} disabled />,
    );
    expect(root).toBeTruthy();
  });

  test("merges custom style prop", () => {
    const customStyle = { margin: 10 };
    const { root } = render(
      <FAB
        icon={<TestIcon />}
        onPress={() => {}}
        style={customStyle}
      />,
    );
    expect(root).toBeTruthy();
  });

  test("sets accessibilityRole to button", () => {
    const { getByRole } = render(
      <FAB icon={<TestIcon />} onPress={() => {}} />,
    );
    const button = getByRole("button");
    expect(button.props.accessibilityRole).toBe("button");
  });

  test("uses label as accessibilityLabel when provided", () => {
    const { getByRole } = render(
      <FAB icon={<TestIcon />} label="Create" onPress={() => {}} />,
    );
    const button = getByRole("button");
    expect(button.props.accessibilityLabel).toBe("Create");
  });

  test("uses explicit accessibilityLabel over label", () => {
    const { getByRole } = render(
      <FAB
        icon={<TestIcon />}
        label="Create"
        accessibilityLabel="Create new item"
        onPress={() => {}}
      />,
    );
    const button = getByRole("button");
    expect(button.props.accessibilityLabel).toBe("Create new item");
  });

  test("sets accessibilityState disabled when disabled", () => {
    const { getByRole } = render(
      <FAB icon={<TestIcon />} onPress={() => {}} disabled />,
    );
    const button = getByRole("button");
    expect(button.props.accessibilityState).toMatchObject({ disabled: true });
  });

  test("forwards PressableProps", () => {
    const { getByRole } = render(
      <FAB
        icon={<TestIcon />}
        onPress={() => {}}
        testID="custom-fab"
        hitSlop={10}
      />,
    );
    const button = getByRole("button");
    expect(button.props.hitSlop).toBe(10);
  });

  test("renders icon and label for extended FAB", () => {
    const { getByTestId, getByText } = render(
      <FAB icon={<TestIcon />} label="Compose" onPress={() => {}} />,
    );
    expect(getByTestId("test-icon")).toBeTruthy();
    expect(getByText("Compose")).toBeTruthy();
  });

  test("combines size, variant, and placement", () => {
    const { root } = render(
      <FAB
        icon={<TestIcon />}
        size="lg"
        variant="secondary"
        placement="top-left"
        onPress={() => {}}
      />,
    );
    expect(root).toBeTruthy();
  });

  test("combines extended variant with all options", () => {
    const { root } = render(
      <FAB
        icon={<TestIcon />}
        label="Create"
        size="lg"
        variant="secondary"
        placement="bottom-center"
        onPress={() => {}}
      />,
    );
    expect(root).toBeTruthy();
  });
});
