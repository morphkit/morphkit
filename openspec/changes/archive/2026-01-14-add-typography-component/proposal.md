# Change: Add Typography Component

## Why

Applications need consistent, accessible text rendering with semantic styling that scales properly across iOS and Android platforms while following Apple Human Interface Guidelines typography standards.

## What Changes

- Add new Typography component with 11 iOS-inspired variants (large-title, title-1, title-2, title-3, heading, body, callout, subhead, footnote, caption-1, caption-2)
- Implement three-tier theme integration with semantic text styles
- Support light and dark color schemes via theme tokens
- Allow style customization through standard React Native TextProps
- Include comprehensive tests covering all variants and style merging
- Provide MDX documentation with live examples

## Impact

- Affected specs: `typography` (new spec)
- Affected code:
  - `packages/react-native/src/typography/` (new directory with component files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
