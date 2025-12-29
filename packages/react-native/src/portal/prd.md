# Portal

## Overview

Utility component for rendering children at the root level of the component tree, essential for modals, overlays, and tooltips to escape z-index stacking contexts.

## Component Behavior

Portal teleports its children to a special container at the app root level, outside the normal React component hierarchy. This allows modals, tooltips, popovers, and other overlays to render above all other content regardless of parent z-index or overflow constraints. Uses React Context to provide portal targets throughout the app. Multiple portals can coexist with optional naming for different portal targets.

## Props

### Portal Props

| Prop     | Type        | Default     | Description                                   |
| -------- | ----------- | ----------- | --------------------------------------------- |
| children | `ReactNode` | required    | Content to render at root level               |
| name     | `string`    | `"default"` | Portal target identifier for multiple portals |

### PortalProvider Props

| Prop     | Type        | Default  | Description |
| -------- | ----------- | -------- | ----------- |
| children | `ReactNode` | required | App content |

### PortalHost Props

| Prop | Type     | Default     | Description            |
| ---- | -------- | ----------- | ---------------------- |
| name | `string` | `"default"` | Portal host identifier |

### Extends

No extended props (utility component)

## Variants

No visual variants (utility component)

## States

No internal states (pass-through component)

## Theme Support

None (utility component, does not render visual elements)

## Accessibility Requirements

- Portal is transparent to accessibility tree
- Children maintain their accessibility properties
- Screen readers treat portaled content as if in normal tree
- Focus management responsibility of portaled content (e.g., Modal handles focus trap)

## Usage Examples

### Basic Usage

```tsx
// App.tsx - Setup portal provider
function App() {
  return (
    <PortalProvider>
      <Navigation />
      <PortalHost />
    </PortalProvider>
  );
}

// Component.tsx - Use portal
function MyComponent() {
  return (
    <View>
      <Text>Regular content</Text>

      <Portal>
        <Modal>This renders at root level</Modal>
      </Portal>
    </View>
  );
}
```

### Advanced Usage

```tsx
// App.tsx - Multiple portal targets
function App() {
  return (
    <PortalProvider>
      <Navigation />
      <PortalHost name="modal" />
      <PortalHost name="toast" />
    </PortalProvider>
  );
}

// Component.tsx - Target specific portal
function MyComponent() {
  return (
    <>
      <Portal name="modal">
        <AlertDialog />
      </Portal>

      <Portal name="toast">
        <Toast message="Success!" />
      </Portal>
    </>
  );
}
```

## Edge Cases

- **Portal without provider**: Warn in development, render children in place as fallback
- **PortalHost without provider**: Warn in development, render nothing
- **Multiple PortalHosts with same name**: Last one wins, warn in development
- **Portal before PortalHost mounted**: Queue children until host available
- **Nested portals**: Each portal independently renders at root
- **Unmounting portal**: Clean up children from host immediately

## Dependencies

- React Context for provider/consumer pattern
- State management for tracking portal children
- Optional: Use react-native-portalize or @gorhom/portal library

## Design Considerations

### Implementation Approach

#### Option 1: Custom Implementation

- PortalProvider maintains a map of portal names to children arrays
- Portal component registers children via context
- PortalHost subscribes to portal changes and renders children
- Use React.useState and useEffect for registration/cleanup

#### Option 2: Library-Based

- Use established library like @gorhom/portal or react-native-portalize
- Provides tested implementation with edge case handling
- May include additional features (animations, nesting)

### Architecture Strategy

```
PortalProvider (Context.Provider)
  ├─ App Content
  │   └─ Portal (registers children)
  │       └─ Modal
  └─ PortalHost (renders registered children)
      └─ [Modal rendered here]
```

### Performance Considerations

- Portal registration should be lightweight (no heavy computation)
- Avoid unnecessary re-renders of PortalHost
- Use memoization for portal children if complex
- Cleanup on unmount to prevent memory leaks
- Batch updates if multiple portals register simultaneously

### Customization Points

- Named portals for multiple render targets (modals, toasts, tooltips)
- Custom portal hosts for different z-index layers
- Optional portal mounting order (FIFO, LIFO)
- Optional animation coordination between portal content

### Integration Notes

- Modal, Popover, Toast, Drawer, AlertDialog, Actionsheet all use Portal internally
- Portal should be set up once at app root
- Ensure PortalHost is outside navigation structure to avoid unmounting
- Consider using separate PortalHost for different overlay types (modals vs toasts)
