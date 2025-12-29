import { render } from "@testing-library/react-native";
import { Badge } from "./Badge";
import { View, Text } from "react-native";

describe("<Badge />", () => {
  test("renders children correctly", () => {
    const { getByText } = render(
      <Badge count={5}>
        <Text>Icon</Text>
      </Badge>,
    );
    expect(getByText("Icon")).toBeTruthy();
    expect(getByText("5")).toBeTruthy();
  });

  test("displays exact count when below maxCount", () => {
    const { getByText } = render(
      <Badge count={50} maxCount={99}>
        <View testID="child" />
      </Badge>,
    );
    expect(getByText("50")).toBeTruthy();
  });

  test("displays maxCount+ when count exceeds maxCount", () => {
    const { getByText } = render(
      <Badge count={150} maxCount={99}>
        <View testID="child" />
      </Badge>,
    );
    expect(getByText("99+")).toBeTruthy();
  });

  test("displays maxCount+ when count equals maxCount + 1", () => {
    const { getByText } = render(
      <Badge count={100} maxCount={99}>
        <View testID="child" />
      </Badge>,
    );
    expect(getByText("99+")).toBeTruthy();
  });

  test("uses default maxCount of 99", () => {
    const { getByText } = render(
      <Badge count={100}>
        <View testID="child" />
      </Badge>,
    );
    expect(getByText("99+")).toBeTruthy();
  });

  test("does not show badge when count is 0", () => {
    const { queryByText, getByText } = render(
      <Badge count={0}>
        <Text>Icon</Text>
      </Badge>,
    );
    expect(getByText("Icon")).toBeTruthy();
    expect(queryByText("0")).toBeNull();
  });

  test("does not show badge when count is negative", () => {
    const { queryByText } = render(
      <Badge count={-5}>
        <View testID="child" />
      </Badge>,
    );
    expect(queryByText("-5")).toBeNull();
  });

  test("applies red color by default", () => {
    const { getByText } = render(
      <Badge count={5}>
        <View testID="child" />
      </Badge>,
    );
    const badge = getByText("5").parent;
    expect(badge?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: "#EF5350" }),
      ]),
    );
  });

  test("applies blue color when specified", () => {
    const { getByText } = render(
      <Badge count={5} color="blue">
        <View testID="child" />
      </Badge>,
    );
    const badge = getByText("5").parent;
    expect(badge?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: "#4A90E2" }),
      ]),
    );
  });

  test("applies red color when explicitly specified", () => {
    const { getByText } = render(
      <Badge count={5} color="red">
        <View testID="child" />
      </Badge>,
    );
    const badge = getByText("5").parent;
    expect(badge?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: "#EF5350" }),
      ]),
    );
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getByProps } = render(
      <Badge count={5} style={{ marginTop: 10 }}>
        <View testID="child" />
      </Badge>,
    );
    const wrapper = UNSAFE_getByProps({
      accessibilityLabel: "5 notifications",
    });
    expect(wrapper.props.style).toEqual(
      expect.arrayContaining([{ marginTop: 10 }]),
    );
  });

  test("applies absolute positioning to badge", () => {
    const { getByText } = render(
      <Badge count={5}>
        <View testID="child" />
      </Badge>,
    );
    const badge = getByText("5").parent;
    expect(badge?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          position: "absolute",
          top: -6,
          right: -6,
        }),
      ]),
    );
  });

  test("sets accessibility label with count", () => {
    const { UNSAFE_getByProps } = render(
      <Badge count={7}>
        <View testID="child" />
      </Badge>,
    );
    const wrapper = UNSAFE_getByProps({
      accessibilityLabel: "7 notifications",
    });
    expect(wrapper.props.accessibilityLabel).toBe("7 notifications");
  });

  test("does not set accessibility label when badge hidden", () => {
    const { UNSAFE_queryByProps } = render(
      <Badge count={0}>
        <View testID="child" />
      </Badge>,
    );
    const wrapper = UNSAFE_queryByProps({
      accessibilityLabel: "0 notifications",
    });
    expect(wrapper).toBeNull();
  });

  test("handles single digit count", () => {
    const { getByText } = render(
      <Badge count={1}>
        <View testID="child" />
      </Badge>,
    );
    expect(getByText("1")).toBeTruthy();
  });

  test("handles two digit count", () => {
    const { getByText } = render(
      <Badge count={42}>
        <View testID="child" />
      </Badge>,
    );
    expect(getByText("42")).toBeTruthy();
  });

  test("handles large count with small maxCount", () => {
    const { getByText } = render(
      <Badge count={1000} maxCount={9}>
        <View testID="child" />
      </Badge>,
    );
    expect(getByText("9+")).toBeTruthy();
  });
});
