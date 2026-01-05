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
          shadowColor: theme.primitive.shadowPresets.md.shadowColor,
        };
      case "outline":
        return {
          backgroundColor: variantTokens.outlined.background,
          borderColor: variantTokens.outlined.border,
          borderWidth: 1,
          ...variantTokens.outlined.shadow,
          shadowColor: theme.primitive.shadowPresets.sm.shadowColor,
        };
      case "ghost":
        return {
          backgroundColor: theme.semantic.colors.surface.secondary,
          borderWidth: 0,
        };
      case "filled":
        return {
          backgroundColor: theme.semantic.colors.surface.tertiary,
          borderWidth: 0,
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
          pressed && { opacity: theme.semantic.state.pressed.opacity },
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
