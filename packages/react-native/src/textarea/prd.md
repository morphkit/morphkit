# Textarea

## Overview
Multi-line text input field with auto-resize capability and character count display for longer text entry. Provides expanded input area for paragraphs, descriptions, comments, and other lengthy text content.

## Component Behavior
Textarea renders a multi-line text input with configurable height. User can enter multiple lines of text with line breaks. Auto-resize option expands height as content grows. Character count displays current length vs maxLength. Label appears above, error message below. Supports all standard text input behaviors (select, copy, paste).

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| value | `string` | Current text content (controlled) |
| onChangeText | `(text: string) => void` | Callback when text changes |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | `undefined` | Text label above textarea |
| placeholder | `string` | `undefined` | Placeholder text when empty |
| error | `string` | `undefined` | Error message shown below textarea |
| disabled | `boolean` | `false` | Disables textarea interaction |
| rows | `number` | `4` | Initial number of visible text rows (affects height) |
| maxLength | `number` | `undefined` | Maximum number of characters allowed |
| showCount | `boolean` | `false` | Display character count below textarea |
| autoResize | `boolean` | `false` | Automatically expand height to fit content |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size preset for fontSize and padding |
| style | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles for wrapper |

### Extends
`Omit<TextInputProps, "multiline" | "numberOfLines">` - All TextInput props except multiline and numberOfLines (always multiline)

## Variants

### Sizes
- **sm**: fontSize: 14, padding: 8, lineHeight: 20
- **md**: fontSize: 16, padding: 12, lineHeight: 24
- **lg**: fontSize: 18, padding: 16, lineHeight: 28

## States
- **default**: Unfocused, no error
- **focused**: Border changes to primary blue
- **error**: Red border, error message visible
- **disabled**: Reduced opacity, gray background, no interaction

## Theme Support
Same as Input component:
- Light mode: white background, gray border, dark text
- Dark mode: dark background, lighter border, light text
- Focus: primary blue border
- Error: red border and text
- Dynamic switching: useColorScheme()

## Accessibility Requirements
- accessibilityLabel from label prop
- accessibilityHint from placeholder
- accessibilityInvalid when error present
- multiline accessibility mode enabled
- Character count announced as hint or live region when approaching maxLength
- Focus management: autofocus for important fields
- Sufficient color contrast for text

## Usage Examples

### Basic Usage
```tsx
<Textarea
  label="Description"
  value={description}
  onChangeText={setDescription}
  placeholder="Enter a detailed description..."
  rows={6}
/>
```

### Advanced Usage
```tsx
<Textarea
  label="Bio"
  value={bio}
  onChangeText={setBio}
  maxLength={500}
  showCount
  autoResize
  size="lg"
  error={bioError}
/>
```

## Edge Cases
- **autoResize with maxLength**: Height grows until maxLength reached, then stops accepting input
- **rows with autoResize**: rows sets minimum height, then grows from there
- **Very long text without autoResize**: Content scrollable within fixed height
- **showCount without maxLength**: Shows current character count only (e.g., "150 characters")
- **Rapid typing near maxLength**: May need to prevent input beyond limit with validation
- **Pasted text exceeding maxLength**: Truncate to maxLength automatically

## Dependencies
None - Standalone component using TextInput primitive.

## Design Considerations

### Styling Approach
- Wrapper View: Label | Textarea Container | Footer (error + count)
- Textarea Container: Styled like Input but with multiline TextInput
- Height calculation: rows * lineHeight + padding
- autoResize: Use onContentSizeChange to update height dynamically
- Character count: Text component showing "X / Y characters" or "X characters"

### Layout Strategy
- Vertical stack: Label | Textarea | Footer
- Textarea fills available width
- Height: fixed (based on rows) or dynamic (autoResize)
- Footer row: Error (left) | Character count (right)

### Performance Considerations
- Debounce auto-resize height calculations
- Avoid re-renders on every keystroke for expensive validations
- maxLength enforced natively by TextInput when possible
- Character count updates efficiently (simple string.length)

### Customization Points
- rows for initial height control
- autoResize for dynamic height
- maxLength with showCount for user guidance
- size presets for typography consistency
- Can add rich text formatting (future enhancement)
- Can add resize handle (manual dragging to resize)
- Markdown preview toggle possible for advanced use cases
