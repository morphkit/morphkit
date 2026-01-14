## 1. Theme System

- [x] 1.1 Create Textarea.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm, md, lg) using primitive spacing/typography
- [x] 1.3 Define color variants with light/dark semantic colors for default, focus, error, disabled, label, and count states
- [x] 1.4 Export theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Textarea.tsx with TypeScript interface (TextareaProps extending TextInputProps)
- [x] 2.2 Implement useTheme() hook for theme access
- [x] 2.3 Implement size variant switching logic (sm, md, lg)
- [x] 2.4 Implement auto-resize feature with onContentSizeChange handler
- [x] 2.5 Implement character count display with showCount and maxLength
- [x] 2.6 Implement rows configuration for initial height calculation
- [x] 2.7 Implement label rendering with theme tokens
- [x] 2.8 Implement error state with border color change and error message
- [x] 2.9 Implement disabled state with reduced opacity and editable=false
- [x] 2.10 Implement focus state with isFocused state and border color change
- [x] 2.11 Use style merge pattern (base styles, theme-derived, user overrides)
- [x] 2.12 Add accessibility props (accessibilityLabel from label or name, accessibilityLiveRegion for errors)
- [x] 2.13 Implement forwardRef for ref support to underlying TextInput
- [x] 2.14 Forward TextInputProps to underlying TextInput

## 3. Testing

- [x] 3.1 Create Textarea.test.tsx with customRender from test-utils
- [x] 3.2 Test basic rendering with value displayed
- [x] 3.3 Test onChange is called when text changes
- [x] 3.4 Test onBlur is called when textarea loses focus
- [x] 3.5 Test ref forwarding to TextInput
- [x] 3.6 Test name prop acceptance
- [x] 3.7 Test accessibilityLabel from name when label not provided
- [x] 3.8 Test accessibilityLabel prefers label over name
- [x] 3.9 Test label rendering
- [x] 3.10 Test placeholder rendering
- [x] 3.11 Test error message rendering
- [x] 3.12 Test disabled state (editable=false)
- [x] 3.13 Test character count without maxLength
- [x] 3.14 Test character count with maxLength format
- [x] 3.15 Test maxLength enforcement on TextInput
- [x] 3.16 Test custom rows configuration
- [x] 3.17 Test autoResize prop
- [x] 3.18 Test small size variant
- [x] 3.19 Test medium size variant (default)
- [x] 3.20 Test large size variant
- [x] 3.21 Test custom style application
- [x] 3.22 Test TextInputProps forwarding (testID, autoCapitalize)
- [x] 3.23 Test accessibilityLabel from label prop
- [x] 3.24 Test multiline is always true

## 4. Examples

- [x] 4.1 Document Basic usage example in README.mdx
- [x] 4.2 Document Character Count example with showCount and maxLength
- [x] 4.3 Document Auto Resize example
- [x] 4.4 Document Rows configuration example
- [x] 4.5 Document Sizes example (sm, md, lg)
- [x] 4.6 Document Error State example
- [x] 4.7 Document Disabled State example
- [x] 4.8 Document Combined Features example

## 5. Documentation

- [x] 5.1 Create README.mdx with component title and description
- [x] 5.2 Add Import section with correct import path
- [x] 5.3 Add Usage sections with live examples and code blocks
- [x] 5.4 Add Props table documenting all props with types, defaults, and descriptions
- [x] 5.5 Add Accessibility section documenting accessibilityLabel and accessibilityLiveRegion
- [x] 5.6 Add Theme Support section documenting light/dark mode colors
- [x] 5.7 Add Best Practices section with guidance on rows, character limits, auto resize

## 6. Metadata

- [x] 6.1 Create meta.json with type="react-native", name="textarea"
- [x] 6.2 Add description field describing multi-line text input with auto-resize and character count
- [x] 6.3 Add dependencies array (empty - no internal dependencies)
- [x] 6.4 Create index.ts barrel export with Textarea and TextareaProps

## 7. Registry Generation

- [x] 7.1 Run `bun run generate` to update all registries (registry.json, docs-registry.ts, index.ts)

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all 23 textarea tests passing)
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
