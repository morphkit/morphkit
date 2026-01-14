## 1. Theme System

- [x] 1.1 Create Checkbox.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm: 16, md: 20, lg: 24)
- [x] 1.3 Define color variants with light/dark semantic colors (checked, unchecked, disabled)
- [x] 1.4 Export theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Checkbox.tsx with TypeScript interface (CheckboxProps)
- [x] 2.2 Implement useTheme() hook for theme access
- [x] 2.3 Implement state switching logic (checked, unchecked, indeterminate)
- [x] 2.4 Implement size handling with dynamic box dimensions
- [x] 2.5 Support children prop for label content
- [x] 2.6 Implement style merge pattern (baseStyles, themeStyles, customStyle)
- [x] 2.7 Add accessibility props (role: checkbox, state: checked/disabled)
- [x] 2.8 Implement forwardRef for ref support
- [x] 2.9 Implement custom color override logic
- [x] 2.10 Create CheckIcon and MinusIcon internal components

## 3. Testing

- [x] 3.1 Create Checkbox.test.tsx with render from test-utils
- [x] 3.2 Test basic rendering with unchecked state
- [x] 3.3 Test checked state rendering
- [x] 3.4 Test indeterminate state rendering
- [x] 3.5 Test all sizes render correctly (sm, md, lg)
- [x] 3.6 Test onChange callback with correct toggled value
- [x] 3.7 Test disabled state prevents onChange
- [x] 3.8 Test onBlur callback on pressOut
- [x] 3.9 Test style merging with custom styles
- [x] 3.10 Test accessibility role is "checkbox"
- [x] 3.11 Test accessibilityState.checked reflects state
- [x] 3.12 Test accessibilityState.disabled reflects prop
- [x] 3.13 Test ref forwarding
- [x] 3.14 Test children rendering
- [x] 3.15 Test custom color prop
- [x] 3.16 Test name prop acceptance
- [x] 3.17 Test ViewProps forwarding

## 4. Examples

- [x] 4.1 Examples embedded in README.mdx (Basic usage)
- [x] 4.2 Examples embedded in README.mdx (Checked states)
- [x] 4.3 Examples embedded in README.mdx (Indeterminate state)
- [x] 4.4 Examples embedded in README.mdx (All sizes)
- [x] 4.5 Examples embedded in README.mdx (Custom colors)
- [x] 4.6 Examples embedded in README.mdx (Disabled state)
- [x] 4.7 Examples embedded in README.mdx (Without children)

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Add import statement documentation
- [x] 5.3 Add Basic usage section
- [x] 5.4 Add Checked State section with examples
- [x] 5.5 Add Indeterminate State section with use case explanation
- [x] 5.6 Add Sizes section showing all variants
- [x] 5.7 Add Custom Color section with multiple examples
- [x] 5.8 Add Disabled State section
- [x] 5.9 Add Without Children section with accessibility note
- [x] 5.10 Add Props table with all props documented
- [x] 5.11 Add Accessibility section with best practices
- [x] 5.12 Add Theme Support section explaining light/dark modes

## 6. Metadata

- [x] 6.1 Create meta.json with type: "react-native"
- [x] 6.2 Add name: "checkbox"
- [x] 6.3 Add description following component style
- [x] 6.4 Add dependencies array (empty - no component dependencies)
- [x] 6.5 Create index.ts barrel export (Checkbox and CheckboxProps)

## 7. Registry Generation

- [x] 7.1 Component registered in registry.json
- [x] 7.2 Component documentation registered in docs-registry.ts
- [x] 7.3 Component exported from index.ts barrel

## 8. Verification

- [x] 8.1 Code formatted with Prettier
- [x] 8.2 TypeScript type checking passes (zero errors)
- [x] 8.3 ESLint passes (zero warnings)
- [x] 8.4 All 17 tests pass
- [x] 8.5 Component appears in demo app sidebar
- [x] 8.6 Documentation loads correctly in demo app
