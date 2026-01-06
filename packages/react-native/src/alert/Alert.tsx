import { ReactNode } from "react";
import {
  View,
  ViewProps,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../theme";

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
  const { theme, colorScheme } = useTheme();

  const variantColors = theme.component.alert.variant[colorScheme][variant];
  const defaultIcon = icon ?? getDefaultIcon(variant);

  return (
    <View
      style={[
        baseStyles.container,
        {
          backgroundColor: variantColors.background,
          borderColor: variantColors.border,
          padding: theme.component.alert.padding,
          borderRadius: theme.component.alert.borderRadius,
          gap: theme.component.alert.gap,
        },
        style,
      ]}
      accessibilityRole="alert"
      {...props}
    >
      <View style={baseStyles.iconContainer}>
        {typeof defaultIcon === "string" ? (
          <Text
            style={[
              baseStyles.iconText,
              {
                color: variantColors.icon,
                fontSize: theme.component.alert.iconSize,
              },
            ]}
          >
            {defaultIcon}
          </Text>
        ) : (
          defaultIcon
        )}
      </View>

      <View style={[baseStyles.content, { gap: theme.primitive.spacing[1] }]}>
        <Text
          style={[
            baseStyles.title,
            {
              color: variantColors.text,
              fontSize: theme.primitive.fontSize.base,
              lineHeight:
                theme.primitive.fontSize.base *
                theme.primitive.lineHeight.normal,
            },
          ]}
        >
          {title}
        </Text>
        {description && (
          <Text
            style={[
              baseStyles.description,
              {
                color: variantColors.text,
                fontSize: theme.primitive.fontSize.md,
                lineHeight:
                  theme.primitive.fontSize.md *
                  theme.primitive.lineHeight.normal,
              },
            ]}
          >
            {description}
          </Text>
        )}
      </View>

      {dismissible && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss alert"
          hitSlop={theme.primitive.spacing[2]}
          style={baseStyles.dismissButton}
        >
          <Text
            style={[
              baseStyles.dismissIcon,
              {
                color: variantColors.text,
                fontSize: theme.component.alert.iconSize,
              },
            ]}
          >
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

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
  },
  iconContainer: {
    marginTop: 2,
  },
  iconText: {
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
  },
  description: {},
  dismissButton: {
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  dismissIcon: {
    fontWeight: "bold",
  },
});
