# Alert

## Overview

Inline notification component for displaying important messages with contextual variants (info, success, warning, error) and optional dismiss action. Provides prominent, color-coded feedback for user actions or system states.

## Component Behavior

Alert renders a colored container with icon, title, description, and optional dismiss button. Variant determines color scheme and default icon. Title and description stack vertically or appear inline. Dismiss button triggers onDismiss callback and typically removes alert from view. Action button provides optional CTA within alert.

## Props

### Required Props

| Prop     | Type        | Description                                                |
| -------- | ----------- | ---------------------------------------------------------- |
| children | `ReactNode` | Alert message content (description text or custom content) |

### Optional Props

| Prop        | Type                                          | Default         | Description                                                 |
| ----------- | --------------------------------------------- | --------------- | ----------------------------------------------------------- |
| variant     | `"info" \| "success" \| "warning" \| "error"` | `"info"`        | Semantic type determining color scheme and default icon     |
| title       | `string`                                      | `undefined`     | Bold heading text above description                         |
| dismissible | `boolean`                                     | `false`         | Show dismiss X button in top-right                          |
| onDismiss   | `() => void`                                  | `undefined`     | Callback when dismiss button pressed                        |
| icon        | `ReactNode`                                   | variant default | Custom icon element (overrides variant default icon)        |
| action      | `ReactNode`                                   | `undefined`     | Custom action button or element (e.g., "Learn More" button) |
| style       | `StyleProp<ViewStyle>`                        | `undefined`     | Additional custom styles for container                      |

### Extends

`ViewProps` - All standard React Native View props

## Variants

### Semantic Types

- **info**: Blue color scheme with info (i) icon. For general information or tips
- **success**: Green color scheme with checkmark icon. For successful operations or confirmations
- **warning**: Yellow/orange color scheme with warning triangle icon. For cautionary messages or non-critical issues
- **error**: Red color scheme with error/alert icon. For errors, failures, or critical issues

## States

- **default**: Alert visible and interactive
- **dismissed**: Alert hidden after dismiss button pressed (managed by parent)

## Theme Support

- Light mode:
  - info: light blue background (#DBEAFE), dark blue text (#1E40AF), blue icon
  - success: light green background (#D1FAE5), dark green text (#065F46), green icon
  - warning: light yellow background (#FEF3C7), dark yellow text (#92400E), yellow icon
  - error: light red background (#FEE2E2), dark red text (#991B1B), red icon
- Dark mode:
  - info: darker blue background (#1E3A8A), light blue text (#BFDBFE), lighter icon
  - success: darker green background (#065F46), light green text (#A7F3D0), lighter icon
  - warning: darker yellow background (#92400E), light yellow text (#FDE68A), lighter icon
  - error: darker red background (#991B1B), light red text (#FECACA), lighter icon
- Dynamic switching: useColorScheme() for theme detection

## Accessibility Requirements

- role="alert" for important/immediate messages
- accessibilityLiveRegion="polite" for non-critical, "assertive" for critical errors
- Title uses semantic heading (announce as heading)
- Dismiss button:
  - accessibilityLabel="Dismiss alert"
  - accessibilityRole="button"
- Sufficient color contrast for text on colored backgrounds (WCAG AA)
- Icon decorative or has accessibilityLabel if conveying information

## Usage Examples

### Basic Usage

```tsx
<Alert variant="success">Your changes have been saved successfully.</Alert>
```

### Advanced Usage

```tsx
<Alert
  variant="error"
  title="Payment Failed"
  dismissible
  onDismiss={() => setShowAlert(false)}
  action={<Button onPress={retry}>Retry</Button>}
>
  Your payment could not be processed. Please check your card details and try
  again.
</Alert>
```

## Edge Cases

- **dismissible without onDismiss**: Dismiss button appears but does nothing (should warn)
- **Very long content**: Alert height grows naturally, consider max height with scroll
- **No children**: Alert renders with just title (if provided) or empty
- **Custom icon with variant**: Custom icon overrides variant default
- **action with dismiss**: Both buttons coexist (action left, dismiss right in header)

## Dependencies

- Optional: Icon library (Ionicons, etc.) for variant icons and dismiss X
- Typography component for consistent text styling

## Design Considerations

### Styling Approach

- Container: Rounded rectangle with background color from variant
- Layout: Icon | Content (Title + Description) | Actions (Dismiss/Action buttons)
- Title: Bold text, larger fontSize
- Description: Normal text (children content)
- Icons: Size ~20px, colored to match variant theme
- Padding: 12-16px all around

### Layout Strategy

- Horizontal row: Icon (flex: 0) | Content (flex: 1) | Buttons (flex: 0)
- Content stack: Title | Children (vertical)
- Title and description use variant text color
- Action button (if provided) aligns to bottom of alert or inline with text

### Performance Considerations

- Memoize variant color mapping
- Icons can be lazy loaded or preloaded
- Avoid re-renders when alert is dismissed (remove from tree, don't hide)
- Animated entrance/exit optional but performant with native driver

### Customization Points

- Four semantic variants with color/icon presets
- Custom icon override for brand icons
- dismissible toggle for temporary vs persistent alerts
- action prop for contextual CTAs
- Can add animation on mount/unmount
- Can stack multiple alerts with Alert stack component
