# Label Component Implementation Tasks

## 1. Theme System

- [x] 1.1 Create Label.theme.ts with primitive token imports
- [x] 1.2 Define size variants using primitive.fontSize (xs, sm, lg)
- [x] 1.3 Define color variants with light/dark semantic colors (text.secondary, status.error.main)
- [x] 1.4 Export theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Label.tsx with TypeScript interface (LabelProps)
- [x] 2.2 Implement useTheme() hook for theme access
- [x] 2.3 Implement error state color switching logic
- [x] 2.4 Implement required asterisk indicator with caption-1 Typography
- [x] 2.5 Use Typography component for all text rendering (callout variant)
- [x] 2.6 Implement style merge pattern (baseStyles, theme, user)
- [x] 2.7 Accept htmlFor prop for web accessibility
- [x] 2.8 Forward remaining TextProps via spread operator

## 3. Testing

- [x] 3.1 Create Label.test.tsx with render from test-utils
- [x] 3.2 Test basic rendering with default props
- [x] 3.3 Test required asterisk presence when required=true
- [x] 3.4 Test asterisk absence when required=false
- [x] 3.5 Test error styling application
- [x] 3.6 Test all size variants (sm, md, lg)
- [x] 3.7 Test combined required and error states
- [x] 3.8 Test custom style application
- [x] 3.9 Test testID prop forwarding
- [x] 3.10 Test htmlFor prop acceptance
- [x] 3.11 Test empty children rendering

## 4. Examples

- [x] 4.1 Basic Usage example in README.mdx
- [x] 4.2 Required Indicator example showing asterisk
- [x] 4.3 Error State example with validation colors
- [x] 4.4 Sizes example showing sm, md, lg variants
- [x] 4.5 Combined States example mixing props
- [x] 4.6 Login Form example with Card and Stack
- [x] 4.7 Profile Settings Form example with different sizes
- [x] 4.8 Error State Form example with validation messages

## 5. Documentation

- [x] 5.1 Create README.mdx with brief description
- [x] 5.2 Import Label and supporting components at top
- [x] 5.3 Add Basic Usage section with live example
- [x] 5.4 Add Required Indicator section with explanation
- [x] 5.5 Add Error State section with use cases
- [x] 5.6 Add Sizes section with all three variants
- [x] 5.7 Add real-world form examples (Login, Profile, Error validation)
- [x] 5.8 Add Props table with all prop definitions
- [x] 5.9 Add Usage Examples section with code snippets
- [x] 5.10 Add Accessibility Features section

## 6. Metadata

- [x] 6.1 Create meta.json with type "react-native"
- [x] 6.2 Add name "label" and description
- [x] 6.3 Add dependencies array (empty - no internal dependencies)
- [x] 6.4 Create index.ts barrel export (Label, LabelProps)

## 7. Registry Generation

- [x] 7.1 Run `bun run generate` to update registry.json
- [x] 7.2 Run `bun run generate` to update docs-registry.ts
- [x] 7.3 Run `bun run generate` to update index.ts exports

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all tests passing)
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
