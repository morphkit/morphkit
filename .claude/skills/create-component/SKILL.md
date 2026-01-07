---
name: create-component
description: Creates React Native components for the morph-ui component library following the three-tier theme system and established patterns. Use when user asks to "create a component", "make a component", "add a component", "build a component", or mentions creating React Native UI components.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Create React Native Component

## Overview

This skill creates complete React Native components for the morph-ui component library following:

- **Three-tier theme system**: Primitive → Semantic → Component tokens
- **shadcn/ui philosophy**: Copy-paste friendly, customizable via theme
- **Full TypeScript support**: Strong typing for components and theme tokens
- **WCAG AA compliance**: Accessible by default
- **Comprehensive testing**: Jest tests for all components

## Quick Start

To create a new component:

1. **Ask**: "Create a [ComponentName] component"
2. **I'll ask about**: Variants, sizes, and features needed
3. **I'll create all required files**:
   - Component.tsx
   - Component.theme.ts
   - Component.test.tsx
   - index.ts, meta.json, README.mdx
   - examples/ directory
4. **I'll update registries**: Theme export, package export, docs registry, component registry
5. **I'll run verification**: Format, type-check, lint, test

## Component Creation Workflow

### Step 1: Define Component Structure

I'll ask you about:

- **Variants**: What style variations? (e.g., primary, secondary, outline)
- **Sizes**: What size options? (sm, md, lg)
- **Features**: Special functionality? (icons, loading states, etc.)
- **Base component**: Extends View, Pressable, TextInput, etc.?

### Step 2: Create Theme Tokens First

Before implementation, I create `Component.theme.ts` with the three-tier system:

```typescript
import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const componentName = {
  // Size tokens (primitive-based)
  size: {
    sm: { height: primitive.spacing[8], padding: primitive.spacing[2] },
    md: { height: primitive.spacing[11], padding: primitive.spacing[3] },
    lg: { height: primitive.spacing[12], padding: primitive.spacing[4] },
  },

  // Variant tokens (semantic colors, light/dark)
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        text: light.text.inverse,
        border: light.border.primary,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        text: dark.text.inverse,
        border: dark.border.primary,
      },
    },
  },
} as const;
```

See [theme-system.md](references/theme-system.md) for complete theme patterns.

### Step 3: Implement Component

Components follow this pattern:

```typescript
import { useTheme } from "../theme";
import { Typography } from "../typography";

export const Component = ({ variant = "primary", size = "md", style }) => {
  const { theme, colorScheme } = useTheme();

  const variantTokens = theme.component.componentName.variant[colorScheme][variant];
  const sizeTokens = theme.component.componentName.size[size];

  return (
    <View
      style={[
        baseStyles.container,
        {
          backgroundColor: variantTokens.background,
          height: sizeTokens.height,
          padding: sizeTokens.padding,
        },
        style, // User overrides (highest priority)
      ]}
    >
      <Typography variant="body" style={{ color: variantTokens.text }}>
        {children}
      </Typography>
    </View>
  );
};
```

See [component-patterns.md](references/component-patterns.md) for detailed patterns.

### Step 4: Create Supporting Files

I'll automatically create:

**Required files**:

- `Component.tsx` - Main implementation
- `Component.theme.ts` - Theme tokens
- `Component.test.tsx` - Jest tests
- `index.ts` - Barrel export
- `meta.json` - Component metadata
- `README.mdx` - Documentation

**Examples directory**:

- `examples/BasicExample.tsx`
- `examples/VariantsExample.tsx` (if applicable)
- `examples/InteractiveExample.tsx` (if stateful)
- `examples/index.ts` - Barrel export

See [file-structure.md](references/file-structure.md) for complete file specifications.

### Step 5: Update Registries

I'll automatically update 4 registry files:

1. **`src/theme/tokens/components.ts`** - Export component theme

   ```typescript
   export * from "../../component-name/ComponentName.theme";
   ```

