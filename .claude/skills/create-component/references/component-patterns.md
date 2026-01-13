# Component Implementation Patterns

Detailed patterns for implementing React Native components in the morph-ui library.

## TypeScript Patterns

### Props Interface Pattern

```typescript
import { ViewProps, PressableProps, TextInputProps } from "react-native";

// Define variant types
type ComponentVariant = "primary" | "secondary" | "tonal" | "plain";
type ComponentSize = "sm" | "md" | "lg";

// Extend native component props, remove conflicting props
export interface ComponentProps extends Omit<ViewProps, "style"> {
  // Custom props
  variant?: ComponentVariant;
  size?: ComponentSize;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;

  // Content props
  children?: ReactNode;
  label?: string;

  // Event handlers (custom signature)
  onPress?: () => void;
  onChange?: (value: string) => void;

  // Style override (custom type)
  style?: StyleProp<ViewStyle>;
}
```

**Key Points**:

- Omit conflicting props from native types (`style`, `onChange`, etc.)
- Define union types for variants/sizes
- Make props optional with default values
- Custom event handler signatures when needed
- Export both component and props interface

### Component Export Pattern

```typescript
// At bottom of Component.tsx
export { Component, type ComponentProps };

// In index.ts
export { Component, type ComponentProps } from "./Component";
```

### forwardRef Pattern

For components that need ref access to native element:

```typescript
import { forwardRef } from "react";
import { TextInput } from "react-native";

export interface InputProps extends Omit<TextInputProps, "style" | "onChange"> {
  value: string;
  onChange: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const { value, onChange, style, ...rest } = props;

  return (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={onChange}
      style={style}
      {...rest}
    />
  );
});

Input.displayName = "Input";
```

**When to use forwardRef**:

- TextInput components (keyboard control)
- Scrollable components (scroll methods)
- Components wrapping native views that need refs

## Example Files Pattern

All interactive JSX examples go in separate `.tsx` files in `examples/` directory.

### Basic Example

```typescript
// examples/BasicExample.tsx
import { View } from "react-native";
import { Component } from "../Component";

export const BasicExample = () => {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
      <Component variant="tonal">Tonal</Component>
    </View>
  );
};
```

### Variants Example

```typescript
// examples/VariantsExample.tsx
import { View } from "react-native";
import { Component } from "../Component";

export const VariantsExample = () => {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Component variant="primary">Primary Variant</Component>
      <Component variant="secondary">Secondary Variant</Component>
      <Component variant="tonal">Tonal Variant</Component>
      <Component variant="plain">Plain Variant</Component>
    </View>
  );
};
```

### Sizes Example

```typescript
// examples/SizesExample.tsx
import { View } from "react-native";
import { Component } from "../Component";

export const SizesExample = () => {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Component size="sm">Small</Component>
      <Component size="md">Medium</Component>
      <Component size="lg">Large</Component>
    </View>
  );
};
```

### Interactive Example

```typescript
// examples/InteractiveExample.tsx
import { View } from "react-native";
import { useState } from "react";
import { Component } from "../Component";

export const InteractiveExample = () => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Component
        value={value}
        onChange={setValue}
        placeholder="Enter text..."
      />
      <Component
        checked={checked}
        onChange={setChecked}
        label="Toggle option"
      />
    </View>
  );
};
```

### Example Index

```typescript
// examples/index.ts
export * from "./BasicExample";
export * from "./VariantsExample";
export * from "./SizesExample";
export * from "./InteractiveExample";
```

### Example Naming Conventions

- `BasicExample` - Basic usage, simplest case
- `VariantsExample` - All variant options
- `SizesExample` - All size options
- `InteractiveExample` - Stateful, interactive usage
- `[FeatureName]Example` - Specific feature (e.g., `IconsExample`, `LoadingExample`)

## README.mdx Structure

### Apple HIG Writing Style Guidelines

When writing component documentation:

