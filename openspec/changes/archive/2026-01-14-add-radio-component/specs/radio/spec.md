# Radio Component Specification

Single-selection radio button control with group management for choosing one option from a set.

## ADDED Requirements

### Requirement: Compound Component Structure

Radio SHALL be implemented as a compound component with RadioGroup and RadioButton.

#### Scenario: RadioGroup provides context

- **WHEN** RadioButton is rendered inside RadioGroup
- **THEN** RadioButton accesses value and onChange from RadioContext
- **AND** selection state is derived from context value matching button value

#### Scenario: RadioButton used outside RadioGroup throws error

- **WHEN** RadioButton is rendered without RadioGroup parent
- **THEN** an error is thrown with message "RadioButton must be used within RadioGroup"

### Requirement: Size Variants

RadioButton SHALL support three size options for the radio circle.

#### Scenario: Small size (sm)

- **WHEN** size="sm" is provided
- **THEN** radio circle renders with 16px diameter
- **AND** inner dot renders at half the circle size (8px)

#### Scenario: Medium size (md)

- **WHEN** size="md" is provided or no size is specified
- **THEN** radio circle renders with 20px diameter
- **AND** inner dot renders at half the circle size (10px)

#### Scenario: Large size (lg)

- **WHEN** size="lg" is provided
- **THEN** radio circle renders with 24px diameter
- **AND** inner dot renders at half the circle size (12px)

### Requirement: Selection State Management

RadioGroup SHALL manage single selection state through controlled value/onChange pattern.

#### Scenario: Controlled selection

- **WHEN** value prop matches a RadioButton value
- **THEN** that RadioButton displays selected visual state
- **AND** other RadioButtons display unselected state

#### Scenario: Selection change

- **WHEN** user presses an unselected RadioButton
- **THEN** onChange callback is called with the button's value
- **AND** visual selection indicator moves to pressed button

### Requirement: Three-Tier Theme Integration

Radio SHALL use the three-tier theme token system for all styling.

#### Scenario: Checked state colors

- **WHEN** RadioButton is selected
- **THEN** border color uses theme.component.radio.variant[colorScheme].checked.border
- **AND** inner dot uses theme.component.radio.variant[colorScheme].checked.dot
- **AND** colors are derived from semantic action.primary tokens

#### Scenario: Unchecked state colors

- **WHEN** RadioButton is not selected
- **THEN** border color uses theme.component.radio.variant[colorScheme].unchecked.border
- **AND** inner dot is transparent
- **AND** border uses semantic border.secondary token

#### Scenario: Disabled state colors

- **WHEN** RadioButton is disabled
- **THEN** opacity is reduced using theme.semantic.state.disabled.opacity
- **AND** border uses theme.component.radio.variant[colorScheme].disabled.border
- **AND** dot uses theme.component.radio.variant[colorScheme].disabled.dot

#### Scenario: Dark mode support

- **WHEN** colorScheme is dark
- **THEN** all variant colors use dark mode tokens
- **AND** visual appearance adapts appropriately for dark backgrounds

### Requirement: Disabled State Handling

Radio SHALL support both group-level and individual disabled states.

#### Scenario: Group disabled

- **WHEN** RadioGroup has disabled={true}
- **THEN** all RadioButtons within are disabled
- **AND** press events do not trigger onChange
- **AND** all buttons show disabled visual styling

#### Scenario: Individual disabled

- **WHEN** RadioButton has disabled={true}
- **THEN** only that button is disabled
- **AND** press events on that button do not trigger onChange
- **AND** only that button shows disabled visual styling

#### Scenario: Disabled precedence

- **WHEN** RadioGroup is disabled and RadioButton is not explicitly disabled
- **THEN** RadioButton is effectively disabled via context

### Requirement: Accessibility Compliance

Radio SHALL meet WCAG AA accessibility standards.

#### Scenario: RadioGroup role

- **WHEN** RadioGroup is rendered
- **THEN** accessibilityRole is set to "radiogroup"

#### Scenario: RadioButton role

- **WHEN** RadioButton is rendered
- **THEN** accessibilityRole is set to "radio"

#### Scenario: Selection state announcement

- **WHEN** RadioButton is selected
- **THEN** accessibilityState.checked is true
- **AND** screen readers announce checked state

