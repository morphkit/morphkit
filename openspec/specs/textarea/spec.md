# textarea Specification

## Purpose

The Textarea component provides a multi-line text input field with auto-resize capability and character count display for collecting longer text input in forms such as comments, descriptions, or messages.

## Requirements

### Requirement: Component Structure

Textarea SHALL be implemented as a controlled multi-line text input component with ref forwarding.

#### Scenario: Basic rendering

- **WHEN** Textarea is rendered with value and onChange props
- **THEN** a TextInput with multiline={true} is displayed
- **AND** the value is shown in the input field
- **AND** the component renders without errors

#### Scenario: Ref forwarding

- **WHEN** a ref is passed to Textarea
- **THEN** the ref is forwarded to the underlying TextInput element
- **AND** ref.current provides access to TextInput methods

#### Scenario: Props interface

- **WHEN** Textarea is used in TypeScript
- **THEN** the TextareaProps interface extends TextInputProps (omitting multiline, numberOfLines, style, onChange)
- **AND** required props are: value (string), onChange ((text: string) => void)
- **AND** optional props include: onBlur, name, label, placeholder, error, disabled, rows, maxLength, showCount, autoResize, size, style

### Requirement: Three-Tier Theme Integration

Textarea SHALL use the three-tier theme system for all styling values.

#### Scenario: Size tokens

- **WHEN** size prop is set to "sm", "md", or "lg"
- **THEN** fontSize, padding, borderRadius, and lineHeight are retrieved from theme.component.textarea.size[size]
- **AND** sm uses fontSize.sm, spacing[2], borderRadius.md, lineHeight.relaxed
- **AND** md uses fontSize.base, spacing[3], borderRadius.md, lineHeight.relaxed
- **AND** lg uses fontSize.lg, spacing[4], borderRadius.md, lineHeight.relaxed

#### Scenario: Color tokens by color scheme

- **WHEN** Textarea is rendered in light or dark mode
- **THEN** colors are retrieved from theme.component.textarea.variant[colorScheme]
- **AND** default state uses surface.primary background, text.primary text, text.tertiary placeholder, border.primary border
- **AND** focus state uses border.focus for border color
- **AND** error state uses border.error for border and status.error.main for error text
- **AND** disabled state uses surface.secondary background, text.disabled text, and opacity.disabled

#### Scenario: Static tokens

- **WHEN** Textarea is rendered
- **THEN** borderWidth is set to 1 from theme.component.textarea.borderWidth
- **AND** footer gap uses theme.component.textarea.footer.gap
- **AND** character count uses theme.component.textarea.characterCount.fontSize and marginLeft
- **AND** error text uses theme.component.textarea.errorText.fontSize

### Requirement: Sizes

Textarea SHALL support three size variants that affect visual appearance.

#### Scenario: Small size (sm)

- **WHEN** size="sm" is set
- **THEN** fontSize is primitive.fontSize.sm
- **AND** padding is primitive.spacing[2]
- **AND** borderRadius is primitive.borderRadius.md
- **AND** lineHeight is primitive.lineHeight.relaxed

#### Scenario: Medium size (md) default

- **WHEN** size prop is not provided or size="md"
- **THEN** fontSize is primitive.fontSize.base
- **AND** padding is primitive.spacing[3]
- **AND** borderRadius is primitive.borderRadius.md
- **AND** lineHeight is primitive.lineHeight.relaxed

#### Scenario: Large size (lg)

- **WHEN** size="lg" is set
- **THEN** fontSize is primitive.fontSize.lg
- **AND** padding is primitive.spacing[4]
- **AND** borderRadius is primitive.borderRadius.md
- **AND** lineHeight is primitive.lineHeight.relaxed

### Requirement: Auto-Resize Feature

Textarea SHALL support automatic height adjustment as content grows.

#### Scenario: Auto-resize disabled (default)

- **WHEN** autoResize is false or not provided
- **THEN** textarea height is fixed based on rows \* lineHeight + padding
- **AND** content scrolls within the fixed height

#### Scenario: Auto-resize enabled

- **WHEN** autoResize={true} is set
- **THEN** textarea expands vertically as content grows
- **AND** minHeight is set to initial height based on rows
- **AND** onContentSizeChange handler updates height state
- **AND** new height equals contentSize.height + padding \* 2

### Requirement: Character Count Display

Textarea SHALL support displaying current character count with optional maximum.

#### Scenario: Character count hidden (default)

- **WHEN** showCount is false or not provided
- **THEN** no character count is displayed below the textarea

#### Scenario: Character count without maxLength

- **WHEN** showCount={true} and maxLength is not set
- **THEN** character count displays as "{characterCount}" (e.g., "5")
- **AND** count text uses theme.component.textarea.variant[colorScheme].count.text color

#### Scenario: Character count with maxLength

- **WHEN** showCount={true} and maxLength is set
- **THEN** character count displays as "{characterCount} / {maxLength}" (e.g., "5 / 100")
- **AND** maxLength is enforced on the TextInput

### Requirement: Rows Configuration

Textarea SHALL support configurable initial height via rows prop.

#### Scenario: Default rows

- **WHEN** rows prop is not provided
- **THEN** textarea displays with 4 visible rows by default

#### Scenario: Custom rows

- **WHEN** rows={N} is provided
- **THEN** initial height is calculated as rows _ lineHeight + padding _ 2
- **AND** lineHeight is sizeTokens.fontSize \* sizeTokens.lineHeight

### Requirement: Label Display

Textarea SHALL support an optional label displayed above the input.

#### Scenario: No label

- **WHEN** label prop is not provided
- **THEN** no label text is rendered above the textarea

#### Scenario: With label

