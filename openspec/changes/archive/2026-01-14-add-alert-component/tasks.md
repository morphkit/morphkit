# Tasks: Alert Component

Implementation checklist for the Alert component. All tasks are marked complete as this is a retroactive documentation of an existing implementation.

## 1. Theme System

- [x] 1.1 Create Alert.theme.ts with primitive token imports
- [x] 1.2 Define iconSize, padding, borderRadius, gap, contentGap, dismissHitSlop
- [x] 1.3 Define variant colors with light/dark semantic status tokens
- [x] 1.4 Export theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Alert.tsx with AlertProps TypeScript interface
- [x] 2.2 Implement useTheme() hook for theme access
- [x] 2.3 Implement variant switching (info, success, warning, error)
- [x] 2.4 Implement default icon mapping per variant using Ionicons
- [x] 2.5 Use Typography component for title (body variant) and description (footnote variant)
- [x] 2.6 Implement style merge pattern (baseStyles, theme, user style)
- [x] 2.7 Add accessibility props (accessibilityRole="alert")
- [x] 2.8 Implement dismissible button with Pressable and accessibility attributes
- [x] 2.9 Support custom icon override via icon prop
- [x] 2.10 Add displayName for debugging

## 3. Testing

- [x] 3.1 Create Alert.test.tsx with render from test-utils
- [x] 3.2 Test basic rendering without crashing
- [x] 3.3 Test title renders correctly
- [x] 3.4 Test description renders when provided
- [x] 3.5 Test description not rendered when omitted
- [x] 3.6 Test all 4 variants render correctly
- [x] 3.7 Test default icon renders for each variant
- [x] 3.8 Test custom icon renders when provided
- [x] 3.9 Test dismissible button renders when enabled
- [x] 3.10 Test dismissible button hidden when disabled
- [x] 3.11 Test onDismiss callback fires on press
- [x] 3.12 Test custom styles are applied
- [x] 3.13 Test ViewProps forwarding (testID)
- [x] 3.14 Test accessibility role is set

## 4. Examples

- [x] 4.1 Create examples/ directory
- [x] 4.2 Create DismissibleAlertsExample.tsx with state management
- [x] 4.3 Create examples/index.ts barrel export

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Import examples at top of README.mdx
- [x] 5.3 Add Basic Usage section with info variant
- [x] 5.4 Add Variants section showing all 4 semantic variants
- [x] 5.5 Add With Description section
- [x] 5.6 Add Dismissible Alerts section
- [x] 5.7 Add Form Validation Alerts section
- [x] 5.8 Add Dashboard Notifications section
- [x] 5.9 Add Error Recovery Flow section
- [x] 5.10 Add Security Alerts section
- [x] 5.11 Add Props table with all props documented
- [x] 5.12 Add Usage Examples with code snippets

## 6. Metadata

- [x] 6.1 Create meta.json with type, name, description
- [x] 6.2 Set category appropriately (feedback)
- [x] 6.3 Add empty dependencies array
- [x] 6.4 Create index.ts barrel export (Alert and AlertProps)

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
