import {
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";
import { ReactNode, useRef } from "react";

type FABPlacement =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";
type FABVariant = "primary" | "secondary";
type FABSize = "sm" | "md" | "lg";

export interface FABProps extends Omit<PressableProps, "children"> {
  icon: ReactNode;
  onPress: () => void;
  label?: string;
  size?: FABSize;
  placement?: FABPlacement;
  variant?: FABVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const FAB = ({
  icon,
  onPress,
  label,
  size = "md",
  placement = "bottom-right",
  variant = "primary",
  disabled = false,
  style,
  ...props
}: FABProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const isExtended = label !== undefined;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getPlacementStyles = (): ViewStyle => {
    const offset = 16;
    switch (placement) {
      case "top-left":
        return { top: offset, left: offset };
      case "top-right":
        return { top: offset, right: offset };
      case "top-center":
        return { top: offset, alignSelf: "center" };
      case "bottom-left":
        return { bottom: offset, left: offset };
      case "bottom-right":
        return { bottom: offset, right: offset };
      case "bottom-center":
        return { bottom: offset, alignSelf: "center" };
    }
  };

  const themeStyles = fabColors[colorScheme][variant];
  const sizeStyle = isExtended ? extendedSizeStyles[size] : sizeStyles[size];
  const placementStyles = getPlacementStyles();

  const containerStyles = [
    baseStyles.container,
    themeStyles,
    sizeStyle,
    placementStyles,
    isExtended && baseStyles.extended,
    disabled && baseStyles.disabled,
    style,
  ];

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleValue }], opacity: opacityValue },
        containerStyles,
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label || props.accessibilityLabel}
        accessibilityState={{ disabled }}
        style={[
          baseStyles.pressable,
          isExtended && baseStyles.extendedPressable,
        ]}
        {...props}
      >
        {icon}
        {isExtended && label && (
          <Text style={[baseStyles.label, fabColors[colorScheme].text]}>
            {label}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

FAB.displayName = "FAB";

const baseStyles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 999,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  pressable: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  extended: {
    flexDirection: "row",
  },
  extendedPressable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  md: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  lg: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
});

const extendedSizeStyles = StyleSheet.create({
  sm: {
    height: 40,
    borderRadius: 20,
    minWidth: 80,
  },
  md: {
    height: 56,
    borderRadius: 28,
    minWidth: 96,
  },
  lg: {
    height: 64,
    borderRadius: 32,
    minWidth: 112,
  },
});

const fabColors = {
  light: StyleSheet.create({
    primary: {
      backgroundColor: "#4A90E2",
    },
    secondary: {
      backgroundColor: "#6B7280",
    },
    text: {
      color: "#FFFFFF",
    },
  }),
  dark: StyleSheet.create({
    primary: {
      backgroundColor: "#5AA2F5",
    },
    secondary: {
      backgroundColor: "#9CA3AF",
    },
    text: {
      color: "#FFFFFF",
    },
  }),
};
