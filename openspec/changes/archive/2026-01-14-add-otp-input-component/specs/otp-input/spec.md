# OTPInput Component Specification

Multi-field input for one-time passwords and verification codes with auto-advance, paste support, and auto-submit functionality.

## ADDED Requirements

### Requirement: Component Structure

OTPInput SHALL render a row of individual Input fields that collectively represent a verification code.

#### Scenario: Default field count

- **WHEN** OTPInput renders with default props
- **THEN** 6 Input fields are rendered in a horizontal row
- **AND** each field accepts exactly 1 character
- **AND** fields are separated by consistent gap spacing from theme tokens

#### Scenario: Custom field count

- **WHEN** length prop is set to 4
- **THEN** exactly 4 Input fields are rendered
- **AND** each field maintains single-character maxLength

#### Scenario: Ref forwarding

- **WHEN** ref prop is provided
- **THEN** ref is forwarded to the container View element
- **AND** ref.current is an instance of View

### Requirement: Controlled Input Pattern

OTPInput SHALL follow React's controlled component pattern with value and onChange props.

#### Scenario: Value distribution

- **WHEN** value="123456" is provided
- **THEN** field 1 displays "1"
- **AND** field 2 displays "2"
- **AND** field 3 displays "3"
- **AND** field 4 displays "4"
- **AND** field 5 displays "5"
- **AND** field 6 displays "6"

#### Scenario: Partial value

- **WHEN** value="123" is provided with length=6
- **THEN** fields 1-3 display "1", "2", "3" respectively
- **AND** fields 4-6 display empty strings

#### Scenario: Value change callback

- **WHEN** user types "1" in first field
- **THEN** onChange is called with "1"
- **AND** component reflects the new value on next render

#### Scenario: Value prop updates

- **WHEN** value prop changes from "123" to "456"
- **THEN** fields update to display "4", "5", "6"
- **AND** previous values are replaced

### Requirement: Size Variants

OTPInput SHALL support three size variants that control field dimensions.

#### Scenario: Small size

- **WHEN** size="sm" is set
- **THEN** each field width is 36 pixels
- **AND** field styling uses Input component's sm size tokens

#### Scenario: Medium size (default)

- **WHEN** size="md" is set or size prop is omitted
- **THEN** each field width is 44 pixels
- **AND** field styling uses Input component's md size tokens

#### Scenario: Large size

- **WHEN** size="lg" is set
- **THEN** each field width is 52 pixels
- **AND** field styling uses Input component's lg size tokens

### Requirement: Visual Variants

OTPInput SHALL support two visual variants inherited from the Input component.

#### Scenario: Outline variant (default)

- **WHEN** variant="outline" is set or variant prop is omitted
- **THEN** all fields render with outline Input variant styling
- **AND** fields have visible borders

#### Scenario: Filled variant

- **WHEN** variant="filled" is set
- **THEN** all fields render with filled Input variant styling
- **AND** fields have background fill without prominent borders

### Requirement: Input Type Validation

OTPInput SHALL validate input based on the type prop.

#### Scenario: Number type (default)

- **WHEN** type="number" is set or type prop is omitted
- **AND** user types a non-numeric character like "a"
- **THEN** the character is rejected
- **AND** onChange is called with empty string for that position

#### Scenario: Number type paste filtering

- **WHEN** type="number" is set
- **AND** user pastes "1a2b3c"
- **THEN** only numeric characters "123" are accepted
- **AND** onChange is called with filtered value

#### Scenario: Text type

- **WHEN** type="text" is set
- **AND** user types any character including letters
- **THEN** all characters are accepted
- **AND** onChange is called with the input value

### Requirement: Auto-Advance Behavior

OTPInput SHALL automatically advance focus to the next field after character entry.

#### Scenario: Forward navigation on input

- **WHEN** user enters a valid character in field N
- **AND** field N is not the last field
- **THEN** focus automatically moves to field N+1
- **AND** previous field retains its value

#### Scenario: No advance on last field

- **WHEN** user enters a character in the last field
- **THEN** focus remains on the last field
- **AND** if all fields are filled, keyboard is dismissed

### Requirement: Backspace Navigation

OTPInput SHALL navigate backwards when backspace is pressed on an empty field.

#### Scenario: Backspace on empty field

- **WHEN** field N is empty
- **AND** user presses backspace
- **AND** N > 1
- **THEN** focus moves to field N-1
- **AND** field N-1 is cleared
- **AND** onChange is called with updated value

#### Scenario: Backspace on first empty field

- **WHEN** first field is empty
- **AND** user presses backspace
- **THEN** focus remains on first field
- **AND** no value change occurs

### Requirement: Paste Handling

OTPInput SHALL distribute pasted content across fields.

#### Scenario: Full OTP paste

- **WHEN** user pastes "123456" into any field
- **AND** length is 6
- **THEN** all 6 fields are populated with respective digits
- **AND** onChange is called with "123456"
- **AND** onComplete is called with "123456"
- **AND** keyboard is dismissed

#### Scenario: Partial paste

- **WHEN** user pastes "123" into first field
- **AND** length is 6
- **THEN** fields 1-3 are populated
- **AND** focus moves to field 4
- **AND** onChange is called with "123"

#### Scenario: Truncated paste

- **WHEN** user pastes "123456789"
- **AND** length is 4
- **THEN** only first 4 characters "1234" are accepted
- **AND** onChange is called with "1234"

### Requirement: Auto-Submit on Completion

OTPInput SHALL trigger completion callback when all fields are filled.

#### Scenario: Sequential completion

- **WHEN** user fills the last remaining empty field
- **THEN** onComplete callback is called with full OTP string
- **AND** keyboard is dismissed via Keyboard.dismiss()

