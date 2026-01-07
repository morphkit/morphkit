import { render } from "../test-utils";
import { Stack } from "./Stack";
import { Text, View, StyleSheet } from "react-native";

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
    const { UNSAFE_getAllByType } = render(
      <Stack>
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      flexDirection: "column",
    });
  });

  test("applies horizontal direction", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack direction="horizontal">
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      flexDirection: "row",
    });
  });

  test("applies default gap of 8", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack>
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      gap: 8,
    });
  });

  test("applies custom gap", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack gap={16}>
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      gap: 16,
    });
  });

  test("applies stretch alignment by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack>
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      alignItems: "stretch",
    });
  });

  test("applies start alignment", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack align="start">
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      alignItems: "flex-start",
    });
  });

  test("applies center alignment", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack align="center">
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      alignItems: "center",
    });
  });

  test("applies end alignment", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack align="end">
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      alignItems: "flex-end",
    });
  });

  test("applies start justification by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack>
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      justifyContent: "flex-start",
    });
  });

  test("applies center justification", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack justify="center">
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      justifyContent: "center",
    });
  });

  test("applies end justification", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack justify="end">
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      justifyContent: "flex-end",
    });
  });

  test("applies space-between justification", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack justify="space-between">
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      justifyContent: "space-between",
    });
  });

  test("applies nowrap by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack>
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      flexWrap: "nowrap",
    });
  });

  test("applies wrap when specified", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack wrap={true}>
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      flexWrap: "wrap",
    });
  });

  test("combines all props", () => {
    const { UNSAFE_getAllByType } = render(
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
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    });
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getAllByType } = render(
      <Stack style={{ padding: 16 }}>
        <Text>Content</Text>
      </Stack>,
    );
    const views = UNSAFE_getAllByType(View);
    const stackView = views[0];
    const flatStyle = StyleSheet.flatten(stackView.props.style);
    expect(flatStyle).toMatchObject({ padding: 16 });
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
