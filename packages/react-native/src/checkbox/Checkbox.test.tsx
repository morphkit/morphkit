import { createRef } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text, View } from "react-native";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders unchecked checkbox", () => {
    const { getByRole } = render(
      <Checkbox checked={false} onChange={() => {}} />,
    );
    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeTruthy();
    expect(checkbox.props.accessibilityState.checked).toBe(false);
  });

  it("renders checked checkbox", () => {
    const { getByRole } = render(
      <Checkbox checked={true} onChange={() => {}} />,
    );
    const checkbox = getByRole("checkbox");
    expect(checkbox.props.accessibilityState.checked).toBe(true);
  });

  it("renders with children", () => {
    const { getByText } = render(
      <Checkbox checked={false} onChange={() => {}}>
        <Text>Accept terms</Text>
      </Checkbox>,
    );
    expect(getByText("Accept terms")).toBeTruthy();
  });

  it("calls onChange when pressed", () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Checkbox checked={false} onChange={handleChange} />,
    );

    fireEvent.press(getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("toggles from checked to unchecked", () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Checkbox checked={true} onChange={handleChange} />,
    );

    fireEvent.press(getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("calls onBlur when press ends", () => {
    const handleBlur = jest.fn();
    const { getByRole } = render(
      <Checkbox checked={false} onChange={() => {}} onBlur={handleBlur} />,
    );

    fireEvent(getByRole("checkbox"), "pressOut");
    expect(handleBlur).toHaveBeenCalled();
  });

  it("forwards ref to View", () => {
    const ref = createRef<View>();
    render(<Checkbox ref={ref} checked={false} onChange={() => {}} />);
    expect(ref.current).toBeTruthy();
  });

  it("accepts name prop", () => {
    const { getByRole } = render(
      <Checkbox checked={false} onChange={() => {}} name="terms" />,
    );
    expect(getByRole("checkbox")).toBeTruthy();
  });

  it("renders indeterminate state", () => {
    const { getByRole } = render(
      <Checkbox checked={false} indeterminate={true} onChange={() => {}} />,
    );
    expect(getByRole("checkbox")).toBeTruthy();
  });

  it("does not call onChange when disabled", () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Checkbox checked={false} onChange={handleChange} disabled />,
    );

    fireEvent.press(getByRole("checkbox"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("applies disabled accessibility state", () => {
    const { getByRole } = render(
      <Checkbox checked={false} onChange={() => {}} disabled />,
    );
    expect(getByRole("checkbox").props.accessibilityState.disabled).toBe(true);
  });

  it("renders small size", () => {
    const { getByRole } = render(
      <Checkbox checked={false} onChange={() => {}} size="sm" />,
    );
    expect(getByRole("checkbox")).toBeTruthy();
  });

  it("renders medium size (default)", () => {
    const { getByRole } = render(
      <Checkbox checked={false} onChange={() => {}} />,
    );
    expect(getByRole("checkbox")).toBeTruthy();
  });

  it("renders large size", () => {
    const { getByRole } = render(
      <Checkbox checked={false} onChange={() => {}} size="lg" />,
    );
    expect(getByRole("checkbox")).toBeTruthy();
  });

  it("applies custom color", () => {
    const { getByRole } = render(
      <Checkbox checked={true} onChange={() => {}} color="#FF0000" />,
    );
    expect(getByRole("checkbox")).toBeTruthy();
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 10 };
    const { getByRole } = render(
      <Checkbox checked={false} onChange={() => {}} style={customStyle} />,
    );
    expect(getByRole("checkbox")).toBeTruthy();
  });

  it("forwards ViewProps", () => {
    const { getByRole } = render(
      <Checkbox checked={false} onChange={() => {}} testID="custom-checkbox" />,
    );
    expect(getByRole("checkbox").props.testID).toBe("custom-checkbox");
  });
});
