import {
  View,
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";
import { useTheme } from "../theme";

type FlexDirection = "horizontal" | "vertical";
type FlexAlign = "start" | "center" | "end" | "stretch";
type FlexJustify = "start" | "center" | "end" | "space-between";
type FlexGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface FlexProps extends Omit<ViewProps, "children"> {
  children?: ReactNode;
  direction?: FlexDirection;
  gap?: FlexGap;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Flex = ({
  children,
  direction = "vertical",
  gap = "sm",
  align = "stretch",
  justify = "start",
  wrap = false,
  style,
  ...props
}: FlexProps) => {
  const { theme } = useTheme();
  const gapValue = theme.component.flex.gap[gap];

  const flexStyles = [
    baseStyles.flex,
    directionStyles[direction],
    {
      gap: gapValue,
      alignItems: alignItemsMap[align],
      justifyContent: justifyContentMap[justify],
      flexWrap: wrap ? ("wrap" as const) : ("nowrap" as const),
    },
    style,
  ];

  return (
    <View style={flexStyles} {...props}>
      {children}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  flex: {
    display: "flex",
  },
});

const directionStyles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
  },
  vertical: {
    flexDirection: "column",
  },
});

const alignItemsMap = {
  start: "flex-start" as const,
  center: "center" as const,
  end: "flex-end" as const,
  stretch: "stretch" as const,
};

const justifyContentMap = {
  start: "flex-start" as const,
  center: "center" as const,
  end: "flex-end" as const,
  "space-between": "space-between" as const,
};
