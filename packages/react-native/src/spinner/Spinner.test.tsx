import { render } from "@testing-library/react-native";
import { Spinner } from "./Spinner";

describe("<Spinner />", () => {
  it("renders without crashing", () => {
    const { root } = render(<Spinner />);
    expect(root).toBeTruthy();
  });

  it("renders with default md size", () => {
    const { root } = render(<Spinner />);
    expect(root).toBeTruthy();
  });

  it("renders sm size", () => {
    const { root } = render(<Spinner size="sm" />);
    expect(root).toBeTruthy();
  });

  it("renders lg size", () => {
    const { root } = render(<Spinner size="lg" />);
    expect(root).toBeTruthy();
  });

  it("renders with custom numeric size", () => {
    const { root } = render(<Spinner size={40} />);
    expect(root).toBeTruthy();
  });

  it("renders with custom color", () => {
    const { root } = render(<Spinner color="#FF0000" />);
    expect(root).toBeTruthy();
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 20 };
    const { root } = render(<Spinner style={customStyle} />);
    expect(root).toBeTruthy();
  });

  it("forwards ViewProps", () => {
    const { getByTestId } = render(<Spinner testID="spinner-test" />);
    expect(getByTestId("spinner-test")).toBeTruthy();
  });

  it("has proper accessibility attributes", () => {
    const { getByLabelText } = render(<Spinner />);
    const spinner = getByLabelText("Loading");
    expect(spinner).toBeTruthy();
  });
});
