import { ReactNode } from "react";
import { StyleSheet, StyleProp, TextStyle } from "react-native";
import { useTheme } from "../theme";
import { Typography, type TypographyProps } from "../typography";

export interface LabelProps extends Omit<
  TypographyProps,
  "children" | "variant"
> {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  error?: boolean;
  style?: StyleProp<TextStyle>;
}

export const Label = ({
  children,
  required = false,
  error = false,
  style,
  ...props
}: LabelProps) => {
  const { theme, colorScheme } = useTheme();

  const textColor = error
    ? theme.component.label.variant[colorScheme].required
    : theme.component.label.variant[colorScheme].text;

  const labelStyles: StyleProp<TextStyle> = [
    baseStyles.label,
    {
      color: textColor,
      fontWeight: theme.component.label.fontWeight,
      marginBottom: theme.component.label.marginBottom,
    },
    style,
  ];

  return (
    <Typography variant="callout" style={labelStyles} {...props}>
      {children}
      {required && (
        <Typography
          variant="caption-1"
          style={[
            baseStyles.asterisk,
            { color: theme.component.label.variant[colorScheme].required },
          ]}
        >
          {" "}
          *
        </Typography>
      )}
    </Typography>
  );
};

const baseStyles = StyleSheet.create({
  label: {},
  asterisk: {
    fontWeight: "bold",
  },
});
