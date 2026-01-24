# tabs Specification

## Purpose

The Tabs component provides a themed wrapper around expo-router's Tabs navigator that automatically applies morphkit theme tokens to tab bar and header styling, eliminating repetitive configuration while preserving full customization capability.

## Requirements

### Requirement: Component Structure

Tabs SHALL be implemented as a wrapper around expo-router's Tabs component that injects themed screen options.

#### Scenario: Default rendering

- **WHEN** Tabs is rendered with Tabs.Screen children
- **THEN** expo-router Tabs component is rendered internally
- **AND** themed screenOptions are applied automatically
- **AND** children are passed through to expo-router Tabs

#### Scenario: Empty tabs

- **WHEN** Tabs is rendered without children
- **THEN** component renders without error
- **AND** expo-router Tabs is rendered with themed options

#### Scenario: Static Screen property

- **WHEN** Tabs.Screen is accessed
- **THEN** it returns expo-router's Tabs.Screen component
- **AND** screen configuration works identically to expo-router

### Requirement: Tab Bar Theming

Tabs SHALL automatically apply themed styling to the tab bar using theme tokens.

#### Scenario: Active tab color

- **WHEN** Tabs is rendered
- **THEN** tabBarActiveTintColor is set from theme.navigation.tabs.tabBar[colorScheme].activeTint
- **AND** active tab icon and label display this color

#### Scenario: Inactive tab color

- **WHEN** Tabs is rendered
- **THEN** tabBarInactiveTintColor is set from theme.navigation.tabs.tabBar[colorScheme].inactiveTint
- **AND** inactive tab icons and labels display this color

#### Scenario: Tab bar background

- **WHEN** Tabs is rendered
- **THEN** tabBarStyle.backgroundColor is set from theme.navigation.tabs.tabBar[colorScheme].background
- **AND** tab bar displays themed background color

#### Scenario: Tab bar label styling

- **WHEN** Tabs is rendered
- **THEN** tabBarLabelStyle uses theme.navigation.tabs.tabBarLabel for fontSize and fontWeight
- **AND** labels render with consistent typography

### Requirement: Header Theming

Tabs SHALL apply themed header styling consistent with Stack component.

#### Scenario: Header background

- **WHEN** Tabs is rendered
- **THEN** headerStyle.backgroundColor is set from theme.navigation.tabs.header[colorScheme].background

#### Scenario: Header tint color

- **WHEN** Tabs is rendered
- **THEN** headerTintColor is set from theme.navigation.tabs.header[colorScheme].tint
- **AND** header buttons and icons use this color

#### Scenario: Header title styling

- **WHEN** Tabs is rendered
- **THEN** headerTitleStyle.color is set from theme.navigation.tabs.header[colorScheme].title
- **AND** headerTitleStyle.fontSize is set from theme.navigation.tabs.headerTitle.fontSize
- **AND** headerTitleStyle.fontWeight is set from theme.navigation.tabs.headerTitle.fontWeight

#### Scenario: Header shadow

- **WHEN** Tabs is rendered
- **THEN** headerShadowVisible is set from theme.navigation.tabs.shadowVisible
- **AND** defaults to false for clean appearance

### Requirement: Badge Theming

Tabs SHALL provide themed badge styling for tab bar badges.

#### Scenario: Badge background color

- **WHEN** a tab has tabBarBadge set
- **THEN** badge background uses theme.navigation.tabs.badge[colorScheme].background

#### Scenario: Badge text color

- **WHEN** a tab has tabBarBadge set
- **THEN** badge text uses theme.navigation.tabs.badge[colorScheme].text

### Requirement: Theme Context in Icon Callback

Tabs SHALL extend the tabBarIcon callback to provide theme context for theme-aware icon rendering.

#### Scenario: Extended icon callback props

- **WHEN** screenOptions includes tabBarIcon as a function
- **THEN** callback receives { color, focused, size, themeContext }
- **AND** themeContext contains { theme, colorScheme }
- **AND** icons can access full theme for dynamic styling

#### Scenario: Per-screen icon with theme

- **WHEN** Tabs.Screen options includes tabBarIcon function
- **THEN** that function also receives extended props with themeContext
- **AND** per-screen icons can use theme tokens

### Requirement: Screen Options Override

Tabs SHALL allow partial override of screenOptions while preserving themed defaults.

#### Scenario: Object screenOptions merge

- **WHEN** screenOptions prop is an object
- **THEN** user options are merged with themed defaults
- **AND** user options take precedence over themed defaults
- **AND** unspecified options use themed values

#### Scenario: Function screenOptions with theme context

- **WHEN** screenOptions prop is a function
- **THEN** function receives { route, navigation, theme, themeContext }
- **AND** themeContext contains { theme, colorScheme }
- **AND** returned options are merged with themed defaults

#### Scenario: Deep merge tabBarStyle

- **WHEN** user provides partial tabBarStyle
- **THEN** user styles are merged with themed tabBarStyle
- **AND** user can override backgroundColor while keeping other themed styles

#### Scenario: Deep merge headerStyle

- **WHEN** user provides partial headerStyle
- **THEN** user styles are merged with themed headerStyle
- **AND** user can add borderBottomWidth while keeping themed backgroundColor

### Requirement: Color Scheme Adaptation

Tabs SHALL automatically adapt colors based on the current color scheme.

#### Scenario: Light mode colors

- **WHEN** colorScheme is "light"
- **THEN** all colors use theme.navigation.tabs.*[light].* tokens
- **AND** tab bar and header display light theme colors

#### Scenario: Dark mode colors

