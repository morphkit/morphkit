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

```mdx
import { Component } from "./Component";
import { View } from "react-native";
import {
  BasicExample,
  VariantsExample,
  SizesExample,
  InteractiveExample,
} from "./examples";

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

## Sizes

<View style={{ marginVertical: 12 }}>
  <SizesExample />
</View>

## Interactive Example

<View style={{ marginVertical: 12 }}>
  <InteractiveExample />
</View>

## Props

| Prop     | Type                                      | Default     | Description            |
| -------- | ----------------------------------------- | ----------- | ---------------------- |
| variant  | `"primary"` \| `"secondary"` \| `"tonal"` | `"primary"` | Visual style variant   |
| size     | `"sm"` \| `"md"` \| `"lg"`                | `"md"`      | Component size         |
| disabled | `boolean`                                 | `false`     | Disable interaction    |
| children | `ReactNode`                               | -           | Content to display     |
| onPress  | `() => void`                              | -           | Press event handler    |
| style    | `StyleProp<ViewStyle>`                    | -           | Custom style overrides |
| ...props | `ComponentProps`                          | -           | All View props         |

## Usage Examples

### Basic Component

\`\`\`tsx
import { Component } from "@repo/react-native";

<Component variant="primary">Click Me</Component>
\`\`\`

### With Custom Styling

\`\`\`tsx

<Component variant="secondary" size="lg" style={{ marginVertical: 8 }}>
  Custom Styled
</Component>
\`\`\`

### With Event Handler

\`\`\`tsx

<Component variant="primary" onPress={() => console.log("Pressed!")}>
  Press Me
</Component>
\`\`\`

## Accessibility

This component follows WCAG AA guidelines:

- Provides appropriate `accessibilityRole`
- Includes `accessibilityLabel` for screen readers
- Uses `accessibilityState` to communicate state
- Maintains sufficient color contrast (4.5:1 for text)
- Supports keyboard navigation (web)

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

- [OtherComponent](../other-component/README.mdx) - Related functionality
- [RelatedComponent](../related/README.mdx) - Similar use case
```

**Important README Rules**:

- Extract ALL interactive JSX to example files
- Import examples at top
- Wrap examples in `<View style={{ marginVertical: 12 }}>`
- Never use `backgroundColor` or `borderRadius` in View wrapper
- Code blocks (in backticks) stay in README (don't extract)
- Include comprehensive prop table
- Document accessibility features
- Show customization examples

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
