import { useEffect, useRef } from "react";
import {
  ViewProps,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";
import { useTheme } from "../theme";

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
          shadowColor: variantColors.shadow.shadowColor,
          shadowOffset: variantColors.shadow.offset,
          shadowOpacity: variantColors.shadow.opacity,
          shadowRadius: variantColors.shadow.radius,
          elevation: variantColors.shadow.elevation,
          transform: [{ translateY }],
          opacity: slideValue,
        },
        style,
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      {...props}
    >
      <Text
        style={[
          baseStyles.icon,
          {
            color: variantColors.icon,
            fontSize: theme.component.toast.iconSize,
          },
        ]}
      >
        {getIcon(variant)}
      </Text>
      <Text
        style={[
          baseStyles.message,
          {
            color: variantColors.text,
            fontSize: theme.component.toast.text.fontSize,
            lineHeight:
              theme.component.toast.text.fontSize *
              theme.component.toast.text.lineHeight,
          },
        ]}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

Toast.displayName = "Toast";

const getIcon = (variant: ToastVariant): string => {
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
