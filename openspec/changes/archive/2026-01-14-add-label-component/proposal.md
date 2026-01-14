# Change: Add Label Component

## Why

Forms require accessible, consistent labels to identify input fields. Users need clear visual indication of required fields and error states to complete forms accurately.

## What Changes

- Add new Label component with required indicator and error state support
- Add 3 size options (sm, md, lg) for different form contexts
- Implement theme-aware colors for light/dark mode compatibility
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `label` (new spec)
- Affected code:
  - `packages/react-native/src/label/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
