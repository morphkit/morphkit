# Tabs

## Overview
Tabbed navigation component for organizing content into switchable panels with horizontal or vertical layout and multiple visual variants.

## Component Behavior
Tabs consist of four sub-components working together: TabsContainer (root), TabsList (tab buttons container), TabsTrigger (individual tab button), and TabsContent (panel content). Only one tab is active at a time. Clicking a trigger switches the active tab and displays corresponding content. Supports horizontal and vertical orientations with three visual variants: line (underline indicator), filled (background fill), and pills (rounded backgrounds).

## Props

### TabsContainer Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | required | Active tab value (controlled) |
| onValueChange | `(value: string) => void` | required | Tab change callback |
| children | `ReactNode` | required | TabsList and TabsContent children |
| orientation | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |
| variant | `"line" \| "filled" \| "pills"` | `"line"` | Visual style variant |
| style | `StyleProp<ViewStyle>` | `undefined` | Custom styles |

### TabsList Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | required | TabsTrigger components |
| style | `StyleProp<ViewStyle>` | `undefined` | Custom styles |

### TabsTrigger Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | required | Unique tab identifier |
| label | `string` | required | Tab button text |
| icon | `ReactNode` | `undefined` | Leading icon |
| disabled | `boolean` | `false` | Disables tab interaction |
| style | `StyleProp<ViewStyle>` | `undefined` | Custom styles |

### TabsContent Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | required | Tab identifier to show for |
| children | `ReactNode` | required | Panel content |
| style | `StyleProp<ViewStyle>` | `undefined` | Custom styles |

### Extends
All components extend `ViewProps`

## Variants

### Orientation
- **horizontal**: Tabs arranged in row, content below
- **vertical**: Tabs in column on left, content on right

### Visual Variants
- **line**: Minimal style with colored underline/side-line for active tab
- **filled**: Active tab has solid background fill
- **pills**: Rounded pill-shaped backgrounds for each tab

## States
- **default**: Inactive tab appearance
- **active**: Current selected tab with variant-specific indicator
- **hover/pressed**: Touch feedback on press
- **disabled**: Reduced opacity, no interaction

## Theme Support
- Light mode:
  - Inactive text: Gray (#6B7280)
  - Active text: Primary (#4A90E2)
  - Line indicator: Primary (#4A90E2)
  - Filled background: Primary (#4A90E2)
  - Pills background: Light gray (#F3F4F6) inactive, primary active
- Dark mode:
  - Inactive text: Gray (#9CA3AF)
  - Active text: Lighter primary (#5AA2F5)
  - Indicators/backgrounds: Adjusted for dark mode

## Accessibility Requirements
- TabsList: `accessibilityRole="tablist"`
- TabsTrigger: `accessibilityRole="tab"`, `accessibilityState={{ selected: boolean, disabled: boolean }}`
- TabsContent: `accessibilityRole="tabpanel"`, `accessibilityLabelledBy` linked to trigger
- Keyboard navigation on web:
  - Arrow keys to navigate between tabs
  - Enter/Space to activate tab
  - Tab key to focus into content panel
- Screen reader announces selected state

## Usage Examples

### Basic Usage
```tsx
<TabsContainer value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview" label="Overview" />
    <TabsTrigger value="details" label="Details" />
    <TabsTrigger value="reviews" label="Reviews" />
  </TabsList>

  <TabsContent value="overview">
    <Text>Overview content here</Text>
  </TabsContent>

  <TabsContent value="details">
    <Text>Details content here</Text>
  </TabsContent>

  <TabsContent value="reviews">
    <Text>Reviews content here</Text>
  </TabsContent>
</TabsContainer>
```

### Advanced Usage
```tsx
<TabsContainer
  value={activeTab}
  onValueChange={setActiveTab}
  orientation="vertical"
  variant="pills"
>
  <TabsList>
    <TabsTrigger
      value="account"
      label="Account"
      icon={<UserIcon />}
    />
    <TabsTrigger
      value="security"
      label="Security"
      icon={<LockIcon />}
    />
    <TabsTrigger
      value="notifications"
      label="Notifications"
      icon={<BellIcon />}
      disabled
    />
  </TabsList>

  <TabsContent value="account">
    <AccountSettings />
  </TabsContent>

  <TabsContent value="security">
    <SecuritySettings />
  </TabsContent>

  <TabsContent value="notifications">
    <NotificationSettings />
  </TabsContent>
</TabsContainer>
```

## Edge Cases
- **No matching TabsContent**: Show empty state or first available content
- **Value not in triggers**: Default to first tab or show warning
- **Many tabs**: Horizontal orientation needs ScrollView wrapper
- **Dynamic tabs**: Handle value change when active tab is removed
- **Disabled active tab**: Allow but show disabled state, or auto-switch to next enabled tab

## Dependencies
- Uses React Context to pass value/onValueChange from container to triggers
- Typography component for label text
- Optional icon components

## Design Considerations

### Styling Approach
- Line variant:
  - Horizontal: 2-3px bottom border on active tab
  - Vertical: 2-3px left/right border on active tab
- Filled variant:
  - Full background color on active tab
  - Subtle hover background on inactive tabs
- Pills variant:
  - Rounded backgrounds (borderRadius: 8-12)
  - Padding: 8-12 horizontal, 6-8 vertical
- Tab spacing: 16-24px between tabs

### Layout Strategy
- Horizontal orientation:
  - TabsList: flexDirection row, possibly ScrollView
  - TabsContent: Full width below
- Vertical orientation:
  - Container: flexDirection row
  - TabsList: Fixed width column (200-250px)
  - TabsContent: Flex 1, fills remaining space
- Active content only rendered (unmount inactive) or all rendered with display control

### Performance Considerations
- Lazy load TabsContent or unmount inactive panels to reduce memory
- Memoize trigger components to prevent unnecessary re-renders
- Animated transition between content panels (optional, use Animated API)
- ScrollView for TabsList when many tabs exceed viewport

### Customization Points
- Orientation for different layout needs
- Three variant styles for different UI patterns
- Icon support for visual tab identification
- Disabled state per tab
- Custom styles for container, list, triggers, and content
- Transition animations between panels (fade, slide)
