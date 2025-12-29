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
} from "react-native";

type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<ViewProps, "children"> {
  variant?: AlertVariant;
  title: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Alert = ({
  variant = "info",
  title,
  description,
  dismissible = false,
  onDismiss,
  icon,
  style,
  ...props
}: AlertProps) => {
  const colorScheme = useColorScheme() ?? "light";

  const variantColors = colors[colorScheme][variant];
  const defaultIcon = icon ?? getDefaultIcon(variant);

  return (
    <View
      style={[
        baseStyles.container,
        {
          backgroundColor: variantColors.background,
          borderColor: variantColors.border,
        },
        style,
      ]}
      accessibilityRole="alert"
      {...props}
    >
      <View style={baseStyles.iconContainer}>
        {typeof defaultIcon === "string" ? (
          <Text style={[baseStyles.iconText, { color: variantColors.icon }]}>
            {defaultIcon}
          </Text>
        ) : (
          defaultIcon
        )}
      </View>

      <View style={baseStyles.content}>
        <Text style={[baseStyles.title, { color: variantColors.text }]}>
          {title}
        </Text>
        {description && (
          <Text style={[baseStyles.description, { color: variantColors.text }]}>
            {description}
          </Text>
        )}
      </View>

      {dismissible && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss alert"
          hitSlop={8}
          style={baseStyles.dismissButton}
        >
          <Text style={[baseStyles.dismissIcon, { color: variantColors.text }]}>
            ×
          </Text>
        </Pressable>
      )}
    </View>
  );
};

Alert.displayName = "Alert";

const getDefaultIcon = (variant: AlertVariant): string => {
  switch (variant) {
    case "success":
      return "✓";
    case "warning":
      return "⚠";
    case "error":
      return "✕";
    case "info":
    default:
      return "ℹ";
  }
};

const colors = {
  light: {
    info: {
      background: "#EFF6FF",
      border: "#DBEAFE",
      text: "#1E40AF",
      icon: "#3B82F6",
    },
    success: {
      background: "#F0FDF4",
      border: "#D1FAE5",
      text: "#065F46",
      icon: "#10B981",
    },
    warning: {
      background: "#FFFBEB",
      border: "#FEF3C7",
      text: "#92400E",
      icon: "#F59E0B",
    },
    error: {
      background: "#FEF2F2",
      border: "#FEE2E2",
      text: "#991B1B",
      icon: "#EF4444",
    },
  },
  dark: {
    info: {
      background: "#1E3A8A",
      border: "#1E40AF",
      text: "#DBEAFE",
      icon: "#60A5FA",
    },
    success: {
      background: "#064E3B",
      border: "#065F46",
      text: "#D1FAE5",
      icon: "#34D399",
    },
    warning: {
      background: "#78350F",
      border: "#92400E",
      text: "#FEF3C7",
      icon: "#FBBF24",
    },
    error: {
      background: "#7F1D1D",
      border: "#991B1B",
      text: "#FEE2E2",
      icon: "#F87171",
    },
  },
};

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
  },
  iconContainer: {
    marginTop: 2,
  },
  iconText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  dismissButton: {
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  dismissIcon: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
