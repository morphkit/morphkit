# Link

## Overview
Pressable text component for navigation with underline styling and visited state support for inline and standalone usage patterns.

## Component Behavior
Link renders pressable text with navigation functionality. Provides visual feedback on press with color change and optional underline. Supports inline usage (inherits surrounding text size/color) or standalone usage (independent sizing). Can show external link indicator and handle disabled state. Visited state tracking optional for web-like behavior.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| children | `ReactNode` | Link text content |
| onPress | `() => void` | Navigation callback |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"inline" \| "standalone"` | `"inline"` | Inline inherits context, standalone independent |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Text size (applies to standalone) |
| underline | `"none" \| "hover" \| "always"` | `"hover"` | Underline display behavior |
| external | `boolean` | `false` | Shows external icon, opens in new context |
| disabled | `boolean` | `false` | Disables interaction |
| style | `StyleProp<TextStyle>` | `undefined` | Custom text styles |

### Extends
`PressableProps` - All standard Pressable props (hitSlop, pressRetentionOffset, etc.)

## Variants

### Variant Types
- **inline**: Inherits surrounding text size and color, minimal standalone styling
- **standalone**: Independent component with primary color and defined sizing

### Size (applies to standalone variant)
- **sm**: fontSize: 14
- **md**: fontSize: 16 (default)
- **lg**: fontSize: 18

### Underline Styles
- **none**: No underline ever
- **hover**: Underline on press state
- **always**: Always underlined

## States
- **default**: Standard link appearance (primary color for standalone, inherited for inline)
- **pressed**: Darker shade of link color, underline if underline="hover"
- **visited**: Slightly muted color (optional, requires state tracking)
- **disabled**: Reduced opacity (0.5), no press feedback

## Theme Support
- Light mode:
  - Default: Primary blue (#4A90E2)
  - Pressed: Darker blue (#3A7BC8)
  - Visited: Purple (#8B5CF6)
- Dark mode:
  - Default: Lighter primary (#5AA2F5)
  - Pressed: Even lighter (#6AB3FF)
  - Visited: Lighter purple (#A78BFA)
- Underline color matches text color

## Accessibility Requirements
- `accessibilityRole="link"`
- `accessibilityState={{ disabled }}` when disabled
- `accessibilityHint` for external links: "Opens in new window" or "External link"
- Screen reader announces as link
- Focus indicator on web (keyboard navigation)
- `accessibilityLabel` can override children text if needed

## Usage Examples

### Basic Usage
```tsx
<Text>
  Read more about our{' '}
  <Link onPress={() => navigate('/privacy')}>
    privacy policy
  </Link>
  .
</Text>
```

### Advanced Usage
```tsx
<Link
  variant="standalone"
  size="lg"
  underline="always"
  external
  onPress={() => openURL('https://example.com')}
>
  Visit our website
</Link>
```

## Edge Cases
- **Long text**: Wrap naturally within parent text flow
- **Inline with different font sizes**: Inherits parent font size in inline variant
- **Disabled with onPress**: onPress still required but not called
- **External without onPress**: Still shows icon but non-functional (invalid state)
- **Nested links**: Avoid nesting, handle at parent component level

## Dependencies
- Uses Pressable from React Native for touch handling
- Optional external link icon component
- Typography component for consistent text rendering

## Design Considerations

### Styling Approach
- Inline variant: Minimal styles, inherits from parent Text
- Standalone variant: Independent styling with size/color
- Underline: TextStyle textDecorationLine property
- Press feedback: Color transition on press state
- External icon: Small icon (12-14px) with margin-left

### Layout Strategy
- Inline: Renders as Text within parent Text component
- Standalone: Can be used independently with flex/margin
- External icon positioned with flexDirection row and alignItems center
- Disabled state uses opacity for visual feedback

### Performance Considerations
- Lightweight component, minimal re-renders
- Press state managed internally by Pressable
- No complex animations beyond color transition

### Customization Points
- Variant for usage pattern (inline vs standalone)
- Size presets for common text sizes
- Underline behavior (none/hover/always)
- External link indicator toggle
- Custom style prop for edge cases
- Theme color integration for link colors
