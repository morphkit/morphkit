# Change: Add Radio Component

## Why

Users need a single-selection input control that enforces mutually exclusive choices within a group. The Radio component provides clear visual indication of selection state and group membership, essential for forms requiring one choice from a defined set of options.

## What Changes

- Add RadioGroup compound component for managing single selection state
- Add RadioButton component with 3 size options (sm, md, lg)
- Implement group-level and individual disabled states
- Support controlled selection via value/onChange pattern
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `radio` (new spec)
- Affected code:
  - `packages/react-native/src/radio/` (new directory with 6 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
