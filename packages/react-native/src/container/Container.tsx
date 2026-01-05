import {
  View,
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";
import { useTheme } from "../theme";

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
  padding,
  centered = true,
  style,
  ...props
}: ContainerProps) => {
  const { theme } = useTheme();

  const getMaxWidth = (): number => {
    if (typeof maxWidth === "number") {
      return maxWidth;
    }
    return theme.component.container.maxWidth[maxWidth];
  };

  const containerPadding = padding ?? theme.component.container.padding;

  const containerStyles: StyleProp<ViewStyle> = [
    baseStyles.container,
    {
      maxWidth: getMaxWidth(),
      paddingHorizontal: containerPadding,
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
