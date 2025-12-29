# Modal

## Overview
Full-screen or centered overlay dialog for displaying content above the main interface with backdrop and animation. Provides focus and context for important content or actions requiring user attention.

## Component Behavior
Modal renders content in overlay layer with semi-transparent backdrop. Opens with animation (slide or fade). Backdrop prevents interaction with background. Close button and backdrop press (optional) dismiss modal. Traps focus within modal for accessibility. Position variants support centered dialog or bottom sheet styles.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| isOpen | `boolean` | Controls modal visibility (controlled) |
| onClose | `() => void` | Callback when modal should close |
| children | `ReactNode` | Modal content |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `"sm" \| "md" \| "lg" \| "full"` | `"md"` | Width constraint for centered modals |
| position | `"center" \| "bottom"` | `"center"` | Positioning style (dialog vs bottom sheet) |
| closeOnBackdropPress | `boolean` | `true` | Allow backdrop press to close modal |
| showCloseButton | `boolean` | `true` | Show X button in top-right |
| style | `StyleProp<ViewStyle>` | `undefined` | Custom styles for modal content |

### Extends
`ViewProps` - All standard React Native View props

## Variants

### Sizes (centered position)
- **sm**: 90% width, max 400px
- **md**: 90% width, max 600px
- **lg**: 90% width, max 800px
- **full**: 100% width and height (fullscreen)

### Positions
- **center**: Modal centered on screen (traditional dialog)
- **bottom**: Modal slides from bottom (sheet style)

## States
- **closed**: Not visible, removed from tree
- **opening**: Animating in (backdrop fading, modal sliding/fading)
- **open**: Fully visible and interactive
- **closing**: Animating out

## Theme Support
- Light mode: white modal content, rgba(0,0,0,0.5) backdrop
- Dark mode: dark gray modal content, rgba(0,0,0,0.7) backdrop
- Backdrop opacity adjusts for theme visibility

## Accessibility Requirements
- role="dialog"
- accessibilityViewIsModal={true}
- Focus trap: Tab cycles within modal
- Focus management: Focus close button or first focusable element on open
- Escape key closes on web
- Screen readers announce modal opening

## Usage Examples

### Basic Usage
```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Text>Modal content</Text>
  <Button onPress={() => setIsOpen(false)}>Close</Button>
</Modal>
```

### Advanced Usage
```tsx
<Modal
  isOpen={showConfirm}
  onClose={handleCancel}
  size="sm"
  position="center"
  closeOnBackdropPress={false}
>
  <Heading>Confirm Action</Heading>
  <Text>Are you sure you want to continue?</Text>
  <Button onPress={handleConfirm}>Confirm</Button>
</Modal>
```

## Edge Cases
- **isOpen changes rapidly**: Debounce state changes to complete animations
- **Nested modals**: Stack with increasing backdrop opacity
- **closeOnBackdropPress=false**: Only close button works (critical modals)
- **No close button + no backdrop close**: Provide explicit close action in content

## Dependencies
- Portal component for root-level rendering
- React Native Modal or custom overlay implementation
- Animated API for entrance/exit animations

## Design Considerations

### Styling Approach
- Portal renders at app root
- Backdrop: Full-screen View with semi-transparent background
- Content container: Centered or bottom-aligned based on position
- Rounded corners (top corners for bottom position)
- Shadow/elevation for depth

### Layout Strategy
- center: Absolute positioning with centering transforms
- bottom: Slides from bottom, rounded top corners
- Close button: Absolute in top-right of content
- Backdrop: position: absolute, full screen dimensions

### Performance Considerations
- Lazy render: Don't mount content until isOpen=true
- Native driver for animations
- Remove from tree when closed (not just hidden)
- Backdrop press uses Pressable for performance

### Customization Points
- size presets for common widths
- position for different UX patterns
- closeOnBackdropPress toggle
- Animation customizable (slide, fade, scale)
- Can add header/footer slots for structured content
