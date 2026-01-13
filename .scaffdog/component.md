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
  "category": "{{ inputs.category }}",
  "tags": [{{ inputs.tagsJson }}],
  "dependencies": [{{ inputs.dependenciesJson }}]
}
```

# `{{ inputs.name | kebab }}/README.mdx`

```markdown
import { {{ inputs.name | pascal }} } from "./{{ inputs.name | pascal }}";
import { View } from "react-native";
import { BasicExample } from "./examples";

# {{ inputs.name | pascal }}

{{ inputs.description }}

## Overview

This component provides [describe primary use case]. Key characteristics:

- Minimum touch target: 44pt × 44pt (Apple HIG requirement)
- WCAG compliance: Level AA
- Theme-aware: Supports light and dark modes
- Typography integration: Uses Typography component for text

**When to use this component:**

- [Scenario 1]
- [Scenario 2]
- [Scenario 3]

## When NOT to Use

- **Don't use** for [alternative scenario] - use [alternative component] instead
- **Alternative**: For [specific use case], consider [other approach]

## Examples

### Basic Usage

<View style={{ "{{" }} marginVertical: 12 {{ "}}" }}>
<BasicExample />
</View>

\`\`\`tsx
import { {{ inputs.name | pascal }} } from "@warp-ui/react-native";

<{{ inputs.name | pascal }}>Content</{{ inputs.name | pascal }}>
\`\`\`

### Real-World Use Cases

\`\`\`tsx
// TODO: Add practical examples showing composition with other components
\`\`\`

## API Reference

### Behavior Props

| Prop     | Type        | Default | Required | Description       |
| -------- | ----------- | ------- | -------- | ----------------- |
| children | `ReactNode` | -       | -        | Component content |

### Styling Props

| Prop  | Type                   | Default | Required | Description            |
| ----- | ---------------------- | ------- | -------- | ---------------------- |
| style | `StyleProp<ViewStyle>` | -       | -        | Custom style overrides |

### Theme Tokens

This component uses the following design tokens from the three-tier theme system:

#### Color Tokens

| Token Path                      | Purpose                      | Light Mode       | Dark Mode |
| ------------------------------- | ---------------------------- | ---------------- | --------- | ----- |
| `theme.component.{{ inputs.name | camel }}.variant.background` | Background color | [TBD]     | [TBD] |
| `theme.component.{{ inputs.name | camel }}.variant.text`       | Text color       | [TBD]     | [TBD] |

#### Spacing Tokens

| Token Path                      | Purpose           | Value   | Primitive Source |
| ------------------------------- | ----------------- | ------- | ---------------- | ---------------------------- |
| `theme.component.{{ inputs.name | camel }}.padding` | Padding | [TBD]            | `theme.primitive.spacing[?]` |

#### Customization Example

\`\`\`tsx
import { createTheme } from "@warp-ui/react-native";

const customTheme = createTheme({
component: {
{{ inputs.name | camel }}: {
// Override component tokens here
},
},
});
\`\`\`

## Accessibility

### WCAG Compliance

This component meets WCAG 2.1 Level AA standards.

### Keyboard Navigation

- **Tab**: Move focus to component
- **Shift + Tab**: Move focus to previous element

### Screen Reader Support

- Component role announced automatically
- Label read from `children` or `accessibilityLabel`
- State changes announced appropriately

### Visual Requirements

- **Contrast Ratio**: 4.5:1 minimum (WCAG AA)
- **Focus Indicator**: 2px solid outline with 2px offset
- **Touch Target**: 44pt × 44pt minimum (Apple HIG)

### Implementation

\`\`\`tsx
<{{ inputs.name | pascal }}
accessibilityLabel="Descriptive label"
accessibilityHint="What happens when activated"
accessibilityRole="[appropriate role]"

> Content
> </{{ inputs.name | pascal }}>
> \`\`\`

### Testing with Screen Readers

- **iOS**: VoiceOver
- **Android**: TalkBack
- Verify all states are announced correctly

## Related Components

- [RelatedComponent](../related/README.mdx) - Description

## Troubleshooting

### Common Issue 1

- Check [solution]
- Verify [requirement]

### Common Issue 2

- Ensure [condition]
- Confirm [setup]
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
