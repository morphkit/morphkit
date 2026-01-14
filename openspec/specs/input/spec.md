# input Specification

## Purpose
The Input component provides a single-line text input field with label, error state, and prefix/suffix icon support for collecting user text input in forms and interfaces.
## Requirements
### Requirement: Component Structure

Input SHALL be a controlled text input component built on React Native TextInput with forwardRef support.

#### Scenario: Basic rendering

- **WHEN** Input is rendered with value and onChange props
- **THEN** a TextInput element is displayed
- **AND** the value is reflected in the input

#### Scenario: Ref forwarding

- **WHEN** a ref is passed to Input
- **THEN** the ref is forwarded to the underlying TextInput
- **AND** ref.current provides access to TextInput methods

#### Scenario: TextInputProps passthrough

- **WHEN** additional TextInputProps are provided (testID, maxLength, autoCapitalize, etc.)
- **THEN** props are forwarded to the underlying TextInput
- **AND** component behavior extends standard TextInput functionality

### Requirement: Three-Tier Theme Integration

Input SHALL use the three-tier theme system for all styling with no hardcoded values.

#### Scenario: Theme token usage

- **WHEN** Input is rendered
- **THEN** all colors come from theme.component.input.variant[colorScheme]
- **AND** all spacing comes from theme.component.input.size[size]
- **AND** all typography values come from primitive tokens

#### Scenario: Light mode styling

- **WHEN** colorScheme is light
- **THEN** background uses light.surface.primary for outline variant
- **AND** background uses light.surface.tertiary for filled variant
- **AND** text uses light.text.primary
- **AND** placeholder uses light.text.tertiary
- **AND** border uses light.border.primary

#### Scenario: Dark mode styling

- **WHEN** colorScheme is dark
- **THEN** background uses dark.surface.primary for outline variant
- **AND** background uses dark.surface.tertiary for filled variant
- **AND** text uses dark.text.primary
- **AND** placeholder uses dark.text.tertiary
- **AND** border uses dark.border.primary

### Requirement: Variant Support

Input SHALL support outline and filled visual variants with distinct styling.

#### Scenario: Outline variant (default)

- **WHEN** variant is outline or not specified
- **THEN** border is visible with borderWidth from theme.component.input.borderWidth.outline
- **AND** background is light.surface.primary (light) or dark.surface.primary (dark)

#### Scenario: Filled variant

- **WHEN** variant is filled
- **THEN** border is transparent (borderWidth is 0)
- **AND** background is light.surface.tertiary (light) or dark.surface.tertiary (dark)

### Requirement: Size Options

Input SHALL support sm, md, and lg sizes with consistent proportions.

#### Scenario: Small size

- **WHEN** size is sm
- **THEN** height is 36
- **AND** fontSize is primitive.fontSize.sm
- **AND** padding is primitive.spacing[2]
- **AND** borderRadius is primitive.borderRadius.lg

#### Scenario: Medium size (default)

- **WHEN** size is md or not specified
- **THEN** height is 44
- **AND** fontSize is primitive.fontSize.base
- **AND** padding is primitive.spacing[3]
- **AND** borderRadius is primitive.borderRadius.lg

#### Scenario: Large size

- **WHEN** size is lg
- **THEN** height is 52
- **AND** fontSize is primitive.fontSize.lg
- **AND** padding is primitive.spacing[4]
- **AND** borderRadius is primitive.borderRadius.lg

### Requirement: Label Support

Input SHALL support an optional label displayed above the input field.

#### Scenario: Label rendering

- **WHEN** label prop is provided
- **THEN** Typography component renders label text above input
- **AND** Typography variant is subhead
- **AND** label color is theme.component.input.variant[colorScheme].label.text
- **AND** marginBottom is theme.component.label.marginBottom

#### Scenario: Label accessibility

- **WHEN** label is provided
- **THEN** accessibilityLabel on TextInput is set to label value

### Requirement: Error State

Input SHALL display validation errors with visual feedback and error messages.

#### Scenario: Error message display

- **WHEN** error prop contains a string
- **THEN** Typography component renders error text below input
- **AND** Typography variant is footnote
- **AND** error text color is theme.component.input.variant[colorScheme].error.text
- **AND** marginTop is theme.component.input.errorText.marginTop

#### Scenario: Error border styling

- **WHEN** error prop is present
- **THEN** border color changes to theme.component.input.variant[colorScheme].error.border
- **AND** error border takes precedence over focus border

#### Scenario: Error accessibility announcement

- **WHEN** error message is displayed
- **THEN** Typography has accessibilityLiveRegion="polite"
- **AND** screen readers announce the error message

### Requirement: Focus State

Input SHALL provide visual feedback when focused.

#### Scenario: Focus border

- **WHEN** user focuses the input
- **THEN** border color changes to theme.component.input.variant[colorScheme].focus.border
- **AND** internal isFocused state is set to true

#### Scenario: Blur handling

- **WHEN** input loses focus
- **THEN** border color returns to variant default
- **AND** internal isFocused state is set to false
- **AND** onBlur callback is invoked if provided

