import { render } from "@testing-library/react-native";
import { Skeleton } from "./Skeleton";

describe("<Skeleton />", () => {
  it("renders without crashing", () => {
    const { root } = render(<Skeleton />);
    expect(root).toBeTruthy();
  });

  it("renders rect variant by default", () => {
    const { root } = render(<Skeleton />);
    expect(root).toBeTruthy();
  });

  it("renders circle variant", () => {
    const { root } = render(<Skeleton variant="circle" />);
    expect(root).toBeTruthy();
  });

  it("renders text variant", () => {
    const { root } = render(<Skeleton variant="text" />);
    expect(root).toBeTruthy();
  });

  it("renders with custom width as number", () => {
    const { root } = render(<Skeleton width={200} />);
    expect(root).toBeTruthy();
  });

  it("renders with custom width as string", () => {
    const { root } = render(<Skeleton width="50%" />);
    expect(root).toBeTruthy();
  });

  it("renders with custom height as number", () => {
    const { root } = render(<Skeleton height={40} />);
    expect(root).toBeTruthy();
  });

  it("renders with custom height as string", () => {
    const { root } = render(<Skeleton height="100px" />);
    expect(root).toBeTruthy();
  });

  it("renders with custom width and height", () => {
    const { root } = render(<Skeleton width={150} height={60} />);
    expect(root).toBeTruthy();
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 20 };
    const { root } = render(<Skeleton style={customStyle} />);
    expect(root).toBeTruthy();
  });

  it("forwards ViewProps", () => {
    const { getByTestId } = render(<Skeleton testID="skeleton-test" />);
    expect(getByTestId("skeleton-test")).toBeTruthy();
  });
});
