# accordion Specification

## Purpose

The Accordion component provides collapsible content sections with expand/collapse animations, supporting both single and multiple expansion modes for organizing and hiding complex information hierarchies.

## Requirements

### Requirement: Compound Component Structure

Accordion SHALL be a compound component consisting of Accordion container and AccordionItem children.

#### Scenario: Container with items rendering

- **WHEN** Accordion is rendered with AccordionItem children
- **THEN** the container renders with gap spacing between items
- **AND** gap uses theme.component.accordion.gap (primitive.spacing[3])
- **AND** context is provided to child items

#### Scenario: AccordionItem outside Accordion

- **WHEN** AccordionItem is rendered outside of Accordion
- **THEN** an error is thrown with message "AccordionItem must be used within Accordion"
- **AND** context validation prevents orphaned items

### Requirement: Single Mode

Accordion SHALL support single mode where only one item can be expanded at a time.

#### Scenario: Single item expansion

- **WHEN** type="single" and an item is expanded
- **THEN** only that item shows its content
- **AND** all other items are collapsed
- **AND** value is a string representing the expanded item

#### Scenario: Switching items in single mode

- **WHEN** type="single" and user presses a collapsed item header
- **THEN** onValueChange is called with the pressed item's value
- **AND** the previously open item collapses
- **AND** the pressed item expands

#### Scenario: Default type

- **WHEN** type prop is not specified
- **THEN** type defaults to "single"
- **AND** accordion behaves in single mode

### Requirement: Multiple Mode

Accordion SHALL support multiple mode where any number of items can be expanded simultaneously.

#### Scenario: Multiple items expansion

- **WHEN** type="multiple" and multiple items are expanded
- **THEN** all expanded items show their content simultaneously
- **AND** value is an array of expanded item values

#### Scenario: Adding item in multiple mode

- **WHEN** type="multiple" and user presses a collapsed item
- **THEN** onValueChange is called with current values plus the new item value
- **AND** other expanded items remain expanded

#### Scenario: Removing item in multiple mode

- **WHEN** type="multiple" and user presses an expanded item
- **THEN** onValueChange is called with current values minus the pressed item value
- **AND** other expanded items remain expanded

### Requirement: Collapsible Behavior

Accordion SHALL support collapsible prop to control whether all items can be closed in single mode.

#### Scenario: Collapsible true (default)

- **WHEN** collapsible={true} or not specified and user presses the only open item
- **THEN** onValueChange is called with empty string
- **AND** the item collapses leaving no items expanded

#### Scenario: Collapsible false

- **WHEN** collapsible={false} and user presses the only open item
- **THEN** onValueChange is called with the same item value
- **AND** at least one item must always remain expanded

### Requirement: Controlled Component

Accordion SHALL be a controlled component with value and onValueChange props.

#### Scenario: Controlled value rendering

- **WHEN** value prop is provided
- **THEN** items matching value are expanded
- **AND** items not matching value are collapsed

#### Scenario: Value change callback

- **WHEN** user interacts with an item
- **THEN** onValueChange is called with the new value
- **AND** parent component controls the actual state update

### Requirement: Disabled State

Accordion SHALL support disabled state at both container and individual item levels.

#### Scenario: Container disabled

- **WHEN** disabled={true} on Accordion
- **THEN** all items are disabled regardless of individual disabled props
- **AND** pressing any item does not call onValueChange
- **AND** all items have accessibilityState.disabled=true

#### Scenario: Individual item disabled

- **WHEN** disabled={true} on AccordionItem
- **THEN** only that specific item is disabled
- **AND** pressing the disabled item does not call onValueChange
- **AND** other items remain interactive

#### Scenario: Disabled visual appearance

- **WHEN** an item is disabled
- **THEN** opacity is reduced to theme.component.accordion.variant[colorScheme].disabled.opacity
- **AND** the visual feedback indicates non-interactive state

### Requirement: Three-Tier Theme Integration

Accordion SHALL use the three-tier token system for all styling.

#### Scenario: Primitive token usage

- **WHEN** Accordion is rendered
- **THEN** padding uses primitive.spacing[4]
- **AND** gap uses primitive.spacing[3]
- **AND** borderRadius uses primitive.borderRadius.md
- **AND** animation duration uses primitive.duration.normal

#### Scenario: Semantic token usage

- **WHEN** Accordion is rendered in light or dark mode
- **THEN** header background uses light.surface.secondary or dark.surface.secondary
- **AND** header text uses light.text.primary or dark.text.primary
- **AND** icon color uses light.text.tertiary or dark.text.tertiary
- **AND** content background uses light.surface.primary or dark.surface.primary

