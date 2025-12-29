import { render } from "@testing-library/react-native";
import { Box } from "./Box";
import { Text } from "react-native";

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
    const { UNSAFE_getByType } = render(
      <Box padding={16}>
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ padding: 16 })]),
    );
  });

  test("applies padding as object", () => {
    const { UNSAFE_getByType } = render(
      <Box padding={{ top: 8, right: 12, bottom: 16, left: 20 }}>
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          paddingTop: 8,
          paddingRight: 12,
          paddingBottom: 16,
          paddingLeft: 20,
        }),
      ]),
    );
  });

  test("applies partial padding object", () => {
    const { UNSAFE_getByType } = render(
      <Box padding={{ top: 10, bottom: 20 }}>
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          paddingTop: 10,
          paddingBottom: 20,
        }),
      ]),
    );
  });

  test("applies margin as number", () => {
    const { UNSAFE_getByType } = render(
      <Box margin={24}>
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ margin: 24 })]),
    );
  });

  test("applies margin as object", () => {
    const { UNSAFE_getByType } = render(
      <Box margin={{ top: 4, right: 8, bottom: 12, left: 16 }}>
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marginTop: 4,
          marginRight: 8,
          marginBottom: 12,
          marginLeft: 16,
        }),
      ]),
    );
  });

  test("applies borderRadius", () => {
    const { UNSAFE_getByType } = render(
      <Box borderRadius={8}>
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderRadius: 8 })]),
    );
  });

  test("applies borderWidth", () => {
    const { UNSAFE_getByType } = render(
      <Box borderWidth={2}>
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderWidth: 2 })]),
    );
  });

  test("applies borderColor", () => {
    const { UNSAFE_getByType } = render(
      <Box borderColor="#FF0000">
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderColor: "#FF0000" }),
      ]),
    );
  });

  test("applies backgroundColor", () => {
    const { UNSAFE_getByType } = render(
      <Box backgroundColor="#F0F0F0">
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: "#F0F0F0" }),
      ]),
    );
  });

  test("applies flex", () => {
    const { UNSAFE_getByType } = render(
      <Box flex={1}>
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ flex: 1 })]),
    );
  });

  test("applies flexDirection", () => {
    const { UNSAFE_getByType } = render(
      <Box flexDirection="row">
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ flexDirection: "row" }),
      ]),
    );
  });

  test("applies justifyContent", () => {
    const { UNSAFE_getByType } = render(
      <Box justifyContent="center">
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ justifyContent: "center" }),
      ]),
    );
  });

  test("applies alignItems", () => {
    const { UNSAFE_getByType } = render(
      <Box alignItems="center">
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ alignItems: "center" }),
      ]),
    );
  });

  test("applies gap", () => {
    const { UNSAFE_getByType } = render(
      <Box gap={12}>
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ gap: 12 })]),
    );
  });

  test("combines multiple props", () => {
    const { UNSAFE_getByType } = render(
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
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          padding: 16,
          margin: 8,
          borderRadius: 12,
          backgroundColor: "#FFFFFF",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }),
      ]),
    );
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getByType } = render(
      <Box style={{ opacity: 0.8 }}>
        <Text>Content</Text>
      </Box>,
    );
    const box = UNSAFE_getByType(Box);
    expect(box.props.style).toEqual(expect.arrayContaining([{ opacity: 0.8 }]));
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
