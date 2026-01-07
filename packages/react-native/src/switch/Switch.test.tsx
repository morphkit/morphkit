import { createRef } from "react";
import { render, fireEvent } from "../test-utils";
import { View } from "react-native";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders in unchecked state", () => {
    const { getByRole } = render(
      <Switch checked={false} onChange={() => {}} />,
    );
    const switchElement = getByRole("switch");
    expect(switchElement).toBeTruthy();
    expect(switchElement.props.accessibilityState.checked).toBe(false);
  });

  it("renders in checked state", () => {
    const { getByRole } = render(<Switch checked={true} onChange={() => {}} />);
    const switchElement = getByRole("switch");
    expect(switchElement.props.accessibilityState.checked).toBe(true);
  });

  it("renders with label", () => {
    const { getByText } = render(
      <Switch
        checked={false}
        onChange={() => {}}
        label="Enable Notifications"
      />,
    );
    expect(getByText("Enable Notifications")).toBeTruthy();
  });

  it("calls onChange when pressed", () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Switch checked={false} onChange={handleChange} />,
    );

    fireEvent.press(getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("toggles from checked to unchecked", () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Switch checked={true} onChange={handleChange} />,
    );

    fireEvent.press(getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("calls onBlur when press ends", () => {
    const handleBlur = jest.fn();
    const { getByRole } = render(
      <Switch checked={false} onChange={() => {}} onBlur={handleBlur} />,
    );

    fireEvent(getByRole("switch"), "pressOut");
    expect(handleBlur).toHaveBeenCalled();
  });

  it("forwards ref to View", () => {
    const ref = createRef<View>();
    render(<Switch ref={ref} checked={false} onChange={() => {}} />);
    expect(ref.current).toBeTruthy();
  });

  it("accepts name prop", () => {
    const { getByRole } = render(
      <Switch checked={false} onChange={() => {}} name="darkMode" />,
    );
    expect(getByRole("switch")).toBeTruthy();
  });

  it("uses name for accessibilityLabel when label is not provided", () => {
    const { getByRole } = render(
      <Switch checked={false} onChange={() => {}} name="darkMode" />,
    );
    expect(getByRole("switch").props.accessibilityLabel).toBe("darkMode");
  });

  it("prefers label over name for accessibilityLabel", () => {
    const { getByRole } = render(
      <Switch
        checked={false}
        onChange={() => {}}
        name="darkMode"
        label="Dark Mode"
      />,
    );
    expect(getByRole("switch").props.accessibilityLabel).toBe("Dark Mode");
  });

  it("does not call onChange when disabled", () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Switch checked={false} onChange={handleChange} disabled />,
    );

    fireEvent.press(getByRole("switch"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders small size", () => {
    const { getByRole } = render(
      <Switch checked={false} onChange={() => {}} size="sm" />,
    );
    expect(getByRole("switch")).toBeTruthy();
  });

  it("renders medium size (default)", () => {
    const { getByRole } = render(
      <Switch checked={false} onChange={() => {}} />,
    );
    expect(getByRole("switch")).toBeTruthy();
  });

  it("renders large size", () => {
    const { getByRole } = render(
      <Switch checked={false} onChange={() => {}} size="lg" />,
    );
    expect(getByRole("switch")).toBeTruthy();
  });

  it("applies custom color when checked", () => {
    const { getByRole } = render(
      <Switch checked={true} onChange={() => {}} color="#9333EA" />,
    );
    expect(getByRole("switch")).toBeTruthy();
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 10 };
    const { getByRole } = render(
      <Switch checked={false} onChange={() => {}} style={customStyle} />,
    );
    expect(getByRole("switch")).toBeTruthy();
  });

  it("forwards ViewProps", () => {
    const { getByTestId } = render(
      <Switch checked={false} onChange={() => {}} testID="custom-switch" />,
    );
    expect(getByTestId("custom-switch")).toBeTruthy();
  });

  it("sets accessibilityLabel from label prop", () => {
    const { getByRole } = render(
      <Switch checked={false} onChange={() => {}} label="Dark Mode" />,
    );
    expect(getByRole("switch").props.accessibilityLabel).toBe("Dark Mode");
  });
});
