import { Text, TextProps } from "react-native";
import { useThemeValue } from "../theme/ThemeContext";

export interface TypographyProps extends TextProps {
  children: React.ReactNode;
  className?: string;
}

const convertRemToNumber = (value: string | number): number => {
  if (typeof value === "number") return value;
  if (value.endsWith("rem")) {
    return parseFloat(value) * 16;
  }
  return parseFloat(value);
};

export const Typography = ({
  children,
  className,
  style,
  ...props
}: TypographyProps) => {
  const primaryColor = useThemeValue("--typography-primary-color") as string;
  const largeSize = useThemeValue("--typography-large-size");
  const boldWeight = useThemeValue("--typography-bold-weight");

  const themeStyles = {
    color: primaryColor || "#ef4444",
    fontSize: convertRemToNumber(largeSize || 24),
    fontWeight: String(boldWeight || "700") as TextProps["style"] extends { fontWeight?: infer W } ? W : never,
  };

  return (
    <Text
      className={className || ""}
      style={[themeStyles, style]}
      {...props}
    >
      {children}
    </Text>
  );
};
