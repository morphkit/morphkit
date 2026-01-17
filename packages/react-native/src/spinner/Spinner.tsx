import { useEffect, useRef } from "react";
import {
  View,
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
} from "react-native";
import { useTheme } from "../theme";

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
  const { theme, colorScheme } = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  const spinnerSize =
    typeof size === "number" ? size : theme.component.spinner.size[size];
  const strokeWidth =
    typeof size === "number" ? 2 : theme.component.spinner.strokeWidth[size];
  const spinnerColor =
    color ?? theme.component.spinner.variant[colorScheme].color;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: theme.component.spinner.duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue, theme.component.spinner.duration]);

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
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderWidth: strokeWidth,
          borderColor: spinnerColor,
          borderTopColor: theme.component.spinner.borderTopColor,
          borderRadius: spinnerSize / 2,
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
};

Spinner.displayName = "Spinner";

const baseStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
