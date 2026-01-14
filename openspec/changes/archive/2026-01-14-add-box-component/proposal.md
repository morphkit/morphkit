# Change: Add Box Component

## Why

Applications need a flexible container component that provides declarative control over layout, spacing, and styling without writing custom styles. The Box component serves as the fundamental building block for constructing complex layouts using composition.

## What Changes

- Add new Box component with flexible container capabilities
- Implement spacing props (padding, margin) supporting both uniform values and per-side objects
- Implement flexbox layout props (flex, flexDirection, justifyContent, alignItems)
- Implement gap prop with semantic size tokens (none, xs, sm, md, lg, xl)
- Implement border props (borderRadius, borderWidth, borderColor)
- Implement backgroundColor prop for surface coloring
- Include comprehensive tests covering all props and combinations
- Include MDX documentation with usage examples

## Impact

- Affected specs: `box` (new spec)
- Affected code:
  - `packages/react-native/src/box/` (new directory with component files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
