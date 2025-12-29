import { MDXComponents, MDXStyles } from "@bacons/mdx";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Typography } from "@warp-ui/react-native";

const styles = StyleSheet.create({
  h1: {
    marginBottom: 16,
    marginTop: 24,
  },
  h2: {
    marginBottom: 12,
    marginTop: 20,
  },
  h3: {
    marginBottom: 8,
    marginTop: 16,
  },
  p: {
    marginBottom: 12,
  },
  code: {
    fontFamily: "monospace",
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  pre: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  strong: {
    fontWeight: "bold",
  },
  em: {
    fontStyle: "italic",
  },
  table: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  thead: {},
  tr: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  th: {
    flex: 1,
    padding: 12,
    fontWeight: "bold",
  },
  td: {
    flex: 1,
    padding: 12,
  },
});

const codeTheme = StyleSheet.create({
  light: {
    backgroundColor: "#f3f4f6",
  },
  dark: {
    backgroundColor: "#374151",
  },
});

const preTheme = StyleSheet.create({
  light: {
    backgroundColor: "#f3f4f6",
  },
  dark: {
    backgroundColor: "#1F2937",
  },
});

const tableTheme = StyleSheet.create({
  light: {
    borderColor: "#d1d5db",
  },
  dark: {
    borderColor: "#4B5563",
  },
});

const theadTheme = StyleSheet.create({
  light: {
    backgroundColor: "#f3f4f6",
  },
  dark: {
    backgroundColor: "#374151",
  },
});

const trTheme = StyleSheet.create({
  light: {
    borderBottomColor: "#e5e7eb",
  },
  dark: {
    borderBottomColor: "#4B5563",
  },
});

export const MDXProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme() ?? "light";
  return (
    <MDXComponents
      components={{
        h1: (props) => (
          <Typography {...props} variant="title-1" style={styles.h1} />
        ),
        h2: (props) => (
          <Typography {...props} variant="title-2" style={styles.h2} />
        ),
        h3: (props) => (
          <Typography {...props} variant="title-3" style={styles.h3} />
        ),
        p: (props) => <Typography {...props} variant="body" style={styles.p} />,
        code: (props) => (
          <Typography
            {...props}
            variant="body"
            style={[styles.code, codeTheme[colorScheme]]}
          />
        ),
        pre: (props) => (
          <View {...props} style={[styles.pre, preTheme[colorScheme]]} />
        ),
        strong: (props) => (
          <Typography {...props} variant="body" style={styles.strong} />
        ),
        em: (props) => (
          <Typography {...props} variant="body" style={styles.em} />
        ),
        table: (props) => (
          <View {...props} style={[styles.table, tableTheme[colorScheme]]} />
        ),
        thead: (props) => (
          <View {...props} style={[styles.thead, theadTheme[colorScheme]]} />
        ),
        tbody: (props) => <View {...props} />,
        tr: (props) => (
          <View {...props} style={[styles.tr, trTheme[colorScheme]]} />
        ),
        th: (props) => (
          <Typography {...props} variant="footnote" style={styles.th} />
        ),
        td: (props) => (
          <Typography {...props} variant="footnote" style={styles.td} />
        ),
        Typography,
      }}
    >
      <MDXStyles
        h1={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 16,
          marginTop: 24,
        }}
        h2={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 12,
          marginTop: 20,
        }}
        h3={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 8,
          marginTop: 16,
        }}
        p={{ fontSize: 16, marginBottom: 12, lineHeight: 24 }}
      >
        {children}
      </MDXStyles>
    </MDXComponents>
  );
};
