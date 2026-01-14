---
name: develop-component
description: Implements React Native components from approved OpenSpec proposals. Use when user asks to "implement the proposal", "develop component from spec", "build component", or "create component" (if proposal exists).
allowed-tools: Read, Write, Edit, Bash, Grep, Glob, TodoWrite
---

# Develop Component Skill

Implements React Native components from approved OpenSpec proposals.

## When to Use

Automatically triggered when user says:
- "Implement the [component] proposal"
- "Develop [component] from the approved spec"
- "Build the [component] component"
- "Create [component]" (if proposal already exists)

## Prerequisites

- Approved OpenSpec proposal exists at: `openspec/changes/add-[component-name]-component/`
- User has reviewed and approved the proposal
- All 3 proposal files exist (proposal.md, spec.md, tasks.md)

## Workflow

### 1. Read Proposal Files

```bash
Read:
  - openspec/changes/add-[component-name]-component/proposal.md
  - openspec/changes/add-[component-name]-component/specs/[component-name]/spec.md
  - openspec/changes/add-[component-name]-component/tasks.md
```

Extract:
- Component name
- Description
- Variants (from spec.md "Requirement: Variants")
- Sizes (from spec.md "Requirement: Sizes")
- Features (icons, loading, disabled, forwardRef)
- Base component (View, Pressable, TextInput, ScrollView)

### 2. Setup Progress Tracking

Use TodoWrite to create task list from tasks.md:

```typescript
TodoWrite with 8 sections:
1. Theme System (5 tasks)
2. Component Implementation (8 tasks)
3. Testing (9 tasks)
4. Examples (6 tasks)
5. Documentation (11 tasks)
6. Metadata (5 tasks)
7. Registry Generation (1 task)
8. Verification (6 tasks)
```

Mark first task as `in_progress`.

### 3. Generate Scaffolding

Build JSON configuration from spec requirements:

```json
{
  "name": "[ComponentName]",
  "description": "[Brief Apple HIG style description]",
  "baseComponent": "View|Pressable|TextInput|ScrollView",
  "hasVariants": true|false,
  "variants": "primary, secondary, outline" (if hasVariants=true),
  "hasSizes": true|false,
  "sizes": "sm, md, lg" (if hasSizes=true),
  "needsForwardRef": true|false,
  "hasIcons": true|false,
  "hasLoading": true|false,
  "hasDisabled": true|false,
  "dependencies": "typography,icon" (comma-separated),
  "category": "interactive|layout|input|display|feedback|navigation|surfaces",
  "tags": "action,form,cta" (comma-separated)
}
```

Execute scaffolding:
```bash
bun run scaffold:component '<json>'
```

Verify output: All 7 files generated + registries updated + formatted.

Mark scaffolding tasks complete in TodoWrite (sections 1, 2 initial setup).

### 4. Refine Theme Tokens

Edit `Component.theme.ts`:

```typescript
import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const componentName = {
  // Size tokens (primitive-based)
  size: {
    sm: {
      height: primitive.spacing[8],
      padding: primitive.spacing[2],
      fontSize: primitive.fontSize.sm,
    },
    md: {
      height: primitive.spacing[11],
      padding: primitive.spacing[3],
      fontSize: primitive.fontSize.base,
    },
    lg: {
      height: primitive.spacing[12],
      padding: primitive.spacing[4],
      fontSize: primitive.fontSize.lg,
    },
  },

  // Variant tokens (semantic colors, light/dark)
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        text: light.text.inverse,
        border: light.border.primary,
        backgroundPressed: light.action.primaryHover,
      },
      secondary: {
        background: light.action.secondary,
        text: light.text.primary,
        border: light.border.secondary,
        backgroundPressed: light.action.secondaryHover,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        text: dark.text.inverse,
        border: dark.border.primary,
        backgroundPressed: dark.action.primaryHover,
      },
      secondary: {
        background: dark.action.secondary,
        text: dark.text.primary,
        border: dark.border.secondary,
        backgroundPressed: dark.action.secondaryHover,
      },
    },
  },

  // Additional tokens (if needed)
  borderRadius: primitive.borderRadius.md,
  icon: {
    size: 20,
    gap: primitive.spacing[2],
  },
} as const;
```

Use Figma-extracted tokens if documented in proposal.

Mark theme tasks complete in TodoWrite.

### 5. Refine Component Implementation

Edit `Component.tsx`:

