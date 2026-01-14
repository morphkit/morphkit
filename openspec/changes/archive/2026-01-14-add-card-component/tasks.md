## 1. Theme System

- [x] 1.1 Create Card.theme.ts with primitive token imports
- [x] 1.2 Define padding using primitive.spacing[4] (16px)
- [x] 1.3 Define borderRadius using primitive.borderRadius.lg (12px)
- [x] 1.4 Define gap using primitive.spacing[3]
- [x] 1.5 Define variant tokens (default, elevated, outlined, ghost, filled) with light/dark semantic colors
- [x] 1.6 Define shadow presets per variant (lg for elevated, sm for outlined/ghost, md for filled)
- [x] 1.7 Define pressed state opacity using primitive.opacity.pressed
- [x] 1.8 Export theme with `as const` for type safety
- [x] 1.9 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Card.tsx with CardProps TypeScript interface
- [x] 2.2 Define CardVariant type ("elevated" | "outline" | "ghost" | "filled")
- [x] 2.3 Define CardSize type ("sm" | "md" | "lg")
- [x] 2.4 Implement useTheme() hook for theme and colorScheme access
- [x] 2.5 Implement getVariantStyles() helper function for variant switching
- [x] 2.6 Implement variant switching logic (elevated, outline, ghost, filled)
- [x] 2.7 Implement style merge pattern (baseStyles, theme-derived, user style)
- [x] 2.8 Implement conditional rendering (Pressable when onPress, View otherwise)
- [x] 2.9 Add accessibilityRole="button" for pressable cards
- [x] 2.10 Implement press state with opacity feedback
- [x] 2.11 Create baseStyles with overflow: "hidden"

## 3. Testing

- [x] 3.1 Create Card.test.tsx with render from test-utils
- [x] 3.2 Test children render correctly
- [x] 3.3 Test elevated variant (default) applies correct backgroundColor (#FFFFFF) and shadow
- [x] 3.4 Test outline variant applies correct backgroundColor, borderWidth (1), and borderColor (#E5E7EB)
- [x] 3.5 Test ghost variant applies correct backgroundColor (#F9FAFB)
- [x] 3.6 Test filled variant applies correct backgroundColor (#F3F4F6)
- [x] 3.7 Test md size (default) applies correct padding (16px) and borderRadius (12px)
- [x] 3.8 Test sm size applies correct padding and borderRadius
- [x] 3.9 Test lg size applies correct padding and borderRadius
- [x] 3.10 Test Pressable renders when onPress is provided
- [x] 3.11 Test onPress is called when pressed
- [x] 3.12 Test View renders when onPress is not provided (no button role)
- [x] 3.13 Test custom style prop merges correctly (marginTop: 20)
- [x] 3.14 Test variant and size combine correctly
- [x] 3.15 Test ViewProps (testID) are forwarded
- [x] 3.16 Test Card renders without children

## 4. Examples

- [x] 4.1 Document basic usage example in README.mdx
- [x] 4.2 Document elevated variant example in README.mdx
- [x] 4.3 Document outline variant example in README.mdx
- [x] 4.4 Document ghost variant example in README.mdx
- [x] 4.5 Document filled variant example in README.mdx
- [x] 4.6 Document all sizes example in README.mdx
- [x] 4.7 Document pressable card example in README.mdx
- [x] 4.8 Document complex card example (product card) in README.mdx
- [x] 4.9 Document gallery of combinations in README.mdx

## 5. Documentation

- [x] 5.1 Create README.mdx with component description (content container with elevation, borders, and padding)
- [x] 5.2 Add Basic Usage section with live example
- [x] 5.3 Add Variants section with all 4 variants demonstrated
- [x] 5.4 Add Sizes section with all 3 sizes demonstrated
- [x] 5.5 Add Pressable Card section with live example
- [x] 5.6 Add Complex Card Example section with product card
- [x] 5.7 Add Gallery of Combinations section
- [x] 5.8 Add Props table with all props documented
- [x] 5.9 Add Usage Examples section with code snippets
- [x] 5.10 Add Behavior Notes section explaining View/Pressable rendering

## 6. Metadata

- [x] 6.1 Create meta.json with type "react-native"
- [x] 6.2 Set name to "card"
- [x] 6.3 Set description to "Content container with elevation, borders, and padding for grouping information"
- [x] 6.4 Set dependencies array to empty (no internal dependencies)
- [x] 6.5 Create index.ts barrel export with Card and CardProps

## 7. Registry Generation

- [x] 7.1 Verify card export in `src/theme/tokens/components.ts`
- [x] 7.2 Verify Card export in `src/index.ts`
- [x] 7.3 Verify card entry in `src/registry.json`
- [x] 7.4 Verify card docs in `src/docs-registry.ts`

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier) - code formatted
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` - zero errors
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` - zero warnings
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` - all 15 card tests passing
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
