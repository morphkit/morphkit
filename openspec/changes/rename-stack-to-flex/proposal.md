# Change: Rename Stack Component to Flex

## Why

The current Stack component is a flexbox layout utility, but "Stack" creates naming confusion with expo-router's Stack navigator. Renaming to "Flex" clarifies its purpose (flexbox layout container) and frees up "Stack" for navigation-related components.

## What Changes

- **BREAKING** Rename Stack component to Flex
- Move all files from `src/stack/` to `src/flex/`
- Update component name from Stack to Flex in all code and exports
- Update theme tokens from `theme.component.stack` to `theme.component.flex`
- Update documentation and examples to use Flex
- Update registry entries

## Impact

- Affected specs: `stack` (renamed to `flex`)
- Affected code:
  - `packages/react-native/src/stack/` → `packages/react-native/src/flex/`
  - `packages/react-native/src/theme/tokens/components.ts` (rename export)
  - `packages/react-native/src/index.ts` (rename export)
  - `packages/react-native/src/docs-registry.ts` (rename MDX import)
  - `packages/react-native/src/registry.json` (rename entry)
  - Any internal usage of Stack component