2. **`src/index.ts`** - Export component

   ```typescript
   export { ComponentName, type ComponentNameProps } from "./component-name";
   ```

3. **`src/docs-registry.ts`** - Register documentation
4. **`src/registry.json`** - Add metadata entry

### Step 6: Verification

I'll run all checks automatically:

```bash
bun run format                                  # Prettier
bun run check-types --filter=@warp-ui/react-native  # TypeScript
bun run lint --filter=@warp-ui/react-native         # ESLint
bun run test --filter=@warp-ui/react-native         # Jest
```

All checks must pass before the component is complete.

## Required Files Structure

All components go in `packages/react-native/src/<component-name>/`:

```
component-name/
├── ComponentName.tsx        (Main implementation)
├── ComponentName.theme.ts   (Theme tokens)
├── ComponentName.test.tsx   (Jest tests)
├── index.ts                 (Barrel export)
├── meta.json                (Metadata)
├── README.mdx               (Documentation)
└── examples/                (Example components)
    ├── BasicExample.tsx
    ├── VariantsExample.tsx
    └── index.ts
```

## Theme System Essentials

### Three Tiers

1. **Primitive**: Raw values (spacing, colors, sizes)
   - `primitive.spacing[4]` → 16px
   - `primitive.fontSize.base` → 16px
   - `primitive.borderRadius.md` → 8px

2. **Semantic**: Context-aware, theme-specific
   - `light.text.primary` → #000000
   - `dark.text.primary` → #FFFFFF
   - `light.action.primary` → #4A90E2

3. **Component**: Component-specific composition
   - `theme.component.button.size.md`
   - `theme.component.button.variant[colorScheme].primary`

### Core Rules

**✅ Always**:

- Use `useTheme()` hook to access theme
- Use `Typography` component instead of `Text`
- Access colors via `variant[colorScheme][variant]`
- Export theme with `as const` for type safety
- Merge styles: `[baseStyles, themeStyles, customStyle]`

**❌ Never**:

- Hardcode values (colors, spacing, sizes)
- Use React Native's `Text` component directly
- Skip the theme token file
- Forget to update component registry exports

## Component Patterns

### Props Interface

```typescript
export interface ComponentProps extends Omit<ViewProps, "style"> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

### Style Merging

```typescript
style={[
  baseStyles.static,     // 1. Static StyleSheet
  {
    // 2. Theme-derived dynamic styles
    backgroundColor: variantTokens.background,
    padding: sizeTokens.padding,
  },
  style,                 // 3. User overrides (highest priority)
]}
```

### State Handling

```typescript
const variantTokens = disabled
  ? theme.component.componentName.variant[colorScheme].disabled
  : theme.component.componentName.variant[colorScheme][variant];

const backgroundColor = disabled
  ? variantTokens.background
  : pressed
    ? variantTokens.backgroundPressed
    : variantTokens.background;
