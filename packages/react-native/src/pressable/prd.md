# Pressable

## Overview
Enhanced touchable wrapper component with platform-specific ripple effects and press state styling for creating custom interactive elements.

## Component Behavior
Pressable wraps React Native's Pressable with additional functionality and platform-specific feedback. Provides multiple feedback variants: default (no visual), ripple (Android material ripple, iOS opacity), and highlight (background color change). Children can be static ReactNode or render function receiving press state for dynamic styling. Commonly used as base for buttons, cards, list items, and custom interactive components.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| children | `ReactNode \| ((state: PressableState) => ReactNode)` | Content or render function |
| onPress | `() => void` | Press callback |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"default" \| "ripple" \| "highlight"` | `"default"` | Press feedback style |
| disabled | `boolean` | `false` | Disables interaction |
| rippleColor | `string` | theme primary (Android) | Ripple effect color |
| highlightColor | `string` | `rgba(0,0,0,0.05)` light | Background color on press |
| style | `StyleProp<ViewStyle> \| ((state: PressableState) => StyleProp<ViewStyle>)` | `undefined` | Static or dynamic styles |

### Extends
`Omit<RNPressableProps, "children" | "style">` - All standard Pressable props except children and style (custom implementations)

Inherited props include:
- `hitSlop`: Extends touchable area
- `pressRetentionOffset`: Area to retain press
- `delayLongPress`: Long press delay
- `onLongPress`: Long press callback
- `onPressIn`, `onPressOut`: Touch lifecycle callbacks
- `android_ripple`: Native ripple config (overridden by variant)
- `android_disableSound`: Disable Android touch sound
- `testID`: Test identifier

## Variants

### Feedback Variants
- **default**: No visual feedback, completely custom styling via render function
- **ripple**: Material Design ripple on Android, opacity change on iOS (0.2 opacity)
- **highlight**: Background color overlay on press (platform-agnostic)

### PressableState Type
```typescript
interface PressableState {
  pressed: boolean;
  hovered?: boolean; // Web only
  focused?: boolean; // Web/TV
}
```

## States
- **default**: Idle state, no interaction
- **pressed**: Active press, feedback based on variant
- **hovered**: Mouse hover (web only)
- **focused**: Keyboard focus (web/TV only)
- **disabled**: No interaction, no feedback

## Theme Support
- Light mode:
  - Ripple color: Primary (#4A90E2) with opacity
  - Highlight color: rgba(0, 0, 0, 0.05)
- Dark mode:
  - Ripple color: Lighter primary (#5AA2F5) with opacity
  - Highlight color: rgba(255, 255, 255, 0.1)

## Accessibility Requirements
- Inherits all Pressable accessibility props:
  - `accessibilityRole`: Specify role ("button", "link", etc.)
  - `accessibilityLabel`: Descriptive label
  - `accessibilityHint`: Additional context
  - `accessibilityState`: Include `{ disabled }` when disabled
  - `accessible`: Defaults to true
- Minimum touch target: 44x44 (use hitSlop if smaller)
- Screen reader announces role and state

## Usage Examples

### Basic Usage
```tsx
<Pressable onPress={handlePress} variant="ripple">
  <Text>Press me</Text>
</Pressable>
```

### Advanced Usage with Render Function
```tsx
<Pressable
  onPress={handlePress}
  variant="highlight"
  highlightColor="rgba(74, 144, 226, 0.1)"
  style={({ pressed }) => [
    styles.card,
    pressed && styles.cardPressed
  ]}
  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
  accessibilityRole="button"
  accessibilityLabel="Select item"
>
  {({ pressed }) => (
    <>
      <Icon color={pressed ? '#4A90E2' : '#6B7280'} />
      <Text style={pressed && styles.textPressed}>
        Dynamic content
      </Text>
    </>
  )}
</Pressable>
```

### Long Press Example
```tsx
<Pressable
  onPress={handlePress}
  onLongPress={handleLongPress}
  delayLongPress={500}
  variant="ripple"
>
  <Image source={photo} />
</Pressable>
```

## Edge Cases
- **Nested pressables**: Avoid nesting, only innermost will work (stopPropagation)
- **ScrollView within Pressable**: Use `delayLongPress` and `pressRetentionOffset` carefully
- **Disabled with callbacks**: onPress/onLongPress should check disabled state
- **Rapidly changing disabled**: May cause unexpected press states
- **Custom ripple on iOS**: Falls back to opacity since ripple is Android-only
- **Touch target too small**: Use hitSlop to extend touchable area

## Dependencies
- React Native Pressable (built-in)
- Platform detection for variant behavior differences

## Design Considerations

### Styling Approach
- Variant "default": No built-in feedback, rely on style render function
- Variant "ripple":
  - Android: Native ripple via `android_ripple` prop
  - iOS: activeOpacity-like behavior with style function
- Variant "highlight": backgroundColor overlay in style function
- Disabled: Opacity 0.5 or custom disabled styles

### Platform Differences
- **Android**:
  - Ripple variant uses native `android_ripple` prop
  - Ripple expands from touch point
  - Bounded or unbounded ripple options
- **iOS**:
  - Ripple variant falls back to opacity change (pressed ? 0.2 : 1)
  - No native ripple effect
- **Web**:
  - Additional hover state available
  - Focus state for keyboard navigation
  - CSS cursor: pointer on hover

### Performance Considerations
- Use native driver for ripple animations (Android handles natively)
- Memoize children if complex components to avoid re-renders
- Avoid expensive computations in style render function (called frequently)
- Debounce rapid presses if needed at app level

### Customization Points
- Three feedback variants for different UX needs
- Render function for children enables dynamic content based on state
- Render function for style enables dynamic styling
- Full Pressable prop support (hitSlop, delayLongPress, etc.)
- Custom ripple/highlight colors
- Platform-specific behavior customization
- Accessible by default with flexible accessibility props

### Use Cases
- Base component for Button, Card, ListItem, etc.
- Custom interactive elements (image galleries, product cards)
- Touch feedback for any custom component
- Replacement for TouchableOpacity/TouchableHighlight with modern API
