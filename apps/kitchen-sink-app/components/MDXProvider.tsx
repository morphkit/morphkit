import { MDXComponents, MDXStyles } from "@bacons/mdx";
import { View } from "react-native";
import {
  Typography,
  useTheme,
  Accordion,
  AccordionItem,
} from "@morph-ui/react-native";
import { CodeHighlighter } from "./CodeHighlighter";
import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  isValidElement,
} from "react";

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

interface TableContextType {
  headers: string[];
  setHeaders: (headers: string[]) => void;
  isHeaderRow: boolean;
}

const TableContext = createContext<TableContextType>({
  headers: [],
  setHeaders: () => {},
  isHeaderRow: false,
});

const useTableContext = () => useContext(TableContext);

const InlineCode = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const colors = theme.semantic.colors;

  return (
    <Typography
      variant="body"
      style={{
        fontFamily: "JetBrainsMono_400Regular",
        paddingHorizontal: theme.primitive.spacing[1],
        borderRadius: theme.primitive.borderRadius.sm,
        backgroundColor: colors.surface.secondary,
        color: colors.text.primary,
      }}
    >
      {children}
    </Typography>
  );
};

const CodeBlock = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const colors = theme.semantic.colors;

  return (
    <View
      style={{
        overflow: "hidden",
        borderRadius: theme.primitive.borderRadius.md,
        marginBottom: theme.primitive.spacing[4],
        backgroundColor: colors.surface.primary,
      }}
    >
      <CodeHighlighter>{children}</CodeHighlighter>
    </View>
  );
};

const Table = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const [headers, setHeaders] = useState<string[]>([]);
  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  const handleValueChange = (value: string | string[]) => {
    setAccordionValue(Array.isArray(value) ? value : [value]);
  };

  return (
    <TableContext.Provider value={{ headers, setHeaders, isHeaderRow: false }}>
      <View style={{ marginBottom: theme.primitive.spacing[4] }}>
        <Accordion
          type="multiple"
          value={accordionValue}
          onValueChange={handleValueChange}
        >
          {children}
        </Accordion>
      </View>
    </TableContext.Provider>
  );
};

const TableHeader = ({ children }: { children: ReactNode }) => {
  const { headers, setHeaders } = useTableContext();

  useEffect(() => {
    const headerTexts: string[] = [];

    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (isValidElement(child)) {
          const childProps = child.props as { children?: ReactNode };
          if (Array.isArray(childProps.children)) {
            childProps.children.forEach((th) => {
              if (isValidElement(th)) {
                const thProps = th.props as { children?: ReactNode };
                const text = extractTextFromChildren(thProps.children);
                headerTexts.push(text);
              }
            });
          }
        }
      });
    } else if (isValidElement(children)) {
      const childProps = children.props as { children?: ReactNode };
      if (Array.isArray(childProps.children)) {
        childProps.children.forEach((th) => {
          if (isValidElement(th)) {
            const thProps = th.props as { children?: ReactNode };
            const text = extractTextFromChildren(thProps.children);
            headerTexts.push(text);
          }
        });
      }
    }

    if (headerTexts.length > 0 && headers.length === 0) {
      setHeaders(headerTexts);
    }
  }, [children, headers.length, setHeaders]);

  return (
    <TableContext.Provider value={{ headers, setHeaders, isHeaderRow: true }}>
      {children}
    </TableContext.Provider>
  );
};

const TableBody = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const TableRow = ({ children }: { children: ReactNode }) => {
  const { headers, isHeaderRow } = useTableContext();
  const { theme } = useTheme();
  const colors = theme.semantic.colors;

  if (isHeaderRow) {
    return null;
  }

  if (headers.length === 0) {
    return null;
  }

  const cellValues: string[] = [];

  if (Array.isArray(children)) {
    children.forEach((cell) => {
      if (isValidElement(cell)) {
        const cellProps = cell.props as { children?: ReactNode };
        const text = extractTextFromChildren(cellProps.children);
        cellValues.push(text);
      }
    });
  } else if (isValidElement(children)) {
    const cellProps = children.props as { children?: ReactNode };
    const text = extractTextFromChildren(cellProps.children);
    cellValues.push(text);
  }

  const propName = cellValues[0] || "Unknown";

  const title = propName;

  const fieldsToShow = headers
    .map((header, index) => ({ header, value: cellValues[index], index }))
    .filter((field) => field.index !== 0);

  return (
    <AccordionItem value={propName} title={title}>
      <View style={{ gap: theme.primitive.spacing[3] }}>
        {fieldsToShow.map((field, idx) => (
          <View key={idx}>
            <Typography
              variant="footnote"
              style={{
                color: colors.text.tertiary,
                marginBottom: theme.primitive.spacing[1],
              }}
            >
              {field.header}
            </Typography>
            <Typography
              variant="body"
              style={{
                color: colors.text.primary,
                fontFamily:
                  field.header.toLowerCase() === "type"
                    ? "JetBrainsMono_400Regular"
                    : undefined,
              }}
            >
              {field.value || "—"}
            </Typography>
          </View>
        ))}
      </View>
    </AccordionItem>
  );
};

const TableHeaderCell = () => {
  return null;
};

const TableCell = () => {
  return null;
};

export const MDXProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const colors = theme.semantic.colors;
  const spacing = theme.primitive.spacing;

  return (
    <MDXComponents
      components={{
        h1: (props) => (
          <Typography
            {...props}
            variant="title-1"
            style={{
              marginBottom: spacing[4],
              marginTop: spacing[6],
              color: colors.text.primary,
            }}
          />
        ),
        h2: (props) => (
          <Typography
            {...props}
            variant="title-2"
            style={{
              marginBottom: spacing[3],
              marginTop: spacing[5],
              color: colors.text.primary,
            }}
          />
        ),
        h3: (props) => (
          <Typography
            {...props}
            variant="title-3"
            style={{
              marginBottom: spacing[2],
              marginTop: spacing[4],
              color: colors.text.primary,
            }}
          />
        ),
        p: (props) => (
          <Typography
            {...props}
            variant="body"
            style={{
              marginBottom: spacing[3],
              color: colors.text.primary,
            }}
          />
        ),
        code: InlineCode,
        pre: CodeBlock,
        strong: (props) => (
          <Typography
            {...props}
            variant="body"
            style={{
              fontWeight: "bold",
              color: colors.text.primary,
            }}
          />
        ),
        em: (props) => (
          <Typography
            {...props}
            variant="body"
            style={{
              fontStyle: "italic",
              color: colors.text.primary,
            }}
          />
        ),
        table: Table,
        thead: TableHeader,
        tbody: TableBody,
        tr: TableRow,
        th: TableHeaderCell,
        td: TableCell,
        Typography,
      }}
    >
      <MDXStyles
        h1={{
          fontSize: theme.semantic.textStyles.title1.fontSize,
          fontWeight: "bold",
          marginBottom: spacing[4],
          marginTop: spacing[6],
        }}
        h2={{
          fontSize: theme.semantic.textStyles.title2.fontSize,
          fontWeight: "bold",
          marginBottom: spacing[3],
          marginTop: spacing[5],
        }}
        h3={{
          fontSize: theme.semantic.textStyles.title3.fontSize,
          fontWeight: "bold",
          marginBottom: spacing[2],
          marginTop: spacing[4],
        }}
        p={{
          fontSize: theme.semantic.textStyles.body.fontSize,
          marginBottom: spacing[3],
          lineHeight: theme.semantic.textStyles.body.lineHeight,
        }}
      >
        {children}
      </MDXStyles>
    </MDXComponents>
  );
};
