# Navigation Stack Component Implementation Tasks

## Scaffdog Template Reference

The scaffdog template (`.scaffdog/component.md`) generates 7 files but requires **manual customization** for this component since it wraps expo-router rather than standard React Native base components (View/Pressable/TextInput/ScrollView).

**JSON Schema for `bun run scaffold:component '<json>'`:**

```json
{
  "name": "Stack",
  "description": "Themed navigation stack wrapper for expo-router with automatic header styling",
  "baseComponent": "View",
  "needsForwardRef": false,
  "hasVariants": false,
  "hasSizes": false,
  "hasDisabled": false,
  "hasLoading": false,
  "category": "navigation",
  "tags": "navigation, routing, expo-router",
  "tagsJson": "\"navigation\", \"routing\", \"expo-router\"",
  "dependenciesJson": "\"expo-router\""
}
```

**Available `baseComponent` options:** `"View"` (default), `"Pressable"`, `"TextInput"`, `"ScrollView"`

**When `hasVariants: true`**, also provide:

- `variantsType`: TypeScript union (e.g., `"primary" | "secondary"`)
- `variantsArray`: Array of variants (e.g., `["primary", "secondary"]`)

**When `hasSizes: true`**, also provide:

- `sizesType`: TypeScript union (e.g., `"sm" | "md" | "lg"`)
- `sizesArray`: Array of sizes (e.g., `["sm", "md", "lg"]`)

**Post-scaffold customization required:**

- Replace View-based implementation with expo-router Stack wrapper
- Remove Typography import (not needed for navigation)
- Add expo-router imports and Stack.Screen static property
- Implement screenOptions merging logic

**Note:** Component was named "NavigationStack" instead of "Stack" to avoid collision with the existing layout Stack component (which is now called Flex). The component is located at `packages/react-native/src/navigation-stack/`.

## 1. Theme System

- [x] 1.1 Create Stack.theme.ts with semantic token references
- [x] 1.2 Define header tokens (headerBackground, headerTint, headerTitle)
- [x] 1.3 Support light and dark color schemes in tokens
- [x] 1.4 Export theme with `as const` for type safety
- [x] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Stack.tsx with TypeScript interface (StackProps)
- [x] 2.2 Import and wrap expo-router Stack navigator
- [x] 2.3 Implement useTheme() hook for theme access
- [x] 2.4 Build themed screenOptions from theme tokens
- [x] 2.5 Implement screenOptions merging (themed defaults + user overrides)
- [x] 2.6 Handle function-based screenOptions with merge (pass theme context as third argument)
- [x] 2.7 Attach Stack.Screen as static property from expo-router
- [x] 2.8 Forward all other props to expo-router Stack
- [x] 2.9 Export types (StackProps)

## 3. Testing

- [x] 3.1 Create Stack.test.tsx with test utilities
- [x] 3.2 Test basic rendering with Stack
- [x] 3.3 Test themed screenOptions are applied
- [x] 3.4 Test light color scheme header colors
- [x] 3.5 Test dark color scheme header colors
- [x] 3.6 Test screenOptions override merging
- [x] 3.7 Test headerStyle deep merge
- [x] 3.8 Test Stack.Screen is accessible
- [x] 3.9 Test props forwarding (initialRouteName)
- [x] 3.10 Test empty Stack rendering

## 4. Examples

- [x] 4.1 Create basic usage example (BasicStack.tsx)
- [x] 4.2 Create screenOptions override example (CustomHeaderStack.tsx)
- [x] 4.3 Create full layout file example (LayoutExample.tsx)

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Add Why section explaining the problem solved
- [x] 5.3 Add Basic Usage section with Stack.Screen examples
- [x] 5.4 Add Customization section for screenOptions overrides
- [x] 5.5 Add Migration Guide section with before/after comparison
- [x] 5.6 Add Props table with all props documented
- [x] 5.7 Add Theme Integration section explaining token usage

## 6. Metadata

- [x] 6.1 Create meta.json with type, name, description
- [x] 6.2 Add expo-router to dependencies array
- [x] 6.3 Add "navigation" tag to metadata
- [x] 6.4 Create index.ts barrel export (Stack, StackProps)

## 7. Registry Generation

- [x] 7.1 Run `bun run generate` to regenerate all registries

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types` (zero TypeScript errors)
- [x] 8.3 Run `bun run lint` (zero ESLint warnings)
- [x] 8.4 Run `bun run test` (all tests passing)
- [x] 8.5 Verify NavigationStack appears in demo app sidebar (via registry.json update)
- [x] 8.6 Verify documentation loads correctly in demo app (via docs-registry.ts update)
