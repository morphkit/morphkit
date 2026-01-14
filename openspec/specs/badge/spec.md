# badge Specification

## Purpose

The Badge component displays notification count overlays on top of other UI elements, typically used to indicate unread messages, notifications, or pending items with automatic visibility management.

## Requirements

### Requirement: Component Structure

Badge SHALL be a wrapper component that positions a count indicator over its children.

#### Scenario: Basic structure rendering

- **WHEN** Badge is rendered with children and a positive count
- **THEN** the component renders a wrapper View with position relative
- **AND** children are rendered within the wrapper
- **AND** badge indicator appears positioned absolutely in the top-right corner

#### Scenario: Children-only rendering

- **WHEN** Badge is rendered with children and count of zero or negative
- **THEN** only the children are rendered
- **AND** no badge indicator is visible

### Requirement: Color Variants

Badge SHALL support color variants for different notification contexts.

#### Scenario: Red variant (default)

- **WHEN** color prop is not provided or set to "red"
- **THEN** background color uses theme.component.badge.variant[colorScheme].error.background
- **AND** text color uses theme.component.badge.variant[colorScheme].error.text

#### Scenario: Blue variant

- **WHEN** color prop is set to "blue"
- **THEN** background color uses theme.component.badge.variant[colorScheme].primary.background
- **AND** text color uses theme.component.badge.variant[colorScheme].primary.text

### Requirement: Count Display

Badge SHALL display counts with configurable maximum threshold.

#### Scenario: Count below maxCount

- **WHEN** count is less than or equal to maxCount
- **THEN** the exact count value is displayed

#### Scenario: Count exceeds maxCount

- **WHEN** count is greater than maxCount
- **THEN** display shows "{maxCount}+" format
- **AND** badge indicator remains compact

#### Scenario: Default maxCount

- **WHEN** maxCount prop is not provided
- **THEN** default maxCount of 99 is used

### Requirement: Automatic Visibility

Badge SHALL automatically hide when count reaches zero or becomes negative.

#### Scenario: Zero count

- **WHEN** count equals 0
- **THEN** badge indicator is not rendered
- **AND** children are still displayed

#### Scenario: Negative count

- **WHEN** count is negative
- **THEN** badge indicator is not rendered
- **AND** children are still displayed

### Requirement: Dynamic Positioning

Badge SHALL adjust position based on the number of digits displayed.

#### Scenario: Single digit positioning

- **WHEN** displayCount has 1 character
- **THEN** right position uses theme.component.badge.position.right.oneDigit

#### Scenario: Two digit positioning

- **WHEN** displayCount has 2 characters
- **THEN** right position uses theme.component.badge.position.right.twoDigits

#### Scenario: Three or more digit positioning

- **WHEN** displayCount has 3 or more characters
- **THEN** right position uses theme.component.badge.position.right.threeDigits

### Requirement: Three-Tier Theme Integration

Badge SHALL use the three-tier theme token system for all styling.

#### Scenario: Primitive token usage

- **WHEN** Badge is rendered
- **THEN** paddingHorizontal uses primitive.spacing[2]
- **AND** borderRadius uses primitive.borderRadius.full
- **AND** fontSize uses primitive.fontSize.xs
- **AND** fontWeight uses primitive.fontWeight.semibold

#### Scenario: Semantic token usage

- **WHEN** Badge renders in light mode
- **THEN** colors are sourced from light semantic tokens
- **AND** error variant uses light.status.error.main for background

#### Scenario: Dark mode support

- **WHEN** colorScheme is "dark"
- **THEN** colors are sourced from dark semantic tokens
- **AND** text color uses dark.text.inverse

### Requirement: Typography Integration

Badge SHALL use the Typography component for count display.

#### Scenario: Typography variant

- **WHEN** count is displayed
- **THEN** Typography component is used with variant "caption-1"
- **AND** fontWeight is applied from theme tokens
- **AND** color is applied from variant tokens

### Requirement: Accessibility

Badge SHALL provide accessible notification count information.

#### Scenario: Accessibility label when visible

- **WHEN** badge indicator is visible
- **THEN** wrapper View has accessibilityLabel set to "{displayCount} notifications"

#### Scenario: No accessibility label when hidden

- **WHEN** badge indicator is hidden (count <= 0)
- **THEN** wrapper View has no accessibilityLabel

### Requirement: Style Customization

Badge SHALL support custom style overrides on the wrapper container.

#### Scenario: Style merge pattern

- **WHEN** style prop is provided
- **THEN** styles are merged with base styles
- **AND** user styles take precedence over defaults

### Requirement: Testing Coverage

Badge SHALL have comprehensive test coverage for all behaviors.

#### Scenario: Render tests

- **WHEN** tests are executed
- **THEN** basic rendering with children is verified
- **AND** count display for various values is verified
- **AND** maxCount threshold behavior is verified

#### Scenario: Color variant tests

- **WHEN** tests are executed
- **THEN** default red color is verified
- **AND** blue color variant is verified
- **AND** explicit red color is verified

#### Scenario: Visibility tests

- **WHEN** tests are executed
- **THEN** hiding at zero count is verified
- **AND** hiding at negative count is verified
- **AND** accessibility label presence/absence is verified

#### Scenario: Style tests

- **WHEN** tests are executed
- **THEN** style merge behavior is verified
- **AND** absolute positioning is verified

### Requirement: Documentation

Badge SHALL have comprehensive MDX documentation with examples.

#### Scenario: Documentation sections

- **WHEN** documentation is viewed
- **THEN** basic usage example is provided
- **AND** color variants are demonstrated
- **AND** maxCount threshold is demonstrated
- **AND** hidden badge behavior is shown
- **AND** real-world examples are included
- **AND** props table documents all props
