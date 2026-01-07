# File Structure and Registry Requirements

Complete specification for all files required when creating a new component and registry updates.

## Required Files Overview

Every component requires these 6 core files plus an examples directory:

```
packages/react-native/src/component-name/
├── ComponentName.tsx        # Main implementation
├── ComponentName.theme.ts   # Theme tokens
├── ComponentName.test.tsx   # Jest tests
├── index.ts                 # Barrel export
├── meta.json                # Component metadata
├── README.mdx               # Documentation
└── examples/                # Example components
    ├── BasicExample.tsx
    ├── VariantsExample.tsx  (if applicable)
    ├── InteractiveExample.tsx (if stateful)
    └── index.ts
```

## File Specifications

### 1. ComponentName.tsx

Main component implementation file.

**Requirements**:

- Uses `useTheme()` hook to access theme
- Uses `Typography` component for all text (never `Text`)
- All styling from theme tokens (no hardcoded values)
- Proper TypeScript interface extending native component
- forwardRef if component needs ref access
- Complete accessibility props
- Style merge order: [baseStyles, themeStyles, customStyle]

**Minimal Template**:

```typescript
import { forwardRef } from "react";
import { View, StyleSheet, ViewProps, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../theme";
import { Typography } from "../typography";

export interface ComponentNameProps extends Omit<ViewProps, "style"> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ComponentName = forwardRef<View, ComponentNameProps>((props, ref) => {
  const {
    variant = "primary",
    size = "md",
    children,
    style,
    ...rest
  } = props;

  const { theme, colorScheme } = useTheme();

  const variantTokens = theme.component.componentName.variant[colorScheme][variant];
  const sizeTokens = theme.component.componentName.size[size];

  return (
    <View
      ref={ref}
      style={[
        baseStyles.container,
        {
          backgroundColor: variantTokens.background,
          borderColor: variantTokens.border,
          height: sizeTokens.height,
          padding: sizeTokens.padding,
        },
        style,
      ]}
      {...rest}
    >
      <Typography variant="body" style={{ color: variantTokens.text }}>
        {children}
      </Typography>
    </View>
  );
});

ComponentName.displayName = "ComponentName";

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
```

### 2. ComponentName.theme.ts

Component theme tokens file.

**Requirements**:

- Import primitive and semantic tokens
- Define size variants (if applicable)
- Define color variants for light/dark themes
- Export with `as const` for type safety
- NO hardcoded values (all from primitive/semantic)

**Template**:

```typescript
import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const componentName = {
  // Size variants (primitive-based)
  size: {
    sm: {
      height: primitive.spacing[8],
      paddingHorizontal: primitive.spacing[2],
      fontSize: primitive.fontSize.sm,
      borderRadius: primitive.borderRadius.md,
    },
    md: {
      height: primitive.spacing[11],
      paddingHorizontal: primitive.spacing[3],
      fontSize: primitive.fontSize.base,
      borderRadius: primitive.borderRadius.md,
    },
    lg: {
      height: primitive.spacing[12],
      paddingHorizontal: primitive.spacing[4],
      fontSize: primitive.fontSize.lg,
      borderRadius: primitive.borderRadius.lg,
    },
  },

  // Shared tokens
  borderWidth: 1,
  gap: primitive.spacing[2],

  // Color variants (semantic-based, light/dark)
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        backgroundPressed: light.action.primaryPressed,
        text: light.text.inverse,
        border: light.border.primary,
      },
      secondary: {
        background: light.surface.secondary,
        backgroundPressed: light.surface.tertiary,
        text: light.text.primary,
        border: light.border.primary,
      },
      disabled: {
        background: light.surface.tertiary,
        text: light.text.disabled,
        border: light.border.secondary,
        opacity: primitive.opacity.disabled,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        backgroundPressed: dark.action.primaryPressed,
        text: dark.text.inverse,
        border: dark.border.primary,
      },
      secondary: {
        background: dark.surface.secondary,
        backgroundPressed: dark.surface.tertiary,
        text: dark.text.primary,
        border: dark.border.primary,
      },
      disabled: {
        background: dark.surface.tertiary,
        text: dark.text.disabled,
        border: dark.border.secondary,
        opacity: primitive.opacity.disabled,
      },
    },
  },
} as const;
```

### 3. ComponentName.test.tsx

Jest test file with comprehensive test coverage.

**Requirements**:

- Test basic rendering
- Test all variants
- Test all sizes
- Test event handlers
- Test disabled state
- Test style merging
- Test prop forwarding
- Test accessibility props
- Test ref forwarding (if applicable)

