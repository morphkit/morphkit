# morph-ui Standards

This document defines project-specific standards for the morph-ui design system monorepo. These standards are derived from CLAUDE.md, openspec documentation, and established patterns in the codebase.

## Three-Tier Theme System

The cornerstone of morph-ui's styling architecture.

### Tier 1: Primitive Tokens

**Location**: `packages/react-native/src/theme/tokens/primitive/`

Raw design values without semantic meaning. These are the building blocks.

**Token Files**:

- `colors.ts` - Color palette (neutral, primary, success, warning, error)
- `spacing.ts` - Spacing scale (0-12)
- `typography.ts` - Font sizes, weights, line heights, letter spacing
- `radii.ts` - Border radius values
- `shadows.ts` - Shadow definitions
- `animation.ts` - Timing and easing functions

**Usage Rules**:

- Never use primitive tokens directly in components
- Always compose through semantic or component tokens
- Primitive tokens are the single source of truth for raw values

**Example**:

```ts
export const primitiveColors = {
  neutral: {
    0: "#FFFFFF",
    50: "#FAFAFA",
    100: "#F5F5F5",
    // ...
    900: "#171717",
  },
  primary: {
    50: "#EEF2FF",
    // ...
    900: "#312E81",
  },
};
```

### Tier 2: Semantic Tokens

**Location**: `packages/react-native/src/theme/tokens/semantic/`

Context-aware tokens that provide meaning. Mapped to light/dark themes.

**Token Files**:

- `colors.ts` - Semantic color assignments (text, surface, border, action, feedback)
- `typography.ts` - Text style definitions (variants like body, heading, caption)
- `state.ts` - Interactive state colors (hover, active, disabled)

**Usage Rules**:

- Use semantic tokens when component tokens don't exist
- Semantic tokens map primitive tokens to context
- Always provide both light and dark mode mappings

**Example**:

```ts
export const semanticColors = {
  light: {
    text: {
      primary: primitiveColors.neutral[900],
      secondary: primitiveColors.neutral[600],
      tertiary: primitiveColors.neutral[500],
      inverse: primitiveColors.neutral[0],
    },
    surface: {
      background: primitiveColors.neutral[0],
      elevated: primitiveColors.neutral[50],
      overlay: primitiveColors.neutral[900],
    },
    action: {
      primary: primitiveColors.primary[600],
      secondary: primitiveColors.neutral[700],
    },
  },
  dark: {
    // Mirror structure with dark mode values
  },
};
```

### Tier 3: Component Tokens

**Location**: Colocated with components (`packages/react-native/src/{component}/{Component}.theme.ts`)

Component-specific styling rules that compose primitive and semantic tokens.

**Structure**:

```ts
import { primitiveSpacing, primitiveColors } from "../theme/tokens/primitive";
import { semanticColors } from "../theme/tokens/semantic";

export const buttonTheme = {
  variant: {
    light: {
      primary: {
        background: semanticColors.light.action.primary,
        text: primitiveColors.neutral[0],
        border: semanticColors.light.action.primary,
      },
      secondary: {
        background: "transparent",
        text: semanticColors.light.text.primary,
        border: semanticColors.light.border.default,
      },
      ghost: {
        background: "transparent",
        text: semanticColors.light.action.primary,
        border: "transparent",
      },
    },
    dark: {
      // Mirror structure
    },
  },
  size: {
    sm: {
      paddingHorizontal: primitiveSpacing[3],
      paddingVertical: primitiveSpacing[1.5],
      fontSize: primitiveTypography.fontSize.sm,
    },
    md: {
      paddingHorizontal: primitiveSpacing[4],
      paddingVertical: primitiveSpacing[2],
      fontSize: primitiveTypography.fontSize.base,
    },
    lg: {
      paddingHorizontal: primitiveSpacing[6],
      paddingVertical: primitiveSpacing[3],
      fontSize: primitiveTypography.fontSize.lg,
    },
  },
  borderRadius: primitiveRadii.md,
};
```

**Usage Rules**:

