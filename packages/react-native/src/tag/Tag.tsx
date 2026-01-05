import { ReactNode } from "react";
import {
  View,
  ViewProps,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../theme";

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

  const getVariantColors = () => {
    switch (variant) {
      case "primary":
        return theme.component.tag.variant[colorScheme].primary;
      case "default":
        return theme.component.tag.variant[colorScheme].secondary;
      case "success":
        return {
          background: theme.semantic.colors.status.success.surface,
          border: theme.semantic.colors.status.success.border,
          text: theme.semantic.colors.status.success.text,
        };
      case "warning":
        return {
          background: theme.semantic.colors.status.warning.surface,
          border: theme.semantic.colors.status.warning.border,
          text: theme.semantic.colors.status.warning.text,
        };
      case "error":
        return {
          background: theme.semantic.colors.status.error.surface,
          border: theme.semantic.colors.status.error.border,
          text: theme.semantic.colors.status.error.text,
        };
    }
  };

  const variantColors = getVariantColors();

  const sizeMap = {
    sm: {
      paddingHorizontal: theme.primitive.spacing[1.5],
      paddingVertical: theme.primitive.spacing[0.5],
      minHeight: 20,
      gap: theme.primitive.spacing[1],
      fontSize: theme.primitive.fontSize.xs,
      lineHeight: theme.primitive.fontSize.xs * theme.primitive.lineHeight.normal,
    },
    md: {
      paddingHorizontal: theme.component.tag.paddingHorizontal,
      paddingVertical: theme.component.tag.paddingVertical,
      minHeight: 24,
      gap: theme.component.tag.gap,
      fontSize: theme.component.tag.fontSize,
      lineHeight: theme.component.tag.fontSize * theme.primitive.lineHeight.normal,
    },
    lg: {
      paddingHorizontal: theme.primitive.spacing[2.5],
      paddingVertical: theme.primitive.spacing[1.5],
      minHeight: 32,
      gap: theme.primitive.spacing[2],
      fontSize: theme.primitive.fontSize.md,
      lineHeight: theme.primitive.fontSize.md * theme.primitive.lineHeight.relaxed,
    },
  };
  const sizeTokens = sizeMap[size];

  const containerStyles: ViewStyle[] = [
    baseStyles.container,
    {
      paddingHorizontal: sizeTokens.paddingHorizontal,
      paddingVertical: sizeTokens.paddingVertical,
      minHeight: sizeTokens.minHeight,
      gap: sizeTokens.gap,
      borderRadius: theme.component.tag.borderRadius,
      backgroundColor: variantColors.background,
      borderColor: variantColors.border,
    },
    style as ViewStyle,
  ];

  const textStyles: TextStyle[] = [
    baseStyles.text,
    {
      fontSize: sizeTokens.fontSize,
      lineHeight: sizeTokens.lineHeight,
      fontWeight: theme.primitive.fontWeight.semibold,
      color: variantColors.text,
    },
  ];

  if (!dismissible) {
    return (
      <View style={containerStyles} accessibilityRole="text" {...props}>
        <Text style={textStyles}>{children}</Text>
      </View>
    );
  }

  return (
    <View style={containerStyles} {...props}>
      <Text style={textStyles}>{children}</Text>
      <Pressable
        onPress={onDismiss}
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
        hitSlop={theme.primitive.spacing[2]}
        style={baseStyles.dismissButton}
      >
        <Text
          style={[
            baseStyles.dismissIcon,
            {
              fontSize: sizeTokens.fontSize,
              lineHeight: sizeTokens.lineHeight,
              color: variantColors.text,
            },
          ]}
        >
          ×
        </Text>
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
