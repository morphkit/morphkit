# Change: Add Slider Component

## Why

Users need a way to select numeric values from a continuous or discrete range through an interactive, visual control. The slider provides an intuitive touch-based input for values like volume, brightness, price ranges, and ratings.

## What Changes

- Add new Slider component with single and dual thumb (range) support
- Add 3 size options (sm, md, lg) controlling thumb dimensions
- Implement controlled value handling with min/max/step constraints
- Support continuous (step=0) and discrete value selection
- Include showValue option for displaying current values above thumbs
- Support custom active track color override
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `slider` (new spec)
- Affected code:
  - `packages/react-native/src/slider/` (new directory with 6 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
