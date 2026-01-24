# drawer Specification

## Purpose
TBD - created by archiving change add-drawer-component. Update Purpose after archive.
## Requirements
### Requirement: Component Structure

Drawer SHALL wrap expo-router's Drawer layout component with theme-aware screenOptions.

#### Scenario: Default rendering

- **WHEN** Drawer is rendered without screenOptions
- **THEN** expo-router's Drawer is rendered internally
- **AND** themed screenOptions are applied automatically
- **AND** children are passed through to the underlying Drawer

#### Scenario: Rendering with children

- **WHEN** Drawer is rendered with Drawer.Screen children
- **THEN** children are passed to expo-router's Drawer
- **AND** screen configuration is preserved
- **AND** themed options are applied to all screens

#### Scenario: Static Screen property

- **WHEN** Drawer.Screen is accessed
- **THEN** it returns expo-router's Drawer.Screen component
- **AND** can be used to configure individual screens

### Requirement: Three-Tier Theme Integration

Drawer SHALL use the three-tier theme token system for all styling values.

#### Scenario: Theme token access

- **WHEN** Drawer component is rendered
- **THEN** useTheme hook provides access to theme context
- **AND** colorScheme determines light/dark token selection
- **AND** theme.navigation.drawer provides component tokens

#### Scenario: Theme token structure

- **WHEN** Drawer.theme.ts defines component tokens
- **THEN** header.light contains light mode header colors
- **AND** header.dark contains dark mode header colors
- **AND** drawer.light contains light mode drawer panel colors
- **AND** drawer.dark contains dark mode drawer panel colors
- **AND** drawerItem.light contains light mode item colors
- **AND** drawerItem.dark contains dark mode item colors
- **AND** all colors derive from semantic color tokens

### Requirement: Header Styling

Drawer SHALL apply themed styling to the navigation header.

#### Scenario: Header background color

- **WHEN** Drawer is rendered
- **THEN** headerStyle.backgroundColor uses theme.navigation.drawer.header[colorScheme].background
- **AND** background adapts to light/dark mode

#### Scenario: Header tint color

- **WHEN** Drawer is rendered
- **THEN** headerTintColor uses theme.navigation.drawer.header[colorScheme].tint
- **AND** tint applies to menu button and header buttons
- **AND** tint adapts to light/dark mode

#### Scenario: Header title styling

- **WHEN** Drawer is rendered
- **THEN** headerTitleStyle.color uses theme.navigation.drawer.header[colorScheme].title
- **AND** headerTitleStyle.fontSize uses theme.navigation.drawer.headerTitle.fontSize
- **AND** headerTitleStyle.fontWeight uses theme.navigation.drawer.headerTitle.fontWeight

#### Scenario: Header shadow

- **WHEN** Drawer is rendered
- **THEN** headerShadowVisible uses theme.navigation.drawer.shadowVisible
- **AND** defaults to false for clean appearance

### Requirement: Drawer Panel Styling

Drawer SHALL apply themed styling to the drawer panel.

#### Scenario: Drawer background

- **WHEN** drawer panel is opened
- **THEN** drawerStyle.backgroundColor uses theme.navigation.drawer.drawer[colorScheme].background
- **AND** background adapts to light/dark mode

#### Scenario: Drawer overlay

- **WHEN** drawer panel is opened
- **THEN** overlayColor uses theme.navigation.drawer.drawer[colorScheme].overlay
- **AND** overlay adapts to light/dark mode

### Requirement: Drawer Item Styling

Drawer SHALL apply themed styling to drawer navigation items.

#### Scenario: Active item colors

- **WHEN** drawer item is active (current route)
- **THEN** drawerActiveTintColor uses theme.navigation.drawer.drawerItem[colorScheme].activeTint
- **AND** drawerActiveBackgroundColor uses theme.navigation.drawer.drawerItem[colorScheme].activeBackground

#### Scenario: Inactive item colors

- **WHEN** drawer item is inactive
- **THEN** drawerInactiveTintColor uses theme.navigation.drawer.drawerItem[colorScheme].inactiveTint
- **AND** drawerInactiveBackgroundColor uses theme.navigation.drawer.drawerItem[colorScheme].inactiveBackground

#### Scenario: Drawer label styling

- **WHEN** drawer items are rendered
- **THEN** drawerLabelStyle.fontSize uses theme.navigation.drawer.drawerLabel.fontSize
- **AND** drawerLabelStyle.fontWeight uses theme.navigation.drawer.drawerLabel.fontWeight

### Requirement: Screen Options Override

Drawer SHALL support user-provided screenOptions that merge with themed defaults.

#### Scenario: Object screenOptions override

- **WHEN** screenOptions prop is provided as an object
- **THEN** user options are merged with themed defaults
- **AND** user options take precedence over themed values
- **AND** headerStyle is deep merged (preserves unspecified properties)
- **AND** drawerStyle is deep merged

#### Scenario: Function screenOptions override

- **WHEN** screenOptions prop is provided as a function
- **THEN** function is called with navigation props plus themeContext
- **AND** function return value is merged with themed defaults
- **AND** user can access theme and colorScheme via themeContext

#### Scenario: ThemeContext injection

- **WHEN** function-based screenOptions is called
- **THEN** themeContext.theme provides full theme object
- **AND** themeContext.colorScheme provides current color scheme
- **AND** enables dynamic theme-aware screen options

### Requirement: Props Forwarding

Drawer SHALL forward all expo-router Drawer props to the underlying component.

