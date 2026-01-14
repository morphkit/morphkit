# Select Component Implementation Tasks

## 1. Theme System

- [x] 1.1 Create Select.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm, md, lg) using primitive spacing/typography tokens
- [x] 1.3 Define color variants with light/dark semantic colors for default, filled, focus, error, disabled, label states
- [x] 1.4 Export theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Select.tsx with TypeScript interfaces (SelectProps, SelectOptionProps, SelectContextValue)
- [x] 2.2 Implement SelectContext with createContext and useSelectContext hook
- [x] 2.3 Implement Select component with Context.Provider wrapper
- [x] 2.4 Implement SelectOption with forwardRef for ref support
- [x] 2.5 Implement single selection mode (value as string, direct replacement)
- [x] 2.6 Implement multiple selection mode (value as string[], toggle logic)
- [x] 2.7 Implement disabled state at Select level (propagated via context)
- [x] 2.8 Implement disabled state at SelectOption level (merged with context)
- [x] 2.9 Add accessibility props (accessibilityRole="radiogroup" on Select, accessibilityRole="radio" on SelectOption)
- [x] 2.10 Add accessibilityState with checked and disabled states
- [x] 2.11 Implement onBlur handling (context onBlur + option onBlur)
- [x] 2.12 Set SelectOption.displayName for React DevTools
- [x] 2.13 Support style prop with ViewStyle type on both components
- [x] 2.14 Forward ViewProps to container elements

## 3. Testing

- [x] 3.1 Create Select.test.tsx with render from test-utils
- [x] 3.2 Test Select renders children correctly
- [x] 3.3 Test Select provides value to context (checked state)
- [x] 3.4 Test onChange called when option pressed
- [x] 3.5 Test Select disabled prop disables all options
- [x] 3.6 Test single selection mode behavior
- [x] 3.7 Test multiple selection mode - adding selection
- [x] 3.8 Test multiple selection mode - removing selection (toggle)
- [x] 3.9 Test ViewProps forwarding on Select (testID)
- [x] 3.10 Test onBlur callback on Select
- [x] 3.11 Test name prop acceptance on Select
- [x] 3.12 Test SelectOption renders with children
- [x] 3.13 Test SelectOption renders without children
- [x] 3.14 Test SelectOption selected state in single mode
- [x] 3.15 Test SelectOption selected state in multiple mode
- [x] 3.16 Test SelectOption unselected state
- [x] 3.17 Test SelectOption toggle in multiple mode
- [x] 3.18 Test SelectOption add in multiple mode
- [x] 3.19 Test SelectOption replace in single mode
- [x] 3.20 Test SelectOption individual disabled
- [x] 3.21 Test SelectOption custom styles
- [x] 3.22 Test SelectOption ViewProps forwarding (testID)
- [x] 3.23 Test SelectOption ref forwarding
- [x] 3.24 Test SelectOption onBlur callback
- [x] 3.25 Test SelectOption name prop acceptance
- [x] 3.26 Test SelectOption throws error outside Select context

## 4. Examples

- [x] 4.1 Create basic single selection example in README.mdx
- [x] 4.2 Create multiple selection example in README.mdx
- [x] 4.3 Create visual selection state example in README.mdx
- [x] 4.4 Create disabled options example in README.mdx
- [x] 4.5 Create disabled Select example in README.mdx
- [x] 4.6 Create dynamic options from data example in README.mdx
- [x] 4.7 Create common patterns section (tier selection, contact selection, simple text)

## 5. Documentation

- [x] 5.1 Create README.mdx with brief description (flexible inline selection component)
- [x] 5.2 Add import statement example
- [x] 5.3 Add Usage section with live examples and code blocks
- [x] 5.4 Add Props section with tables for Select and SelectOption
- [x] 5.5 Add Accessibility section explaining ARIA roles and states
- [x] 5.6 Add Best Practices section with 6 key guidelines
- [x] 5.7 Add Common Patterns section with tier, contact, and simple text examples
- [x] 5.8 Add Important Notes section explaining key behaviors

## 6. Metadata

- [x] 6.1 Create meta.json with type "react-native"
- [x] 6.2 Add name "select" to meta.json
- [x] 6.3 Add description to meta.json
- [x] 6.4 Add empty dependencies array (component has no internal dependencies)
- [x] 6.5 Create index.ts barrel export (Select, SelectOption, SelectProps, SelectOptionProps)

## 7. Registry Generation

- [x] 7.1 Run `bun run generate` to update registry.json
- [x] 7.2 Verify component appears in registry.json
- [x] 7.3 Run `bun run generate` to update docs-registry.ts
- [x] 7.4 Verify README.mdx is registered in docs-registry.ts
- [x] 7.5 Run `bun run generate` to update index.ts exports
- [x] 7.6 Verify Select exported from package index

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all 26 Select tests passing)
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
