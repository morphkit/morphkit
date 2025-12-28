import { render } from "@testing-library/react-native";
import { Typography } from "./Typography";

describe("<Typography />", () => {
  test("renders children correctly", () => {
    const { getByText } = render(<Typography>Hello World</Typography>);
    expect(getByText("Hello World")).toBeTruthy();
  });

  test("applies red color style", () => {
    const { getByText } = render(<Typography>Red Text</Typography>);
    const element = getByText("Red Text");
    expect(element.props.style).toContainEqual({ color: "red" });
  });

  test("accepts additional TextProps", () => {
    const { getByText } = render(
      <Typography numberOfLines={1}>Long text</Typography>,
    );
    const element = getByText("Long text");
    expect(element.props.numberOfLines).toBe(1);
  });

  test("merges custom styles with default red color", () => {
    const { getByText } = render(
      <Typography style={{ fontSize: 20 }}>Styled Text</Typography>,
    );
    const element = getByText("Styled Text");
    expect(element.props.style).toContainEqual({ color: "red" });
    expect(element.props.style).toContainEqual({ fontSize: 20 });
  });
});
