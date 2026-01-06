import { ReactNode } from "react";
import {
  View,
  ViewProps,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { Typography } from "../typography";

type TagVariant = "default" | "primary" | "success" | "warning" | "error";
type TagSize = "sm" | "md" | "lg";

export interface TagProps extends Omit<ViewProps, "children"> {
  children: ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  dismissible?: boolean;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Tag = ({
  children,
  variant = "default",
  size = "md",
  dismissible = false,
  onDismiss,
  style,
  ...props
}: TagProps) => {
  const { theme, colorScheme } = useTheme();

  const variantTokens =
    variant === "default"
      ? theme.component.tag.variant[colorScheme].secondary
      : theme.component.tag.variant[colorScheme][variant];
  const sizeTokens = theme.component.tag.size[size];

  const containerStyles: ViewStyle[] = [
    baseStyles.container,
    {
      paddingHorizontal: sizeTokens.paddingHorizontal,
      paddingVertical: sizeTokens.paddingVertical,
      minHeight: sizeTokens.minHeight,
      gap: sizeTokens.gap,
      borderRadius: theme.component.tag.borderRadius,
      backgroundColor: variantTokens.background,
      borderColor: variantTokens.border,
    },
    style as ViewStyle,
  ];

  const textStyles: TextStyle[] = [
    baseStyles.text,
    {
      fontWeight: theme.component.tag.fontWeight,
      color: variantTokens.text,
      fontSize: theme.primitive.fontSize[size],
    },
  ];

  if (!dismissible) {
    return (
      <View style={containerStyles} accessibilityRole="text" {...props}>
        <Typography variant="callout" style={textStyles}>
          {children}
        </Typography>
      </View>
    );
  }

  return (
    <View style={containerStyles} {...props}>
      <Typography variant="callout" style={textStyles}>
        {children}
      </Typography>
      <Pressable
        onPress={onDismiss}
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
        hitSlop={theme.primitive.spacing[2]}
        style={baseStyles.dismissButton}
      >
        <Ionicons
          name="close"
          size={sizeTokens.fontSize}
          color={variantTokens.text}
        />
      </Pressable>
    </View>
  );
};

Tag.displayName = "Tag";

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  text: {},
  dismissButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  dismissIcon: {
    fontWeight: "bold",
  },
});
