# switch Specification

## Purpose
The Switch component provides a toggle control for binary on/off states with animated transitions, offering an alternative to checkboxes for settings and preference controls.
## Requirements
### Requirement: Component Structure

Switch SHALL be a controlled component that manages binary on/off state through props.

#### Scenario: Controlled state rendering

- **WHEN** checked={false} is provided
- **THEN** switch renders in off position with off track color
- **AND** accessibilityState.checked is false

#### Scenario: Checked state rendering

- **WHEN** checked={true} is provided
- **THEN** switch renders in on position with on track color
- **AND** accessibilityState.checked is true

#### Scenario: Label rendering

- **WHEN** label prop is provided
- **THEN** label text displays next to switch track
- **AND** accessibilityLabel is set to label value

#### Scenario: Ref forwarding

- **WHEN** ref is passed to Switch
- **THEN** ref is forwarded to the underlying Pressable component
- **AND** ref.current references the View element

### Requirement: Three-Tier Theme Integration

Switch SHALL use the three-tier theme token system for all styling values.

#### Scenario: Size tokens applied

- **WHEN** size="md" (default) is used
- **THEN** trackWidth is 40, trackHeight is 24, thumbSize is 20, thumbPadding is 2
- **AND** values come from theme.component.switchComponent.size.md

#### Scenario: Small size tokens applied

- **WHEN** size="sm" is used
- **THEN** trackWidth is 32, trackHeight is 20, thumbSize is 16, thumbPadding is 2
- **AND** values come from theme.component.switchComponent.size.sm

#### Scenario: Large size tokens applied

- **WHEN** size="lg" is used
- **THEN** trackWidth is 48, trackHeight is 28, thumbSize is 24, thumbPadding is 2
- **AND** values come from theme.component.switchComponent.size.lg

#### Scenario: Light mode color tokens

- **WHEN** colorScheme is light and switch is on
- **THEN** track uses light.action.primary color
- **AND** thumb uses light.text.inverse color

#### Scenario: Dark mode color tokens

- **WHEN** colorScheme is dark and switch is on
- **THEN** track uses dark.action.primary color
- **AND** thumb uses dark.text.inverse color

#### Scenario: Off state color tokens

- **WHEN** switch is off (checked={false})
- **THEN** track uses semantic border.secondary color
- **AND** thumb uses semantic text.inverse color

#### Scenario: Custom color override

- **WHEN** color prop is provided and switch is checked
- **THEN** track uses provided color value instead of theme token
- **AND** thumb color remains from theme tokens

### Requirement: Accessibility

Switch SHALL meet WCAG AA accessibility standards with proper semantic roles and labels.

#### Scenario: Switch role assignment

- **WHEN** Switch is rendered
- **THEN** accessibilityRole is "switch"
- **AND** screen readers announce it as a switch control

#### Scenario: Accessibility label from label prop

- **WHEN** label="Enable Notifications" is provided
- **THEN** accessibilityLabel is "Enable Notifications"
- **AND** screen readers announce the label

#### Scenario: Accessibility label from name prop

- **WHEN** name="darkMode" is provided without label prop
- **THEN** accessibilityLabel falls back to "darkMode"
- **AND** screen readers can identify the switch purpose

#### Scenario: Label takes precedence over name

- **WHEN** both label="Dark Mode" and name="darkMode" are provided
- **THEN** accessibilityLabel is "Dark Mode"
- **AND** label prop takes precedence for accessibility

#### Scenario: Checked state announcement

- **WHEN** switch state changes
- **THEN** accessibilityState.checked reflects current checked value
- **AND** screen readers announce state change

#### Scenario: Minimum touch target

- **WHEN** Switch is rendered
- **THEN** container has minHeight of spacing[12] (48 points)
- **AND** touch target meets accessibility guidelines

### Requirement: Interactive Behavior

Switch SHALL respond to user interaction with state change callbacks and disabled state handling.

#### Scenario: Toggle from off to on

- **WHEN** user presses switch in off state (checked={false})
- **THEN** onChange is called with true
- **AND** parent component controls state update

#### Scenario: Toggle from on to off

- **WHEN** user presses switch in on state (checked={true})
- **THEN** onChange is called with false
- **AND** parent component controls state update

#### Scenario: Blur callback on press end

