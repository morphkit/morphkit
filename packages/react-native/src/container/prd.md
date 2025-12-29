# Container

## Overview
Centered, max-width wrapper for page content providing consistent horizontal margins and responsive width constraints. Ensures content doesn't stretch too wide on large screens while maintaining proper spacing and alignment.

## Component Behavior
Container wraps children in a centered view with maximum width constraints. Automatically centers content horizontally when narrower than maxWidth. Applies consistent horizontal padding for edge spacing. Adapts to screen size while maintaining readability through width constraints.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| children | `ReactNode` | Page content to be constrained and centered |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| maxWidth | `number \| "sm" \| "md" \| "lg" \| "xl"` | `"lg"` | Maximum width constraint. Number in pixels or preset size key |
| padding | `number` | `16` | Horizontal padding on both sides |
| centered | `boolean` | `true` | Whether to center the container horizontally when narrower than maxWidth |
| style | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles |

### Extends
`ViewProps` - All standard React Native View props

## Variants
None - Container uses size presets via maxWidth prop rather than named variants.

### Max Width Presets
- **sm**: 640px - Narrow content (single column forms, focused reading)
- **md**: 768px - Standard mobile-first layouts
- **lg**: 1024px - Desktop content width (default)
- **xl**: 1280px - Wide layouts for dashboards or multi-column content

## States
- **default**: Content constrained and centered based on props

## Theme Support
None - Container is a layout primitive without theme-specific styling. Background and colors inherited from parent or app container.

## Accessibility Requirements
- Inherits View accessibility props
- No specific accessibility roles required (pure layout wrapper)
- Ensure content within container maintains proper heading hierarchy
- Padding ensures touch targets near edges have sufficient spacing

## Usage Examples

### Basic Usage
Standard centered container with default width:
```tsx
<Container>
  <Heading>Page Title</Heading>
  <Text>Page content...</Text>
</Container>
```

### Advanced Usage
Narrow container for form with custom padding:
```tsx
<Container maxWidth="sm" padding={24}>
  <Form>
    <Input label="Email" />
    <Input label="Password" type="password" />
    <Button>Submit</Button>
  </Form>
</Container>
```

## Edge Cases
- **Content wider than maxWidth**: Container width limited, content may overflow if not responsive
- **Very small screens**: maxWidth may exceed screen width. Container should never force horizontal scroll - uses width: "100%" with maxWidth constraint
- **Negative padding**: Technically allowed but creates edge-touching content
- **centered=false**: Content aligns to left edge instead of center
- **No children**: Empty container still renders with padding

## Dependencies
None - Standalone layout component.

## Design Considerations

### Styling Approach
- Convert maxWidth preset to pixel value via mapping object
- Apply width: "100%" with maxWidth constraint (never forces horizontal scroll)
- When centered=true, use alignSelf: "center" or margin: "0 auto"
- Padding applied as paddingHorizontal for consistent edge spacing

### Layout Strategy
- Acts as flex container with constrained width
- Centers via flexbox or margin depending on implementation
- Width calculation: Math.min(screenWidth, maxWidthValue) - (padding * 2)
- ScrollView should wrap Container, not vice versa

### Performance Considerations
- Style computation minimal (single preset lookup or direct number)
- No dynamic resizing listeners needed - relies on View's natural responsiveness
- Memoize maxWidth calculation if using preset

### Customization Points
- maxWidth presets customizable via constants
- Padding can be overridden per-instance
- centered prop allows left-aligned layouts
- style prop for one-off adjustments
- Can wrap with themed background colors
