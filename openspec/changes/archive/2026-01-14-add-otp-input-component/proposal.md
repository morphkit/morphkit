# Change: Add OTPInput Component

## Why

Applications frequently require users to enter one-time passwords or verification codes received via SMS or email. A dedicated multi-field OTP input component provides optimal UX with auto-advance between fields, paste support, and auto-submit on completion.

## What Changes

- Add new OTPInput component with 2 variants (outline, filled)
- Add 3 size options (sm, md, lg)
- Implement controlled input with value/onChange pattern
- Support configurable length (default 6 digits)
- Include number and text input types with validation
- Support auto-advance, backspace navigation, paste handling, and auto-submit
- Implement error and disabled states
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `otp-input` (new spec)
- Affected code:
  - `packages/react-native/src/otp-input/` (new directory with 6 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
