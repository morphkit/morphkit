# Change: Add Divider Component

## Why

Users need a visual separator element to create clear boundaries between content sections, improving visual hierarchy and organization in layouts.

## What Changes

- Add new Divider component with 2 orientations (horizontal, vertical)
- Support customizable thickness, color, and length
- Implement automatic theme adaptation for light and dark modes
- Include comprehensive tests (16 test cases) and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `divider` (new spec)
- Affected code:
  - `packages/react-native/src/divider/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