- Every component must have a `.theme.ts` file
- Component tokens are exported via `src/theme/tokens/components.ts`
- Components access tokens through `useTheme()` hook

### Theme Usage in Components

**Standard Pattern**:

```tsx
import { useTheme } from "../theme";

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  style,
  ...props
}) => {
  const { theme, colorScheme } = useTheme();

  const variantColors = theme.component.button.variant[colorScheme][variant];
  const sizeTokens = theme.component.button.size[size];

  return (
    <Pressable
      style={[
        baseStyles.button,
        {
          backgroundColor: variantColors.background,
          borderColor: variantColors.border,
          paddingHorizontal: sizeTokens.paddingHorizontal,
          paddingVertical: sizeTokens.paddingVertical,
          borderRadius: theme.component.button.borderRadius,
        },
        style,
      ]}
      {...props}
    />
  );
};
```

**Critical Rules**:

- ❌ Never hardcode values: `padding: 16`, `backgroundColor: "#4A90E2"`
- ✅ Always use tokens: `padding: theme.primitive.spacing[4]`
- ✅ Follow merge order: `[baseStyles, dynamicThemeStyles, customStyle]`

---

## Typography Component

**Location**: `packages/react-native/src/typography/Typography.tsx`

The Typography component replaces React Native's `Text` component throughout the library.

### Typography Variants

All variants are defined in semantic tokens and map to proper font sizes, weights, line heights, and letter spacing.

**Available Variants**:

- `large-title` - Largest heading (34px)
- `title-1` - Primary page title (28px)
- `title-2` - Section title (22px)
- `title-3` - Subsection title (20px)
- `heading` - Component heading (17px, semibold)
- `body` - Default body text (17px)
- `callout` - Emphasized body (16px)
- `subhead` - Secondary text (15px)
- `footnote` - Small text (13px)
- `caption-1` - Captions (12px)
- `caption-2` - Smallest text (11px)

### Usage Rules

**Always**:

```tsx
<Typography variant="body" style={{ color: variantTokens.text }}>
  {children}
</Typography>
```

**Never**:

```tsx
<Text style={{ fontSize: 14, color: "#000" }}>{children}</Text>
```

**Styling Typography**:

- Use `style` prop for color only (from theme tokens)
- Never override fontSize, fontWeight, lineHeight directly
- Use correct variant for semantic meaning
- Typography handles theme-aware text rendering

---

## Component Structure

Every component follows this exact structure:

```
component-name/
├── ComponentName.tsx          # Main component (PascalCase)
├── ComponentName.theme.ts     # Theme tokens (required)
├── ComponentName.test.tsx     # Tests (required)
├── README.mdx                 # Documentation (required)
├── meta.json                  # Metadata (dependencies)
└── index.ts                   # Named export only
```

### File Requirements

**ComponentName.tsx**:

- PascalCase naming
- Named export (not default)
- TypeScript with full prop interfaces
- Theme-aware using `useTheme()`
- No hardcoded styling values
- No comments (self-documenting code)
- No `any` types

**ComponentName.theme.ts**:

- Export component tokens as `{component}Theme`
- Compose primitive and semantic tokens
- Include variant and size definitions
- Provide light and dark mode mappings

**ComponentName.test.tsx**:

- Test main functionality
- Test all variants and sizes
- Test theme compliance
- All tests must pass (zero tolerance for failures)

**README.mdx**:

- Usage examples
- Props documentation
- Variant demonstrations
- Integration examples

**meta.json**:

```json
{
  "name": "Component Name",
  "description": "Brief description",
  "category": "input|layout|display|interactive|feedback|navigation|surfaces",
  "dependencies": ["Typography", "Box"]
}
```

**index.ts**:

```ts
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
```

---

## Flow Architecture

**Location**: `packages/react-native-flows/`

Flows are multi-screen user journeys using Expo Router.

### Flow Structure

