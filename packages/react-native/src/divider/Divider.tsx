import {
  View,
  ViewProps,
  useColorScheme,
  StyleProp,
  ViewStyle,
} from "react-native";

type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends Omit<ViewProps, "children"> {
  orientation?: DividerOrientation;
  thickness?: number;
  color?: string;
  length?: number | string;
  style?: StyleProp<ViewStyle>;
}

export const Divider = ({
  orientation = "horizontal",
  thickness = 1,
  color,
  length = "100%",
  style,
  ...props
}: DividerProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const dividerColor = color ?? defaultColors[colorScheme];

  const dividerStyles: ViewStyle =
    orientation === "horizontal"
      ? ({
          backgroundColor: dividerColor,
          width: length,
          height: thickness,
        } as ViewStyle)
      : ({
          backgroundColor: dividerColor,
          width: thickness,
          height: length,
        } as ViewStyle);

  return <View style={[dividerStyles, style]} {...props} />;
};

const defaultColors = {
  light: "#E5E7EB",
  dark: "#374151",
};
