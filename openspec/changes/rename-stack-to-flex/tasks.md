# Rename Stack to Flex Implementation Tasks

## 1. File Rename Operations

- [x] 1.1 Create `src/flex/` directory
- [x] 1.2 Copy `src/stack/Stack.tsx` to `src/flex/Flex.tsx`
- [x] 1.3 Copy `src/stack/Stack.theme.ts` to `src/flex/Flex.theme.ts`
- [x] 1.4 Copy `src/stack/Stack.test.tsx` to `src/flex/Flex.test.tsx`
- [x] 1.5 Copy `src/stack/README.mdx` to `src/flex/README.mdx`
- [x] 1.6 Copy `src/stack/meta.json` to `src/flex/meta.json`
- [x] 1.7 Copy `src/stack/index.ts` to `src/flex/index.ts`
- [x] 1.8 Copy `src/stack/examples/` to `src/flex/examples/`

## 2. Code Updates

- [x] 2.1 Rename Stack to Flex in Flex.tsx (component name, types, props interface)
- [x] 2.2 Update type names (FlexDirection, FlexAlign, FlexJustify, FlexGap, FlexProps)
- [x] 2.3 Update theme token reference from `theme.component.stack` to `theme.component.flex`
- [x] 2.4 Rename export in Flex.theme.ts from `stack` to `flex`
- [x] 2.5 Update all tests in Flex.test.tsx to use Flex
- [x] 2.6 Update README.mdx to reference Flex instead of Stack
- [x] 2.7 Update meta.json with name "flex" and updated description
- [x] 2.8 Update index.ts exports to Flex and FlexProps

## 3. Theme Registry Updates

- [x] 3.1 Update `src/theme/tokens/components.ts` to import and export `flex` instead of `stack`

## 4. Example Updates

- [x] 4.1 Update all example files in `src/flex/examples/` to use Flex

## 5. Delete Old Stack Directory

- [x] 5.1 Delete `src/stack/` directory after verification

## 6. Registry Generation

- [x] 6.1 Run `bun run generate` to regenerate registry.json, docs-registry.ts, and index.ts

## 7. Internal Usage Updates

- [x] 7.1 Search for any internal usage of Stack component in the library
- [x] 7.2 Update any internal usage to use Flex

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types` (zero TypeScript errors)
- [x] 8.3 Run `bun run lint` (zero ESLint warnings)
- [x] 8.4 Run `bun run test` (all tests passing)
- [ ] 8.5 Verify Flex appears in demo app sidebar
- [ ] 8.6 Verify documentation loads correctly in demo app
