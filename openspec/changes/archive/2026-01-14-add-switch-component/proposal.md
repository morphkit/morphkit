# Change: Add Switch Component

## Why

Users need a familiar toggle control for binary on/off settings throughout the application. The Switch component provides platform-native interaction patterns with smooth animated transitions for immediate visual feedback.

## What Changes

- Add new Switch component with controlled state management (checked/onChange)
- Add 3 size options (sm, md, lg) with proportional track and thumb dimensions
- Implement animated thumb transition using React Native Animated API with native driver
- Support custom track color override via color prop
- Include optional label with automatic accessibility integration
- Support disabled state with reduced opacity and interaction blocking
- Register in theme system, package exports, docs registry, and component metadata

## Impact

- Affected specs: `switch` (new spec)
- Affected code:
  - `packages/react-native/src/switch/` (new directory with 6 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
