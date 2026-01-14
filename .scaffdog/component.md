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
import { BasicExample } from "./examples";

# {{ inputs.name | pascal }}

**Category**: {{ inputs.category }} | **Tags**: {{ inputs.tags }}

{{ inputs.description }}

[Brief 2-3 sentence paragraph explaining when and why to use this component, written in Apple HIG style. Focus on the component's purpose, key characteristics, and primary use cases.]

## Basic Usage

The default configuration for common use cases.

<BasicExample />

## Theme Tokens

This component uses the following design tokens from the three-tier theme system:

### Color Tokens

| Token Path                      | Purpose                                           | Light Mode Value   | Dark Mode Value        |
| ------------------------------- | ------------------------------------------------- | ------------------ | ---------------------- | --------------------- |
| `theme.component.{{ inputs.name | camel }}.variant[colorScheme].primary.background` | Primary background | `light.action.primary` | `dark.action.primary` |
| `theme.component.{{ inputs.name | camel }}.variant[colorScheme].primary.text`       | Primary text color | `light.text.primary`   | `dark.text.primary`   |

### Spacing Tokens

| Token Path                      | Purpose                   | Value          | Primitive Source |
| ------------------------------- | ------------------------- | -------------- | ---------------- | ---------------------- |
| `theme.component.{{ inputs.name | camel }}.size.md.padding` | Medium padding | [TBD]            | `primitive.spacing[?]` |
| `theme.component.{{ inputs.name | camel }}.size.md.height`  | Medium height  | [TBD]            | -                      |

### Typography Tokens

| Token Path                      | Purpose                    | Value            | Primitive Source |
| ------------------------------- | -------------------------- | ---------------- | ---------------- | ------------------------- |
| `theme.component.{{ inputs.name | camel }}.size.md.fontSize` | Medium font size | [TBD]            | `primitive.fontSize.base` |

## Props

### Behavior Props

| Prop     | Type        | Default | Description       |
| -------- | ----------- | ------- | ----------------- |
| children | `ReactNode` | -       | Component content |

### Styling Props

| Prop  | Type                   | Default | Description            |
| ----- | ---------------------- | ------- | ---------------------- |
| style | `StyleProp<ViewStyle>` | -       | Custom style overrides |

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
import { {{ inputs.name | pascal }} } from "../{{ inputs.name | pascal }}";

export const BasicExample = () => {
  return (
    <{{ inputs.name | pascal }}>
      Basic {{ inputs.name | pascal }} Example
    </{{ inputs.name | pascal }}>
  );
};
```

# `{{ inputs.name | kebab }}/examples/index.ts`

```typescript
export { BasicExample } from "./BasicExample";
```
