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

Component metadata file with enhanced fields for discoverability and organization.

**Required Fields**:

- `type`: Always `"react-native"`
- `name`: kebab-case, matches directory name
- `description`: Brief one-line description (Apple HIG style: direct, action-focused)
- `category`: Component category for grouping
- `dependencies`: Array of other component names used within this component

**Optional Fields**:

- `tags`: Array of keywords for searchability

**Category Values**:

- `layout` - Box, Container, Stack, Divider
- `input` - Input, Textarea, Checkbox, Radio, Select, Switch, Slider, OTP Input
- `display` - Typography, Badge, Tag, Avatar, Progress, Skeleton, Spinner
- `interactive` - Button, Accordion, Tabs
- `feedback` - Alert, Toast
- `navigation` - FAB, Tab Bars, Breadcrumb
- `surfaces` - Card, Sheet, Modal

**Basic Template**:

```json
{
  "type": "react-native",
  "name": "component-name",
  "description": "Brief description following Apple HIG style",
  "category": "interactive",
  "tags": ["action", "form"],
  "dependencies": []
}
```

**Complete Example**:

```json
{
  "type": "react-native",
  "name": "button",
  "description": "Buttons initiate actions. They support multiple variants, sizes, and can include icons or loading states.",
  "category": "interactive",
  "tags": ["action", "form", "navigation", "cta"],
  "dependencies": ["typography"]
}
```

**Example with Multiple Dependencies**:

```json
{
  "type": "react-native",
  "name": "select",
  "description": "Selects let users choose one option from a list. They support search, grouping, and custom rendering.",
  "category": "input",
  "tags": ["form", "dropdown", "picker", "menu"],
  "dependencies": ["typography", "icon", "checkbox"]
}
```

### 6. README.mdx

Component documentation following Apple HIG writing style with comprehensive examples and specifications.

**Requirements**:

- **Apple HIG tone**: Brief (1-2 sentences), direct language, user-focused
- Import component and examples at top
- Overview section with key characteristics
- When NOT to Use section with anti-patterns
- Variants with real-world use cases
- Examples: Basic, Real-World, Composition
- API Reference with grouped prop tables
- Theme Tokens section (comprehensive)
- Enhanced Accessibility section
- Related Components
- Troubleshooting section

**Enhanced Template**:

```mdx
import { ComponentName } from "./ComponentName";
import { View } from "react-native";
import {
  BasicExample,
  VariantsExample,
  RealWorldExample,
  CompositionExample,
} from "./examples";

# Component Name

Brief description (1-2 sentences, Apple HIG style). Mention core functionality.

## Overview

What this component is and its primary use case:

- Minimum touch target: 44pt × 44pt (Apple HIG requirement)
- WCAG compliance: Level AA
- Theme-aware: Supports light and dark modes
- Typography integration: Uses Typography component for text

**When to use this component:**

- Scenario 1
- Scenario 2
- Scenario 3

## When NOT to Use

- **Don't use** for X - use Y instead
- **Don't use** for Z - use W instead
- **Alternative**: For subtle actions, consider A

## Variants

### Variant Name

<View style={{ marginVertical: 12 }}>
  <VariantsExample />
</View>

**Use for**: Primary actions
**Real-world example**: Login button, Save button

## Examples

### Basic Usage

<View style={{ marginVertical: 12 }}>
  <BasicExample />
</View>

\`\`\`tsx
import { ComponentName } from "@morph-ui/react-native";

<ComponentName variant="primary">Content</ComponentName>
\`\`\`

### Real-World Use Cases

#### Use Case 1

<View style={{ marginVertical: 12 }}>
  <RealWorldExample variant="useCase1" />
</View>

\`\`\`tsx
// Real-world example code showing composition with other components
\`\`\`

### Composition

<View style={{ marginVertical: 12 }}>
  <CompositionExample />
</View>

\`\`\`tsx
// How this component works with others
\`\`\`

## API Reference

### Behavior Props

| Prop    | Type         | Default | Required | Description         |
| ------- | ------------ | ------- | -------- | ------------------- |
| onPress | `() => void` | -       | ✓        | Called when pressed |

### Styling Props

| Prop    | Type                         | Default     | Required | Description          |
| ------- | ---------------------------- | ----------- | -------- | -------------------- |
| variant | `"primary"` \| `"secondary"` | `"primary"` | -        | Visual style variant |
| size    | `"sm"` \| `"md"` \| `"lg"`   | `"md"`      | -        | Component size       |

### Content Props

| Prop     | Type        | Default | Required | Description        |
| -------- | ----------- | ------- | -------- | ------------------ |
| children | `ReactNode` | -       | -        | Content to display |

### Accessibility Props

| Prop               | Type                   | Default | Required | Description            |
| ------------------ | ---------------------- | ------- | -------- | ---------------------- |
| accessibilityLabel | `string`               | -       | -        | Screen reader label    |
| style              | `StyleProp<ViewStyle>` | -       | -        | Custom style overrides |

### Theme Tokens

This component uses the following design tokens from the three-tier theme system:

#### Color Tokens

| Token Path                                         | Purpose    | Light Mode | Dark Mode |
| -------------------------------------------------- | ---------- | ---------- | --------- |
| `theme.component.name.variant[variant].background` | Background | `#007AFF`  | `#0A84FF` |
| `theme.component.name.variant[variant].text`       | Text color | `#FFFFFF`  | `#FFFFFF` |