- **Brief, purpose-focused opening**: 1-2 sentences maximum
- **Direct, imperative language**: "Use when...", "Avoid...", not "You can use..."
- **Present tense, active voice**: "Buttons initiate actions" not "A button can be used to initiate actions"
- **User-centered framing**: Focus on user experience and outcomes
- **Short sentences**: Avoid jargon without explanation
- **Conversational but professional**: Clear and accessible tone

### Enhanced README.mdx Template

```mdx
import { Component } from "./Component";
import { View } from "react-native";
import {
  BasicExample,
  VariantsExample,
  SizesExample,
  InteractiveExample,
  RealWorldExample,
  CompositionExample,
} from "./examples";

# Component Name

Buttons initiate actions. They support multiple variants, sizes, and can include icons or loading states.

## Overview

Brief description of what this component is and its primary use case. Mention key characteristics:

- Minimum touch target: 44pt × 44pt (Apple HIG requirement)
- WCAG compliance: Level AA
- Theme-aware: Supports light and dark modes
- Typography integration: Uses Typography component for text

**When to use this component:**

- When users need to trigger an action
- For form submissions and confirmations
- In navigation flows requiring explicit actions

## When NOT to Use

- **Don't use** for navigation between screens - use navigation components instead
- **Don't use** for toggling states - use Switch or Checkbox instead
- **Don't use** for selecting from options - use Radio or Select instead
- **Alternative**: For subtle actions, consider using a link or icon button

## Variants

Each variant serves a specific purpose in the interface hierarchy.

### Primary Variant

<View style={{ marginVertical: 12 }}>
  <VariantsExample />
</View>

**Use for**: Primary actions (form submit, confirm dialog)
**Real-world example**: "Sign In" button on login form, "Save" in settings

## Examples

### Basic Usage

<View style={{ marginVertical: 12 }}>
  <BasicExample />
</View>

\`\`\`tsx
import { Component } from "@morph-ui/react-native";

<Component onPress={() => console.log("Pressed")}>Click Me</Component>
\`\`\`

### Real-World Use Cases

#### Login Form Actions

<View style={{ marginVertical: 12 }}>
  <RealWorldExample variant="loginForm" />
</View>

\`\`\`tsx
import { Component, Input, Stack } from "@morph-ui/react-native";

<View>
  <Input placeholder="Email" />
  <Input placeholder="Password" secureTextEntry />
  <Component variant="primary" onPress={handleLogin}>
    Sign In
  </Component>
  <Component variant="ghost" onPress={handleForgotPassword}>
    Forgot Password?
  </Component>
</View>
\`\`\`

#### Confirmation Dialog

\`\`\`tsx

<View>
  <Typography variant="body">
    Are you sure you want to delete this item?
  </Typography>
  <Stack direction="row" spacing={2}>
    <Component variant="outline" onPress={handleCancel}>
      Cancel
    </Component>
    <Component variant="primary" colorScheme="error" onPress={handleDelete}>
      Delete
    </Component>
  </Stack>
</View>
\`\`\`

### Composition

How this component works with other components:

<View style={{ marginVertical: 12 }}>
  <CompositionExample />
</View>

\`\`\`tsx

<Card>
  <Typography variant="heading">Upgrade Plan</Typography>
  <Typography variant="body">Get access to premium features</Typography>
  <Component variant="primary" onPress={handleUpgrade}>
    Upgrade Now
  </Component>
</Card>
\`\`\`

## API Reference

### Behavior Props

| Prop     | Type         | Default | Required | Description                   |
| -------- | ------------ | ------- | -------- | ----------------------------- |
| onPress  | `() => void` | -       | ✓        | Called when button is pressed |
| disabled | `boolean`    | `false` | -        | Disables all interactions     |
| loading  | `boolean`    | `false` | -        | Shows loading spinner         |

### Styling Props

| Prop        | Type                                                     | Default     | Required | Description          |
| ----------- | -------------------------------------------------------- | ----------- | -------- | -------------------- |
| variant     | `"primary"` \| `"secondary"` \| `"outline"` \| `"ghost"` | `"primary"` | -        | Visual style variant |
| size        | `"sm"` \| `"md"` \| `"lg"`                               | `"md"`      | -        | Component size       |
| colorScheme | `"default"` \| `"error"` \| `"success"`                  | `"default"` | -        | Color theme          |

### Content Props

| Prop         | Type                  | Default  | Required | Description       |
| ------------ | --------------------- | -------- | -------- | ----------------- |
| children     | `ReactNode`           | -        | -        | Button label text |
| icon         | `ReactNode`           | -        | -        | Icon element      |
| iconPosition | `"left"` \| `"right"` | `"left"` | -        | Icon placement    |

### Accessibility Props

| Prop               | Type                   | Default | Required | Description            |
| ------------------ | ---------------------- | ------- | -------- | ---------------------- |
| accessibilityLabel | `string`               | -       | -        | Screen reader label    |
| accessibilityHint  | `string`               | -       | -        | Screen reader hint     |
| style              | `StyleProp<ViewStyle>` | -       | -        | Custom style overrides |

### Theme Tokens

This component uses the following design tokens from the three-tier theme system:

#### Color Tokens

| Token Path                                                  | Purpose                  | Light Mode | Dark Mode |
| ----------------------------------------------------------- | ------------------------ | ---------- | --------- |
| `theme.component.button.variant[variant].background`        | Background color         | `#007AFF`  | `#0A84FF` |
| `theme.component.button.variant[variant].text`              | Text color               | `#FFFFFF`  | `#FFFFFF` |
| `theme.component.button.variant[variant].border`            | Border color             | `#007AFF`  | `#0A84FF` |
| `theme.component.button.variant[variant].backgroundPressed` | Pressed state background | `#0051D5`  | `#0768D0` |

