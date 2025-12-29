# Slider

## Overview

Range slider control for selecting numeric values with single or dual thumb support and step increments. Provides visual and interactive way to select values from a continuous or discrete range.

## Component Behavior

Slider displays a horizontal track with draggable thumb(s). User drags thumb to select value. Single thumb for single value selection, two thumbs for range selection. Track fills from minimum to current value (or between two thumbs for range). Supports discrete steps or continuous values. Optional value display shows current selection.

## Props

### Required Props

| Prop          | Type                                          | Description                                                |
| ------------- | --------------------------------------------- | ---------------------------------------------------------- |
| value         | `number \| [number, number]`                  | Current value(s). Number for single thumb, array for range |
| onValueChange | `(value: number \| [number, number]) => void` | Callback when value changes during drag                    |

### Optional Props

| Prop      | Type                   | Default       | Description                                |
| --------- | ---------------------- | ------------- | ------------------------------------------ |
| min       | `number`               | `0`           | Minimum value of slider range              |
| max       | `number`               | `100`         | Maximum value of slider range              |
| step      | `number`               | `1`           | Value increment step. Use 0 for continuous |
| disabled  | `boolean`              | `false`       | Disables slider interaction                |
| showValue | `boolean`              | `false`       | Display current value(s) above thumb(s)    |
| size      | `"sm" \| "md" \| "lg"` | `"md"`        | Size of track and thumb                    |
| color     | `string`               | theme primary | Color of active track and thumb            |
| style     | `StyleProp<ViewStyle>` | `undefined`   | Additional custom styles                   |

### Extends

`ViewProps` - All standard React Native View props

## Variants

### Sizes

- **sm**: track height: 2, thumb: 16x16
- **md**: track height: 4, thumb: 20x20
- **lg**: track height: 6, thumb: 24x24

## States

- **default**: Idle, not being dragged
- **dragging**: Thumb being actively dragged, may show temporary value
- **disabled**: Reduced opacity (0.5), no interaction

## Theme Support

- Light mode:
  - Active track: primary blue (#4A90E2)
  - Inactive track: light gray (#E5E7EB)
  - Thumb: primary blue (#4A90E2) with white border
- Dark mode:
  - Active track: lighter primary (#5AA2F5)
  - Inactive track: gray (#4B5563)
  - Thumb: lighter primary (#5AA2F5) with darker border
- Dynamic switching: useColorScheme() for theme detection
- Custom color: color prop overrides theme primary

## Accessibility Requirements

- role="slider" (or "adjustable" on React Native)
- accessibilityValue: { min, max, now: value }
- accessibilityLabel describing what slider controls (e.g., "Volume")
- Keyboard support (web): Arrow keys adjust value by step
- Focus indicator on thumb when focused
- Announce value changes to screen readers

## Usage Examples

### Basic Usage

```tsx
<Slider value={volume} onValueChange={setVolume} min={0} max={100} />
```

### Advanced Usage

```tsx
<Slider
  value={priceRange}
  onValueChange={setPriceRange}
  min={0}
  max={1000}
  step={50}
  showValue
  size="lg"
  color="#FF6B6B"
/>
```

## Edge Cases

- **value outside min/max**: Clamp to valid range
- **min > max**: Invalid, should warn or swap values
- **step = 0**: Continuous slider (any value in range)
- **step larger than range**: Only min and max selectable
- **Array value with single value in array**: Render single thumb
- **Very small step with large range**: Performance may suffer (consider larger step)
- **showValue with range**: Show two value displays above thumbs

## Dependencies

- May use React Native PanResponder or Gesture Handler for drag interactions
- Optional: Tooltip component for value display

## Design Considerations

### Styling Approach

- Track: Two Views (inactive full track, active partial track overlay)
- Thumb: Circular View positioned absolutely based on value percentage
- Active track width: (value - min) / (max - min) \* 100%
- Range slider: Active track between two thumb positions
- Value display: Text positioned above thumb (if showValue=true)

### Layout Strategy

- Container View with relative positioning
- Track Views: absolute positioning within container
- Thumb(s): absolutely positioned based on value(s)
- PanResponder handles drag gestures
- Calculate value from touch position: min + (touchX / trackWidth) \* (max - min)

### Performance Considerations

- Throttle onValueChange during drag to avoid excessive updates
- Use native animation driver for smooth thumb movement
- Avoid expensive calculations in onValueChange
- Memoize value-to-position calculations

### Customization Points

- min/max/step for value constraints
- showValue toggle
- Custom value formatter for display
- Color theming via color prop
- Can add tick marks at step intervals
- Can add labels at min/max positions
- Vertical orientation possible with rotation or alternative layout
