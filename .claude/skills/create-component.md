# Create Warp UI Component

**Trigger**: User requests to create a new warpui component
**Purpose**: Create React Native components following warpui library patterns
**Philosophy**: AI-optimized, shadcn-inspired, themeable, well-documented

## 1. Component Structure

Always create these files in `packages/react-native/src/<component-name>/`:

### Required Files

- `<ComponentName>.tsx` - Main component implementation
- `<ComponentName>.theme.ts` - **Theme tokens for the component**
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

## 2. Component Theme File

Every component MUST have a colocated `{Component}.theme.ts` file defining its tokens.

### Theme File Structure

```typescript
import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const componentName = {
  // Size-based tokens (if component has sizes)
  size: {
    sm: {
      height: primitive.spacing[8],
      paddingHorizontal: primitive.spacing[3],
      fontSize: primitive.fontSize.sm,
      borderRadius: primitive.borderRadius.md,
      gap: primitive.spacing[1.5],
      iconSize: 16,
    },
    md: {
      height: primitive.spacing[11],
      paddingHorizontal: primitive.spacing[4],
      fontSize: primitive.fontSize.base,
      borderRadius: primitive.borderRadius.md,
      gap: primitive.spacing[2],
      iconSize: 20,
    },
    lg: {
      height: primitive.spacing[12],
      paddingHorizontal: primitive.spacing[6],
      fontSize: primitive.fontSize.lg,
      borderRadius: primitive.borderRadius.lg,
      gap: primitive.spacing[2],
      iconSize: 24,
    },
  },

  // Shared tokens (apply to all variants/sizes)
  borderRadius: primitive.borderRadius.md,
  borderWidth: 1,
  gap: primitive.spacing[2],
  padding: primitive.spacing[4],

  // Variant-based color tokens (separate light/dark)
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        backgroundPressed: light.action.primaryPressed,
        text: light.text.inverse,
        border: light.border.primary,
        icon: light.text.inverse,
      },
      secondary: {
        background: light.surface.secondary,
        backgroundPressed: light.surface.tertiary,
        text: light.text.primary,
        border: light.border.primary,
        icon: light.text.primary,
      },
      disabled: {
        background: light.surface.tertiary,
        text: light.text.secondary,
        border: light.border.primary,
        opacity: primitive.opacity.disabled,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        backgroundPressed: dark.action.primaryPressed,
        text: dark.text.inverse,
        border: dark.border.primary,
        icon: dark.text.inverse,
      },
      secondary: {
        background: dark.surface.secondary,
        backgroundPressed: dark.surface.tertiary,
        text: dark.text.primary,
        border: dark.border.primary,
        icon: dark.text.primary,
      },
      disabled: {
        background: dark.surface.tertiary,
        text: dark.text.secondary,
        border: dark.border.primary,
        opacity: primitive.opacity.disabled,
      },
    },
  },
} as const;
```

### Token Composition Rules

1. **Use Primitive Tokens** for:
   - Spacing values (`primitive.spacing[4]`)
   - Font sizes (`primitive.fontSize.base`)
   - Border radius (`primitive.borderRadius.md`)
   - Opacity values (`primitive.opacity.disabled`)
   - Shadows (`primitive.shadowPresets.md`)

2. **Use Semantic Tokens** for:
   - Colors (`light.text.primary`, `dark.surface.elevated`)
   - Text styles (`semantic.textStyles.body`)
   - State-based colors (`light.status.success.main`)

3. **Never Hardcode** values:

   ```typescript
   // ❌ Wrong
   paddingHorizontal: 16,
   backgroundColor: "#4A90E2",

   // ✅ Correct
   paddingHorizontal: primitive.spacing[4],
   backgroundColor: light.action.primary,
   ```

4. **Export as const** for type safety:
   ```typescript
   export const componentName = {
     /* ... */
   } as const;
   ```

## 3. Component Implementation Pattern

### Using the Theme

