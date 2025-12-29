# Accordion

## Overview
Collapsible content sections with expand/collapse functionality supporting single or multiple open items for organizing dense information hierarchically.

## Component Behavior
Accordion consists of multiple AccordionItem components within an Accordion container. Each item has a pressable header (title) and collapsible content. Pressing the header toggles expansion with smooth height animation. Supports two modes: "single" (only one item open at a time) and "multiple" (multiple items can be open simultaneously). Chevron icon rotates to indicate expanded/collapsed state.

## Props

### Accordion Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `"single" \| "multiple"` | `"single"` | Single or multiple items open |
| value | `string \| string[]` | required | Controlled value (item value or array) |
| onValueChange | `(value: string \| string[]) => void` | required | Value change callback |
| children | `ReactNode` | required | AccordionItem components |
| collapsible | `boolean` | `true` | Allow closing the only open item (single mode) |
| disabled | `boolean` | `false` | Disables all items |
| style | `StyleProp<ViewStyle>` | `undefined` | Custom styles |

### AccordionItem Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | required | Unique item identifier |
| title | `string` | required | Header text |
| children | `ReactNode` | required | Collapsible content |
| disabled | `boolean` | `false` | Disables this specific item |
| style | `StyleProp<ViewStyle>` | `undefined` | Custom styles |

### Extends
Both components extend `ViewProps`

## Variants

### Type Modes
- **single**: Only one item can be expanded at a time. Opening new item closes others.
- **multiple**: Multiple items can be expanded simultaneously.

### Collapsible Option (single mode only)
- **collapsible=true**: Can close the currently open item (value becomes null/empty)
- **collapsible=false**: At least one item must always be open

## States
- **collapsed**: Item content hidden, chevron points down/right
- **expanded**: Item content visible, chevron points up/down (rotated)
- **disabled**: Header grayed out, no interaction
- **pressing**: Header shows press feedback (background color)

## Theme Support
- Light mode:
  - Header background: White or light gray (#F9FAFB)
  - Pressed header: Darker gray (#F3F4F6)
  - Border: Gray (#E5E7EB) between items
  - Content background: White
  - Chevron: Dark gray (#6B7280)
- Dark mode:
  - Header background: Dark gray (#1F2937)
  - Pressed header: Lighter gray (#374151)
  - Border: Darker gray (#374151)
  - Content background: Dark gray (#111827)
  - Chevron: Light gray (#9CA3AF)

## Accessibility Requirements
- **Accordion container**: No specific role (grouping)
- **AccordionItem header**:
  - `accessibilityRole="header"`
  - Header level: aria-level="3" or similar semantic level
- **AccordionItem trigger (pressable area)**:
  - `accessibilityRole="button"`
  - `accessibilityExpanded={isExpanded}` or `accessibilityState={{ expanded: isExpanded }}`
  - `accessibilityLabel={title}`
- **AccordionItem content**:
  - `accessibilityRole="region"` or `accessibilityRole="summary"`
  - `accessibilityLabelledBy` linked to header
- Keyboard navigation (web): Enter/Space to toggle, Arrow keys to navigate items
- Screen reader announces expanded/collapsed state

## Usage Examples

### Basic Usage
```tsx
<Accordion
  type="single"
  value={activeItem}
  onValueChange={setActiveItem}
>
  <AccordionItem value="item-1" title="What is React Native?">
    <Text>React Native is a framework for building native mobile apps using React.</Text>
  </AccordionItem>

  <AccordionItem value="item-2" title="How do I get started?">
    <Text>Follow our quickstart guide to create your first app.</Text>
  </AccordionItem>

  <AccordionItem value="item-3" title="Is it production ready?">
    <Text>Yes, React Native is used by many major companies in production.</Text>
  </AccordionItem>
</Accordion>
```

### Advanced Usage
```tsx
<Accordion
  type="multiple"
  value={openItems}
  onValueChange={setOpenItems}
  collapsible={false}
>
  <AccordionItem
    value="account"
    title="Account Settings"
  >
    <AccountForm />
  </AccordionItem>

  <AccordionItem
    value="privacy"
    title="Privacy & Security"
  >
    <PrivacyOptions />
  </AccordionItem>

  <AccordionItem
    value="notifications"
    title="Notification Preferences"
    disabled
  >
    <NotificationSettings />
  </AccordionItem>
</Accordion>
```

## Edge Cases
- **No items**: Show empty state or nothing
- **Single item**: Still collapsible unless collapsible=false
- **Value not in items**: Warning/error in development, no item expanded
- **Disabled item that's open**: Keep content visible but prevent toggling
- **Dynamic items**: Handle when currently open item is removed (reset value)
- **Very long content**: Content area should be scrollable or height-constrained

## Dependencies
- Uses React Context to share value/onValueChange from container to items
- Animated API for smooth expand/collapse height animation
- Typography component for title and content text
- Icon component for chevron indicator

## Design Considerations

### Styling Approach
- Items separated by horizontal dividers (1px border)
- Header padding: 16px vertical, 16-20px horizontal
- Content padding: 16-20px (left/right same as header, top/bottom for spacing)
- Chevron positioned on right side of header with margin
- Chevron rotation: 0deg (collapsed) to 180deg or 90deg (expanded)

### Layout Strategy
- Accordion: Vertical stack of AccordionItem components
- AccordionItem: Column layout (header above content)
- Header: Row layout (title flex:1, chevron fixed width)
- Content: Animated height from 0 to auto (measure content height)
- Alternative: Use LayoutAnimation for simpler animation

### Performance Considerations
- Lazy render content: Only render expanded content, unmount when collapsed
- Alternative: Render all but hide with position/opacity for instant expansion
- Memoize AccordionItem components to prevent re-renders
- Use native driver for chevron rotation animation
- Height animation: Consider max-height approach or measure content

### Customization Points
- Type for single vs multiple selection
- Collapsible option for single mode behavior
- Disabled state per item or entire accordion
- Custom title rendering (optional title prop accepting ReactNode)
- Custom chevron icon
- Animation duration and easing customization
- Border/divider customization
- Header and content padding customization
