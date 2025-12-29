# Create Warp UI Component

**Trigger**: User requests to create a new warpui component
**Purpose**: Create React Native components following warpui library patterns
**Philosophy**: AI-optimized, shadcn-inspired, themeable, well-documented

## 1. Component Structure

Always create these 5 files in `packages/react-native/src/<component-name>/`:

- `<ComponentName>.tsx` - Main component implementation
- `index.ts` - Barrel export
- `meta.json` - Component metadata
- `README.mdx` - Documentation with live examples
- `<ComponentName>.test.tsx` - Jest tests

## 2. StyleSheet Patterns

Use this pattern for styling:

```typescript
import { StyleSheet, useColorScheme } from "react-native";

const styles = StyleSheet.create({
  variant1: { /* styles */ },
  variant2: { /* styles */ },
});

const theme = StyleSheet.create({
  dark: { color: "#fff" },
  light: { color: "#000" },
});

// In component:
const colorScheme = useColorScheme() ?? "light";
<Component style={[styles[variant], theme[colorScheme], style]} />
```

**Key principles:**

- Use `StyleSheet.create()` for all styles
- Separate variant styles and theme styles
- Always include dark/light theme support (even if simple)
- Apply styles in order: `[variant, theme, custom]`
- Prefer variants when component has multiple visual states

## 3. TypeScript Patterns

```typescript
// Define variant union type (if component has variants)
type ComponentVariant = "variant1" | "variant2" | "variant3";

// Props interface extends native component
export interface ComponentProps extends NativeComponentProps {
  children: React.ReactNode;
  variant?: ComponentVariant; // Optional with default
  // Additional props...
}

// Export both component and type
export { Component, type ComponentProps };
```

## 4. README.mdx Structure

```mdx
import { Component } from "./Component";
import { View } from "react-native";

# Component Name

Single paragraph describing what this component is and how to use it.
Mention key features and intended use cases. This documentation is for
both humans and AI coding assistants.

## Variants (or Examples)

<View
  style={{
    padding: 16,
    marginVertical: 12,
    gap: 12,
  }}
>
  <Component variant="variant1">Example 1</Component>
  <Component variant="variant2">Example 2</Component>
</View>

## Props

| Prop     | Type                         | Default      |
| -------- | ---------------------------- | ------------ |
| variant  | `"variant1"` \| `"variant2"` | `"variant1"` |
| children | `ReactNode`                  | -            |
| style    | `StyleProp<ComponentStyle>`  | -            |
| ...props | `ComponentProps`             | -            |
```

**IMPORTANT:** Never include `backgroundColor` or `borderRadius` in View wrapper styles for MDX examples. These containers should be transparent to properly support dark/light mode. Only include layout properties like `padding`, `marginVertical`, `gap`, and `flexDirection`.

## 5. meta.json Structure

```json
{
  "type": "react-native",
  "name": "component-name",
  "description": "Brief one-line description",
  "dependencies": []
}
```

**Dependencies array:** List other warpui components this component uses (e.g., `["typography"]`)

## 6. Test Structure

```typescript
import { render } from "@testing-library/react-native";
import { Component } from "./Component";

describe("<Component />", () => {
  test("renders correctly", () => {
    const { getByText } = render(<Component>Content</Component>);
    expect(getByText("Content")).toBeTruthy();
  });

  test("applies variant styles", () => {
    const { getByText } = render(<Component variant="variant1">Text</Component>);
    expect(getByText("Text").props.style).toMatchObject({
      // Expected style properties
    });
  });

  test("merges custom styles", () => {
    const { getByText } = render(
      <Component style={{ color: "red" }}>Text</Component>
    );
    expect(getByText("Text").props.style).toMatchObject({ color: "red" });
  });

  test("forwards props", () => {
    const { getByText } = render(
      <Component accessibilityLabel="Label">Text</Component>
    );
    expect(getByText("Text").props.accessibilityLabel).toBe("Label");
  });
});
```

## 7. Automatic Registry Updates

After creating component files, automatically update:

**a. `packages/react-native/src/index.ts`**

```typescript
export { Component, type ComponentProps } from "./component-name";
```

**b. `packages/react-native/src/docs-registry.ts`**

```typescript
import ComponentDocs from "./component-name/README.mdx";

export const docsRegistry: Record<string, React.FC> = {
  "component-name": ComponentDocs,
  // ... existing entries
};
```

**c. `packages/react-native/src/registry.json`**

```json
{
  "version": "1.0.0",
  "components": [
    {
      "type": "react-native",
      "name": "component-name",
      "description": "Brief description",
      "dependencies": []
    }
  ]
}
```

## 8. Verification Steps

After creating all files, automatically run:

1. `bun run format` - Format code with Prettier
2. `bun run check-types --filter=@warp-ui/react-native` - TypeScript validation
3. `bun run lint --filter=@warp-ui/react-native` - ESLint validation
4. `bun run test --filter=@warp-ui/react-native` - Run Jest tests

All checks must pass before considering component complete.

## 9. Example: Typography Component

Reference `packages/react-native/src/typography/` for a complete example of all these patterns.

## Quality Checklist

Before marking component creation complete, verify:

- ✅ All 5 files created (`Component.tsx`, `index.ts`, `meta.json`, `README.mdx`, `Component.test.tsx`)
- ✅ StyleSheet uses `StyleSheet.create()`
- ✅ Theme support with `useColorScheme()` included
- ✅ README.mdx has live component examples
- ✅ meta.json populated with correct metadata
- ✅ Tests cover rendering, variants, style merging, props forwarding
- ✅ Exports follow pattern (named exports only, no default)
- ✅ All registry files updated (index.ts, docs-registry.ts, registry.json)
- ✅ All verification steps pass (format, type-check, lint, test)

## Component Naming Conventions

- **Directory**: kebab-case (e.g., `button`, `input-field`)
- **Component file**: PascalCase (e.g., `Button.tsx`, `InputField.tsx`)
- **meta.json name**: kebab-case matching directory
- **Variant values**: kebab-case (e.g., `"primary"`, `"large-filled"`)

## AI Optimization Notes

- Keep implementation simple - AI will customize after pulling
- Use clear, descriptive variable names
- Hardcode sensible defaults (AI will replace with theme values)
- Include inline style examples in README.mdx
- Document all props thoroughly for AI understanding
- Mention customization points in README description
