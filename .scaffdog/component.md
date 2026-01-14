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
{{ if inputs.baseComponent == "Pressable" }}import { Pressable, PressableProps, StyleSheet, StyleProp, ViewStyle } from "react-native";
{{ else if inputs.baseComponent == "TextInput" }}import { TextInput, TextInputProps, StyleSheet } from "react-native";
{{ else if inputs.baseComponent == "ScrollView" }}import { ScrollView, ScrollViewProps, StyleSheet, StyleProp, ViewStyle } from "react-native";
{{ else }}import { View, ViewProps, StyleSheet, StyleProp, ViewStyle } from "react-native";
{{ end }}{{ if inputs.baseComponent != "TextInput" }}import { ReactNode{{ if inputs.needsForwardRef }}, forwardRef, ElementRef{{ end }} } from "react";
{{ else }}{{ if inputs.needsForwardRef }}import { forwardRef, ElementRef } from "react";
{{ end }}{{ end }}{{ if inputs.hasVariants || inputs.hasSizes }}import { useTheme } from "../theme";
{{ end }}{{ if inputs.baseComponent != "TextInput" }}import { Typography } from "../typography";
{{ end }}

{{ if inputs.baseComponent == "TextInput" }}export interface {{ inputs.name | pascal }}Props extends Omit<TextInputProps, "style"> {
{{ else if inputs.baseComponent == "Pressable" }}export interface {{ inputs.name | pascal }}Props extends Omit<PressableProps, "children" | "style"> {
  children?: ReactNode;
{{ else if inputs.baseComponent == "ScrollView" }}export interface {{ inputs.name | pascal }}Props extends Omit<ScrollViewProps, "children"> {
  children?: ReactNode;
{{ else }}export interface {{ inputs.name | pascal }}Props extends Omit<ViewProps, "children"> {
  children?: ReactNode;
{{ end }}{{ if inputs.hasVariants }}  variant?: {{ inputs.variantsType }};
{{ end }}{{ if inputs.hasSizes }}  size?: {{ inputs.sizesType }};
{{ end }}{{ if inputs.hasDisabled }}  disabled?: boolean;
{{ end }}{{ if inputs.hasLoading }}  loading?: boolean;
{{ end }}{{ if inputs.baseComponent == "Pressable" }}  onPress?: () => void;
{{ end }}  style?: StyleProp<ViewStyle>;
}

{{ if inputs.needsForwardRef }}export const {{ inputs.name | pascal }} = forwardRef<ElementRef<typeof {{ inputs.baseComponent }}>, {{ inputs.name | pascal }}Props>(({
{{ else }}export const {{ inputs.name | pascal }} = ({
{{ end }}{{ if inputs.baseComponent != "TextInput" }}  children,
{{ end }}{{ if inputs.hasVariants }}  variant = "{{ inputs.variantsArray[0] }}",
{{ end }}{{ if inputs.hasSizes }}  size = "{{ inputs.sizesArray[0] }}",
{{ end }}{{ if inputs.hasDisabled }}  disabled = false,
{{ end }}{{ if inputs.hasLoading }}  loading = false,
{{ end }}{{ if inputs.baseComponent == "Pressable" }}  onPress,
{{ end }}  style,
  ...props
{{ if inputs.needsForwardRef }}}: {{ inputs.name | pascal }}Props, ref) => {
{{ else }}}: {{ inputs.name | pascal }}Props) => {
{{ end }}{{ if inputs.hasVariants || inputs.hasSizes }}  const { theme, colorScheme } = useTheme();

  const componentTheme = theme.component.{{ inputs.name | camel }};
{{ if inputs.hasVariants }}  const variantTokens = componentTheme.variant[colorScheme][variant];
{{ end }}{{ if inputs.hasSizes }}  const sizeTokens = componentTheme.size[size];
{{ end }}{{ end }}
  return (
    <{{ inputs.baseComponent }}
{{ if inputs.needsForwardRef }}      ref={ref}
{{ end }}{{ if inputs.baseComponent == "Pressable" }}      onPress={onPress}
      disabled={disabled}
{{ end }}      style={[
        baseStyles.container,
{{ if inputs.hasVariants }}        {
          backgroundColor: variantTokens.background,
          borderColor: variantTokens.border,
        },
{{ end }}{{ if inputs.hasSizes }}        {
          padding: sizeTokens.padding,
          height: sizeTokens.height,
          borderRadius: sizeTokens.borderRadius,
        },
{{ end }}        style,
      ]}
      {...props}
    >
{{ if inputs.baseComponent != "TextInput" }}      <Typography variant="body"{{ if inputs.hasVariants }} style={{ "{{" }} color: variantTokens.text {{ "}}" }}{{ end }}>
        {children}
      </Typography>
{{ end }}    </{{ inputs.baseComponent }}>
  );
{{ if inputs.needsForwardRef }}});

{{ inputs.name | pascal }}.displayName = "{{ inputs.name | pascal }}";
{{ else }}};
{{ end }}

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
{{ if inputs.hasVariants }}import { light, dark } from "../theme/tokens/semantic/colors";
{{ end }}

export const {{ inputs.name | camel }} = {
{{ if inputs.hasSizes }}  size: {
{{ for size in inputs.sizesArray }}    {{ size }}: {
      height: primitive.spacing[{{ if size == "xs" }}6{{ else if size == "sm" }}8{{ else if size == "md" }}10{{ else if size == "lg" }}12{{ else if size == "xl" }}14{{ else if size == "2xl" }}16{{ else }}10{{ end }}],
      padding: primitive.spacing[{{ if size == "xs" }}1{{ else if size == "sm" }}2{{ else if size == "md" }}3{{ else if size == "lg" }}4{{ else if size == "xl" }}5{{ else if size == "2xl" }}6{{ else }}3{{ end }}],
      fontSize: primitive.fontSize.{{ if size == "xs" }}xs{{ else if size == "sm" }}sm{{ else if size == "md" }}base{{ else if size == "lg" }}lg{{ else if size == "xl" }}xl{{ else if size == "2xl" }}xl{{ else }}base{{ end }},
      borderRadius: primitive.borderRadius.md,
    },
{{ end }}  },
{{ end }}{{ if inputs.hasVariants }}  variant: {
    light: {
{{ for variant in inputs.variantsArray }}      {{ variant }}: {
        background: light.{{ if variant == "primary" }}action.primary{{ else if variant == "secondary" }}surface.secondary{{ else if variant == "destructive" }}status.error.main{{ else if variant == "outline" }}surface.primary{{ else if variant == "ghost" }}surface.primary{{ else if variant == "solid" }}action.primary{{ else if variant == "error" }}status.error.main{{ else if variant == "success" }}status.success.main{{ else if variant == "default" }}surface.primary{{ else if variant == "elevated" }}surface.elevated{{ else if variant == "outlined" }}surface.primary{{ else if variant == "flat" }}surface.secondary{{ else }}surface.primary{{ end }},
        text: light.text.{{ if variant == "primary" }}inverse{{ else if variant == "ghost" }}primary{{ else if variant == "outline" }}primary{{ else if variant == "outlined" }}primary{{ else if variant == "destructive" }}inverse{{ else if variant == "error" }}inverse{{ else if variant == "success" }}inverse{{ else }}primary{{ end }},
        border: light.border.{{ if variant == "outline" }}primary{{ else if variant == "outlined" }}primary{{ else if variant == "destructive" }}error{{ else if variant == "error" }}error{{ else }}primary{{ end }},
      },
{{ end }}    },
    dark: {
{{ for variant in inputs.variantsArray }}      {{ variant }}: {
        background: dark.{{ if variant == "primary" }}action.primary{{ else if variant == "secondary" }}surface.secondary{{ else if variant == "destructive" }}status.error.main{{ else if variant == "outline" }}surface.primary{{ else if variant == "ghost" }}surface.primary{{ else if variant == "solid" }}action.primary{{ else if variant == "error" }}status.error.main{{ else if variant == "success" }}status.success.main{{ else if variant == "default" }}surface.primary{{ else if variant == "elevated" }}surface.elevated{{ else if variant == "outlined" }}surface.primary{{ else if variant == "flat" }}surface.secondary{{ else }}surface.primary{{ end }},
        text: dark.text.{{ if variant == "primary" }}inverse{{ else if variant == "ghost" }}primary{{ else if variant == "outline" }}primary{{ else if variant == "outlined" }}primary{{ else if variant == "destructive" }}primary{{ else if variant == "error" }}primary{{ else if variant == "success" }}primary{{ else }}primary{{ end }},
        border: dark.border.{{ if variant == "outline" }}primary{{ else if variant == "outlined" }}primary{{ else if variant == "destructive" }}error{{ else if variant == "error" }}error{{ else }}primary{{ end }},
      },
{{ end }}    },
  },
{{ end }}{{ if !inputs.hasSizes && !inputs.hasVariants }}  base: {
    padding: primitive.spacing[3],
    borderRadius: primitive.borderRadius.md,
  },
{{ end }}} as const;
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
    const customStyle = { marginTop: 10 };
    const { getByText } = render(
      <{{ inputs.name | pascal }} style={customStyle}>Custom</{{ inputs.name | pascal }}>,
    );
    expect(getByText("Custom")).toBeTruthy();
  });
{{ if inputs.hasVariants }}
{{ for variant in inputs.variantsArray }}
  test("renders {{ variant }} variant", () => {
    const { getByText } = render(
      <{{ inputs.name | pascal }} variant="{{ variant }}">{{ variant | pascal }}</{{ inputs.name | pascal }}>,
    );
    expect(getByText("{{ variant | pascal }}")).toBeTruthy();
  });
{{ end }}{{ end }}{{ if inputs.hasSizes }}
{{ for size in inputs.sizesArray }}
  test("renders {{ size }} size", () => {
    const { getByText } = render(
      <{{ inputs.name | pascal }} size="{{ size }}">{{ size | upper }}</{{ inputs.name | pascal }}>,
    );
    expect(getByText("{{ size | upper }}")).toBeTruthy();
  });
{{ end }}{{ end }}{{ if inputs.hasDisabled }}
  test("handles disabled state", () => {
    const { getByText } = render(
      <{{ inputs.name | pascal }} disabled>Disabled</{{ inputs.name | pascal }}>,
    );
    expect(getByText("Disabled")).toBeTruthy();
  });
{{ end }}});
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

| Prop                                                  | Type     | Default                     | Description                       |
| ----------------------------------------------------- | -------- | --------------------------- | --------------------------------- | -------------------- |
| {{ if inputs.baseComponent != "TextInput" }}          | children | `ReactNode`                 | -                                 | Component content    |
| {{ end }}{{ if inputs.hasVariants }}                  | variant  | `{{ inputs.variantsType }}` | `"{{ inputs.variantsArray[0] }}"` | Visual style variant |
| {{ end }}{{ if inputs.hasSizes }}                     | size     | `{{ inputs.sizesType }}`    | `"{{ inputs.sizesArray[0] }}"`    | Size preset          |
| {{ end }}{{ if inputs.hasDisabled }}                  | disabled | `boolean`                   | `false`                           | Disabled state       |
| {{ end }}{{ if inputs.hasLoading }}                   | loading  | `boolean`                   | `false`                           | Loading state        |
| {{ end }}{{ if inputs.baseComponent == "Pressable" }} | onPress  | `() => void`                | -                                 | Press handler        |

{{ end }}

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
