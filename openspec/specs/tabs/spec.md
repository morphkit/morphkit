# tabs Specification

## Purpose
The Tabs component provides tabbed navigation with multiple variants and orientations for organizing content into selectable sections, enabling efficient content switching within a single view.
## Requirements
### Requirement: Compound Component Architecture

Tabs SHALL provide a compound component system with four sub-components that work together via React Context.

#### Scenario: TabsContainer provides context to children

- **WHEN** TabsContainer wraps TabsList and TabsContent components
- **THEN** value and onValueChange are accessible via context
- **AND** orientation and variant settings propagate to all children
- **AND** disabled state propagates to all TabsTrigger components

#### Scenario: Context error when used outside container

- **WHEN** TabsList, TabsTrigger, or TabsContent is rendered outside TabsContainer
- **THEN** component throws error "Tabs components must be used within TabsContainer"

### Requirement: Controlled State Management

Tabs SHALL implement controlled state pattern where parent manages active tab value.

#### Scenario: Parent controls active tab

- **WHEN** value prop is set to "tab2"
- **THEN** TabsTrigger with value="tab2" displays selected state
- **AND** TabsContent with value="tab2" is rendered
- **AND** TabsContent with other values returns null

#### Scenario: Tab selection triggers callback

- **WHEN** user presses an enabled TabsTrigger
- **THEN** onValueChange is called with the trigger's value
- **AND** parent can update state to reflect new selection

### Requirement: Three Visual Variants

Tabs SHALL support line, filled, and pills visual variants with distinct styling.

#### Scenario: Line variant with underline indicator

- **WHEN** variant="line" (default) with horizontal orientation
- **THEN** active tab displays borderBottomWidth of 2px
- **AND** active tab displays borderBottomColor from theme.component.tabs.variant[colorScheme].tab.active.border
- **AND** inactive tabs have no border indicator

#### Scenario: Line variant with vertical orientation

- **WHEN** variant="line" with orientation="vertical"
- **THEN** active tab displays borderLeftWidth of 3px
- **AND** active tab displays borderLeftColor from theme tokens

#### Scenario: Filled variant with background

- **WHEN** variant="filled"
- **THEN** active tab displays backgroundColor from theme.component.tabs.variant[colorScheme].tab.active.background
- **AND** inactive tabs have transparent background
- **AND** active tab text uses theme.component.tabs.variant[colorScheme].filled.text

#### Scenario: Pills variant with rounded backgrounds

- **WHEN** variant="pills"
- **THEN** all tabs display borderRadius from theme.component.tabs.borderRadius
- **AND** all tabs display paddingHorizontal from theme.component.tabs.pill.paddingHorizontal
- **AND** all tabs display paddingVertical from theme.component.tabs.pill.paddingVertical
- **AND** active tab uses theme.component.tabs.variant[colorScheme].tab.active.background
- **AND** inactive tabs use theme.component.tabs.variant[colorScheme].tab.inactive.background

### Requirement: Horizontal and Vertical Orientations

Tabs SHALL support both horizontal and vertical layout directions.

#### Scenario: Horizontal orientation (default)

- **WHEN** orientation="horizontal" or not specified
- **THEN** TabsList displays with flexDirection="row"
- **AND** tabs are arranged side by side
- **AND** gap between tabs is theme.component.tabs.horizontal.gap
- **AND** swipe gestures are enabled for tab navigation

#### Scenario: Vertical orientation

- **WHEN** orientation="vertical"
- **THEN** TabsList displays with flexDirection="column"
- **AND** TabsList width is set to theme.component.tabs.width.vertical (200px)
- **AND** gap between tabs is theme.component.tabs.gap
- **AND** swipe gestures are disabled
- **AND** container displays with flexDirection="row" for side-by-side layout

### Requirement: Swipe Gesture Support

Horizontal tabs SHALL support swipe gestures for navigation using PanResponder.

#### Scenario: Swipe left to next tab

- **WHEN** orientation is horizontal and user swipes left more than 50px
- **THEN** onValueChange is called with next tab value
- **AND** tab index increases by 1

#### Scenario: Swipe right to previous tab

- **WHEN** orientation is horizontal and user swipes right more than 50px
- **THEN** onValueChange is called with previous tab value
- **AND** tab index decreases by 1

#### Scenario: Swipe disabled when disabled or vertical

- **WHEN** disabled={true} or orientation="vertical"
- **THEN** swipe gestures do not trigger tab changes

### Requirement: Icon Support in Triggers

TabsTrigger SHALL support optional leading icons alongside labels.

#### Scenario: Trigger with icon and label

- **WHEN** icon prop is provided to TabsTrigger
- **THEN** icon renders before label text
- **AND** icon has marginRight of theme.component.tabs.iconMargin
- **AND** icon and label are aligned horizontally with alignItems="center"

#### Scenario: Trigger without icon

- **WHEN** icon prop is not provided
- **THEN** only label text is rendered
- **AND** no extra margin is applied

### Requirement: Disabled State

Tabs SHALL support disabled state at both container and individual trigger levels.

#### Scenario: Container-level disabled