### Requirement: Disabled State

Input SHALL support a disabled state that prevents interaction.

#### Scenario: Disabled behavior

- **WHEN** disabled is true
- **THEN** TextInput editable is set to false
- **AND** opacity is reduced to theme.component.input.variant[colorScheme].disabled.opacity

### Requirement: Input Type Support

Input SHALL support text, email, password, and number types with appropriate keyboard behavior.

#### Scenario: Text type (default)

- **WHEN** type is text or not specified
- **THEN** keyboardType is default
- **AND** secureTextEntry is false

#### Scenario: Email type

- **WHEN** type is email
- **THEN** keyboardType is email-address
- **AND** secureTextEntry is false

#### Scenario: Password type

- **WHEN** type is password
- **THEN** keyboardType is default
- **AND** secureTextEntry is true

#### Scenario: Number type

- **WHEN** type is number
- **THEN** keyboardType is numeric
- **AND** secureTextEntry is false

### Requirement: Icon Integration

Input SHALL support prefix and suffix icon slots.

#### Scenario: Prefix icon

- **WHEN** prefixIcon prop contains a ReactNode
- **THEN** icon is rendered before the TextInput
- **AND** icon container has justifyContent: center and alignItems: center

#### Scenario: Suffix icon

- **WHEN** suffixIcon prop contains a ReactNode
- **THEN** icon is rendered after the TextInput
- **AND** icon container has justifyContent: center and alignItems: center

#### Scenario: Icon spacing

- **WHEN** icons are present
- **THEN** gap between elements is theme.component.input.gap (primitive.spacing[2])

### Requirement: Typography Integration

Input SHALL use the Typography component for all text rendering.

#### Scenario: Label typography

- **WHEN** label is rendered
- **THEN** Typography component with variant="subhead" is used
- **AND** color is derived from theme tokens

#### Scenario: Error typography

- **WHEN** error message is rendered
- **THEN** Typography component with variant="footnote" is used
- **AND** color is theme.component.input.variant[colorScheme].error.text

### Requirement: Accessibility

Input SHALL meet WCAG AA accessibility standards.

#### Scenario: AccessibilityLabel from label

- **WHEN** label prop is provided
- **THEN** accessibilityLabel is set to label value

#### Scenario: AccessibilityLabel fallback to name

- **WHEN** label is not provided but name is
- **THEN** accessibilityLabel is set to name value

#### Scenario: Error announcement

- **WHEN** error message changes
- **THEN** accessibilityLiveRegion="polite" announces the change to screen readers

### Requirement: Style Merging

Input SHALL support custom style overrides following the merge pattern.

#### Scenario: Custom wrapper styles

- **WHEN** style prop is provided
- **THEN** styles are applied to the outermost View wrapper
- **AND** custom styles can override container layout (marginTop, marginBottom, etc.)

### Requirement: Testing Coverage

Input SHALL have comprehensive test coverage for all features.

#### Scenario: Render tests

- **WHEN** tests are executed
- **THEN** basic rendering with value is verified
- **AND** label rendering is verified
- **AND** placeholder rendering is verified
- **AND** error message rendering is verified

#### Scenario: Interaction tests

- **WHEN** tests are executed
- **THEN** onChange callback fires on text change
- **AND** onBlur callback fires on blur
- **AND** disabled state prevents editing

#### Scenario: Variant and size tests

- **WHEN** tests are executed
- **THEN** outline variant renders correctly
- **AND** filled variant renders correctly
- **AND** sm, md, lg sizes render correctly

#### Scenario: Type tests

- **WHEN** tests are executed
- **THEN** email type sets keyboardType to email-address
- **AND** number type sets keyboardType to numeric
- **AND** password type sets secureTextEntry to true

#### Scenario: Accessibility tests

- **WHEN** tests are executed
- **THEN** accessibilityLabel from label is verified
- **AND** accessibilityLabel fallback to name is verified

#### Scenario: Ref and props tests

- **WHEN** tests are executed
- **THEN** ref forwarding is verified
- **AND** TextInputProps passthrough is verified

### Requirement: Documentation

Input SHALL have comprehensive MDX documentation with usage examples.

#### Scenario: Documentation sections

- **WHEN** README.mdx is viewed
- **THEN** Import section shows correct import path
- **AND** Basic usage example is provided
- **AND** All input types are documented
- **AND** Variants section shows outline and filled
- **AND** Sizes section shows sm, md, lg
- **AND** Error state usage is documented
- **AND** Disabled state usage is documented
- **AND** Prefix/suffix icon usage is documented
- **AND** Combined features example is provided

#### Scenario: Props table

- **WHEN** README.mdx is viewed
- **THEN** all props are documented with types and defaults
- **AND** descriptions are clear and actionable

#### Scenario: Accessibility documentation

- **WHEN** README.mdx is viewed
- **THEN** accessibility best practices are documented
- **AND** screen reader behavior is explained

#### Scenario: Theme support documentation

- **WHEN** README.mdx is viewed
- **THEN** light/dark mode behavior is documented
- **AND** variant-specific colors are explained

