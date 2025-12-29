import { render } from "@testing-library/react-native";
import { Divider } from "./Divider";

describe("<Divider />", () => {
  test("renders correctly", () => {
    const { UNSAFE_getByType } = render(<Divider />);
    const divider = UNSAFE_getByType(Divider);
    expect(divider).toBeTruthy();
  });

  test("applies horizontal orientation by default", () => {
    const { UNSAFE_getByType } = render(<Divider />);
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: "100%",
          height: 1,
        }),
      ]),
    );
  });

  test("applies vertical orientation", () => {
    const { UNSAFE_getByType } = render(<Divider orientation="vertical" />);
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 1,
          height: "100%",
        }),
      ]),
    );
  });

  test("applies default thickness of 1", () => {
    const { UNSAFE_getByType } = render(<Divider />);
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: 1,
        }),
      ]),
    );
  });

  test("applies custom thickness for horizontal", () => {
    const { UNSAFE_getByType } = render(<Divider thickness={2} />);
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: 2,
        }),
      ]),
    );
  });

  test("applies custom thickness for vertical", () => {
    const { UNSAFE_getByType } = render(
      <Divider orientation="vertical" thickness={3} />,
    );
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 3,
        }),
      ]),
    );
  });

  test("applies default color in light mode", () => {
    const { UNSAFE_getByType } = render(<Divider />);
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: "#E5E7EB",
        }),
      ]),
    );
  });

  test("applies custom color", () => {
    const { UNSAFE_getByType } = render(<Divider color="#FF0000" />);
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: "#FF0000",
        }),
      ]),
    );
  });

  test("applies default length of 100%", () => {
    const { UNSAFE_getByType } = render(<Divider />);
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: "100%",
        }),
      ]),
    );
  });

  test("applies custom length as percentage", () => {
    const { UNSAFE_getByType } = render(<Divider length="50%" />);
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: "50%",
        }),
      ]),
    );
  });

  test("applies custom length as number for horizontal", () => {
    const { UNSAFE_getByType } = render(<Divider length={200} />);
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 200,
        }),
      ]),
    );
  });

  test("applies custom length as number for vertical", () => {
    const { UNSAFE_getByType } = render(
      <Divider orientation="vertical" length={150} />,
    );
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: 150,
        }),
      ]),
    );
  });

  test("combines all props for horizontal", () => {
    const { UNSAFE_getByType } = render(
      <Divider
        orientation="horizontal"
        thickness={2}
        color="#4A90E2"
        length="80%"
      />,
    );
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: "#4A90E2",
          width: "80%",
          height: 2,
        }),
      ]),
    );
  });

  test("combines all props for vertical", () => {
    const { UNSAFE_getByType } = render(
      <Divider
        orientation="vertical"
        thickness={3}
        color="#10B981"
        length={250}
      />,
    );
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: "#10B981",
          width: 3,
          height: 250,
        }),
      ]),
    );
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getByType } = render(
      <Divider style={{ marginVertical: 10 }} />,
    );
    const divider = UNSAFE_getByType(Divider);
    expect(divider.props.style).toEqual(
      expect.arrayContaining([{ marginVertical: 10 }]),
    );
  });

  test("forwards additional ViewProps", () => {
    const { getByTestId } = render(<Divider testID="custom-divider" />);
    expect(getByTestId("custom-divider")).toBeTruthy();
  });
});