**Template**:

```typescript
import { render, fireEvent } from "@testing-library/react-native";
import { createRef } from "react";
import { View } from "react-native";
import { ComponentName } from "./ComponentName";

describe("<ComponentName />", () => {
  test("renders correctly", () => {
    const { getByText } = render(<ComponentName>Content</ComponentName>);
    expect(getByText("Content")).toBeTruthy();
  });

  test("applies primary variant by default", () => {
    const { getByText } = render(<ComponentName>Text</ComponentName>);
    expect(getByText("Text")).toBeTruthy();
  });

  test("applies secondary variant", () => {
    const { getByText } = render(
      <ComponentName variant="secondary">Text</ComponentName>
    );
    expect(getByText("Text")).toBeTruthy();
  });

  test("applies small size", () => {
    const { getByText } = render(<ComponentName size="sm">Text</ComponentName>);
    expect(getByText("Text")).toBeTruthy();
  });

  test("merges custom styles", () => {
    const customStyle = { margin: 10 };
    const { getByText } = render(
      <ComponentName style={customStyle}>Text</ComponentName>
    );
    const element = getByText("Text").parent?.parent;
    expect(element?.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)])
    );
  });

  test("forwards ref to underlying component", () => {
    const ref = createRef<View>();
    render(<ComponentName ref={ref}>Text</ComponentName>);
    expect(ref.current).toBeTruthy();
  });

  test("forwards accessibility props", () => {
    const { getByLabelText } = render(
      <ComponentName accessibilityLabel="Test">Content</ComponentName>
    );
    expect(getByLabelText("Test")).toBeTruthy();
  });
});
```

### 4. index.ts

Barrel export file.

**Requirements**:

- Export component
- Export props interface
- Keep clean and simple

**Template**:

```typescript
export { ComponentName, type ComponentNameProps } from "./ComponentName";
```

### 5. meta.json

Component metadata file.

**Requirements**:

- `type`: Always `"react-native"`
- `name`: kebab-case, matches directory name
- `description`: Brief one-line description
- `dependencies`: Array of other component names used

**Template**:

```json
{
  "type": "react-native",
  "name": "component-name",
  "description": "Brief description of what this component does",
  "dependencies": []
}
```

**Example with dependencies**:

```json
{
  "type": "react-native",
  "name": "input",
  "description": "Single-line text input field with variants and error states",
  "dependencies": ["typography"]
}
```

### 6. README.mdx

Component documentation with examples.

**Requirements**:

- Import component and examples at top
- Single paragraph description
- Multiple example sections
- Complete props table
- Usage examples (code blocks)
- Accessibility section
- Theme customization section
- Related components section

**Template**:

```mdx
import { ComponentName } from "./ComponentName";
import { View } from "react-native";
import { BasicExample, VariantsExample, InteractiveExample } from "./examples";

# Component Name

Single paragraph describing what this component is and how to use it.
Mention key features and intended use cases. This documentation is for
both humans and AI coding assistants.

## Basic Usage

<View style={{ marginVertical: 12 }}>
  <BasicExample />
</View>

## Variants

<View style={{ marginVertical: 12 }}>
  <VariantsExample />
</View>

## Interactive

<View style={{ marginVertical: 12 }}>
  <InteractiveExample />
</View>

## Props

| Prop     | Type                         | Default     | Description            |
| -------- | ---------------------------- | ----------- | ---------------------- |
| variant  | `"primary"` \| `"secondary"` | `"primary"` | Visual style variant   |
| size     | `"sm"` \| `"md"` \| `"lg"`   | `"md"`      | Component size         |
| disabled | `boolean`                    | `false`     | Disable interaction    |
| children | `ReactNode`                  | -           | Content to display     |
| style    | `StyleProp<ViewStyle>`       | -           | Custom style overrides |
| ...props | `ViewProps`                  | -           | All View props         |

## Usage Examples

### Basic Component

\`\`\`tsx
import { ComponentName } from "@repo/react-native";

<ComponentName variant="primary">Content</ComponentName>
\`\`\`

### With Custom Styling

\`\`\`tsx

<ComponentName variant="secondary" size="lg" style={{ marginVertical: 8 }}>
  Custom Styled
</ComponentName>
\`\`\`

## Accessibility

This component follows WCAG AA guidelines:

- Provides appropriate `accessibilityRole`
- Includes `accessibilityLabel` for screen readers
- Uses `accessibilityState` to communicate state
- Maintains sufficient color contrast (4.5:1 for text)

## Theme Customization

Customize via theme tokens in your ThemeProvider:

\`\`\`tsx
const customTheme = {
component: {
componentName: {
variant: {
light: {
primary: {
background: "#FF6B6B",
text: "#FFFFFF",
},
},
},
},
},
};
\`\`\`

## Related Components

- [RelatedComponent](../related/README.mdx) - Similar functionality
```