#### Scenario: Paste completion

- **WHEN** paste operation fills all fields
- **THEN** onComplete callback is called immediately
- **AND** keyboard is dismissed

#### Scenario: Completion without callback

- **WHEN** all fields are filled
- **AND** onComplete prop is not provided
- **THEN** keyboard is dismissed
- **AND** no error occurs

### Requirement: Error State

OTPInput SHALL display error state visual feedback.

#### Scenario: Error border color

- **WHEN** error={true} is set
- **THEN** all field borders use theme.semantic.colors.border.error color
- **AND** error styling takes precedence over focus and success states

### Requirement: Disabled State

OTPInput SHALL support disabled state that prevents interaction.

#### Scenario: Disabled fields

- **WHEN** disabled={true} is set
- **THEN** all Input fields have editable={false}
- **AND** no input is accepted
- **AND** visual styling indicates disabled state

### Requirement: Focus State Visual Feedback

OTPInput SHALL provide visual feedback for focused field.

#### Scenario: Focus border color

- **WHEN** a field receives focus
- **THEN** that field's border color changes to theme.semantic.colors.border.focus
- **AND** other fields maintain default border color

#### Scenario: Blur state

- **WHEN** focus leaves all fields
- **THEN** no field has focus styling
- **AND** focusedIndex is reset to -1

### Requirement: Success State Visual Feedback

OTPInput SHALL indicate when all fields are successfully filled.

#### Scenario: Success border color

- **WHEN** all fields contain values
- **AND** error is not set
- **THEN** all field borders use theme.component.otpInput.variant[colorScheme].success.border
- **AND** success styling only applies when error is false

### Requirement: Auto-Focus Behavior

OTPInput SHALL support automatic focus on mount.

#### Scenario: Auto-focus enabled (default)

- **WHEN** autoFocus={true} or autoFocus prop is omitted
- **THEN** first field receives focus on mount
- **AND** keyboard is displayed

#### Scenario: Auto-focus disabled

- **WHEN** autoFocus={false} is set
- **THEN** no field receives focus on mount
- **AND** user must manually tap to focus

### Requirement: Three-Tier Theme Integration

OTPInput SHALL use the three-tier theme token system for all styling.

#### Scenario: Gap spacing token

- **WHEN** OTPInput renders
- **THEN** gap between fields uses theme.component.otpInput.gap
- **AND** gap maps to primitive.spacing[2]

#### Scenario: Field width tokens

- **WHEN** size prop is set
- **THEN** field width uses theme.component.otpInput.fieldWidth[size]
- **AND** sm=36, md=44, lg=52 pixel values are applied

#### Scenario: Success border semantic token

- **WHEN** component is in success state
- **THEN** border color uses theme.component.otpInput.variant[colorScheme].success.border
- **AND** color adapts to light/dark color scheme

### Requirement: Typography Integration

OTPInput SHALL delegate text rendering to Input component which uses Typography.

#### Scenario: Text centering

- **WHEN** Input fields render
- **THEN** textAlign="center" is passed to each Input
- **AND** digit is horizontally centered within field

### Requirement: Accessibility

OTPInput SHALL meet WCAG AA accessibility standards.

#### Scenario: Container accessibility label

- **WHEN** accessibilityLabel prop is not provided
- **THEN** container has accessibilityLabel="One time password input"
- **AND** screen reader announces the component purpose

#### Scenario: Custom accessibility label

- **WHEN** accessibilityLabel="Enter verification code" is provided
- **THEN** container uses the custom label
- **AND** screen reader announces "Enter verification code"

#### Scenario: Individual field labels

- **WHEN** OTPInput renders with length=6
- **THEN** field 1 has accessibilityLabel="Digit 1 of 6"
- **AND** field 2 has accessibilityLabel="Digit 2 of 6"
- **AND** pattern continues for all fields

### Requirement: Testing Coverage

OTPInput SHALL have comprehensive test coverage.

#### Scenario: Render tests

- **WHEN** running test suite
- **THEN** tests verify correct number of fields for default and custom length
- **AND** tests verify value distribution across fields

#### Scenario: Interaction tests

- **WHEN** running test suite
- **THEN** tests verify onChange callback on input
- **AND** tests verify auto-advance behavior
- **AND** tests verify backspace navigation
- **AND** tests verify paste handling

#### Scenario: State tests

- **WHEN** running test suite
- **THEN** tests verify disabled state applies to all fields
- **AND** tests verify error prop affects styling
- **AND** tests verify onComplete callback when filled

#### Scenario: Size and variant tests

- **WHEN** running test suite
- **THEN** tests verify sm, md, lg sizes apply correct field widths
- **AND** tests verify outline and filled variants render correctly

#### Scenario: Accessibility tests

- **WHEN** running test suite
- **THEN** tests verify container accessibility label
- **AND** tests verify individual field accessibility labels
- **AND** tests verify ref forwarding

### Requirement: Documentation

OTPInput SHALL have comprehensive MDX documentation.

#### Scenario: Usage examples

- **WHEN** documentation is viewed
- **THEN** basic usage example is provided
- **AND** size variants are demonstrated
- **AND** visual variants are demonstrated
- **AND** error state is demonstrated
- **AND** custom length is demonstrated

#### Scenario: Props table

- **WHEN** documentation is viewed
- **THEN** all props are documented with types and defaults
- **AND** descriptions explain each prop's purpose

#### Scenario: Accessibility section

- **WHEN** documentation is viewed
- **THEN** accessibility features are documented
- **AND** WCAG compliance is noted

#### Scenario: Behavior section

- **WHEN** documentation is viewed
- **THEN** auto-advance behavior is explained
- **AND** backspace behavior is explained
- **AND** paste handling is explained
- **AND** auto-submit is explained
