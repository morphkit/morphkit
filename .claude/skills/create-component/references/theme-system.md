# Theme System Guide

Complete guide to the three-tier theme system used in morph-ui components.

## Overview

The component library uses a hierarchical token system for consistent, theme-aware styling:

**Primitive** → **Semantic** → **Component**

This architecture ensures:

- Consistent design across components
- Easy theme customization
- Automatic light/dark mode support
- Type-safe styling
- No hardcoded values

## Three-Tier Architecture

### Tier 1: Primitive Tokens

Raw design values without semantic meaning.

**Location**: `src/theme/tokens/primitive/`

**Files**:

- `colors.ts` - Color palettes (neutral, blue, red, green, etc.)
- `spacing.ts` - Spacing scale (0, 1.5, 2, 3, 4, 5, 6, 8, 12, 16...)
- `typography.ts` - Font sizes, weights, line heights
- `fonts.ts` - Font family definitions
- `radii.ts` - Border radius values
- `shadows.ts` - Shadow presets
- `animation.ts` - Animation timing
- `opacity.ts` - Opacity values
- `zIndex.ts` - Z-index layering

**Examples**:

```typescript
import * as primitive from "../theme/tokens/primitive";

primitive.spacing[4]; // 16px
primitive.spacing[8]; // 32px
primitive.fontSize.base; // 16px
primitive.fontSize.lg; // 18px
primitive.borderRadius.md; // 8px
primitive.borderRadius.full; // 9999px
primitive.opacity.disabled; // 0.5
primitive.shadowPresets.md; // Medium shadow object
```

**Usage**: Use primitive tokens for spacing, sizes, and other non-color values.

### Tier 2: Semantic Tokens

Context-aware tokens mapped to light/dark themes.

**Location**: `src/theme/tokens/semantic/colors.ts`

**Structure**:

```typescript
export const light = {
  action: {
    primary: "#4A90E2",
    primaryHover: "#3A7BC8",
    primaryPressed: "#2A66AE",
    secondary: "#E5E7EB",
  },
  text: {
    primary: "#1F2937",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    disabled: "#D1D5DB",
    inverse: "#FFFFFF",
    link: "#4A90E2",
  },
  surface: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F3F4F6",
    elevated: "#FFFFFF",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  border: {
    primary: "#E5E7EB",
    secondary: "#D1D5DB",
    tertiary: "#F3F4F6",
    focus: "#4A90E2",
    error: "#EF4444",
  },
  status: {
    success: {
      main: "#10B981",
      surface: "#D1FAE5",
      border: "#6EE7B7",
      text: "#065F46",
    },
    warning: {
      main: "#F59E0B",
      surface: "#FEF3C7",
      border: "#FCD34D",
      text: "#92400E",
    },
    error: {
      main: "#EF4444",
      surface: "#FEE2E2",
      border: "#FCA5A5",
      text: "#991B1B",
    },
    info: {
      main: "#3B82F6",
      surface: "#DBEAFE",
      border: "#93C5FD",
      text: "#1E40AF",
    },
  },
};

export const dark = {
  action: {
    primary: "#3B82F6",
    primaryHover: "#2563EB",
    primaryPressed: "#1D4ED8",
    secondary: "#374151",
  },
  text: {
    primary: "#F9FAFB",
    secondary: "#D1D5DB",
    tertiary: "#9CA3AF",
    disabled: "#6B7280",
    inverse: "#1F2937",
    link: "#60A5FA",
  },
  surface: {
    primary: "#111827",
    secondary: "#1F2937",
    tertiary: "#374151",
    elevated: "#1F2937",
    overlay: "rgba(0, 0, 0, 0.75)",
  },
  border: {
    primary: "#374151",
    secondary: "#4B5563",
    tertiary: "#6B7280",
    focus: "#3B82F6",
    error: "#EF4444",
  },
  status: {
    success: {
      main: "#10B981",
      surface: "#064E3B",
      border: "#047857",
      text: "#D1FAE5",
    },
    warning: {
      main: "#F59E0B",
      surface: "#78350F",
      border: "#B45309",
      text: "#FEF3C7",
    },
    error: {
      main: "#EF4444",
      surface: "#7F1D1D",
      border: "#B91C1C",
      text: "#FEE2E2",
    },
    info: {
      main: "#3B82F6",
      surface: "#1E3A8A",
      border: "#1D4ED8",
      text: "#DBEAFE",
    },
  },
};
```

