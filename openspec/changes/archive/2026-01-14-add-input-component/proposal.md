# Change: Add Input Component

## Why

Forms require standardized text input fields with consistent styling, validation feedback, and accessibility support across the application.

## What Changes

- Add Input component with 2 variants (outline, filled)
- Add 3 size options (sm, md, lg)
- Implement label, placeholder, and error message support
- Add prefix/suffix icon slots for visual enhancements
- Support 4 input types (text, email, password, number) with appropriate keyboard behavior
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `input` (new spec)
- Affected code:
  - `packages/react-native/src/input/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
