# Change: Add Avatar Component

## Why

Users need a circular avatar component for displaying user profile images with automatic fallback to initials when no image is available.

## What Changes

- Add new Avatar component with image and fallback text support
- Add 4 size options (sm, md, lg, xl)
- Implement image display with automatic fallback to initials
- Implement pressed state feedback for interactive avatars
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `avatar` (new spec)
- Affected code:
  - `packages/react-native/src/avatar/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