All components must use the `useTheme()` hook:

```typescript
import { useTheme } from "../theme";
import { Typography } from "../typography";

export const Component = ({ variant = "primary", size = "md", style, ...props }) => {
  const { theme, colorScheme } = useTheme();

  // Access component-specific tokens
  const variantTokens = theme.component.componentName.variant[colorScheme][variant];
  const sizeTokens = theme.component.componentName.size[size];

  return (
    <View
      style={[
        baseStyles.container,
        {
          // Apply theme tokens
          backgroundColor: variantTokens.background,
          borderColor: variantTokens.border,
          borderRadius: sizeTokens.borderRadius,
          paddingHorizontal: sizeTokens.paddingHorizontal,
          paddingVertical: sizeTokens.paddingVertical,
          gap: sizeTokens.gap,
        },
        style, // User overrides (last = highest priority)
      ]}
      {...props}
    >
      <Typography variant="body" style={{ color: variantTokens.text }}>
        {children}
      </Typography>
    </View>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
});
```

### Typography Usage

**ALWAYS use Typography component instead of Text:**

```typescript
import { Typography } from "../typography";

// ✅ Correct
<Typography variant="body" style={{ color: variantTokens.text }}>
  {children}
</Typography>

// ✅ Correct with custom styling
<Typography
  variant="heading"
  style={{
    color: variantTokens.text,
    fontWeight: theme.primitive.fontWeight.bold, // Can override via tokens
  }}
>
  {title}
</Typography>

// ❌ Never use Text
<Text style={{ fontSize: 14, color: "#000" }}>
  {children}
</Text>
```

### Style Merge Order

Follow this pattern for all style merging:

```typescript
style={[
  baseStyles.static,          // 1. Static StyleSheet (layout, structure)
  {
    // 2. Theme-derived dynamic styles (colors, sizes)
    backgroundColor: variantTokens.background,
    color: variantTokens.text,
    padding: sizeTokens.padding,
  },
  style,                      // 3. User overrides (highest priority)
]}
```

### State-Based Styling

Handle pressed/hover/disabled states via theme tokens:

```typescript
const variantTokens = isDisabled
  ? theme.component.componentName.variant[colorScheme].disabled
  : theme.component.componentName.variant[colorScheme][variant];

const backgroundColor = isDisabled
  ? variantTokens.background
  : pressed && "backgroundPressed" in variantTokens
    ? variantTokens.backgroundPressed
    : variantTokens.background;

<Pressable
  style={[
    baseStyles.pressable,
    {
      backgroundColor,
      opacity: isDisabled ? variantTokens.opacity : 1,
    },
  ]}
>
```

## 4. TypeScript Patterns

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

## 5. Example Files Pattern

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

## 6. README.mdx Structure

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

## 7. meta.json Structure

```json
{
  "type": "react-native",
  "name": "component-name",
  "description": "Brief one-line description",
  "dependencies": []
}
```

**Dependencies array:** List other warpui components this component uses (e.g., `["typography"]`)

## 8. Test Structure

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

After creating component files, automatically update these 4 files:

### a. Component Theme Export

**File**: `packages/react-native/src/theme/tokens/components.ts`

Add export for the new component theme:

```typescript
export * from "../../component-name/ComponentName.theme";
```

**CRITICAL**: This must be done for the theme system to recognize your component tokens.

### b. Main Package Export

**File**: `packages/react-native/src/index.ts`

```typescript
export { ComponentName, type ComponentNameProps } from "./component-name";
```

### c. Documentation Registry

**File**: `packages/react-native/src/docs-registry.ts`

```typescript
import ComponentNameDocs from "./component-name/README.mdx";

export const docsRegistry: Record<string, React.FC> = {
  "component-name": ComponentNameDocs,
  // ... existing entries
};
```

### d. Component Registry

**File**: `packages/react-native/src/registry.json`

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

### Core Files

