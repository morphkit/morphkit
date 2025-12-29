# Progress

## Overview
Visual progress indicator with bar and circular variants for showing determinate or indeterminate loading states. Communicates task completion percentage or ongoing activity through animated visual feedback.

## Component Behavior
Progress displays completion as filled portion of bar or circular track. Determinate mode shows percentage based on value prop (0-100). Indeterminate mode shows animated loading state (no specific percentage). Bar variant fills horizontally. Circle variant fills clockwise around perimeter.

## Props

### Required Props
None - All props optional with defaults

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `number` | `undefined` | Progress percentage (0-100). Undefined shows indeterminate state |
| variant | `"bar" \| "circle"` | `"bar"` | Visual style: horizontal bar or circular ring |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size of progress indicator |
| color | `string` | theme primary | Color of progress fill |
| showValue | `boolean` | `false` | Display percentage text (e.g., "75%") |
| style | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles |

### Extends
`ViewProps` - All standard React Native View props

## Variants

### Visual Styles
- **bar**: Horizontal progress bar (linear)
- **circle**: Circular progress ring (radial)

### Sizes (Bar)
- **sm**: height: 4, borderRadius: 2
- **md**: height: 8, borderRadius: 4
- **lg**: height: 12, borderRadius: 6

### Sizes (Circle)
- **sm**: diameter: 24, stroke: 2
- **md**: diameter: 40, stroke: 3
- **lg**: diameter: 60, stroke: 4

## States
- **determinate**: Shows specific completion percentage from value prop
- **indeterminate**: Animated loading state (value undefined)

## Theme Support
- Light mode:
  - Bar: gray background (#E5E7EB), primary blue fill (#4A90E2)
  - Circle: gray track, primary blue progress stroke
- Dark mode:
  - Bar: dark gray background (#4B5563), lighter primary fill (#5AA2F5)
  - Circle: dark gray track, lighter primary stroke
- Custom color: color prop overrides theme primary

## Accessibility Requirements
- role="progressbar"
- accessibilityValue: { min: 0, max: 100, now: value } (determinate only)
- accessibilityLabel describing what's loading (e.g., "Upload progress")
- Indeterminate: announce "Loading..." or similar
- Value changes announced to screen readers

## Usage Examples

### Basic Usage
```tsx
<Progress value={75} />
```

### Advanced Usage
```tsx
<Progress
  variant="circle"
  value={uploadProgress}
  size="lg"
  showValue
  color="#10B981"
/>
```

## Edge Cases
- **value > 100**: Clamp to 100
- **value < 0**: Clamp to 0
- **value = undefined**: Indeterminate animation
- **showValue with indeterminate**: Shows "Loading..." or spinner instead of percentage

## Dependencies
Optional: SVG library for circular progress (react-native-svg)

## Design Considerations

### Styling Approach
- Bar: Background View + Foreground View (width = value%)
- Circle: SVG circle with stroke-dasharray animated
- Indeterminate bar: Animated sliding fill
- Indeterminate circle: Rotating spinner

### Layout Strategy
- Bar: Full width container, fill grows from left
- Circle: Square container, SVG centered
- Value text: Centered above or inside progress indicator

### Performance Considerations
- Use native driver for indeterminate animations
- Avoid re-renders on small value changes (debounce)
- SVG performance optimized for circles

### Customization Points
- Variant for different use cases
- Size presets
- color for brand matching
- showValue toggle
- Can add labels (e.g., "25 of 100 items")