### 7. examples/ Directory

Directory containing all interactive examples.

**Requirements**:

- At least `BasicExample.tsx` (required)
- `VariantsExample.tsx` (if component has variants)
- `SizesExample.tsx` (if component has sizes)
- `InteractiveExample.tsx` (if component is stateful)
- `index.ts` barrel export

**BasicExample.tsx Template**:

```typescript
import { View } from "react-native";
import { ComponentName } from "../ComponentName";

export const BasicExample = () => {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
    </View>
  );
};
```

**examples/index.ts Template**:

```typescript
export * from "./BasicExample";
export * from "./VariantsExample";
export * from "./InteractiveExample";
```

## Registry Updates

After creating all component files, you MUST update these 4 registry files:

### 1. Component Theme Export

**File**: `packages/react-native/src/theme/tokens/components.ts`

**Action**: Add export for your component's theme file

```typescript
// ... existing exports ...
export * from "../../component-name/ComponentName.theme";
```

**Location**: Add at the end of the file in alphabetical order

**Critical**: This MUST be done for the theme system to recognize your component tokens. Without this, TypeScript will not find your theme tokens.

### 2. Main Package Export

**File**: `packages/react-native/src/index.ts`

**Action**: Export component and props interface

```typescript
// ... existing exports ...
export { ComponentName, type ComponentNameProps } from "./component-name";
```

**Location**: Add in alphabetical order with other component exports

### 3. Documentation Registry

**File**: `packages/react-native/src/docs-registry.ts`

**Action**: Import and register component documentation

```typescript
// ... existing imports ...
import ComponentNameDocs from "./component-name/README.mdx";

export const docsRegistry: Record<string, React.FC> = {
  // ... existing entries ...
  "component-name": ComponentNameDocs,
};
```

**Location**: Add import at top (alphabetical), add registry entry (alphabetical)

### 4. Component Registry

**File**: `packages/react-native/src/registry.json`

**Action**: Add component metadata to components array

```json
{
  "version": "1.0.0",
  "components": [
    // ... existing components ...
    {
      "type": "react-native",
      "name": "component-name",
      "description": "Brief description",
      "dependencies": []
    }
  ]
}
```

**Location**: Add to components array in alphabetical order by name

## Verification Steps

After creating all files and updating registries, run these commands:

### 1. Format Code

```bash
bun run format
```

Formats all code with Prettier. Must pass with no changes.

### 2. Type Check

```bash
bun run check-types --filter=@warp-ui/react-native
```

Runs TypeScript compiler with `--noEmit`. Must pass with zero errors.

**Common errors**:

- Missing theme export in `components.ts`
- Incorrect import paths
- Missing prop type definitions
- Theme tokens not typed correctly (missing `as const`)

### 3. Lint

```bash
bun run lint --filter=@warp-ui/react-native
```

Runs ESLint with `--max-warnings 0`. Must pass with zero warnings.

**Common issues**:

- Unused imports
- Missing dependency in useEffect/useCallback
- Incorrect prop types
- Accessibility warnings

### 4. Test

```bash
bun run test --filter=@warp-ui/react-native
```

Runs Jest tests. All tests must pass.

**Common failures**:

- Missing ThemeProvider wrapper in tests
- Incorrect test selectors
- Event handlers not mocked properly
- Snapshot mismatches

## Detailed Quality Checklist

### Core Files

- [ ] `ComponentName.tsx` exists and exports component + props interface
- [ ] `ComponentName.theme.ts` exists and exports with `as const`
- [ ] `ComponentName.test.tsx` exists with comprehensive tests
- [ ] `index.ts` exists with barrel exports
- [ ] `meta.json` exists with correct metadata
- [ ] `README.mdx` exists with complete documentation

### Examples Directory

- [ ] `examples/` directory exists
- [ ] `examples/BasicExample.tsx` exists
- [ ] `examples/index.ts` exists with exports
- [ ] Additional examples created as needed (Variants, Interactive, etc.)
- [ ] All examples are valid TypeScript (no errors)
- [ ] Examples imported and used in README.mdx

