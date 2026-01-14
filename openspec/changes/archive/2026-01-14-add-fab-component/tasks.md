## 1. Theme System

- [x] 1.1 Create Fab.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm, md, lg) with width, height, borderRadius, iconSize
- [x] 1.3 Define color variants (primary, secondary) with light/dark semantic colors
- [x] 1.4 Define offset using primitive.spacing[4]
- [x] 1.5 Define extended configuration (minWidth, gap, paddingHorizontal, fontSize, fontWeight, variant colors)
- [x] 1.6 Define animation configuration (duration, spring)
- [x] 1.7 Define disabled and hover opacity states
- [x] 1.8 Export theme with `as const` for type safety
- [x] 1.9 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Fab.tsx with FABProps TypeScript interface
- [x] 2.2 Define FABPlacement type with 6 positions
- [x] 2.3 Define FABVariant type (primary, secondary)
- [x] 2.4 Define FABSize type (sm, md, lg)
- [x] 2.5 Implement useTheme() hook for theme and colorScheme access
- [x] 2.6 Implement Animated.Value refs for scale and opacity
- [x] 2.7 Implement handlePressIn with parallel scale/opacity animations
- [x] 2.8 Implement handlePressOut with spring scale animation
- [x] 2.9 Implement getPlacementStyles() function for 6 placements
- [x] 2.10 Implement extended mode detection (label !== undefined)
- [x] 2.11 Implement variant switching logic (primary, secondary)
- [x] 2.12 Implement size handling (sm, md, lg)
- [x] 2.13 Use Typography component for extended label rendering
- [x] 2.14 Implement style merge pattern (baseStyles, theme-derived, placement, user style)
- [x] 2.15 Add accessibility props (accessibilityRole="button", accessibilityLabel, accessibilityState)
- [x] 2.16 Implement disabled state with opacity and shadow removal
- [x] 2.17 Add FAB.displayName = "FAB"

## 3. Testing

- [x] 3.1 Create Fab.test.tsx with render and fireEvent from test-utils
- [x] 3.2 Test icon renders correctly
- [x] 3.3 Test renders without label by default
- [x] 3.4 Test extended variant renders with label ("Compose")
- [x] 3.5 Test small size applies correctly
- [x] 3.6 Test medium size applies by default
- [x] 3.7 Test large size applies correctly
- [x] 3.8 Test extended size renders when label provided
- [x] 3.9 Test primary variant applies by default
- [x] 3.10 Test secondary variant applies correctly
- [x] 3.11 Test top-left placement applies correctly
- [x] 3.12 Test top-right placement applies correctly
- [x] 3.13 Test top-center placement applies correctly
- [x] 3.14 Test bottom-left placement applies correctly
- [x] 3.15 Test bottom-right placement applies by default
- [x] 3.16 Test bottom-center placement applies correctly
- [x] 3.17 Test onPress is called when pressed
- [x] 3.18 Test onPress is NOT called when disabled
- [x] 3.19 Test disabled styles apply correctly
- [x] 3.20 Test custom style prop merges correctly
- [x] 3.21 Test accessibilityRole is "button"
- [x] 3.22 Test accessibilityLabel uses label when provided
- [x] 3.23 Test explicit accessibilityLabel overrides label
- [x] 3.24 Test accessibilityState.disabled when disabled
- [x] 3.25 Test PressableProps forwarding (hitSlop)
- [x] 3.26 Test icon and label render together for extended FAB
- [x] 3.27 Test combined size, variant, and placement
- [x] 3.28 Test extended variant with all options combined

## 4. Examples

- [x] 4.1 Document basic FAB usage in README.mdx
- [x] 4.2 Document extended FAB with label in README.mdx
- [x] 4.3 Document size examples (sm, md, lg) in README.mdx
- [x] 4.4 Document variant examples (primary, secondary) in README.mdx
- [x] 4.5 Document placement examples (all 6 positions) in README.mdx
- [x] 4.6 Document disabled state in README.mdx

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Add Basic Usage section with live example
- [x] 5.3 Add Extended FAB section with live example
- [x] 5.4 Add Sizes section with live examples (sm, md, lg)
- [x] 5.5 Add Variants section with live examples (primary, secondary)
- [x] 5.6 Add Placements section with live examples (all 6 positions)
- [x] 5.7 Add Disabled State section with live example
- [x] 5.8 Add Props table with all props documented
- [x] 5.9 Add Usage Example section with code snippets
- [x] 5.10 Include CreateButton example
- [x] 5.11 Include ComposeButton extended example

## 6. Metadata

- [x] 6.1 Create meta.json with type "react-native"
- [x] 6.2 Set name to "fab"
- [x] 6.3 Set description to "Floating action button with placement options and extended variant"
- [x] 6.4 Set dependencies array to empty (no internal dependencies)
- [x] 6.5 Create index.ts barrel export with FAB and FABProps

## 7. Registry Generation

- [x] 7.1 Verify fab export in `src/theme/tokens/components.ts`
- [x] 7.2 Verify FAB export in `src/index.ts`
- [x] 7.3 Verify fab entry in `src/registry.json`
- [x] 7.4 Verify fab docs in `src/docs-registry.ts`

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier) - code formatted
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` - zero errors
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` - zero warnings
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` - all 28 FAB tests passing
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
