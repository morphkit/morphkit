import { ReactNode } from "react";
import {
  Text,
  TextProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import { useTheme } from "../theme";

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
  const { theme, colorScheme } = useTheme();

  const textColor = error
    ? theme.component.label.variant[colorScheme].required
    : theme.component.label.variant[colorScheme].text;
  const fontSize = theme.component.label.fontSize[size];

  const labelStyles: StyleProp<TextStyle> = [
    baseStyles.label,
    {
      color: textColor,
      fontSize,
      fontWeight: theme.component.label.fontWeight,
      marginBottom: theme.component.label.marginBottom,
    },
    style,
  ];

  return (
    <Text style={labelStyles} {...props}>
      {children}
      {required && (
        <Text
          style={[
            baseStyles.asterisk,
            { color: theme.component.label.variant[colorScheme].required },
          ]}
        >
          {" "}
          *
        </Text>
      )}
    </Text>
  );
};

const baseStyles = StyleSheet.create({
  label: {},
  asterisk: {
    fontWeight: "bold",
  },
});
