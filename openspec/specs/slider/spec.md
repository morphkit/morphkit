# slider Specification

## Purpose

The Slider component provides a range slider control for selecting numeric values with single or dual thumb support, enabling intuitive selection of values or ranges within a defined minimum and maximum.

## Requirements

### Requirement: Component Structure

Slider SHALL be implemented as a forwardRef React component accepting SliderProps interface.

#### Scenario: Basic rendering

- **WHEN** Slider is rendered with value and onChange props
- **THEN** component renders a track with active and inactive segments
- **AND** thumb(s) are positioned according to current value(s)

#### Scenario: Ref forwarding

- **WHEN** ref is passed to Slider
- **THEN** ref.current points to the underlying View element

#### Scenario: ViewProps extension

- **WHEN** standard ViewProps (testID, accessibilityLabel, etc.) are passed
- **THEN** props are forwarded to the container View

### Requirement: Single Value Mode

Slider SHALL support single value selection with one thumb.

#### Scenario: Single value rendering

- **WHEN** value prop is a number
- **THEN** single thumb is rendered at the corresponding position
- **AND** active track extends from track start to thumb position

#### Scenario: Single value change

- **WHEN** user drags anywhere on the track
- **THEN** onChange is called with the new numeric value
- **AND** thumb moves to the drag position

### Requirement: Range Value Mode

Slider SHALL support range selection with two thumbs when value is an array.

#### Scenario: Range value rendering

- **WHEN** value prop is [number, number] array
- **THEN** two thumbs are rendered at corresponding positions
- **AND** active track extends between the two thumb positions

#### Scenario: Range value change

- **WHEN** user drags on the track in range mode
- **THEN** the nearest thumb moves to the drag position
- **AND** onChange is called with updated [startValue, endValue] array

#### Scenario: Thumb proximity detection

- **WHEN** user starts drag equidistant between thumbs
- **THEN** the end thumb is selected by default
- **AND** only the selected thumb moves during drag

### Requirement: Value Constraints

Slider SHALL enforce min, max, and step constraints on values.

#### Scenario: Default constraints

- **WHEN** min, max, step props are not provided
- **THEN** min defaults to 0, max defaults to 100, step defaults to 1

#### Scenario: Value clamping to minimum

- **WHEN** calculated value is less than min
- **THEN** value is clamped to min

#### Scenario: Value clamping to maximum

- **WHEN** calculated value is greater than max
- **THEN** value is clamped to max

#### Scenario: Step snapping

- **WHEN** step is greater than 0
- **THEN** values are rounded to nearest step increment

#### Scenario: Continuous mode

- **WHEN** step is set to 0
- **THEN** values are not snapped to increments
- **AND** any value within min-max range is valid

### Requirement: Three-Tier Theme Integration

Slider SHALL use the three-tier token system for all visual styling.

#### Scenario: Theme token usage

- **WHEN** Slider is rendered
- **THEN** trackHeight uses theme.component.slider.trackHeight
- **AND** thumbSize uses theme.component.slider.thumbSize[size]
- **AND** thumbBorderWidth uses theme.component.slider.thumbBorderWidth

#### Scenario: Light mode colors

- **WHEN** colorScheme is light
- **THEN** active track uses light.action.primary
- **AND** inactive track uses light.border.primary
- **AND** thumb uses light.text.inverse with light.action.primary border

#### Scenario: Dark mode colors

- **WHEN** colorScheme is dark
- **THEN** active track uses dark.action.primary
- **AND** inactive track uses dark.border.primary
- **AND** thumb uses dark.text.inverse with dark.action.primary border

#### Scenario: Custom color override

- **WHEN** color prop is provided
- **THEN** active track uses the custom color instead of theme primary

### Requirement: Size Variants

Slider SHALL support three size variants controlling thumb dimensions.

#### Scenario: Small size

- **WHEN** size="sm" is set
- **THEN** thumbSize is 16px

#### Scenario: Medium size default

- **WHEN** size prop is not provided
- **THEN** size defaults to "md" with thumbSize of 20px

#### Scenario: Large size

- **WHEN** size="lg" is set
- **THEN** thumbSize is 24px

### Requirement: Value Display

Slider SHALL optionally display current value(s) above thumb(s).

#### Scenario: Value hidden by default

- **WHEN** showValue prop is not provided
- **THEN** no value text is displayed

#### Scenario: Single value display

- **WHEN** showValue={true} in single value mode
- **THEN** current value is displayed above the thumb
- **AND** Typography variant caption-1 is used

#### Scenario: Range value display

- **WHEN** showValue={true} in range mode
- **THEN** both start and end values are displayed above respective thumbs
- **AND** each uses Typography variant caption-1

### Requirement: Disabled State

Slider SHALL support a disabled state preventing user interaction.

#### Scenario: Disabled visual feedback

- **WHEN** disabled={true}
- **THEN** container opacity is reduced to theme.semantic.state.disabled.opacity

#### Scenario: Disabled interaction prevention

- **WHEN** disabled={true} and user attempts to drag
- **THEN** PanResponder does not respond to gestures
- **AND** onChange is not called

### Requirement: Gesture Handling

Slider SHALL use PanResponder for touch-based value selection.

#### Scenario: Touch initiation

- **WHEN** user touches the track
- **THEN** value updates immediately to touch position
- **AND** onChange is called with new value

#### Scenario: Drag interaction

- **WHEN** user drags along the track
- **THEN** value updates continuously during drag
- **AND** onChange is called for each position change

#### Scenario: Touch release

- **WHEN** user releases touch
- **THEN** onBlur callback is invoked if provided

### Requirement: Typography Integration

Slider SHALL use Typography component for all text rendering.

#### Scenario: Value text styling

- **WHEN** showValue is enabled
- **THEN** value text uses Typography with variant="caption-1"
- **AND** fontWeight is set to semibold from primitive tokens
- **AND** color uses theme.semantic.colors.text.primary

### Requirement: Style Merge Pattern

Slider SHALL follow the three-layer style merge pattern.

#### Scenario: Style precedence

- **WHEN** custom style prop is provided
- **THEN** styles are merged as [baseStyles, themeStyles, customStyle]
- **AND** custom styles have highest precedence

### Requirement: Testing Coverage

Slider SHALL have comprehensive test coverage for all features.

#### Scenario: Single value tests

- **WHEN** tests run for single value mode
- **THEN** rendering, custom min/max, custom step, and showValue are verified

#### Scenario: Range value tests

- **WHEN** tests run for range value mode
- **THEN** dual thumb rendering and range value display are verified

#### Scenario: Size variant tests

- **WHEN** tests run for sizes
- **THEN** sm, md (default), and lg sizes render correctly

#### Scenario: State tests

- **WHEN** tests run for states
- **THEN** disabled state and custom color application are verified

#### Scenario: Integration tests

- **WHEN** tests run for integration
- **THEN** ref forwarding, ViewProps forwarding, and style merging are verified

### Requirement: Documentation

Slider SHALL include comprehensive MDX documentation.

#### Scenario: Documentation structure

- **WHEN** README.mdx is rendered
- **THEN** Import, Usage sections with examples are present
- **AND** Props table documents all props with types and defaults
- **AND** Accessibility, Theme Support, and Best Practices sections are included

#### Scenario: Example coverage

- **WHEN** documentation examples are reviewed
- **THEN** basic, range, step, showValue, sizes, custom color, disabled, and continuous mode examples exist
