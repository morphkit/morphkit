# Checkbox

## Overview
Selectable checkbox control for boolean inputs supporting checked, unchecked, and indeterminate states with label integration. Provides clear visual feedback for selection state with accessibility support and themeable styling.

## Component Behavior
Checkbox renders a square box with optional checkmark icon. Clicking/tapping toggles checked state via onCheckedChange callback. When checked, displays checkmark icon. Indeterminate state shows minus icon for partial selection (e.g., "select all" with some selected). Label text renders beside checkbox and is also clickable.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| checked | `boolean` | Current checked state (controlled) |
| onCheckedChange | `(checked: boolean) => void` | Callback when user toggles checkbox. Receives new checked state |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | `undefined` | Text label displayed next to checkbox |
| indeterminate | `boolean` | `false` | Shows minus icon instead of checkmark. Represents partial selection |
| disabled | `boolean` | `false` | Prevents interaction and reduces opacity |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size of checkbox box and icon |
| color | `string` | theme primary | Color of checkbox when checked (border and fill) |
| style | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles for wrapper |

### Extends
`ViewProps` - All standard React Native View props

## Variants

### Sizes
- **sm**: 16x16 box, 10px icon, 14px label text
- **md**: 20x20 box, 14px icon, 16px label text
- **lg**: 24x24 box, 18px icon, 18px label text

## States
- **unchecked**: Empty box with border only. Default state when checked=false
- **checked**: Filled box with checkmark icon. Shows when checked=true and indeterminate=false
- **indeterminate**: Filled box with minus/dash icon. Shows when indeterminate=true (overrides checked state visually)
- **disabled**: Reduced opacity (0.5) with no interaction. Maintains checked/unchecked appearance but grayed out

## Theme Support
- Light mode:
  - Unchecked: transparent background, gray border (#9CA3AF)
  - Checked: primary blue fill (#4A90E2), white checkmark
  - Indeterminate: primary blue fill, white minus icon
  - Disabled: same as above with 0.5 opacity
- Dark mode:
  - Unchecked: transparent background, lighter gray border (#6B7280)
  - Checked: lighter primary fill (#5AA2F5), white checkmark
  - Indeterminate: lighter primary fill, white minus icon
  - Disabled: same as above with 0.5 opacity
- Dynamic switching: useColorScheme() hook for theme detection
- Custom color: color prop overrides theme primary for checked/indeterminate states

## Accessibility Requirements
- role="checkbox"
- accessibilityState: { checked, disabled }
- accessibilityLabel from label prop (or custom via accessibilityLabel prop)
- Minimum touch target: 44x44 points (add padding if checkbox smaller)
- accessibilityHint optional (e.g., "Double tap to toggle")
- Keyboard support (web): Space key toggles, Enter key submits form
- Focus indicator visible when focused

## Usage Examples

### Basic Usage
Simple checkbox with label:
```tsx
<Checkbox
  checked={isAccepted}
  onCheckedChange={setIsAccepted}
  label="I accept the terms and conditions"
/>
```

### Advanced Usage
Indeterminate checkbox for "select all":
```tsx
<Checkbox
  checked={allSelected}
  indeterminate={someSelected}
  onCheckedChange={handleSelectAll}
  label="Select All"
  size="lg"
/>
```

## Edge Cases
- **indeterminate=true with checked=false**: Visually shows indeterminate (minus icon). Clicking sets checked=true
- **indeterminate=true with checked=true**: Also shows indeterminate. Clicking sets checked=false
- **disabled with checked=true**: Shows checked appearance but prevents interaction
- **No label**: Checkbox renders alone. Ensure accessibilityLabel is provided for screen readers
- **Very long label**: Label wraps to multiple lines. Checkbox aligns to first line
- **Rapid toggling**: onCheckedChange should debounce if performing expensive operations

## Dependencies
None - Standalone component. May optionally use icons from icon library (Ionicons, etc.) for checkmark/minus.

## Design Considerations

### Styling Approach
- Use Pressable wrapper for entire checkbox + label area (better touch target)
- Checkbox box: View with border (unchecked) or background color (checked/indeterminate)
- Icon rendering: Use SVG or icon library component for checkmark and minus
- Size mapping determines box dimensions, icon size, and label fontSize
- Disabled state uses opacity transform on entire component

### Layout Strategy
- Horizontal layout: Checkbox box | Label text (gap: 8px)
- Use flexDirection: "row", alignItems: "flex-start"
- Label wraps if too long (flex: 1)
- Checkbox box: fixed size, no flex
- Touch target: extends beyond visible checkbox if smaller than 44pts

### Performance Considerations
- Memoize icon components (checkmark, minus) to avoid re-renders
- onCheckedChange should be memoized or stable function reference
- State updates: controlled component, no internal state
- Avoid inline style objects

### Customization Points
- Size presets for common use cases
- color prop for brand customization
- Custom icons possible via icon library integration
- Label typography can inherit from parent or use custom component
- Can group multiple checkboxes with CheckboxGroup wrapper for related options
