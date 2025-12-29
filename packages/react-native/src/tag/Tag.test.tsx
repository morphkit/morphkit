import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { Tag } from "./Tag";

describe("<Tag />", () => {
  it("renders without crashing", () => {
    const { root } = render(<Tag>Test Tag</Tag>);
    expect(root).toBeTruthy();
  });

  it("renders children correctly", () => {
    const { getByText } = render(<Tag>My Tag</Tag>);
    expect(getByText("My Tag")).toBeTruthy();
  });

  it("renders all variants", () => {
    const variants = [
      "default",
      "primary",
      "success",
      "warning",
      "error",
    ] as const;
    variants.forEach((variant) => {
      const { getByText } = render(<Tag variant={variant}>{variant}</Tag>);
      expect(getByText(variant)).toBeTruthy();
    });
  });

  it("renders all sizes", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      const { getByText } = render(<Tag size={size}>{size}</Tag>);
      expect(getByText(size)).toBeTruthy();
    });
  });

  it("renders dismiss button when dismissible", () => {
    const { getByLabelText } = render(
      <Tag dismissible onDismiss={() => {}}>
        Dismissible
      </Tag>,
    );
    expect(getByLabelText("Dismiss")).toBeTruthy();
  });

  it("does not render dismiss button when not dismissible", () => {
    const { queryByLabelText } = render(<Tag>Not Dismissible</Tag>);
    expect(queryByLabelText("Dismiss")).toBeNull();
  });

  it("calls onDismiss when dismiss button pressed", () => {
    const handleDismiss = jest.fn();
    const { getByLabelText } = render(
      <Tag dismissible onDismiss={handleDismiss}>
        Test
      </Tag>,
    );
    fireEvent.press(getByLabelText("Dismiss"));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 20 };
    const { root } = render(<Tag style={customStyle}>Test</Tag>);
    expect(root).toBeTruthy();
  });

  it("forwards ViewProps", () => {
    const { getByTestId } = render(<Tag testID="tag-test">Test</Tag>);
    expect(getByTestId("tag-test")).toBeTruthy();
  });

  it("renders with ReactNode children", () => {
    const { getByText } = render(
      <Tag>
        <Text>Complex Child</Text>
      </Tag>,
    );
    expect(getByText("Complex Child")).toBeTruthy();
  });
});
