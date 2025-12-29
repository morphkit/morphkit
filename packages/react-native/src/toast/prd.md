# Toast

## Overview

A temporary notification component that appears at the top or bottom of the screen to provide brief feedback about an operation. Features slide-in animation and auto-dismiss capability. User manages visibility state (simple presentational component, not context-based).

## Component Behavior

Toast slides in from top or bottom when visible, displays a message with an icon, and automatically dismisses after a specified duration (or remains until manually dismissed if duration is 0). Uses spring animation for natural entrance and fade-out animation for exit.

The component is controlled by the visible prop - when true, it animates in; when false, it animates out and unmounts. Auto-dismiss is handled via setTimeout when duration > 0.

## Props

### Required Props

| Prop    | Type        | Description                           |
| ------- | ----------- | ------------------------------------- |
| visible | \`boolean\` | Controls toast visibility (show/hide) |
| message | \`string\`  | Notification message text             |

### Optional Props

| Prop      | Type                     | Default      | Description                                           |
| --------- | ------------------------ | ------------ | ----------------------------------------------------- | --------------- | ---------- | ------------------------------ |
| variant   | \`"info" \\              | "success" \\ | "warning" \\                                          | "error"\`       | \`"info"\` | Semantic color theme with icon |
| duration  | \`number\`               | \`3000\`     | Auto-dismiss duration in ms (0 = manual dismiss only) |
| position  | \`"top" \\               | "bottom"\`   | \`"bottom"\`                                          | Screen position |
| onDismiss | \`() => void\`           | -            | Callback for auto-dismiss or manual close             |
| style     | \`StyleProp<ViewStyle>\` | -            | Custom container styles                               |

### Extends

\`ViewProps\` - All standard React Native View props

## Variants

### Visual Styles

- **info**: Blue theme - General notifications, information (icon: ℹ)
- **success**: Green theme - Success confirmations (icon: ✓)
- **warning**: Orange theme - Warnings, cautions (icon: ⚠)
- **error**: Red theme - Error messages, failures (icon: ✕)

## Positions

- **top**: Slides down from top, positioned 48px from screen top
- **bottom**: Slides up from bottom, positioned 48px from screen bottom (default)

## States

- **Hidden**: Not rendered (returns null when invisible and animation complete)
- **Animating In**: Spring animation sliding into position
- **Visible**: Fully visible, auto-dismiss timer running (if duration > 0)
- **Animating Out**: Fade and slide animation exiting

## Theme Support

### Light Mode Colors

- **info**: #EFF6FF background, #DBEAFE border, #1E40AF text, #3B82F6 icon
- **success**: #F0FDF4 background, #D1FAE5 border, #065F46 text, #10B981 icon
- **warning**: #FFFBEB background, #FEF3C7 border, #92400E text, #F59E0B icon
- **error**: #FEF2F2 background, #FEE2E2 border, #991B1B text, #EF4444 icon

### Dark Mode Colors

Same as Alert component (shared color palette).

## Accessibility Requirements

- \`accessibilityRole="alert"\` - Screen reader announces immediately
- \`accessibilityLiveRegion="polite"\` - Non-intrusive announcements
- Sufficient contrast ratios for text on colored backgrounds
- Visible for minimum 3 seconds (default) for readability

## Usage Examples

### Basic Toast

\`\`\`tsx
const [visible, setVisible] = useState(false);

<Toast
visible={visible}
message="Changes saved successfully"
onDismiss={() => setVisible(false)}
/>
\`\`\`

### Variants

\`\`\`tsx
<Toast visible variant="success" message="File uploaded" onDismiss={...} />
<Toast visible variant="error" message="Connection failed" onDismiss={...} />
<Toast visible variant="warning" message="Storage almost full" onDismiss={...} />
\`\`\`

### Top Position

\`\`\`tsx
<Toast
  visible
  position="top"
  message="New message received"
  onDismiss={...}
/>
\`\`\`

### Manual Dismiss (No Auto-dismiss)

\`\`\`tsx
<Toast
  visible
  message="Action required"
  duration={0}
  onDismiss={handleManualDismiss}
/>
\`\`\`

### Custom Duration

\`\`\`tsx
<Toast
  visible
  message="Quick notification"
  duration={1500}
  onDismiss={...}
/>
\`\`\`

## Edge Cases

- Multiple toasts: User must manage stacking/queuing in parent component
- Very long messages: Text will wrap, toast height increases
- Duration 0: Toast stays visible until user sets visible to false
- Dismiss during animation: Animation completes before unmounting

## Animation Details

### Entrance Animation

- Spring animation (friction: 8, tension: 40)
- Translates from off-screen to final position
- Simultaneous opacity fade-in (0 → 1)
- Native driver enabled for performance

### Exit Animation

- Timing animation (duration: 200ms)
- Translates back off-screen
- Simultaneous opacity fade-out (1 → 0)
- Native driver enabled

### Auto-dismiss Behavior

- Timer starts when visible becomes true
- Timer cleared on unmount or when visible becomes false
- Calls onDismiss when timer expires
- Parent must set visible to false in onDismiss to trigger exit animation

## Design Considerations

### Styling Approach

Absolutely positioned with fixed left/right margins (16px). Shadow and elevation for depth perception. Rounded corners (8px) and border (1px) matching Alert component for consistency.

### Layout Strategy

Horizontal flex layout with icon and message. Message uses flex: 1 to expand and wrap text. Position calculated via top or bottom style with fixed offset.

### Performance Considerations

- Uses Animated.spring for natural motion
- Native driver for transform and opacity
- Unmounts when not visible to reduce component tree
- Single timer instance, cleaned up properly

### Customization Points

- 4 semantic variants with icons
- 2 position options (top/bottom)
- Configurable auto-dismiss duration
- Custom styling via style prop
- User-controlled visibility state