**Usage**: Use semantic tokens for all colors, accessing via `light` or `dark` based on theme.

### Tier 3: Component Tokens

Component-specific styling rules that compose primitive and semantic tokens.

**Location**: Colocated with component (`Component.theme.ts`)

**Structure**:

```typescript
import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const button = {
  // Size-based tokens (from primitives)
  size: {
    sm: {
      height: primitive.spacing[9], // 36px
      paddingHorizontal: primitive.spacing[3], // 12px
      fontSize: primitive.fontSize.sm, // 14px
      borderRadius: primitive.borderRadius.md, // 8px
      gap: primitive.spacing[1.5], // 6px
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
  borderWidth: {
    secondary: 1,
    default: 0,
  },

  // Variant-based color tokens (separate light/dark)
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        backgroundHover: light.action.primaryHover,
        backgroundPressed: light.action.primaryPressed,
        text: light.text.inverse,
        border: "transparent",
        icon: light.text.inverse,
      },
      secondary: {
        background: light.surface.secondary,
        backgroundHover: light.surface.tertiary,
        backgroundPressed: light.border.primary,
        text: light.text.primary,
        border: light.border.primary,
        icon: light.text.primary,
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
        backgroundHover: dark.action.primaryHover,
        backgroundPressed: dark.action.primaryPressed,
        text: dark.text.inverse,
        border: "transparent",
        icon: dark.text.inverse,
      },
      secondary: {
        background: dark.surface.secondary,
        backgroundHover: dark.surface.tertiary,
        backgroundPressed: dark.border.primary,
        text: dark.text.primary,
        border: dark.border.primary,
        icon: dark.text.primary,
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

**Key Points**:

- Export with `as const` for type safety
- Size tokens use primitives for spacing/sizes
- Variant tokens use semantic colors
- Separate light/dark color objects
- Include all states (default, hover, pressed, disabled)

## Token Composition Rules

### Rule 1: Use Primitive Tokens For

**Spacing and Sizing**:

```typescript
height: primitive.spacing[11],
paddingHorizontal: primitive.spacing[4],
paddingVertical: primitive.spacing[2],
gap: primitive.spacing[2],
margin: primitive.spacing[4],
```

**Typography**:

```typescript
fontSize: primitive.fontSize.base,
fontWeight: primitive.fontWeight.medium,
lineHeight: primitive.lineHeight.normal,
```

**Border Radius**:

```typescript
borderRadius: primitive.borderRadius.md,
borderTopLeftRadius: primitive.borderRadius.lg,
```

**Opacity**:

```typescript
opacity: primitive.opacity.disabled,
opacity: primitive.opacity.hover,
```

**Shadows**:

```typescript
...primitive.shadowPresets.md,
...primitive.shadowPresets.lg,
```

### Rule 2: Use Semantic Tokens For

**All Colors**:

```typescript
// Light theme
background: light.action.primary,
text: light.text.primary,
border: light.border.focus,
placeholder: light.text.tertiary,

// Dark theme
background: dark.action.primary,
text: dark.text.primary,
border: dark.border.focus,
placeholder: dark.text.tertiary,
```

**State Colors**:

```typescript
successBackground: light.status.success.surface,
errorText: light.status.error.text,
warningBorder: light.status.warning.border,
```

### Rule 3: Never Hardcode Values

**❌ Wrong**:

```typescript
{
  paddingHorizontal: 16,
  backgroundColor: "#4A90E2",
  borderRadius: 8,
  fontSize: 14,
  opacity: 0.5,
}
```

**✅ Correct**:

```typescript
{
  paddingHorizontal: primitive.spacing[4],
  backgroundColor: light.action.primary,
  borderRadius: primitive.borderRadius.md,
  fontSize: primitive.fontSize.sm,
  opacity: primitive.opacity.disabled,
}
```

### Rule 4: Export as const

**Always export theme objects with `as const`**:

```typescript
export const componentName = {
  size: { sm: {}, md: {}, lg: {} },
  variant: { light: {}, dark: {} },
} as const;
```

This provides:

- Type safety
- IntelliSense autocomplete
- Prevents accidental mutations
- Better error messages

## Using Themes in Components

### Accessing Theme

```typescript
import { useTheme } from "../theme";

