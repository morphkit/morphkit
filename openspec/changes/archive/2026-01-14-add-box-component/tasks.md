# Box Component Implementation Tasks

## 1. Theme System

- [x] 1.1 Create Box.theme.ts with primitive token imports
- [x] 1.2 Define spacing tokens using primitive spacing values
- [x] 1.3 Define borderRadius tokens using primitive borderRadius values
- [x] 1.4 Define gap tokens mapping semantic sizes to primitive spacing
- [x] 1.5 Export theme with `as const` for type safety
- [x] 1.6 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Box.tsx with TypeScript interface (BoxProps)
- [x] 2.2 Define SpacingValue type for uniform or per-side spacing
- [x] 2.3 Define BoxGap type for semantic gap sizes
- [x] 2.4 Implement useTheme() hook for theme access
- [x] 2.5 Implement getSpacingStyles helper for padding/margin conversion
- [x] 2.6 Implement dynamic styles object from props
- [x] 2.7 Implement style merge pattern (dynamic styles, then user style)
- [x] 2.8 Forward additional ViewProps via spread operator

## 3. Testing

- [x] 3.1 Create Box.test.tsx with render from test-utils
- [x] 3.2 Test basic rendering with children
- [x] 3.3 Test padding as number applies uniform padding
- [x] 3.4 Test padding as object applies per-side padding
- [x] 3.5 Test partial padding object applies only specified sides
- [x] 3.6 Test margin as number applies uniform margin
- [x] 3.7 Test margin as object applies per-side margin
- [x] 3.8 Test borderRadius prop application
- [x] 3.9 Test borderWidth prop application
- [x] 3.10 Test borderColor prop application
- [x] 3.11 Test backgroundColor prop application
- [x] 3.12 Test flex prop application
- [x] 3.13 Test flexDirection prop application
- [x] 3.14 Test justifyContent prop application
- [x] 3.15 Test alignItems prop application
- [x] 3.16 Test gap prop with theme token resolution
- [x] 3.17 Test multiple props combined
- [x] 3.18 Test custom style prop merging
- [x] 3.19 Test rendering without children
- [x] 3.20 Test ViewProps forwarding (testID)

## 4. Examples

- [x] 4.1 Document basic usage inline in README.mdx
- [x] 4.2 Document padding variants example
- [x] 4.3 Document margin control example
- [x] 4.4 Document border styles example
- [x] 4.5 Document horizontal layout example
- [x] 4.6 Document vertical layout with gap example
- [x] 4.7 Document centered content example
- [x] 4.8 Document profile card complex layout example
- [x] 4.9 Document Box with Card and Typography composition
- [x] 4.10 Document grid layout example
- [x] 4.11 Document form layout with Stack and Box

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Add Basic Usage section with interactive example
- [x] 5.3 Add Padding Variants section
- [x] 5.4 Add Margin Control section
- [x] 5.5 Add Border Styles section
- [x] 5.6 Add Horizontal Layout section
- [x] 5.7 Add Vertical Layout with Gap section
- [x] 5.8 Add Centered Content section
- [x] 5.9 Add Profile Card example (complex layout)
- [x] 5.10 Add Box with Card and Typography section
- [x] 5.11 Add Grid Layout section
- [x] 5.12 Add Form Layout section
- [x] 5.13 Add Props table with all prop types and descriptions
- [x] 5.14 Add Usage Examples section with code snippets

## 6. Metadata

- [x] 6.1 Create meta.json with type "react-native"
- [x] 6.2 Set name to "box"
- [x] 6.3 Set description for component purpose
- [x] 6.4 Set dependencies array (empty - no component dependencies)
- [x] 6.5 Create index.ts barrel export (export Box and BoxProps)

## 7. Registry Generation

- [x] 7.1 Verify Box export in `src/theme/tokens/components.ts`
- [x] 7.2 Run `bun run generate` to update registry.json
- [x] 7.3 Run `bun run generate` to update docs-registry.ts
- [x] 7.4 Run `bun run generate` to update index.ts exports

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all tests passing)
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
