import { render } from "@testing-library/react-native";
import { Container } from "./Container";
import { Text, View, StyleSheet } from "react-native";

describe("<Container />", () => {
  test("renders children correctly", () => {
    const { getByText } = render(
      <Container>
        <Text>Container content</Text>
      </Container>,
    );
    expect(getByText("Container content")).toBeTruthy();
  });

  test("applies lg maxWidth by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Container>
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle).toMatchObject({
      maxWidth: 1024,
    });
  });

  test("applies sm maxWidth preset", () => {
    const { UNSAFE_getAllByType } = render(
      <Container maxWidth="sm">
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle).toMatchObject({
      maxWidth: 640,
    });
  });

  test("applies md maxWidth preset", () => {
    const { UNSAFE_getAllByType } = render(
      <Container maxWidth="md">
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle).toMatchObject({
      maxWidth: 768,
    });
  });

  test("applies xl maxWidth preset", () => {
    const { UNSAFE_getAllByType } = render(
      <Container maxWidth="xl">
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle).toMatchObject({
      maxWidth: 1280,
    });
  });

  test("applies custom maxWidth number", () => {
    const { UNSAFE_getAllByType } = render(
      <Container maxWidth={900}>
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle).toMatchObject({
      maxWidth: 900,
    });
  });

  test("applies default padding of 16", () => {
    const { UNSAFE_getAllByType } = render(
      <Container>
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle).toMatchObject({
      paddingHorizontal: 16,
    });
  });

  test("applies custom padding", () => {
    const { UNSAFE_getAllByType } = render(
      <Container padding={24}>
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle).toMatchObject({
      paddingHorizontal: 24,
    });
  });

  test("applies centered alignment by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Container>
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle).toMatchObject({
      alignSelf: "center",
    });
  });

  test("does not apply centered when centered=false", () => {
    const { UNSAFE_getAllByType } = render(
      <Container centered={false}>
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle.alignSelf).not.toBe("center");
  });

  test("applies width 100% by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Container>
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle).toMatchObject({
      width: "100%",
    });
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getAllByType } = render(
      <Container style={{ marginTop: 20 }}>
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle).toMatchObject({ marginTop: 20 });
  });

  test("combines all props", () => {
    const { UNSAFE_getAllByType } = render(
      <Container maxWidth="md" padding={32} centered={true}>
        <Text>Content</Text>
      </Container>,
    );
    const views = UNSAFE_getAllByType(View);
    const containerView = views[0];
    const flatStyle = StyleSheet.flatten(containerView.props.style);
    expect(flatStyle).toMatchObject({
      maxWidth: 768,
      paddingHorizontal: 32,
      alignSelf: "center",
    });
  });

  test("forwards additional ViewProps", () => {
    const { getByTestId } = render(
      <Container testID="custom-container">
        <Text>Content</Text>
      </Container>,
    );
    expect(getByTestId("custom-container")).toBeTruthy();
  });

  test("renders without children", () => {
    const { UNSAFE_getByType } = render(<Container />);
    const container = UNSAFE_getByType(Container);
    expect(container).toBeTruthy();
  });
});
