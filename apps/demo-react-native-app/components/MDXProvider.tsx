import { MDXComponents, MDXStyles } from "@bacons/mdx";
import { View, Text } from "react-native";
import { Typography } from "@warp-ui/nativewind";

export const MDXProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MDXComponents
      components={{
        h1: (props) => (
          <Text {...props} className="text-3xl font-bold mb-4 mt-6" />
        ),
        h2: (props) => (
          <Text {...props} className="text-2xl font-bold mb-3 mt-5" />
        ),
        h3: (props) => (
          <Text {...props} className="text-xl font-bold mb-2 mt-4" />
        ),
        p: (props) => <Text {...props} className="text-base mb-3 leading-6" />,
        code: (props) => (
          <Text {...props} className="font-mono bg-gray-100 px-1 rounded" />
        ),
        pre: (props) => (
          <View {...props} className="bg-gray-100 p-4 rounded-lg mb-4" />
        ),
        strong: (props) => <Text {...props} className="font-bold" />,
        em: (props) => <Text {...props} className="italic" />,
        table: (props) => (
          <View {...props} className="border border-gray-300 rounded-lg mb-4" />
        ),
        thead: (props) => <View {...props} className="bg-gray-100" />,
        tbody: (props) => <View {...props} />,
        tr: (props) => (
          <View
            {...props}
            className="flex-row border-b border-gray-200 last:border-0"
          />
        ),
        th: (props) => (
          <Text {...props} className="flex-1 p-3 font-bold text-sm" />
        ),
        td: (props) => <Text {...props} className="flex-1 p-3 text-sm" />,
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
