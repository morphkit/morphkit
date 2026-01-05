import {
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../theme";

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
  thickness,
  color,
  length = "100%",
  style,
  ...props
}: DividerProps) => {
  const { theme, colorScheme } = useTheme();
  const dividerThickness = thickness ?? theme.component.divider.thickness;
  const dividerColor = color ?? theme.component.divider.variant[colorScheme].color;

  const dividerStyles: ViewStyle =
    orientation === "horizontal"
      ? ({
          backgroundColor: dividerColor,
          width: length,
          height: dividerThickness,
        } as ViewStyle)
      : ({
          backgroundColor: dividerColor,
          width: dividerThickness,
          height: length,
        } as ViewStyle);

  return <View style={[dividerStyles, style]} {...props} />;
};
