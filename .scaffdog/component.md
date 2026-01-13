---
name: "component"
root: "."
output: "**/*"
questions:
  name:
    message: "Component name"
    initial: "MyComponent"
  description:
    message: "Component description"
    initial: "A React Native component"
---

# `{{ inputs.name | kebab }}/{{ inputs.name | pascal }}.tsx`

```typescript
import { View, ViewProps, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { useTheme } from "../theme";
import { Typography } from "../typography";

export interface {{ inputs.name | pascal }}Props extends Omit<ViewProps, "children"> {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const {{ inputs.name | pascal }} = ({
  children,
  style,
  ...props
}: {{ inputs.name | pascal }}Props) => {
  const { theme, colorScheme } = useTheme();

  return (
    <View
      style={[
        baseStyles.container,
        style,
      ]}
      {...props}
    >
      <Typography variant="body">
        {children}
      </Typography>
    </View>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
```

# `{{ inputs.name | kebab }}/{{ inputs.name | pascal }}.theme.ts`

```typescript
import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const {{ inputs.name | camel }} = {
  size: {
    md: {
      height: primitive.spacing[10],
      padding: primitive.spacing[3],
      fontSize: primitive.fontSize.base,
      borderRadius: primitive.borderRadius.md,
    },
  },
  variant: {
    light: {
      primary: {
        background: light.surface.primary,
        text: light.text.primary,
        border: light.border.primary,
      },
    },
    dark: {
      primary: {
        background: dark.surface.primary,
        text: dark.text.primary,
        border: dark.border.primary,
      },
    },
  },
} as const;
```

# `{{ inputs.name | kebab }}/{{ inputs.name | pascal }}.test.tsx`

```typescript
import { render } from "../test-utils";
import { {{ inputs.name | pascal }} } from "./{{ inputs.name | pascal }}";

describe("<{{ inputs.name | pascal }} />", () => {
  test("renders children correctly", () => {
    const { getByText } = render(<{{ inputs.name | pascal }}>Test Content</{{ inputs.name | pascal }}>);
    expect(getByText("Test Content")).toBeTruthy();
  });

  test("merges custom style prop", () => {
    const { getByText } = render(
      <{{ inputs.name | pascal }} style={{ "{{" }} marginTop: 10 {{ "}}" }}>Custom</{{ inputs.name | pascal }}>,
    );
    expect(getByText("Custom")).toBeTruthy();
  });
});
```

# `{{ inputs.name | kebab }}/index.ts`

```typescript
export { {{ inputs.name | pascal }}, type {{ inputs.name | pascal }}Props } from "./{{ inputs.name | pascal }}";
```

# `{{ inputs.name | kebab }}/meta.json`

```json
{
  "type": "react-native",
  "name": "{{ inputs.name | kebab }}",
  "description": "{{ inputs.description }}",
  "dependencies": []
}
```

# `{{ inputs.name | kebab }}/README.mdx`

```markdown
import { {{ inputs.name | pascal }} } from "./{{ inputs.name | pascal }}";
import { View } from "react-native";

# {{ inputs.name | pascal }}

{{ inputs.description }}

## Basic Usage

<View style={{ "{{" }} padding: 16, marginVertical: 12 {{ "}}" }}>
<{{ inputs.name | pascal }}>Basic {{ inputs.name | pascal }}</{{ inputs.name | pascal }}>
</View>

## Props

| Prop     | Type                   | Default |
| -------- | ---------------------- | ------- |
| children | `ReactNode`            | -       |
| style    | `StyleProp<ViewStyle>` | -       |

## Usage Examples

### Basic

\`\`\`tsx
<{{ inputs.name | pascal }}>Content</{{ inputs.name | pascal }}>
\`\`\`
```

# `{{ inputs.name | kebab }}/examples/BasicExample.tsx`

```typescript
import { View } from "react-native";
import { {{ inputs.name | pascal }} } from "../{{ inputs.name | pascal }}";

export const BasicExample = () => {
  return (
    <View style={{ "{{" }} padding: 16 {{ "}}" }}>
      <{{ inputs.name | pascal }}>
        Basic {{ inputs.name | pascal }} Example
      </{{ inputs.name | pascal }}>
    </View>
  );
};
```

# `{{ inputs.name | kebab }}/examples/index.ts`

```typescript
export { BasicExample } from "./BasicExample";
```
