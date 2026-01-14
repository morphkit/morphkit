# Spec: Divider Component

A visual separator line for creating clear boundaries between content sections, available in horizontal or vertical orientation.

## ADDED Requirements

### Requirement: Component Structure

Divider SHALL be implemented as a View-based component with configurable orientation, thickness, color, and length.

#### Scenario: Horizontal orientation by default

- **WHEN** Divider is rendered without orientation prop
- **THEN** it displays as a horizontal line
- **AND** width is set to the length prop value (default 100%)
- **AND** height is set to the thickness value

#### Scenario: Vertical orientation

- **WHEN** Divider is rendered with orientation="vertical"
- **THEN** it displays as a vertical line
- **AND** height is set to the length prop value
- **AND** width is set to the thickness value

#### Scenario: Custom thickness

- **WHEN** Divider is rendered with a thickness prop
- **THEN** the line uses the specified thickness in pixels
- **AND** thickness applies to height (horizontal) or width (vertical)

#### Scenario: Custom length

- **WHEN** Divider is rendered with a length prop
- **THEN** the length can be a number (pixels) or string (percentage)
- **AND** length applies to width (horizontal) or height (vertical)

### Requirement: Three-Tier Theme Integration

Divider SHALL use the three-tier theme token system for all styling.

#### Scenario: Theme token usage

- **WHEN** Divider is rendered
- **THEN** thickness defaults to primitive.spacing.hairline from theme
- **AND** color defaults to theme.component.divider.variant[colorScheme].color
- **AND** no hardcoded values are used in the component

#### Scenario: Light mode styling

- **WHEN** colorScheme is "light"
- **THEN** divider color uses light.border.primary semantic token
- **AND** the resolved color is #E5E7EB

#### Scenario: Dark mode styling

- **WHEN** colorScheme is "dark"
- **THEN** divider color uses dark.border.primary semantic token
- **AND** the theme automatically adapts to dark mode

#### Scenario: Custom color override

- **WHEN** color prop is provided
- **THEN** the custom color overrides the theme default
- **AND** the custom color is applied directly to backgroundColor

### Requirement: Style Merge Pattern

Divider SHALL support the standard style merge pattern for customization.

#### Scenario: Style prop merging

- **WHEN** Divider is rendered with a style prop
- **THEN** user styles are merged after base divider styles
- **AND** user styles take precedence over calculated styles

#### Scenario: ViewProps forwarding

- **WHEN** additional ViewProps are passed to Divider
- **THEN** props like testID, accessibilityLabel are forwarded to the View
- **AND** the children prop is explicitly excluded (Omit<ViewProps, "children">)

### Requirement: Props Interface

Divider SHALL expose a well-typed props interface extending ViewProps.

#### Scenario: DividerProps type

- **WHEN** DividerProps interface is defined
- **THEN** orientation is typed as "horizontal" | "vertical"
- **AND** thickness is typed as optional number
- **AND** color is typed as optional string
- **AND** length is typed as optional number | string
- **AND** style is typed as StyleProp<ViewStyle>

#### Scenario: Default prop values

- **WHEN** Divider is rendered without props
- **THEN** orientation defaults to "horizontal"
- **AND** thickness defaults to theme.component.divider.thickness (hairline)
- **AND** color defaults to theme-aware border color
- **AND** length defaults to "100%"

### Requirement: Testing Coverage

Divider SHALL have comprehensive test coverage for all props and behaviors.

#### Scenario: Rendering tests

- **WHEN** test suite runs
- **THEN** tests verify basic rendering
- **AND** tests verify horizontal orientation by default
- **AND** tests verify vertical orientation when specified

#### Scenario: Thickness tests

- **WHEN** test suite runs
- **THEN** tests verify default hairline thickness
- **AND** tests verify custom thickness for horizontal orientation
- **AND** tests verify custom thickness for vertical orientation

#### Scenario: Color tests

- **WHEN** test suite runs
- **THEN** tests verify default theme color in light mode
- **AND** tests verify custom color application

#### Scenario: Length tests

- **WHEN** test suite runs
- **THEN** tests verify default 100% length
- **AND** tests verify percentage length values
- **AND** tests verify numeric length values for both orientations

#### Scenario: Integration tests

- **WHEN** test suite runs
- **THEN** tests verify combining all props works correctly
- **AND** tests verify style merging with custom styles
- **AND** tests verify ViewProps forwarding (testID)

### Requirement: Documentation

Divider SHALL include comprehensive MDX documentation with usage examples.

#### Scenario: Documentation structure

- **WHEN** README.mdx is rendered
- **THEN** it includes a component description
- **AND** it includes basic usage example
- **AND** it includes orientation examples (horizontal, vertical)
- **AND** it includes custom colors examples
- **AND** it includes custom length examples

#### Scenario: Real-world examples

- **WHEN** README.mdx is rendered
- **THEN** it demonstrates dividers in Card sections
- **AND** it demonstrates list items with dividers
- **AND** it demonstrates vertical dividers in toolbar
- **AND** it demonstrates "OR" separator pattern with text

#### Scenario: Props documentation

- **WHEN** README.mdx is rendered
- **THEN** it includes a props table with all props
- **AND** each prop shows type, default value, and description
- **AND** code examples demonstrate common use cases
