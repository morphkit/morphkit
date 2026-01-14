## 1. Theme System

- [x] 1.1 Create Tag.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm: 20px, md: 24px, lg: 32px minHeight)
- [x] 1.3 Define color variants with light/dark semantic colors (primary, secondary, outline, success, warning, error, info)
- [x] 1.4 Export theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Tag.tsx with TypeScript interface (TagProps)
- [x] 2.2 Implement useTheme() hook for theme access
- [x] 2.3 Implement variant switching logic with default mapping to secondary
- [x] 2.4 Implement size handling with dynamic padding and minHeight
- [x] 2.5 Use Typography component with variant="callout" for text
- [x] 2.6 Implement style merge pattern (baseStyles, themeStyles, customStyle)
- [x] 2.7 Add accessibility props (role: text for non-dismissible)
- [x] 2.8 Implement dismissible functionality with Pressable close button
- [x] 2.9 Add Ionicons close icon for dismiss button
- [x] 2.10 Implement hitSlop for enlarged touch target
- [x] 2.11 Set displayName to "Tag"

## 3. Testing

- [x] 3.1 Create Tag.test.tsx with render from test-utils
- [x] 3.2 Test basic rendering without crashing
- [x] 3.3 Test children content rendering
- [x] 3.4 Test all 5 variants render correctly (default, primary, success, warning, error)
- [x] 3.5 Test all 3 sizes render correctly (sm, md, lg)
- [x] 3.6 Test dismissible tag renders dismiss button
- [x] 3.7 Test non-dismissible tag does not render dismiss button
- [x] 3.8 Test onDismiss callback fires on button press
- [x] 3.9 Test custom styles are applied
- [x] 3.10 Test ViewProps forwarding (testID)
- [x] 3.11 Test ReactNode children rendering

## 4. Examples

- [x] 4.1 Create examples/ directory
- [x] 4.2 Create FilterTagsExample.tsx showing interactive filter chips
- [x] 4.3 Create examples/index.ts barrel export

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Import FilterTagsExample at top of README.mdx
- [x] 5.3 Add Basic Usage section
- [x] 5.4 Add Variants section showing all 5 variants with semantic descriptions
- [x] 5.5 Add Sizes section showing all 3 sizes
- [x] 5.6 Add Dismissible Tags section with examples
- [x] 5.7 Add Product Card with Tags real-world example
- [x] 5.8 Add User Profile with Role Tags real-world example
- [x] 5.9 Add Filter Tags Example section with interactive component
- [x] 5.10 Add Status Dashboard real-world example
- [x] 5.11 Add Props table with all props documented
- [x] 5.12 Add Usage Examples with code snippets (Product Status, User Role, Dismissible Filters, Status Indicator)

## 6. Metadata

- [x] 6.1 Create meta.json with type: "react-native"
- [x] 6.2 Add name: "tag"
- [x] 6.3 Add description: "Small pill-shaped label for categorization with 5 color variants, 3 sizes, and optional dismiss functionality"
- [x] 6.4 Add dependencies array (empty - no component dependencies)
- [x] 6.5 Create index.ts barrel export (Tag and TagProps)

## 7. Registry Generation

- [x] 7.1 Component registered in registry.json
- [x] 7.2 Component documentation registered in docs-registry.ts
- [x] 7.3 Component exported from index.ts barrel

## 8. Verification

- [x] 8.1 Code formatted with Prettier
- [x] 8.2 TypeScript type checking passes (zero errors)
- [x] 8.3 ESLint passes (zero warnings)
- [x] 8.4 All 10 tests pass
- [x] 8.5 Component appears in demo app sidebar
- [x] 8.6 Documentation loads correctly in demo app
