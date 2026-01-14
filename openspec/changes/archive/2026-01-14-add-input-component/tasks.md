## 1. Theme System

- [x] 1.1 Create Input.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm, md, lg) using primitive spacing/typography
- [x] 1.3 Define color variants with light/dark semantic colors (default, filled, focus, error, disabled, label)
- [x] 1.4 Export theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Input.tsx with InputProps TypeScript interface
- [x] 2.2 Implement useTheme() hook for theme access
- [x] 2.3 Implement variant switching logic (outline, filled)
- [x] 2.4 Implement size handling (sm, md, lg)
- [x] 2.5 Use Typography component for label and error text
- [x] 2.6 Implement style merge pattern (base, theme, user)
- [x] 2.7 Add accessibility props (accessibilityLabel from label/name)
- [x] 2.8 Implement forwardRef for TextInput ref support
- [x] 2.9 Implement focus/blur state management with isFocused state
- [x] 2.10 Implement input type to keyboard mapping (text, email, password, number)
- [x] 2.11 Implement prefix/suffix icon slots
- [x] 2.12 Implement disabled state with reduced opacity
- [x] 2.13 Implement error state with error border and message

## 3. Testing

- [x] 3.1 Create Input.test.tsx with customRender from test-utils
- [x] 3.2 Test basic rendering with value prop
- [x] 3.3 Test onChange callback fires on text change
- [x] 3.4 Test onBlur callback fires on blur
- [x] 3.5 Test ref forwarding to TextInput
- [x] 3.6 Test name prop acceptance
- [x] 3.7 Test accessibilityLabel from label prop
- [x] 3.8 Test accessibilityLabel fallback to name prop
- [x] 3.9 Test label rendering above input
- [x] 3.10 Test placeholder rendering
- [x] 3.11 Test error message rendering
- [x] 3.12 Test disabled state (editable=false)
- [x] 3.13 Test prefix icon rendering
- [x] 3.14 Test suffix icon rendering
- [x] 3.15 Test outline variant renders
- [x] 3.16 Test filled variant renders
- [x] 3.17 Test small size renders
- [x] 3.18 Test medium size renders (default)
- [x] 3.19 Test large size renders
- [x] 3.20 Test email type sets keyboardType to email-address
- [x] 3.21 Test number type sets keyboardType to numeric
- [x] 3.22 Test password type sets secureTextEntry to true
- [x] 3.23 Test custom styles applied
- [x] 3.24 Test TextInputProps passthrough (testID, maxLength)

## 4. Examples

- [x] 4.1 Create basic usage example in README.mdx
- [x] 4.2 Create input types example (email, password, number)
- [x] 4.3 Create variants example (outline, filled)
- [x] 4.4 Create sizes example (sm, md, lg)
- [x] 4.5 Create error state example
- [x] 4.6 Create disabled state example
- [x] 4.7 Create prefix icon example
- [x] 4.8 Create suffix icon example
- [x] 4.9 Create combined features example

## 5. Documentation

- [x] 5.1 Create README.mdx with brief description (Apple HIG style)
- [x] 5.2 Add Import section with correct import path
- [x] 5.3 Add Usage section with Basic example
- [x] 5.4 Add Input Types section with email/password/number examples
- [x] 5.5 Add Variants section with outline/filled examples
- [x] 5.6 Add Sizes section with sm/md/lg examples
- [x] 5.7 Add Error State section with validation example
- [x] 5.8 Add Disabled State section
- [x] 5.9 Add Prefix/Suffix Icon sections with examples
- [x] 5.10 Add Combined Features section
- [x] 5.11 Add Props table with all props documented
- [x] 5.12 Add Accessibility section with best practices
- [x] 5.13 Add Theme Support section with light/dark mode colors
- [x] 5.14 Add Best Practices section

## 6. Metadata

- [x] 6.1 Create meta.json with type, name, description
- [x] 6.2 Add category field (input)
- [x] 6.3 Add dependencies array (empty - no component dependencies)
- [x] 6.4 Create index.ts barrel export (export Input, InputProps, InputRef)

## 7. Registry Generation

- [x] 7.1 Run `bun run generate` to update all registries (registry.json, docs-registry.ts, index.ts)
- [x] 7.2 Verify Input appears in registry.json
- [x] 7.3 Verify Input docs loader in docs-registry.ts
- [x] 7.4 Verify Input export in index.ts

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all tests passing)
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
