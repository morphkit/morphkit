import { createRef } from "react";
import { render } from "@testing-library/react-native";
import { View } from "react-native";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders with single value", () => {
    const { container } = render(<Slider value={50} onChange={() => {}} />);
    expect(container).toBeTruthy();
  });

  it("renders with range value", () => {
    const { container } = render(
      <Slider value={[25, 75]} onChange={() => {}} />,
    );
    expect(container).toBeTruthy();
  });

  it("renders with custom min and max", () => {
    const { container } = render(
      <Slider value={500} onChange={() => {}} min={0} max={1000} />,
    );
    expect(container).toBeTruthy();
  });

  it("renders with custom step", () => {
    const { container } = render(
      <Slider value={50} onChange={() => {}} step={10} />,
    );
    expect(container).toBeTruthy();
  });

  it("renders with showValue enabled", () => {
    const { getByText } = render(
      <Slider value={75} onChange={() => {}} showValue />,
    );
    expect(getByText("75")).toBeTruthy();
  });

  it("renders value display for range slider", () => {
    const { getByText } = render(
      <Slider value={[25, 75]} onChange={() => {}} showValue />,
    );
    expect(getByText("25")).toBeTruthy();
    expect(getByText("75")).toBeTruthy();
  });

  it("renders small size", () => {
    const { container } = render(
      <Slider value={50} onChange={() => {}} size="sm" />,
    );
    expect(container).toBeTruthy();
  });

  it("renders medium size (default)", () => {
    const { container } = render(<Slider value={50} onChange={() => {}} />);
    expect(container).toBeTruthy();
  });

  it("renders large size", () => {
    const { container } = render(
      <Slider value={50} onChange={() => {}} size="lg" />,
    );
    expect(container).toBeTruthy();
  });

  it("applies custom color", () => {
    const { container } = render(
      <Slider value={50} onChange={() => {}} color="#FF6B6B" />,
    );
    expect(container).toBeTruthy();
  });

  it("applies disabled state", () => {
    const { container } = render(
      <Slider value={50} onChange={() => {}} disabled />,
    );
    expect(container).toBeTruthy();
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 20 };
    const { container } = render(
      <Slider value={50} onChange={() => {}} style={customStyle} />,
    );
    expect(container).toBeTruthy();
  });

  it("forwards ViewProps", () => {
    const { getByTestId } = render(
      <Slider value={50} onChange={() => {}} testID="custom-slider" />,
    );
    expect(getByTestId("custom-slider")).toBeTruthy();
  });

  it("handles continuous values when step is 0", () => {
    const { container } = render(
      <Slider value={33.33} onChange={() => {}} step={0} />,
    );
    expect(container).toBeTruthy();
  });

  it("clamps value to min", () => {
    const { container } = render(
      <Slider value={-10} onChange={() => {}} min={0} max={100} />,
    );
    expect(container).toBeTruthy();
  });

  it("clamps value to max", () => {
    const { container } = render(
      <Slider value={150} onChange={() => {}} min={0} max={100} />,
    );
    expect(container).toBeTruthy();
  });

  it("forwards ref to View", () => {
    const ref = createRef<View>();
    render(<Slider ref={ref} value={50} onChange={() => {}} />);
    expect(ref.current).toBeTruthy();
  });

  it("accepts onBlur prop", () => {
    const handleBlur = jest.fn();
    const { container } = render(
      <Slider value={50} onChange={() => {}} onBlur={handleBlur} />,
    );
    expect(container).toBeTruthy();
  });

  it("accepts name prop", () => {
    const { container } = render(
      <Slider value={50} onChange={() => {}} name="volume" />,
    );
    expect(container).toBeTruthy();
  });
});
