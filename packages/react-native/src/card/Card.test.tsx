import { render, fireEvent } from "@testing-library/react-native";
import { Card } from "./Card";
import { Text, View, StyleSheet } from "react-native";

describe("<Card />", () => {
  test("renders children correctly", () => {
    const { getByText } = render(
      <Card>
        <Text>Card content</Text>
      </Card>,
    );
    expect(getByText("Card content")).toBeTruthy();
  });

  test("applies elevated variant by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Card>
        <Text>Content</Text>
      </Card>,
    );
    const views = UNSAFE_getAllByType(View);
    const cardView = views[0];
    const flatStyle = StyleSheet.flatten(cardView.props.style);
    expect(flatStyle).toMatchObject({
      backgroundColor: "#FFFFFF",
      shadowColor: "#000000",
    });
  });

  test("applies outline variant", () => {
    const { UNSAFE_getAllByType } = render(
      <Card variant="outline">
        <Text>Content</Text>
      </Card>,
    );
    const views = UNSAFE_getAllByType(View);
    const cardView = views[0];
    const flatStyle = StyleSheet.flatten(cardView.props.style);
    expect(flatStyle).toMatchObject({
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    });
  });

  test("applies ghost variant", () => {
    const { UNSAFE_getAllByType } = render(
      <Card variant="ghost">
        <Text>Content</Text>
      </Card>,
    );
    const views = UNSAFE_getAllByType(View);
    const cardView = views[0];
    const flatStyle = StyleSheet.flatten(cardView.props.style);
    expect(flatStyle).toMatchObject({
      backgroundColor: "#F9FAFB",
    });
  });

  test("applies filled variant", () => {
    const { UNSAFE_getAllByType } = render(
      <Card variant="filled">
        <Text>Content</Text>
      </Card>,
    );
    const views = UNSAFE_getAllByType(View);
    const cardView = views[0];
    const flatStyle = StyleSheet.flatten(cardView.props.style);
    expect(flatStyle).toMatchObject({
      backgroundColor: "#F3F4F6",
    });
  });

  test("applies md size by default", () => {
    const { UNSAFE_getAllByType } = render(
      <Card>
        <Text>Content</Text>
      </Card>,
    );
    const views = UNSAFE_getAllByType(View);
    const cardView = views[0];
    const flatStyle = StyleSheet.flatten(cardView.props.style);
    expect(flatStyle).toMatchObject({
      padding: 16,
      borderRadius: 12,
    });
  });

  test("applies sm size", () => {
    const { UNSAFE_getAllByType } = render(
      <Card size="sm">
        <Text>Content</Text>
      </Card>,
    );
    const views = UNSAFE_getAllByType(View);
    const cardView = views[0];
    const flatStyle = StyleSheet.flatten(cardView.props.style);
    expect(flatStyle).toMatchObject({
      padding: 12,
      borderRadius: 8,
    });
  });

  test("applies lg size", () => {
    const { UNSAFE_getAllByType } = render(
      <Card size="lg">
        <Text>Content</Text>
      </Card>,
    );
    const views = UNSAFE_getAllByType(View);
    const cardView = views[0];
    const flatStyle = StyleSheet.flatten(cardView.props.style);
    expect(flatStyle).toMatchObject({
      padding: 20,
      borderRadius: 16,
    });
  });

  test("renders as Pressable when onPress provided", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Card onPress={onPress}>
        <Text>Pressable card</Text>
      </Card>,
    );
    const pressable = getByRole("button");
    expect(pressable).toBeTruthy();
  });

  test("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Card onPress={onPress}>
        <Text>Pressable card</Text>
      </Card>,
    );
    const pressable = getByRole("button");
    fireEvent.press(pressable);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test("renders as View when onPress not provided", () => {
    const { queryByRole } = render(
      <Card>
        <Text>Static card</Text>
      </Card>,
    );
    const pressable = queryByRole("button");
    expect(pressable).toBeNull();
  });

  test("merges custom style prop", () => {
    const { UNSAFE_getAllByType } = render(
      <Card style={{ marginTop: 20 }}>
        <Text>Content</Text>
      </Card>,
    );
    const views = UNSAFE_getAllByType(View);
    const cardView = views[0];
    const flatStyle = StyleSheet.flatten(cardView.props.style);
    expect(flatStyle).toMatchObject({ marginTop: 20 });
  });

  test("combines variant and size", () => {
    const { UNSAFE_getAllByType } = render(
      <Card variant="outline" size="lg">
        <Text>Content</Text>
      </Card>,
    );
    const views = UNSAFE_getAllByType(View);
    const cardView = views[0];
    const flatStyle = StyleSheet.flatten(cardView.props.style);
    expect(flatStyle).toMatchObject({
      padding: 20,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#E5E7EB",
    });
  });

  test("forwards additional ViewProps", () => {
    const { getByTestId } = render(
      <Card testID="custom-card">
        <Text>Content</Text>
      </Card>,
    );
    expect(getByTestId("custom-card")).toBeTruthy();
  });

  test("renders without children", () => {
    const { UNSAFE_getByType } = render(<Card />);
    const card = UNSAFE_getByType(Card);
    expect(card).toBeTruthy();
  });
});
