import { useEffect, useRef, useState } from "react";
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
  const colorScheme = useColorScheme() ?? "light";
  const shimmerValue = useRef(new Animated.Value(0)).current;
  const [layoutWidth, setLayoutWidth] = useState(0);

  const dimensions = getDefaultDimensions(variant);
  const finalWidth = width ?? dimensions.width;
  const finalHeight = height ?? dimensions.height;

  const themeColors = colors[colorScheme];

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerValue]);

  const translateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-layoutWidth, layoutWidth],
  });

  const variantStyles = getVariantStyles(variant, finalHeight);

  const dimensionStyles: ViewStyle = {
    width: finalWidth as ViewStyle["width"],
    height: finalHeight as ViewStyle["height"],
    backgroundColor: themeColors.base,
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
            backgroundColor: themeColors.shimmer,
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
) => {
  if (variant === "circle") {
    const size = typeof height === "number" ? height : 40;
    return {
      borderRadius: size / 2,
    };
  }
  return {
    borderRadius: 4,
  };
};

const colors = {
  light: {
    base: "#E5E7EB",
    shimmer: "#F3F4F6",
  },
  dark: {
    base: "#374151",
    shimmer: "#4B5563",
  },
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
    opacity: 0.5,
  },
});
