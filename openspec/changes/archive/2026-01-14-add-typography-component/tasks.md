# Typography Component Implementation Tasks

## 1. Theme System

- [x] 1.1 Create Typography.theme.ts with semantic token imports
- [x] 1.2 Import textStyles and fontFamilies from semantic typography tokens
- [x] 1.3 Define light/dark color variants using semantic color tokens (light.text.primary, dark.text.primary)
- [x] 1.4 Export typography theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Typography.tsx with TypographyProps TypeScript interface
- [x] 2.2 Define TypographyVariant union type with all 11 variants
- [x] 2.3 Create variantMap to convert kebab-case variants to camelCase theme keys
- [x] 2.4 Implement useTheme() hook for theme and colorScheme access
- [x] 2.5 Retrieve semantic text styles using textStyleKey lookup
- [x] 2.6 Apply theme-based text color using component.typography.variant[colorScheme].text
- [x] 2.7 Implement style merge pattern: [textStyle, themeColor, customStyle]
- [x] 2.8 Spread remaining TextProps to underlying Text component

## 3. Testing

- [x] 3.1 Create Typography.test.tsx using render from test-utils
- [x] 3.2 Test children rendering with getByText assertion
- [x] 3.3 Test default body variant style (fontSize: 17, fontWeight: "400", color: "#111827")
- [x] 3.4 Test large-title variant style (fontSize: 34, fontWeight: "400")
- [x] 3.5 Test caption-2 variant style (fontSize: 11, fontWeight: "400")
- [x] 3.6 Test custom style merging with color override
- [x] 3.7 Test TextProps passthrough (numberOfLines)
- [x] 3.8 Test accessibility props passthrough (accessibilityRole, accessibilityLabel)

## 4. Examples

- [x] 4.1 Component has inline examples in README.mdx (no separate examples directory)
- [x] 4.2 Variants example showing all 11 variants with font sizes
- [x] 4.3 Examples use View wrapper with proper spacing

## 5. Documentation

- [x] 5.1 Create README.mdx with component description (1-2 sentences, Apple HIG style)
- [x] 5.2 Import Typography component at top of README.mdx
- [x] 5.3 Add Variants section with live examples of all 11 variants
- [x] 5.4 Add Props table with variant, children, style, ...props
- [x] 5.5 Document variant type union with all 11 options
- [x] 5.6 Document default value ("body") for variant prop

## 6. Metadata

- [x] 6.1 Create meta.json with type: "react-native", name: "typography"
- [x] 6.2 Add description: "Text component with 11 iOS-inspired typography variants using StyleSheet"
- [x] 6.3 Add dependencies: [] (no component dependencies)
- [x] 6.4 Create index.ts barrel export (export Typography and TypographyProps)

## 7. Registry Generation

- [x] 7.1 Typography is registered in registry.json
- [x] 7.2 Typography is registered in docs-registry.ts
- [x] 7.3 Typography is exported from index.ts

## 8. Verification

- [x] 8.1 Code passes `bun run format` (Prettier)
- [x] 8.2 Code passes `bun run check-types --filter=@warp-ui/react-native` (zero TypeScript errors)
- [x] 8.3 Code passes `bun run lint --filter=@warp-ui/react-native` (zero ESLint warnings)
- [x] 8.4 All tests pass `bun run test --filter=@warp-ui/react-native`
- [x] 8.5 Component appears in demo app sidebar
- [x] 8.6 Documentation loads correctly in demo app
