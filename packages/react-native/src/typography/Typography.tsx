import { Text, TextProps } from "react-native";

export interface TypographyProps extends TextProps {
  children: React.ReactNode;
}

export const Typography = ({ children, style, ...props }: TypographyProps) => {
  return (
    <Text style={[{ color: "red" }, style]} {...props}>
      {children}
    </Text>
  );
};
