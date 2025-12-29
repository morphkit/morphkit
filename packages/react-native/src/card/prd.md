# Card

## Overview
Versatile content container component with elevation, borders, and padding for grouping related information and actions. Provides visual hierarchy through shadows and backgrounds while maintaining a clean, organized appearance for content sections.

## Component Behavior
Card wraps children in a styled container with configurable visual treatments (elevation/shadow, borders, backgrounds). When onPress is provided, the entire card becomes pressable with appropriate touch feedback. Automatically adjusts styling based on variant and size props, applying consistent padding, border radius, and visual effects.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| children | `ReactNode` | Content to be displayed inside the card |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"elevated" \| "outline" \| "ghost" \| "filled"` | `"elevated"` | Visual style of the card determining shadow, border, and background treatment |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Padding and border radius size preset |
| onPress | `() => void` | `undefined` | Makes the card pressable. When provided, card shows press feedback |
| style | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles to merge with card styles |

### Extends
`ViewProps` - All standard React Native View props (accessibilityLabel, testID, etc.)

## Variants

### Visual Style
- **elevated**: Shadow/elevation effect with white background (light) or dark gray background (dark). Most prominent visual treatment for primary content cards
- **outline**: 1px border with transparent background. Subtle container for grouped information without heavy visual weight
- **ghost**: No border or shadow, subtle gray background (light) or slightly lighter background (dark). Minimal visual treatment for low-emphasis containers
- **filled**: Solid background color (light gray in light mode, darker gray in dark mode) with no border or shadow. Clear content separation with moderate visual weight

## Sizes
- **sm**: padding: 12, borderRadius: 8 - Compact cards for dense layouts
- **md**: padding: 16, borderRadius: 12 - Standard card size for most use cases
- **lg**: padding: 20, borderRadius: 16 - Large cards for emphasized content sections

## States
- **default**: Normal state showing variant styling
- **pressed**: When onPress provided, shows press feedback (subtle opacity change or background darkening depending on variant)

## Theme Support
- Light mode:
  - elevated: white background, subtle shadow (0px 2px 8px rgba(0,0,0,0.1))
  - outline: transparent background, gray border (#E5E7EB)
  - ghost: light gray background (#F9FAFB), no border
  - filled: light gray background (#F3F4F6), no border
- Dark mode:
  - elevated: dark gray background (#1F2937), reduced shadow (0px 2px 8px rgba(0,0,0,0.3))
  - outline: transparent background, lighter gray border (#4B5563)
  - ghost: slightly lighter than app background (#374151), no border
  - filled: medium gray background (#4B5563), no border
- Dynamic switching: Uses useColorScheme() hook to detect system theme and apply appropriate colors

## Accessibility Requirements
- When pressable (onPress provided):
  - role="button"
  - accessibilityLabel describing card action (e.g., "View product details")
  - accessibilityState: { disabled: false }
  - accessibilityHint optional for additional context
- When not pressable:
  - No specific role required
  - Optional accessibilityLabel for screen readers to describe card contents
- Ensure minimum touch target size of 44x44 points when pressable
- Press feedback should be visually obvious (opacity change or highlight)

## Usage Examples

### Basic Usage
Simple elevated card with content:
```tsx
<Card>
  <Text>Card content here</Text>
  <Button title="Action" />
</Card>
```

### Advanced Usage
Pressable card with custom variant and size:
```tsx
<Card
  variant="outline"
  size="lg"
  onPress={() => navigate('Details')}
>
  <Image source={productImage} />
  <Text>Product Name</Text>
  <Text>$99.99</Text>
</Card>
```

## Edge Cases
- **Empty children**: Card still renders with padding, showing empty container
- **onPress with disabled state**: If disabled prop is passed (via ...props), ensure no press feedback occurs
- **Very long content**: Card height expands naturally. Consider scrollView for extremely long content
- **Nested cards**: Avoid nesting cards as it creates confusing visual hierarchy
- **Transparent children**: Ensure card background provides sufficient contrast for text visibility

## Dependencies
None - Card is a standalone component. Can optionally compose with other components (Image, Button, Typography) but doesn't require them.

## Design Considerations

### Styling Approach
- Use StyleSheet.create for base styles (wrapper, size variants, theme variants)
- Compute final styles by merging: baseStyles + variantStyles[variant] + sizeStyles[size] + themeStyles[colorScheme][variant] + custom style prop
- For pressable cards, wrap in Pressable with render prop to access pressed state
- Shadow implementation uses React Native's shadowColor, shadowOffset, shadowOpacity, shadowRadius for iOS and elevation for Android

### Layout Strategy
- Use View as base container (Pressable when onPress provided)
- Children render inside styled container with padding from size variant
- No assumptions about children layout - completely flexible
- Border radius clips children (consider overflow: hidden if children have backgrounds)

### Performance Considerations
- Memoize style computations based on variant, size, and theme
- Use StyleSheet.create for static style objects
- Avoid inline style objects in render
- Pressable should only re-render on press state change, not on every parent render

### Customization Points
- Variant prop allows visual customization without custom styles
- Size prop provides consistent sizing across app
- Style prop escape hatch for one-off customizations
- Can extend with custom variants by creating wrapper component
- Shadow values configurable via constants for consistent elevation scale