- **WHEN** TabsContainer has disabled={true}
- **THEN** all TabsTrigger components are disabled
- **AND** all triggers display opacity from theme.component.tabs.variant[colorScheme].disabled.opacity
- **AND** onValueChange is not called when any trigger is pressed
- **AND** swipe gestures are disabled

#### Scenario: Individual trigger disabled

- **WHEN** TabsTrigger has disabled={true}
- **THEN** that trigger is non-interactive
- **AND** that trigger displays reduced opacity
- **AND** accessibilityState.disabled is true for that trigger
- **AND** other triggers remain interactive

### Requirement: Three-Tier Theme Integration

Tabs SHALL use the three-tier theme token system exclusively with no hardcoded values.

#### Scenario: Primitive tokens for spacing and typography

- **WHEN** component renders
- **THEN** padding uses primitive.spacing[N] tokens
- **AND** gap uses primitive.spacing[N] tokens
- **AND** borderRadius uses primitive.borderRadius.md
- **AND** fontSize uses primitive.fontSize.base
- **AND** fontWeight uses primitive.fontWeight.medium

#### Scenario: Semantic tokens for colors

- **WHEN** component renders in light mode
- **THEN** colors use light.surface.*, light.text.*, light.border.* semantic tokens
- **AND** theme.component.tabs.variant.light is accessed for variant colors

#### Scenario: Dark mode color adaptation

- **WHEN** colorScheme is "dark"
- **THEN** colors use dark.surface.*, dark.text.*, dark.border.* semantic tokens
- **AND** theme.component.tabs.variant.dark is accessed for variant colors

### Requirement: Typography Integration

TabsTrigger labels SHALL use the Typography component for text rendering.

#### Scenario: Label uses Typography component

- **WHEN** TabsTrigger renders with label prop
- **THEN** label is rendered using Typography component with variant="body"
- **AND** fontWeight is set to theme.component.tabs.label.fontWeight
- **AND** color is dynamically set based on active state and variant

### Requirement: Style Customization

All Tabs sub-components SHALL support style prop for custom overrides.

#### Scenario: Custom styles on TabsContainer

- **WHEN** style prop is passed to TabsContainer
- **THEN** custom styles are merged with base styles
- **AND** custom styles take precedence over theme defaults

#### Scenario: Custom styles on TabsList

- **WHEN** style prop is passed to TabsList
- **THEN** custom styles are merged after layout styles
- **AND** flexDirection from context orientation is preserved unless overridden

#### Scenario: Custom styles on TabsTrigger

- **WHEN** style prop is passed to TabsTrigger
- **THEN** custom styles are merged after variant and state styles
- **AND** user styles have highest priority

#### Scenario: Custom styles on TabsContent

- **WHEN** style prop is passed to TabsContent
- **THEN** custom styles are merged with flex: 1 and paddingTop
- **AND** content styling is fully customizable

### Requirement: ViewProps Forwarding

All Tabs sub-components SHALL forward standard React Native ViewProps.

#### Scenario: ViewProps on container components

- **WHEN** testID, accessibilityLabel, or other ViewProps are passed
- **THEN** props are forwarded to underlying View/Pressable components
- **AND** custom props do not interfere with component functionality

### Requirement: Accessibility

Tabs SHALL implement proper accessibility attributes following WCAG AA guidelines.

#### Scenario: TabsList has tablist role

- **WHEN** TabsList renders
- **THEN** accessibilityRole is "tablist"

#### Scenario: TabsTrigger has tab role with state

- **WHEN** TabsTrigger renders
- **THEN** accessibilityRole is "tab"
- **AND** accessibilityState.selected reflects active state
- **AND** accessibilityState.disabled reflects disabled state

### Requirement: Testing Coverage

Tabs SHALL have comprehensive test coverage for all functionality.

#### Scenario: Component rendering tests

- **WHEN** test suite runs
- **THEN** tests verify all sub-components render correctly
- **AND** tests verify context propagation
- **AND** tests verify context error handling

#### Scenario: Variant and orientation tests

- **WHEN** test suite runs
- **THEN** tests verify all 3 variants apply correct styles
- **AND** tests verify both orientations set correct flexDirection
- **AND** tests verify vertical line variant uses borderLeft

#### Scenario: Interaction tests

- **WHEN** test suite runs
- **THEN** tests verify onValueChange is called on trigger press
- **AND** tests verify disabled state prevents interaction
- **AND** tests verify content switching on value change

#### Scenario: Style and props tests

- **WHEN** test suite runs
- **THEN** tests verify custom styles are merged correctly
- **AND** tests verify ViewProps are forwarded
- **AND** tests verify accessibility props are set

### Requirement: Documentation

Tabs SHALL have comprehensive MDX documentation with examples.

#### Scenario: Documentation structure

- **WHEN** README.mdx is rendered
- **THEN** documentation includes component description
- **AND** documentation shows basic usage example
- **AND** documentation demonstrates all variants
- **AND** documentation demonstrates both orientations
- **AND** documentation shows icon usage
- **AND** documentation shows disabled states
- **AND** documentation includes props tables for all sub-components

#### Scenario: Live examples

- **WHEN** documentation is viewed in demo app
- **THEN** BasicExample demonstrates controlled tabs with content switching
- **AND** SwipeExample demonstrates pills variant with swipe navigation
- **AND** AdvancedExample demonstrates vertical orientation with icons

