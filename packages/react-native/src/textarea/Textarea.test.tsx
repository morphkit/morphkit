import { createRef } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TextInput } from "react-native";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders textarea with value", () => {
    const { getByDisplayValue } = render(
      <Textarea value="Hello world" onChange={() => {}} />,
    );
    expect(getByDisplayValue("Hello world")).toBeTruthy();
  });

  it("calls onChange when text changes", () => {
    const handleChange = jest.fn();
    const { getByDisplayValue } = render(
      <Textarea value="" onChange={handleChange} />,
    );

    fireEvent.changeText(getByDisplayValue(""), "new text");
    expect(handleChange).toHaveBeenCalledWith("new text");
  });

  it("calls onBlur when textarea loses focus", () => {
    const handleBlur = jest.fn();
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} onBlur={handleBlur} />,
    );

    fireEvent(getByDisplayValue("test"), "blur");
    expect(handleBlur).toHaveBeenCalled();
  });

  it("forwards ref to TextInput", () => {
    const ref = createRef<TextInput>();
    render(<Textarea ref={ref} value="" onChange={() => {}} />);
    expect(ref.current).toBeTruthy();
  });

  it("accepts name prop", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} name="description" />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("uses name for accessibilityLabel when label is not provided", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} name="description" />,
    );
    expect(getByDisplayValue("test").props.accessibilityLabel).toBe(
      "description",
    );
  });

  it("prefers label over name for accessibilityLabel", () => {
    const { getByDisplayValue } = render(
      <Textarea
        value="test"
        onChange={() => {}}
        name="description"
        label="Bio"
      />,
    );
    expect(getByDisplayValue("test").props.accessibilityLabel).toBe("Bio");
  });

  it("renders with label", () => {
    const { getByText } = render(
      <Textarea value="" onChange={() => {}} label="Description" />,
    );
    expect(getByText("Description")).toBeTruthy();
  });

  it("renders placeholder", () => {
    const { getByPlaceholderText } = render(
      <Textarea
        value=""
        onChange={() => {}}
        placeholder="Enter description..."
      />,
    );
    expect(getByPlaceholderText("Enter description...")).toBeTruthy();
  });

  it("renders error message", () => {
    const { getByText } = render(
      <Textarea value="" onChange={() => {}} error="Description is required" />,
    );
    expect(getByText("Description is required")).toBeTruthy();
  });

  it("disables textarea when disabled prop is true", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} disabled />,
    );
    expect(getByDisplayValue("test").props.editable).toBe(false);
  });

  it("shows character count when showCount is true", () => {
    const { getByText } = render(
      <Textarea value="Hello" onChange={() => {}} showCount />,
    );
    expect(getByText("5")).toBeTruthy();
  });

  it("shows character count with maxLength", () => {
    const { getByText } = render(
      <Textarea value="Hello" onChange={() => {}} showCount maxLength={100} />,
    );
    expect(getByText("5 / 100")).toBeTruthy();
  });

  it("enforces maxLength", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} maxLength={50} />,
    );
    expect(getByDisplayValue("test").props.maxLength).toBe(50);
  });

  it("renders with custom rows", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} rows={6} />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("enables autoResize when prop is true", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} autoResize />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("renders small size", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} size="sm" />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("renders medium size (default)", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("renders large size", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} size="lg" />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 20 };
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} style={customStyle} />,
    );
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("forwards TextInputProps", () => {
    const { getByDisplayValue } = render(
      <Textarea
        value="test"
        onChange={() => {}}
        testID="custom-textarea"
        autoCapitalize="sentences"
      />,
    );
    expect(getByDisplayValue("test").props.testID).toBe("custom-textarea");
    expect(getByDisplayValue("test").props.autoCapitalize).toBe("sentences");
  });

  it("sets accessibilityLabel from label prop", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} label="Bio" />,
    );
    expect(getByDisplayValue("test").props.accessibilityLabel).toBe("Bio");
  });

  it("sets accessibilityInvalid when error is present", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} error="Invalid input" />,
    );
    expect(getByDisplayValue("test").props.accessibilityInvalid).toBe(true);
  });

  it("is always multiline", () => {
    const { getByDisplayValue } = render(
      <Textarea value="test" onChange={() => {}} />,
    );
    expect(getByDisplayValue("test").props.multiline).toBe(true);
  });
});
