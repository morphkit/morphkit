import { ReactNode } from "react";
import {
  View,
  ViewProps,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

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
  const colorScheme = useColorScheme() ?? "light";

  const variantColors = colors[colorScheme][variant];
  const sizing = sizeStyles[size];

  const containerStyles: ViewStyle[] = [
    baseStyles.container,
    sizing.container,
    {
      backgroundColor: variantColors.background,
      borderColor: variantColors.border,
    },
    style as ViewStyle,
  ];

  const textStyles: TextStyle[] = [
    baseStyles.text,
    sizing.text,
    {
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
        hitSlop={8}
        style={baseStyles.dismissButton}
      >
        <Text
          style={[
            baseStyles.dismissIcon,
            sizing.text,
            { color: variantColors.text },
          ]}
        >
          ×
        </Text>
      </Pressable>
    </View>
  );
};

Tag.displayName = "Tag";

const sizeStyles = {
  sm: StyleSheet.create({
    container: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      minHeight: 20,
      gap: 4,
    },
    text: {
      fontSize: 11,
      lineHeight: 16,
    },
  }),
  md: StyleSheet.create({
    container: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      minHeight: 24,
      gap: 6,
    },
    text: {
      fontSize: 13,
      lineHeight: 16,
    },
  }),
  lg: StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      minHeight: 32,
      gap: 8,
    },
    text: {
      fontSize: 15,
      lineHeight: 20,
    },
  }),
};

const colors = {
  light: {
    default: {
      background: "#E5E7EB",
      border: "#D1D5DB",
      text: "#374151",
    },
    primary: {
      background: "#DBEAFE",
      border: "#BFDBFE",
      text: "#1E40AF",
    },
    success: {
      background: "#D1FAE5",
      border: "#A7F3D0",
      text: "#065F46",
    },
    warning: {
      background: "#FEF3C7",
      border: "#FDE68A",
      text: "#92400E",
    },
    error: {
      background: "#FEE2E2",
      border: "#FECACA",
      text: "#991B1B",
    },
  },
  dark: {
    default: {
      background: "#374151",
      border: "#4B5563",
      text: "#E5E7EB",
    },
    primary: {
      background: "#1E3A8A",
      border: "#1E40AF",
      text: "#DBEAFE",
    },
    success: {
      background: "#064E3B",
      border: "#065F46",
      text: "#D1FAE5",
    },
    warning: {
      background: "#78350F",
      border: "#92400E",
      text: "#FEF3C7",
    },
    error: {
      background: "#7F1D1D",
      border: "#991B1B",
      text: "#FEE2E2",
    },
  },
};

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
  },
  text: {
    fontWeight: "600",
  },
  dismissButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  dismissIcon: {
    fontWeight: "bold",
  },
});
