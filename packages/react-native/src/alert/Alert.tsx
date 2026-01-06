import { ReactNode } from "react";
import {
  View,
  ViewProps,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { Typography } from "../typography";

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
  const defaultIcon =
    icon ??
    getDefaultIcon(variant, variantColors.icon, theme.component.alert.iconSize);

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
      <View style={baseStyles.iconContainer}>{defaultIcon}</View>

      <View
        style={[baseStyles.content, { gap: theme.component.alert.contentGap }]}
      >
        <Typography
          variant="body"
          style={[
            baseStyles.title,
            {
              color: variantColors.text,
            },
          ]}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="footnote"
            style={[
              baseStyles.description,
              {
                color: variantColors.text,
              },
            ]}
          >
            {description}
          </Typography>
        )}
      </View>

      {dismissible && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss alert"
          hitSlop={theme.component.alert.dismissHitSlop}
          style={baseStyles.dismissButton}
        >
          <Ionicons
            name="close"
            size={theme.component.alert.iconSize}
            color={variantColors.text}
          />
        </Pressable>
      )}
    </View>
  );
};

Alert.displayName = "Alert";

const getDefaultIcon = (
  variant: AlertVariant,
  color: string,
  size: number,
): ReactNode => {
  const iconMap = {
    success: "checkmark-circle",
    warning: "warning",
    error: "close-circle",
    info: "information-circle",
  } as const;

  return <Ionicons name={iconMap[variant]} size={size} color={color} />;
};

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
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
