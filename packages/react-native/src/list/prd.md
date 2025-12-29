# List

## Overview

Structured list component for displaying collections of items with optional dividers, icons, and interactive rows for settings, menus, and data displays.

## Component Behavior

List provides a container for ListItem components in a vertical layout. Each ListItem displays a title, optional description, leading icon, and trailing content (chevron, switch, badge, etc.). Items can be pressable for navigation or actions. Supports dividers between items for visual separation. Common use cases include settings screens, menu lists, contact lists, and option selectors.

## Props

### List Props

| Prop     | Type                   | Default     | Description                  |
| -------- | ---------------------- | ----------- | ---------------------------- |
| children | `ReactNode`            | required    | ListItem components          |
| divided  | `boolean`              | `false`     | Shows dividers between items |
| style    | `StyleProp<ViewStyle>` | `undefined` | Custom styles                |

### ListItem Props

| Prop        | Type                        | Default     | Description                                     |
| ----------- | --------------------------- | ----------- | ----------------------------------------------- |
| title       | `string`                    | required    | Primary item text                               |
| description | `string`                    | `undefined` | Secondary text below title                      |
| icon        | `ReactNode`                 | `undefined` | Leading icon component                          |
| trailing    | `ReactNode`                 | `undefined` | Trailing content (chevron, switch, badge, etc.) |
| onPress     | `(() => void) \| undefined` | `undefined` | Makes item pressable                            |
| disabled    | `boolean`                   | `false`     | Disables interaction                            |
| style       | `StyleProp<ViewStyle>`      | `undefined` | Custom styles                                   |

### Extends

Both components extend `ViewProps`

## Variants

No explicit variants (layout and content-focused component)

## States

### ListItem States

- **default**: Standard appearance
- **pressed**: Background color change when onPress provided
- **disabled**: Reduced opacity, no interaction

## Theme Support

- Light mode:
  - Background: White (#FFFFFF)
  - Title: Dark gray (#1F2937)
  - Description: Medium gray (#6B7280)
  - Divider: Light gray (#E5E7EB)
  - Pressed background: Light gray (#F9FAFB)
- Dark mode:
  - Background: Dark gray (#1F2937)
  - Title: White (#F9FAFB)
  - Description: Light gray (#9CA3AF)
  - Divider: Darker gray (#374151)
  - Pressed background: Lighter gray (#374151)

## Accessibility Requirements

- **List container**: `accessibilityRole="list"`
- **ListItem**:
  - Default (non-pressable): `accessibilityRole="listitem"` or `accessibilityRole="text"`
  - Pressable: `accessibilityRole="button"` or `accessibilityRole="link"`
- `accessibilityLabel`: Combines title and description for screen readers
- `accessibilityState={{ disabled }}` when disabled
- `accessibilityHint`: Optional hint for what happens on press
- Icon should have `accessibilityElementsHidden={true}` if decorative
- Trailing elements should be accessible if interactive (e.g., Switch)

## Usage Examples

### Basic Usage

```tsx
<List>
  <ListItem title="Profile" icon={<UserIcon />} />
  <ListItem title="Settings" icon={<SettingsIcon />} />
  <ListItem title="Logout" icon={<LogoutIcon />} />
</List>
```

### Advanced Usage

```tsx
<List divided>
  <ListItem
    title="Notifications"
    description="Push notifications and email alerts"
    icon={<BellIcon />}
    trailing={
      <Switch checked={notificationsOn} onCheckedChange={setNotificationsOn} />
    }
  />

  <ListItem
    title="Account Settings"
    description="Manage your profile and preferences"
    icon={<UserIcon />}
    trailing={<ChevronRightIcon />}
    onPress={() => navigate("/account")}
  />

  <ListItem
    title="Privacy Policy"
    icon={<ShieldIcon />}
    trailing={<ExternalLinkIcon />}
    onPress={() => openURL("https://example.com/privacy")}
  />

  <ListItem
    title="Delete Account"
    description="Permanently remove your account"
    icon={<TrashIcon color="red" />}
    onPress={handleDeleteAccount}
    disabled={isDeleting}
  />
</List>
```

## Edge Cases

- **Empty list**: Show empty state message or nothing
- **Very long title/description**: Truncate with ellipsis or wrap to multiple lines
- **No icon**: Left align title with padding, no icon space
- **Custom trailing content**: Ensure trailing content fits within item height
- **Nested interactive elements**: Avoid nesting pressable elements (e.g., button in pressable ListItem)
- **Many items**: Consider using FlatList for performance with large datasets

## Dependencies

- Typography component for title and description text
- Optional icon components
- Divider component or inline divider rendering

## Design Considerations

### Styling Approach

- ListItem layout: Horizontal flexbox (row)
- Icon: Fixed width (40-48px), left-aligned, centered vertically
- Content area: Flex 1, vertical layout (title above description)
- Trailing: Fixed width or auto, right-aligned, centered vertically
- Padding: 12-16px vertical, 16-20px horizontal
- Divider: 1px height, full width or inset from left (aligned with content)

### Layout Strategy

- List: Simple vertical container (View)
- ListItem structure:
  ```
  [Icon (optional, 40px)] [Content (flex:1)] [Trailing (optional, auto)]
                           [Title (bold)]
                           [Description (smaller, gray)]
  ```
- Divided: Add borderBottomWidth to each item except last
- Pressable: Wrap entire ListItem in Pressable with press feedback

### Performance Considerations

- For large lists (>20 items), use FlatList instead of mapping ListItem
- Memoize ListItem components to prevent unnecessary re-renders
- Avoid complex trailing components that re-render frequently
- Use `getItemLayout` with FlatList for better performance

### Customization Points

- Divided option for visual separation
- Icon support for visual identification
- Description for additional context
- Trailing content slot for various UI elements (chevron, switch, badge, count)
- Pressable behavior with onPress
- Disabled state
- Custom styling for container and items
- Alternative: Support for sections/headers (ListSection component)
