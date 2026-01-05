import { useEffect, useRef } from "react";
import {
  View,
  ViewProps,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
} from "react-native";
import { useTheme } from "../theme";

type ProgressVariant = "bar" | "circle";
type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends Omit<ViewProps, "children"> {
  value?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  color?: string;
  showValue?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Progress = ({
  value,
  variant = "bar",
  size = "md",
  color,
  showValue = false,
  style,
  ...props
}: ProgressProps) => {
  const { theme, colorScheme } = useTheme();
  const animValue = useRef(new Animated.Value(0)).current;

  const isIndeterminate = value === undefined;
  const clampedValue = Math.max(0, Math.min(100, value ?? 0));

  const progressColor = color ?? theme.component.progress.variant[colorScheme].fill;
  const trackColor = theme.component.progress.variant[colorScheme].track;
  const textColor = theme.semantic.colors.text.secondary;

  useEffect(() => {
    if (isIndeterminate) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: theme.primitive.duration.slow,
            easing: Easing.ease,
            useNativeDriver: false,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: theme.primitive.duration.slow,
            easing: Easing.ease,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    }
  }, [isIndeterminate, animValue, theme]);

  const accessibilityValue = isIndeterminate
    ? undefined
    : {
        min: 0,
        max: 100,
        now: clampedValue,
      };

  if (variant === "bar") {
    const barHeight = theme.component.progress.height[size];

    return (
      <View
        style={[baseStyles.container, style]}
        accessibilityRole="progressbar"
        accessibilityValue={accessibilityValue}
        {...props}
      >
        <View
          style={[
            barStyles.track,
            {
              height: barHeight,
              backgroundColor: trackColor,
              borderRadius: theme.component.progress.borderRadius,
            },
          ]}
        >
          {isIndeterminate ? (
            <Animated.View
              style={[
                barStyles.fill,
                {
                  height: barHeight,
                  backgroundColor: progressColor,
                  width: "30%",
                  borderRadius: theme.component.progress.borderRadius,
                  left: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          ) : (
            <View
              style={[
                barStyles.fill,
                {
                  height: barHeight,
                  backgroundColor: progressColor,
                  width: `${clampedValue}%`,
                  borderRadius: theme.component.progress.borderRadius,
                },
              ]}
            />
          )}
        </View>
        {showValue && !isIndeterminate && (
          <Text
            style={[
              barStyles.valueText,
              {
                color: textColor,
                marginTop: theme.primitive.spacing[2],
                fontSize: theme.primitive.fontSize.xs,
                fontWeight: theme.primitive.fontWeight.semibold,
              },
            ]}
          >
            {clampedValue}%
          </Text>
        )}
      </View>
    );
  }

  const circleSize = circleSizes[size];
  const strokeWidth = circleSize / 8;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isIndeterminate
    ? 0
    : circumference - (clampedValue / 100) * circumference;

  return (
    <View
      style={[
        baseStyles.container,
        circleStyles.container,
        { width: circleSize, height: circleSize },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityValue={accessibilityValue}
      {...props}
    >
      <View
        style={[
          circleStyles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            borderWidth: strokeWidth,
            borderColor: trackColor,
          },
        ]}
      >
        <View
          style={[
            circleStyles.progressRing,
            {
              width: circleSize - strokeWidth * 2,
              height: circleSize - strokeWidth * 2,
              borderRadius: (circleSize - strokeWidth * 2) / 2,
              borderWidth: strokeWidth,
              borderColor: progressColor,
              borderTopColor: isIndeterminate ? progressColor : "transparent",
              borderRightColor:
                strokeDashoffset < circumference * 0.25
                  ? progressColor
                  : "transparent",
              borderBottomColor:
                strokeDashoffset < circumference * 0.5
                  ? progressColor
                  : "transparent",
              borderLeftColor:
                strokeDashoffset < circumference * 0.75
                  ? progressColor
                  : "transparent",
            },
          ]}
        />
      </View>
      {showValue && !isIndeterminate && (
        <Text
          style={[
            circleStyles.valueText,
            {
              fontSize: circleSizes[size] <= 32 ? theme.primitive.fontSize.xs : theme.primitive.fontSize.sm,
              fontWeight: theme.primitive.fontWeight.semibold,
              color: textColor,
            },
          ]}
        >
          {clampedValue}%
        </Text>
      )}
    </View>
  );
};

Progress.displayName = "Progress";

const circleSizes = {
  sm: 32,
  md: 48,
  lg: 64,
};

const baseStyles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

const barStyles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
  },
  fill: {
    position: "absolute",
    left: 0,
  },
  valueText: {},
});

const circleStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressRing: {
    position: "absolute",
  },
  valueText: {
    position: "absolute",
  },
});
