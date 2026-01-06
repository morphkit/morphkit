import { useEffect, useRef } from "react";
import {
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { Typography } from "../typography";

type ToastVariant = "info" | "success" | "warning" | "error";
type ToastPosition = "top" | "bottom";

export interface ToastProps extends Omit<ViewProps, "children"> {
  visible: boolean;
  variant?: ToastVariant;
  message: string;
  duration?: number;
  position?: ToastPosition;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Toast = ({
  visible,
  variant = "info",
  message,
  duration = 3000,
  position = "bottom",
  onDismiss,
  style,
  ...props
}: ToastProps) => {
  const { theme, colorScheme } = useTheme();
  const slideValue = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const variantColors = theme.component.toast.variant[colorScheme][variant];

  useEffect(() => {
    if (visible) {
      Animated.spring(slideValue, {
        toValue: 1,
        ...theme.component.toast.animation.spring,
        useNativeDriver: true,
      }).start();

      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          onDismiss?.();
        }, duration);
      }
    } else {
      Animated.timing(slideValue, {
        toValue: 0,
        duration: theme.component.toast.animation.duration,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible, duration, onDismiss, slideValue, theme]);

  const translateY = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: position === "top" ? [-100, 0] : [100, 0],
  });

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        baseStyles.container,
        position === "top"
          ? { top: theme.component.toast.position.offset }
          : { bottom: theme.component.toast.position.offset },
        {
          left: theme.component.toast.position.horizontal,
          right: theme.component.toast.position.horizontal,
          backgroundColor: variantColors.background,
          borderColor: variantColors.border,
          padding: theme.component.toast.padding,
          borderRadius: theme.component.toast.borderRadius,
          gap: theme.component.toast.gap,
          ...variantColors.shadow,
          transform: [{ translateY }],
          opacity: slideValue,
        },
        style,
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      {...props}
    >
      {getIcon(variant, variantColors.icon, theme.component.toast.iconSize)}
      <Typography
        variant="body"
        style={[
          baseStyles.message,
          {
            color: variantColors.text,
          },
        ]}
      >
        {message}
      </Typography>
    </Animated.View>
  );
};

Toast.displayName = "Toast";

const getIcon = (variant: ToastVariant, color: string, size: number) => {
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
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  icon: {
    fontWeight: "bold",
  },
  message: {
    flex: 1,
  },
});
