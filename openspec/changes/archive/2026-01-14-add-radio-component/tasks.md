# Implementation Tasks: Radio Component

## 1. Theme System

- [x] 1.1 Create Radio.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm: 16, md: 20, lg: 24)
- [x] 1.3 Define color variants with light/dark semantic colors (checked, unchecked, disabled)
- [x] 1.4 Export theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Radio.tsx with TypeScript interfaces (RadioGroupProps, RadioButtonProps)
- [x] 2.2 Implement RadioContext for group state management
- [x] 2.3 Implement RadioGroup with accessibilityRole="radiogroup"
- [x] 2.4 Implement RadioButton with useTheme() hook for theme access
- [x] 2.5 Implement size handling with dynamic circle and inner dot sizing
- [x] 2.6 Implement variant switching logic (checked, unchecked, disabled)
- [x] 2.7 Use style merge pattern (base, theme, user)
- [x] 2.8 Add accessibility props (role="radio", accessibilityState)
- [x] 2.9 Implement forwardRef for RadioButton ref support
- [x] 2.10 Implement onBlur handling at group and button levels
- [x] 2.11 Throw error when RadioButton used outside RadioGroup

## 3. Testing

- [x] 3.1 Create Radio.test.tsx with render from test-utils
- [x] 3.2 Test RadioGroup renders children
- [x] 3.3 Test RadioGroup provides value to context
- [x] 3.4 Test onChange callback when radio button pressed
- [x] 3.5 Test group-level disabled state
- [x] 3.6 Test onBlur callback on press end
- [x] 3.7 Test RadioButton renders with children
- [x] 3.8 Test RadioButton renders without children
- [x] 3.9 Test selected state when value matches
- [x] 3.10 Test unselected state when value does not match
- [x] 3.11 Test individual disabled button
- [x] 3.12 Test small size renders
- [x] 3.13 Test medium size renders (default)
- [x] 3.14 Test large size renders
- [x] 3.15 Test custom styles applied
- [x] 3.16 Test ViewProps forwarding (testID)
- [x] 3.17 Test ref forwarding
- [x] 3.18 Test button-level onBlur
- [x] 3.19 Test name prop acceptance
- [x] 3.20 Test error thrown when RadioButton used outside RadioGroup

## 4. Examples

- [x] 4.1 Basic usage example in README.mdx (RadioGroup with RadioButtons)
- [x] 4.2 Sizes example showing sm, md, lg
- [x] 4.3 Disabled group example
- [x] 4.4 Individual disabled options example
- [x] 4.5 Without children example with accessibilityLabel
- [x] 4.6 Use cases example (gender selection, shipping options)

## 5. Documentation

- [x] 5.1 Create README.mdx with brief description
- [x] 5.2 Add Import section with import statement
- [x] 5.3 Add Usage section with Basic example
- [x] 5.4 Add Sizes section demonstrating all sizes
- [x] 5.5 Add Disabled Group section
- [x] 5.6 Add Individual Disabled Options section
- [x] 5.7 Add Without Children section with accessibility note
- [x] 5.8 Add Use Cases section with real-world examples
- [x] 5.9 Add Props section with RadioGroup and RadioButton prop tables
- [x] 5.10 Add Accessibility section documenting roles and states
- [x] 5.11 Add Theme Support section documenting light/dark modes
- [x] 5.12 Add Best Practices section

## 6. Metadata

- [x] 6.1 Create meta.json with type, name, description
- [x] 6.2 Add empty dependencies array
- [x] 6.3 Create index.ts barrel export (RadioGroup, RadioButton, types)

## 7. Registry Generation

- [x] 7.1 Run `bun run generate` to update all registries
- [x] 7.2 Verify radio appears in registry.json
- [x] 7.3 Verify radio theme exported in components.ts
- [x] 7.4 Verify radio exported in index.ts

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all tests passing)
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
