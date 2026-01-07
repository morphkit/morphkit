import { createRef } from "react";
import { render, fireEvent } from "../test-utils";
import { Text, View } from "react-native";
import { Select, SelectOption } from "./Select";

describe("Select", () => {
  describe("Select (parent)", () => {
    it("renders children", () => {
      const { getByText } = render(
        <Select value="" onChange={() => {}}>
          <SelectOption value="opt1">
            <Text>Option 1</Text>
          </SelectOption>
          <SelectOption value="opt2">
            <Text>Option 2</Text>
          </SelectOption>
        </Select>,
      );
      expect(getByText("Option 1")).toBeTruthy();
      expect(getByText("Option 2")).toBeTruthy();
    });

    it("provides value to context", () => {
      const { getAllByRole } = render(
        <Select value="opt2" onChange={() => {}}>
          <SelectOption value="opt1">
            <Text>Option 1</Text>
          </SelectOption>
          <SelectOption value="opt2">
            <Text>Option 2</Text>
          </SelectOption>
        </Select>,
      );
      const options = getAllByRole("radio");
      expect(options[0].props.accessibilityState.checked).toBe(false);
      expect(options[1].props.accessibilityState.checked).toBe(true);
    });

    it("calls onChange when option is pressed", () => {
      const handleChange = jest.fn();
      const { getAllByRole } = render(
        <Select value="opt1" onChange={handleChange}>
          <SelectOption value="opt1">
            <Text>Option 1</Text>
          </SelectOption>
          <SelectOption value="opt2">
            <Text>Option 2</Text>
          </SelectOption>
        </Select>,
      );

      fireEvent.press(getAllByRole("radio")[1]);
      expect(handleChange).toHaveBeenCalledWith("opt2");
    });

    it("disables all options when disabled", () => {
      const { getAllByRole } = render(
        <Select value="opt1" onChange={() => {}} disabled>
          <SelectOption value="opt1">
            <Text>Option 1</Text>
          </SelectOption>
          <SelectOption value="opt2">
            <Text>Option 2</Text>
          </SelectOption>
        </Select>,
      );
      const options = getAllByRole("radio");
      expect(options[0].props.accessibilityState.disabled).toBe(true);
      expect(options[1].props.accessibilityState.disabled).toBe(true);
    });

    it("supports single selection mode", () => {
      const handleChange = jest.fn();
      const { getAllByRole } = render(
        <Select value="opt1" onChange={handleChange}>
          <SelectOption value="opt1">
            <Text>Option 1</Text>
          </SelectOption>
          <SelectOption value="opt2">
            <Text>Option 2</Text>
          </SelectOption>
        </Select>,
      );

      fireEvent.press(getAllByRole("radio")[1]);
      expect(handleChange).toHaveBeenCalledWith("opt2");
    });

    it("supports multiple selection mode", () => {
      const handleChange = jest.fn();
      const { getAllByRole } = render(
        <Select value={["opt1"]} onChange={handleChange} multiple>
          <SelectOption value="opt1">
            <Text>Option 1</Text>
          </SelectOption>
          <SelectOption value="opt2">
            <Text>Option 2</Text>
          </SelectOption>
        </Select>,
      );

      fireEvent.press(getAllByRole("radio")[1]);
      expect(handleChange).toHaveBeenCalledWith(["opt1", "opt2"]);
    });

    it("forwards ViewProps", () => {
      const { getByTestId } = render(
        <Select value="" onChange={() => {}} testID="custom-select">
          <SelectOption value="opt1">
            <Text>Option 1</Text>
          </SelectOption>
        </Select>,
      );
      expect(getByTestId("custom-select")).toBeTruthy();
    });

    it("calls onBlur when option press ends", () => {
      const handleBlur = jest.fn();
      const { getAllByRole } = render(
        <Select value="opt1" onChange={() => {}} onBlur={handleBlur}>
          <SelectOption value="opt1">
            <Text>Option 1</Text>
          </SelectOption>
          <SelectOption value="opt2">
            <Text>Option 2</Text>
          </SelectOption>
        </Select>,
      );

      fireEvent(getAllByRole("radio")[0], "pressOut");
      expect(handleBlur).toHaveBeenCalled();
    });

    it("accepts name prop", () => {
      const { getAllByRole } = render(
        <Select value="opt1" onChange={() => {}} name="preference">
          <SelectOption value="opt1">
            <Text>Option 1</Text>
          </SelectOption>
        </Select>,
      );
      expect(getAllByRole("radio")[0]).toBeTruthy();
    });
  });

  describe("SelectOption", () => {
    it("renders with children", () => {
      const { getByText } = render(
        <Select value="" onChange={() => {}}>
          <SelectOption value="test">
            <Text>Test Option</Text>
          </SelectOption>
        </Select>,
      );
      expect(getByText("Test Option")).toBeTruthy();
    });

    it("renders without children", () => {
      const { getByRole } = render(
        <Select value="" onChange={() => {}}>
          <SelectOption value="test" />
        </Select>,
      );
      expect(getByRole("radio")).toBeTruthy();
    });

    it("shows selected state when value matches (single mode)", () => {
      const { getByRole } = render(
        <Select value="selected" onChange={() => {}}>
          <SelectOption value="selected">
            <Text>Selected</Text>
          </SelectOption>
        </Select>,
      );
      expect(getByRole("radio").props.accessibilityState.checked).toBe(true);
    });

    it("shows selected state when value in array (multiple mode)", () => {
      const { getByRole } = render(
        <Select value={["opt1", "opt2"]} onChange={() => {}} multiple>
          <SelectOption value="opt2">
            <Text>Option 2</Text>
          </SelectOption>
        </Select>,
      );
      expect(getByRole("radio").props.accessibilityState.checked).toBe(true);
    });

    it("shows unselected state when value does not match", () => {
      const { getByRole } = render(
        <Select value="other" onChange={() => {}}>
          <SelectOption value="unselected">
            <Text>Unselected</Text>
          </SelectOption>
        </Select>,
      );
      expect(getByRole("radio").props.accessibilityState.checked).toBe(false);
    });

    it("toggles selection in multiple mode", () => {
      const handleChange = jest.fn();
      const { getByRole } = render(
        <Select value={["opt1", "opt2"]} onChange={handleChange} multiple>
          <SelectOption value="opt2">
            <Text>Option 2</Text>
          </SelectOption>
        </Select>,
      );

      fireEvent.press(getByRole("radio"));
      expect(handleChange).toHaveBeenCalledWith(["opt1"]);
    });

    it("adds selection in multiple mode when not selected", () => {
      const handleChange = jest.fn();
      const { getByRole } = render(
        <Select value={["opt1"]} onChange={handleChange} multiple>
          <SelectOption value="opt2">
            <Text>Option 2</Text>
          </SelectOption>
        </Select>,
      );

      fireEvent.press(getByRole("radio"));
      expect(handleChange).toHaveBeenCalledWith(["opt1", "opt2"]);
    });

    it("replaces selection in single mode", () => {
      const handleChange = jest.fn();
      const { getAllByRole } = render(
        <Select value="opt1" onChange={handleChange}>
          <SelectOption value="opt1">
            <Text>Option 1</Text>
          </SelectOption>
          <SelectOption value="opt2">
            <Text>Option 2</Text>
          </SelectOption>
        </Select>,
      );

      fireEvent.press(getAllByRole("radio")[1]);
      expect(handleChange).toHaveBeenCalledWith("opt2");
    });

    it("can be individually disabled", () => {
      const handleChange = jest.fn();
      const { getByRole } = render(
        <Select value="opt1" onChange={handleChange}>
          <SelectOption value="opt2" disabled>
            <Text>Disabled</Text>
          </SelectOption>
        </Select>,
      );

      fireEvent.press(getByRole("radio"));
      expect(handleChange).not.toHaveBeenCalled();
      expect(getByRole("radio").props.accessibilityState.disabled).toBe(true);
    });

    it("applies custom styles", () => {
      const customStyle = { marginTop: 10 };
      const { getByRole } = render(
        <Select value="" onChange={() => {}}>
          <SelectOption value="test" style={customStyle}>
            <Text>Test</Text>
          </SelectOption>
        </Select>,
      );
      expect(getByRole("radio")).toBeTruthy();
    });

    it("forwards ViewProps", () => {
      const { getByTestId } = render(
        <Select value="" onChange={() => {}}>
          <SelectOption value="test" testID="custom-option">
            <Text>Test</Text>
          </SelectOption>
        </Select>,
      );
      expect(getByTestId("custom-option")).toBeTruthy();
    });

    it("forwards ref to View", () => {
      const ref = createRef<View>();
      render(
        <Select value="" onChange={() => {}}>
          <SelectOption ref={ref} value="test" />
        </Select>,
      );
      expect(ref.current).toBeTruthy();
    });

    it("calls option-level onBlur when press ends", () => {
      const handleBlur = jest.fn();
      const { getByRole } = render(
        <Select value="" onChange={() => {}}>
          <SelectOption value="test" onBlur={handleBlur} />
        </Select>,
      );

      fireEvent(getByRole("radio"), "pressOut");
      expect(handleBlur).toHaveBeenCalled();
    });

    it("accepts name prop", () => {
      const { getByRole } = render(
        <Select value="" onChange={() => {}}>
          <SelectOption value="test" name="option" />
        </Select>,
      );
      expect(getByRole("radio")).toBeTruthy();
    });

    it("throws error when used outside Select", () => {
      const consoleError = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => {
        render(<SelectOption value="test" />);
      }).toThrow("SelectOption must be used within Select");
      consoleError.mockRestore();
    });
  });
});
