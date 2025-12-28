import { MDXComponents, MDXStyles } from "@bacons/mdx";
import { View, Text, StyleSheet } from "react-native";
import { Typography } from "@warp-ui/react-native";

const styles = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 24,
  },
  h2: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 20,
  },
  h3: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  p: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
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
    fontSize: 14,
  },
  td: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
});

export const MDXProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MDXComponents
      components={{
        h1: (props) => <Text {...props} style={styles.h1} />,
        h2: (props) => <Text {...props} style={styles.h2} />,
        h3: (props) => <Text {...props} style={styles.h3} />,
        p: (props) => <Text {...props} style={styles.p} />,
        code: (props) => <Text {...props} style={styles.code} />,
        pre: (props) => <View {...props} style={styles.pre} />,
        strong: (props) => <Text {...props} style={styles.strong} />,
        em: (props) => <Text {...props} style={styles.em} />,
        table: (props) => <View {...props} style={styles.table} />,
        thead: (props) => <View {...props} style={styles.thead} />,
        tbody: (props) => <View {...props} />,
        tr: (props) => <View {...props} style={styles.tr} />,
        th: (props) => <Text {...props} style={styles.th} />,
        td: (props) => <Text {...props} style={styles.td} />,
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