#### Spacing Tokens

| Token Path                                            | Purpose              | Value | Primitive Source             |
| ----------------------------------------------------- | -------------------- | ----- | ---------------------------- |
| `theme.component.button.size[size].paddingHorizontal` | Horizontal padding   | `16`  | `theme.primitive.spacing[4]` |
| `theme.component.button.size[size].paddingVertical`   | Vertical padding     | `12`  | `theme.primitive.spacing[3]` |
| `theme.component.button.size[size].gap`               | Icon-text gap        | `8`   | `theme.primitive.spacing[2]` |
| `theme.component.button.size[size].minHeight`         | Minimum touch target | `44`  | Apple HIG requirement        |

#### Typography Tokens

| Token Path                                    | Purpose           | Value                                               | Semantic Source                  |
| --------------------------------------------- | ----------------- | --------------------------------------------------- | -------------------------------- |
| `theme.component.button.size[size].textStyle` | Button text style | `{fontSize: 16, lineHeight: 24, fontWeight: '600'}` | `theme.semantic.textStyles.body` |

#### Border & Shape Tokens

| Token Path                            | Purpose          | Value | Primitive Source                      |
| ------------------------------------- | ---------------- | ----- | ------------------------------------- |
| `theme.component.button.borderRadius` | Corner radius    | `8`   | `theme.primitive.borderRadius.md`     |
| `theme.component.button.borderWidth`  | Border thickness | `1`   | `theme.primitive.borderWidth.default` |

#### Shadow Tokens (if applicable)

| Token Path                      | Purpose          | Value                                                                        | Primitive Source             |
| ------------------------------- | ---------------- | ---------------------------------------------------------------------------- | ---------------------------- |
| `theme.component.button.shadow` | Button elevation | `{shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4}` | `theme.primitive.shadows.sm` |

#### Animation Tokens

| Token Path                          | Purpose                  | Value | Primitive Source                          |
| ----------------------------------- | ------------------------ | ----- | ----------------------------------------- |
| `theme.component.button.transition` | Press animation duration | `150` | `theme.primitive.animation.duration.fast` |