- **WHEN** label="Description" is provided
- **THEN** label text is rendered above the textarea
- **AND** label uses theme.component.label.fontSize.md
- **AND** label uses theme.component.label.fontWeight
- **AND** label has marginBottom from theme.component.label.marginBottom
- **AND** label color is theme.component.textarea.variant[colorScheme].label.text

### Requirement: Error State

Textarea SHALL display validation errors below the input.

#### Scenario: No error

- **WHEN** error prop is not provided
- **THEN** no error message is displayed
- **AND** border uses default or focus border color

#### Scenario: With error message

- **WHEN** error="Description is required" is provided
- **THEN** error message is displayed in footer
- **AND** border color changes to theme.component.textarea.variant[colorScheme].error.border
- **AND** error text color is theme.component.textarea.variant[colorScheme].error.text
- **AND** error text has accessibilityLiveRegion="polite" for screen reader announcements

### Requirement: Disabled State

Textarea SHALL support a disabled state that prevents interaction.

#### Scenario: Enabled (default)

- **WHEN** disabled is false or not provided
- **THEN** TextInput editable is true
- **AND** container opacity is 1

#### Scenario: Disabled

- **WHEN** disabled={true} is set
- **THEN** TextInput editable is false
- **AND** container opacity is theme.component.textarea.variant[colorScheme].disabled.opacity
- **AND** user cannot modify the content

### Requirement: Focus State

Textarea SHALL provide visual feedback when focused.

#### Scenario: Focus acquired

- **WHEN** user focuses the textarea
- **THEN** isFocused state becomes true
- **AND** border color changes to theme.component.textarea.variant[colorScheme].focus.border

#### Scenario: Focus lost

- **WHEN** user blurs the textarea
- **THEN** isFocused state becomes false
- **AND** onBlur callback is invoked if provided
- **AND** border color returns to default

### Requirement: Accessibility

Textarea SHALL follow WCAG AA accessibility guidelines.

#### Scenario: Accessibility label from label prop

- **WHEN** label="Bio" is provided
- **THEN** TextInput accessibilityLabel is "Bio"

#### Scenario: Accessibility label from name prop

- **WHEN** label is not provided and name="description" is set
- **THEN** TextInput accessibilityLabel is "description"

#### Scenario: Accessibility label priority

- **WHEN** both label="Bio" and name="description" are provided
- **THEN** TextInput accessibilityLabel is "Bio" (label takes precedence)

#### Scenario: Error announcements

- **WHEN** error message is displayed
- **THEN** error Text has accessibilityLiveRegion="polite"
- **AND** screen readers announce the error

### Requirement: Style Merging

Textarea SHALL support custom style overrides via style prop.

#### Scenario: No custom styles

- **WHEN** style prop is not provided
- **THEN** component renders with default theme-based styles

#### Scenario: Custom styles applied

- **WHEN** style={{ marginTop: 20 }} is provided
- **THEN** custom styles are applied to the wrapper View
- **AND** custom styles do not override internal component styles

### Requirement: Event Handling

Textarea SHALL handle user interactions via callback props.

#### Scenario: Text change

- **WHEN** user types in the textarea
- **THEN** onChange callback is called with the new text value

#### Scenario: Blur event

- **WHEN** user blurs the textarea
- **THEN** onBlur callback is called if provided
- **AND** internal focus state is updated

#### Scenario: TextInput props forwarding

- **WHEN** additional TextInputProps are passed (e.g., testID, autoCapitalize)
- **THEN** those props are forwarded to the underlying TextInput

### Requirement: Testing Coverage

Textarea SHALL have comprehensive test coverage for all features.

#### Scenario: Basic rendering tests

- **WHEN** test suite runs
- **THEN** tests verify textarea renders with value
- **AND** tests verify onChange is called on text change
- **AND** tests verify onBlur is called on blur

#### Scenario: Ref forwarding tests

- **WHEN** test suite runs
- **THEN** tests verify ref is forwarded to TextInput
- **AND** ref.current is truthy

#### Scenario: Accessibility tests

- **WHEN** test suite runs
- **THEN** tests verify accessibilityLabel from label prop
- **AND** tests verify accessibilityLabel from name prop
- **AND** tests verify label takes precedence over name

#### Scenario: Feature tests

- **WHEN** test suite runs
- **THEN** tests verify label rendering
- **AND** tests verify placeholder rendering
- **AND** tests verify error message rendering
- **AND** tests verify disabled state (editable=false)
- **AND** tests verify character count without maxLength
- **AND** tests verify character count with maxLength
- **AND** tests verify maxLength enforcement
- **AND** tests verify custom rows
- **AND** tests verify autoResize prop
- **AND** tests verify all size variants (sm, md, lg)
- **AND** tests verify custom style application
- **AND** tests verify TextInputProps forwarding
- **AND** tests verify multiline is always true

### Requirement: Documentation

Textarea SHALL have comprehensive MDX documentation with usage examples.

#### Scenario: Documentation structure

- **WHEN** README.mdx is loaded
- **THEN** it contains component title and description
- **AND** it shows import statement
- **AND** it includes usage sections: Basic, Character Count, Auto Resize, Rows, Sizes, Error State, Disabled State, Combined Features

#### Scenario: Props documentation

- **WHEN** Props section is viewed
- **THEN** all props are documented with type, default, and description
- **AND** props include: value, onChange, label, placeholder, error, disabled, rows, maxLength, showCount, autoResize, size, style

#### Scenario: Accessibility documentation

- **WHEN** Accessibility section is viewed
- **THEN** it documents accessibilityLabel behavior
- **AND** it documents accessibilityLiveRegion for errors
- **AND** it mentions WCAG AA compliance

#### Scenario: Theme documentation

- **WHEN** Theme Support section is viewed
- **THEN** it documents light and dark mode colors
- **AND** it documents focus and error state colors
