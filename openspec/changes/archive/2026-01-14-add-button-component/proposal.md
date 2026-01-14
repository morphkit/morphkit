# Change: Add Button Component

## Why

Users need a flexible, accessible button component for triggering actions and navigation throughout the application.

## What Changes

- Add new Button component with 4 variants (primary, secondary, tonal, plain)
- Add 5 size options (none, sm, md, lg, icon)
- Implement icon support (iconLeft, iconRight, iconAbsoluteLeft, iconAbsoluteRight)
- Implement loading state with Spinner overlay
- Implement disabled state with opacity styling
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `button` (new spec)
- Affected code:
  - `packages/react-native/src/button/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