```
flows/
└── src/
    └── {type}/
        └── ({variant})/
            ├── _layout.tsx        # Expo Router layout
            ├── index.ts           # Entry point
            ├── screen1.tsx        # Flow screens
            ├── screen2.tsx
            └── meta.json          # Flow metadata
```

### Flow Types

Current types:

- `auth` - Authentication flows
- (Future: `onboarding`, `checkout`, etc.)

### Flow Variants

Variants use Expo Router group syntax with parentheses:

- `(default)` - Standard implementation
- `(with-sso)` - SSO integration
- `(minimal)` - Simplified version

### Flow Metadata (meta.json)

```json
{
  "type": "auth",
  "name": "default",
  "variant": "default",
  "description": "Standard authentication flow with email and password",
  "entryPoint": "welcome",
  "screenCount": 4,
  "components": ["Input", "Button", "Typography", "Container"],
  "estimatedTime": "2-3 minutes"
}
```

### Flow Standards

- Each screen is a separate file
- Use Expo Router for navigation
- Leverage existing components from `@morph-ui/react-native`
- Follow theme system for consistency
- No custom components in flows (extract to library instead)
- Type-safe navigation with `useRouter()` and `useLocalSearchParams()`

---

## Package Naming Conventions

### Current State (To Be Standardized)

**Active scopes**:

- `@morph-ui/` - Published packages (react-native, cli)
- `@morph-ui/` - Internal packages (configs, flows)

**Decision Pending**: Standardize on `@morph-ui/` or keep `@morph-ui/`

### Package Naming Rules

- Use kebab-case: `react-native-flows` ✅
- Be descriptive: `react-native` not `rn` ✅
- Scope public packages consistently
- Mark internal packages as `private: true`
- Include platform prefix for platform-specific packages

**Good Examples**:

- `@morph-ui/react-native`
- `@morph-ui/react-native-flows`
- `@morph-ui/cli`
- `@morph-ui/eslint-config` (internal)

---

## Development Workflow Rules

### Non-Negotiable Rules

These rules are strictly enforced:

#### 1. Static Analysis

All checks must pass before marking work complete:

- ✅ `bun run lint` - Zero warnings/errors
- ✅ `bun run check-types` - Zero TypeScript errors
- ✅ `bun run format` - Prettier formatted
- ✅ `bun run test` - All tests passing

#### 2. Zero Tolerance for Comments

**Absolutely no code comments allowed.** Code must be self-documenting through:

- Clear variable and function names
- Small, focused functions
- Proper type annotations
- Extracted utility functions

```tsx
// ❌ Never
// Calculate the total price
const total = price * quantity;

// ✅ Always
const calculateTotalPrice = (price: number, quantity: number): number => {
  return price * quantity;
};
```

#### 3. Zero Tolerance for `any` Type

**The `any` type is banned.** Use:

- Specific types, interfaces, or type aliases
- `unknown` when type is truly unknown
- Generic type parameters
- Type guards to narrow `unknown`
- Utility types (`Partial`, `Pick`, `Omit`)

```tsx
// ❌ Never
const processData = (data: any) => { ... }

// ✅ Always
interface UserData {
  id: string;
  name: string;
}
const processUserData = (data: UserData): ProcessedData => { ... }
```

#### 4. Conventional Commits

