import { render } from "../test-utils";
import { Box } from "./Box";
import { Text, View, StyleSheet } from "react-native";

describe("<Box />", () => {
  test("renders children correctly", () => {
    const { getByText } = render(
      <Box>
        <Text>Child content</Text>
      </Box>,
    );
    expect(getByText("Child content")).toBeTruthy();
  });

  test("applies padding as number", () => {
    const { UNSAFE_getAllByType } = render(
      <Box padding={16}>
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ padding: 16 });
  });

  test("applies padding as object", () => {
    const { UNSAFE_getAllByType } = render(
      <Box padding={{ top: 8, right: 12, bottom: 16, left: 20 }}>
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({
      paddingTop: 8,
      paddingRight: 12,
      paddingBottom: 16,
      paddingLeft: 20,
    });
  });

  test("applies partial padding object", () => {
    const { UNSAFE_getAllByType } = render(
      <Box padding={{ top: 10, bottom: 20 }}>
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({
      paddingTop: 10,
      paddingBottom: 20,
    });
  });

  test("applies margin as number", () => {
    const { UNSAFE_getAllByType } = render(
      <Box margin={24}>
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ margin: 24 });
  });

  test("applies margin as object", () => {
    const { UNSAFE_getAllByType } = render(
      <Box margin={{ top: 4, right: 8, bottom: 12, left: 16 }}>
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({
      marginTop: 4,
      marginRight: 8,
      marginBottom: 12,
      marginLeft: 16,
    });
  });

  test("applies borderRadius", () => {
    const { UNSAFE_getAllByType } = render(
      <Box borderRadius={8}>
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ borderRadius: 8 });
  });

  test("applies borderWidth", () => {
    const { UNSAFE_getAllByType } = render(
      <Box borderWidth={2}>
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ borderWidth: 2 });
  });

  test("applies borderColor", () => {
    const { UNSAFE_getAllByType } = render(
      <Box borderColor="#FF0000">
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ borderColor: "#FF0000" });
  });

  test("applies backgroundColor", () => {
    const { UNSAFE_getAllByType } = render(
      <Box backgroundColor="#F0F0F0">
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ backgroundColor: "#F0F0F0" });
  });

  test("applies flex", () => {
    const { UNSAFE_getAllByType } = render(
      <Box flex={1}>
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ flex: 1 });
  });

  test("applies flexDirection", () => {
    const { UNSAFE_getAllByType } = render(
      <Box flexDirection="row">
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ flexDirection: "row" });
  });

  test("applies justifyContent", () => {
    const { UNSAFE_getAllByType } = render(
      <Box justifyContent="center">
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ justifyContent: "center" });
  });

  test("applies alignItems", () => {
    const { UNSAFE_getAllByType } = render(
      <Box alignItems="center">
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ alignItems: "center" });
  });

  test("applies gap", () => {
    const { UNSAFE_getAllByType } = render(
      <Box gap={12}>
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ gap: 12 });
  });

  test("combines multiple props", () => {
    const { UNSAFE_getAllByType } = render(
      <Box
        padding={16}
        margin={8}
        borderRadius={12}
        backgroundColor="#FFFFFF"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap={8}
      >
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({
      padding: 16,
      margin: 8,
      borderRadius: 12,
      backgroundColor: "#FFFFFF",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
    });
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getAllByType } = render(
      <Box style={{ opacity: 0.8 }}>
        <Text>Content</Text>
      </Box>,
    );
    const views = UNSAFE_getAllByType(View);
    const boxView = views[0];
    const flatStyle = StyleSheet.flatten(boxView.props.style);
    expect(flatStyle).toMatchObject({ opacity: 0.8 });
  });

  test("renders without children", () => {
    const { UNSAFE_getByType } = render(<Box padding={16} />);
    const box = UNSAFE_getByType(Box);
    expect(box).toBeTruthy();
  });

  test("forwards additional ViewProps", () => {
    const { getByTestId } = render(
      <Box testID="custom-box">
        <Text>Content</Text>
      </Box>,
    );
    expect(getByTestId("custom-box")).toBeTruthy();
  });
});