- **WHEN** user completes press interaction (pressOut)
- **THEN** onBlur callback is invoked if provided
- **AND** form integration can track focus state

#### Scenario: Disabled state blocks interaction

- **WHEN** disabled={true} and user presses switch
- **THEN** onChange is NOT called
- **AND** switch remains in current state

#### Scenario: Disabled visual feedback

- **WHEN** disabled={true}
- **THEN** opacity is set to semantic state disabled opacity
- **AND** track and thumb use disabled color tokens

### Requirement: Animation

Switch SHALL provide smooth animated transitions between states using native driver.

#### Scenario: Thumb animation on state change

- **WHEN** checked state changes from false to true
- **THEN** thumb animates from left position to right position
- **AND** animation uses Animated.timing with native driver

#### Scenario: Animation duration

- **WHEN** state change animation runs
- **THEN** duration is theme.primitive.duration.normal (200ms)
- **AND** animation appears smooth at 60fps

#### Scenario: Thumb position interpolation

- **WHEN** animation runs
- **THEN** thumb translateX interpolates from thumbPadding to (trackWidth - thumbSize - thumbPadding)
- **AND** thumb stays within track bounds

#### Scenario: Thumb shadow

- **WHEN** thumb renders
- **THEN** primitive.shadowPresets.sm is applied
- **AND** thumb has subtle elevation effect

### Requirement: Testing Coverage

Switch SHALL have comprehensive test coverage for all functionality.

#### Scenario: Unchecked state test

- **WHEN** running test for unchecked rendering
- **THEN** switch renders with accessibilityState.checked=false
- **AND** test verifies accessibility role is switch

#### Scenario: Checked state test

- **WHEN** running test for checked rendering
- **THEN** switch renders with accessibilityState.checked=true
- **AND** test verifies checked state

#### Scenario: Label rendering test

- **WHEN** running test with label prop
- **THEN** label text is found in rendered output
- **AND** test verifies label displays correctly

#### Scenario: onChange callback test

- **WHEN** running test for press interaction
- **THEN** fireEvent.press triggers onChange with toggled value
- **AND** test verifies callback receives correct boolean

#### Scenario: Disabled interaction test

- **WHEN** running test with disabled=true
- **THEN** fireEvent.press does not trigger onChange
- **AND** test verifies disabled blocks interaction

#### Scenario: Size variants test

- **WHEN** running tests for each size (sm, md, lg)
- **THEN** switch renders without errors for each size
- **AND** tests verify all size variants work

#### Scenario: Ref forwarding test

- **WHEN** running test with ref prop
- **THEN** ref.current is truthy after render
- **AND** test verifies ref forwarding works

#### Scenario: Custom style test

- **WHEN** running test with custom style prop
- **THEN** switch renders with custom styles applied
- **AND** test verifies style prop is accepted

#### Scenario: Accessibility label tests

- **WHEN** running tests for accessibility label
- **THEN** tests verify label prop sets accessibilityLabel
- **AND** tests verify name prop fallback behavior

### Requirement: Documentation

Switch SHALL have comprehensive MDX documentation with examples and API reference.

#### Scenario: Basic usage documentation

- **WHEN** viewing README.mdx
- **THEN** basic usage example shows controlled state pattern
- **AND** example includes label prop

#### Scenario: States documentation

- **WHEN** viewing states section
- **THEN** both off and on states are demonstrated
- **AND** visual examples render inline

#### Scenario: Sizes documentation

- **WHEN** viewing sizes section
- **THEN** all three sizes (sm, md, lg) are demonstrated
- **AND** each size shows visual difference

#### Scenario: Custom color documentation

- **WHEN** viewing custom color section
- **THEN** multiple color examples are shown
- **AND** documentation explains color prop usage

#### Scenario: Disabled state documentation

- **WHEN** viewing disabled section
- **THEN** both disabled off and disabled on states shown
- **AND** documentation explains disabled behavior

#### Scenario: Accessibility documentation

- **WHEN** viewing accessibility section
- **THEN** all accessibility features are documented
- **AND** screen reader behavior is explained

#### Scenario: Animation documentation

- **WHEN** viewing animation section
- **THEN** animation implementation is explained
- **AND** native driver usage is documented

#### Scenario: Props reference

- **WHEN** viewing props table
- **THEN** all props are documented with types and defaults
- **AND** descriptions explain each prop purpose