export const Component = ({ variant = "primary", size = "md" }) => {
  const { theme, colorScheme } = useTheme();

  // Access component tokens
  const sizeTokens = theme.component.componentName.size[size];
  const variantTokens = theme.component.componentName.variant[colorScheme][variant];

  // Use in styles
  return (
    <View
      style={{
        height: sizeTokens.height,
        padding: sizeTokens.padding,
        backgroundColor: variantTokens.background,
        borderColor: variantTokens.border,
      }}
    />
  );
};
```

### Theme Hook Properties

```typescript
const { theme, colorScheme, setColorScheme, toggleColorScheme } = useTheme();

// theme.primitive - Access primitive tokens
theme.primitive.spacing[4];
theme.primitive.fontSize.base;
theme.primitive.borderRadius.md;

// theme.semantic - Access semantic tokens
theme.semantic.colors.light.text.primary;
theme.semantic.colors.dark.surface.elevated;

// theme.component - Access component tokens
theme.component.button.size.md;
theme.component.input.variant[colorScheme].outline;

// colorScheme - Current theme ("light" or "dark")
colorScheme === "light";
colorScheme === "dark";

// setColorScheme - Change theme
setColorScheme("dark");
setColorScheme("light");

// toggleColorScheme - Toggle between light/dark
toggleColorScheme();
```

## Typography Usage

**ALWAYS use Typography component instead of React Native Text**:

```typescript
import { Typography } from "../typography";

// ✅ Correct
<Typography variant="body" style={{ color: variantTokens.text }}>
  {children}
</Typography>

// ✅ Correct with custom weight
<Typography
  variant="heading"
  style={{
    color: variantTokens.text,
    fontWeight: theme.primitive.fontWeight.bold,
  }}
>
  {title}
</Typography>

// ❌ Never use Text directly
<Text style={{ fontSize: 14, color: "#000" }}>
  {children}
