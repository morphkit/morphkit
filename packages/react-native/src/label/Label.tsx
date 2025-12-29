import { ReactNode } from "react";
import {
  Text,
  TextProps,
  StyleSheet,
  useColorScheme,
  StyleProp,
  TextStyle,
} from "react-native";

export interface LabelProps extends Omit<TextProps, "children"> {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  style?: StyleProp<TextStyle>;
}

export const Label = ({
  children,
  required = false,
  error = false,
  size = "md",
  style,
  ...props
}: LabelProps) => {
  const colorScheme = useColorScheme() ?? "light";

  const themeColors = colorTheme[colorScheme];
  const textColor = error ? themeColors.error : themeColors.default;
  const fontSize = sizeMap[size];

  const labelStyles: StyleProp<TextStyle> = [
    baseStyles.label,
    {
      color: textColor,
      fontSize,
    },
    style,
  ];

  return (
    <Text style={labelStyles} {...props}>
      {children}
      {required && (
        <Text style={[baseStyles.asterisk, { color: themeColors.error }]}>
          {" "}
          *
        </Text>
      )}
    </Text>
  );
};

const sizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
};

const colorTheme = {
  light: {
    default: "#374151",
    error: "#EF4444",
  },
  dark: {
    default: "#D1D5DB",
    error: "#F87171",
  },
};

const baseStyles = StyleSheet.create({
  label: {
    fontWeight: "500",
    marginBottom: 4,
  },
  asterisk: {
    fontWeight: "bold",
  },
});
