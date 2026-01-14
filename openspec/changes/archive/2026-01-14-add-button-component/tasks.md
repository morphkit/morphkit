## 1. Theme System

- [x] 1.1 Create Button.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm, md, lg) using primitive spacing/typography
- [x] 1.3 Define color variants (primary, secondary, tonal, plain, disabled) with light/dark semantic colors
- [x] 1.4 Define borderWidth configurations (secondary hairline, default 0)
- [x] 1.5 Export theme with `as const` for type safety
- [x] 1.6 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Button.tsx with ButtonProps TypeScript interface
- [x] 2.2 Implement useTheme() hook for theme and colorScheme access
- [x] 2.3 Implement variant switching logic (primary, secondary, tonal, plain)
- [x] 2.4 Implement size handling (none, sm, md, lg, icon)
- [x] 2.5 Use Typography component for all text rendering
- [x] 2.6 Implement style merge pattern (baseStyles, theme-derived, user style)
- [x] 2.7 Add accessibility props (accessibilityRole="button", accessibilityState)
- [x] 2.8 Implement icon support (iconLeft, iconRight, iconAbsoluteLeft, iconAbsoluteRight)
- [x] 2.9 Implement loading state with Spinner overlay
- [x] 2.10 Implement disabled state with opacity and interaction blocking
- [x] 2.11 Implement press state feedback with backgroundPressed token

## 3. Testing

- [x] 3.1 Create Button.test.tsx with render from test-utils
- [x] 3.2 Test basic rendering with default props ("Click Me")
- [x] 3.3 Test primary variant applies correct text color (#FFFFFF)
- [x] 3.4 Test secondary variant applies correct text color (#111827)
- [x] 3.5 Test tonal variant applies correct text color (#0C4A6E)
- [x] 3.6 Test plain variant applies correct text color (#4A90E2)
- [x] 3.7 Test small size applies correct padding (12px) and height (32px)
- [x] 3.8 Test medium size applies correct padding (16px) and height (40px)
- [x] 3.9 Test large size applies correct padding (20px) and height (48px)
- [x] 3.10 Test icon size applies circular shape (40x40, borderRadius 20)
- [x] 3.11 Test iconLeft renders correctly with text
- [x] 3.12 Test iconRight renders correctly with text
- [x] 3.13 Test both icons render together with text
- [x] 3.14 Test icon button renders children directly
- [x] 3.15 Test onPress is called when pressed
- [x] 3.16 Test onPress is NOT called when disabled
- [x] 3.17 Test onPress is NOT called when loading
- [x] 3.18 Test Spinner appears when loading
- [x] 3.19 Test content hidden (opacity 0) when loading
- [x] 3.20 Test disabled styles (opacity 0.5) apply correctly
- [x] 3.21 Test custom style prop merges correctly
- [x] 3.22 Test accessibilityRole is "button"
- [x] 3.23 Test accessibilityState.disabled when disabled
- [x] 3.24 Test accessibilityState.busy when loading
- [x] 3.25 Test accessibilityLabel forwarding
- [x] 3.26 Test size="none" renders without padding

## 4. Examples

- [x] 4.1 Document variant examples in README.mdx (primary, secondary, tonal, plain)
- [x] 4.2 Document size examples in README.mdx (sm, md, lg, icon)
- [x] 4.3 Document icon examples in README.mdx (iconLeft, iconRight, both)
- [x] 4.4 Document state examples in README.mdx (disabled, loading)
- [x] 4.5 Document icon button examples in README.mdx

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Add Variants section with live examples
- [x] 5.3 Add Sizes section with live examples
- [x] 5.4 Add With Icons section with live examples
- [x] 5.5 Add States section (disabled, loading)
- [x] 5.6 Add Icon Buttons section
- [x] 5.7 Add Props table with all props documented
- [x] 5.8 Add Usage Examples section with code snippets
- [x] 5.9 Include Basic Button example
- [x] 5.10 Include Icon Button example
- [x] 5.11 Include Loading Button example
- [x] 5.12 Include Custom Styling example

## 6. Metadata

- [x] 6.1 Create meta.json with type "react-native"
- [x] 6.2 Set name to "button"
- [x] 6.3 Set description to "Pressable button component with 4 variants, 5 sizes, icon support, and loading states"
- [x] 6.4 Set dependencies array to empty (no internal dependencies)
- [x] 6.5 Create index.ts barrel export with Button and ButtonProps

## 7. Registry Generation

- [x] 7.1 Verify button export in `src/theme/tokens/components.ts`
- [x] 7.2 Verify Button export in `src/index.ts`
- [x] 7.3 Verify button entry in `src/registry.json`
- [x] 7.4 Verify button docs in `src/docs-registry.ts`

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier) - code formatted
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` - zero errors
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` - zero warnings
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` - all 26 button tests passing
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
