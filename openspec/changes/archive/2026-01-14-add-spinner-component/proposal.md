# Change: Add Spinner Component

## Why

Applications frequently need to communicate loading states to users during asynchronous operations like data fetching, form submissions, or content processing. A dedicated spinner component provides consistent visual feedback across the application.

## What Changes

- Add new Spinner component with animated 360-degree continuous rotation
- Add 3 preset sizes (sm: 16px, md: 24px, lg: 32px) plus custom numeric sizing
- Implement theme-aware color with optional override
- Implement accessibility with progressbar role and "Loading" label
- Include comprehensive tests and MDX documentation
- Register in theme tokens and component exports

## Impact

- Affected specs: `spinner` (new spec)
- Affected code:
  - `packages/react-native/src/spinner/` (new directory with 6 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
