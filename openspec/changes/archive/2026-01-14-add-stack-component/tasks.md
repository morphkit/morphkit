# Stack Component Implementation Tasks

## 1. Theme System

- [x] 1.1 Create Stack.theme.ts with primitive token imports
- [x] 1.2 Define gap variants using primitive spacing tokens (none, xs, sm, md, lg, xl)
- [x] 1.3 Export theme with `as const` for type safety
- [x] 1.4 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Stack.tsx with TypeScript interface (StackProps)
- [x] 2.2 Implement useTheme() hook for theme access
- [x] 2.3 Implement direction switching logic (horizontal/vertical)
- [x] 2.4 Implement gap handling with theme token lookup
- [x] 2.5 Implement alignment mapping (start/center/end/stretch to flex values)
- [x] 2.6 Implement justification mapping (start/center/end/space-between to flex values)
- [x] 2.7 Implement wrap prop for flex wrapping
- [x] 2.8 Implement style merge pattern (base, direction, dynamic, user)
- [x] 2.9 Forward ViewProps to underlying View component
- [x] 2.10 Export types (StackDirection, StackAlign, StackJustify, StackGap)

## 3. Testing

- [x] 3.1 Create Stack.test.tsx with render from test-utils
- [x] 3.2 Test basic rendering with children
- [x] 3.3 Test vertical direction by default (flexDirection: column)
- [x] 3.4 Test horizontal direction (flexDirection: row)
- [x] 3.5 Test default gap of 8px (sm)
- [x] 3.6 Test custom gap value (md = 16px)
- [x] 3.7 Test stretch alignment by default
- [x] 3.8 Test start alignment (alignItems: flex-start)
- [x] 3.9 Test center alignment (alignItems: center)
- [x] 3.10 Test end alignment (alignItems: flex-end)
- [x] 3.11 Test start justification by default
- [x] 3.12 Test center justification
- [x] 3.13 Test end justification
- [x] 3.14 Test space-between justification
- [x] 3.15 Test nowrap by default
- [x] 3.16 Test wrap when specified
- [x] 3.17 Test all props combined
- [x] 3.18 Test custom style prop merging
- [x] 3.19 Test ViewProps forwarding (testID)
- [x] 3.20 Test rendering without children

## 4. Examples

- [x] 4.1 Document basic usage in README.mdx
- [x] 4.2 Document vertical direction example
- [x] 4.3 Document horizontal direction example
- [x] 4.4 Document gap spacing examples (4px, 8px, 16px, 24px)
- [x] 4.5 Document alignment examples (start, center, end, stretch)
- [x] 4.6 Document justification examples (start, center, end, space-between)
- [x] 4.7 Document wrap behavior example
- [x] 4.8 Document complex layout example (Profile Card)

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Add Basic Usage section
- [x] 5.3 Add Direction section with examples
- [x] 5.4 Add Gap Spacing section with examples
- [x] 5.5 Add Alignment section with examples
- [x] 5.6 Add Justification section with examples
- [x] 5.7 Add Wrap section with example
- [x] 5.8 Add Complex Layout Example section
- [x] 5.9 Add Props table with all props documented
- [x] 5.10 Add Usage Examples section with code snippets
- [x] 5.11 Add Behavior Notes section

## 6. Metadata

- [x] 6.1 Create meta.json with type, name, description
- [x] 6.2 Add empty dependencies array (no component dependencies)
- [x] 6.3 Create index.ts barrel export (Stack and StackProps)

## 7. Registry Generation

- [x] 7.1 Add theme export to components.ts (stack theme)
- [x] 7.2 Verify registry.json includes stack component
- [x] 7.3 Verify docs-registry.ts includes stack documentation
- [x] 7.4 Verify index.ts exports stack component

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all 20 stack tests passing)
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
