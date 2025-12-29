import { forwardRef, useEffect, useRef } from "react";
import {
  View,
  ViewProps,
  Pressable,
  Text,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";

export interface SwitchProps extends Omit<ViewProps, "children"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  name?: string;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Switch = forwardRef<View, SwitchProps>(
  (
    {
      checked,
      onChange,
      onBlur,
      name,
      label,
      disabled = false,
      size = "md",
      color,
      style,
      ...props
    },
    ref,
  ) => {
    const colorScheme = useColorScheme() ?? "light";
    const animation = useRef(new Animated.Value(checked ? 1 : 0)).current;

    useEffect(() => {
      Animated.timing(animation, {
        toValue: checked ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [checked, animation]);

    const handlePress = () => {
      if (!disabled) {
        onChange(!checked);
      }
    };

    const { trackWidth, trackHeight, thumbSize, thumbPadding } = sizeMap[size];

    const themeColors = colorTheme[colorScheme];
    const activeColor = color ?? themeColors.active;
    const trackColor = checked ? activeColor : themeColors.inactive;

    const thumbTranslateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [thumbPadding, trackWidth - thumbSize - thumbPadding],
    });

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        onPressOut={onBlur}
        disabled={disabled}
        style={[baseStyles.container, disabled && baseStyles.disabled, style]}
        accessibilityRole="switch"
        accessibilityState={{ checked }}
        accessibilityLabel={label || name}
        {...props}
      >
        <View
          style={[
            baseStyles.track,
            {
              width: trackWidth,
              height: trackHeight,
              borderRadius: trackHeight / 2,
              backgroundColor: trackColor,
            },
          ]}
        >
          <Animated.View
            style={[
              baseStyles.thumb,
              {
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                transform: [{ translateX: thumbTranslateX }],
              },
            ]}
          />
        </View>
        {label && <Text style={baseStyles.label}>{label}</Text>}
      </Pressable>
    );
  },
);

Switch.displayName = "Switch";

const sizeMap = {
  sm: { trackWidth: 32, trackHeight: 20, thumbSize: 16, thumbPadding: 2 },
  md: { trackWidth: 40, trackHeight: 24, thumbSize: 20, thumbPadding: 2 },
  lg: { trackWidth: 48, trackHeight: 28, thumbSize: 24, thumbPadding: 2 },
};

const colorTheme = {
  light: {
    inactive: "#D1D5DB",
    active: "#4A90E2",
  },
  dark: {
    inactive: "#6B7280",
    active: "#5AA2F5",
  },
};

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 44,
  },
  track: {
    justifyContent: "center",
  },
  thumb: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: "#374151",
  },
  disabled: {
    opacity: 0.5,
  },
});
