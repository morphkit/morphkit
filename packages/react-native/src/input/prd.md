# Input

## Overview

Single-line text input field with label, placeholder, error state, and prefix/suffix icon support for various data entry needs. Provides clear visual states for focus, error, and disabled conditions with full accessibility support.

## Component Behavior

Input renders a labeled text field with configurable styling variants. Clicking/tapping focuses the field and shows keyboard. Label appears above input. Placeholder shows when empty. Error message displays below when error prop provided. Prefix/suffix icons render inside input container for common patterns like search or password visibility toggle.

## Props

### Required Props

| Prop         | Type                     | Description                      |
| ------------ | ------------------------ | -------------------------------- |
| value        | `string`                 | Current input value (controlled) |
| onChangeText | `(text: string) => void` | Callback when text changes       |

### Optional Props

| Prop        | Type                                          | Default     | Description                                      |
| ----------- | --------------------------------------------- | ----------- | ------------------------------------------------ |
| label       | `string`                                      | `undefined` | Text label above input                           |
| placeholder | `string`                                      | `undefined` | Placeholder text shown when empty                |
| error       | `string`                                      | `undefined` | Error message text shown below input             |
| disabled    | `boolean`                                     | `false`     | Disables input interaction                       |
| prefixIcon  | `ReactNode`                                   | `undefined` | Icon or element shown before text (inside input) |
| suffixIcon  | `ReactNode`                                   | `undefined` | Icon or element shown after text (inside input)  |
| size        | `"sm" \| "md" \| "lg"`                        | `"md"`      | Size preset for height, fontSize, padding        |
| variant     | `"outline" \| "filled"`                       | `"outline"` | Visual style of input container                  |
| type        | `"text" \| "email" \| "password" \| "number"` | `"text"`    | Input type affecting keyboard and behavior       |
| style       | `StyleProp<ViewStyle>`                        | `undefined` | Additional custom styles for wrapper             |

### Extends

`Omit<TextInputProps, "style">` - All TextInput props except style (value, onChangeText excluded from Omit as they're required)

## Variants

### Visual Style

- **outline**: Border with transparent background. Clean, standard input appearance
- **filled**: No border, gray background. Softer, less prominent styling

### Sizes

- **sm**: height: 36, fontSize: 14, padding: 8
- **md**: height: 44, fontSize: 16, padding: 12
- **lg**: height: 52, fontSize: 18, padding: 16

## States

- **default**: Unfocused, no error, enabled
- **focused**: Border color changes to primary blue, label may shrink/move depending on design
- **error**: Border color red, error message visible below, error icon possible
- **disabled**: Reduced opacity, gray background, no interaction

## Theme Support

- Light mode:
  - outline: white background, gray border (#E5E7EB), dark text (#1F2937)
  - filled: light gray background (#F3F4F6), no border, dark text
  - Focus: primary blue border (#4A90E2)
  - Error: red border and text (#EF4444)
- Dark mode:
  - outline: dark background (#374151), lighter border (#4B5563), light text (#F9FAFB)
  - filled: slightly lighter background (#4B5563), no border, light text
  - Focus: lighter primary border (#5AA2F5)
  - Error: lighter red border and text (#F87171)
- Dynamic switching: useColorScheme() for theme detection

## Accessibility Requirements

- accessibilityLabel from label prop
- accessibilityHint from placeholder (optional)
- accessibilityInvalid when error present
- Label and input associated (iOS: accessibilityLabeledBy, Android: handled by layout)
- Error text has accessibilityLiveRegion="polite" for announcements
- Focus management: autofocus prop for important fields
- Sufficient color contrast for text and borders (WCAG AA)

## Usage Examples

### Basic Usage

```tsx
<Input
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="you@example.com"
  type="email"
/>
```

### Advanced Usage

```tsx
<Input
  label="Password"
  value={password}
  onChangeText={setPassword}
  type="password"
  size="lg"
  variant="filled"
  error={passwordError}
  suffixIcon={<Icon name="eye" onPress={toggleVisibility} />}
/>
```

## Edge Cases

- **Error with no error text**: Shows error styling but no message
- **Both prefix and suffix icons**: Both render with proper spacing
- **Very long error message**: Wraps to multiple lines below input
- **No label**: Input renders without label, ensure accessibilityLabel provided
- **type="number" with non-numeric input**: TextInput handles validation natively
- **Multiline accidentally**: Input is single-line only, use Textarea for multiline

## Dependencies

None - Standalone component. May use icon library for prefix/suffix icons.

## Design Considerations

### Styling Approach

- Wrapper View contains: Label (Text) + Input Container (View) + Error (Text)
- Input Container holds: PrefixIcon + TextInput + SuffixIcon
- Size determines TextInput height, fontSize, paddingHorizontal
- Variant determines background and border styling
- Focus state managed via onFocus/onBlur callbacks updating local state

### Layout Strategy

- Vertical stack: Label | Input Container | Error
- Input Container: Horizontal row with icons and TextInput
- TextInput flex: 1 to fill space between icons
- Icons positioned with padding from edges

### Performance Considerations

- Memoize style computations based on size, variant, state
- Debounce onChangeText for expensive operations (API calls)
- Avoid inline style objects

### Customization Points

- Size and variant presets
- Prefix/suffix for common patterns
- Error state fully controlled
- Type prop maps to keyboard types
- Can extend with input masks, formatting
- Label can be customized with typography component