</Text>
```

**Typography Variants**:

- `large-title` - Largest heading
- `title-1`, `title-2`, `title-3` - Heading hierarchy
- `heading` - Section heading
- `body` - Default body text
- `callout` - Callout text
- `subheadline` - Subheading
- `footnote` - Small footer text
- `caption-1`, `caption-2` - Captions

Typography handles font sizes, line heights, and font families automatically.

## Style Merge Order

Follow this pattern for all style merging:

```typescript
style={[
  baseStyles.static,          // 1. Static StyleSheet (layout, structure)
  {
    // 2. Theme-derived dynamic styles (colors, sizes from tokens)
    backgroundColor: variantTokens.background,
    color: variantTokens.text,
    padding: sizeTokens.padding,
    borderRadius: sizeTokens.borderRadius,
  },
  style,                      // 3. User overrides (highest priority)
]}
```

**Why this order?**:

1. **Base styles** provide structural layout (flexDirection, alignItems, etc.)
2. **Theme styles** apply colors and sizes that change with theme/props
3. **User styles** allow customization, override everything

## State-Based Styling

Handle interactive states (pressed, hover, disabled) using theme tokens:

```typescript
const Component = ({ variant = "primary", disabled = false }) => {
  const { theme, colorScheme } = useTheme();
  const [pressed, setPressed] = useState(false);

  // Select variant tokens based on disabled state
  const variantTokens = disabled
    ? theme.component.componentName.variant[colorScheme].disabled
    : theme.component.componentName.variant[colorScheme][variant];

  // Calculate background based on pressed state
  const backgroundColor = disabled
    ? variantTokens.background
    : pressed && "backgroundPressed" in variantTokens
      ? variantTokens.backgroundPressed
      : variantTokens.background;

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      style={[
        baseStyles.pressable,
        {
          backgroundColor,
          borderColor: variantTokens.border,
          opacity: disabled ? variantTokens.opacity : 1,
        },
      ]}
    />
  );
};
```

**Common States**:

- **Default**: Normal, idle state
- **Hover**: Mouse over (web, not mobile)
- **Pressed**: Touch/click active
- **Disabled**: Not interactive
- **Focus**: Keyboard navigation focus

## Complete Theme File Example

Here's a complete Button theme file showing all patterns:

```typescript
import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const button = {
  // Size variants
  size: {
    sm: {
      height: primitive.spacing[9],
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
    icon: {
      height: primitive.spacing[11],
      width: primitive.spacing[11],
      borderRadius: primitive.borderRadius.full,
      iconSize: 20,
    },
  },

  // Shared tokens
  borderWidth: {
    secondary: 1,
    tonal: 0,
    plain: 0,
    primary: 0,
  },

  // Color variants (light theme)
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        backgroundHover: light.action.primaryHover,
        backgroundPressed: light.action.primaryPressed,
        text: light.text.inverse,
        border: "transparent",
        icon: light.text.inverse,
      },
      secondary: {
        background: "transparent",
        backgroundHover: light.surface.secondary,
        backgroundPressed: light.surface.tertiary,
        text: light.text.primary,
        border: light.border.primary,
        icon: light.text.primary,
      },
      tonal: {
        background: light.surface.secondary,
        backgroundHover: light.surface.tertiary,
        backgroundPressed: light.border.primary,
        text: light.text.primary,
        border: "transparent",
        icon: light.text.primary,
      },
      plain: {
        background: "transparent",
        backgroundHover: light.surface.secondary,
        backgroundPressed: light.surface.tertiary,
        text: light.text.primary,
        border: "transparent",
        icon: light.text.primary,
      },
      disabled: {
        background: light.surface.tertiary,
        text: light.text.disabled,
        border: light.border.secondary,
        icon: light.text.disabled,
        opacity: primitive.opacity.disabled,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        backgroundHover: dark.action.primaryHover,
        backgroundPressed: dark.action.primaryPressed,
        text: dark.text.inverse,
        border: "transparent",
        icon: dark.text.inverse,
      },
      secondary: {
        background: "transparent",
        backgroundHover: dark.surface.secondary,
        backgroundPressed: dark.surface.tertiary,
        text: dark.text.primary,
        border: dark.border.primary,
        icon: dark.text.primary,
      },
      tonal: {
        background: dark.surface.secondary,
        backgroundHover: dark.surface.tertiary,
        backgroundPressed: dark.border.primary,
        text: dark.text.primary,
        border: "transparent",
        icon: dark.text.primary,
      },
      plain: {
        background: "transparent",
        backgroundHover: dark.surface.secondary,
        backgroundPressed: dark.surface.tertiary,
        text: dark.text.primary,
        border: "transparent",
        icon: dark.text.primary,
      },
      disabled: {
        background: dark.surface.tertiary,
        text: dark.text.disabled,
        border: dark.border.secondary,
        icon: dark.text.disabled,
        opacity: primitive.opacity.disabled,
      },
    },
  },
} as const;
```

## Best Practices

1. **Design tokens before implementation** - Create theme file first
2. **Use descriptive token names** - `backgroundPressed` not `bgP`
3. **Group related tokens** - Size, variant, shared sections
4. **Separate light/dark explicitly** - Clear theme objects
5. **Export with as const** - Enable type safety
6. **Reference existing components** - Follow established patterns
7. **Test theme switching** - Verify light/dark modes work
8. **Document token decisions** - Why certain values were chosen

## Common Patterns

### Input Component Theme

```typescript
export const input = {
  size: {
    sm: { height: 36, fontSize: primitive.fontSize.sm },
    md: { height: 44, fontSize: primitive.fontSize.base },
    lg: { height: 52, fontSize: primitive.fontSize.lg },
  },
  variant: {
    light: {
      default: {
        background: light.surface.primary,
        text: light.text.primary,
        placeholder: light.text.tertiary,
        border: light.border.primary,
      },
      focus: {
        border: light.border.focus,
      },
      error: {
        border: light.border.error,
        text: light.status.error.main,
      },
    },
    dark: {
      /* same structure */
    },
  },
} as const;
```

### Card Component Theme

```typescript
export const card = {
  variant: {
    light: {
      default: {
        background: light.surface.primary,
        border: light.border.primary,
      },
      elevated: {
        background: light.surface.elevated,
        border: "transparent",
        shadow: primitive.shadowPresets.md,
      },
    },
    dark: {
      /* same structure */
    },
  },
} as const;
```

## Summary

The three-tier theme system ensures:

- **Consistency**: All components use the same design tokens
- **Maintainability**: Change tokens in one place, update everywhere
- **Theming**: Light/dark modes automatic with semantic tokens
- **Type Safety**: `as const` provides full IntelliSense
- **Accessibility**: Semantic colors ensure proper contrast
- **Customization**: Users override via theme or style props

Always remember: Primitive → Semantic → Component, and never hardcode values.
