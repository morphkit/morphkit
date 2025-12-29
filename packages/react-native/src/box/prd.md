# Box

## Overview
Flexible container component serving as the fundamental building block for layouts with comprehensive spacing, sizing, and styling props. Provides a consistent API for common layout patterns without the complexity of directly managing StyleSheet objects.

## Component Behavior
Box acts as a flexible wrapper that accepts layout and styling props directly, automatically converting them to React Native styles. It handles spacing (padding/margin), flexbox layout, borders, and background colors through simple props. All children are rendered inside the styled container with full access to parent-level spacing and alignment controls.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| children | `ReactNode` | Content to be rendered inside the box container |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| padding | `number \| { top?: number; right?: number; bottom?: number; left?: number }` | `undefined` | Inner spacing around children. Number applies to all sides, object allows per-side control |
| margin | `number \| { top?: number; right?: number; bottom?: number; left?: number }` | `undefined` | Outer spacing around the box. Number applies to all sides, object allows per-side control |
| borderRadius | `number` | `undefined` | Corner radius for rounded edges |
| borderWidth | `number` | `undefined` | Width of border line |
| borderColor | `string` | `undefined` | Color of border (hex, rgb, or theme color key) |
| backgroundColor | `string` | `undefined` | Background color (hex, rgb, or theme color key) |
| flex | `number` | `undefined` | Flex grow/shrink factor for flexbox layouts |
| flexDirection | `"row" \| "column"` | `undefined` | Main axis direction for children (horizontal or vertical) |
| justifyContent | `"flex-start" \| "center" \| "flex-end" \| "space-between" \| "space-around"` | `undefined` | Alignment of children along main axis |
| alignItems | `"flex-start" \| "center" \| "flex-end" \| "stretch"` | `undefined` | Alignment of children along cross axis |
| gap | `number` | `undefined` | Spacing between children (requires flexbox) |
| style | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles to merge with generated styles |

### Extends
`ViewProps` - All standard React Native View props (accessibilityLabel, testID, onLayout, etc.)

## Variants
None - Box is a pure layout primitive without predefined visual variants. Styling is controlled entirely through props.

## States
- **default**: Standard rendering with provided props applied as styles

## Theme Support
- Light mode: No built-in theme colors. Optionally can accept theme color keys for backgroundColor/borderColor if theme system is integrated
- Dark mode: Same as light mode - theme-agnostic by default
- Dynamic switching: Component itself doesn't handle theme switching. Parent app can pass theme-aware colors via props

## Accessibility Requirements
- Inherits all accessibility props from View (accessibilityLabel, accessibilityRole, accessibilityHint)
- Use accessibilityRole when Box represents a semantic container (e.g., "button" if pressable wrapper)
- Ensure sufficient color contrast if using backgroundColor with text children
- Gap prop should maintain minimum touch target sizes (44x44 points) for interactive children

## Usage Examples

### Basic Usage
Simple container with padding and background color:
```tsx
<Box padding={16} backgroundColor="#F5F5F5">
  <Text>Content here</Text>
</Box>
```

### Advanced Usage
Flexbox layout with spacing and alignment:
```tsx
<Box
  flexDirection="row"
  justifyContent="space-between"
  alignItems="center"
  padding={{ top: 12, horizontal: 16 }}
  gap={8}
  borderRadius={8}
  borderWidth={1}
  borderColor="#E0E0E0"
>
  <Icon name="star" />
  <Text>Item Label</Text>
  <Button title="Action" />
</Box>
```

## Edge Cases
- **Conflicting props**: If both shorthand (padding) and style prop specify padding, style prop wins (merges last)
- **Invalid gap**: Gap only works with flexDirection set. Ignored if flexDirection is undefined
- **Numeric color values**: borderColor and backgroundColor should be strings. Numbers will cause runtime errors
- **Negative margins**: Allowed and will work as expected, but may cause layout issues if children overflow
- **Padding object with missing keys**: Partial padding objects are valid (e.g., `{ top: 8, left: 8 }`)

## Dependencies
None - Box is a foundational primitive with no dependencies on other components.

## Design Considerations

### Styling Approach
- Convert props to StyleSheet at runtime using helper function
- Merge prop-generated styles with user-provided style prop
- Support both numeric and object formats for padding/margin (e.g., `padding={16}` vs `padding={{ top: 8, bottom: 8 }}`)
- Use React Native's StyleSheet.flatten for style merging

### Layout Strategy
- Default to no layout styles - only apply what's explicitly provided
- Gap implementation uses flexbox gap property (React Native 0.71+)
- For older RN versions, gap could be implemented with margin on children (add spacing wrapper)

### Performance Considerations
- Avoid recreating style objects on every render - memoize computed styles
- Consider using StyleSheet.create for frequently used combinations
- Props-to-style conversion should be lightweight (simple object mapping)

### Customization Points
- All layout props are optional - maximum flexibility
- Style prop allows escape hatch for any styles not covered by convenience props
- Can be wrapped with theme HOC to inject theme colors
- Extendable through composition (e.g., create themed Card by wrapping Box)