- Implement spec requirements (animations, gestures, complex state)
- Use useTheme() hook
- Use Typography for all text
- Follow style merge pattern: [baseStyles, themeStyles, userStyle]
- Add proper accessibility props
- Implement forwardRef if needed

```typescript
import { useTheme } from "../theme";
import { Typography } from "../typography";
import { Pressable, StyleSheet } from "react-native";

export interface ComponentProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onPress?: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Component = ({
  variant = "primary",
  size = "md",
  disabled = false,
  onPress,
  children,
  style,
  ...props
}: ComponentProps) => {
  const { theme, colorScheme } = useTheme();

  const variantTokens = theme.component.componentName.variant[colorScheme][variant];
  const sizeTokens = theme.component.componentName.size[size];

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        baseStyles.container,
        {
          backgroundColor: pressed && !disabled
            ? variantTokens.backgroundPressed
            : variantTokens.background,
          height: sizeTokens.height,
          padding: sizeTokens.padding,
          borderColor: variantTokens.border,
          borderRadius: theme.component.componentName.borderRadius,
        },
        disabled && { opacity: theme.primitive.opacity.disabled },
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      {...props}
    >
      <Typography
        variant="body"
        style={{
          color: variantTokens.text,
          fontSize: sizeTokens.fontSize
        }}
      >
        {children}
      </Typography>
    </Pressable>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
```

Mark component implementation tasks complete in TodoWrite.

### 6. Enhance Tests

Edit `Component.test.tsx`:

Add scenario-based tests from spec.md:

```typescript
import { customRender } from "../test-utils";
import { Component } from "./Component";
import { fireEvent } from "@testing-library/react-native";

describe("<Component />", () => {
  // Test from spec Scenario: Basic rendering
  it("renders children correctly", () => {
    const { getByText } = customRender(<Component>Test Content</Component>);
    expect(getByText("Test Content")).toBeTruthy();
  });

  // Test from spec Scenario: Primary variant rendering
  it("applies primary variant tokens", () => {
    const { getByText } = customRender(
      <Component variant="primary">Button</Component>
    );
    const button = getByText("Button").parent;
    // Assert background, text, border match theme tokens
  });

  // Test from spec Scenario: Size rendering
  it("applies md size tokens", () => {
    const { getByText } = customRender(
      <Component size="md">Button</Component>
    );
    const button = getByText("Button").parent;
    // Assert height, padding match theme tokens
  });

  // Test from spec Scenario: Press state
  it("calls onPress handler when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = customRender(
      <Component onPress={onPress}>Button</Component>
    );
    fireEvent.press(getByText("Button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  // Test from spec Scenario: Press when disabled
  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByText } = customRender(
      <Component disabled onPress={onPress}>Button</Component>
    );
    fireEvent.press(getByText("Button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  // Test from spec Scenario: Accessibility
  it("sets accessibility props correctly", () => {
    const { getByRole } = customRender(
      <Component disabled>Button</Component>
    );
    const button = getByRole("button");
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  // Test style merging
  it("merges user styles correctly", () => {
    const customStyle = { marginTop: 20 };
    const { getByText } = customRender(
      <Component style={customStyle}>Button</Component>
    );
    const button = getByText("Button").parent;
    expect(button.props.style).toContainEqual(customStyle);
  });
});
```

Mark testing tasks complete in TodoWrite.

### 7. Enhance Documentation

Edit `README.mdx`:

