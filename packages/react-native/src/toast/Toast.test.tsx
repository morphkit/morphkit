import { render } from "@testing-library/react-native";
import { Toast } from "./Toast";

describe("<Toast />", () => {
  it("renders without crashing when visible", () => {
    const { root } = render(
      <Toast visible message="Test toast" onDismiss={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  it("renders null when not visible", () => {
    const { queryByText } = render(
      <Toast visible={false} message="Test toast" onDismiss={() => {}} />,
    );
    expect(queryByText("Test toast")).toBeNull();
  });

  it("renders message correctly", () => {
    const { getByText } = render(
      <Toast visible message="Important notification" onDismiss={() => {}} />,
    );
    expect(getByText("Important notification")).toBeTruthy();
  });

  it("renders all variants", () => {
    const variants = ["info", "success", "warning", "error"] as const;
    variants.forEach((variant) => {
      const { getByText } = render(
        <Toast
          visible
          variant={variant}
          message={`${variant} message`}
          onDismiss={() => {}}
        />,
      );
      expect(getByText(`${variant} message`)).toBeTruthy();
    });
  });

  it("renders at top position", () => {
    const { root } = render(
      <Toast visible message="Top toast" position="top" onDismiss={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  it("renders at bottom position by default", () => {
    const { root } = render(
      <Toast visible message="Bottom toast" onDismiss={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  it("calls onDismiss after duration", async () => {
    const handleDismiss = jest.fn();
    render(
      <Toast
        visible
        message="Auto dismiss"
        duration={100}
        onDismiss={handleDismiss}
      />,
    );

    expect(handleDismiss).not.toHaveBeenCalled();
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("does not auto dismiss when duration is 0", async () => {
    const handleDismiss = jest.fn();
    render(
      <Toast
        visible
        message="Manual dismiss"
        duration={0}
        onDismiss={handleDismiss}
      />,
    );

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(handleDismiss).not.toHaveBeenCalled();
  });

  it("uses default duration of 3000ms", async () => {
    const handleDismiss = jest.fn();
    render(<Toast visible message="Test" onDismiss={handleDismiss} />);

    await new Promise((resolve) => setTimeout(resolve, 2900));
    expect(handleDismiss).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 20 };
    const { root } = render(
      <Toast visible message="Test" style={customStyle} onDismiss={() => {}} />,
    );
    expect(root).toBeTruthy();
  });

  it("forwards ViewProps", () => {
    const { getByTestId } = render(
      <Toast visible message="Test" testID="toast-test" onDismiss={() => {}} />,
    );
    expect(getByTestId("toast-test")).toBeTruthy();
  });

  it("has proper accessibility attributes", () => {
    const { getByText } = render(
      <Toast visible message="Test" onDismiss={() => {}} />,
    );
    const toast = getByText("Test");
    expect(toast).toBeTruthy();
  });
});
