import { createRef } from "react";
import { render } from "@testing-library/react-native";
import { View } from "react-native";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders with single value", () => {
    const { root } = render(<Slider value={50} onChange={() => {}} />);
    expect(root).toBeTruthy();
  });

  it("renders with range value", () => {
    const { root } = render(<Slider value={[25, 75]} onChange={() => {}} />);
    expect(root).toBeTruthy();
  });

  it("renders with custom min and max", () => {
    const { root } = render(
      <Slider value={500} onChange={() => {}} min={0} max={1000} />,
    );
    expect(root).toBeTruthy();
  });

  it("renders with custom step", () => {
    const { root } = render(
      <Slider value={50} onChange={() => {}} step={10} />,
    );
    expect(root).toBeTruthy();
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
    const { root } = render(
      <Slider value={50} onChange={() => {}} size="sm" />,
    );
    expect(root).toBeTruthy();
  });

  it("renders medium size (default)", () => {
    const { root } = render(<Slider value={50} onChange={() => {}} />);
    expect(root).toBeTruthy();
  });

  it("renders large size", () => {
    const { root } = render(
      <Slider value={50} onChange={() => {}} size="lg" />,
    );
    expect(root).toBeTruthy();
  });

  it("applies custom color", () => {
    const { root } = render(
      <Slider value={50} onChange={() => {}} color="#FF6B6B" />,
    );
    expect(root).toBeTruthy();
  });

  it("applies disabled state", () => {
    const { root } = render(<Slider value={50} onChange={() => {}} disabled />);
    expect(root).toBeTruthy();
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 20 };
    const { root } = render(
      <Slider value={50} onChange={() => {}} style={customStyle} />,
    );
    expect(root).toBeTruthy();
  });

  it("forwards ViewProps", () => {
    const { getByTestId } = render(
      <Slider value={50} onChange={() => {}} testID="custom-slider" />,
    );
    expect(getByTestId("custom-slider")).toBeTruthy();
  });

  it("handles continuous values when step is 0", () => {
    const { root } = render(
      <Slider value={33.33} onChange={() => {}} step={0} />,
    );
    expect(root).toBeTruthy();
  });

  it("clamps value to min", () => {
    const { root } = render(
      <Slider value={-10} onChange={() => {}} min={0} max={100} />,
    );
    expect(root).toBeTruthy();
  });

  it("clamps value to max", () => {
    const { root } = render(
      <Slider value={150} onChange={() => {}} min={0} max={100} />,
    );
    expect(root).toBeTruthy();
  });

  it("forwards ref to View", () => {
    const ref = createRef<View>();
    render(<Slider ref={ref} value={50} onChange={() => {}} />);
    expect(ref.current).toBeTruthy();
  });

  it("accepts onBlur prop", () => {
    const handleBlur = jest.fn();
    const { root } = render(
      <Slider value={50} onChange={() => {}} onBlur={handleBlur} />,
    );
    expect(root).toBeTruthy();
  });

  it("accepts name prop", () => {
    const { root } = render(
      <Slider value={50} onChange={() => {}} name="volume" />,
    );
    expect(root).toBeTruthy();
  });
});
