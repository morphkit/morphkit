## 1. Theme System

- [x] 1.1 Create Avatar.theme.ts with primitive token imports
- [x] 1.2 Define size variants (sm: 32, md: 40, lg: 48, xl: 64) using numeric values
- [x] 1.3 Define borderRadius using primitive.borderRadius.full (999)
- [x] 1.4 Define color variants (background, text, border) with light/dark semantic colors
- [x] 1.5 Export theme with `as const` for type safety
- [x] 1.6 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Avatar.tsx with AvatarProps TypeScript interface
- [x] 2.2 Extend Omit<PressableProps, "children"> for prop inheritance
- [x] 2.3 Implement useTheme() hook for theme and colorScheme access
- [x] 2.4 Implement size handling (sm, md, lg, xl) with default "md"
- [x] 2.5 Implement image display with Image component when source provided
- [x] 2.6 Implement fallback text display when no source (using Text component)
- [x] 2.7 Implement fontSize mapping per size (xs, lg, 2xl, 3xl)
- [x] 2.8 Implement style merge pattern (baseStyles, theme-derived, user style)
- [x] 2.9 Add accessibility props (accessibilityRole="imagebutton")
- [x] 2.10 Implement press state feedback with semantic state opacity

## 3. Testing

- [x] 3.1 Create Avatar.test.tsx with render from test-utils
- [x] 3.2 Test renders with image source (UNSAFE_getByType Image)
- [x] 3.3 Test renders fallback text when no source (getByText)
- [x] 3.4 Test applies small size styles (32x32, borderRadius 999)
- [x] 3.5 Test applies medium size by default (40x40, borderRadius 999)
- [x] 3.6 Test applies large size styles (48x48, borderRadius 999)
- [x] 3.7 Test shows image when source is provided (fallback hidden)
- [x] 3.8 Test shows fallback text when source is undefined (image hidden)
- [x] 3.9 Test applies circular border radius (999)
- [x] 3.10 Test calls onPress when pressed
- [x] 3.11 Test applies pressed opacity
- [x] 3.12 Test merges custom style prop (backgroundColor override)
- [x] 3.13 Test forwards PressableProps (accessibilityLabel)
- [x] 3.14 Test sets accessibilityRole to "imagebutton"
- [x] 3.15 Test applies light theme colors to fallback (#FFFFFF text)
- [x] 3.16 Test renders empty fallback when no text provided

## 4. Examples

- [x] 4.1 Create examples/ directory
- [x] 4.2 Create InteractiveProfileExample.tsx showing press handling
- [x] 4.3 Demonstrate avatar with Card, Stack, Typography, and Button
- [x] 4.4 Implement follow/unfollow toggle state
- [x] 4.5 Create examples/index.ts barrel export

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Add Sizes section with sm, md, lg live examples
- [x] 5.3 Add With Images section showing image avatars
- [x] 5.4 Add Fallback Text section showing initials avatars
- [x] 5.5 Add Profile Card Example with avatar + user info
- [x] 5.6 Add User List with Avatars example (multiple users)
- [x] 5.7 Add Interactive Profile Example section
- [x] 5.8 Add Props table with source, fallback, size, onPress, style
- [x] 5.9 Add Usage Examples section with code snippets
- [x] 5.10 Include Basic Avatar with Image example
- [x] 5.11 Include Fallback Initials example
- [x] 5.12 Include Profile Card with Avatar example
- [x] 5.13 Include Pressable Avatar example

## 6. Metadata

- [x] 6.1 Create meta.json with type "react-native"
- [x] 6.2 Set name to "avatar"
- [x] 6.3 Set description to "Circular avatar component with image support and fallback text for initials"
- [x] 6.4 Set dependencies array to empty (no internal dependencies)
- [x] 6.5 Create index.ts barrel export with Avatar and AvatarProps

## 7. Registry Generation

- [x] 7.1 Verify avatar export in `src/theme/tokens/components.ts`
- [x] 7.2 Verify Avatar export in `src/index.ts`
- [x] 7.3 Verify avatar entry in `src/registry.json`
- [x] 7.4 Verify avatar docs in `src/docs-registry.ts`

## 8. Verification

- [x] 8.1 Run `bun run format` (Prettier) - code formatted
- [x] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` - zero errors
- [x] 8.3 Run `bun run lint --filter=@warp-ui/react-native` - zero warnings
- [x] 8.4 Run `bun run test --filter=@warp-ui/react-native` - all 16 avatar tests passing
- [x] 8.5 Verify component appears in demo app sidebar
- [x] 8.6 Verify documentation loads correctly in demo app
