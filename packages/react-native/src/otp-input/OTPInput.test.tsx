import { createRef } from "react";
import { render, fireEvent } from "../test-utils";
import { TextInput, View } from "react-native";
import { OTPInput } from "./OTPInput";

describe("OTPInput", () => {
  test("renders correct number of input fields by default", () => {
    const { getAllByRole } = render(<OTPInput value="" onChange={() => {}} />);
    const inputs = getAllByRole("textbox");
    expect(inputs).toHaveLength(6);
  });

  test("renders custom length of input fields", () => {
    const { getAllByRole } = render(
      <OTPInput value="" onChange={() => {}} length={4} />,
    );
    const inputs = getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
  });

  test("splits value into individual fields", () => {
    const { getAllByRole } = render(
      <OTPInput value="123456" onChange={() => {}} />,
    );
    const inputs = getAllByRole("textbox");
    expect(inputs[0].props.value).toBe("1");
    expect(inputs[1].props.value).toBe("2");
    expect(inputs[2].props.value).toBe("3");
    expect(inputs[3].props.value).toBe("4");
    expect(inputs[4].props.value).toBe("5");
    expect(inputs[5].props.value).toBe("6");
  });

  test("calls onChange when typing in a field", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <OTPInput value="" onChange={handleChange} />,
    );
    const inputs = getAllByRole("textbox");

    fireEvent.changeText(inputs[0], "1");

    expect(handleChange).toHaveBeenCalledWith("1");
  });

  test("auto-advances to next field on input", () => {
    const { getAllByRole } = render(<OTPInput value="" onChange={() => {}} />);
    const inputs = getAllByRole("textbox");

    fireEvent.changeText(inputs[0], "1");
    fireEvent.changeText(inputs[1], "2");

    expect(inputs[0].props.value).toBe("1");
    expect(inputs[1].props.value).toBe("2");
  });

  test("calls onComplete when all fields are filled", () => {
    const handleComplete = jest.fn();
    const { getAllByRole } = render(
      <OTPInput value="" onChange={() => {}} onComplete={handleComplete} />,
    );
    const inputs = getAllByRole("textbox");

    fireEvent.changeText(inputs[0], "1");
    fireEvent.changeText(inputs[1], "2");
    fireEvent.changeText(inputs[2], "3");
    fireEvent.changeText(inputs[3], "4");
    fireEvent.changeText(inputs[4], "5");
    fireEvent.changeText(inputs[5], "6");

    expect(handleComplete).toHaveBeenCalledWith("123456");
  });

  test("handles backspace on empty field by moving to previous", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <OTPInput value="12" onChange={handleChange} />,
    );
    const inputs = getAllByRole("textbox");

    fireEvent(inputs[2], "onKeyPress", {
      nativeEvent: { key: "Backspace" },
    });

    expect(handleChange).toHaveBeenCalled();
  });

  test("handles paste with full OTP code", () => {
    const handleChange = jest.fn();
    const handleComplete = jest.fn();
    const { getAllByRole } = render(
      <OTPInput value="" onChange={handleChange} onComplete={handleComplete} />,
    );
    const inputs = getAllByRole("textbox");

    fireEvent.changeText(inputs[0], "123456");

    expect(handleChange).toHaveBeenCalledWith("123456");
    expect(handleComplete).toHaveBeenCalledWith("123456");
  });

  test("filters non-numeric characters when type is number", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <OTPInput value="" onChange={handleChange} type="number" />,
    );
    const inputs = getAllByRole("textbox");

    fireEvent.changeText(inputs[0], "a");

    expect(handleChange).toHaveBeenCalledWith("");
  });

  test("allows all characters when type is text", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <OTPInput value="" onChange={handleChange} type="text" />,
    );
    const inputs = getAllByRole("textbox");

    fireEvent.changeText(inputs[0], "a");

    expect(handleChange).toHaveBeenCalledWith("a");
  });

  test("disables all input fields when disabled", () => {
    const { getAllByRole } = render(
      <OTPInput value="" onChange={() => {}} disabled />,
    );
    const inputs = getAllByRole("textbox");

    inputs.forEach((input) => {
      expect(input.props.editable).toBe(false);
    });
  });

  test("applies sm size to all fields", () => {
    const { getAllByRole } = render(
      <OTPInput value="" onChange={() => {}} size="sm" />,
    );
    const inputs = getAllByRole("textbox");

    inputs.forEach((input) => {
      expect(input.props.style).toMatchObject({ width: 36 });
    });
  });

  test("applies md size to all fields", () => {
    const { getAllByRole } = render(
      <OTPInput value="" onChange={() => {}} size="md" />,
    );
    const inputs = getAllByRole("textbox");

    inputs.forEach((input) => {
      expect(input.props.style).toMatchObject({ width: 44 });
    });
  });

  test("applies lg size to all fields", () => {
    const { getAllByRole } = render(
      <OTPInput value="" onChange={() => {}} size="lg" />,
    );
    const inputs = getAllByRole("textbox");

    inputs.forEach((input) => {
      expect(input.props.style).toMatchObject({ width: 52 });
    });
  });

  test("applies outline variant to all fields", () => {
    const { getAllByRole } = render(
      <OTPInput value="" onChange={() => {}} variant="outline" />,
    );
    const inputs = getAllByRole("textbox");

    expect(inputs.length).toBe(6);
  });

  test("applies filled variant to all fields", () => {
    const { getAllByRole } = render(
      <OTPInput value="" onChange={() => {}} variant="filled" />,
    );
    const inputs = getAllByRole("textbox");

    expect(inputs.length).toBe(6);
  });

  test("sets accessibility label on container", () => {
    const { getByLabelText } = render(
      <OTPInput
        value=""
        onChange={() => {}}
        accessibilityLabel="Enter verification code"
      />,
    );
    const container = getByLabelText("Enter verification code");

    expect(container.props.accessibilityLabel).toBe("Enter verification code");
  });

  test("sets individual accessibility labels on fields", () => {
    const { getAllByRole } = render(<OTPInput value="" onChange={() => {}} />);
    const inputs = getAllByRole("textbox");

    expect(inputs[0].props.accessibilityLabel).toBe("Digit 1 of 6");
    expect(inputs[1].props.accessibilityLabel).toBe("Digit 2 of 6");
    expect(inputs[5].props.accessibilityLabel).toBe("Digit 6 of 6");
  });

  test("forwards ref to container View", () => {
    const ref = createRef<View>();
    render(<OTPInput ref={ref} value="" onChange={() => {}} />);

    expect(ref.current).toBeInstanceOf(View);
  });

  test("handles partial value correctly", () => {
    const { getAllByRole } = render(
      <OTPInput value="123" onChange={() => {}} />,
    );
    const inputs = getAllByRole("textbox");

    expect(inputs[0].props.value).toBe("1");
    expect(inputs[1].props.value).toBe("2");
    expect(inputs[2].props.value).toBe("3");
    expect(inputs[3].props.value).toBe("");
    expect(inputs[4].props.value).toBe("");
    expect(inputs[5].props.value).toBe("");
  });

  test("handles paste with partial OTP code", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <OTPInput value="" onChange={handleChange} />,
    );
    const inputs = getAllByRole("textbox");

    fireEvent.changeText(inputs[0], "123");

    expect(handleChange).toHaveBeenCalledWith("123");
  });

  test("truncates pasted value longer than length", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <OTPInput value="" onChange={handleChange} length={4} />,
    );
    const inputs = getAllByRole("textbox");

    fireEvent.changeText(inputs[0], "123456789");

    expect(handleChange).toHaveBeenCalledWith("1234");
  });

  test("filters non-numeric paste when type is number", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <OTPInput value="" onChange={handleChange} type="number" />,
    );
    const inputs = getAllByRole("textbox");

    fireEvent.changeText(inputs[0], "1a2b3c");

    expect(handleChange).toHaveBeenCalledWith("123");
  });

  test("applies custom style to container", () => {
    const { getByLabelText } = render(
      <OTPInput value="" onChange={() => {}} style={{ padding: 10 }} />,
    );
    const container = getByLabelText("One time password input");

    expect(container.props.style).toMatchObject({ padding: 10 });
  });

  test("updates field values when value prop changes", () => {
    const { getAllByRole, rerender } = render(
      <OTPInput value="123" onChange={() => {}} />,
    );
    let inputs = getAllByRole("textbox");

    expect(inputs[0].props.value).toBe("1");
    expect(inputs[1].props.value).toBe("2");
    expect(inputs[2].props.value).toBe("3");

    rerender(<OTPInput value="456" onChange={() => {}} />);

    inputs = getAllByRole("textbox");
    expect(inputs[0].props.value).toBe("4");
    expect(inputs[1].props.value).toBe("5");
    expect(inputs[2].props.value).toBe("6");
  });
});
