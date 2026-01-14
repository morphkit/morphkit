# Change: Add Container Component

## Why

Users need a layout component that constrains content width and provides consistent horizontal margins, ensuring readable content layouts across different screen sizes and preventing text from stretching too wide on large displays.

## What Changes

- Add new Container component with 4 max-width presets (sm, md, lg, xl)
- Support custom numeric max-width values for precise control
- Implement centered alignment option (enabled by default)
- Support safe area insets for edge-to-edge layouts
- Integrate with three-tier theme system for default padding and max-width values
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `container` (new spec)
- Affected code:
  - `packages/react-native/src/container/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
