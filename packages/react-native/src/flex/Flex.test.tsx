import { render } from "../test-utils";
import { Flex } from "./Flex";
import { Text, View, StyleSheet } from "react-native";

describe("<Flex />", () => {
  test("renders children correctly", () => {
    const { getByText } = render(
      <Flex>
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </Flex>,
    );
    expect(getByText("Child 1")).toBeTruthy();
    expect(getByText("Child 2")).toBeTruthy();
  });

  test("applies vertical direction by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex>
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      flexDirection: "column",
    });
  });

  test("applies horizontal direction", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex direction="horizontal">
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      flexDirection: "row",
    });
  });

  test("applies default gap of 8", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex>
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      gap: 8,
    });
  });

  test("applies custom gap", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex gap="md">
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      gap: 16,
    });
  });

  test("applies stretch alignment by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex>
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      alignItems: "stretch",
    });
  });

  test("applies start alignment", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex align="start">
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      alignItems: "flex-start",
    });
  });

  test("applies center alignment", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex align="center">
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      alignItems: "center",
    });
  });

  test("applies end alignment", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex align="end">
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      alignItems: "flex-end",
    });
  });

  test("applies start justification by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex>
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      justifyContent: "flex-start",
    });
  });

  test("applies center justification", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex justify="center">
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      justifyContent: "center",
    });
  });

  test("applies end justification", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex justify="end">
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      justifyContent: "flex-end",
    });
  });

  test("applies space-between justification", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex justify="space-between">
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      justifyContent: "space-between",
    });
  });

  test("applies nowrap by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex>
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      flexWrap: "nowrap",
    });
  });

  test("applies wrap when specified", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex wrap={true}>
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      flexWrap: "wrap",
    });
  });

  test("combines all props", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex
        direction="horizontal"
        gap="md"
        align="center"
        justify="space-between"
        wrap={true}
      >
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({
      flexDirection: "row",
      gap: 16,
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    });
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getAllByType } = render(
      <Flex style={{ padding: 16 }}>
        <Text>Content</Text>
      </Flex>,
    );
    const views = UNSAFE_getAllByType(View);
    const flexView = views[0];
    const flatStyle = StyleSheet.flatten(flexView.props.style);
    expect(flatStyle).toMatchObject({ padding: 16 });
  });

  test("forwards additional ViewProps", () => {
    const { getByTestId } = render(
      <Flex testID="custom-flex">
        <Text>Content</Text>
      </Flex>,
    );
    expect(getByTestId("custom-flex")).toBeTruthy();
  });

  test("renders without children", () => {
    const { UNSAFE_getByType } = render(<Flex />);
    const flex = UNSAFE_getByType(Flex);
    expect(flex).toBeTruthy();
  });
});
