# Change: Add Drawer Component

## Why

Navigation drawers are a common pattern in mobile apps for exposing navigation options via a swipeable side menu. Currently, developers using expo-router's Drawer must manually configure `screenOptions` with theme tokens in every layout file, creating repetitive code and inconsistency when theme values change. A themed Drawer wrapper eliminates this boilerplate by automatically applying morphkit theme tokens while allowing full customization.

## What Changes

- Add new Drawer component wrapping expo-router's Drawer layout
- Implement themed header styling (background, tint, title colors)
- Implement themed drawer panel styling (background, overlay, width)
- Implement themed drawer item styling (active/inactive tint colors, backgrounds, label typography)
- Support object and function-based screenOptions with themeContext injection
- Include comprehensive tests and MDX documentation
- Register in navigation theme tokens

## Impact

- Affected specs: `drawer` (new spec)
- Affected code:
  - `packages/react-native/src/drawer/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/navigation.ts` (add drawer theme export)
  - `packages/react-native/src/index.ts` (add component export via generate)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs via generate)
  - `packages/react-native/src/registry.json` (add component metadata via generate)
