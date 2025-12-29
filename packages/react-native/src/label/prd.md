# Label

## Overview

Form label component for describing input fields with optional required indicator and error message display. Provides consistent typography and spacing for form field labels with semantic HTML association on web.

## Component Behavior

Label renders text above or beside form inputs to describe their purpose. When required prop is true, displays red asterisk suffix. Error state changes text color to red. Associates with input fields for accessibility (click label focuses input on web).

## Props

### Required Props

| Prop     | Type        | Description        |
| -------- | ----------- | ------------------ |
| children | `ReactNode` | Label text content |

### Optional Props

| Prop     | Type                   | Default     | Description                                |
| -------- | ---------------------- | ----------- | ------------------------------------------ |
| htmlFor  | `string`               | `undefined` | ID of associated input (web accessibility) |
| required | `boolean`              | `false`     | Shows red asterisk indicator               |
| error    | `boolean`              | `false`     | Changes text color to error red            |
| size     | `"sm" \| "md" \| "lg"` | `"md"`      | Font size preset                           |
| style    | `StyleProp<TextStyle>` | `undefined` | Additional custom text styles              |

### Extends

`TextProps` - All standard React Native Text props

## Variants

### Sizes

- **sm**: fontSize: 12 - Compact labels for dense forms
- **md**: fontSize: 14 - Standard label size
- **lg**: fontSize: 16 - Large labels for emphasis

## States

- **default**: Normal gray text
- **error**: Red text color indicating invalid input
- **required**: Asterisk suffix in red

## Theme Support

- Light mode:
  - Default: dark gray text (#374151)
  - Error: error red (#EF4444)
  - Required asterisk: error red (#EF4444)
- Dark mode:
  - Default: light gray text (#D1D5DB)
  - Error: lighter error red (#F87171)
  - Required asterisk: lighter error red (#F87171)
- Dynamic switching: useColorScheme() for theme colors

## Accessibility Requirements

- Associates with input via htmlFor on web (native: handled by layout proximity)
- Required fields announced by screen readers via asterisk or accessibilityHint
- Error state announced via color change and associated error text
- Sufficient contrast ratio for text color (WCAG AA: 4.5:1 for small text)

## Usage Examples

### Basic Usage

```tsx
<Label>Email Address</Label>
<Input value={email} onChangeText={setEmail} />
```

### Advanced Usage

```tsx
<Label required error={hasError} size="lg" htmlFor="password-input">
  Password
</Label>
<Input
  id="password-input"
  value={password}
  onChangeText={setPassword}
  error={passwordError}
/>
```

## Edge Cases

- **Empty children**: Renders empty label (minimal height)
- **required with error**: Both asterisk and error color apply
- **htmlFor with no matching input**: No effect (web specific)
- **Very long label text**: Wraps to multiple lines
- **Label without associated input**: Still renders, but loses semantic connection

## Dependencies

None - Standalone text component.

## Design Considerations

### Styling Approach

- Base Text component with size-based fontSize
- Color determined by error state (error red vs default gray)
- Required asterisk appended to children as styled Text span
- marginBottom: 4px for spacing from input

### Layout Strategy

- Typically renders above input in vertical layout
- Can also render beside input for horizontal forms
- Width: 100% to align with input width
- No flex properties - inherits from parent

### Performance Considerations

- Lightweight Text component
- Memoize style computations
- Required asterisk can be fragment or inline Text

### Customization Points

- Size presets for typography scale
- Error state styling
- Required indicator (asterisk) can be customized or hidden
- Can extend with tooltip/help icon
- Style prop for one-off adjustments
