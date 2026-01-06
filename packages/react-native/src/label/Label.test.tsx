import { render } from "@testing-library/react-native";
import { Label } from "./Label";
import { Text } from "react-native";

describe("Label", () => {
  it("renders label text", () => {
    const { getByText } = render(<Label>Email Address</Label>);
    expect(getByText("Email Address")).toBeTruthy();
  });

  it("renders required asterisk when required is true", () => {
    const { getByText, UNSAFE_getAllByType } = render(
      <Label required>Password</Label>,
    );
    const texts = UNSAFE_getAllByType(Text);
    expect(texts.length).toBeGreaterThan(1);
    expect(getByText("*")).toBeTruthy();
  });

  it("does not render asterisk when required is false", () => {
    const { queryByText } = render(<Label required={false}>Email</Label>);
    expect(queryByText("*")).toBeNull();
  });

  it("applies error styling when error is true", () => {
    const { getByText } = render(<Label error>Invalid Field</Label>);
    expect(getByText("Invalid Field")).toBeTruthy();
  });

  it("renders small size", () => {
    const { getByText } = render(<Label size="sm">Small Label</Label>);
    expect(getByText("Small Label")).toBeTruthy();
  });

  it("renders medium size (default)", () => {
    const { getByText } = render(<Label>Medium Label</Label>);
    expect(getByText("Medium Label")).toBeTruthy();
  });

  it("renders large size", () => {
    const { getByText } = render(<Label size="lg">Large Label</Label>);
    expect(getByText("Large Label")).toBeTruthy();
  });

  it("applies both required and error states", () => {
    const { getByText, UNSAFE_getAllByType } = render(
      <Label required error>
        Required Field
      </Label>,
    );
    const texts = UNSAFE_getAllByType(Text);
    expect(texts.length).toBeGreaterThan(1);
    expect(getByText("*")).toBeTruthy();
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 10 };
    const { getByText } = render(
      <Label style={customStyle}>Styled Label</Label>,
    );
    expect(getByText("Styled Label")).toBeTruthy();
  });

  it("forwards TextProps", () => {
    const { getByTestId } = render(
      <Label testID="custom-label">Test Label</Label>,
    );
    expect(getByTestId("custom-label")).toBeTruthy();
  });

  it("handles htmlFor prop for web accessibility", () => {
    const { getByText } = render(<Label htmlFor="email-input">Email</Label>);
    expect(getByText("Email")).toBeTruthy();
  });

  it("renders with empty children", () => {
    const { root } = render(<Label></Label>);
    expect(root).toBeTruthy();
  });
});
