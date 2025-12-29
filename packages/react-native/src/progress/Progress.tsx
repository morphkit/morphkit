import { useEffect, useRef } from "react";
import {
  View,
  ViewProps,
  Text,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
} from "react-native";

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
  const colorScheme = useColorScheme() ?? "light";
  const animValue = useRef(new Animated.Value(0)).current;

  const isIndeterminate = value === undefined;
  const clampedValue = Math.max(0, Math.min(100, value ?? 0));

  const progressColor = color ?? colors[colorScheme].progress;
  const themeColors = colors[colorScheme];

  useEffect(() => {
    if (isIndeterminate) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: false,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    }
  }, [isIndeterminate, animValue]);

  const accessibilityValue = isIndeterminate
    ? undefined
    : {
        min: 0,
        max: 100,
        now: clampedValue,
      };

  if (variant === "bar") {
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
              height: barSizes[size],
              backgroundColor: themeColors.track,
            },
          ]}
        >
          {isIndeterminate ? (
            <Animated.View
              style={[
                barStyles.fill,
                {
                  height: barSizes[size],
                  backgroundColor: progressColor,
                  width: "30%",
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
                  height: barSizes[size],
                  backgroundColor: progressColor,
                  width: `${clampedValue}%`,
                },
              ]}
            />
          )}
        </View>
        {showValue && !isIndeterminate && (
          <Text style={[barStyles.valueText, { color: themeColors.text }]}>
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
            borderColor: themeColors.track,
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
            circleSizes[size] <= 32 && { fontSize: 10 },
            { color: themeColors.text },
          ]}
        >
          {clampedValue}%
        </Text>
      )}
    </View>
  );
};

Progress.displayName = "Progress";

const barSizes = {
  sm: 4,
  md: 8,
  lg: 12,
};

const circleSizes = {
  sm: 32,
  md: 48,
  lg: 64,
};

const colors = {
  light: {
    track: "#E5E7EB",
    progress: "#4A90E2",
    text: "#374151",
  },
  dark: {
    track: "#4B5563",
    progress: "#5AA2F5",
    text: "#E5E7EB",
  },
};

const baseStyles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

const barStyles = StyleSheet.create({
  track: {
    width: "100%",
    borderRadius: 999,
    overflow: "hidden",
    position: "relative",
  },
  fill: {
    borderRadius: 999,
    position: "absolute",
    left: 0,
  },
  valueText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
  },
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
    fontSize: 12,
    fontWeight: "600",
  },
});
