# Stack

## Overview

Layout component for arranging children with consistent spacing in horizontal or vertical direction with alignment control. Eliminates need for manual margin management by automatically distributing gap between children.

## Component Behavior

Stack renders children in a flex container with automatic spacing via gap property. Direction prop controls main axis (row vs column). Alignment props control positioning on both axes. Gap ensures consistent spacing without requiring margin on children. All children receive equal gap treatment automatically.

## Props

### Required Props

| Prop     | Type        | Description                                    |
| -------- | ----------- | ---------------------------------------------- |
| children | `ReactNode` | Elements to be arranged with automatic spacing |

### Optional Props

| Prop      | Type                                              | Default      | Description                                             |
| --------- | ------------------------------------------------- | ------------ | ------------------------------------------------------- |
| direction | `"horizontal" \| "vertical"`                      | `"vertical"` | Arrangement direction of children (row or column)       |
| gap       | `number`                                          | `8`          | Spacing between children in pixels                      |
| align     | `"start" \| "center" \| "end" \| "stretch"`       | `"stretch"`  | Cross-axis alignment of children                        |
| justify   | `"start" \| "center" \| "end" \| "space-between"` | `"start"`    | Main-axis distribution of children                      |
| wrap      | `boolean`                                         | `false`      | Allow children to wrap to next line when space runs out |
| style     | `StyleProp<ViewStyle>`                            | `undefined`  | Additional custom styles                                |

### Extends

`ViewProps` - All standard React Native View props

## Variants

### Direction

- **horizontal**: Children arranged left-to-right (flexDirection: "row"). Gap spaces horizontally
- **vertical**: Children arranged top-to-bottom (flexDirection: "column"). Gap spaces vertically

## States

- **default**: Children arranged with specified spacing and alignment

## Theme Support

None - Stack is a pure layout primitive without theme-specific styling. Spacing values could be themed via spacing scale constants if desired.

## Accessibility Requirements

- Inherits View accessibility props
- No specific roles required (pure layout container)
- Ensure reading order matches visual order (especially for horizontal stacks with screen readers)
- Gap maintains touch target separation for interactive children
- Consider accessibilityLabel for groups of related items (e.g., "Navigation buttons")

## Usage Examples

### Basic Usage

Vertical stack with default spacing:

```tsx
<Stack>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</Stack>
```

### Advanced Usage

Horizontal button group with custom alignment:

```tsx
<Stack direction="horizontal" gap={12} align="center" justify="end">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save</Button>
</Stack>
```

## Edge Cases

- **Single child**: Gap has no effect. Child renders normally with alignment applied
- **No children**: Empty stack renders with no height/width (depends on parent constraints)
- **gap=0**: Valid, removes all spacing. Equivalent to normal flex container
- **wrap=true with gap**: Gap applies between wrapped rows/columns as well as between items
- **Very large gap**: Children may overflow parent container
- **Negative gap**: Invalid/unsupported. Use margin instead for overlap effects
- **Mixed interactive/non-interactive children**: Gap maintains separation but doesn't add touch targets

## Dependencies

None - Standalone layout component using only View primitive.

## Design Considerations

### Styling Approach

- Map direction to flexDirection (horizontal -> "row", vertical -> "column")
- Use React Native's gap property (requires RN 0.71+)
- Map align to alignItems (start -> "flex-start", center -> "center", end -> "flex-end", stretch -> "stretch")
- Map justify to justifyContent (start -> "flex-start", center -> "center", end -> "flex-end", space-between -> "space-between")
- Wrap maps directly to flexWrap ("wrap" or "nowrap")

### Layout Strategy

- Base implementation uses View with flexbox
- Gap property handles spacing automatically (no margin needed on children)
- For RN < 0.71 (no native gap), use alternative implementation:
  - Wrap each child except last with margin wrapper
  - Horizontal: marginRight = gap
  - Vertical: marginBottom = gap
- No assumptions about children size - fully flexible

### Performance Considerations

- Minimal overhead - basic flex container
- No JavaScript layout calculations needed (native flexbox)
- Gap polyfill (for older RN) adds wrapper Views but still performant
- Memoize direction mapping if necessary

### Customization Points

- Gap values can reference spacing scale constants
- Direction and alignment cover all common flex layouts
- wrap enables responsive layouts
- style prop allows escape hatch
- Can create semantic wrappers (HStack, VStack) for cleaner API
- Consider adding responsive gap (different values for different screen sizes)
