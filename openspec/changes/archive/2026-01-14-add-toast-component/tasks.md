## 1. Theme System

- [x] 1.1 Create Toast.theme.ts with primitive token imports
- [x] 1.2 Define padding using primitive.spacing[4]
- [x] 1.3 Define borderRadius using primitive.borderRadius.lg
- [x] 1.4 Define gap using primitive.spacing[2]
- [x] 1.5 Define iconSize as 20px
- [x] 1.6 Define position.offset using primitive.spacing[12]
- [x] 1.7 Define position.horizontal using primitive.spacing[4]
- [x] 1.8 Define animation.spring using primitive.spring.gentle
- [x] 1.9 Define animation.duration using primitive.duration.normal
- [x] 1.10 Define color variants (info, success, warning, error) with light/dark semantic status tokens
- [x] 1.11 Define shadow using primitive.shadowPresets.lg
- [x] 1.12 Export theme with `as const` for type safety
- [x] 1.13 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Toast.tsx with ToastProps TypeScript interface
- [x] 2.2 Define ToastVariant type as union of "info" | "success" | "warning" | "error"
- [x] 2.3 Define ToastPosition type as union of "top" | "bottom"
- [x] 2.4 Implement useTheme() hook for theme and colorScheme access
- [x] 2.5 Implement Animated.Value ref for slide animation
- [x] 2.6 Implement useEffect for entrance animation with Animated.spring
- [x] 2.7 Implement useEffect for exit animation with Animated.timing
- [x] 2.8 Implement auto-dismiss timer with setTimeout
- [x] 2.9 Implement timer cleanup on unmount or visibility change
- [x] 2.10 Implement translateY interpolation based on position
- [x] 2.11 Implement visibility check returning null when not visible
- [x] 2.12 Use Typography component for message text
- [x] 2.13 Implement variant-specific icon rendering with Ionicons
- [x] 2.14 Implement style merge pattern (baseStyles, theme-derived, user style)
- [x] 2.15 Add accessibility props (accessibilityRole="alert", accessibilityLiveRegion="polite")
- [x] 2.16 Add displayName for debugging

## 3. Testing

- [x] 3.1 Create Toast.test.tsx with render from test-utils
- [x] 3.2 Test basic rendering when visible={true}
- [x] 3.3 Test returns null when visible={false}
- [x] 3.4 Test message text renders correctly
- [x] 3.5 Test info variant renders correctly
- [x] 3.6 Test success variant renders correctly
- [x] 3.7 Test warning variant renders correctly
- [x] 3.8 Test error variant renders correctly
- [x] 3.9 Test top position renders correctly
- [x] 3.10 Test bottom position renders correctly (default)
- [x] 3.11 Test onDismiss called after custom duration (100ms)
- [x] 3.12 Test onDismiss NOT called when duration is 0
- [x] 3.13 Test default duration of 3000ms
- [x] 3.14 Test custom styles are applied
- [x] 3.15 Test ViewProps like testID are forwarded
- [x] 3.16 Test accessibility attributes are present

## 4. Examples

- [x] 4.1 Document basic usage example in README.mdx
- [x] 4.2 Document all 4 variants example in README.mdx
- [x] 4.3 Document position examples in README.mdx (top, bottom)
- [x] 4.4 Document integration example with button and state management

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Add Basic Usage section with live example
- [x] 5.3 Add Variants section with all 4 variants displayed
- [x] 5.4 Add Positions section with top and bottom examples
- [x] 5.5 Add Props table with all props documented
- [x] 5.6 Add Usage Example section with code snippet
- [x] 5.7 Include integration example with useState and Button

## 6. Metadata

- [x] 6.1 Create meta.json with type "react-native"
- [x] 6.2 Set name to "toast"
- [x] 6.3 Set description to "Temporary notification component with slide-in animation, 4 variants, top or bottom positioning, and auto-dismiss capability"
- [x] 6.4 Set dependencies array to empty (no internal dependencies)
- [x] 6.5 Create index.ts barrel export with Toast and ToastProps

## 7. Registry Generation

- [x] 7.1 Verify toast export in `src/theme/tokens/components.ts`
- [x] 7.2 Verify Toast export in `src/index.ts`
- [x] 7.3 Verify toast entry in `src/registry.json`
- [x] 7.4 Verify toast docs in `src/docs-registry.ts`

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier) - code formatted
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` - zero errors
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` - zero warnings
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` - all 16 toast tests passing
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
