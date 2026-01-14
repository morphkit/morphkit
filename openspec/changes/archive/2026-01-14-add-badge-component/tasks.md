# Tasks: Badge Component Implementation

## 1. Theme System

- [x] 1.1 Create Badge.theme.ts with primitive token imports
- [x] 1.2 Define dimension tokens (minWidth: 20, height: 20)
- [x] 1.3 Define position tokens (top: -6, right variants for 1/2/3+ digits)
- [x] 1.4 Define color variants with light/dark semantic colors (primary, secondary, success, warning, error, info)
- [x] 1.5 Export theme with `as const` for type safety
- [x] 1.6 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Badge.tsx with TypeScript interface (BadgeProps)
- [x] 2.2 Implement useTheme() hook for theme access
- [x] 2.3 Implement color variant switching (red maps to error, blue maps to primary)
- [x] 2.4 Implement count display logic with maxCount threshold
- [x] 2.5 Implement automatic visibility (shouldShowBadge = count > 0)
- [x] 2.6 Implement dynamic positioning based on digit count
- [x] 2.7 Use Typography component with "caption-1" variant for count text
- [x] 2.8 Implement style merge pattern (baseStyles, theme, user)
- [x] 2.9 Add accessibility props (accessibilityLabel for notification count)

## 3. Testing

- [x] 3.1 Create Badge.test.tsx with render from test-utils
- [x] 3.2 Test basic rendering with children
- [x] 3.3 Test count display for values below maxCount
- [x] 3.4 Test count display with maxCount+ format when exceeded
- [x] 3.5 Test default maxCount of 99
- [x] 3.6 Test hidden badge when count is 0
- [x] 3.7 Test hidden badge when count is negative
- [x] 3.8 Test red color (default) application
- [x] 3.9 Test blue color variant application
- [x] 3.10 Test style merge with custom style prop
- [x] 3.11 Test absolute positioning of badge indicator
- [x] 3.12 Test accessibility label presence when visible
- [x] 3.13 Test accessibility label absence when hidden
- [x] 3.14 Test single, double, and large count handling

## 4. Examples

- [x] 4.1 Examples embedded directly in README.mdx (no separate examples directory)
- [x] 4.2 Basic usage example with notification icon
- [x] 4.3 Color variants example (red and blue)
- [x] 4.4 Max count threshold example
- [x] 4.5 Hidden badge example (zero and negative counts)
- [x] 4.6 Shopping cart real-world example
- [x] 4.7 Notification panel real-world example

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Add Basic Usage section with inline example
- [x] 5.3 Add Color Variants section showing red/blue
- [x] 5.4 Add Max Count Threshold section
- [x] 5.5 Add Hidden Badge section
- [x] 5.6 Add Shopping Cart Example (real-world)
- [x] 5.7 Add Notification Panel Example (real-world)
- [x] 5.8 Add Props table with all props documented
- [x] 5.9 Add Usage Examples section with code snippets

## 6. Metadata

- [x] 6.1 Create meta.json with type "react-native"
- [x] 6.2 Add name "badge"
- [x] 6.3 Add description for notification badge overlay
- [x] 6.4 Add dependencies array (empty - no component dependencies)
- [x] 6.5 Create index.ts barrel export (Badge component and BadgeProps type)

## 7. Registry Generation

- [x] 7.1 Badge theme exported in src/theme/tokens/components.ts
- [x] 7.2 Badge component exported in src/index.ts
- [x] 7.3 Badge documentation registered in src/docs-registry.ts
- [x] 7.4 Badge metadata present in src/registry.json

## 8. Verification

- [x] 8.1 Code formatted with Prettier
- [x] 8.2 TypeScript check passes (zero errors)
- [x] 8.3 ESLint passes (zero warnings)
- [x] 8.4 All 17 Badge tests passing
- [x] 8.5 Component appears in demo app sidebar
- [x] 8.6 Documentation loads correctly in demo app
