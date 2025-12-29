# Switch

## Overview
Toggle switch for binary on/off states with iOS and Android platform-specific styling. Provides familiar toggle interaction for boolean settings with clear visual indication of current state.

## Component Behavior
Switch displays a pill-shaped track with circular thumb. Tapping toggles state, thumb animates from one side to other. On state shows primary color track with thumb on right. Off state shows gray track with thumb on left. Animated transition provides satisfying feedback. Label text optionally renders beside switch.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| checked | `boolean` | Current on/off state (controlled) |
| onCheckedChange | `(checked: boolean) => void` | Callback when user toggles switch |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | `undefined` | Text label displayed next to switch |
| disabled | `boolean` | `false` | Disables switch interaction |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size of switch track and thumb |
| color | `string` | theme primary | Color of track when checked |
| style | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles for wrapper |

### Extends
`ViewProps` - All standard React Native View props

## Variants

### Sizes
- **sm**: 32x20 track, 16x16 thumb (iOS style)
- **md**: 40x24 track, 20x20 thumb
- **lg**: 48x28 track, 24x24 thumb

## States
- **off**: Gray track, white thumb positioned on left side
- **on**: Primary color track, white thumb positioned on right side
- **disabled**: Reduced opacity (0.5), no interaction, maintains on/off appearance

## Theme Support
- Light mode:
  - Off: gray track (#D1D5DB), white thumb
  - On: primary blue track (#4A90E2), white thumb
  - Disabled: same colors with 0.5 opacity
- Dark mode:
  - Off: darker gray track (#6B7280), white thumb
  - On: lighter primary track (#5AA2F5), white thumb
  - Disabled: same colors with 0.5 opacity
- Dynamic switching: useColorScheme() for theme detection
- Custom color: color prop overrides on-state track color

## Accessibility Requirements
- role="switch"
- accessibilityState: { checked }
- accessibilityLabel from label prop or custom accessibilityLabel
- Minimum touch target: 44x44 points (add padding if switch smaller)
- Keyboard support (web): Space toggles, Enter submits form
- Focus indicator visible when focused
- Announce state changes to screen readers

## Usage Examples

### Basic Usage
```tsx
<Switch
  checked={notificationsEnabled}
  onCheckedChange={setNotificationsEnabled}
  label="Enable Notifications"
/>
```

### Advanced Usage
```tsx
<Switch
  checked={isDarkMode}
  onCheckedChange={setIsDarkMode}
  label="Dark Mode"
  size="lg"
  color="#9333EA"
  disabled={isLoading}
/>
```

## Edge Cases
- **No label**: Switch renders alone, ensure accessibilityLabel provided
- **Very long label**: Label wraps to multiple lines, switch aligns to first line
- **Rapid toggling**: State updates should be debounced if triggering expensive operations
- **disabled with checked=true**: Shows on appearance but prevents interaction
- **Animation interrupted**: New state overrides current animation smoothly

## Dependencies
- React Native Animated API for thumb slide animation
- Optional: Haptic feedback on state change (Expo Haptics)

## Design Considerations

### Styling Approach
- Track: Pill-shaped View with borderRadius = height/2
- Thumb: Circular View positioned absolutely within track
- Thumb position animated between left and right using Animated.Value
- Track color animated between off-gray and on-primary
- Size determines track dimensions and thumb size
- Disabled uses opacity transform on entire switch

### Layout Strategy
- Horizontal layout: Switch | Label (gap: 8px) or Label | Switch depending on design
- Switch wrapper: Pressable for entire touchable area
- Track: relative positioned container
- Thumb: absolute positioned within track
- Animation: translateX for thumb position, backgroundColor interpolation for track

### Performance Considerations
- Use native driver for thumb animation (smooth 60fps)
- Memoize onCheckedChange callback
- Avoid expensive operations in immediate toggle handler
- backgroundColor animation uses interpolation for smooth color transition

### Customization Points
- Size presets for common use cases
- color prop for brand customization
- Label positioning (left vs right of switch)
- Can add haptic feedback on toggle
- Can customize track and thumb colors independently
- Animation duration/easing customizable
- Platform-specific styling (iOS vs Android native appearance)
