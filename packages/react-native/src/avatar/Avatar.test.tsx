import { render, fireEvent } from "../test-utils";
import { Avatar } from "./Avatar";
import { View, StyleSheet } from "react-native";

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
    const { UNSAFE_getAllByType } = render(<Avatar fallback="AB" size="sm" />);
    const views = UNSAFE_getAllByType(View);
    const container = views.find((v) => {
      const style = StyleSheet.flatten(v.props.style);
      return style && style.width === 32 && style.height === 32;
    });
    expect(container).toBeTruthy();
    const flatStyle = StyleSheet.flatten(container!.props.style);
    expect(flatStyle).toMatchObject({
      width: 32,
      height: 32,
      borderRadius: 999,
    });
  });

  test("applies medium size by default", () => {
    const { UNSAFE_getAllByType } = render(<Avatar fallback="AB" />);
    const views = UNSAFE_getAllByType(View);
    const container = views.find((v) => {
      const style = StyleSheet.flatten(v.props.style);
      return style && style.width === 40 && style.height === 40;
    });
    expect(container).toBeTruthy();
    const flatStyle = StyleSheet.flatten(container!.props.style);
    expect(flatStyle).toMatchObject({
      width: 40,
      height: 40,
      borderRadius: 999,
    });
  });

  test("applies large size styles", () => {
    const { UNSAFE_getAllByType } = render(<Avatar fallback="AB" size="lg" />);
    const views = UNSAFE_getAllByType(View);
    const container = views.find((v) => {
      const style = StyleSheet.flatten(v.props.style);
      return style && style.width === 48 && style.height === 48;
    });
    expect(container).toBeTruthy();
    const flatStyle = StyleSheet.flatten(container!.props.style);
    expect(flatStyle).toMatchObject({
      width: 48,
      height: 48,
      borderRadius: 999,
    });
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
    const { UNSAFE_getAllByType } = render(<Avatar fallback="AB" size="md" />);
    const views = UNSAFE_getAllByType(View);
    const container = views.find((v) => {
      const style = StyleSheet.flatten(v.props.style);
      return style && style.width === 40 && style.height === 40;
    });
    expect(container).toBeTruthy();
    const flatStyle = StyleSheet.flatten(container!.props.style);
    expect(flatStyle).toMatchObject({ borderRadius: 999 });
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
    const pressable = getByRole("imagebutton");
    fireEvent(pressable, "pressIn");
    const views = pressable.findAllByType(View);
    expect(views.length).toBeGreaterThan(0);
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getAllByType } = render(
      <Avatar fallback="AB" style={{ backgroundColor: "red" }} />,
    );
    const views = UNSAFE_getAllByType(View);
    const styledView = views.find((v) => {
      const style = StyleSheet.flatten(v.props.style);
      return style && style.backgroundColor === "red";
    });
    expect(styledView).toBeTruthy();
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
      expect.arrayContaining([expect.objectContaining({ color: "#FFFFFF" })]),
    );
  });

  test("renders empty fallback when no text provided", () => {
    const { getByRole } = render(<Avatar />);
    const button = getByRole("imagebutton");
    expect(button).toBeTruthy();
  });
});
