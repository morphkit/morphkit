# Change: Add Checkbox Component

## Why

Forms require a reliable way to capture boolean input with clear visual feedback for checked, unchecked, and indeterminate states.

## What Changes

- Add new Checkbox component with 3 visual states (checked, unchecked, indeterminate)
- Add 3 size options (sm, md, lg)
- Implement custom color override for brand customization
- Support disabled state with reduced opacity
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `checkbox` (new spec)
- Affected code:
  - `packages/react-native/src/checkbox/` (new directory with 6 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
