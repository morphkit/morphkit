# Breadcrumb

## Overview
Navigation path indicator showing hierarchical location with separators between levels for user orientation and quick navigation to parent pages.

## Component Behavior
Breadcrumb displays a sequence of BreadcrumbItem components separated by visual separators (typically "/" or chevron). Each item represents a level in the navigation hierarchy. Previous levels are pressable for navigation, while the current page (last item) is non-interactive. Items can optionally include icons for visual identification.

## Props

### Breadcrumb Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | required | BreadcrumbItem components |
| separator | `ReactNode` | `"/"` | Separator between items (text or icon) |
| style | `StyleProp<ViewStyle>` | `undefined` | Custom styles |

### BreadcrumbItem Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | required | Item text |
| onPress | `(() => void) \| undefined` | `undefined` | Navigation callback (undefined for current page) |
| icon | `ReactNode` | `undefined` | Leading icon |

### Extends
- Breadcrumb: `ViewProps`
- BreadcrumbItem: `ViewProps`

## Variants
No visual variants (simple navigation component)

## States
- **default**: Standard breadcrumb item appearance
- **current**: Last item (not pressable, different styling)
- **pressable**: Previous items (pressable with press feedback)

## Theme Support
- Light mode: Gray text (#6B7280), primary color (#4A90E2) on press
- Dark mode: Lighter gray text (#9CA3AF), lighter primary (#5AA2F5) on press
- Separator: Same gray as inactive text
- Current page: Darker/bolder text than previous items

## Accessibility Requirements
- Container: `accessibilityRole="navigation"`
- Current item (last): `aria-current="page"` or `accessibilityState={{ current: true }}`
- Pressable items: `accessibilityRole="link"` or `accessibilityRole="button"`
- Screen reader announcement: "Breadcrumb navigation" for container
- Each item announced with position context when possible

## Usage Examples

### Basic Usage
```tsx
<Breadcrumb>
  <BreadcrumbItem label="Home" onPress={() => navigate('/')} />
  <BreadcrumbItem label="Products" onPress={() => navigate('/products')} />
  <BreadcrumbItem label="Laptops" />
</Breadcrumb>
```

### Advanced Usage
```tsx
<Breadcrumb separator={<ChevronRightIcon />}>
  <BreadcrumbItem
    label="Dashboard"
    icon={<HomeIcon />}
    onPress={() => navigate('/dashboard')}
  />
  <BreadcrumbItem
    label="Settings"
    onPress={() => navigate('/settings')}
  />
  <BreadcrumbItem
    label="Profile"
  />
</Breadcrumb>
```

## Edge Cases
- **Single item**: No separator shown, item is current (not pressable)
- **Very long labels**: Truncate with ellipsis or wrap to new line based on design
- **Deep hierarchy**: Consider truncating middle items with "..." on mobile
- **No onPress on current**: Last item always non-interactive regardless of onPress

## Dependencies
- Typography component for text rendering
- Optional icon components for separators or item icons

## Design Considerations

### Styling Approach
- Horizontal flexbox layout (`flexDirection: "row"`)
- Items and separators aligned center (`alignItems: "center"`)
- Separators have horizontal margin/padding for spacing
- Current item uses different font weight or color

### Layout Strategy
- Wrap in ScrollView if needed for long breadcrumbs
- Responsive: Consider collapsing middle items on small screens
- Separator spacing: 8px horizontal padding on each side
- Item spacing managed by separator components

### Performance Considerations
- Lightweight component with minimal re-renders
- Use FlatList for extremely long breadcrumb paths (rare)
- Memoize separator component if custom and complex

### Customization Points
- Custom separator (text, icon, or component)
- Custom styling via style prop
- Icon support for visual hierarchy
- Typography variants for different text sizes
