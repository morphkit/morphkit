import { render } from "@testing-library/react-native";
import { Stack } from "./Stack";
import { Text } from "react-native";

describe("<Stack />", () => {
  test("renders children correctly", () => {
    const { getByText } = render(
      <Stack>
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </Stack>,
    );
    expect(getByText("Child 1")).toBeTruthy();
    expect(getByText("Child 2")).toBeTruthy();
  });

  test("applies vertical direction by default", () => {
    const { UNSAFE_getByType } = render(
      <Stack>
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexDirection: "column",
        }),
      ]),
    );
  });

  test("applies horizontal direction", () => {
    const { UNSAFE_getByType } = render(
      <Stack direction="horizontal">
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexDirection: "row",
        }),
      ]),
    );
  });

  test("applies default gap of 8", () => {
    const { UNSAFE_getByType } = render(
      <Stack>
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gap: 8,
        }),
      ]),
    );
  });

  test("applies custom gap", () => {
    const { UNSAFE_getByType } = render(
      <Stack gap={16}>
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gap: 16,
        }),
      ]),
    );
  });

  test("applies stretch alignment by default", () => {
    const { UNSAFE_getByType } = render(
      <Stack>
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          alignItems: "stretch",
        }),
      ]),
    );
  });

  test("applies start alignment", () => {
    const { UNSAFE_getByType } = render(
      <Stack align="start">
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          alignItems: "flex-start",
        }),
      ]),
    );
  });

  test("applies center alignment", () => {
    const { UNSAFE_getByType } = render(
      <Stack align="center">
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          alignItems: "center",
        }),
      ]),
    );
  });

  test("applies end alignment", () => {
    const { UNSAFE_getByType } = render(
      <Stack align="end">
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          alignItems: "flex-end",
        }),
      ]),
    );
  });

  test("applies start justification by default", () => {
    const { UNSAFE_getByType } = render(
      <Stack>
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          justifyContent: "flex-start",
        }),
      ]),
    );
  });

  test("applies center justification", () => {
    const { UNSAFE_getByType } = render(
      <Stack justify="center">
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          justifyContent: "center",
        }),
      ]),
    );
  });

  test("applies end justification", () => {
    const { UNSAFE_getByType } = render(
      <Stack justify="end">
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          justifyContent: "flex-end",
        }),
      ]),
    );
  });

  test("applies space-between justification", () => {
    const { UNSAFE_getByType } = render(
      <Stack justify="space-between">
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          justifyContent: "space-between",
        }),
      ]),
    );
  });

  test("applies nowrap by default", () => {
    const { UNSAFE_getByType } = render(
      <Stack>
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexWrap: "nowrap",
        }),
      ]),
    );
  });

  test("applies wrap when specified", () => {
    const { UNSAFE_getByType } = render(
      <Stack wrap={true}>
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexWrap: "wrap",
        }),
      ]),
    );
  });

  test("combines all props", () => {
    const { UNSAFE_getByType } = render(
      <Stack
        direction="horizontal"
        gap={12}
        align="center"
        justify="space-between"
        wrap={true}
      >
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }),
      ]),
    );
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getByType } = render(
      <Stack style={{ padding: 16 }}>
        <Text>Content</Text>
      </Stack>,
    );
    const stack = UNSAFE_getByType(Stack);
    expect(stack.props.style).toEqual(
      expect.arrayContaining([{ padding: 16 }]),
    );
  });

  test("forwards additional ViewProps", () => {
    const { getByTestId } = render(
      <Stack testID="custom-stack">
        <Text>Content</Text>
      </Stack>,
    );
    expect(getByTestId("custom-stack")).toBeTruthy();
  });

  test("renders without children", () => {
    const { UNSAFE_getByType } = render(<Stack />);
    const stack = UNSAFE_getByType(Stack);
    expect(stack).toBeTruthy();
  });
});
