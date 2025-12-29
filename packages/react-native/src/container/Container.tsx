import {
  View,
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";

type MaxWidthPreset = "sm" | "md" | "lg" | "xl";

export interface ContainerProps extends Omit<ViewProps, "children"> {
  children?: ReactNode;
  maxWidth?: number | MaxWidthPreset;
  padding?: number;
  centered?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Container = ({
  children,
  maxWidth = "lg",
  padding = 16,
  centered = true,
  style,
  ...props
}: ContainerProps) => {
  const getMaxWidth = (): number => {
    if (typeof maxWidth === "number") {
      return maxWidth;
    }
    return maxWidthPresets[maxWidth];
  };

  const containerStyles: StyleProp<ViewStyle> = [
    baseStyles.container,
    {
      maxWidth: getMaxWidth(),
      paddingHorizontal: padding,
    },
    centered && baseStyles.centered,
    style,
  ];

  return (
    <View style={containerStyles} {...props}>
      {children}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  centered: {
    alignSelf: "center",
  },
});

const maxWidthPresets: Record<MaxWidthPreset, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};