#### Spacing Tokens

| Token Path                                | Purpose | Value | Primitive Source             |
| ----------------------------------------- | ------- | ----- | ---------------------------- |
| `theme.component.name.size[size].padding` | Padding | `16`  | `theme.primitive.spacing[4]` |

#### Typography Tokens

| Token Path                       | Purpose    | Value            | Semantic Source                  |
| -------------------------------- | ---------- | ---------------- | -------------------------------- |
| `theme.component.name.textStyle` | Text style | `{fontSize: 16}` | `theme.semantic.textStyles.body` |

#### Border & Shape Tokens

| Token Path                          | Purpose       | Value | Primitive Source                  |
| ----------------------------------- | ------------- | ----- | --------------------------------- |
| `theme.component.name.borderRadius` | Corner radius | `8`   | `theme.primitive.borderRadius.md` |

#### Customization Example

\`\`\`tsx
import { createTheme } from "@morph-ui/react-native";

const customTheme = createTheme({
component: {
componentName: {
borderRadius: 16,
variant: {
primary: {
background: "#FF3B30",
text: "#FFFFFF",
},
},
},
},
});
\`\`\`

## Accessibility

### WCAG Compliance

This component meets WCAG 2.1 Level AA standards.

### Keyboard Navigation

- **Tab**: Move focus to component
- **Enter**: Activate component

### Screen Reader Support

- Role announced automatically
- Label read from `children` or `accessibilityLabel`
- Disabled state announced via `aria-disabled`

### Visual Requirements

- **Contrast Ratio**: 4.5:1 minimum (WCAG AA)
- **Focus Indicator**: 2px solid outline with 2px offset
- **Touch Target**: 44pt × 44pt minimum (Apple HIG)

### Implementation

\`\`\`tsx

<ComponentName
  accessibilityLabel="Submit form"
  accessibilityHint="Submits the form"
  accessibilityRole="button"
  accessibilityState={{ disabled: false }}
>
  Submit
</ComponentName>
\`\`\`

### Testing with Screen Readers

- **iOS**: VoiceOver
- **Android**: TalkBack
- Verify all states are announced correctly

## Related Components

- [RelatedComponent](../related/README.mdx) - Description
- [AnotherComponent](../another/README.mdx) - Description

## Troubleshooting

### Issue 1

- Check X
- Verify Y

### Issue 2

- Ensure Z
- Confirm W
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

## Registry Generation

After creating all component files, registries are automatically updated via generation scripts.

**Run Generation:**

```bash
cd /path/to/morph-ui
bun run generate
```

**What Gets Generated:**

1. **Component Registry** (`src/registry.json`)
   - Reads all `{component}/meta.json` files
   - Alphabetically sorted component list
   - Includes: name, description, dependencies

2. **Docs Registry** (`src/docs-registry.ts`)
   - Imports all `{component}/README.mdx` files
   - Maps component names to documentation components
   - Alphabetically sorted imports

3. **Barrel Exports** (`src/index.ts`)
   - Simple `export * from "./{component}"` pattern
   - Alphabetically sorted
   - Includes theme exports

**Verification:**

Check generated files:

```bash
# Component in registry.json
grep -A 4 '"name": "button"' packages/react-native/src/registry.json

