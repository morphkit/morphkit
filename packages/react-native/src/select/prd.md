# Select

## Overview
Dropdown picker component for selecting a single value from a list of options with search and multi-select support. Provides native-like selection experience with modal/overlay interface for choosing from many options.

## Component Behavior
Select displays selected value(s) in a button-like trigger. Tapping opens modal/overlay showing full options list. User selects option(s) from list. Selected options show checkmark. Search functionality filters options by label. Closing modal commits selection via onValueChange callback.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| value | `string \| string[]` | Currently selected value(s). Array for multiple, string for single |
| onValueChange | `(value: string \| string[]) => void` | Callback when selection changes |
| options | `Array<{ label: string; value: string }>` | Available options to select from |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | `undefined` | Text label above select trigger |
| placeholder | `string` | `"Select..."` | Text shown when no selection |
| multiple | `boolean` | `false` | Allow selecting multiple options |
| searchable | `boolean` | `false` | Show search input in options modal |
| disabled | `boolean` | `false` | Disables select interaction |
| error | `string` | `undefined` | Error message shown below trigger |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size of trigger button |
| style | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles for wrapper |

### Extends
`ViewProps` - All standard React Native View props

## Variants

### Sizes
- **sm**: height: 36, fontSize: 14, padding: 8
- **md**: height: 44, fontSize: 16, padding: 12
- **lg**: height: 52, fontSize: 18, padding: 16

## States
- **closed**: Options modal hidden, trigger shows selected value or placeholder
- **open**: Options modal visible with list of choices
- **focused**: Trigger has focus indicator (if using keyboard nav)
- **error**: Red border on trigger, error message below
- **disabled**: Reduced opacity, no interaction

## Theme Support
- Light mode:
  - Trigger: white background, gray border (#E5E7EB)
  - Options modal: white background, gray dividers
  - Selected option: checkmark icon, primary blue background tint
  - Hover option: light gray background (#F3F4F6)
- Dark mode:
  - Trigger: dark background (#374151), lighter border (#4B5563)
  - Options modal: dark background (#1F2937), lighter dividers
  - Selected option: checkmark icon, primary blue tint
  - Hover option: slightly lighter background (#4B5563)
- Dynamic switching: useColorScheme() for theme detection

## Accessibility Requirements
- Trigger:
  - role="button"
  - accessibilityLabel from label prop or selected option label
  - accessibilityHint: "Double tap to open options"
  - accessibilityExpanded: open state
- Options list:
  - role="menu"
  - Each option: role="menuitem"
  - accessibilityState: { selected } for each option
- Search input (if searchable):
  - accessibilityLabel="Search options"
  - Keyboard interaction support
- Announce selection changes to screen readers

## Usage Examples

### Basic Usage
```tsx
<Select
  label="Country"
  value={country}
  onValueChange={setCountry}
  options={[
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "Mexico", value: "mx" }
  ]}
/>
```

### Advanced Usage
```tsx
<Select
  label="Skills"
  value={selectedSkills}
  onValueChange={setSelectedSkills}
  options={skillOptions}
  multiple
  searchable
  placeholder="Select your skills"
  size="lg"
/>
```

## Edge Cases
- **Empty options array**: Shows empty state message in modal
- **value not in options**: Shows placeholder (invalid selection)
- **multiple=true with single value**: Convert to array internally
- **Very long option labels**: Truncate with ellipsis in list
- **Hundreds of options**: Virtualize list for performance (FlatList)
- **Search with no results**: Show "No results found" message
- **Rapid open/close**: Debounce to prevent jarring animations

## Dependencies
- Modal or overlay component for options display
- Optional: Icon library for chevron down icon and checkmark
- Optional: FlatList for virtualized long option lists

## Design Considerations

### Styling Approach
- Trigger: Pressable styled like Input component
- Selected value text or placeholder with chevron down icon
- Options modal: Full-screen or bottom sheet depending on platform
- Option rows: Pressable with label and checkmark (if selected)
- Search input: Standard Input component at top of modal

### Layout Strategy
- Wrapper: Label | Trigger | Error (vertical stack)
- Trigger: Selected text | Chevron icon (horizontal)
- Options modal: Search (if searchable) | Options list | Close button
- Multiple selection: Checkmarks on selected, "Done" button to commit

### Performance Considerations
- Virtualize options list if > 50 items (use FlatList)
- Debounce search input filtering
- Memoize filtered options list
- Close modal on backdrop press for quick dismissal
- Lazy load modal content (don't render until open)

### Customization Points
- searchable enables search functionality
- multiple allows multi-select
- Can add option grouping (sections in FlatList)
- Can customize trigger appearance
- Option rows can show icons/avatars
- "Select All" / "Clear All" buttons for multiple mode
