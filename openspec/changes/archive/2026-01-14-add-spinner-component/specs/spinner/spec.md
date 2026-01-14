# Spinner Component Specification

## ADDED Requirements

### Requirement: Component Structure

Spinner SHALL be a View-based component that renders an animated circular loading indicator using React Native Animated API.

#### Scenario: Default rendering

- **WHEN** Spinner is rendered without props
- **THEN** it displays a circular border with transparent top segment
- **AND** the animation loops continuously with 360-degree rotation
- **AND** uses medium (24px) size by default

#### Scenario: Container structure

- **WHEN** Spinner is rendered
- **THEN** outer View container centers the animated spinner
- **AND** Animated.View contains the circular border element

### Requirement: Size Presets

Spinner SHALL support three preset sizes and custom numeric sizing.

#### Scenario: Small size preset

- **WHEN** size="sm" is provided
- **THEN** spinner renders at 16px diameter
- **AND** stroke width is 2px

#### Scenario: Medium size preset

- **WHEN** size="md" is provided or size is omitted
- **THEN** spinner renders at 24px diameter
- **AND** stroke width is 3px

#### Scenario: Large size preset

- **WHEN** size="lg" is provided
- **THEN** spinner renders at 32px diameter
- **AND** stroke width is 4px

#### Scenario: Custom numeric size

- **WHEN** size is a number (e.g., size={40})
- **THEN** spinner renders at that pixel diameter
- **AND** stroke width defaults to 2px

### Requirement: Three-Tier Theme Integration

Spinner SHALL use the three-tier token system for all styling values.

#### Scenario: Theme token usage

- **WHEN** Spinner renders
- **THEN** size values come from theme.component.spinner.size
- **AND** stroke widths come from theme.component.spinner.strokeWidth
- **AND** animation duration comes from theme.component.spinner.duration (primitive.duration.slow = 1000ms)

#### Scenario: Color scheme awareness

- **WHEN** colorScheme is "light"
- **THEN** spinner color uses theme.component.spinner.variant.light.color (light.action.primary)

- **WHEN** colorScheme is "dark"
- **THEN** spinner color uses theme.component.spinner.variant.dark.color (dark.action.primary)

#### Scenario: Color override

- **WHEN** color prop is provided
- **THEN** the custom color overrides the theme color
- **AND** theme tokens for size and animation are still used

### Requirement: Animation Behavior

Spinner SHALL implement smooth continuous rotation animation.

#### Scenario: Rotation animation

- **WHEN** Spinner mounts
- **THEN** Animated.loop starts with timing animation
- **AND** rotation interpolates from 0deg to 360deg
- **AND** animation uses Easing.linear for constant speed
- **AND** useNativeDriver is true for performance

#### Scenario: Animation duration

- **WHEN** animation completes one rotation
- **THEN** duration is theme.component.spinner.duration (1000ms)
- **AND** animation loops infinitely

### Requirement: Accessibility

Spinner SHALL follow WCAG accessibility guidelines for loading indicators.

#### Scenario: Accessibility role

- **WHEN** Spinner renders
- **THEN** accessibilityRole is "progressbar"
- **AND** accessibilityLabel is "Loading"

#### Scenario: Screen reader announcement

- **WHEN** screen reader focuses on Spinner
- **THEN** it announces "Loading" to the user

### Requirement: Style Customization

Spinner SHALL support style merging for container customization.

#### Scenario: Custom container styles

- **WHEN** style prop is provided
- **THEN** custom styles merge with base container styles
- **AND** custom styles have higher priority

#### Scenario: ViewProps forwarding

- **WHEN** additional ViewProps are provided (e.g., testID)
- **THEN** they are forwarded to the outer View container

### Requirement: Testing Coverage

Spinner SHALL have comprehensive test coverage for all features.

#### Scenario: Render tests

- **WHEN** tests run
- **THEN** default rendering is verified
- **AND** all size presets (sm, md, lg) are tested
- **AND** custom numeric size is tested
- **AND** custom color is tested
- **AND** style merging is tested
- **AND** ViewProps forwarding is tested
- **AND** accessibility attributes are verified

### Requirement: Documentation

Spinner SHALL have MDX documentation with usage examples.

#### Scenario: Documentation content

- **WHEN** documentation is rendered
- **THEN** basic usage example is shown
- **AND** all size variations are demonstrated
- **AND** custom color examples are provided
- **AND** loading state composition example is included
- **AND** props table documents all props with types and defaults
