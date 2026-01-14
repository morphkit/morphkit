# Change: Add Accordion Component

## Why

Applications require a way to organize dense information hierarchically with collapsible sections, enabling users to reveal content progressively without overwhelming the interface.

## What Changes

- Add new Accordion compound component with single and multiple expansion modes
- Add AccordionItem subcomponent for individual collapsible sections
- Implement collapsible behavior control (allow/prevent closing all items)
- Support disabled state at container and individual item levels
- Include smooth height animation with rotating chevron indicator
- Include comprehensive tests (34 test cases) and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `accordion` (new spec)
- Affected code:
  - `packages/react-native/src/accordion/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
