import {
  View,
  ViewProps,
  Pressable,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";

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
  size = "md",
  onPress,
  style,
  ...props
}: CardProps) => {
  const colorScheme = useColorScheme() ?? "light";

  const cardStyles = [
    baseStyles.card,
    sizeStyles[size],
    variantTheme[colorScheme][variant],
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          ...cardStyles,
          pressed && pressedTheme[colorScheme],
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

const sizeStyles = StyleSheet.create({
  sm: {
    padding: 12,
    borderRadius: 8,
  },
  md: {
    padding: 16,
    borderRadius: 12,
  },
  lg: {
    padding: 20,
    borderRadius: 16,
  },
});

const variantTheme = {
  light: StyleSheet.create({
    elevated: {
      backgroundColor: "#FFFFFF",
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    outline: {
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    },
    ghost: {
      backgroundColor: "#F9FAFB",
    },
    filled: {
      backgroundColor: "#F3F4F6",
    },
  }),
  dark: StyleSheet.create({
    elevated: {
      backgroundColor: "#1F2937",
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 2,
    },
    outline: {
      backgroundColor: "#1F2937",
      borderWidth: 1,
      borderColor: "#374151",
    },
    ghost: {
      backgroundColor: "#111827",
    },
    filled: {
      backgroundColor: "#374151",
    },
  }),
};

const pressedTheme = {
  light: { opacity: 0.8 },
  dark: { opacity: 0.8 },
};
