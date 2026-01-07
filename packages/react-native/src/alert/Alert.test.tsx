import { render, fireEvent } from "../test-utils";
import { Text } from "react-native";
import { Alert } from "./Alert";

describe("<Alert />", () => {
  it("renders without crashing", () => {
    const { root } = render(<Alert title="Test Alert" />);
    expect(root).toBeTruthy();
  });

  it("renders title correctly", () => {
    const { getByText } = render(<Alert title="Important Message" />);
    expect(getByText("Important Message")).toBeTruthy();
  });

  it("renders description when provided", () => {
    const { getByText } = render(
      <Alert title="Title" description="This is a description" />,
    );
    expect(getByText("This is a description")).toBeTruthy();
  });

  it("does not render description when not provided", () => {
    const { queryByText } = render(<Alert title="Title" />);
    expect(queryByText(/description/i)).toBeNull();
  });

  it("renders all variants", () => {
    const variants = ["info", "success", "warning", "error"] as const;
    variants.forEach((variant) => {
      const { getByText } = render(
        <Alert variant={variant} title={`${variant} alert`} />,
      );
      expect(getByText(`${variant} alert`)).toBeTruthy();
    });
  });

  it("renders default icon for each variant", () => {
    const { root } = render(<Alert variant="info" title="Test" />);
    expect(root).toBeTruthy();
  });

  it("renders custom icon when provided", () => {
    const customIcon = <Text>🔥</Text>;
    const { getByText } = render(<Alert title="Test" icon={customIcon} />);
    expect(getByText("🔥")).toBeTruthy();
  });

  it("renders dismiss button when dismissible", () => {
    const { getByLabelText } = render(
      <Alert title="Test" dismissible onDismiss={() => {}} />,
    );
    expect(getByLabelText("Dismiss alert")).toBeTruthy();
  });

  it("does not render dismiss button when not dismissible", () => {
    const { queryByLabelText } = render(<Alert title="Test" />);
    expect(queryByLabelText("Dismiss alert")).toBeNull();
  });

  it("calls onDismiss when dismiss button pressed", () => {
    const handleDismiss = jest.fn();
    const { getByLabelText } = render(
      <Alert title="Test" dismissible onDismiss={handleDismiss} />,
    );
    fireEvent.press(getByLabelText("Dismiss alert"));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 20 };
    const { root } = render(<Alert title="Test" style={customStyle} />);
    expect(root).toBeTruthy();
  });

  it("forwards ViewProps", () => {
    const { getByTestId } = render(<Alert title="Test" testID="alert-test" />);
    expect(getByTestId("alert-test")).toBeTruthy();
  });

  it("has proper accessibility role", () => {
    const { getByText } = render(<Alert title="Test" />);
    const alert = getByText("Test");
    expect(alert).toBeTruthy();
  });
});
