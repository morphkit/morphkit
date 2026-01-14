# Change: Add FAB Component

## Why

Users need a prominent, floating action button for primary actions that remains accessible at consistent screen positions, supporting both icon-only and extended (icon + label) configurations.

## What Changes

- Add new FAB (Floating Action Button) component with 2 variants (primary, secondary)
- Add 3 size options (sm, md, lg)
- Implement 6 placement options (top-left, top-right, top-center, bottom-left, bottom-right, bottom-center)
- Implement extended variant with label support
- Implement animated press feedback with scale and opacity
- Implement disabled state with opacity styling and shadow removal
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `fab` (new spec)
- Affected code:
  - `packages/react-native/src/fab/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
