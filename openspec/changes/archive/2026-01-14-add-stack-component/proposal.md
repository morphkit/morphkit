# Change: Add Stack Component

## Why

Applications need a consistent way to arrange UI elements with uniform spacing and predictable alignment, reducing the cognitive load of managing flexbox properties manually for common layout patterns.

## What Changes

- Add new Stack layout component with 2 direction variants (horizontal, vertical)
- Add 6 gap spacing options (none, xs, sm, md, lg, xl) mapped to primitive spacing tokens
- Implement 4 alignment options (start, center, end, stretch) for cross-axis control
- Implement 4 justification options (start, center, end, space-between) for main-axis control
- Support flex wrapping for responsive layouts
- Include comprehensive tests (20 test cases) and MDX documentation
- Register in theme tokens registry

## Impact

- Affected specs: `stack` (new spec)
- Affected code:
  - `packages/react-native/src/stack/` (new directory with 5 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
