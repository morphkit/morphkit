# Switch Component Implementation Tasks

## 1. Theme System

- [x] 1.1 Create Switch.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm, md, lg) with trackWidth, trackHeight, thumbSize, thumbPadding
- [x] 1.3 Define color variants with light/dark semantic colors for on, off, disabled states
- [x] 1.4 Export theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Switch.tsx with TypeScript interface (SwitchProps)
- [x] 2.2 Implement useTheme() hook for theme access
- [x] 2.3 Implement controlled state management (checked/onChange pattern)
- [x] 2.4 Implement size handling with theme.component.switchComponent.size tokens
- [x] 2.5 Implement color variant switching for on/off/disabled states
- [x] 2.6 Implement custom color override via color prop
- [x] 2.7 Implement animated thumb transition using Animated.timing with native driver
- [x] 2.8 Implement thumb position interpolation based on track dimensions
- [x] 2.9 Add optional label rendering with Text component
- [x] 2.10 Implement style merge pattern (base styles, theme tokens, user style prop)
- [x] 2.11 Add accessibility props (role="switch", accessibilityState.checked, accessibilityLabel)
- [x] 2.12 Implement forwardRef for ref support
- [x] 2.13 Add displayName for debugging

## 3. Testing

- [x] 3.1 Create Switch.test.tsx with render from test-utils
- [x] 3.2 Test unchecked state rendering with accessibilityState.checked=false
- [x] 3.3 Test checked state rendering with accessibilityState.checked=true
- [x] 3.4 Test label rendering displays text correctly
- [x] 3.5 Test onChange callback receives toggled value on press
- [x] 3.6 Test toggle from checked to unchecked calls onChange(false)
- [x] 3.7 Test onBlur callback fires on pressOut event
- [x] 3.8 Test ref forwarding returns truthy ref.current
- [x] 3.9 Test name prop is accepted
- [x] 3.10 Test name prop used for accessibilityLabel when label not provided
- [x] 3.11 Test label prop takes precedence over name for accessibilityLabel
- [x] 3.12 Test disabled state does not call onChange
- [x] 3.13 Test small size renders without error
- [x] 3.14 Test medium size (default) renders without error
- [x] 3.15 Test large size renders without error
- [x] 3.16 Test custom color prop is accepted
- [x] 3.17 Test custom style prop is applied
- [x] 3.18 Test ViewProps are forwarded (testID)

## 4. Examples

- [x] 4.1 Note: Examples are embedded in README.mdx as inline JSX demonstrations
- [x] 4.2 Basic usage example with controlled state
- [x] 4.3 States example showing off and on
- [x] 4.4 Sizes example showing sm, md, lg
- [x] 4.5 Custom color examples with multiple colors
- [x] 4.6 Disabled state examples
- [x] 4.7 Without label example with accessibilityLabel
- [x] 4.8 Real-world use cases (Dark Mode, Notifications, Auto-save, Location)

## 5. Documentation

- [x] 5.1 Create README.mdx with title and description
- [x] 5.2 Add import statement example
- [x] 5.3 Add basic usage section with controlled component pattern
- [x] 5.4 Add states section showing off and on states
- [x] 5.5 Add sizes section with sm, md, lg examples
- [x] 5.6 Add custom color section with multiple color examples
- [x] 5.7 Add disabled state section
- [x] 5.8 Add without label section with accessibility guidance
- [x] 5.9 Add use cases section with real-world examples
- [x] 5.10 Add props table with all props, types, defaults, descriptions
- [x] 5.11 Add accessibility section documenting WCAG compliance
- [x] 5.12 Add theme support section explaining light/dark modes
- [x] 5.13 Add animation section explaining Animated API usage
- [x] 5.14 Add best practices section with usage guidelines

## 6. Metadata

- [x] 6.1 Create meta.json with type="react-native", name="switch"
- [x] 6.2 Add description: "Toggle switch for binary on/off states with animated transitions"
- [x] 6.3 Add dependencies array (empty - no component dependencies)
- [x] 6.4 Create index.ts barrel export (export Switch and SwitchProps)

## 7. Registry Generation

- [x] 7.1 Run `bun run generate` to update registry.json
- [x] 7.2 Verify switch appears in registry.json with correct metadata
- [x] 7.3 Verify docs-registry.ts includes switch README.mdx import
- [x] 7.4 Verify index.ts includes switch export

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all 18 switch tests passing)
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