```mdx
# [ComponentName]

[Brief description - 1-2 sentences, Apple HIG style]

## Overview

[ComponentName] is [key characteristics]. Use it when [primary use cases].

**Key Features:**
- [Feature 1]
- [Feature 2]
- [Feature 3]

## When NOT to Use

- [Anti-pattern 1] - Use [Alternative] instead
- [Anti-pattern 2] - Consider [Alternative]

## Variants

### Primary
[Description and when to use]

### Secondary
[Description and when to use]

## Examples

### Basic Usage

<BasicExample />

### Real-World Use Cases

<VariantsExample />
<SizesExample />

### Composition

[Show how component works with others]

## API Reference

### Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "primary" \| "secondary" | "primary" | Visual style variant |
| size | "sm" \| "md" \| "lg" | "md" | Size option |
| disabled | boolean | false | Disables interaction |
| onPress | () => void | undefined | Press event handler |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| style | StyleProp<ViewStyle> | undefined | Custom styles |

### Content Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | required | Content to display |

### Accessibility Props

Inherited from View/Pressable.

## Theme Tokens

### Color Tokens

```typescript
theme.component.componentName.variant[colorScheme].primary.background
theme.component.componentName.variant[colorScheme].primary.text
theme.component.componentName.variant[colorScheme].primary.border
```

### Spacing Tokens

```typescript
theme.component.componentName.size.md.height
theme.component.componentName.size.md.padding
```

### Typography Tokens

```typescript
theme.component.componentName.size.md.fontSize
```

## Accessibility

**WCAG Level:** AA compliant

**Keyboard Navigation:**
- Focusable via tab key
- Activatable via Enter/Space

**Screen Reader:**
- Announces as "button"
- Announces disabled state
- Reads children as label

**Visual Requirements:**
- Minimum touch target: 44x44 (iOS), 48x48 (Android)
- Color contrast: 4.5:1 for text, 3:1 for UI components
- Focus indicator visible

**Testing:**
```typescript
// Test accessibility props
expect(button.props.accessibilityRole).toBe("button");
expect(button.props.accessibilityState.disabled).toBe(true);
```

## Related Components

- [RelatedComponent1] - [Relationship]
- [RelatedComponent2] - [Relationship]

## Troubleshooting

### Issue: [Common problem]

**Cause:** [Why it happens]

**Solution:** [How to fix]
```

Create additional examples in `examples/`:
- VariantsExample.tsx
- SizesExample.tsx
- InteractiveExample.tsx (if stateful)
- Update examples/index.ts

Mark documentation tasks complete in TodoWrite.

### 8. Verify meta.json

Scaffdog generates meta.json. Verify it's correct:

```json
{
  "type": "components:ui",
  "name": "component-name",
  "description": "[Brief Apple HIG style description]",
  "category": "interactive",
  "tags": ["action", "form", "cta"],
  "dependencies": ["typography"]
}
```

Mark metadata tasks complete in TodoWrite.

### 9. Run Verification

Execute in sequence:

```bash
# 1. Format code
bun run format

# 2. Type check
bun run check-types --filter=@warp-ui/react-native

# 3. Lint
bun run lint --filter=@warp-ui/react-native

# 4. Test
bun run test --filter=@warp-ui/react-native
```

**CRITICAL**: ALL checks must pass (zero errors, zero warnings, zero test failures).

If any check fails:
- Read error output carefully
- Fix the specific issue
- Re-run failed check
- Continue when passing

Mark verification tasks complete in TodoWrite.

### 10. Update tasks.md

Edit tasks.md to mark all completed tasks with `- [x]`.

Verify all 8 sections are complete.

### 11. Report Completion

Output summary:

```
✅ Component Implementation Complete

Component: [Name]
Location: packages/react-native/src/[component-name]/

Files Created:
  ✓ [Component].tsx
  ✓ [Component].theme.ts
  ✓ [Component].test.tsx
  ✓ index.ts
  ✓ meta.json
  ✓ README.mdx
  ✓ examples/BasicExample.tsx
  ✓ examples/VariantsExample.tsx
  ✓ examples/SizesExample.tsx
  ✓ examples/index.ts

Registries Updated:
  ✓ src/theme/tokens/components.ts
  ✓ src/registry.json
  ✓ src/docs-registry.ts
  ✓ src/index.ts

Verification Results:
  ✅ Format: PASSED
  ✅ Type Check: PASSED (0 errors)
  ✅ Lint: PASSED (0 warnings)
  ✅ Tests: PASSED (23 tests)

View in Demo App:
  - Component appears in sidebar
  - Documentation at /docs/[component-name]

Next Steps:
  1. Test component in demo app
  2. When ready to merge, run: openspec archive add-[component-name]-component --yes
```

## Quality Gates

Before marking complete, ALL must pass:
- [ ] All 7 component files created
- [ ] Theme uses three-tier system (no hardcoded values)
- [ ] Typography component used for all text (never Text)
- [ ] All tests passing (zero failures)
- [ ] Zero TypeScript errors
- [ ] Zero ESLint warnings
- [ ] Code formatted with Prettier
- [ ] All tasks.md checkboxes marked [x]
- [ ] Component visible in demo app sidebar
- [ ] Documentation loads correctly

## Reference Documentation

See `.claude/skills/create-component/SKILL.md` for:
- Theme system patterns
- Component implementation patterns
- Test patterns
- Documentation templates