### Theme System Integration

- [ ] Theme file imports primitive tokens
- [ ] Theme file imports semantic colors (light/dark)
- [ ] Size tokens use primitive values only
- [ ] Variant tokens use semantic colors only
- [ ] Theme exported with `as const`
- [ ] NO hardcoded values in theme file (no hex, no magic numbers)
- [ ] Light and dark variants defined separately

### Component Implementation

- [ ] Component uses `useTheme()` hook
- [ ] Component accesses theme via `theme.component.componentName`
- [ ] Typography component used for all text (never `Text`)
- [ ] All colors from variant tokens
- [ ] All sizes/spacing from size tokens or primitives
- [ ] Style merge follows pattern: [baseStyles, themeStyles, customStyle]
- [ ] Color scheme switching works (`variant[colorScheme]`)
- [ ] NO hardcoded values in component (no hex, no magic numbers)
- [ ] forwardRef used if component needs ref
- [ ] displayName set if using forwardRef

### Accessibility

- [ ] `accessibilityRole` set appropriately
- [ ] `accessibilityLabel` supported
- [ ] `accessibilityState` used for component state
- [ ] `accessibilityHint` added if needed
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Interactive elements have proper touch targets (44x44 minimum)

### TypeScript

- [ ] Props interface extends appropriate native type
- [ ] Conflicting props omitted from native type
- [ ] Variant types defined as union types
- [ ] All props properly typed (no `any`)
- [ ] Component and props interface both exported
- [ ] forwardRef typed correctly (if used)

### Documentation

- [ ] README imports examples from `./examples`
- [ ] README wraps examples in `<View style={{ marginVertical: 12 }}>`
- [ ] NO inline JSX examples in README (all extracted to .tsx)
- [ ] Code blocks (in backticks) kept for documentation
- [ ] Props table complete and accurate
- [ ] Accessibility section included
- [ ] Theme customization example included
- [ ] Related components linked

### Testing

- [ ] Tests cover basic rendering
- [ ] Tests cover all variants
- [ ] Tests cover all sizes
- [ ] Tests cover event handlers
- [ ] Tests cover disabled state
- [ ] Tests cover style merging
- [ ] Tests cover prop forwarding
- [ ] Tests cover accessibility props
- [ ] Tests cover ref forwarding (if applicable)
- [ ] All tests pass

### Registry

- [ ] `theme/tokens/components.ts` updated with theme export
- [ ] `src/index.ts` updated with component export
- [ ] `src/docs-registry.ts` updated with docs import and registry entry
- [ ] `src/registry.json` updated with metadata entry

### Verification

- [ ] `bun run format` passes (no changes needed)
- [ ] `bun run check-types --filter=@warp-ui/react-native` passes (zero errors)
- [ ] `bun run lint --filter=@warp-ui/react-native` passes (zero warnings)
- [ ] `bun run test --filter=@warp-ui/react-native` passes (all tests green)

## Troubleshooting

### TypeScript can't find theme tokens

**Symptoms**: Error like `Property 'componentName' does not exist on type 'ComponentTokens'`

**Fix**: Ensure you added the theme export to `src/theme/tokens/components.ts`:

```typescript
export * from "../../component-name/ComponentName.theme";
```

Restart TypeScript server after adding.

### Tests failing with theme errors

**Symptoms**: `Cannot read property 'component' of undefined`

**Fix**: Ensure tests wrap component with ThemeProvider:

```typescript
import { render } from "../test-utils"; // Use custom render

// This automatically wraps with ThemeProvider
const { getByText } = render(<Component>Text</Component>);
```

### ESLint warnings about unused vars

**Symptoms**: Warning about unused `rest` or `props`

**Fix**: Use the spread props:

```typescript
const { variant, size, style, ...rest } = props;

return <View {...rest} />;
```

### Component not appearing in docs registry

**Symptoms**: Documentation doesn't load in docs viewer

**Fix**: Verify all three steps:

1. Import: `import ComponentNameDocs from "./component-name/README.mdx";`
2. Registry: `"component-name": ComponentNameDocs,`
3. Restart dev server

## Summary

Creating a component requires:

1. **7 files**: Component, Theme, Test, Index, Meta, README, Examples
2. **4 registry updates**: Theme tokens, Package exports, Docs registry, Component registry
3. **4 verification steps**: Format, Type-check, Lint, Test

Follow this checklist for every component to ensure consistency and quality across the library.
