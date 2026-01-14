# Change: Add Badge Component

## Why

Users need a visual indicator to show notification counts, unread messages, or item quantities overlaid on icons and other elements. The Badge component provides a standard pattern for displaying numeric indicators that automatically hide when counts reach zero.

## What Changes

- Add new Badge component with 2 color variants (red, blue)
- Implement count display with configurable maxCount threshold
- Support automatic visibility based on count value (hides when <= 0)
- Include dynamic positioning based on digit count
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `badge` (new spec)
- Affected code:
  - `packages/react-native/src/badge/` (new directory with 6 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