#### Scenario: Disabled state announcement

- **WHEN** RadioButton is disabled
- **THEN** accessibilityState.disabled is true
- **AND** screen readers announce disabled state

#### Scenario: Minimum touch target

- **WHEN** RadioButton is rendered
- **THEN** minimum touch target is 44x44 points
- **AND** minHeight and minWidth use theme.primitive.spacing[12] (48px)

### Requirement: onBlur Event Handling

Radio SHALL support blur events at both group and button levels.

#### Scenario: Group onBlur

- **WHEN** RadioGroup has onBlur prop and press ends on any RadioButton
- **THEN** group onBlur callback is invoked

#### Scenario: Button onBlur

- **WHEN** RadioButton has onBlur prop and press ends
- **THEN** button onBlur callback is invoked
- **AND** group onBlur is also invoked if present

### Requirement: Ref Forwarding

RadioButton SHALL forward refs to the underlying Pressable component.

#### Scenario: Ref access

- **WHEN** ref is passed to RadioButton
- **THEN** ref.current points to the View element
- **AND** ref can be used for programmatic focus or measurement

### Requirement: Style Merging

Radio components SHALL support style overrides following the standard merge pattern.

#### Scenario: RadioGroup style merge

- **WHEN** style prop is passed to RadioGroup
- **THEN** custom styles are applied to the group container
- **AND** accessibilityRole remains "radiogroup"

#### Scenario: RadioButton style merge

- **WHEN** style prop is passed to RadioButton
- **THEN** styles merge as [baseStyles, themeStyles, userStyles]
- **AND** user styles have highest priority

### Requirement: Children Content

RadioButton SHALL accept optional children for label content.

#### Scenario: With children

- **WHEN** children are provided to RadioButton
- **THEN** children render adjacent to radio circle
- **AND** gap between circle and children uses theme.primitive.spacing[2]

#### Scenario: Without children

- **WHEN** no children are provided
- **THEN** RadioButton renders only the radio circle
- **AND** accessibilityLabel should be provided for screen readers

### Requirement: Testing Coverage

Radio SHALL have comprehensive test coverage for all functionality.

#### Scenario: Rendering tests

- **WHEN** test suite runs
- **THEN** RadioGroup rendering with children is verified
- **AND** RadioButton rendering with and without children is verified

#### Scenario: Selection tests

- **WHEN** test suite runs
- **THEN** selected state visual indication is verified
- **AND** unselected state is verified
- **AND** onChange callback invocation is verified

#### Scenario: Disabled tests

- **WHEN** test suite runs
- **THEN** group-level disabled is verified
- **AND** individual button disabled is verified
- **AND** disabled buttons do not trigger onChange

#### Scenario: Size variant tests

- **WHEN** test suite runs
- **THEN** all three sizes (sm, md, lg) render correctly

#### Scenario: Accessibility tests

- **WHEN** test suite runs
- **THEN** accessibilityRole values are verified
- **AND** accessibilityState.checked is verified
- **AND** accessibilityState.disabled is verified

#### Scenario: Ref forwarding tests

- **WHEN** test suite runs
- **THEN** ref.current is verified to be truthy

#### Scenario: Context error tests

- **WHEN** test suite runs
- **THEN** error is thrown when RadioButton used outside RadioGroup

### Requirement: Documentation

Radio SHALL have comprehensive MDX documentation.

#### Scenario: Usage examples

- **WHEN** documentation is viewed
- **THEN** basic usage example shows RadioGroup with RadioButtons
- **AND** size variants are demonstrated
- **AND** disabled states are demonstrated
- **AND** use cases show real-world patterns

#### Scenario: Props documentation

- **WHEN** documentation is viewed
- **THEN** RadioGroup props are documented (value, onChange, onBlur, disabled, style)
- **AND** RadioButton props are documented (value, children, disabled, size, style)

#### Scenario: Accessibility documentation

- **WHEN** documentation is viewed
- **THEN** ARIA roles are documented
- **AND** accessibilityState usage is explained
- **AND** accessibilityLabel for icon-only usage is mentioned

#### Scenario: Best practices

- **WHEN** documentation is viewed
- **THEN** single selection use case is explained
- **AND** comparison with Checkbox for multiple selection is noted