#### Scenario: Navigation props forwarding

- **WHEN** initialRouteName is provided
- **THEN** it is forwarded to expo-router Drawer
- **AND** initial route is displayed first

#### Scenario: ID prop forwarding

- **WHEN** id prop is provided
- **THEN** it is forwarded to expo-router Drawer
- **AND** navigator can be referenced by id

#### Scenario: Children forwarding

- **WHEN** children prop contains Drawer.Screen elements
- **THEN** children are passed to expo-router Drawer
- **AND** screen configuration is preserved

### Requirement: TypeScript Type Safety

Drawer SHALL export TypeScript interfaces for all props and types.

#### Scenario: DrawerProps interface

- **WHEN** DrawerProps interface is defined
- **THEN** it extends Omit of ExpoRouterDrawerProps excluding screenOptions
- **AND** screenOptions is typed as DrawerScreenOptionsWithTheme
- **AND** allows both object and function forms

#### Scenario: DrawerThemeContext interface

- **WHEN** DrawerThemeContext interface is defined
- **THEN** theme property is typed as Theme
- **AND** colorScheme property is typed as ColorScheme

#### Scenario: DrawerScreenOptionsCallbackProps interface

- **WHEN** DrawerScreenOptionsCallbackProps is defined
- **THEN** includes route, navigation, theme from react-navigation
- **AND** includes themeContext with Theme and ColorScheme

### Requirement: Light Color Scheme

Drawer SHALL apply appropriate colors in light mode.

#### Scenario: Light mode header

- **WHEN** colorScheme is light
- **THEN** header background uses light.surface.primary
- **AND** header tint uses light.action.primary
- **AND** header title uses light.text.primary

#### Scenario: Light mode drawer panel

- **WHEN** colorScheme is light
- **THEN** drawer background uses light.surface.primary
- **AND** drawer overlay uses semi-transparent black

#### Scenario: Light mode drawer items

- **WHEN** colorScheme is light
- **THEN** active tint uses light.action.primary
- **AND** inactive tint uses light.text.tertiary
- **AND** active background uses light.action.subtle
- **AND** inactive background is transparent

### Requirement: Dark Color Scheme

Drawer SHALL apply appropriate colors in dark mode.

#### Scenario: Dark mode header

- **WHEN** colorScheme is dark
- **THEN** header background uses dark.surface.primary
- **AND** header tint uses dark.action.primary
- **AND** header title uses dark.text.primary

#### Scenario: Dark mode drawer panel

- **WHEN** colorScheme is dark
- **THEN** drawer background uses dark.surface.primary
- **AND** drawer overlay uses semi-transparent black

#### Scenario: Dark mode drawer items

- **WHEN** colorScheme is dark
- **THEN** active tint uses dark.action.primary
- **AND** inactive tint uses dark.text.tertiary
- **AND** active background uses dark.action.subtle
- **AND** inactive background is transparent

### Requirement: Testing Coverage

Drawer SHALL have comprehensive test coverage for all behaviors.

#### Scenario: Render tests

- **WHEN** test suite runs
- **THEN** basic rendering is tested
- **AND** rendering with children is tested
- **AND** Static Screen property access is tested

#### Scenario: Theme-based styling tests

- **WHEN** theme styling is tested
- **THEN** headerShadowVisible is verified
- **AND** headerTintColor is verified
- **AND** headerStyle.backgroundColor is verified
- **AND** headerTitleStyle is verified
- **AND** drawerActiveTintColor is verified
- **AND** drawerInactiveTintColor is verified
- **AND** drawerStyle.backgroundColor is verified

#### Scenario: Color scheme tests

- **WHEN** light mode is tested
- **THEN** light theme colors are applied

#### Scenario: Dark color scheme tests

- **WHEN** dark mode is tested
- **THEN** dark theme colors are applied
- **AND** colors differ from light mode

#### Scenario: Screen options override tests

- **WHEN** screenOptions override is tested
- **THEN** partial override preserves themed defaults
- **AND** user options take precedence
- **AND** deep merging of style objects works

#### Scenario: Function screenOptions tests

- **WHEN** function screenOptions is tested
- **THEN** function is called with navigation context
- **AND** themeContext is provided
- **AND** return value is merged with defaults

### Requirement: Documentation

Drawer SHALL have comprehensive MDX documentation with usage examples.

#### Scenario: Documentation structure

- **WHEN** README.mdx is viewed
- **THEN** component description explains drawer navigation pattern
- **AND** basic usage example shows minimal setup
- **AND** custom header example shows option overrides
- **AND** theme-aware example shows function-based options
- **AND** custom drawer content example shows advanced usage
- **AND** props table documents all props
- **AND** theme tokens table documents all tokens

#### Scenario: Accessibility documentation

- **WHEN** accessibility section is viewed
- **THEN** screen reader support is documented
- **AND** gesture navigation is documented
- **AND** focus management is documented

### Requirement: Accessibility

Drawer SHALL support accessible navigation patterns.

#### Scenario: Screen reader support

- **WHEN** drawer is opened or closed
- **THEN** state changes are announced to screen readers
- **AND** drawer items have accessible labels

#### Scenario: Touch targets

- **WHEN** drawer items are rendered
- **THEN** touch targets meet minimum 44pt requirement
- **AND** items are easy to tap

#### Scenario: Gesture navigation

- **WHEN** user swipes from edge
- **THEN** drawer opens with gesture
- **AND** swipe gesture is discoverable

