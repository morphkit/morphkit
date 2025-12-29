# Image

## Overview
Enhanced image component with loading states, error fallback, aspect ratio control, and placeholder support for robust image rendering.

## Component Behavior
Image extends React Native's Image component with additional UX features. Shows placeholder while loading, handles load errors gracefully with fallback content, and maintains aspect ratio. Supports all standard Image props plus enhanced loading states. Provides callbacks for load success/failure to enable custom handling. ResizeMode controls how image fits within bounds.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| source | `ImageSourcePropType` | Image source (local or remote) |
| alt | `string` | Accessibility description |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | `number \| string` | `undefined` | Image width (number in px or "100%") |
| height | `number \| string` | `undefined` | Image height (number in px or "100%") |
| aspectRatio | `number` | `undefined` | Aspect ratio (e.g., 16/9, 4/3, 1) |
| resizeMode | `"cover" \| "contain" \| "stretch" \| "center"` | `"cover"` | How image fits container |
| placeholder | `ReactNode` | `undefined` | Content shown while loading |
| fallback | `ReactNode` | `undefined` | Content shown on error |
| onLoad | `() => void` | `undefined` | Callback when image loads successfully |
| onError | `() => void` | `undefined` | Callback when image fails to load |
| style | `StyleProp<ImageStyle>` | `undefined` | Custom image styles |

### Extends
`Omit<ImageProps, "source">` - All standard React Native Image props except source (to enforce required)

## Variants
No explicit variants (behavior-focused component)

## States
- **loading**: Image is fetching, shows placeholder if provided
- **loaded**: Image successfully loaded and displayed
- **error**: Image failed to load, shows fallback if provided

## Theme Support
- Minimal theme integration (primarily native Image behavior)
- Placeholder/fallback can be themed components
- Default placeholder: Light gray background (#F3F4F6 light, #374151 dark)
- Default fallback: Gray box with broken image icon

## Accessibility Requirements
- `accessibilityRole="image"`
- `accessibilityLabel` derived from required `alt` prop
- Descriptive alt text required for screen readers
- Fallback content should also be accessible
- Consider `accessibilityIgnoresInvertColors={true}` for photos

## Usage Examples

### Basic Usage
```tsx
<Image
  source={{ uri: 'https://example.com/photo.jpg' }}
  alt="Product photo"
  width="100%"
  height={200}
  resizeMode="cover"
/>
```

### Advanced Usage
```tsx
<Image
  source={require('./assets/banner.png')}
  alt="App banner"
  aspectRatio={16 / 9}
  placeholder={<Skeleton height={200} />}
  fallback={
    <Box backgroundColor="#F3F4F6" padding={32}>
      <Text>Image failed to load</Text>
    </Box>
  }
  onLoad={() => console.log('Image loaded')}
  onError={() => trackImageError('banner')}
  resizeMode="contain"
/>
```

## Edge Cases
- **No source**: Show fallback or error state immediately
- **Source changes**: Reset to loading state when source prop changes
- **Aspect ratio with width/height**: aspectRatio takes precedence for dimension calculation
- **Very large images**: Consider downsampling or use appropriate resizeMode
- **Local vs remote**: Local requires are synchronous, remote URIs trigger loading state
- **Network timeout**: Handle slow loading with timeout and fallback

## Dependencies
- React Native Image component
- Optional placeholder components (Skeleton, Spinner)
- Optional fallback components (Box, Text, Icon)

## Design Considerations

### Styling Approach
- Wrapper View contains loading/error states
- Image positioned within wrapper
- Placeholder absolutely positioned or replaces image during load
- Fallback replaces image on error
- Width/height can be fixed (number) or responsive (percentage string)
- Aspect ratio enforces dimensions when one dimension provided

### Layout Strategy
- If width and height provided: Use both as fixed dimensions
- If width and aspectRatio: Calculate height from aspectRatio
- If height and aspectRatio: Calculate width from aspectRatio
- If only one dimension: Requires aspectRatio to calculate other
- Default to "cover" resizeMode for most use cases

### Performance Considerations
- Use `Image.prefetch()` for critical images to load ahead
- Use `Image.queryCache()` to check cache status
- Consider lazy loading images in long lists (FlatList)
- Optimize image sizes on server (serve appropriate resolutions)
- Use `resizeMode="cover"` or "contain" to avoid unnecessary processing
- Cache remote images automatically (native behavior)

### Customization Points
- Aspect ratio for responsive sizing
- Resize modes for different use cases
- Placeholder for loading UX (spinner, skeleton, blur)
- Fallback for error handling (error message, retry button)
- Callbacks for custom load/error handling
- Custom styles for advanced layout needs
- Support for progressive JPEG or blur-up technique (native support varies)
