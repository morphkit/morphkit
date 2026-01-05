import { Text, TextProps } from "react-native";
import { useTheme } from "../theme";

type TypographyVariant =
  | "large-title"
  | "title-1"
  | "title-2"
  | "title-3"
  | "heading"
  | "body"
  | "callout"
  | "subhead"
  | "footnote"
  | "caption-1"
  | "caption-2";

const variantMap: Record<TypographyVariant, string> = {
  "large-title": "largeTitle",
  "title-1": "title1",
  "title-2": "title2",
  "title-3": "title3",
  "heading": "heading",
  "body": "body",
  "callout": "callout",
  "subhead": "subhead",
  "footnote": "footnote",
  "caption-1": "caption1",
  "caption-2": "caption2",
};

export interface TypographyProps extends TextProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
}

export const Typography = ({
  children,
  variant = "body",
  style,
  ...props
}: TypographyProps) => {
  const { theme } = useTheme();

  const textStyleKey = variantMap[variant] as keyof typeof theme.semantic.textStyles;
  const textStyle = theme.semantic.textStyles[textStyleKey];

  return (
    <Text
      style={[
        textStyle,
        { color: theme.semantic.colors.text.primary },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