```

## Example Components

For complete examples, reference existing components:

- **Button** (`src/button/`) - Pressable with variants, sizes, icons, loading
- **Input** (`src/input/`) - TextInput with variants, label, error states
- **Typography** (`src/typography/`) - Text with variant system
- **Card** (`src/card/`) - Container with elevation and variants

## Quality Checklist

Before marking complete, verify:

### Files Created

- [ ] Component.tsx with proper implementation
- [ ] Component.theme.ts with three-tier tokens
- [ ] Component.test.tsx with comprehensive tests
- [ ] index.ts barrel export
- [ ] meta.json with metadata
- [ ] README.mdx with examples
- [ ] examples/ directory with at least BasicExample

### Theme Integration

- [ ] Theme file uses `as const`
- [ ] NO hardcoded values (all from tokens)
- [ ] Variant tokens have light/dark objects
- [ ] Component uses `useTheme()` hook
- [ ] Typography component used for text

### Implementation

- [ ] Props interface properly typed
- [ ] Style merge order correct
- [ ] Accessibility props included
- [ ] forwardRef if needed
- [ ] State handling via theme tokens

### Registry Updates

- [ ] `theme/tokens/components.ts` updated
- [ ] `src/index.ts` updated
- [ ] `src/docs-registry.ts` updated
- [ ] `src/registry.json` updated

### Verification

- [ ] `bun run format` passes
- [ ] `bun run check-types` passes (zero errors)
- [ ] `bun run lint` passes (zero warnings)
- [ ] `bun run test` passes (all tests green)

## Naming Conventions

- **Directory**: kebab-case (`button`, `text-input`)
- **Component file**: PascalCase (`Button.tsx`, `TextInput.tsx`)
- **Theme file**: PascalCase + `.theme.ts` (`Button.theme.ts`)
- **meta.json name**: kebab-case matching directory (`"button"`)
- **Variants**: kebab-case (`"primary"`, `"outline"`)
- **Examples**: PascalCase + `Example` (`BasicExample.tsx`)

## Development Notes

### Theme-First Approach

1. **Design theme tokens** before writing implementation
2. **Define all variants and sizes** in theme file
3. **Implement component** using only theme tokens
4. **Test theme switching** (light/dark modes)

### Typography Component

**Always use Typography instead of Text**:

```typescript
// ✅ Correct
<Typography variant="body" style={{ color: variantTokens.text }}>
  {children}
</Typography>

// ❌ Wrong - never do this
<Text style={{ fontSize: 14, color: "#000" }}>
  {children}
</Text>
```

Typography handles font sizes, line heights, and font families automatically.

### Accessibility

All components should include:

- `accessibilityRole` - Semantic role
- `accessibilityLabel` - Screen reader label
- `accessibilityState` - Current state (disabled, checked, etc.)
- `accessibilityHint` - Usage hint if needed
- Sufficient color contrast (WCAG AA)
- Proper focus indicators

## Common Patterns

### Interactive Components (Pressable)

```typescript
<Pressable
  onPress={onPress}
  disabled={disabled}
  style={({ pressed }) => [
    baseStyles.container,
    {
      backgroundColor: pressed
        ? variantTokens.backgroundPressed
        : variantTokens.background,
    },
    style,
  ]}
  accessibilityRole="button"
  accessibilityState={{ disabled }}
>
```

### Input Components (TextInput)

```typescript
<TextInput
  value={value}
  onChangeText={onChange}
  style={[
    baseStyles.input,
    {
      color: variantTokens.text,
      borderColor: isFocused ? variantTokens.focus : variantTokens.border,
    },
    style,
  ]}
  placeholderTextColor={variantTokens.placeholder}
/>
```

### Container Components (View)

```typescript
<View
  style={[
    baseStyles.container,
    {
      backgroundColor: variantTokens.background,
      padding: sizeTokens.padding,
      borderRadius: theme.primitive.borderRadius.md,
    },
    style,
  ]}
>
```

## Troubleshooting

**TypeScript errors after creating component**:

- Run `bun run check-types` to see specific errors
- Ensure theme file exports with `as const`
- Check that all registry files are updated

**Tests failing**:

- Verify component exports match test imports
- Check that ThemeProvider wraps test components
- Ensure mock data matches component prop types

**Theme tokens not found**:

- Verify `components.ts` includes your theme export
- Check import path in component matches theme file location
- Restart TypeScript server if types not updating

## Reference Documentation

For detailed information, see:

- [theme-system.md](references/theme-system.md) - Complete theme system guide
- [component-patterns.md](references/component-patterns.md) - Implementation patterns
- [file-structure.md](references/file-structure.md) - File requirements and registry updates

## Project Context

This component library is for **morph-ui**, a React Native component library following shadcn/ui principles. Components are:

- **Theme-first**: All styling uses design tokens
- **Copy-paste friendly**: Can be copied and customized
- **TypeScript-first**: Strong typing throughout
- **Accessible**: WCAG AA compliant by default
- **Composable**: Small, focused components that work together

The library uses Expo, Turborepo, and Bun for development.
