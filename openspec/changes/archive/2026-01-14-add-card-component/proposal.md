# Change: Add Card Component

## Why

Users need a versatile content container component for grouping related information and actions with appropriate visual hierarchy through elevation, borders, and padding.

## What Changes

- Add new Card component with 4 variants (elevated, outline, ghost, filled)
- Add 3 size options (sm, md, lg)
- Implement optional press interaction with opacity feedback
- Support light/dark theme with semantic surface and border tokens
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `card` (new spec)
- Affected code:
  - `packages/react-native/src/card/` (new directory with 6 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
