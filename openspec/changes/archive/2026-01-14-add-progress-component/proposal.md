# Change: Add Progress Component

## Why

Users need a visual progress indicator to communicate completion status for tasks, file uploads, form steps, and operations with measurable progress. Support for both determinate (known percentage) and indeterminate (unknown duration) states is essential for diverse loading scenarios.

## What Changes

- Add new Progress component with 2 variants (bar, circle)
- Add 3 size options (sm, md, lg)
- Implement determinate mode with value prop (0-100)
- Implement indeterminate mode with animated looping
- Implement optional value display with showValue prop
- Implement custom color override
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `progress` (new spec)
- Affected code:
  - `packages/react-native/src/progress/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