#### Scenario: Component token structure

- **WHEN** Accordion theme is defined
- **THEN** tokens are organized in Accordion.theme.ts
- **AND** theme exports variant colors for light and dark
- **AND** header, content, and disabled states are defined

### Requirement: Typography Integration

Accordion SHALL use Typography component for all text rendering.

#### Scenario: Header title rendering

- **WHEN** AccordionItem title prop is provided
- **THEN** Typography component renders the title
- **AND** variant="body" is used
- **AND** fontWeight uses theme.component.accordion.header.fontWeight

#### Scenario: Title styling

- **WHEN** AccordionItem header is rendered
- **THEN** title color uses theme.component.accordion.variant[colorScheme].header.text
- **AND** title has flex: 1 to fill available space

### Requirement: Animation

Accordion SHALL provide smooth animations for expand/collapse transitions.

#### Scenario: Chevron rotation animation

- **WHEN** item expands or collapses
- **THEN** chevron icon rotates from 0 to 180 degrees
- **AND** animation uses Animated.timing with native driver
- **AND** duration uses theme.component.accordion.duration

#### Scenario: Content height animation

- **WHEN** item expands or collapses on native platforms
- **THEN** LayoutAnimation.configureNext provides smooth height transition
- **AND** LayoutAnimation.Presets.easeInEaseOut preset is used
- **AND** web platform skips LayoutAnimation

### Requirement: Accessibility

Accordion SHALL meet WCAG AA accessibility standards.

#### Scenario: Header button role

- **WHEN** AccordionItem header is rendered
- **THEN** accessibilityRole is "button"
- **AND** accessibilityState.expanded reflects expansion state
- **AND** accessibilityState.disabled reflects disabled state

#### Scenario: Accessibility label

- **WHEN** AccordionItem is rendered
- **THEN** accessibilityLabel uses the title prop value
- **AND** screen readers announce the header text

### Requirement: Press Interaction

AccordionItem header SHALL respond to user press with visual feedback.

#### Scenario: Press state

- **WHEN** user presses the header
- **THEN** background color changes to theme.component.accordion.variant[colorScheme].header.pressed
- **AND** visual feedback is immediate

#### Scenario: Press when disabled

- **WHEN** item is disabled and user presses
- **THEN** handlePress returns early
- **AND** onValueChange is not called
- **AND** no visual press feedback occurs

### Requirement: Style Merging

Accordion and AccordionItem SHALL support custom styles that merge with theme styles.

#### Scenario: Accordion custom style

- **WHEN** style prop is provided to Accordion
- **THEN** custom styles are applied after gap style
- **AND** ViewProps are spread to the container View

#### Scenario: AccordionItem custom style

- **WHEN** style prop is provided to AccordionItem
- **THEN** custom styles are applied after theme styles
- **AND** custom styles have highest priority
- **AND** ViewProps are spread to the item View

### Requirement: Testing Coverage

Accordion SHALL have comprehensive test coverage for all features.

#### Scenario: Rendering tests

- **WHEN** tests execute
- **THEN** children rendering is verified
- **AND** single mode context is tested
- **AND** multiple mode context is tested

#### Scenario: Interaction tests

- **WHEN** tests execute
- **THEN** onValueChange callback is tested in single mode
- **AND** onValueChange callback is tested with array in multiple mode
- **AND** collapsible behavior is tested
- **AND** non-collapsible behavior is tested

#### Scenario: Disabled state tests

- **WHEN** tests execute
- **THEN** container disabled prevents all interactions
- **AND** individual item disabled prevents that item's interaction
- **AND** accessibilityState.disabled is verified

#### Scenario: AccordionItem tests

- **WHEN** tests execute
- **THEN** title rendering is verified
- **AND** expanded state content visibility is tested
- **AND** collapsed state content hiding is tested
- **AND** ViewProps forwarding is tested
- **AND** custom style application is tested
- **AND** context error is tested for orphan items

### Requirement: Documentation

Accordion SHALL have comprehensive MDX documentation.

#### Scenario: Documentation structure

- **WHEN** documentation is viewed
- **THEN** basic single mode usage is demonstrated
- **AND** multiple mode usage is demonstrated
- **AND** collapsible behavior is explained

#### Scenario: Documentation examples

- **WHEN** documentation is viewed
- **THEN** disabled state examples are shown
- **AND** FAQ example demonstrates real-world usage
- **AND** code examples show controlled component pattern

#### Scenario: Props documentation

- **WHEN** documentation is viewed
- **THEN** Accordion props table is provided
- **AND** AccordionItem props table is provided
- **AND** all props have type, default, and description
