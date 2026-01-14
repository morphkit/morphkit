# Tasks: Add Tabs Component

## 1. Theme System

- [x] 1.1 Create Tabs.theme.ts with primitive token imports
- [x] 1.2 Define spacing tokens using primitive.spacing[N]
- [x] 1.3 Define borderRadius using primitive.borderRadius.md
- [x] 1.4 Define typography tokens using primitive.fontSize and primitive.fontWeight
- [x] 1.5 Define variant colors for light and dark modes using semantic tokens
- [x] 1.6 Define horizontal and vertical orientation-specific tokens
- [x] 1.7 Define pill variant padding tokens
- [x] 1.8 Define content paddingTop token
- [x] 1.9 Define disabled opacity using primitive.opacity.disabled
- [x] 1.10 Export theme with `as const` for type safety
- [x] 1.11 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Tabs.tsx with TypeScript interfaces for all sub-components
- [x] 2.2 Implement TabsContext with value, onValueChange, orientation, variant, disabled, and tabValues
- [x] 2.3 Implement useTabsContext hook with error handling for context boundary
- [x] 2.4 Implement TabsContainer with Context.Provider and PanResponder for swipe gestures
- [x] 2.5 Implement extractTabValues function to collect tab values from children
- [x] 2.6 Implement handleSwipe function for left/right swipe navigation
- [x] 2.7 Implement TabsList with accessibilityRole="tablist" and orientation-based flexDirection
- [x] 2.8 Implement TabsTrigger with Pressable, variant styles, and icon support
- [x] 2.9 Implement getVariantStyles function for line, filled, and pills variants
- [x] 2.10 Implement getTextColor function for variant-specific text colors
- [x] 2.11 Implement TabsContent with conditional rendering based on value match
- [x] 2.12 Use useTheme() hook for theme access in all sub-components
- [x] 2.13 Use Typography component for label rendering in TabsTrigger
- [x] 2.14 Implement style merge pattern (base, theme, variant, user) in all components
- [x] 2.15 Add accessibility props (role, state) to TabsList and TabsTrigger

## 3. Testing

- [x] 3.1 Create Tabs.test.tsx with customRender from test-utils
- [x] 3.2 Test TabsContainer renders children
- [x] 3.3 Test TabsContainer provides value to context
- [x] 3.4 Test TabsContainer calls onValueChange when trigger is pressed
- [x] 3.5 Test TabsContainer disables all triggers when disabled
- [x] 3.6 Test TabsContainer supports horizontal orientation
- [x] 3.7 Test TabsContainer supports vertical orientation
- [x] 3.8 Test TabsContainer supports line variant
- [x] 3.9 Test TabsContainer supports filled variant
- [x] 3.10 Test TabsContainer supports pills variant
- [x] 3.11 Test TabsContainer forwards ViewProps
- [x] 3.12 Test TabsContainer applies custom styles
- [x] 3.13 Test TabsList renders children
- [x] 3.14 Test TabsList has tablist accessibility role
- [x] 3.15 Test TabsList applies horizontal layout by default
- [x] 3.16 Test TabsList applies vertical layout when orientation is vertical
- [x] 3.17 Test TabsList forwards ViewProps
- [x] 3.18 Test TabsList applies custom styles
- [x] 3.19 Test TabsList throws error when used outside TabsContainer
- [x] 3.20 Test TabsTrigger renders with label
- [x] 3.21 Test TabsTrigger renders with icon and label
- [x] 3.22 Test TabsTrigger shows active state with line variant
- [x] 3.23 Test TabsTrigger shows active state with filled variant
- [x] 3.24 Test TabsTrigger shows active state with pills variant
- [x] 3.25 Test TabsTrigger shows active state in vertical line variant
- [x] 3.26 Test TabsTrigger calls onValueChange when pressed
- [x] 3.27 Test TabsTrigger can be individually disabled
- [x] 3.28 Test TabsTrigger applies container disabled state
- [x] 3.29 Test TabsTrigger has tab accessibility role with selected state
- [x] 3.30 Test TabsTrigger forwards ViewProps
- [x] 3.31 Test TabsTrigger applies custom styles
- [x] 3.32 Test TabsTrigger throws error when used outside TabsContainer
- [x] 3.33 Test TabsContent renders when value matches
- [x] 3.34 Test TabsContent does not render when value does not match
- [x] 3.35 Test TabsContent renders content correctly
- [x] 3.36 Test TabsContent forwards ViewProps
- [x] 3.37 Test TabsContent applies custom styles
- [x] 3.38 Test TabsContent throws error when used outside TabsContainer
- [x] 3.39 Test integration: switches content when tab is pressed
- [x] 3.40 Test integration: works with multiple tabs

## 4. Examples

- [x] 4.1 Create examples/ directory
- [x] 4.2 Create BasicExample.tsx with controlled tabs showing product overview use case
- [x] 4.3 Create SwipeExample.tsx demonstrating pills variant with code/preview/docs tabs
- [x] 4.4 Create AdvancedExample.tsx showing vertical orientation with icons and disabled state
- [x] 4.5 Create examples/index.ts barrel export

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Import all examples at top of README.mdx
- [x] 5.3 Add Basic Usage section with interactive example
- [x] 5.4 Add Swipeable Tabs section highlighting gesture support
- [x] 5.5 Add Variants section with line, filled, and pills examples
- [x] 5.6 Add Orientations section with horizontal and vertical examples
- [x] 5.7 Add With Icons section showing icon integration
- [x] 5.8 Add Disabled State section with individual and container-level examples
- [x] 5.9 Add Advanced Example section
- [x] 5.10 Add Props tables for TabsContainer, TabsList, TabsTrigger, and TabsContent
- [x] 5.11 Add Usage Examples section with code snippet

## 6. Metadata

- [x] 6.1 Create meta.json with type="react-native"
- [x] 6.2 Add name="tabs"
- [x] 6.3 Add description="Tabbed navigation with multiple variants and orientations"
- [x] 6.4 Add dependencies array (empty - no component dependencies)
- [x] 6.5 Create index.ts barrel export with all components and types

## 7. Registry Generation

- [x] 7.1 Run `bun run generate` to update registry.json
- [x] 7.2 Verify docs-registry.ts includes tabs README.mdx
- [x] 7.3 Verify index.ts exports tabs components

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all tests passing)
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
