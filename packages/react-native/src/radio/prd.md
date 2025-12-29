# Radio

## Overview

Single-selection radio button control with group management for choosing one option from a set. Ensures only one option can be selected at a time within a group with clear visual indication of selection state.

## Component Behavior

RadioGroup manages selection state for child RadioButton components. Only one RadioButton can be selected at a time. Clicking/tapping a RadioButton triggers onValueChange with the button's value. Selected button shows filled circle, unselected show empty circle. Label text is clickable for easier selection.

## Props

### RadioGroup Props

#### Required Props

| Prop          | Type                      | Description                                                     |
| ------------- | ------------------------- | --------------------------------------------------------------- |
| value         | `string`                  | Currently selected RadioButton value (controlled)               |
| onValueChange | `(value: string) => void` | Callback when selection changes. Receives selected button value |
| children      | `ReactNode`               | RadioButton components                                          |

#### Optional Props

| Prop     | Type                   | Default     | Description                                  |
| -------- | ---------------------- | ----------- | -------------------------------------------- |
| disabled | `boolean`              | `false`     | Disables all radio buttons in group          |
| style    | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles for group container |

### RadioButton Props

#### Required Props

| Prop  | Type     | Description                                    |
| ----- | -------- | ---------------------------------------------- |
| value | `string` | Unique identifier for this radio button option |

#### Optional Props

| Prop     | Type                   | Default     | Description                                 |
| -------- | ---------------------- | ----------- | ------------------------------------------- |
| label    | `string`               | `undefined` | Text label displayed next to radio button   |
| disabled | `boolean`              | `false`     | Disables this specific radio button         |
| size     | `"sm" \| "md" \| "lg"` | `"md"`      | Size of radio circle and label text         |
| style    | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles for button wrapper |

### Extends

- RadioGroup: `ViewProps`
- RadioButton: `ViewProps`

## Variants

### Sizes

- **sm**: 16x16 circle, 14px label text
- **md**: 20x20 circle, 16px label text
- **lg**: 24x24 circle, 18px label text

## States

- **unselected**: Empty circle with border only
- **selected**: Outer circle with inner filled circle
- **disabled**: Reduced opacity (0.5), no interaction

## Theme Support

- Light mode:
  - Unselected: transparent background, gray border (#9CA3AF)
  - Selected: primary blue border and fill (#4A90E2), white inner circle
  - Disabled: same with 0.5 opacity
- Dark mode:
  - Unselected: transparent background, lighter gray border (#6B7280)
  - Selected: lighter primary border and fill (#5AA2F5), white inner circle
  - Disabled: same with 0.5 opacity
- Dynamic switching: useColorScheme() for theme detection

## Accessibility Requirements

- RadioGroup:
  - role="radiogroup"
  - accessibilityLabel describing the group (e.g., "Payment method")
- RadioButton:
  - role="radio"
  - accessibilityState: { checked, disabled }
  - accessibilityLabel from label prop
- Minimum touch target: 44x44 points
- Keyboard support (web): Arrow keys navigate, Space selects
- Focus indicator visible on focused button

## Usage Examples

### Basic Usage

```tsx
<RadioGroup value={selected} onValueChange={setSelected}>
  <RadioButton value="option1" label="Option 1" />
  <RadioButton value="option2" label="Option 2" />
  <RadioButton value="option3" label="Option 3" />
</RadioGroup>
```

### Advanced Usage

```tsx
<RadioGroup
  value={paymentMethod}
  onValueChange={setPaymentMethod}
  disabled={isProcessing}
>
  <RadioButton value="card" label="Credit Card" size="lg" />
  <RadioButton value="paypal" label="PayPal" size="lg" />
  <RadioButton value="crypto" label="Cryptocurrency" disabled />
</RadioGroup>
```

## Edge Cases

- **No RadioButtons**: Empty group renders but has no functionality
- **Single RadioButton**: Works but defeats purpose (use checkbox instead)
- **value not matching any button**: All buttons appear unselected
- **Disabled group with individual button disabled**: Both disabled states apply
- **Very long label**: Wraps to multiple lines, radio aligns to first line
- **Rapid selection changes**: Only final selection state matters (controlled)

## Dependencies

- Requires React Context for RadioGroup to communicate with RadioButtons
- RadioButton must be child of RadioGroup to receive context

## Design Considerations

### Styling Approach

- RadioGroup: Simple View container, provides context
- RadioButton: Pressable wrapper containing circle + label
- Circle: Two concentric Views (outer border, inner fill when selected)
- Size determines circle diameter, inner circle size, label fontSize
- Selected state: inner circle visible, both circles use primary color

### Layout Strategy

- RadioGroup: Vertical stack of RadioButtons by default (use Stack for spacing)
- RadioButton: Horizontal layout (circle | label) with gap: 8px
- Circle: fixed size, no flex
- Label: flex: 1 for wrapping

### Performance Considerations

- Use React Context to avoid prop drilling
- Memoize RadioButton components to prevent unnecessary rerenders
- Selection state managed by RadioGroup, buttons are controlled
- Context updates only trigger rerender of consuming RadioButtons

### Customization Points

- Size presets for common scenarios
- Can add description text below label
- Circle color customizable via color prop (similar to Checkbox)
- Can create horizontal RadioGroup with flexDirection override
- Individual RadioButton disabled state for unavailable options
