import {
  View,
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";

type StackDirection = "horizontal" | "vertical";
type StackAlign = "start" | "center" | "end" | "stretch";
type StackJustify = "start" | "center" | "end" | "space-between";

export interface StackProps extends Omit<ViewProps, "children"> {
  children?: ReactNode;
  direction?: StackDirection;
  gap?: number;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Stack = ({
  children,
  direction = "vertical",
  gap = 8,
  align = "stretch",
  justify = "start",
  wrap = false,
  style,
  ...props
}: StackProps) => {
  const stackStyles = [
    baseStyles.stack,
    directionStyles[direction],
    {
      gap,
      alignItems: alignItemsMap[align],
      justifyContent: justifyContentMap[justify],
      flexWrap: wrap ? ("wrap" as const) : ("nowrap" as const),
    },
    style,
  ];

  return (
    <View style={stackStyles} {...props}>
      {children}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  stack: {
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
