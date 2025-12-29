# Toast

## Overview

Temporary notification popup that appears at screen edges with auto-dismiss, variants for different message types. Provides non-intrusive feedback for user actions or system events.

## Component Behavior

Toast slides in from top or bottom edge with animation. Displays message with icon and optional action button. Auto-dismisses after duration (default 3s). User can swipe to dismiss manually. Multiple toasts queue and show sequentially or stack.

## Props

### Required Props

| Prop    | Type     | Description        |
| ------- | -------- | ------------------ |
| message | `string` | Toast message text |

### Optional Props

| Prop      | Type                                          | Default     | Description                                       |
| --------- | --------------------------------------------- | ----------- | ------------------------------------------------- |
| variant   | `"info" \| "success" \| "warning" \| "error"` | `"info"`    | Semantic type determining color and icon          |
| duration  | `number`                                      | `3000`      | Auto-dismiss time in milliseconds. 0 = persistent |
| position  | `"top" \| "bottom"`                           | `"bottom"`  | Screen edge where toast appears                   |
| action    | `{ label: string; onPress: () => void }`      | `undefined` | Optional action button                            |
| onDismiss | `() => void`                                  | `undefined` | Callback when toast dismissed                     |
| style     | `StyleProp<ViewStyle>`                        | `undefined` | Additional custom styles                          |

### Extends

`ViewProps` - All standard React Native View props

## Variants

Same as Alert: info (blue), success (green), warning (yellow), error (red)

## States

- **entering**: Sliding in animation
- **visible**: Displayed and readable
- **exiting**: Sliding out animation
- **dismissed**: Removed from screen

## Theme Support

Similar to Alert with colored backgrounds and contrasting text

## Accessibility Requirements

- role="alert"
- accessibilityLiveRegion="assertive" (interrupts user)
- Auto-announce message when appears
- Action button accessible
- Ensure adequate time to read before auto-dismiss (3s minimum)

## Usage Examples

### Basic Usage

```tsx
showToast({
  message: "File uploaded successfully",
  variant: "success",
});
```

### Advanced Usage

```tsx
showToast({
  message: "Connection lost. Retrying...",
  variant: "error",
  duration: 0,
  action: {
    label: "Retry Now",
    onPress: handleRetry,
  },
  position: "top",
});
```

## Edge Cases

- **Multiple toasts**: Queue or stack (max 3 visible)
- **duration = 0**: Requires manual dismiss (action or swipe)
- **Very long message**: Wraps to multiple lines
- **Rapid toast calls**: Debounce or queue to avoid spam

## Dependencies

- Toast manager/provider for global control
- Gesture handler for swipe-to-dismiss
- Animated API for enter/exit animations

## Design Considerations

### Styling Approach

- Container: Rounded rectangle with shadow
- Color scheme from variant
- Icon + Message + Action button layout
- Positioned absolutely at screen edges

### Layout Strategy

- Portal to app root for z-index control
- Position: top (16px from top) or bottom (16px from bottom)
- Horizontal margins: 16px from sides
- Max width: constrained for readability

### Performance Considerations

- Native driver for animations
- Limit simultaneous toasts (queue excess)
- Remove from tree after exit animation

### Customization Points

- position for flexibility
- duration for different urgency levels
- action for CTAs
- Variant for semantic styling
- Can integrate with global toast provider
