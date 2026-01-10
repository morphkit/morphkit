import {
  View,
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme";

type MaxWidthPreset = "sm" | "md" | "lg" | "xl";
type Inset = "top" | "right" | "bottom" | "left";

export interface ContainerProps extends Omit<ViewProps, "children"> {
  children?: ReactNode;
  maxWidth?: number | MaxWidthPreset;
  padding?: number;
  centered?: boolean;
  insets?: Inset[];
  style?: StyleProp<ViewStyle>;
}

export const Container = ({
  children,
  maxWidth = "lg",
  padding,
  centered = true,
  insets = [],
  style,
  ...props
}: ContainerProps) => {
  const { theme } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  const getMaxWidth = (): number => {
    if (typeof maxWidth === "number") {
      return maxWidth;
    }
    return theme.component.container.maxWidth[maxWidth];
  };

  const containerPadding = padding ?? theme.component.container.padding;

  const insetPadding: Partial<ViewStyle> = {
    paddingTop: insets.includes("top") ? safeAreaInsets.top : undefined,
    paddingBottom: insets.includes("bottom")
      ? safeAreaInsets.bottom
      : undefined,
    paddingLeft: insets.includes("left") ? safeAreaInsets.left : undefined,
    paddingRight: insets.includes("right") ? safeAreaInsets.right : undefined,
  };

  const containerStyles: StyleProp<ViewStyle> = [
    baseStyles.container,
    {
      maxWidth: getMaxWidth(),
      paddingHorizontal: containerPadding,
      backgroundColor: theme.semantic.colors.surface.primary,
    },
    insetPadding,
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
    flex: 1,
    width: "100%",
  },
  centered: {
    alignSelf: "center",
  },
});
