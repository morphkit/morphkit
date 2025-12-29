# Tag

## Overview

Small label component for categorization, status display, or metadata with color variants and dismissible option. Provides compact, color-coded labels for filtering, tagging, and status indication.

## Component Behavior

Tag renders a compact pill-shaped label with text and optional icon. Dismissible tags show X button that triggers onDismiss callback. Variants control visual style (solid, outline, subtle). Color prop determines semantic color scheme.

## Props

### Required Props

| Prop     | Type        | Description      |
| -------- | ----------- | ---------------- |
| children | `ReactNode` | Tag text content |

### Optional Props

| Prop        | Type                                                       | Default     | Description                                       |
| ----------- | ---------------------------------------------------------- | ----------- | ------------------------------------------------- |
| variant     | `"solid" \| "outline" \| "subtle"`                         | `"solid"`   | Visual style determining fill vs border treatment |
| color       | `"primary" \| "success" \| "warning" \| "error" \| "gray"` | `"gray"`    | Semantic color scheme                             |
| size        | `"sm" \| "md" \| "lg"`                                     | `"md"`      | Size preset for padding and fontSize              |
| dismissible | `boolean`                                                  | `false`     | Show dismiss X button                             |
| onDismiss   | `() => void`                                               | `undefined` | Callback when dismiss button pressed              |
| icon        | `ReactNode`                                                | `undefined` | Icon element before text                          |
| style       | `StyleProp<ViewStyle>`                                     | `undefined` | Additional custom styles                          |

### Extends

`ViewProps` - All standard React Native View props

## Variants

### Visual Styles

- **solid**: Filled background with white text
- **outline**: Border with transparent background, colored text
- **subtle**: Light background with darker text (tinted background)

### Color Schemes

- **primary**: Blue tones
- **success**: Green tones
- **warning**: Yellow/orange tones
- **error**: Red tones
- **gray**: Neutral gray tones

### Sizes

- **sm**: padding: 2px 6px, fontSize: 11, borderRadius: 3
- **md**: padding: 4px 8px, fontSize: 12, borderRadius: 4
- **lg**: padding: 6px 10px, fontSize: 14, borderRadius: 6

## States

- **default**: Standard tag appearance
- **dismissible**: Shows X button for removal

## Theme Support

Each color has light/dark variants:

- Light: vibrant colors, sufficient contrast
- Dark: muted colors, softer appearance
- Solid variant adjusts text color for readability

## Accessibility Requirements

- role="status" for informational tags
- dismissible tags:
  - Dismiss button role="button"
  - accessibilityLabel="Dismiss {tag content}"
- Sufficient contrast for text on backgrounds
- Minimum touch target for dismiss button (44x44)

## Usage Examples

### Basic Usage

```tsx
<Tag>Design</Tag>
<Tag color="primary">React Native</Tag>
<Tag color="success">Completed</Tag>
```

### Advanced Usage

```tsx
<Tag
  variant="outline"
  color="error"
  dismissible
  onDismiss={() => removeTag("urgent")}
  icon={<Icon name="alert" />}
>
  Urgent
</Tag>
```

## Edge Cases

- **dismissible without onDismiss**: Button shows but does nothing
- **Very long text**: Tag expands horizontally, may wrap
- **Empty children**: Renders minimal tag (just icon if provided)
- **Icon with small size**: Icon may be cramped, adjust sizing

## Dependencies

Optional: Icon library for dismiss X and custom icons

## Design Considerations

### Styling Approach

- Pill-shaped container (high borderRadius)
- Variant determines background, border, text color
- Color maps to theme color palette
- Size controls padding, fontSize, borderRadius

### Layout Strategy

- Horizontal row: Icon | Text | Dismiss Button
- Inline-flex for natural sizing
- Gap between elements: 4px

### Performance Considerations

- Memoize color/variant style mapping
- Avoid inline style objects
- Multiple tags render efficiently

### Customization Points

- Five color options
- Three visual variants
- Three size presets
- dismissible toggle
- Custom icon support
- Can group tags in Tag cloud/list
