# Change: Add Textarea Component

## Why

Applications require multi-line text input fields for longer content entry such as descriptions, comments, reviews, and notes. The textarea component provides an expanded input area with auto-resize capability and character count display to guide users on content length.

## What Changes

- Add new Textarea component with 3 size options (sm, md, lg)
- Implement auto-resize feature that expands height as content grows
- Implement character count display with optional maxLength indicator
- Support configurable rows for initial height
- Include label, placeholder, error, and disabled states
- Integrate with three-tier theme system (primitive, semantic, component tokens)
- Include comprehensive tests (23 test cases) and MDX documentation
- Register in component and docs registries

## Impact

- Affected specs: `textarea` (new spec)
- Affected code:
  - `packages/react-native/src/textarea/` (new directory with component files)
  - `packages/react-native/src/textarea/Textarea.tsx` (component implementation)
  - `packages/react-native/src/textarea/Textarea.theme.ts` (theme tokens)
  - `packages/react-native/src/textarea/Textarea.test.tsx` (test suite)
  - `packages/react-native/src/textarea/meta.json` (component metadata)
  - `packages/react-native/src/textarea/README.mdx` (documentation)
  - `packages/react-native/src/textarea/index.ts` (barrel export)
  - `packages/react-native/src/theme/tokens/components.ts` (theme export)
  - `packages/react-native/src/index.ts` (component export)
  - `packages/react-native/src/docs-registry.ts` (docs registration)
  - `packages/react-native/src/registry.json` (component metadata)
