# Change: Add Navigation Stack Component

## Why

Developers using expo-router must manually pass `screenOptions` with theme tokens to style navigation headers in every layout file. This creates repetitive boilerplate and inconsistency when theme values change. A themed Stack wrapper eliminates this by automatically applying morphkit theme tokens to navigation styling.

## What Changes

- Add new Stack component that wraps expo-router's Stack navigator
- Automatically apply theme tokens for header styling (background, tint color, shadow)
- Support all expo-router Stack props through pass-through
- Allow partial `screenOptions` overrides while preserving themed defaults
- Support both Stack and Stack.Screen usage patterns
- Provide TypeScript types for all props

## Impact

- Affected specs: `stack` (new navigation component spec)
- Affected code:
  - `packages/react-native/src/stack/` (new directory)
  - `packages/react-native/src/stack/Stack.tsx` (navigation wrapper)
  - `packages/react-native/src/stack/Stack.theme.ts` (theme tokens)
  - `packages/react-native/src/stack/Stack.test.tsx` (tests)
  - `packages/react-native/src/stack/README.mdx` (documentation)
  - `packages/react-native/src/stack/meta.json` (registry metadata)
  - `packages/react-native/src/stack/index.ts` (exports)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
- Dependencies: `expo-router` (peer dependency)