# Docs in docs-registry.ts
grep "ButtonDocs" packages/react-native/src/docs-registry.ts

# Exports in index.ts
grep 'from "./button"' packages/react-native/src/index.ts
```

**Important:**

- DO NOT manually edit `registry.json`, `docs-registry.ts`, or `index.ts`
- These files are auto-generated and will be overwritten
- The CI will fail if registries are stale
- Always run `bun run generate` after component changes

## Verification Steps

After creating all files and updating registries, run these commands:

### 1. Format Code

```bash
bun run format
```

Formats all code with Prettier. Must pass with no changes.

### 2. Type Check

```bash
bun run check-types --filter=@morph-ui/react-native
```

Runs TypeScript compiler with `--noEmit`. Must pass with zero errors.

**Common errors**:

- Missing theme export in `components.ts`
- Incorrect import paths
- Missing prop type definitions
- Theme tokens not typed correctly (missing `as const`)

### 3. Lint

```bash
bun run lint --filter=@morph-ui/react-native
```

Runs ESLint with `--max-warnings 0`. Must pass with zero warnings.

**Common issues**:

- Unused imports
- Missing dependency in useEffect/useCallback
- Incorrect prop types
- Accessibility warnings

### 4. Test

```bash
bun run test --filter=@morph-ui/react-native
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

- [ ] README follows Apple HIG writing style (brief, direct, user-focused)
- [ ] Brief description (1-2 sentences maximum)
- [ ] Overview section with key characteristics (touch target, WCAG level, theme-aware)
- [ ] When NOT to Use section with anti-patterns
- [ ] README imports examples from `./examples`
- [ ] README wraps examples in `<View style={{ marginVertical: 12 }}>`
- [ ] NO inline JSX examples in README (all extracted to .tsx)
- [ ] Code blocks (in backticks) kept for documentation
- [ ] Real-world use case examples (not just prop demos)
- [ ] Composition examples showing interaction with other components
- [ ] Props tables grouped by category (Behavior, Styling, Content, Accessibility)
- [ ] Theme Tokens section with comprehensive tables (Color, Spacing, Typography, Border, Shadow, Animation)
- [ ] Theme tokens show light/dark mode values
- [ ] Theme tokens reference primitive sources
- [ ] Enhanced Accessibility section with WCAG level, keyboard nav, screen reader, visual requirements
- [ ] Accessibility testing guide (VoiceOver, TalkBack)
- [ ] Related components linked
- [ ] Troubleshooting section with common issues

### Metadata

- [ ] meta.json includes all required fields (type, name, description, category, dependencies)
- [ ] meta.json includes optional fields (tags)
- [ ] Description follows Apple HIG style (direct, action-focused)
- [ ] Category value is valid (layout, input, display, interactive, feedback, navigation, surfaces)
- [ ] Tags are relevant and improve searchability
- [ ] Dependencies list all components used within this component

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
- [ ] `bun run check-types --filter=@morph-ui/react-native` passes (zero errors)
- [ ] `bun run lint --filter=@morph-ui/react-native` passes (zero warnings)
- [ ] `bun run test --filter=@morph-ui/react-native` passes (all tests green)

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
