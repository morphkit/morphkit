import { View, ViewProps, StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";

type SpacingValue =
  | number
  | {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };

export interface BoxProps extends Omit<ViewProps, "children"> {
  children?: ReactNode;
  padding?: SpacingValue;
  margin?: SpacingValue;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  flex?: number;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

export const Box = ({
  children,
  padding,
  margin,
  borderRadius,
  borderWidth,
  borderColor,
  backgroundColor,
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  style,
  ...props
}: BoxProps) => {
  const getSpacingStyles = (
    spacing: SpacingValue | undefined,
    prefix: "padding" | "margin",
  ): ViewStyle => {
    if (spacing === undefined) return {};

    if (typeof spacing === "number") {
      return { [prefix]: spacing };
    }

    return {
      [`${prefix}Top`]: spacing.top,
      [`${prefix}Right`]: spacing.right,
      [`${prefix}Bottom`]: spacing.bottom,
      [`${prefix}Left`]: spacing.left,
    };
  };

  const paddingStyles = getSpacingStyles(padding, "padding");
  const marginStyles = getSpacingStyles(margin, "margin");

  const dynamicStyles: ViewStyle = {
    ...paddingStyles,
    ...marginStyles,
    ...(borderRadius !== undefined && { borderRadius }),
    ...(borderWidth !== undefined && { borderWidth }),
    ...(borderColor !== undefined && { borderColor }),
    ...(backgroundColor !== undefined && { backgroundColor }),
    ...(flex !== undefined && { flex }),
    ...(flexDirection !== undefined && { flexDirection }),
    ...(justifyContent !== undefined && { justifyContent }),
    ...(alignItems !== undefined && { alignItems }),
    ...(gap !== undefined && { gap }),
  };

  return (
    <View style={[dynamicStyles, style]} {...props}>
      {children}
    </View>
  );
};
