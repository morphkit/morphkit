# Change: Add Alert Component

## Why

Users need a standardized way to display inline notifications for important messages, warnings, errors, and success states with consistent styling and accessibility across the application.

## What Changes

- Add new Alert component with 4 variants (info, success, warning, error)
- Implement optional dismiss button with onDismiss callback
- Support custom icons with automatic variant-based defaults
- Include title and optional description text
- Provide comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `alert` (new spec)
- Affected code:
  - `packages/react-native/src/alert/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
