# Change: Add Tabs Component

## Why

Applications need a way to organize related content into switchable panels, allowing users to navigate between different sections without leaving the current view. Tabs provide a familiar, space-efficient navigation pattern for segmenting content.

## What Changes

- Add new Tabs compound component system with 4 sub-components (TabsContainer, TabsList, TabsTrigger, TabsContent)
- Add 3 visual variants (line, filled, pills)
- Add 2 orientation options (horizontal, vertical)
- Implement swipe gesture support for horizontal tabs using PanResponder
- Implement controlled state management via Context API
- Include comprehensive tests with 54 test cases and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `tabs` (new spec)
- Affected code:
  - `packages/react-native/src/tabs/` (new directory with 7+ files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
