import { MDXComponents, MDXStyles } from "@bacons/mdx";
import { View, StyleSheet } from "react-native";
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
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  pre: {
    backgroundColor: "#f3f4f6",
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
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginBottom: 16,
  },
  thead: {
    backgroundColor: "#f3f4f6",
  },
  tr: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
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

export const MDXProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MDXComponents
      components={{
        h1: (props) => <Typography {...props} variant="title-1" style={styles.h1} />,
        h2: (props) => <Typography {...props} variant="title-2" style={styles.h2} />,
        h3: (props) => <Typography {...props} variant="title-3" style={styles.h3} />,
        p: (props) => <Typography {...props} variant="body" style={styles.p} />,
        code: (props) => <Typography {...props} variant="body" style={styles.code} />,
        pre: (props) => <View {...props} style={styles.pre} />,
        strong: (props) => <Typography {...props} variant="body" style={styles.strong} />,
        em: (props) => <Typography {...props} variant="body" style={styles.em} />,
        table: (props) => <View {...props} style={styles.table} />,
        thead: (props) => <View {...props} style={styles.thead} />,
        tbody: (props) => <View {...props} />,
        tr: (props) => <View {...props} style={styles.tr} />,
        th: (props) => <Typography {...props} variant="footnote" style={styles.th} />,
        td: (props) => <Typography {...props} variant="footnote" style={styles.td} />,
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
