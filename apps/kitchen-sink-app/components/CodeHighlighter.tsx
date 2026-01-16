import RNCodeHighlighter from "react-native-code-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "@morphkit/react-native";
import type { ReactNode } from "react";
import { isValidElement } from "react";

const extractTextFromChildren = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromChildren).join("");
  }

  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    if (props.children) {
      return extractTextFromChildren(props.children);
    }
  }

  return "";
};

interface CodeHighlighterProps {
  children: ReactNode;
  language?: string;
}

export const CodeHighlighter = ({
  children,
  language = "typescript",
}: CodeHighlighterProps) => {
  const { colorScheme, theme } = useTheme();

  const hljsStyle = colorScheme === "dark" ? atomOneDark : atomOneLight;

  const codeString = extractTextFromChildren(children);

  return (
    <RNCodeHighlighter
      hljsStyle={hljsStyle}
      language={language}
      textStyle={{
        fontFamily: "JetBrainsMono_400Regular",
        fontSize: theme.primitive.fontSize.md,
        lineHeight:
          theme.primitive.fontSize.md * theme.primitive.lineHeight.relaxed,
      }}
      scrollViewProps={{
        horizontal: true,
        showsHorizontalScrollIndicator: true,
        contentContainerStyle: {
          padding: theme.primitive.spacing[3],
          backgroundColor: theme.semantic.colors.surface.secondary,
        },
        style: {
          backgroundColor: theme.semantic.colors.surface.secondary,
        },
      }}
    >
      {codeString}
    </RNCodeHighlighter>
  );
};
