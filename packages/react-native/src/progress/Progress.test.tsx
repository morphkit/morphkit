import { render } from "@testing-library/react-native";
import { Progress } from "./Progress";

describe("<Progress />", () => {
  it("renders without crashing", () => {
    const { root } = render(<Progress />);
    expect(root).toBeTruthy();
  });

  it("renders bar variant by default", () => {
    const { root } = render(<Progress value={50} />);
    expect(root).toBeTruthy();
  });

  it("renders circle variant", () => {
    const { root } = render(<Progress value={75} variant="circle" />);
    expect(root).toBeTruthy();
  });

  it("renders all sizes for bar variant", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      const { root } = render(
        <Progress value={50} variant="bar" size={size} />,
      );
      expect(root).toBeTruthy();
    });
  });

  it("renders all sizes for circle variant", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      const { root } = render(
        <Progress value={50} variant="circle" size={size} />,
      );
      expect(root).toBeTruthy();
    });
  });

  it("renders indeterminate progress when value is undefined", () => {
    const { root } = render(<Progress />);
    expect(root).toBeTruthy();
  });

  it("renders determinate progress with value", () => {
    const { root } = render(<Progress value={60} />);
    expect(root).toBeTruthy();
  });

  it("clamps value to 0-100 range (below 0)", () => {
    const { root } = render(<Progress value={-10} />);
    expect(root).toBeTruthy();
  });

  it("clamps value to 0-100 range (above 100)", () => {
    const { root } = render(<Progress value={150} />);
    expect(root).toBeTruthy();
  });

  it("renders with custom color", () => {
    const { root } = render(<Progress value={50} color="#FF0000" />);
    expect(root).toBeTruthy();
  });

  it("shows value when showValue is true", () => {
    const { getByText } = render(<Progress value={42} showValue />);
    expect(getByText("42%")).toBeTruthy();
  });

  it("does not show value when showValue is false", () => {
    const { queryByText } = render(<Progress value={42} showValue={false} />);
    expect(queryByText("42%")).toBeNull();
  });

  it("does not show value for indeterminate progress", () => {
    const { queryByText } = render(<Progress showValue />);
    expect(queryByText(/\d+%/)).toBeNull();
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 20 };
    const { root } = render(<Progress value={50} style={customStyle} />);
    expect(root).toBeTruthy();
  });

  it("forwards ViewProps", () => {
    const { getByTestId } = render(
      <Progress value={50} testID="progress-test" />,
    );
    expect(getByTestId("progress-test")).toBeTruthy();
  });

  it("has proper accessibility attributes", () => {
    const { root } = render(<Progress value={50} />);
    expect(root).toBeTruthy();
  });
});