All commits follow [Conventional Commits](https://www.conventionalcommits.org/):

**Format**: `<type>[optional scope]: <description>`

**Types**:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code refactoring
- `perf` - Performance
- `test` - Tests
- `chore` - Tooling/dependencies

**Examples**:

```
feat(components): add button component with accessibility support
fix(routing): resolve navigation state persistence issue
docs(readme): update installation instructions
refactor(utils): extract validation logic into separate module
```

#### 5. Git Commit Policy

**Never commit without explicit user approval.**

Only commit when user says:

- "commit the changes"
- "create a commit"
- Or similar direct instruction

Never commit just because:

- Task is complete
- Checks are passing
- Code is written

---

## Component Categories

Components are organized into seven categories:

### Layout (4 components)

Box, Container, Stack, Divider

### Input (9 components)

Input, Textarea, Checkbox, Radio, Select, Switch, Slider, OtpInput, Label

### Display (7 components)

Typography, Badge, Tag, Avatar, Progress, Skeleton, Spinner

### Interactive (3 components)

Button, Accordion, Tabs

### Feedback (2 components)

Alert, Toast

### Navigation (1 component)

Fab

### Surfaces (1 component)

Card

---

## Export Strategy

### Package Exports

Wildcard pattern for tree-shaking:

```json
{
  "exports": {
    "./src/*": "./src/*"
  }
}
```

This allows:

```ts
import { Button } from "@morph-ui/react-native/src/button";
```

### Component Exports

Named exports only:

```tsx
// ✅ Correct
export const Button: React.FC<ButtonProps> = ({...}) => {...}

// ❌ Wrong
export default Button;
```

### Index Files

Clean barrel exports:

```ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
```

---

## Testing Standards

### Test Requirements

- Every component has `.test.tsx`
- Tests cover main functionality
- All variants and sizes tested
- Edge cases covered
- Zero tolerance for failures

### Test Structure

```tsx
import { customRender } from "../test-utils";
import { Button } from "./Button";

describe("Button", () => {
  it("renders correctly", () => {
    const { getByText } = customRender(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = customRender(
      <Button onPress={onPress}>Click me</Button>,
    );
    fireEvent.press(getByText("Click me"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders all variants", () => {
    const variants = ["primary", "secondary", "ghost"];
    variants.forEach((variant) => {
      const { getByText } = customRender(
        <Button variant={variant}>Test</Button>,
      );
      expect(getByText("Test")).toBeTruthy();
    });
  });
});
```

---

## Documentation Standards

### Component Documentation (README.mdx)

Every component needs comprehensive MDX documentation:

**Structure**:

1. Component overview
2. Import statement
3. Basic usage example
4. Props table
5. Variant examples
6. Size examples
7. Advanced usage
8. Accessibility notes

**Example**:

```mdx
# Button

A themeable button component following the three-tier theme system.

## Import

\`\`\`tsx
import { Button } from "@morph-ui/react-native/src/button";
\`\`\`

## Usage

\`\`\`tsx

<Button onPress={handlePress}>Click me</Button>
\`\`\`

## Props

| Prop    | Type                                | Default   | Description    |
| ------- | ----------------------------------- | --------- | -------------- |
| variant | "primary" \| "secondary" \| "ghost" | "primary" | Visual variant |
| size    | "sm" \| "md" \| "lg"                | "md"      | Size variant   |
| ...     | ...                                 | ...       | ...            |

## Variants

[Examples of each variant]

## Sizes

[Examples of each size]
```

---

## Monorepo Configuration

### Turborepo Tasks

Defined in `turbo.json`:

- `build` - Has dependency graph, includes `.env*` files
- `lint` - Has dependency graph, zero warnings allowed
- `check-types` - Uses `tsc --noEmit`
- `test` - Has dependency graph, all must pass
- `dev` - No caching, persistent

### ESLint Configuration

- ESLint v9 with flat config
- Shared configs in `@morph-ui/eslint-config`
- Zero warnings enforced: `--max-warnings 0`
- React Native config includes `__DEV__` global

### TypeScript Configuration

- Strict mode enabled
- Shared configs in `@morph-ui/typescript-config`
- React Native config uses `jsx: "react-native"`
- No `any` type allowed

---

## Summary

morph-ui follows strict standards for:

1. **Theme System**: Three-tier architecture (primitive → semantic → component)
2. **Typography**: Always use Typography component, never raw Text
3. **Component Structure**: Colocated theme, tests, docs, metadata
4. **Flow Architecture**: Expo Router with type-safe navigation
5. **Package Naming**: Consistent scopes and kebab-case
6. **Development Workflow**: Strict static analysis, no comments, no any, conventional commits
7. **Testing**: Zero tolerance for failures, comprehensive coverage
8. **Documentation**: MDX for components, JSDoc for props

These standards ensure consistency, maintainability, and quality across the entire design system.