- **WHEN** colorScheme is "dark"
- **THEN** all colors use theme.navigation.tabs.*[dark].* tokens
- **AND** tab bar and header display dark theme colors

#### Scenario: Different colors in each mode

- **WHEN** comparing light and dark mode renders
- **THEN** tabBarStyle.backgroundColor differs between modes
- **AND** headerStyle.backgroundColor differs between modes
- **AND** tint colors differ between modes

### Requirement: Three-Tier Theme Integration

Tabs SHALL use the three-tier theme token system for all styling values.

#### Scenario: Theme token usage

- **WHEN** Tabs component is rendered
- **THEN** tab bar values are retrieved from theme.navigation.tabs
- **AND** tokens map to primitive and semantic tokens
- **AND** useTheme hook provides access to theme context

#### Scenario: Theme token structure

- **WHEN** Tabs.theme.ts defines navigation tokens
- **THEN** tabBar.light/dark contains activeTint, inactiveTint, background
- **AND** header.light/dark contains background, tint, title
- **AND** headerTitle contains fontSize, fontWeight
- **AND** tabBarLabel contains fontSize, fontWeight
- **AND** badge.light/dark contains background, text
- **AND** all values derive from primitive or semantic tokens

### Requirement: Props Forwarding

Tabs SHALL forward all standard expo-router Tabs props to the underlying component.

#### Scenario: Navigation props forwarding

- **WHEN** initialRouteName, id, or other navigation props are provided
- **THEN** props are forwarded to expo-router Tabs
- **AND** navigation behavior works as expected

#### Scenario: Tab bar configuration props

- **WHEN** tabBarHideOnKeyboard, tabBarPosition, or other tab config props are provided
- **THEN** props are forwarded to expo-router Tabs
- **AND** Tabs-specific props are handled separately from screenOptions

### Requirement: TypeScript Type Safety

Tabs SHALL export TypeScript interfaces for all props and types.

#### Scenario: Props interface export

- **WHEN** TabsProps interface is defined
- **THEN** it extends Omit of ExpoRouterTabsProps excluding screenOptions
- **AND** screenOptions is typed as ScreenOptionsWithTheme

#### Scenario: Theme context type export

- **WHEN** ThemeContext interface is defined
- **THEN** it contains theme: Theme and colorScheme: ColorScheme
- **AND** type is exported for consumer use

#### Scenario: Screen options callback type

- **WHEN** ScreenOptionsCallbackProps is defined
- **THEN** it includes route, navigation, theme, and themeContext
- **AND** enables type-safe function screenOptions

#### Scenario: Icon callback type

- **WHEN** TabBarIconProps is defined
- **THEN** it extends default { color, focused, size } with themeContext
- **AND** enables type-safe tabBarIcon functions

### Requirement: Testing Coverage

Tabs SHALL have comprehensive test coverage for all props and behaviors.

#### Scenario: Render tests

- **WHEN** test suite runs
- **THEN** basic rendering is tested
- **AND** rendering with Tabs.Screen children is tested
- **AND** Tabs.Screen static property is verified

#### Scenario: Tab bar theming tests

- **WHEN** tab bar styling is tested
- **THEN** tabBarActiveTintColor is verified
- **AND** tabBarInactiveTintColor is verified
- **AND** tabBarStyle.backgroundColor is verified
- **AND** tabBarLabelStyle is verified

#### Scenario: Header theming tests

- **WHEN** header styling is tested
- **THEN** headerStyle.backgroundColor is verified
- **AND** headerTintColor is verified
- **AND** headerTitleStyle is verified
- **AND** headerShadowVisible is verified

#### Scenario: Color scheme tests

- **WHEN** color scheme adaptation is tested
- **THEN** light mode applies correct colors
- **AND** dark mode applies correct colors
- **AND** colors differ between modes

#### Scenario: Screen options override tests

- **WHEN** screenOptions override is tested
- **THEN** object options merge correctly
- **AND** function options receive themeContext
- **AND** deep merge for tabBarStyle works
- **AND** deep merge for headerStyle works

#### Scenario: Icon callback tests

- **WHEN** tabBarIcon callback is tested
- **THEN** callback receives themeContext in props
- **AND** theme and colorScheme are accessible
- **AND** icons can use theme tokens

#### Scenario: Props forwarding tests

- **WHEN** props forwarding is tested
- **THEN** initialRouteName is forwarded
- **AND** id prop is forwarded
- **AND** children are passed through

### Requirement: Documentation

Tabs SHALL have comprehensive MDX documentation with usage examples.

#### Scenario: Documentation structure

- **WHEN** README.mdx is viewed
- **THEN** component description explains the wrapper purpose
- **AND** basic usage example shows minimal setup
- **AND** custom tab bar styling is demonstrated
- **AND** theme-aware icons example is provided
- **AND** function screenOptions example shows themeContext usage
- **AND** props table documents all props
- **AND** theme tokens table lists all available tokens

#### Scenario: Migration guide

- **WHEN** documentation is viewed
- **THEN** before/after code comparison is shown
- **AND** demonstrates elimination of boilerplate
- **AND** shows how to access theme in icons

### Requirement: Accessibility

Tabs SHALL preserve and enhance expo-router's accessibility features.

#### Scenario: Tab accessibility

- **WHEN** Tabs renders
- **THEN** tab buttons have appropriate accessibility roles
- **AND** active tab state is announced
- **AND** tab labels are announced by screen readers

#### Scenario: Color contrast

- **WHEN** themed colors are applied
- **THEN** active/inactive contrast meets WCAG AA requirements
- **AND** tab labels are readable in both color schemes
