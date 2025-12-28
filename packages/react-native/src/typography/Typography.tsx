import { Text, TextProps, StyleSheet } from "react-native";

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

export interface TypographyProps extends TextProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
}

const styles = StyleSheet.create({
  "large-title": {
    fontSize: 34,
    fontWeight: "400",
    lineHeight: 40.8,
    letterSpacing: -0.34,
    color: "#000000",
  },
  "title-1": {
    fontSize: 28,
    fontWeight: "400",
    lineHeight: 33.6,
    letterSpacing: -0.224,
    color: "#000000",
  },
  "title-2": {
    fontSize: 22,
    fontWeight: "400",
    lineHeight: 27.5,
    letterSpacing: -0.132,
    color: "#000000",
  },
  "title-3": {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 25,
    letterSpacing: -0.08,
    color: "#000000",
  },
  heading: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22.1,
    letterSpacing: -0.034,
    color: "#000000",
  },
  body: {
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 23.8,
    letterSpacing: 0,
    color: "#000000",
  },
  callout: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22.4,
    letterSpacing: 0,
    color: "#000000",
  },
  subhead: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 21,
    letterSpacing: 0,
    color: "#000000",
  },
  footnote: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 17.55,
    letterSpacing: 0,
    color: "#000000",
  },
  "caption-1": {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 15.6,
    letterSpacing: 0,
    color: "#000000",
  },
  "caption-2": {
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 14.3,
    letterSpacing: 0.11,
    color: "#000000",
  },
});

export const Typography = ({
  children,
  variant = "body",
  style,
  ...props
}: TypographyProps) => {
  return (
    <Text style={[styles[variant], style]} {...props}>
      {children}
    </Text>
  );
};
