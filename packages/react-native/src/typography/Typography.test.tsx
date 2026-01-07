import { render } from "../test-utils";
import { StyleSheet } from "react-native";
import { Typography } from "./Typography";

describe("<Typography />", () => {
  test("renders children correctly", () => {
    const { getByText } = render(<Typography>Hello World</Typography>);
    expect(getByText("Hello World")).toBeTruthy();
  });

  test("applies default body variant style", () => {
    const { getByText } = render(<Typography>Body Text</Typography>);
    const element = getByText("Body Text");
    const flatStyle = StyleSheet.flatten(element.props.style);
    expect(flatStyle).toMatchObject({
      fontSize: 17,
      fontWeight: "400",
      color: "#111827",
    });
  });

  test("applies large-title variant style", () => {
    const { getByText } = render(
      <Typography variant="large-title">Large Title</Typography>,
    );
    const element = getByText("Large Title");
    const flatStyle = StyleSheet.flatten(element.props.style);
    expect(flatStyle).toMatchObject({
      fontSize: 34,
      fontWeight: "400",
      color: "#111827",
    });
  });

  test("applies caption-2 variant style", () => {
    const { getByText } = render(
      <Typography variant="caption-2">Caption</Typography>,
    );
    const element = getByText("Caption");
    const flatStyle = StyleSheet.flatten(element.props.style);
    expect(flatStyle).toMatchObject({
      fontSize: 11,
      fontWeight: "400",
      color: "#111827",
    });
  });

  test("merges custom style prop", () => {
    const { getByText } = render(
      <Typography variant="heading" style={{ color: "blue" }}>
        Custom Heading
      </Typography>,
    );
    const element = getByText("Custom Heading");
    const flatStyle = StyleSheet.flatten(element.props.style);
    expect(flatStyle).toMatchObject({
      color: "blue",
    });
  });

  test("accepts additional TextProps", () => {
    const { getByText } = render(
      <Typography variant="body" numberOfLines={1}>
        Long text
      </Typography>,
    );
    const element = getByText("Long text");
    expect(element.props.numberOfLines).toBe(1);
  });

  test("supports accessibility props", () => {
    const { getByText } = render(
      <Typography
        variant="title-1"
        accessibilityRole="header"
        accessibilityLabel="Main heading"
      >
        Welcome
      </Typography>,
    );
    const element = getByText("Welcome");
    expect(element.props.accessibilityRole).toBe("header");
    expect(element.props.accessibilityLabel).toBe("Main heading");
  });
});
