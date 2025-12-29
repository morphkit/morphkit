# Spinner

## Overview
Animated loading spinner indicator with size variants for showing indeterminate loading states. Provides familiar rotating circle animation for loading feedback.

## Component Behavior
Spinner renders a circular icon that rotates continuously 360° in infinite loop. Indicates ongoing activity without specific duration. Size variants fit different contexts (buttons, full-screen, inline).

## Props

### Required Props
None - All props optional with defaults

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `"sm" \| "md" \| "lg" \| number` | `"md"` | Size preset or custom pixel dimension |
| color | `string` | theme primary | Color of spinner |
| style | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles |

### Extends
`ViewProps` - All standard React Native View props

## Variants

### Sizes
- **sm**: 16x16 - For inline loading (buttons, small indicators)
- **md**: 24x24 - Standard loading indicator
- **lg**: 32x32 - Prominent loading (full screen, cards)
- **number**: Custom size in pixels for specific needs

## States
- **loading**: Continuously rotating (only state)

## Theme Support
- Light mode: primary blue (#4A90E2)
- Dark mode: lighter primary (#5AA2F5)
- Custom color: color prop overrides

## Accessibility Requirements
- accessibilityLabel="Loading"
- accessibilityLiveRegion="polite"
- accessibilityRole="progressbar"
- Announced once when appears, not continuously

## Usage Examples

### Basic Usage
```tsx
<Spinner />
```

### Advanced Usage
```tsx
<View style={{ padding: 40, alignItems: 'center' }}>
  <Spinner size="lg" color="#10B981" />
  <Text>Loading your data...</Text>
</View>
```

## Edge Cases
- **Multiple spinners**: Each rotates independently
- **size = 0**: Invalid, renders nothing
- **Very large custom size**: Performance fine, ensure adequate space

## Dependencies
React Native Animated or SVG library for spinner graphic

## Design Considerations

### Styling Approach
- SVG circle with partial stroke (arc segment)
- Rotate transform animates 0° to 360°
- Infinite loop with linear timing
- Size determines SVG dimensions

### Layout Strategy
- Centers automatically via flexbox if in centered container
- Inline spinner aligns with text baseline
- Full-screen spinner centered in overlay

### Performance Considerations
- Native driver for rotation animation (60fps)
- Single animation instance per spinner
- Lightweight SVG or icon rendering

### Customization Points
- Size presets + custom number
- color for brand matching
- Can add text label below
- Can wrap in overlay for full-screen blocking spinner
