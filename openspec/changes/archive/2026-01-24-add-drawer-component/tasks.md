# Drawer Component Implementation Tasks

## 1. Theme System

- [x] 1.1 Create Drawer.theme.ts with semantic color imports
- [x] 1.2 Define header tokens (light/dark: background, tint, title)
- [x] 1.3 Define headerTitle tokens (fontSize, fontWeight from textStyles)
- [x] 1.4 Define drawer panel tokens (light/dark: background, overlay)
- [x] 1.5 Define drawerItem tokens (light/dark: activeTint, inactiveTint, activeBackground, inactiveBackground)
- [x] 1.6 Define drawerLabel tokens (fontSize, fontWeight from textStyles)
- [x] 1.7 Define shadowVisible token (default false)
- [x] 1.8 Export theme with `as const` for type safety
- [x] 1.9 Add drawer export to `src/theme/tokens/navigation.ts`

## 2. Component Implementation

- [x] 2.1 Create Drawer.tsx with TypeScript interfaces
- [x] 2.2 Define DrawerThemeContext interface (theme, colorScheme)
- [x] 2.3 Define DrawerScreenOptionsCallbackProps interface
- [x] 2.4 Define DrawerScreenOptionsWithTheme type (object or function)
- [x] 2.5 Define DrawerProps interface extending expo-router Drawer props
- [x] 2.6 Implement useTheme() hook for theme access
- [x] 2.7 Implement themedScreenOptions object with all drawer styling
- [x] 2.8 Implement deepMergeDrawerStyle helper function
- [x] 2.9 Implement deepMergeHeaderStyle helper function
- [x] 2.10 Implement mergeScreenOptions function
- [x] 2.11 Implement resolveScreenOptions function (handles object/function)
- [x] 2.12 Implement themeContext injection for function-based options
- [x] 2.13 Render expo-router Drawer with resolved options
- [x] 2.14 Attach Drawer.Screen as static property

## 3. Testing

- [x] 3.1 Create Drawer.test.tsx with render helper
- [x] 3.2 Mock expo-router/drawer module
- [x] 3.3 Test basic rendering of expo-router Drawer
- [x] 3.4 Test rendering without children
- [x] 3.5 Test passing children through to expo-router Drawer
- [x] 3.6 Test themed headerShadowVisible is false
- [x] 3.7 Test themed headerTintColor is applied
- [x] 3.8 Test themed headerStyle.backgroundColor is applied
- [x] 3.9 Test themed headerTitleStyle (color, fontSize, fontWeight)
- [x] 3.10 Test themed drawerActiveTintColor is applied
- [x] 3.11 Test themed drawerInactiveTintColor is applied
- [x] 3.12 Test themed drawerStyle.backgroundColor is applied
- [x] 3.13 Test light color scheme colors
- [x] 3.14 Test dark color scheme colors
- [x] 3.15 Test different colors in dark vs light mode
- [x] 3.16 Test partial screenOptions override
- [x] 3.17 Test deep merge of headerStyle
- [x] 3.18 Test deep merge of drawerStyle
- [x] 3.19 Test user options override themed defaults
- [x] 3.20 Test function-based screenOptions is called
- [x] 3.21 Test themeContext is provided to function
- [x] 3.22 Test function return value is merged with defaults
- [x] 3.23 Test Drawer.Screen static property exists
- [x] 3.24 Test Drawer.Screen renders from expo-router
- [x] 3.25 Test props pass-through (initialRouteName, id)

## 4. Examples

- [x] 4.1 Create examples/ directory
- [x] 4.2 Create BasicExample.tsx showing minimal Drawer setup
- [x] 4.3 Create CustomHeaderExample.tsx showing header option overrides
- [x] 4.4 Create ThemeAwareExample.tsx showing function-based screenOptions with themeContext
- [x] 4.5 Create DrawerContentExample.tsx showing drawerContent customization
- [x] 4.6 Create examples/index.ts barrel export

## 5. Documentation

- [x] 5.1 Create README.mdx with brief description (navigation drawer pattern)
- [x] 5.2 Import all examples at top of README.mdx
- [x] 5.3 Add "Why Drawer?" section explaining the problem it solves
- [x] 5.4 Add Basic Usage section with BasicExample
- [x] 5.5 Add Custom Header section with CustomHeaderExample
- [x] 5.6 Add Theme-Aware Options section with ThemeAwareExample
- [x] 5.7 Add Custom Drawer Content section with DrawerContentExample
- [x] 5.8 Add Theme Tokens section with Color, Typography, Other tokens tables
- [x] 5.9 Add Props section with Navigation Props table
- [x] 5.10 Add DrawerScreenOptionsWithTheme documentation
- [x] 5.11 Add DrawerThemeContext documentation
- [x] 5.12 Add Static Properties section (Drawer.Screen)
- [x] 5.13 Add Migration Guide section (Before/After examples)
- [x] 5.14 Add Accessibility section (screen reader, gestures, focus)

## 6. Metadata

- [x] 6.1 Create meta.json with type "components:ui"
- [x] 6.2 Set name to "drawer"
- [x] 6.3 Set description to "Themed navigation drawer wrapper for expo-router with automatic styling"
- [x] 6.4 Set category to "navigation"
- [x] 6.5 Add tags: ["navigation", "routing", "expo-router", "drawer", "sidebar"]
- [x] 6.6 Add dependencies: ["expo-router", "@react-navigation/drawer"]
- [x] 6.7 Create index.ts barrel export (Drawer, types)

## 7. Registry Generation

- [x] 7.1 Run `bun run generate` to update all registries

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier)
- [x] 8.2 Run `bun run check-types --filter=@morphkit/react-native` (zero errors)
- [x] 8.3 Run `bun run lint --filter=@morphkit/react-native` (zero warnings)
- [x] 8.4 Run `bun run test --filter=@morphkit/react-native` (all tests passing)
- [ ] 8.5 Verify component appears in demo app sidebar
- [ ] 8.6 Verify documentation loads correctly in demo app
