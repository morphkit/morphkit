import {
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";
import { ReactNode, useRef } from "react";
import { useTheme } from "../theme";

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
  const { theme, colorScheme } = useTheme();
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
        toValue: theme.semantic.state.hover.opacity,
        duration: theme.primitive.duration.fast,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        ...theme.primitive.spring.default,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: theme.primitive.duration.fast,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getPlacementStyles = (): ViewStyle => {
    const offset = theme.component.fab.offset;
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

  const variantColors = theme.component.fab.variant[colorScheme][variant];
  const sizeTokens = theme.component.fab.size[size];
  const placementStyles = getPlacementStyles();

  const extendedSizeMap = {
    sm: {
      height: sizeTokens.height,
      borderRadius: sizeTokens.borderRadius,
      minWidth: 80,
    },
    md: {
      height: sizeTokens.height,
      borderRadius: sizeTokens.borderRadius,
      minWidth: 96,
    },
    lg: {
      height: sizeTokens.height,
      borderRadius: sizeTokens.borderRadius,
      minWidth: 112,
    },
  };

  const containerStyles: ViewStyle = {
    ...baseStyles.container,
    backgroundColor: variantColors.background,
    width: isExtended ? undefined : sizeTokens.width,
    height: sizeTokens.height,
    borderRadius: sizeTokens.borderRadius,
    minWidth: isExtended ? extendedSizeMap[size].minWidth : undefined,
    ...theme.primitive.shadowPresets.lg,
    ...placementStyles,
    flexDirection: isExtended ? ("row" as const) : undefined,
    opacity: disabled ? theme.semantic.state.disabled.opacity : undefined,
    shadowOpacity: disabled ? 0 : undefined,
    elevation: disabled ? 0 : undefined,
    ...(style as ViewStyle),
  };

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
          isExtended && {
            flexDirection: "row",
            alignItems: "center",
            gap: theme.primitive.spacing[2],
            paddingHorizontal: theme.primitive.spacing[4],
          },
        ]}
        {...props}
      >
        {icon}
        {isExtended && label && (
          <Text
            style={[
              {
                fontSize: theme.primitive.fontSize.base,
                fontWeight: theme.primitive.fontWeight.semibold,
                color: variantColors.icon,
              },
            ]}
          >
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
  },
  pressable: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
