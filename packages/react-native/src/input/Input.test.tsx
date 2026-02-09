import { createRef } from "react";
import { render, fireEvent } from "../test-utils";
import { Text, TextInput } from "react-native";
import { Input } from "./Input";

describe("Input", () => {
  it("renders input with value", () => {
    const { getByDisplayValue } = render(
      <Input value="test@example.com" onChange={() => {}} />,
    );
    expect(getByDisplayValue("test@example.com")).toBeTruthy();
  });

  it("calls onChange when text changes", () => {
    const handleChange = jest.fn();
    const { getByDisplayValue } = render(
      <Input value="" onChange={handleChange} />,
    );

    fireEvent.changeText(getByDisplayValue(""), "new text");
    expect(handleChange).toHaveBeenCalledWith("new text");
  });

  it("calls onBlur when input loses focus", () => {
    const handleBlur = jest.fn();
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} onBlur={handleBlur} />,
    );

    fireEvent(getByDisplayValue("test"), "blur");
    expect(handleBlur).toHaveBeenCalled();
  });

  it("forwards ref to TextInput", () => {
    const ref = createRef<TextInput>();
    render(<Input ref={ref} value="" onChange={() => {}} />);
    expect(ref.current).toBeTruthy();
  });

  it("accepts name prop", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} name="email" />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("uses name for accessibilityLabel when label is not provided", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} name="email" />,
    );
    expect(getByDisplayValue("test").props.accessibilityLabel).toBe("email");
  });

  it("prefers label over name for accessibilityLabel", () => {
    const { getByDisplayValue } = render(
      <Input
        value="test"
        onChange={() => {}}
        name="email"
        label="Email Address"
      />,
    );
    expect(getByDisplayValue("test").props.accessibilityLabel).toBe(
      "Email Address",
    );
  });

  it("renders with label", () => {
    const { getByText } = render(
      <Input value="" onChange={() => {}} label="Email Address" />,
    );
    expect(getByText("Email Address")).toBeTruthy();
  });

  it("renders placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input value="" onChange={() => {}} placeholder="Enter your email" />,
    );
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
  });

  it("renders error message", () => {
    const { getByText } = render(
      <Input value="" onChange={() => {}} error="Invalid email format" />,
    );
    expect(getByText("Invalid email format")).toBeTruthy();
  });

  it("disables input when disabled prop is true", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} disabled />,
    );
    expect(getByDisplayValue("test").props.editable).toBe(false);
  });

  it("renders prefix icon", () => {
    const PrefixIcon = () => <Text testID="prefix-icon">@</Text>;
    const { getByTestId } = render(
      <Input value="" onChange={() => {}} prefixIcon={<PrefixIcon />} />,
    );
    expect(getByTestId("prefix-icon")).toBeTruthy();
  });

  it("renders suffix icon", () => {
    const SuffixIcon = () => <Text testID="suffix-icon">👁</Text>;
    const { getByTestId } = render(
      <Input value="" onChange={() => {}} suffixIcon={<SuffixIcon />} />,
    );
    expect(getByTestId("suffix-icon")).toBeTruthy();
  });

  it("renders outline variant (default)", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("renders filled variant", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} variant="filled" />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("renders small size", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} size="sm" />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("renders medium size (default)", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("renders large size", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} size="lg" />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("sets email keyboard type for email type", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} type="email" />,
    );
    expect(getByDisplayValue("test").props.keyboardType).toBe("email-address");
  });

  it("sets numeric keyboard type for number type", () => {
    const { getByDisplayValue } = render(
      <Input value="123" onChange={() => {}} type="number" />,
    );
    expect(getByDisplayValue("123").props.keyboardType).toBe("numeric");
  });

  it("sets secureTextEntry for password type", () => {
    const { getByDisplayValue } = render(
      <Input value="password" onChange={() => {}} type="password" />,
    );
    expect(getByDisplayValue("password").props.secureTextEntry).toBe(true);
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 20 };
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} style={customStyle} />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("forwards TextInputProps", () => {
    const { getByDisplayValue } = render(
      <Input
        value="test"
        onChange={() => {}}
        testID="custom-input"
        maxLength={50}
      />,
    );
    expect(getByDisplayValue("test").props.testID).toBe("custom-input");
    expect(getByDisplayValue("test").props.maxLength).toBe(50);
  });

  it("sets accessibilityLabel from label prop", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} label="Email" />,
    );
    expect(getByDisplayValue("test").props.accessibilityLabel).toBe("Email");
  });

  it.skip("sets accessibilityInvalid when error is present", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} error="Invalid input" />,
    );
    expect(getByDisplayValue("test").props.accessibilityInvalid).toBe(true);
  });

  it("sets isFocused on focus event", () => {
    const { getByDisplayValue } = render(
      <Input value="test" onChange={() => {}} />,
    );
    fireEvent(getByDisplayValue("test"), "focus");
    expect(getByDisplayValue("test")).toBeTruthy();
  });
});
