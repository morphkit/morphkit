# Progress

## Overview

A visual progress indicator component supporting both bar and circular displays. Shows determinate progress (0-100%) or indeterminate loading states. Used for file uploads, downloads, multi-step forms, and long-running operations.

## Component Behavior

Progress displays visual feedback for ongoing operations. In determinate mode (value provided), it shows exact completion percentage. In indeterminate mode (no value), it displays an animated loading state indicating work is in progress without specific completion percentage.

### Bar Variant

- Horizontal progress bar with fill from left to right
- Determinate: Fill width corresponds to percentage
- Indeterminate: Animated 30% width bar sliding left to right

### Circle Variant

- Circular progress indicator using border styling
- Determinate: Borders fill clockwise from top
- Indeterminate: Spinning animation (not implemented in current design)
- Optional percentage text in center

## Props

### Optional Props

| Prop      | Type                   | Default | Description                                      |
| --------- | ---------------------- | ------- | ------------------------------------------------ |
| value     | `number`               | -       | Progress value 0-100 (undefined = indeterminate) |
| variant   | `"bar" \| "circle"`    | `"bar"` | Display style (horizontal bar or circular)       |
| size      | `"sm" \| "md" \| "lg"` | `"md"`  | Size preset                                      |
| color     | `string`               | Theme   | Custom color for progress fill                   |
| showValue | `boolean`              | `false` | Display percentage text (determinate mode only)  |
| style     | `StyleProp<ViewStyle>` | -       | Custom container styles                          |

### Extends

`ViewProps` - All standard React Native View props

## Variants

### Bar Variant Sizes

- **sm**: 4px height - Subtle progress indicators, inline states
- **md**: 8px height - Standard progress bars (default)
- **lg**: 12px height - Prominent progress indicators

### Circle Variant Sizes

- **sm**: 32px diameter - Compact circular indicators
- **md**: 48px diameter - Standard circular progress (default)
- **lg**: 64px diameter - Large circular indicators

## States

- **Determinate**: Specific progress value (0-100%)
- **Indeterminate**: Unknown completion time, animated loading state

## Theme Support

- **Light mode**: #E5E7EB track, #4A90E2 progress, #374151 text
- **Dark mode**: #4B5563 track, #5AA2F5 progress, #E5E7EB text
- **Custom colors**: Override progress color with \`color\` prop

## Accessibility Requirements

- \`accessibilityRole="progressbar"\` - Identifies as progress indicator
- \`accessibilityValue\` with min/max/now for determinate progress
- Screen readers announce current progress percentage

## Usage Examples

### Basic Bar (Indeterminate)

\`\`\`tsx
<Progress />
\`\`\`

### Determinate Bar with Value

\`\`\`tsx
<Progress value={60} />
\`\`\`

### With Percentage Display

\`\`\`tsx
<Progress value={75} showValue />
\`\`\`

### Circle Variant

\`\`\`tsx
<Progress value={50} variant="circle" />
<Progress value={80} variant="circle" showValue />
\`\`\`

### Sizes

\`\`\`tsx
<Progress value={40} size="sm" />
<Progress value={60} size="md" variant="circle" />
<Progress value={80} size="lg" />
\`\`\`

### Custom Color

\`\`\`tsx
<Progress value={90} color="#10B981" />
\`\`\`

## Edge Cases

- **Value < 0**: Clamped to 0
- **Value > 100**: Clamped to 100
- **showValue with indeterminate**: Value display hidden
- **Circle with very small size**: Percentage text may be too small to read

## Animation Details

### Indeterminate Bar

- 30% width bar slides from 0% to 100% position
- 1000ms slide right, 1000ms slide left
- Ease easing for smooth motion
- Infinite loop

## Design Considerations

### Styling Approach

Bar uses nested Views with absolute positioning for fill overlay. Circle uses border styling with calculated circumference for progress arc (simplified implementation).

### Layout Strategy

Bar expands to fill container width. Circle has fixed dimensions based on size prop. Both use StyleSheet.create for optimized style definitions.

### Performance Considerations

- Indeterminate animation uses Animated.loop for continuous playback
- Animated.timing for smooth transitions
- Native driver disabled for width/layout animations (bar variant)
- Minimal re-renders using controlled animations

### Customization Points

- 2 visual variants (bar and circle)
- 3 size presets
- Determinate and indeterminate modes
- Optional value display
- Custom color override
- Theme-aware default colors
