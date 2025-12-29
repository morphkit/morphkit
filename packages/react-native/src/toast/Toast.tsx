import { useEffect, useRef } from "react";
import {
  ViewProps,
  Text,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";

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
  const colorScheme = useColorScheme() ?? "light";
  const slideValue = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const variantColors = colors[colorScheme][variant];

  useEffect(() => {
    if (visible) {
      Animated.spring(slideValue, {
        toValue: 1,
        friction: 8,
        tension: 40,
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
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible, duration, onDismiss, slideValue]);

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
        position === "top" ? baseStyles.positionTop : baseStyles.positionBottom,
        {
          backgroundColor: variantColors.background,
          borderColor: variantColors.border,
          transform: [{ translateY }],
          opacity: slideValue,
        },
        style,
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      {...props}
    >
      <Text style={[baseStyles.icon, { color: variantColors.icon }]}>
        {getIcon(variant)}
      </Text>
      <Text style={[baseStyles.message, { color: variantColors.text }]}>
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
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  positionTop: {
    top: 48,
  },
  positionBottom: {
    bottom: 48,
  },
  icon: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
