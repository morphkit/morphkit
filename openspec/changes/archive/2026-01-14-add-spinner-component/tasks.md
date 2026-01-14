# Spinner Component Implementation Tasks

## 1. Theme System

- [x] 1.1 Create Spinner.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm: 16, md: 24, lg: 32)
- [x] 1.3 Define strokeWidth variants (sm: 2, md: 3, lg: 4)
- [x] 1.4 Define duration using primitive.duration.slow (1000ms)
- [x] 1.5 Define color variants with light/dark semantic colors (light.action.primary, dark.action.primary)
- [x] 1.6 Export theme with `as const` for type safety
- [x] 1.7 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Spinner.tsx with TypeScript interface (SpinnerProps)
- [x] 2.2 Extend Omit<ViewProps, "children"> for prop inheritance
- [x] 2.3 Implement useTheme() hook for theme access
- [x] 2.4 Implement size handling (preset strings and numeric values)
- [x] 2.5 Implement strokeWidth calculation based on size type
- [x] 2.6 Implement color with theme fallback and custom override
- [x] 2.7 Create Animated.Value ref with useRef
- [x] 2.8 Implement Animated.loop with timing and linear easing
- [x] 2.9 Implement rotation interpolation (0deg to 360deg)
- [x] 2.10 Enable useNativeDriver for performance
- [x] 2.11 Implement style merge pattern (base, theme, user)
- [x] 2.12 Add accessibility props (role: progressbar, label: Loading)
- [x] 2.13 Add displayName for debugging

## 3. Testing

- [x] 3.1 Create Spinner.test.tsx with render from test-utils
- [x] 3.2 Test basic rendering without crashing
- [x] 3.3 Test default md size renders
- [x] 3.4 Test sm size renders
- [x] 3.5 Test lg size renders
- [x] 3.6 Test custom numeric size renders
- [x] 3.7 Test custom color renders
- [x] 3.8 Test custom styles apply
- [x] 3.9 Test ViewProps forwarding (testID)
- [x] 3.10 Test accessibility attributes (getByLabelText "Loading")

## 4. Examples

- [ ] 4.1 Create examples/ directory (not implemented - examples inline in README.mdx)
- [ ] 4.2 Create BasicExample.tsx (not implemented)
- [ ] 4.3 Create SizesExample.tsx (not implemented)
- [ ] 4.4 Create ColorsExample.tsx (not implemented)
- [ ] 4.5 Create LoadingStateExample.tsx (not implemented)
- [ ] 4.6 Create examples/index.ts barrel export (not implemented)

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Add Basic Usage section with default spinner
- [x] 5.3 Add Sizes section showing sm, md, lg, and custom numeric
- [x] 5.4 Add Custom Colors section with color examples
- [x] 5.5 Add Loading State Example showing composition with Card/Stack/Typography
- [x] 5.6 Add Props table with type, default, and description
- [x] 5.7 Add Usage Examples section with code snippets

## 6. Metadata

- [x] 6.1 Create meta.json with type: react-native
- [x] 6.2 Add name: spinner
- [x] 6.3 Add description with component summary
- [x] 6.4 Add dependencies array (empty - no component dependencies)
- [x] 6.5 Create index.ts barrel export (Spinner and SpinnerProps)

## 7. Registry Generation

- [x] 7.1 Verify spinner exported in src/theme/tokens/components.ts
- [x] 7.2 Verify spinner in registry.json
- [x] 7.3 Verify spinner in docs-registry.ts
- [x] 7.4 Verify spinner exported from src/index.ts

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all tests passing)
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
