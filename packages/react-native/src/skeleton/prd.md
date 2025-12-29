# Skeleton

## Overview

Placeholder loading component that mimics content layout with animated shimmer effect during data fetching. Improves perceived performance by showing content structure before actual data loads.

## Component Behavior

Skeleton renders a gray rectangle placeholder matching expected content dimensions. Pulse or wave animation creates loading effect. Variant presets match common elements (text lines, circles for avatars). Multiple skeletons combine to build complete page skeleton screens.

## Props

### Required Props

| Prop   | Type     | Description                          |
| ------ | -------- | ------------------------------------ |
| height | `number` | Height in pixels of skeleton element |

### Optional Props

| Prop         | Type                           | Default     | Description                                |
| ------------ | ------------------------------ | ----------- | ------------------------------------------ |
| width        | `number \| string`             | `"100%"`    | Width in pixels or percentage              |
| borderRadius | `number`                       | `4`         | Corner radius matching final element style |
| variant      | `"text" \| "rect" \| "circle"` | `"rect"`    | Preset shapes for common elements          |
| animation    | `"pulse" \| "wave" \| "none"`  | `"pulse"`   | Animation style                            |
| style        | `StyleProp<ViewStyle>`         | `undefined` | Additional custom styles                   |

### Extends

`ViewProps` - All standard React Native View props

## Variants

### Shape Presets

- **text**: height: 16-20px, optimized for text line placeholders
- **rect**: Generic rectangle for any content block
- **circle**: width = height, borderRadius = 50% for avatar placeholders

### Animation Types

- **pulse**: Opacity fade in/out (breathing effect)
- **wave**: Shimmer effect sliding left to right
- **none**: Static gray placeholder (no animation)

## States

- **loading**: Animated placeholder visible
- **loaded**: Skeleton replaced with actual content (managed by parent)

## Theme Support

- Light mode: base #E5E7EB, shimmer #F3F4F6 (lighter)
- Dark mode: base #374151, shimmer #4B5563 (lighter)
- Subtle contrast for non-distracting loading state

## Accessibility Requirements

- accessibilityLabel="Loading" or specific label (e.g., "Loading profile")
- accessibilityRole="none" or "progressbar"
- Hidden from screen readers or announced once (not repeatedly)
- No interaction required

## Usage Examples

### Basic Usage

```tsx
<Skeleton width="100%" height={20} />
<Skeleton width="80%" height={20} />
<Skeleton width="60%" height={20} />
```

### Advanced Usage

```tsx
<View style={{ flexDirection: "row", gap: 12 }}>
  <Skeleton variant="circle" width={48} height={48} />
  <View style={{ flex: 1 }}>
    <Skeleton variant="text" width="100%" height={16} />
    <Skeleton variant="text" width="70%" height={14} />
  </View>
</View>
```

## Edge Cases

- **Very large skeletons**: Performance impact minimal but avoid excessive count
- **Nested skeletons**: Compositions build complex layouts
- **Animation with many skeletons**: Stagger animations for better performance
- **width/height = 0**: Renders nothing (invalid)

## Dependencies

Optional: React Native Animated or Reanimated for animations

## Design Considerations

### Styling Approach

- Base View with backgroundColor
- Pulse: Animated opacity between 0.5-1
- Wave: Animated gradient overlay sliding across
- Variant presets set dimensions and borderRadius

### Layout Strategy

- Acts as placeholder with same dimensions as final content
- Stack multiple for complete layouts
- Match final content spacing and structure

### Performance Considerations

- Use native driver for animations
- Limit simultaneous animations
- Remove from tree when data loaded (don't hide)

### Customization Points

- width/height for any size
- variant for common patterns
- animation toggle
- Can match final element borderRadius
- Compose multiple for complex layouts
