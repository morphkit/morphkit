# Change: Add Select Component

## Why

Users need a flexible inline selection mechanism for choosing one or more options from visible choices with fully customizable styling. Unlike dropdown selects, this component displays all options simultaneously, allowing users to make selections directly from a visible list with custom visual presentation.

## What Changes

- Add new Select compound component with single and multiple selection modes
- Add SelectOption child component for individual option handling
- Implement Context API for parent-child communication
- Support controlled component pattern with value/onChange
- Include comprehensive tests (26 test cases) and MDX documentation
- Register in theme tokens, package exports, docs registry, and metadata registry

## Impact

- Affected specs: `select` (new spec)
- Affected code:
  - `packages/react-native/src/select/` (new directory with 6 files)
  - `packages/react-native/src/select/Select.tsx` (main component and SelectOption)
  - `packages/react-native/src/select/Select.theme.ts` (theme tokens)
  - `packages/react-native/src/select/Select.test.tsx` (26 test cases)
  - `packages/react-native/src/select/index.ts` (barrel exports)
  - `packages/react-native/src/select/meta.json` (component metadata)
  - `packages/react-native/src/select/README.mdx` (comprehensive documentation)
  - `packages/react-native/src/theme/tokens/components.ts` (theme export)
  - `packages/react-native/src/index.ts` (component export)
  - `packages/react-native/src/docs-registry.ts` (MDX docs registration)
  - `packages/react-native/src/registry.json` (component metadata)