#### Customization Example

\`\`\`tsx
import { createTheme } from "@morph-ui/react-native";

const customTheme = createTheme({
component: {
button: {
borderRadius: 16, // Rounder corners
variant: {
primary: {
background: "#FF3B30", // Custom red primary
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

- **Tab**: Move focus to button
- **Shift + Tab**: Move focus to previous element
- **Enter**: Activate button
- **Space**: Activate button

### Screen Reader Support

- Button role announced automatically
- Label read from `children` or `accessibilityLabel`
- Disabled state announced via `aria-disabled`
- Loading state announced via `aria-busy`

### Visual Requirements

- **Contrast Ratio**: 4.5:1 minimum (WCAG AA)
- **Focus Indicator**: 2px solid outline with 2px offset
- **Touch Target**: 44pt × 44pt minimum (Apple HIG)

### Implementation

\`\`\`tsx

<Component
  accessibilityLabel="Submit form"
  accessibilityHint="Submits the registration form"
  accessibilityRole="button"
  accessibilityState={{ disabled: isDisabled }}
>
  Submit
</Component>
\`\`\`

### Testing with Screen Readers

- **iOS**: VoiceOver
- **Android**: TalkBack
- Verify all states are announced correctly (enabled, disabled, loading)

## Related Components

- [IconButton](../icon-button/README.mdx) - Button with icon only
- [Link](../link/README.mdx) - Text-based navigation
- [FAB](../fab/README.mdx) - Floating action button

## Troubleshooting

### Button not responding to press

- Verify `onPress` prop is provided
- Check if `disabled={true}` is set
- Ensure button is not covered by another view

### Styles not applying

- Check style merge order: base styles → theme styles → custom `style` prop
- Verify theme tokens are properly defined
- Confirm ThemeProvider wraps your app
```

**Important README Rules**:

- **Apple HIG tone**: Brief descriptions (1-2 sentences), direct language, user-focused
- **Extract ALL interactive JSX** to example files
- **Import examples** at top of README.mdx
- **Wrap examples** in `<View style={{ marginVertical: 12 }}>`
- **Code blocks** (in backticks) stay in README (don't extract)
- **Grouped prop tables**: Behavior, Styling, Content, Accessibility
- **Comprehensive theme tokens**: All token categories with light/dark values
- **Enhanced accessibility**: WCAG level, keyboard nav, screen reader, visual requirements, testing
- **Real-world examples**: Login forms, dialogs, not just prop demonstrations
- **When NOT to Use**: Anti-patterns and alternatives
- **Troubleshooting**: Common issues and solutions

## Testing Patterns

```typescript
import { render, fireEvent } from "@testing-library/react-native";
import { Component } from "./Component";

describe("<Component />", () => {
  // Basic rendering test
  test("renders correctly", () => {
    const { getByText } = render(<Component>Content</Component>);
    expect(getByText("Content")).toBeTruthy();
  });

  // Variant test
  test("applies primary variant styles", () => {
    const { getByText } = render(<Component variant="primary">Text</Component>);
    const element = getByText("Text");
    const styles = element.props.style;

    // Check specific style properties
    expect(styles).toMatchObject({
      // Expected styles from theme
    });
  });

  // Size test
  test("applies correct size styles", () => {
    const { getByText } = render(<Component size="lg">Large</Component>);
    const element = getByText("Large");
    expect(element.props.style).toMatchObject({
      // Expected size-specific styles
    });
  });

  // Custom style merging test
  test("merges custom styles correctly", () => {
    const customStyle = { marginTop: 20 };
    const { getByText } = render(
      <Component style={customStyle}>Text</Component>
    );
    const element = getByText("Text");
    expect(element.props.style).toMatchObject(customStyle);
  });

  // Event handler test
  test("calls onPress handler when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Component onPress={onPress}>Press Me</Component>
    );

    fireEvent.press(getByText("Press Me"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  // Disabled state test
  test("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Component onPress={onPress} disabled>
        Disabled
      </Component>
    );

    fireEvent.press(getByText("Disabled"));
    expect(onPress).not.toHaveBeenCalled();
  });

  // Prop forwarding test
  test("forwards accessibilityLabel prop", () => {
    const { getByLabelText } = render(
      <Component accessibilityLabel="Test Label">Content</Component>
    );
    expect(getByLabelText("Test Label")).toBeTruthy();
  });

  // Ref test (if using forwardRef)
  test("forwards ref to underlying component", () => {
    const ref = createRef<TextInput>();
    render(<Component ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  // Theme token application test
  test("uses theme tokens for styling", () => {
    const { getByText } = render(<Component>Text</Component>);
    const element = getByText("Text");

    // Verify no hardcoded values
    const styles = element.props.style;
    expect(styles.backgroundColor).not.toBe("#000000"); // No hex values
    expect(styles.padding).not.toBe(16); // No magic numbers
  });

  // Snapshot test (optional)
  test("matches snapshot", () => {
    const tree = render(<Component>Snapshot</Component>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

**Testing Best Practices**:

- Test all variants and sizes
- Test event handlers
- Test disabled states
- Test style merging
- Test prop forwarding
- Test accessibility props
- Verify theme token usage (no hardcoded values)
- Use descriptive test names

## Component Naming Conventions

### File Naming

- **Directory**: kebab-case (`button`, `text-input`, `date-picker`)
- **Component file**: PascalCase (`Button.tsx`, `TextInput.tsx`, `DatePicker.tsx`)
- **Theme file**: PascalCase + `.theme.ts` (`Button.theme.ts`)
- **Test file**: PascalCase + `.test.tsx` (`Button.test.tsx`)
- **meta.json**: `meta.json` (always lowercase)
- **README**: `README.mdx` (always uppercase)

### Code Naming

- **Component name**: PascalCase matching file (`Button`, `TextInput`)
- **Props interface**: ComponentName + `Props` (`ButtonProps`, `TextInputProps`)
- **Variant values**: kebab-case (`"primary"`, `"secondary"`, `"outline-primary"`)
- **Size values**: Short lowercase (`"sm"`, `"md"`, `"lg"`)
- **Example files**: PascalCase + `Example` (`BasicExample`, `SizesExample`)
- **Theme export**: camelCase matching component (`button`, `textInput`)

### meta.json Naming

```json
{
  "type": "react-native",
  "name": "button", // kebab-case, matches directory
  "description": "Interactive button component",
  "dependencies": ["typography"] // Other components used
}
```

## AI Optimization Notes

These patterns are optimized for AI code generation and understanding:

### Theme-First Development

1. **Create theme file FIRST** before implementation
2. **Define all variants and sizes** in theme
3. **Implement component** using only theme tokens
4. **Test theme switching** to ensure light/dark work

### Clear Token Structure

Use descriptive names that indicate purpose:

```typescript
// ✅ Good - clear what it does
{
  backgroundPressed: light.action.primaryPressed,
  borderFocus: light.border.focus,
  textDisabled: light.text.disabled,
}

// ❌ Bad - abbreviations unclear
{
  bgP: light.action.primaryPressed,
  bdrF: light.border.focus,
  txtD: light.text.disabled,
}
```

### Implementation Clarity

```typescript
// ✅ Clear access pattern
const variantTokens = theme.component.button.variant[colorScheme][variant];
const sizeTokens = theme.component.button.size[size];

// Apply tokens clearly
<View
  style={{
    backgroundColor: variantTokens.background,
    padding: sizeTokens.padding,
  }}
/>
```

### Documentation for AI

```typescript
// ✅ Good - self-documenting
export interface ButtonProps {
  /** Visual style variant */
  variant?: "primary" | "secondary" | "tonal" | "plain";

  /** Component size */
  size?: "sm" | "md" | "lg";

  /** Disable interaction */
  disabled?: boolean;
}

// Examples in separate files enable:
// - AI code completion
// - Automatic error detection
// - IntelliSense support
// - Type checking
```

## Component Patterns to Follow

Reference these existing components for complete patterns:

### Button Component

**Location**: `packages/react-native/src/button/`

**Features**:

- Multiple variants (primary, secondary, tonal, plain)
- Size options (sm, md, lg, icon)
- Icon support (left/right)
- Loading state with spinner
- Disabled state
- Full accessibility

**Patterns to learn**:

- Icon handling with cloneElement
- Loading state implementation
- Icon button special case (circular)
- Pressable with state management

### Input Component

**Location**: `packages/react-native/src/input/`

**Features**:

- Variants (outline, filled)
- Sizes (sm, md, lg)
- Label and error states
- Prefix/suffix icons
- Password visibility toggle
- Keyboard type mapping

**Patterns to learn**:

- Focus state management
- Error state handling
- Label positioning
- Icon integration
- TextInput customization

### Typography Component

**Location**: `packages/react-native/src/typography/`

**Features**:

- Variant system (large-title through caption-2)
- Theme-based font families
- Automatic font sizing
- Weight customization

**Patterns to learn**:

- Variant-based styling
- Font family application
- Text composition

### Card Component

**Location**: `packages/react-native/src/card/`

**Features**:

- Elevation variants
- Border variants
- Compound component pattern (Card.Header, Card.Content, Card.Footer)

**Patterns to learn**:

- Compound components
- Context API usage
- Shadow application
- Container patterns

## Common Implementation Patterns

### Interactive Component (Pressable-based)

```typescript
export const InteractiveComponent = ({ onPress, disabled, ...props }) => {
  const { theme, colorScheme } = useTheme();
  const [pressed, setPressed] = useState(false);

  const variantTokens = disabled
    ? theme.component.componentName.variant[colorScheme].disabled
    : theme.component.componentName.variant[colorScheme][props.variant];

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      style={({ pressed: nativePressed }) => [
        baseStyles.container,
        {
          backgroundColor: pressed || nativePressed
            ? variantTokens.backgroundPressed
            : variantTokens.background,
        },
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {/* Content */}
    </Pressable>
  );
};
```

### Input Component (TextInput-based)

```typescript
export const InputComponent = forwardRef<TextInput, InputProps>((props, ref) => {
  const { value, onChange, onBlur, error, disabled } = props;
  const { theme, colorScheme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const variantTokens = theme.component.input.variant[colorScheme];

  const borderColor = error
    ? variantTokens.error.border
    : isFocused
      ? variantTokens.focus.border
      : variantTokens.default.border;

  return (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setIsFocused(false);
        onBlur?.();
      }}
      editable={!disabled}
      style={[
        baseStyles.input,
        {
          color: variantTokens.default.text,
          borderColor,
        },
      ]}
      placeholderTextColor={variantTokens.default.placeholder}
    />
  );
});
```

### Container Component (View-based)

```typescript
export const ContainerComponent = ({ children, variant, style }) => {
  const { theme, colorScheme } = useTheme();

  const variantTokens = theme.component.container.variant[colorScheme][variant];

  return (
    <View
      style={[
        baseStyles.container,
        {
          backgroundColor: variantTokens.background,
          borderColor: variantTokens.border,
          ...variantTokens.shadow, // Spread shadow object
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
```

## Summary

Follow these patterns for consistent, maintainable components:

1. **TypeScript**: Extend native props, define clear interfaces
2. **Examples**: Extract all JSX to separate `.tsx` files
3. **README**: Import examples, comprehensive documentation
4. **Testing**: Cover variants, events, accessibility, style merging
5. **Naming**: Consistent conventions across all files
6. **AI Optimization**: Clear, self-documenting code
7. **Reference**: Learn from existing Button, Input, Typography components

Always prioritize clarity, type safety, and adherence to the three-tier theme system.
