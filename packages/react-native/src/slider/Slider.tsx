import { useRef, useState, forwardRef } from "react";
import {
  View,
  ViewProps,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  PanResponder,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "../theme";

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
    const { theme, colorScheme } = useTheme();
    const [trackWidth, setTrackWidth] = useState(0);
    const trackRef = useRef<View>(null);

    const isRange = Array.isArray(value);
    const currentValue = isRange ? value[0] : value;
    const endValue = isRange ? value[1] : undefined;

    const trackHeight = theme.component.slider.trackHeight;
    const thumbSize = theme.component.slider.thumbSize[size];
    const activeColor =
      color ?? theme.component.slider.variant[colorScheme].track.active;
    const inactiveColor =
      theme.component.slider.variant[colorScheme].track.inactive;
    const thumbColor = theme.component.slider.variant[colorScheme].thumb;
    const thumbBorderColor =
      theme.component.slider.variant[colorScheme].thumbBorder;

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
        style={[
          baseStyles.container,
          {
            paddingVertical: theme.primitive.spacing[5],
            opacity: disabled ? theme.semantic.state.disabled.opacity : 1,
          },
          style,
        ]}
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
                backgroundColor: inactiveColor,
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
                backgroundColor: thumbColor,
                borderWidth: 2,
                borderColor: thumbBorderColor,
                left: currentPosition - thumbSize / 2,
                shadowColor: theme.primitive.shadowPresets.sm.shadowColor,
                shadowOffset: theme.primitive.shadowPresets.sm.offset,
                shadowOpacity: theme.primitive.shadowPresets.sm.opacity,
                shadowRadius: theme.primitive.shadowPresets.sm.radius,
                elevation: theme.primitive.shadowPresets.sm.elevation,
              },
            ]}
          >
            {showValue && (
              <Text
                style={[
                  baseStyles.valueText,
                  {
                    top: -theme.primitive.spacing[6],
                    fontSize: theme.primitive.fontSize.xs,
                    fontWeight: theme.primitive.fontWeight.semibold,
                    color: theme.semantic.colors.text.primary,
                  },
                ]}
              >
                {currentValue}
              </Text>
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
                  backgroundColor: thumbColor,
                  borderWidth: 2,
                  borderColor: thumbBorderColor,
                  left: endPosition - thumbSize / 2,
                  shadowColor: theme.primitive.shadowPresets.sm.shadowColor,
                  shadowOffset: theme.primitive.shadowPresets.sm.offset,
                  shadowOpacity: theme.primitive.shadowPresets.sm.opacity,
                  shadowRadius: theme.primitive.shadowPresets.sm.radius,
                  elevation: theme.primitive.shadowPresets.sm.elevation,
                },
              ]}
            >
              {showValue && (
                <Text
                  style={[
                    baseStyles.valueText,
                    {
                      top: -theme.primitive.spacing[6],
                      fontSize: theme.primitive.fontSize.xs,
                      fontWeight: theme.primitive.fontWeight.semibold,
                      color: theme.semantic.colors.text.primary,
                    },
                  ]}
                >
                  {endValue}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    );
  },
);

Slider.displayName = "Slider";

const baseStyles = StyleSheet.create({
  container: {},
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
  },
  valueText: {
    position: "absolute",
  },
});
