## 1. Theme System

- [x] 1.1 Create Container.theme.ts with primitive token imports
- [x] 1.2 Define maxWidth presets: sm (640), md (768), lg (1024), xl (1280)
- [x] 1.3 Define default padding using primitive.spacing[4] (16px)
- [x] 1.4 Export theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Container.tsx with ContainerProps TypeScript interface
- [x] 2.2 Define MaxWidthPreset type ("sm" | "md" | "lg" | "xl")
- [x] 2.3 Define Inset type ("top" | "right" | "bottom" | "left")
- [x] 2.4 Implement useTheme() hook for theme access
- [x] 2.5 Implement useSafeAreaInsets() hook for safe area support
- [x] 2.6 Implement getMaxWidth() helper function for preset resolution
- [x] 2.7 Implement maxWidth switching logic (presets and custom numbers)
- [x] 2.8 Implement centered alignment via alignSelf: "center"
- [x] 2.9 Implement safe area inset padding logic
- [x] 2.10 Implement style merge pattern (baseStyles, theme-derived, insetPadding, centered, user style)
- [x] 2.11 Apply backgroundColor from theme.semantic.colors.surface.primary
- [x] 2.12 Create baseStyles with flex: 1 and width: "100%"

## 3. Testing

- [x] 3.1 Create Container.test.tsx with render from test-utils
- [x] 3.2 Test children render correctly
- [x] 3.3 Test lg maxWidth by default (1024px)
- [x] 3.4 Test sm maxWidth preset (640px)
- [x] 3.5 Test md maxWidth preset (768px)
- [x] 3.6 Test xl maxWidth preset (1280px)
- [x] 3.7 Test custom numeric maxWidth (900px)
- [x] 3.8 Test default padding of 16px
- [x] 3.9 Test custom padding (24px)
- [x] 3.10 Test centered alignment by default (alignSelf: center)
- [x] 3.11 Test non-centered when centered=false
- [x] 3.12 Test width 100% by default
- [x] 3.13 Test custom style prop merges correctly (marginTop: 20)
- [x] 3.14 Test all props combine correctly
- [x] 3.15 Test ViewProps (testID) are forwarded
- [x] 3.16 Test Container renders without children

## 4. Examples

- [x] 4.1 Create examples/ directory
- [x] 4.2 Create DashboardLayoutExample.tsx showing xl maxWidth with metric cards
- [x] 4.3 Create FormContainerExample.tsx showing sm maxWidth with form layout
- [x] 4.4 Create FullPageLayoutExample.tsx showing lg maxWidth with header/content/footer
- [x] 4.5 Create examples/index.ts barrel export

## 5. Documentation

- [x] 5.1 Create README.mdx with component description (centered max-width wrapper)
- [x] 5.2 Add Basic Usage section with live example
- [x] 5.3 Add Max Width Presets section demonstrating all 4 presets
- [x] 5.4 Add Custom Max Width section with numeric example
- [x] 5.5 Add Padding Customization section with multiple values
- [x] 5.6 Add Alignment Control section showing centered and non-centered
- [x] 5.7 Add Nested Containers section for complex layouts
- [x] 5.8 Add Article Layout Example section
- [x] 5.9 Add Dashboard Layout Example section with DashboardLayoutExample component
- [x] 5.10 Add Form Container Example section with FormContainerExample component
- [x] 5.11 Add Full Page Layout section with FullPageLayoutExample component
- [x] 5.12 Add Props table with all props documented
- [x] 5.13 Add Usage Examples section with code snippets

## 6. Metadata

- [x] 6.1 Create meta.json with type "react-native"
- [x] 6.2 Set name to "container"
- [x] 6.3 Set description to "Centered max-width wrapper for page content with responsive width constraints"
- [x] 6.4 Set dependencies array to empty (no internal dependencies)
- [x] 6.5 Create index.ts barrel export with Container and ContainerProps

## 7. Registry Generation

- [x] 7.1 Verify container export in `src/theme/tokens/components.ts`
- [x] 7.2 Verify Container export in `src/index.ts`
- [x] 7.3 Verify container entry in `src/registry.json`
- [x] 7.4 Verify container docs in `src/docs-registry.ts`

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier) - code formatted
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` - zero errors
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` - zero warnings
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` - all 15 container tests passing
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
