# IconButton

## Overview
Circular button component optimized for icon-only actions with size variants and touch feedback for toolbars, headers, and inline actions.

## Component Behavior
IconButton renders a circular or rounded square button containing only an icon. Designed for actions where an icon is self-explanatory or space is limited. Provides press feedback with opacity or background color change. Supports three visual variants: ghost (transparent), outline (bordered), and filled (solid background). Commonly used in toolbars, headers, cards, and as utility actions.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| onPress | `() => void` | Action callback |
| icon | `ReactNode` | Icon component to display |
| accessibilityLabel | `string` | Required label for screen readers |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| variant | `"ghost" \| "outline" \| "filled"` | `"ghost"` | Visual style variant |
| color | `string` | theme primary | Icon and border/background color |
| disabled | `boolean` | `false` | Disables interaction |
| style | `StyleProp<ViewStyle>` | `undefined` | Custom styles |

### Extends
`PressableProps` - All standard Pressable props (hitSlop, delayLongPress, android_ripple, etc.)

## Variants

### Size
- **sm**: 32x32 button, 16x16 icon
- **md**: 40x40 button, 20x20 icon (default)
- **lg**: 48x48 button, 24x24 icon

### Visual Variant
- **ghost**: Transparent background, icon only, subtle background on press
- **outline**: Border with transparent background, filled border color on press
- **filled**: Solid background color, darker shade on press

## States
- **default**: Standard variant appearance
- **pressed**: Visual feedback based on variant:
  - Ghost: Light gray background (rgba opacity)
  - Outline: Filled background with border color
  - Filled: Darker shade of fill color
- **disabled**: Reduced opacity (0.4), no press feedback

## Theme Support
- Light mode:
  - Ghost pressed background: rgba(0, 0, 0, 0.05)
  - Outline border: #E5E7EB, icon: #6B7280
  - Filled background: Primary #4A90E2, icon: white
- Dark mode:
  - Ghost pressed background: rgba(255, 255, 255, 0.1)
  - Outline border: #4B5563, icon: #9CA3AF
  - Filled background: Primary #5AA2F5, icon: white

## Accessibility Requirements
- `accessibilityRole="button"`
- `accessibilityLabel`: **Required prop** (describes action since no visible text)
- `accessibilityHint`: Optional, provides additional context
- `accessibilityState={{ disabled }}` when disabled
- Minimum touch target: 44x44 (use hitSlop for sm size)
- Screen reader announces as button with provided label

## Usage Examples

### Basic Usage
```tsx
<IconButton
  icon={<CloseIcon />}
  onPress={handleClose}
  accessibilityLabel="Close dialog"
/>
```

### Advanced Usage
```tsx
<IconButton
  icon={<SettingsIcon />}
  size="lg"
  variant="filled"
  color="#10B981"
  onPress={openSettings}
  accessibilityLabel="Open settings"
  accessibilityHint="Opens the application settings screen"
  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
/>
```

## Edge Cases
- **No accessibilityLabel**: Component should warn/error in development (required for accessibility)
- **Very small size**: Ensure touch target meets 44x44 minimum (use hitSlop)
- **Custom color**: Ensure sufficient contrast for icon visibility
- **Long press actions**: Use delayLongPress and onLongPress from Pressable
- **Loading state**: Consider showing spinner icon while action is processing

## Dependencies
- Pressable from React Native
- Icon components (user-provided)

## Design Considerations

### Styling Approach
- Circular shape: width/height equal, borderRadius 50%
- Alternative: Rounded square (borderRadius 8-12) for different design language
- Ghost variant: No background, subtle hover/press state
- Outline variant: 1-2px border, border color from theme
- Filled variant: Solid background, icon color contrast for visibility
- Press feedback: Opacity change or background color transition

### Layout Strategy
- Fixed dimensions based on size
- Icon centered: justifyContent: "center", alignItems: "center"
- Touch target padding via hitSlop when size < 44x44
- Inline usage: Can be placed within flex layouts

### Performance Considerations
- Lightweight component, minimal re-renders
- Press state handled by Pressable
- Use native driver for animations if custom transitions added
- Memoize icon component to prevent unnecessary re-renders

### Customization Points
- Size presets for different contexts (toolbar, header, inline)
- Three variant styles for different visual needs
- Custom color prop for theming
- Full Pressable prop support (ripple, hitSlop, etc.)
- Custom style prop for edge cases
- Icon fully customizable (any ReactNode)
- Accessible by default with required accessibilityLabel
