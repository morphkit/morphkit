# Tag

## Overview

A small pill-shaped label component for categorization, status indication, and content classification. Supports multiple color variants, sizes, and optional dismiss functionality.

## Component Behavior

Tag renders as a compact, pill-shaped container with rounded corners. When dismissible, it includes a close button (×) that triggers the onDismiss callback. Non-dismissible tags are static View components, while dismissible tags include interactive Pressable dismiss buttons.

## Props

### Required Props

| Prop     | Type        | Description        |
| -------- | ----------- | ------------------ |
| children | `ReactNode` | Tag content (text) |

### Optional Props

| Prop        | Type                                                          | Default     | Description                             |
| ----------- | ------------------------------------------------------------- | ----------- | --------------------------------------- |
| variant     | `"default" \| "primary" \| "success" \| "warning" \| "error"` | `"default"` | Color theme variant                     |
| size        | `"sm" \| "md" \| "lg"`                                        | `"md"`      | Size preset                             |
| dismissible | `boolean`                                                     | `false`     | Shows dismiss button (×) when true      |
| onDismiss   | `() => void`                                                  | -           | Callback when dismiss button is pressed |
| style       | `StyleProp<ViewStyle>`                                        | -           | Custom container styles                 |

### Extends

`ViewProps` - All standard React Native View props

## Variants

### Visual Styles

- **default**: Gray background, neutral for general labels
- **primary**: Blue background, primary actions or categories
- **success**: Green background, positive states or success messages
- **warning**: Orange background, caution or attention needed
- **error**: Red background, errors or destructive states

## Sizes

- **sm**: 6px padding, 11px font, 20px min height - Compact tags
- **md**: 8px padding, 13px font, 24px min height - Standard tags (default)
- **lg**: 10px padding, 15px font, 32px min height - Prominent tags

## States

- **Static**: Non-dismissible tag (View component)
- **Dismissible**: Tag with close button (includes Pressable for dismiss)

## Theme Support

### Light Mode Colors

- default: #E5E7EB background, #374151 text
- primary: #DBEAFE background, #1E40AF text
- success: #D1FAE5 background, #065F46 text
- warning: #FEF3C7 background, #92400E text
- error: #FEE2E2 background, #991B1B text

### Dark Mode Colors

- default: #374151 background, #E5E7EB text
- primary: #1E3A8A background, #DBEAFE text
- success: #064E3B background, #D1FAE5 text
- warning: #78350F background, #FEF3C7 text
- error: #7F1D1D background, #FEE2E2 text

## Accessibility Requirements

- `accessibilityRole="text"` for static tags
- `accessibilityRole="button"` for dismiss button with `accessibilityLabel="Dismiss"`
- `hitSlop={8}` on dismiss button for easier tap target

## Usage Examples

### Basic Usage

```tsx
<Tag>Featured</Tag>
```

### Variants

```tsx
<Tag variant="primary">New</Tag>
<Tag variant="success">Active</Tag>
<Tag variant="warning">Pending</Tag>
<Tag variant="error">Error</Tag>
```

### Sizes

```tsx
<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>
```

### Dismissible

```tsx
<Tag dismissible onDismiss={() => console.log("Dismissed")}>
  Dismissible Tag
</Tag>
```

## Edge Cases

- Empty children: Tag will render but appear empty
- Long text: Text will wrap or overflow based on container constraints
- Dismiss without onDismiss: Dismiss button renders but has no action

## Design Considerations

### Styling Approach

Pill-shaped with borderRadius: 999 for fully rounded ends. Uses flexDirection: row for horizontal layout with icon/text alignment.

### Layout Strategy

Inline-flex layout allows tags to wrap naturally in flex containers. Min-height ensures consistent vertical alignment across different content.

### Performance Considerations

Static tags use View (no event listeners), dismissible tags use Pressable only for dismiss button to minimize unnecessary touch handling.

### Customization Points

- 5 color variants with light/dark theme support
- 3 size presets
- Optional dismiss functionality
- Custom styling via style prop
