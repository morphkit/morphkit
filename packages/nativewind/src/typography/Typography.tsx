import { Text, TextProps } from "react-native";

export interface TypographyProps extends TextProps {
  children: React.ReactNode;
  className?: string;
}

export const Typography = ({ children, className, ...props }: TypographyProps) => {
  return (
    <Text className={`text-red-500 ${className || ""}`} {...props}>
      {children}
    </Text>
  );
};
