import {
  View,
  ViewProps,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";
import { useTheme } from "../theme";

type CardVariant = "elevated" | "outline" | "ghost" | "filled";
type CardSize = "sm" | "md" | "lg";

export interface CardProps extends Omit<ViewProps, "children"> {
  children?: ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Card = ({
  children,
  variant = "elevated",
  onPress,
  style,
  ...props
}: CardProps) => {
  const { theme, colorScheme } = useTheme();

  const getVariantStyles = () => {
    const variantTokens = theme.component.card.variant[colorScheme];

    switch (variant) {
      case "elevated":
        return {
          backgroundColor: variantTokens.elevated.background,
          borderColor: variantTokens.elevated.border,
          borderWidth: 0,
          ...variantTokens.elevated.shadow,
        };
      case "outline":
        return {
          backgroundColor: variantTokens.outlined.background,
          borderColor: variantTokens.outlined.border,
          borderWidth: 1,
          ...variantTokens.outlined.shadow,
        };
      case "ghost":
        return {
          backgroundColor: variantTokens.ghost.background,
          borderColor: variantTokens.ghost.border,
          borderWidth: 0,
          ...variantTokens.ghost.shadow,
        };
      case "filled":
        return {
          backgroundColor: variantTokens.filled.background,
          borderColor: variantTokens.filled.border,
          borderWidth: 0,
          ...variantTokens.filled.shadow,
        };
    }
  };

  const cardStyles = [
    baseStyles.card,
    {
      padding: theme.component.card.padding,
      borderRadius: theme.component.card.borderRadius,
    },
    getVariantStyles(),
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          ...cardStyles,
          pressed && {
            opacity: theme.component.card.variant[colorScheme].pressed.opacity,
          },
        ]}
        accessibilityRole="button"
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyles} {...props}>
      {children}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
});
