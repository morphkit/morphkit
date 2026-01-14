# Change: Add Tag Component

## Why

Users need a compact, pill-shaped label component to display categorization, status, and metadata with clear visual distinction and optional dismiss functionality for interactive filtering use cases.

## What Changes

- Add new Tag component with 5 color variants (default, primary, success, warning, error)
- Add 3 size options (sm, md, lg)
- Implement optional dismissible functionality with close button
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `tag` (new spec)
- Affected code:
  - `packages/react-native/src/tag/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
