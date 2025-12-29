# Skeleton

## Overview

A placeholder loading component with animated shimmer effect. Used to indicate content is loading while maintaining layout structure, providing better perceived performance than blank spaces or spinners.

## Component Behavior

Skeleton displays as a gray placeholder shape (rectangle, circle, or text line) with a subtle shimmer animation that moves from left to right. The shimmer creates the illusion of content gradually loading. Animation runs continuously until the component unmounts.

## Props

### Optional Props

| Prop    | Type                           | Default  | Description                                                   |
| ------- | ------------------------------ | -------- | ------------------------------------------------------------- |
| variant | `"rect" \| "circle" \| "text"` | `"rect"` | Shape of the skeleton (rectangle, circle, or text line)       |
| width   | `number \| string`             | Variant  | Custom width (100% for rect/text, 40px for circle by default) |
| height  | `number \| string`             | Variant  | Custom height (20px for rect, 40px circle, 12px text)         |
| style   | `StyleProp<ViewStyle>`         | -        | Custom container styles                                       |

### Extends

`ViewProps` - All standard React Native View props

## Variants

### Shape Types

- **rect**: Rectangular placeholder - Default for content blocks, cards, images (100% width × 20px height)
- **circle**: Circular placeholder - For avatars, profile pictures (40px diameter)
- **text**: Text line placeholder - For text content, headings (100% width × 12px height)

## Theme Support

- **Light mode**: #E5E7EB base, #F3F4F6 shimmer overlay
- **Dark mode**: #374151 base, #4B5563 shimmer overlay
- Shimmer has 50% opacity for subtle effect

## Animation Details

- **Type**: Horizontal shimmer (translateX animation)
- **Duration**: 1500ms per cycle
- **Easing**: Ease for smooth acceleration/deceleration
- **Native Driver**: Enabled for performance
- **Loop**: Infinite repeat

## Accessibility Requirements

No specific accessibility attributes needed as skeleton is purely decorative and will be replaced by actual content. The actual content should have proper accessibility attributes.

## Usage Examples

### Basic Rectangle

\`\`\`tsx
<Skeleton />
\`\`\`

### Circle (Avatar Placeholder)

\`\`\`tsx
<Skeleton variant="circle" />
\`\`\`

### Text Line

\`\`\`tsx
<Skeleton variant="text" />
\`\`\`

### Custom Dimensions

\`\`\`tsx
<Skeleton width={200} height={100} />
<Skeleton variant="circle" width={60} height={60} />
<Skeleton width="80%" height={15} />
\`\`\`

### Content Skeleton Layout

\`\`\`tsx
<View style={{ padding: 16, gap: 12 }}>
<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="text" width="60%" />
<Skeleton variant="text" width="40%" />
<Skeleton width="100%" height={200} />
</View>
\`\`\`

## Edge Cases

- Very small dimensions (< 10px): May not show shimmer effect clearly
- Very large dimensions: Shimmer may appear slow
- Percent-based width with no parent: Falls back to 100% of available space

## Design Considerations

### Styling Approach

Uses overflow: hidden container with absolutely positioned animated shimmer overlay. Shimmer is a semi-transparent layer that translates horizontally.

### Layout Strategy

Respects custom width/height while providing sensible defaults for each variant. Uses onLayout to measure actual width for shimmer animation calculation.

### Performance Considerations

- Native driver for transform animation (60fps)
- Shimmer opacity at 50% to reduce overdraw
- Animation runs on UI thread, not JavaScript thread
- Single Animated.View per skeleton instance

### Customization Points

- 3 shape variants with different default dimensions
- Custom width/height (number or string with units)
- Custom container styling
- Theme-aware colors
