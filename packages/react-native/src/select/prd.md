# Select

## Overview

Flexible inline selection component for choosing one or more options from visible choices. Provides React Context-based communication between parent Select and child SelectOption components. User controls visual presentation through custom child components (e.g., Cards, Views). Options are always visible, not in a modal overlay.

## Component Behavior

Select wraps SelectOption components and manages selection state through Context. SelectOption components can be nested anywhere in the children tree (enabled by Context API). Each SelectOption handles press events and updates selection through the context callback. Visual feedback for selection state is implemented by the user's child components passed to SelectOption, not by Select/SelectOption themselves.

## Architecture

Uses React Context pattern (similar to RadioGroup/RadioButton):

- Select creates Context Provider with value, onValueChange, multiple, disabled
- SelectOption consumes Context via useSelectContext hook
- Throws error if SelectOption used outside Select
- Context enables deep nesting of SelectOption in component tree

## Props

### Select Component

#### Required Props

| Prop          | Type                                  | Description                                                        |
| ------------- | ------------------------------------- | ------------------------------------------------------------------ |
| value         | `string \| string[]`                  | Currently selected value(s). Array for multiple, string for single |
| onValueChange | `(value: string \| string[]) => void` | Callback when selection changes                                    |
| children      | `ReactNode`                           | SelectOption components and layout wrappers (e.g., Stack)          |

#### Optional Props

| Prop     | Type                   | Default     | Description                      |
| -------- | ---------------------- | ----------- | -------------------------------- |
| multiple | `boolean`              | `false`     | Allow selecting multiple options |
| disabled | `boolean`              | `false`     | Disables all options             |
| style    | `StyleProp<ViewStyle>` | `undefined` | Custom styles for container View |

#### Extends

`ViewProps` - All standard React Native View props (except children)

### SelectOption Component

#### Required Props

