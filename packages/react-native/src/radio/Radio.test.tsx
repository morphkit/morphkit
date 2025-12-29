import { createRef } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text, View } from "react-native";
import { RadioGroup, RadioButton } from "./Radio";

describe("Radio", () => {
  describe("RadioGroup", () => {
    it("renders children", () => {
      const { getByText } = render(
        <RadioGroup value="option1" onChange={() => {}}>
          <RadioButton value="option1">
            <Text>Option 1</Text>
          </RadioButton>
          <RadioButton value="option2">
            <Text>Option 2</Text>
          </RadioButton>
        </RadioGroup>,
      );
      expect(getByText("Option 1")).toBeTruthy();
      expect(getByText("Option 2")).toBeTruthy();
    });

    it("provides value to context", () => {
      const { getAllByRole } = render(
        <RadioGroup value="option2" onChange={() => {}}>
          <RadioButton value="option1">
            <Text>Option 1</Text>
          </RadioButton>
          <RadioButton value="option2">
            <Text>Option 2</Text>
          </RadioButton>
        </RadioGroup>,
      );
      const radios = getAllByRole("radio");
      expect(radios[0].props.accessibilityState.checked).toBe(false);
      expect(radios[1].props.accessibilityState.checked).toBe(true);
    });

    it("calls onChange when radio button is pressed", () => {
      const handleChange = jest.fn();
      const { getAllByRole } = render(
        <RadioGroup value="option1" onChange={handleChange}>
          <RadioButton value="option1">
            <Text>Option 1</Text>
          </RadioButton>
          <RadioButton value="option2">
            <Text>Option 2</Text>
          </RadioButton>
        </RadioGroup>,
      );

      fireEvent.press(getAllByRole("radio")[1]);
      expect(handleChange).toHaveBeenCalledWith("option2");
    });

    it("disables all radio buttons when disabled", () => {
      const { getAllByRole } = render(
        <RadioGroup value="option1" onChange={() => {}} disabled>
          <RadioButton value="option1">
            <Text>Option 1</Text>
          </RadioButton>
          <RadioButton value="option2">
            <Text>Option 2</Text>
          </RadioButton>
        </RadioGroup>,
      );
      const radios = getAllByRole("radio");
      expect(radios[0].props.accessibilityState.disabled).toBe(true);
      expect(radios[1].props.accessibilityState.disabled).toBe(true);
    });

    it("calls onBlur when radio button press ends", () => {
      const handleBlur = jest.fn();
      const { getAllByRole } = render(
        <RadioGroup value="option1" onChange={() => {}} onBlur={handleBlur}>
          <RadioButton value="option1">
            <Text>Option 1</Text>
          </RadioButton>
          <RadioButton value="option2">
            <Text>Option 2</Text>
          </RadioButton>
        </RadioGroup>,
      );

      fireEvent(getAllByRole("radio")[0], "pressOut");
      expect(handleBlur).toHaveBeenCalled();
    });

    it("accepts name prop", () => {
      const { getAllByRole } = render(
        <RadioGroup value="option1" onChange={() => {}} name="preference">
          <RadioButton value="option1">
            <Text>Option 1</Text>
          </RadioButton>
        </RadioGroup>,
      );
      expect(getAllByRole("radio")[0]).toBeTruthy();
    });
  });

  describe("RadioButton", () => {
    it("renders with children", () => {
      const { getByText } = render(
        <RadioGroup value="" onChange={() => {}}>
          <RadioButton value="test">
            <Text>Test Option</Text>
          </RadioButton>
        </RadioGroup>,
      );
      expect(getByText("Test Option")).toBeTruthy();
    });

    it("renders without children", () => {
      const { getByRole } = render(
        <RadioGroup value="" onChange={() => {}}>
          <RadioButton value="test" />
        </RadioGroup>,
      );
      expect(getByRole("radio")).toBeTruthy();
    });

    it("shows selected state when value matches", () => {
      const { getByRole } = render(
        <RadioGroup value="selected" onChange={() => {}}>
          <RadioButton value="selected">
            <Text>Selected</Text>
          </RadioButton>
        </RadioGroup>,
      );
      expect(getByRole("radio").props.accessibilityState.checked).toBe(true);
    });

    it("shows unselected state when value does not match", () => {
      const { getByRole } = render(
        <RadioGroup value="other" onChange={() => {}}>
          <RadioButton value="unselected">
            <Text>Unselected</Text>
          </RadioButton>
        </RadioGroup>,
      );
      expect(getByRole("radio").props.accessibilityState.checked).toBe(false);
    });

    it("can be individually disabled", () => {
      const handleChange = jest.fn();
      const { getByRole } = render(
        <RadioGroup value="option1" onChange={handleChange}>
          <RadioButton value="option2" disabled>
            <Text>Disabled</Text>
          </RadioButton>
        </RadioGroup>,
      );

      fireEvent.press(getByRole("radio"));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("renders small size", () => {
      const { getByRole } = render(
        <RadioGroup value="" onChange={() => {}}>
          <RadioButton value="test" size="sm">
            <Text>Small</Text>
          </RadioButton>
        </RadioGroup>,
      );
      expect(getByRole("radio")).toBeTruthy();
    });

    it("renders medium size (default)", () => {
      const { getByRole } = render(
        <RadioGroup value="" onChange={() => {}}>
          <RadioButton value="test">
            <Text>Medium</Text>
          </RadioButton>
        </RadioGroup>,
      );
      expect(getByRole("radio")).toBeTruthy();
    });

    it("renders large size", () => {
      const { getByRole } = render(
        <RadioGroup value="" onChange={() => {}}>
          <RadioButton value="test" size="lg">
            <Text>Large</Text>
          </RadioButton>
        </RadioGroup>,
      );
      expect(getByRole("radio")).toBeTruthy();
    });

    it("applies custom styles", () => {
      const customStyle = { marginTop: 10 };
      const { getByRole } = render(
        <RadioGroup value="" onChange={() => {}}>
          <RadioButton value="test" style={customStyle} />
        </RadioGroup>,
      );
      expect(getByRole("radio")).toBeTruthy();
    });

    it("forwards ViewProps", () => {
      const { getByTestId } = render(
        <RadioGroup value="" onChange={() => {}}>
          <RadioButton value="test" testID="custom-radio" />
        </RadioGroup>,
      );
      expect(getByTestId("custom-radio")).toBeTruthy();
    });

    it("forwards ref to View", () => {
      const ref = createRef<View>();
      render(
        <RadioGroup value="" onChange={() => {}}>
          <RadioButton ref={ref} value="test" />
        </RadioGroup>,
      );
      expect(ref.current).toBeTruthy();
    });

    it("calls button-level onBlur when press ends", () => {
      const handleBlur = jest.fn();
      const { getByRole } = render(
        <RadioGroup value="" onChange={() => {}}>
          <RadioButton value="test" onBlur={handleBlur} />
        </RadioGroup>,
      );

      fireEvent(getByRole("radio"), "pressOut");
      expect(handleBlur).toHaveBeenCalled();
    });

    it("accepts name prop", () => {
      const { getByRole } = render(
        <RadioGroup value="" onChange={() => {}}>
          <RadioButton value="test" name="option" />
        </RadioGroup>,
      );
      expect(getByRole("radio")).toBeTruthy();
    });

    it("throws error when used outside RadioGroup", () => {
      const consoleError = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => {
        render(<RadioButton value="test" />);
      }).toThrow("RadioButton must be used within RadioGroup");
      consoleError.mockRestore();
    });
  });
});
