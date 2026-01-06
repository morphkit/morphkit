import { forwardRef, useEffect, useRef } from "react";
import {
  View,
  ViewProps,
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";
import { useTheme } from "../theme";

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
    const { theme, colorScheme } = useTheme();
    const animation = useRef(new Animated.Value(checked ? 1 : 0)).current;

    useEffect(() => {
      Animated.timing(animation, {
        toValue: checked ? 1 : 0,
        duration: theme.primitive.duration.normal,
        useNativeDriver: true,
      }).start();
    }, [checked, animation, theme]);

    const handlePress = () => {
      if (!disabled) {
        onChange(!checked);
      }
    };

    const { trackWidth, trackHeight, thumbSize, thumbPadding } =
      theme.component.switchComponent.size[size];

    const trackColor = disabled
      ? theme.component.switchComponent.variant[colorScheme].disabled.track
      : checked
        ? (color ??
          theme.component.switchComponent.variant[colorScheme].on.track)
        : theme.component.switchComponent.variant[colorScheme].off.track;

    const thumbColor = disabled
      ? theme.component.switchComponent.variant[colorScheme].disabled.thumb
      : checked
        ? theme.component.switchComponent.variant[colorScheme].on.thumb
        : theme.component.switchComponent.variant[colorScheme].off.thumb;

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
        style={[
          baseStyles.container,
          {
            gap: theme.primitive.spacing[2],
            minHeight: theme.primitive.spacing[12],
            opacity: disabled ? theme.semantic.state.disabled.opacity : 1,
          },
          style,
        ]}
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
                backgroundColor: thumbColor,
                ...theme.primitive.shadowPresets.sm,
                transform: [{ translateX: thumbTranslateX }],
              },
            ]}
          />
        </View>
        {label && (
          <Text
            style={[
              baseStyles.label,
              {
                fontSize: theme.primitive.fontSize.lg,
                color: theme.semantic.colors.text.primary,
              },
            ]}
          >
            {label}
          </Text>
        )}
      </Pressable>
    );
  },
);

Switch.displayName = "Switch";

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  track: {
    justifyContent: "center",
  },
  thumb: {},
  label: {},
});
