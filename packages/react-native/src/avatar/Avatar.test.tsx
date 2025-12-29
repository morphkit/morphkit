import { render, fireEvent } from "@testing-library/react-native";
import { Avatar } from "./Avatar";

describe("<Avatar />", () => {
  test("renders with image source", () => {
    const { UNSAFE_getByType } = render(
      <Avatar source={{ uri: "https://example.com/avatar.jpg" }} />,
    );
    expect(UNSAFE_getByType("Image")).toBeTruthy();
  });

  test("renders fallback text when no source", () => {
    const { getByText } = render(<Avatar fallback="JD" />);
    expect(getByText("JD")).toBeTruthy();
  });

  test("applies small size styles", () => {
    const { getByRole } = render(<Avatar fallback="AB" size="sm" />);
    const button = getByRole("imagebutton");
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: 32, height: 32, borderRadius: 16 }),
      ]),
    );
  });

  test("applies medium size by default", () => {
    const { getByRole } = render(<Avatar fallback="AB" />);
    const button = getByRole("imagebutton");
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: 40, height: 40, borderRadius: 20 }),
      ]),
    );
  });

  test("applies large size styles", () => {
    const { getByRole } = render(<Avatar fallback="AB" size="lg" />);
    const button = getByRole("imagebutton");
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: 48, height: 48, borderRadius: 24 }),
      ]),
    );
  });

  test("shows image when source is provided", () => {
    const { UNSAFE_getByType, queryByText } = render(
      <Avatar
        source={{ uri: "https://example.com/avatar.jpg" }}
        fallback="JD"
      />,
    );
    expect(UNSAFE_getByType("Image")).toBeTruthy();
    expect(queryByText("JD")).toBeNull();
  });

  test("shows fallback text when source is undefined", () => {
    const { getByText, UNSAFE_queryByType } = render(<Avatar fallback="JD" />);
    expect(getByText("JD")).toBeTruthy();
    expect(UNSAFE_queryByType("Image")).toBeNull();
  });

  test("applies circular border radius", () => {
    const { getByRole } = render(<Avatar fallback="AB" size="md" />);
    const button = getByRole("imagebutton");
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderRadius: 20 })]),
    );
  });

  test("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Avatar fallback="AB" onPress={onPressMock} />,
    );
    fireEvent.press(getByRole("imagebutton"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test("applies pressed opacity", () => {
    const { getByRole } = render(<Avatar fallback="AB" />);
    const button = getByRole("imagebutton");
    const container = button.props.children({ pressed: true });
    expect(container.props.style).toEqual(
      expect.arrayContaining([{ opacity: 0.8 }]),
    );
  });

  test("merges custom style prop", () => {
    const { getByRole } = render(
      <Avatar fallback="AB" style={{ backgroundColor: "red" }} />,
    );
    const button = getByRole("imagebutton");
    const container = button.props.children({ pressed: false });
    expect(container.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: "red" }]),
    );
  });

  test("forwards PressableProps", () => {
    const { getByRole } = render(
      <Avatar fallback="AB" accessibilityLabel="User Avatar" />,
    );
    const button = getByRole("imagebutton");
    expect(button.props.accessibilityLabel).toBe("User Avatar");
  });

  test("sets accessibilityRole to imagebutton", () => {
    const { getByRole } = render(<Avatar fallback="AB" />);
    const button = getByRole("imagebutton");
    expect(button.props.accessibilityRole).toBe("imagebutton");
  });

  test("applies light theme colors to fallback", () => {
    const { getByText } = render(<Avatar fallback="JD" />);
    const text = getByText("JD");
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: "#333333" })]),
    );
  });

  test("renders empty fallback when no text provided", () => {
    const { getByRole } = render(<Avatar />);
    const button = getByRole("imagebutton");
    expect(button).toBeTruthy();
  });
});
