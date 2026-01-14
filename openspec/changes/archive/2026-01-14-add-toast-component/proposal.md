# Change: Add Toast Component

## Why

Users need a non-intrusive notification component to display temporary feedback messages for actions, errors, warnings, and informational alerts without blocking the main interface.

## What Changes

- Add new Toast component with 4 variants (info, success, warning, error)
- Add 2 position options (top, bottom)
- Implement slide-in animation with spring physics and fade-out transition
- Implement auto-dismiss functionality with configurable duration
- Implement variant-specific icons using Ionicons
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `toast` (new spec)
- Affected code:
  - `packages/react-native/src/toast/` (new directory with 6 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
