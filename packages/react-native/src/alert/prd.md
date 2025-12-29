# Alert

## Overview

An inline notification component for displaying important messages to users. Supports four semantic variants (info, success, warning, error) with appropriate color coding and icons. Optional dismiss functionality allows users to close alerts.

## Component Behavior

Alert renders as a horizontally-laid-out notification with an icon on the left, title and optional description in the center, and an optional dismiss button (×) on the right. Non-dismissible alerts are static View components. Dismissible alerts include an interactive Pressable dismiss button that triggers the onDismiss callback.

## Props

### Required Props

| Prop  | Type       | Description                     |
| ----- | ---------- | ------------------------------- |
| title | \`string\` | Bold heading text for the alert |

### Optional Props

| Prop        | Type                     | Default      | Description                                  |
| ----------- | ------------------------ | ------------ | -------------------------------------------- | --------- | ---------- | -------------------- |
| variant     | \`"info" \\              | "success" \\ | "warning" \\                                 | "error"\` | \`"info"\` | Semantic color theme |
| description | \`string\`               | -            | Additional descriptive text below title      |
| dismissible | \`boolean\`              | \`false\`    | Shows dismiss button when true               |
| onDismiss   | \`() => void\`           | -            | Callback when dismiss button is pressed      |
| icon        | \`ReactNode\`            | Variant      | Custom icon (overrides default variant icon) |
| style       | \`StyleProp<ViewStyle>\` | -            | Custom container styles                      |

### Extends

\`ViewProps\` - All standard React Native View props

## Variants

### Visual Styles

- **info**: Blue theme - Informational messages, tips, general notifications (icon: ℹ)
- **success**: Green theme - Success confirmations, completed actions (icon: ✓)
- **warning**: Orange theme - Warnings, caution messages, attention needed (icon: ⚠)
- **error**: Red theme - Error messages, failed operations, critical issues (icon: ✕)

## States

- **Static**: Non-dismissible alert (View component)
- **Dismissible**: Alert with close button that calls onDismiss

## Theme Support

### Light Mode Colors

- **info**: #EFF6FF background, #DBEAFE border, #1E40AF text, #3B82F6 icon
- **success**: #F0FDF4 background, #D1FAE5 border, #065F46 text, #10B981 icon
- **warning**: #FFFBEB background, #FEF3C7 border, #92400E text, #F59E0B icon
- **error**: #FEF2F2 background, #FEE2E2 border, #991B1B text, #EF4444 icon

### Dark Mode Colors

- **info**: #1E3A8A background, #1E40AF border, #DBEAFE text, #60A5FA icon
- **success**: #064E3B background, #065F46 border, #D1FAE5 text, #34D399 icon
- **warning**: #78350F background, #92400E border, #FEF3C7 text, #FBBF24 icon
- **error**: #7F1D1D background, #991B1B border, #FEE2E2 text, #F87171 icon

## Accessibility Requirements

- \`accessibilityRole="alert"\` - Announces important messages to screen readers
- \`accessibilityRole="button"\` for dismiss button with \`accessibilityLabel="Dismiss alert"\`
- \`hitSlop={8}\` on dismiss button for 44×44 minimum touch target
- Color is not the only indicator (icons and text provide semantic meaning)

## Usage Examples

### Basic Alert

\`\`\`tsx
<Alert title="Your changes have been saved" />
\`\`\`

### With Description

\`\`\`tsx
<Alert
  title="Account created successfully"
  description="Welcome to our platform! You can now access all features."
/>
\`\`\`

### Variants

\`\`\`tsx
<Alert variant="info" title="New features are available" />
<Alert variant="success" title="Payment processed successfully" />
<Alert variant="warning" title="Your session will expire soon" />
<Alert variant="error" title="Failed to connect to server" />
\`\`\`

### Dismissible

\`\`\`tsx
<Alert
title="Cookie preferences updated"
dismissible
onDismiss={() => console.log('Alert dismissed')}
/>
\`\`\`

### Custom Icon

\`\`\`tsx
<Alert
title="Special offer"
icon={<Text>🎉</Text>}
/>
\`\`\`

## Edge Cases

- Long title/description: Text will wrap to multiple lines
- No description: Component height adjusts, only title shown
- Dismiss without onDismiss: Button renders but has no action
- Custom icon type mismatch: Component handles both string and ReactNode

## Design Considerations

### Styling Approach

Horizontal flexbox layout with gap spacing. Rounded corners (8px) and border (1px) for clear visual separation. Background colors are semantic and theme-aware.

### Layout Strategy

Icon and dismiss button fixed width, content area (title + description) flexes to fill available space. Uses flexDirection: row with alignItems: flex-start for top alignment.

### Performance Considerations

Static alerts use View component (no event listeners). Dismissible alerts add single Pressable only for dismiss button, not entire alert.

### Customization Points

- 4 semantic variants with distinct colors
- Optional description for additional context
- Optional dismiss functionality
- Custom icon override
- Custom styling via style prop
- Theme-aware colors for light/dark mode