| Prop     | Type        | Description                                                   |
| -------- | ----------- | ------------------------------------------------------------- |
| value    | `string`    | Unique identifier for this option                             |
| children | `ReactNode` | Custom content to display (typically Card, View, or component |

#### Optional Props

| Prop     | Type                   | Default     | Description                         |
| -------- | ---------------------- | ----------- | ----------------------------------- |
| disabled | `boolean`              | `false`     | Disable this specific option        |
| style    | `StyleProp<ViewStyle>` | `undefined` | Custom styles for Pressable wrapper |

#### Extends

`ViewProps` - All standard React Native View props (except children)

## States

### Select States

- **Single selection mode**: value is string, onValueChange receives string
- **Multiple selection mode**: value is string[], onValueChange receives string[]
- **Disabled**: All SelectOption components become disabled

### SelectOption States

- **Selected**: Checked in accessibility state, isSelected=true in logic
- **Unselected**: Checked=false in accessibility state
- **Disabled**: Cannot be pressed, disabled in accessibility state
- **Individually disabled**: Option disabled independent of parent
- **Parent disabled**: Disabled because parent Select is disabled

## Selection Logic

### Single Mode (multiple=false)

- Press SelectOption: calls `onValueChange(value)`
- Always replaces current selection
- Empty string `""` means nothing selected

### Multiple Mode (multiple=true)

- Press selected SelectOption: removes from array
- Press unselected SelectOption: adds to array
- Empty array `[]` means nothing selected
- Example: `["opt1", "opt2"]` means both selected

## Theme Support

**No built-in theming** - User's child components handle all styling including:

- Selection state visual feedback (borders, backgrounds, colors)
- Light/dark mode support (via their own components)
- Hover/press states (via their own Pressable)

Recommended pattern:

```tsx
<SelectOption value="opt1">
  <Card
    variant={value === "opt1" ? "elevated" : "default"}
    style={{
      borderWidth: value === "opt1" ? 2 : 1,
      borderColor: value === "opt1" ? "#4A90E2" : "#E5E7EB",
    }}
  >
    <Typography>Option 1</Typography>
  </Card>
</SelectOption>
```

## Accessibility Requirements

### Select Container

- `accessibilityRole="radiogroup"` for proper container identification
- All standard ViewProps accessibility props supported

### SelectOption

- `accessibilityRole="radio"` for screen reader identification
- `accessibilityState={{ checked: isSelected, disabled: isDisabled }}`
- Selection state changes announced automatically to screen readers
- Supports custom `accessibilityLabel` via ViewProps
- Minimum 44x44 point touch target (enforced by user's child components)

## Usage Examples

### Basic Single Selection

```tsx
const [tier, setTier] = useState("");

<Select value={tier} onValueChange={setTier}>
  <Stack gap={16}>
    <SelectOption value="free">
      <Card variant={tier === "free" ? "elevated" : "default"}>
        <Typography variant="heading">Free Tier</Typography>
        <Typography variant="body">$0/month</Typography>
      </Card>
    </SelectOption>
    <SelectOption value="pro">
      <Card variant={tier === "pro" ? "elevated" : "default"}>
        <Typography variant="heading">Pro Tier</Typography>
        <Typography variant="body">$29/month</Typography>
      </Card>
    </SelectOption>
  </Stack>
</Select>;
```

### Multiple Selection

```tsx
const [contacts, setContacts] = useState<string[]>([]);

<Select value={contacts} onValueChange={setContacts} multiple>
  <Stack gap={12}>
    {allContacts.map((contact) => (
      <SelectOption key={contact.id} value={contact.id}>
        <Card
          variant={contacts.includes(contact.id) ? "elevated" : "default"}
          style={{
            borderWidth: contacts.includes(contact.id) ? 2 : 1,
          }}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Typography>{contact.name}</Typography>
            {contacts.includes(contact.id) && <Text>✓</Text>}
          </View>
        </Card>
      </SelectOption>
    ))}
  </Stack>
</Select>;
```

### Deeply Nested SelectOption

```tsx
<Select value={value} onValueChange={setValue}>
  <Stack gap={12}>
    <View>
      <View>
        <SelectOption value="nested">
          <Card>
            <Typography>Nested Option</Typography>
          </Card>
        </SelectOption>
      </View>
    </View>
  </Stack>
</Select>
```

## Edge Cases

- **Empty value**: Empty string `""` or empty array `[]` are valid (nothing selected)
- **value not matching any option**: No option shows as selected, valid state
- **Duplicate values**: Undefined behavior, users must use unique values
- **SelectOption outside Select**: Throws error "SelectOption must be used within Select"
- **Type mismatch**: Passing string[] for single mode or string for multiple mode works but not recommended
- **Very long lists**: User can use FlatList with SelectOption for virtualization
- **No children in SelectOption**: Valid, option renders as empty Pressable
- **Disabled priority**: Option disabled OR parent disabled = option is disabled

## Dependencies

- React Context API (`createContext`, `useContext`)
- React Native Pressable component
- React Native View component
- No external dependencies
- No Modal component
- No FlatList (unless user chooses to use it)
- No search functionality

## Design Considerations

### Styling Approach

- **No built-in styling** - user provides all visual styling via child components
- SelectOption wraps children in Pressable for interaction only
- Select wraps children in View for container only
- Visual selection state must be implemented by user's child components
- Recommended to use Card component for option UI

### Layout Strategy

- User controls layout via children (typically Stack component)
- Vertical list: Use Stack with gap for spacing
- Grid layout: User can implement with View + flexWrap
- Custom layouts: Any React Native layout works with SelectOption
- Always visible: No modal/overlay, options are always rendered

### Performance Considerations

- Lightweight: No Modal, no FlatList, no search filtering overhead
- Context updates only when value/onValueChange/multiple/disabled change
- SelectOption re-renders on selection state change (expected)
- For very long lists (100+), user can wrap in FlatList for virtualization:
  ```tsx
  <Select value={value} onValueChange={setValue}>
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <SelectOption value={item.id}>
          <Card>{item.label}</Card>
        </SelectOption>
      )}
    />
  </Select>
  ```

### Customization Points

- **Complete visual control**: User defines all option appearance
- **Layout flexibility**: Any React Native layout works
- **Selection indicators**: User chooses borders, backgrounds, icons, etc.
- **Animation**: User can add Animated API to child components
- **Nested content**: Cards can contain images, icons, badges, etc.
- **Disabled styling**: User controls disabled appearance (e.g., opacity)
- **Touch feedback**: Pressable provides built-in press feedback

### Breaking Changes from Previous Version

This is a **complete API redesign**. Previous version used:

- Modal overlay for options
- `options` prop with `{label, value}` objects
- Built-in search functionality
- Built-in theming/styling
- `label`, `placeholder`, `error`, `size` props

New version requires:

- SelectOption children pattern
- User-provided selection styling
- No modal (always visible)
- No search functionality
- Layout control via children (Stack, View, etc.)

## Migration Example

**Before (old API):**

```tsx
<Select
  label="Country"
  value={country}
  onValueChange={setCountry}
  options={[
    { label: "USA", value: "us" },
    { label: "Canada", value: "ca" },
  ]}
  searchable
  size="lg"
/>
```

**After (new API):**

```tsx
<Label>Country</Label>
<Select value={country} onValueChange={setCountry}>
  <Stack gap={12}>
    <SelectOption value="us">
      <Card variant={country === "us" ? "elevated" : "default"}>
        <Typography>USA</Typography>
      </Card>
    </SelectOption>
    <SelectOption value="ca">
      <Card variant={country === "ca" ? "elevated" : "default"}>
        <Typography>Canada</Typography>
      </Card>
    </SelectOption>
  </Stack>
</Select>
```

## Implementation Notes

- Follow Radio component pattern exactly for consistency
- Keep Context internal (not exported from module)
- Type assertions for value in SelectOption are safe (multiple flag known)
- No useState needed in Select (fully controlled component)
- Pressable provides disabled handling and accessibility
- Context Provider re-renders children when value changes (expected behavior)
