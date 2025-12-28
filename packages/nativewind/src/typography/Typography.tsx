import { Text, TextProps } from "react-native";

export interface TypographyProps extends TextProps {
  children: React.ReactNode;
  className?: string;
}

export const Typography = ({
  children,
  className,
  ...props
}: TypographyProps) => {
  return (
    <Text
      className={`text-[var(--typography-primary-color)] text-[length:var(--typography-large-size)] font-[var(--typography-bold-weight)] ${className || ""}`}
      {...props}
    >
      {children}
    </Text>
  );
};
