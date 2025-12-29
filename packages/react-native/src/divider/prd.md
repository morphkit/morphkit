# Divider

## Overview
Visual separator line for creating clear boundaries between content sections with horizontal or vertical orientation. Provides subtle visual break without heavy styling, improving content organization and readability.

## Component Behavior
Divider renders a thin line (1px by default) in either horizontal or vertical orientation. Automatically sizes to parent container (100% width for horizontal, 100% height for vertical). Color adapts to theme for optimal visibility without being visually prominent.

## Props

### Required Props
None - All props optional with sensible defaults

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| orientation | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the divider line |
| thickness | `number` | `1` | Width of the divider line in pixels |
| color | `string` | theme-aware | Color of the divider. Defaults to gray-200 (light) or gray-700 (dark) |
| length | `number \| string` | `"100%"` | Custom length constraint. "100%" fills parent, number sets fixed length |
| style | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles |

### Extends
`ViewProps` - All standard React Native View props

## Variants

### Orientation
- **horizontal**: Full width line (default). Height equals thickness. Used between stacked content
- **vertical**: Full height line. Width equals thickness. Used between side-by-side content (requires parent with defined height)

## States
- **default**: Static line rendering with configured styling

## Theme Support
- Light mode: Default color #E5E7EB (gray-200) - subtle but visible separator
- Dark mode: Default color #374151 (gray-700) - lighter than typical dark backgrounds
- Dynamic switching: Uses useColorScheme() hook. Color prop overrides theme default
- Color prop: Accepts any valid color string (hex, rgb, rgba, named colors)

## Accessibility Requirements
- role="separator" - Indicates content boundary to screen readers
- Decorative by default (no accessibilityLabel needed)
- Not focusable (no interactive behavior)
- Does not interrupt screen reader flow
- Ensure sufficient contrast if custom color used

## Usage Examples

### Basic Usage
Simple horizontal divider between content:
```tsx
<View>
  <Text>Section 1</Text>
  <Divider />
  <Text>Section 2</Text>
</View>
```

### Advanced Usage
Vertical divider with custom styling:
```tsx
<View style={{ flexDirection: 'row', height: 100 }}>
  <View style={{ flex: 1 }}>
    <Text>Left Content</Text>
  </View>
  <Divider orientation="vertical" thickness={2} color="#CCCCCC" />
  <View style={{ flex: 1 }}>
    <Text>Right Content</Text>
  </View>
</View>
```

## Edge Cases
- **Vertical with no parent height**: Divider height will be 0 or minimal. Parent must have explicit height
- **length="100%" in vertical**: Height equals parent height. Length only applies to the constrained dimension
- **Very thick divider**: Works but may look more like a bar than a divider (consider using Box component instead)
- **Transparent color**: Divider will be invisible but still occupies space
- **Negative thickness**: Invalid, will likely render as 0 or cause issues

## Dependencies
None - Standalone component using only View primitive.

## Design Considerations

### Styling Approach
- Render as simple View with background color
- Horizontal: height = thickness, width = length
- Vertical: width = thickness, height = length
- Use backgroundColor for color (not border)
- Theme color mapping via constants object

### Layout Strategy
- Default to no margins - parent controls spacing
- Horizontal: width: "100%" unless length specified
- Vertical: height: "100%" unless length specified
- Use flexbox-friendly sizing (percentage or absolute)

### Performance Considerations
- Extremely lightweight (single View with minimal styles)
- No animations or interactions
- Style computation trivial (orientation determines width/height swap)
- Can render hundreds without performance impact

### Customization Points
- Thickness for visual weight adjustment
- Color for brand integration or emphasis
- Length for partial-width dividers
- Margins controlled by parent spacing
- Can extend with dashed/dotted patterns via borderStyle if needed (switch from background to border implementation)
