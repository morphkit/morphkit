# FAB (Floating Action Button)

## Overview

Floating Action Button positioned at screen corners for primary actions with icon, extended label variant, and customizable placement options.

## Component Behavior

FAB renders a circular button with an icon, absolutely positioned at screen edges. Provides prominent call-to-action for primary user tasks like "Create", "Add", or "Compose". Supports extended variant with text label alongside icon for better context. Shows press feedback with scale/opacity animation. Can be positioned at any corner or center of top/bottom edges.

## Props

### Required Props

| Prop    | Type         | Description     |
| ------- | ------------ | --------------- |
| onPress | `() => void` | Action callback |
| icon    | `ReactNode`  | Icon component  |

### Optional Props

| Prop      | Type                                                                                              | Default          | Description                 |
| --------- | ------------------------------------------------------------------------------------------------- | ---------------- | --------------------------- |
| label     | `string`                                                                                          | `undefined`      | Text label for extended FAB |
| size      | `"sm" \| "md" \| "lg"`                                                                            | `"md"`           | Button size                 |
| placement | `"top-left" \| "top-right" \| "top-center" \| "bottom-left" \| "bottom-right" \| "bottom-center"` | `"bottom-right"` | Screen position             |
| variant   | `"primary" \| "secondary"`                                                                        | `"primary"`      | Color variant               |
| disabled  | `boolean`                                                                                         | `false`          | Disables interaction        |
| style     | `StyleProp<ViewStyle>`                                                                            | `undefined`      | Custom styles               |

### Extends

`PressableProps` - All standard Pressable props (hitSlop, delayLongPress, etc.)

## Variants

### Size

- **sm**: 40x40 circle, icon: 18x18
- **md**: 56x56 circle, icon: 24x24 (default)
- **lg**: 64x64 circle, icon: 28x28

### Extended FAB (when label provided)

- Width expands to accommodate icon + label
- Pill shape: borderRadius matches height / 2
- Icon on left, label text on right
- Padding: 16-20 horizontal

### Color Variant

- **primary**: Primary theme color background
- **secondary**: Secondary theme color or gray

### Placement

Six placement options with 16px offset from screen edges:

- **top-left**: 16px from top, 16px from left
- **top-right**: 16px from top, 16px from right
- **top-center**: 16px from top, horizontally centered
- **bottom-left**: 16px from bottom, 16px from left
- **bottom-right**: 16px from bottom, 16px from right (default)
- **bottom-center**: 16px from bottom, horizontally centered

## States

- **default**: Standard appearance with shadow/elevation
- **pressed**: Slight scale down (0.95) and opacity change (0.9)
- **disabled**: Reduced opacity (0.5), no shadow, no interaction

## Theme Support

- Light mode:
  - Primary: Background #4A90E2, white icon/text
  - Secondary: Background #6B7280, white icon/text
  - Shadow: rgba(0, 0, 0, 0.3) with elevation 4-6
- Dark mode:
  - Primary: Background #5AA2F5, white icon/text
  - Secondary: Background #9CA3AF, white icon/text
  - Shadow: Reduced or removed (elevation 2-4)

## Accessibility Requirements

- `accessibilityRole="button"`
- `accessibilityLabel`: Required, use label prop or provide explicit description
- `accessibilityHint`: Describe what action will happen (e.g., "Create new message")
- `accessibilityState={{ disabled }}` when disabled
- Touch target at least 44x44 (hitSlop if size sm)
- Screen reader announces as button with label

## Usage Examples

### Basic Usage

```tsx
<FAB
  icon={<PlusIcon />}
  onPress={handleCreate}
  accessibilityLabel="Create new item"
/>
```

### Advanced Usage

```tsx
<FAB
  icon={<EditIcon />}
  label="Compose"
  size="lg"
  placement="bottom-center"
  variant="secondary"
  onPress={handleCompose}
  accessibilityLabel="Compose new message"
  accessibilityHint="Opens message composer"
/>
```

## Edge Cases

- **Overlapping content**: Ensure FAB doesn't cover critical UI (add bottom padding to ScrollView)
- **Keyboard open**: Consider hiding or repositioning FAB when keyboard is visible
- **Small screens**: Use size="sm" on compact devices
- **Multiple FABs**: Generally avoid, but if needed use different placements
- **Extended FAB long label**: Truncate text with ellipsis if too long (max width)

## Dependencies

- Pressable from React Native
- Optional shadow/elevation utilities
- Icon components

## Design Considerations

### Styling Approach

- Circular shape: width/height equal, borderRadius 50%
- Extended shape: width auto, borderRadius height/2
- Absolute positioning with placement-based coordinates
- Shadow/elevation for depth (platform-specific)
- Press animation: Animated.spring for scale/opacity

### Layout Strategy

- Position: absolute
- z-index: 999 or similar high value to stay above content
- Placement calculated from placement prop:
  - top/bottom: 16px from edge
  - left/right: 16px from edge
  - center: use alignSelf or left: 50% with transform
- Extended FAB: flexDirection row, alignItems center, gap between icon and label

### Performance Considerations

- Use native driver for press animations
- Memoize icon component to prevent re-renders
- Minimal re-renders (only on disabled/variant changes)
- Shadow rendering optimized (use elevation on Android, shadowColor on iOS)

### Customization Points

- Size presets for different screen contexts
- Placement options for flexible positioning
- Extended variant with label for better UX
- Variant for color theming
- Custom style prop for edge cases
- Icon component fully customizable
- Press animation customizable (scale factor, duration)