- ✅ All 6 core files created:
  - ✅ `Component.tsx` - Main implementation
  - ✅ `Component.theme.ts` - **Theme tokens file**
  - ✅ `index.ts` - Barrel export
  - ✅ `meta.json` - Metadata
  - ✅ `README.mdx` - Documentation
  - ✅ `Component.test.tsx` - Tests

### Examples Directory

- ✅ Examples directory created with:
  - ✅ At least `BasicExample.tsx` created
  - ✅ Additional examples as needed (Variants, Interactive, etc.)
  - ✅ `examples/index.ts` barrel export exists
  - ✅ All examples have proper TypeScript types
  - ✅ Examples imported and used in README.mdx

### Theme System Integration

- ✅ `Component.theme.ts` exports token object with `as const`
- ✅ Theme file composes primitive and semantic tokens
- ✅ Variant tokens include separate light/dark objects
- ✅ NO hardcoded values in theme file
- ✅ Component uses `useTheme()` hook correctly
- ✅ Component accesses tokens via `theme.component.componentName`
- ✅ `components.ts` updated with theme export

### Component Implementation

- ✅ Uses `Typography` component (never `Text`)
- ✅ All colors from `variantTokens`
- ✅ All sizes from `sizeTokens` or primitive tokens
- ✅ Style merge follows pattern: [baseStyles, themeStyles, customStyle]
- ✅ Color scheme switching via `variant[colorScheme]`
- ✅ NO hardcoded spacing, colors, or font sizes

### Documentation

- ✅ README.mdx imports examples from `./examples`
- ✅ No inline JSX examples in README.mdx (all extracted to .tsx files)
- ✅ Code blocks (in backticks) kept for documentation purposes
- ✅ meta.json populated with correct metadata

### Testing

- ✅ Tests cover rendering, variants, style merging, props forwarding
- ✅ Tests verify theme token application

### Registry

- ✅ All 4 registry files updated:
  - ✅ `theme/tokens/components.ts` - **Theme export added**
  - ✅ `index.ts` - Component export
  - ✅ `docs-registry.ts` - Docs export
  - ✅ `registry.json` - Metadata entry

### Validation

- ✅ All verification steps pass (format, type-check, lint, test)

## 12. Component Naming Conventions

- **Directory**: kebab-case (e.g., `button`, `input-field`)
- **Component file**: PascalCase (e.g., `Button.tsx`, `InputField.tsx`)
- **meta.json name**: kebab-case matching directory
- **Variant values**: kebab-case (e.g., `"primary"`, `"large-filled"`)
- **Example files**: PascalCase with "Example" suffix (e.g., `BasicExample.tsx`, `InteractiveExample.tsx`)

## 13. AI Optimization Notes

### Theme-First Development

- Build component theme tokens FIRST before implementation
- Use tokens for ALL styling - no magic numbers
- Reference existing component themes for patterns
- Typography component handles all text styling

### Clear Token Structure

- Use descriptive token names (e.g., `backgroundPressed`, not `bgP`)
- Group related tokens (size, variant, shared)
- Separate light/dark color variants explicitly
- Export with `as const` for strict typing

### Implementation Clarity

- `useTheme()` hook provides full theme access
- Access pattern: `theme.component.{name}.variant[colorScheme][variant]`
- Typography variants eliminate fontSize/lineHeight management
- Style merge order prevents override conflicts

### Documentation

- Extract ALL examples to `.tsx` files for full TypeScript validation
- Document all props thoroughly for AI understanding
- Mention customization via theme tokens in README
- Examples in separate files enable:
  - AI code completion and IntelliSense
  - Automatic error detection during development
  - Easier testing and maintenance
  - Reusable example components

### Component Patterns to Follow

- Reference Button, Alert, or Tabs components for complete examples
- Copy theme file structure from similar components
- Use existing primitive/semantic tokens before creating new ones
- Follow WCAG AA contrast requirements in theme colors
