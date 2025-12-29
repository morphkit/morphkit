import { render } from "@testing-library/react-native";
import { Container } from "./Container";
import { Text } from "react-native";

describe("<Container />", () => {
  test("renders children correctly", () => {
    const { getByText } = render(
      <Container>
        <Text>Container content</Text>
      </Container>
    );
    expect(getByText("Container content")).toBeTruthy();
  });

  test("applies lg maxWidth by default", () => {
    const { UNSAFE_getByType } = render(
      <Container>
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          maxWidth: 1024,
        }),
      ])
    );
  });

  test("applies sm maxWidth preset", () => {
    const { UNSAFE_getByType } = render(
      <Container maxWidth="sm">
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          maxWidth: 640,
        }),
      ])
    );
  });

  test("applies md maxWidth preset", () => {
    const { UNSAFE_getByType } = render(
      <Container maxWidth="md">
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          maxWidth: 768,
        }),
      ])
    );
  });

  test("applies xl maxWidth preset", () => {
    const { UNSAFE_getByType } = render(
      <Container maxWidth="xl">
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          maxWidth: 1280,
        }),
      ])
    );
  });

  test("applies custom maxWidth number", () => {
    const { UNSAFE_getByType } = render(
      <Container maxWidth={900}>
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          maxWidth: 900,
        }),
      ])
    );
  });

  test("applies default padding of 16", () => {
    const { UNSAFE_getByType } = render(
      <Container>
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          paddingHorizontal: 16,
        }),
      ])
    );
  });

  test("applies custom padding", () => {
    const { UNSAFE_getByType } = render(
      <Container padding={24}>
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          paddingHorizontal: 24,
        }),
      ])
    );
  });

  test("applies centered alignment by default", () => {
    const { UNSAFE_getByType } = render(
      <Container>
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          alignSelf: "center",
        }),
      ])
    );
  });

  test("does not apply centered when centered=false", () => {
    const { UNSAFE_getByType } = render(
      <Container centered={false}>
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    const styles = container.props.style.flat();
    const hasCentered = styles.some(
      (style: Record<string, unknown>) => style?.alignSelf === "center"
    );
    expect(hasCentered).toBe(false);
  });

  test("applies width 100% by default", () => {
    const { UNSAFE_getByType } = render(
      <Container>
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: "100%",
        }),
      ])
    );
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getByType } = render(
      <Container style={{ marginTop: 20 }}>
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    expect(container.props.style).toEqual(
      expect.arrayContaining([{ marginTop: 20 }])
    );
  });

  test("combines all props", () => {
    const { UNSAFE_getByType } = render(
      <Container maxWidth="md" padding={32} centered={true}>
        <Text>Content</Text>
      </Container>
    );
    const container = UNSAFE_getByType(Container);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          maxWidth: 768,
          paddingHorizontal: 32,
          alignSelf: "center",
        }),
      ])
    );
  });

  test("forwards additional ViewProps", () => {
    const { getByTestId } = render(
      <Container testID="custom-container">
        <Text>Content</Text>
      </Container>
    );
    expect(getByTestId("custom-container")).toBeTruthy();
  });

  test("renders without children", () => {
    const { UNSAFE_getByType } = render(<Container />);
    const container = UNSAFE_getByType(Container);
    expect(container).toBeTruthy();
  });
});
