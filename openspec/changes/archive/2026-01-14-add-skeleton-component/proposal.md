# Change: Add Skeleton Component

## Why

Loading states require visual placeholder elements that indicate content structure while data is being fetched, providing a better user experience than blank screens or generic spinners.

## What Changes

- Add new Skeleton component with 3 shape variants (rect, circle, text)
- Implement animated shimmer effect for visual feedback during loading
- Support customizable dimensions via width and height props
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `skeleton` (new spec)
- Affected code:
  - `packages/react-native/src/skeleton/` (new directory with 5 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
