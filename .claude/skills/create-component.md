# Create Warp UI Component

**Trigger**: User requests to create a new warpui component
**Purpose**: Create React Native components following warpui library patterns
**Philosophy**: AI-optimized, shadcn-inspired, themeable, well-documented

## 1. Component Structure

Always create these files in `packages/react-native/src/<component-name>/`:

### Required Files
- `<ComponentName>.tsx` - Main component implementation
- `index.ts` - Barrel export
- `meta.json` - Component metadata
- `README.mdx` - Documentation with live examples
- `<ComponentName>.test.tsx` - Jest tests

### Examples Directory
- `examples/` - Directory containing all example components
  - `BasicExample.tsx` - Basic usage example
  - `VariantsExample.tsx` - Variants demonstration (if applicable)
  - `[OtherExamples].tsx` - Additional examples as needed
  - `index.ts` - Barrel export for all examples

**IMPORTANT**: All interactive JSX examples MUST be extracted to separate `.tsx` files in the `examples/` directory. This provides:
- Full TypeScript validation
- ESLint checking
- IDE autocomplete support
- Easier maintenance and testing

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

## 4. Example Files Pattern

Create example files in `examples/` directory following this pattern:

```typescript
// examples/BasicExample.tsx
import { Component } from "../Component";
import { View, Text } from "react-native";

export const BasicExample = () => {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Component variant="variant1">Example 1</Component>
      <Component variant="variant2">Example 2</Component>
    </View>
  );
};
```

```typescript
// examples/InteractiveExample.tsx (with state)
import { Component } from "../Component";
import { View } from "react-native";
import { useState } from "react";

export const InteractiveExample = () => {
  const [value, setValue] = useState("");

  return (
    <View style={{ padding: 16 }}>
      <Component value={value} onValueChange={setValue} />
    </View>
  );
};
```

```typescript
// examples/index.ts
export * from "./BasicExample";
export * from "./InteractiveExample";
```

**Example Naming Conventions:**
- `BasicExample` - Basic usage
- `VariantsExample` - Variants demonstration
- `SizesExample` - Size variations
- `InteractiveExample` - Examples with state
- `[FeatureName]Example` - Specific feature demonstrations

## 5. README.mdx Structure

```mdx
import { Component } from "./Component";
import { View } from "react-native";
import { BasicExample, InteractiveExample } from "./examples";

# Component Name

Single paragraph describing what this component is and how to use it.
Mention key features and intended use cases. This documentation is for
both humans and AI coding assistants.

## Basic Usage

<View style={{ marginVertical: 12 }}>
  <BasicExample />
</View>

## Interactive Example

<View style={{ marginVertical: 12 }}>
  <InteractiveExample />
</View>

## Props

| Prop     | Type                         | Default      |
| -------- | ---------------------------- | ------------ |
| variant  | `"variant1"` \| `"variant2"` | `"variant1"` |
| children | `ReactNode`                  | -            |
| style    | `StyleProp<ComponentStyle>`  | -            |
| ...props | `ComponentProps`             | -            |

## Usage Examples

Code blocks showing copy-paste usage patterns:

\`\`\`tsx
import { Component } from "@repo/react-native";

<Component variant="variant1">Content</Component>
\`\`\`
```

**IMPORTANT:**
- Extract ALL rendered JSX examples to separate `.tsx` files
- Import examples at the top of README.mdx
- Use `<View style={{ marginVertical: 12 }}>` wrappers around examples
- Never include `backgroundColor` or `borderRadius` in View wrapper styles
- Keep code blocks (in backticks) for documentation - don't extract these

## 6. meta.json Structure

```json
{
  "type": "react-native",
  "name": "component-name",
  "description": "Brief one-line description",
  "dependencies": []
}
```

**Dependencies array:** List other warpui components this component uses (e.g., `["typography"]`)

## 7. Test Structure

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

## 8. Automatic Registry Updates

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

## 9. Verification Steps

After creating all files, automatically run:

1. `bun run format` - Format code with Prettier
2. `bun run check-types --filter=@warp-ui/react-native` - TypeScript validation
3. `bun run lint --filter=@warp-ui/react-native` - ESLint validation
4. `bun run test --filter=@warp-ui/react-native` - Run Jest tests

All checks must pass before considering component complete.

## 10. Example: Typography Component

Reference `packages/react-native/src/typography/` for a complete example of all these patterns.

## 11. Quality Checklist

Before marking component creation complete, verify:

- ✅ All 5 core files created (`Component.tsx`, `index.ts`, `meta.json`, `README.mdx`, `Component.test.tsx`)
- ✅ Examples directory created with:
  - ✅ At least `BasicExample.tsx` created
  - ✅ Additional examples as needed (Variants, Interactive, etc.)
  - ✅ `examples/index.ts` barrel export exists
  - ✅ All examples have proper TypeScript types
  - ✅ Examples imported and used in README.mdx
- ✅ StyleSheet uses `StyleSheet.create()`
- ✅ Theme support with `useColorScheme()` included
- ✅ README.mdx imports examples from `./examples`
- ✅ No inline JSX examples in README.mdx (all extracted to .tsx files)
- ✅ Code blocks (in backticks) kept for documentation purposes
- ✅ meta.json populated with correct metadata
- ✅ Tests cover rendering, variants, style merging, props forwarding
- ✅ Exports follow pattern (named exports only, no default)
- ✅ All registry files updated (index.ts, docs-registry.ts, registry.json)
- ✅ All verification steps pass (format, type-check, lint, test)

## 12. Component Naming Conventions

- **Directory**: kebab-case (e.g., `button`, `input-field`)
- **Component file**: PascalCase (e.g., `Button.tsx`, `InputField.tsx`)
- **meta.json name**: kebab-case matching directory
- **Variant values**: kebab-case (e.g., `"primary"`, `"large-filled"`)
- **Example files**: PascalCase with "Example" suffix (e.g., `BasicExample.tsx`, `InteractiveExample.tsx`)

## 13. AI Optimization Notes

- Keep implementation simple - AI will customize after pulling
- Use clear, descriptive variable names
- Hardcode sensible defaults (AI will replace with theme values)
- Extract ALL examples to `.tsx` files for full TypeScript validation
- Document all props thoroughly for AI understanding
- Mention customization points in README description
- Examples in separate files enable:
  - AI code completion and IntelliSense
  - Automatic error detection during development
  - Easier testing and maintenance
  - Reusable example components
