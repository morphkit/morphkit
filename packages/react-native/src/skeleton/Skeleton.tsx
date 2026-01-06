import { useEffect, useRef, useState } from "react";
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

type SkeletonVariant = "rect" | "circle" | "text";

export interface SkeletonProps extends Omit<ViewProps, "children"> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  style?: StyleProp<ViewStyle>;
}

export const Skeleton = ({
  variant = "rect",
  width,
  height,
  style,
  ...props
}: SkeletonProps) => {
  const { theme, colorScheme } = useTheme();
  const shimmerValue = useRef(new Animated.Value(0)).current;
  const [layoutWidth, setLayoutWidth] = useState(0);

  const dimensions = getDefaultDimensions(variant);
  const finalWidth = width ?? dimensions.width;
  const finalHeight = height ?? dimensions.height;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: theme.primitive.duration.verySlow,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerValue, theme]);

  const translateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-layoutWidth, layoutWidth],
  });

  const variantStyles = getVariantStyles(variant, finalHeight, theme);

  const dimensionStyles: ViewStyle = {
    width: finalWidth as ViewStyle["width"],
    height: finalHeight as ViewStyle["height"],
    backgroundColor: theme.component.skeleton.variant[colorScheme].background,
  };

  return (
    <View
      style={[baseStyles.container, variantStyles, dimensionStyles, style]}
      onLayout={(event) => setLayoutWidth(event.nativeEvent.layout.width)}
      {...props}
    >
      <Animated.View
        style={[
          baseStyles.shimmer,
          {
            transform: [{ translateX }],
            backgroundColor:
              theme.component.skeleton.variant[colorScheme].shimmer,
            opacity: theme.primitive.opacity.shimmer,
          },
        ]}
      />
    </View>
  );
};

Skeleton.displayName = "Skeleton";

const getDefaultDimensions = (variant: SkeletonVariant) => {
  switch (variant) {
    case "circle":
      return { width: 40, height: 40 };
    case "text":
      return { width: "100%", height: 12 };
    case "rect":
    default:
      return { width: "100%", height: 20 };
  }
};

const getVariantStyles = (
  variant: SkeletonVariant,
  height: number | string,
  theme: ReturnType<typeof useTheme>["theme"],
) => {
  if (variant === "circle") {
    const size = typeof height === "number" ? height : 40;
    return {
      borderRadius: size / 2,
    };
  }
  return {
    borderRadius: theme.component.skeleton.borderRadius,
  };
};

const baseStyles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
