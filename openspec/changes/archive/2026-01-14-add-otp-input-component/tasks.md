# OTPInput Component Implementation Tasks

## 1. Theme System

- [x] 1.1 Create OTPInput.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm=36, md=44, lg=52) for field widths
- [x] 1.3 Define gap spacing using primitive.spacing[2]
- [x] 1.4 Define success border color with light/dark semantic colors
- [x] 1.5 Export theme with `as const` for type safety
- [x] 1.6 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create OTPInput.tsx with TypeScript interface (OTPInputProps)
- [x] 2.2 Implement useTheme() hook for theme access
- [x] 2.3 Implement variant switching logic (outline, filled) via Input component
- [x] 2.4 Implement size handling (sm, md, lg) with field width tokens
- [x] 2.5 Compose with Input component for individual fields
- [x] 2.6 Implement style merge pattern (base, theme, user)
- [x] 2.7 Add accessibility props (accessibilityLabel per field and container)
- [x] 2.8 Implement forwardRef for ref support to container View
- [x] 2.9 Implement controlled input with value/onChange
- [x] 2.10 Implement auto-advance on character entry
- [x] 2.11 Implement backspace navigation between fields
- [x] 2.12 Implement paste handling with validation
- [x] 2.13 Implement auto-submit with onComplete callback
- [x] 2.14 Implement error state border color
- [x] 2.15 Implement focus state border color
- [x] 2.16 Implement success state border color
- [x] 2.17 Implement disabled state via Input component
- [x] 2.18 Implement autoFocus behavior
- [x] 2.19 Implement type validation (number vs text)

## 3. Testing

- [x] 3.1 Create OTPInput.test.tsx with render from test-utils
- [x] 3.2 Test basic rendering with default 6 fields
- [x] 3.3 Test custom length renders correct number of fields
- [x] 3.4 Test value distribution splits into individual fields
- [x] 3.5 Test partial value with empty trailing fields
- [x] 3.6 Test onChange callback on input
- [x] 3.7 Test auto-advance to next field
- [x] 3.8 Test onComplete called when all fields filled
- [x] 3.9 Test backspace moves to previous field
- [x] 3.10 Test paste with full OTP code
- [x] 3.11 Test paste with partial OTP code
- [x] 3.12 Test paste truncation when exceeds length
- [x] 3.13 Test number type filters non-numeric input
- [x] 3.14 Test number type filters non-numeric paste
- [x] 3.15 Test text type allows all characters
- [x] 3.16 Test disabled state disables all fields
- [x] 3.17 Test sm size applies correct width (36px)
- [x] 3.18 Test md size applies correct width (44px)
- [x] 3.19 Test lg size applies correct width (52px)
- [x] 3.20 Test outline variant renders correctly
- [x] 3.21 Test filled variant renders correctly
- [x] 3.22 Test container accessibility label (default)
- [x] 3.23 Test container accessibility label (custom)
- [x] 3.24 Test individual field accessibility labels
- [x] 3.25 Test ref forwarding to container View
- [x] 3.26 Test custom style prop applies to container
- [x] 3.27 Test value prop updates reflect in fields

## 4. Examples

- [x] 4.1 Create inline examples in README.mdx (basic usage)
- [x] 4.2 Create sizes example showing sm, md, lg
- [x] 4.3 Create variants example showing outline, filled
- [x] 4.4 Create error state example
- [x] 4.5 Create custom length example (4 digits)
- [x] 4.6 Create text type example

## 5. Documentation

- [x] 5.1 Create README.mdx with brief description
- [x] 5.2 Add import statement example
- [x] 5.3 Add basic usage section with code example
- [x] 5.4 Add sizes section demonstrating all three sizes
- [x] 5.5 Add variants section demonstrating outline and filled
- [x] 5.6 Add error state section
- [x] 5.7 Add custom length section
- [x] 5.8 Add text type section
- [x] 5.9 Add props table with all props documented
- [x] 5.10 Add accessibility section
- [x] 5.11 Add behavior section explaining auto-advance, backspace, paste, auto-submit
- [x] 5.12 Add best practices section

## 6. Metadata

- [x] 6.1 Create meta.json with type, name, description
- [x] 6.2 Add category field (input)
- [x] 6.3 Add dependencies array (input)
- [x] 6.4 Create index.ts barrel export (OTPInput, OTPInputProps)

## 7. Registry Generation

- [x] 7.1 Run `bun run generate` to update all registries (registry.json, docs-registry.ts, index.ts)

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all tests passing)
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
