import { useEffect, useRef } from "react";
import {
  View,
  ViewProps,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
} from "react-native";

export interface SpinnerProps extends Omit<ViewProps, "children"> {
  size?: "sm" | "md" | "lg" | number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Spinner = ({
  size = "md",
  color,
  style,
  ...props
}: SpinnerProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const spinValue = useRef(new Animated.Value(0)).current;

  const spinnerSize = typeof size === "number" ? size : sizeMap[size];
  const spinnerColor = color ?? colors[colorScheme].primary;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={[baseStyles.container, style]}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      {...props}
    >
      <Animated.View
        style={[
          baseStyles.spinner,
          {
            width: spinnerSize,
            height: spinnerSize,
            borderColor: spinnerColor,
            borderTopColor: "transparent",
            borderRadius: spinnerSize / 2,
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
};

Spinner.displayName = "Spinner";

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

const colors = {
  light: {
    primary: "#4A90E2",
  },
  dark: {
    primary: "#5AA2F5",
  },
};

const baseStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    borderWidth: 2,
  },
});
