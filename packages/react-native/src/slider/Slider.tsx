import { useRef, useState, forwardRef } from "react";
import {
  View,
  ViewProps,
  Text,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
  PanResponder,
  GestureResponderEvent,
} from "react-native";

export interface SliderProps extends Omit<ViewProps, "children"> {
  value: number | [number, number];
  onChange: (value: number | [number, number]) => void;
  onBlur?: () => void;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Slider = forwardRef<View, SliderProps>(
  (
    {
      value,
      onChange,
      onBlur,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      showValue = false,
      size = "md",
      color,
      style,
      ...props
    },
    ref,
  ) => {
    const colorScheme = useColorScheme() ?? "light";
    const [trackWidth, setTrackWidth] = useState(0);
    const trackRef = useRef<View>(null);

    const isRange = Array.isArray(value);
    const currentValue = isRange ? value[0] : value;
    const endValue = isRange ? value[1] : undefined;

    const themeColors = colorTheme[colorScheme];
    const activeColor = color ?? themeColors.active;

    const { trackHeight, thumbSize } = sizeMap[size];

    const normalizeValue = (val: number): number => {
      let normalized = Math.max(min, Math.min(max, val));
      if (step > 0) {
        normalized = Math.round(normalized / step) * step;
      }
      return normalized;
    };

    const getValueFromPosition = (position: number): number => {
      const percentage = Math.max(0, Math.min(1, position / trackWidth));
      return normalizeValue(min + percentage * (max - min));
    };

    const getPositionFromValue = (val: number): number => {
      return ((val - min) / (max - min)) * trackWidth;
    };

    const handlePan = (evt: GestureResponderEvent) => {
      if (disabled || trackWidth === 0) return;

      const { locationX } = evt.nativeEvent;
      const newValue = getValueFromPosition(locationX);

      if (isRange) {
        const [start, end] = value as [number, number];
        const distToStart = Math.abs(locationX - getPositionFromValue(start));
        const distToEnd = Math.abs(locationX - getPositionFromValue(end));

        if (distToStart < distToEnd) {
          onChange([newValue, end]);
        } else {
          onChange([start, newValue]);
        }
      } else {
        onChange(newValue);
      }
    };

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: handlePan,
        onPanResponderMove: handlePan,
        onPanResponderRelease: () => {
          onBlur?.();
        },
      }),
    ).current;

    const currentPosition = getPositionFromValue(currentValue);
    const endPosition =
      endValue !== undefined ? getPositionFromValue(endValue) : 0;

    const activeTrackLeft = isRange
      ? Math.min(currentPosition, endPosition)
      : 0;
    const activeTrackWidth = isRange
      ? Math.abs(endPosition - currentPosition)
      : currentPosition;

    return (
      <View
        ref={ref}
        style={[baseStyles.container, disabled && baseStyles.disabled, style]}
        {...props}
      >
        <View
          ref={trackRef}
          style={[baseStyles.track, { height: trackHeight }]}
          onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
          {...panResponder.panHandlers}
        >
          <View
            style={[
              baseStyles.inactiveTrack,
              {
                height: trackHeight,
                borderRadius: trackHeight / 2,
                backgroundColor: themeColors.inactive,
              },
            ]}
          />
          <View
            style={[
              baseStyles.activeTrack,
              {
                height: trackHeight,
                borderRadius: trackHeight / 2,
                backgroundColor: activeColor,
                left: activeTrackLeft,
                width: activeTrackWidth,
              },
            ]}
          />
          <View
            style={[
              baseStyles.thumb,
              {
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                backgroundColor: activeColor,
                left: currentPosition - thumbSize / 2,
              },
            ]}
          >
            {showValue && (
              <Text style={baseStyles.valueText}>{currentValue}</Text>
            )}
          </View>
          {isRange && endValue !== undefined && (
            <View
              style={[
                baseStyles.thumb,
                {
                  width: thumbSize,
                  height: thumbSize,
                  borderRadius: thumbSize / 2,
                  backgroundColor: activeColor,
                  left: endPosition - thumbSize / 2,
                },
              ]}
            >
              {showValue && (
                <Text style={baseStyles.valueText}>{endValue}</Text>
              )}
            </View>
          )}
        </View>
      </View>
    );
  },
);

Slider.displayName = "Slider";

const sizeMap = {
  sm: { trackHeight: 2, thumbSize: 16 },
  md: { trackHeight: 4, thumbSize: 20 },
  lg: { trackHeight: 6, thumbSize: 24 },
};

const colorTheme = {
  light: {
    inactive: "#E5E7EB",
    active: "#4A90E2",
  },
  dark: {
    inactive: "#4B5563",
    active: "#5AA2F5",
  },
};

const baseStyles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  track: {
    position: "relative",
    justifyContent: "center",
  },
  inactiveTrack: {
    position: "absolute",
    width: "100%",
  },
  activeTrack: {
    position: "absolute",
  },
  thumb: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  valueText: {
    position: "absolute",
    top: -24,
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
  disabled: {
    opacity: 0.5,
  },
});
