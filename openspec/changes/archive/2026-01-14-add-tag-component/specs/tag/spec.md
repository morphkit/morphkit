## ADDED Requirements

### Requirement: Component Structure

Tag SHALL be a View-based component that displays pill-shaped labels with text content.

#### Scenario: Basic tag rendering

- **WHEN** Tag is rendered with children="Label"
- **THEN** the tag displays the text content inside a pill-shaped container
- **AND** the tag uses View as the base component
- **AND** accessibilityRole is "text" for non-dismissible tags

#### Scenario: Props interface

- **WHEN** Tag component is used
- **THEN** it accepts children (ReactNode), variant, size, dismissible, onDismiss, and style props
- **AND** it extends Omit<ViewProps, "children"> for native prop forwarding

### Requirement: Variant Support

Tag SHALL support 5 color variants for semantic categorization.

#### Scenario: Default variant

- **WHEN** variant="default" or variant is not specified
- **THEN** background uses theme.component.tag.variant[colorScheme].secondary.background
- **AND** text uses theme.component.tag.variant[colorScheme].secondary.text
- **AND** border uses theme.component.tag.variant[colorScheme].secondary.border

#### Scenario: Primary variant

- **WHEN** variant="primary"
- **THEN** background uses light.action.primary or dark.action.primary
- **AND** text uses light.text.inverse or dark.text.inverse
- **AND** border matches the background color

#### Scenario: Success variant

- **WHEN** variant="success"
- **THEN** background uses theme.component.tag.variant[colorScheme].success.background
- **AND** text uses light.status.success.text or dark.status.success.text
- **AND** border uses light.status.success.border or dark.status.success.border

#### Scenario: Warning variant

- **WHEN** variant="warning"
- **THEN** background uses theme.component.tag.variant[colorScheme].warning.background
- **AND** text uses light.status.warning.text or dark.status.warning.text
- **AND** border uses light.status.warning.border or dark.status.warning.border

#### Scenario: Error variant

- **WHEN** variant="error"
- **THEN** background uses theme.component.tag.variant[colorScheme].error.background
- **AND** text uses light.status.error.text or dark.status.error.text
- **AND** border uses light.status.error.border or dark.status.error.border

### Requirement: Size Variants

Tag SHALL support 3 size variants for different display contexts.

#### Scenario: Small size

- **WHEN** size="sm"
- **THEN** paddingHorizontal uses primitive.spacing[1.5]
- **AND** paddingVertical uses primitive.spacing[0.5]
- **AND** minHeight is 20 pixels
- **AND** fontSize uses primitive.fontSize.xs

#### Scenario: Medium size (default)

- **WHEN** size="md" or size is not specified
- **THEN** paddingHorizontal uses primitive.spacing[3]
- **AND** paddingVertical uses primitive.spacing[1.5]
- **AND** minHeight is 24 pixels
- **AND** fontSize uses primitive.fontSize.sm

#### Scenario: Large size

- **WHEN** size="lg"
- **THEN** paddingHorizontal uses primitive.spacing[2.5]
- **AND** paddingVertical uses primitive.spacing[1.5]
- **AND** minHeight is 32 pixels
- **AND** fontSize uses primitive.fontSize.md

### Requirement: Dismissible Functionality

Tag SHALL support optional dismiss button for removable tags.

#### Scenario: Non-dismissible tag (default)

- **WHEN** dismissible={false} or dismissible is not specified
- **THEN** no dismiss button is rendered
- **AND** the tag displays only the text content
- **AND** accessibilityRole is "text"

#### Scenario: Dismissible tag rendering

- **WHEN** dismissible={true}
- **THEN** a close icon (Ionicons "close") is rendered after the text
- **AND** the icon size matches the current size variant fontSize
- **AND** the icon color matches the variant text color

#### Scenario: Dismiss button interaction

- **WHEN** dismissible={true} and user presses the dismiss button
- **THEN** onDismiss callback is called
- **AND** the dismiss button has accessibilityRole="button"
- **AND** the dismiss button has accessibilityLabel="Dismiss"
- **AND** hitSlop uses theme.primitive.spacing[2] for enlarged touch target

### Requirement: Three-Tier Theme Integration

Tag SHALL use the three-tier token system for all styling.

#### Scenario: Theme token usage

- **WHEN** Tag is rendered
- **THEN** colors come from semantic tokens via theme.component.tag.variant
- **AND** spacing uses primitive.spacing values
- **AND** borderRadius uses primitive.borderRadius.md
- **AND** fontWeight uses primitive.fontWeight.semibold
- **AND** no hardcoded color or spacing values exist

#### Scenario: Light and dark mode support

- **WHEN** colorScheme changes between light and dark
- **THEN** tag automatically updates colors from theme.component.tag.variant[colorScheme]
- **AND** all variants respond to theme changes correctly

### Requirement: Typography Integration

Tag SHALL use the Typography component for all text rendering.

#### Scenario: Text rendering

- **WHEN** Tag renders text content
- **THEN** Typography component is used with variant="callout"
- **AND** fontSize is overridden with size-specific fontSize from theme
- **AND** fontWeight is applied from theme.component.tag.fontWeight
- **AND** color is applied from the current variant tokens

### Requirement: Accessibility

Tag SHALL meet WCAG AA accessibility standards.

#### Scenario: Non-dismissible tag accessibility

- **WHEN** Tag is rendered without dismissible prop
- **THEN** accessibilityRole is "text"
- **AND** content is announced to screen readers

#### Scenario: Dismissible tag accessibility

- **WHEN** Tag is rendered with dismissible={true}
- **THEN** dismiss button has accessibilityRole="button"
- **AND** dismiss button has accessibilityLabel="Dismiss"
- **AND** dismiss button is focusable by assistive technologies

#### Scenario: Touch target size

- **WHEN** dismiss button is rendered
- **THEN** hitSlop provides minimum 44x44 touch target
- **AND** touch area is enlarged using theme.primitive.spacing[2]

### Requirement: Style Merging

Tag SHALL support custom styles that merge with theme styles.

#### Scenario: Custom style override

- **WHEN** style prop is provided
- **THEN** custom styles are applied after theme styles
- **AND** custom styles have highest priority
- **AND** style merge follows pattern: [baseStyles, themeStyles, customStyle]

### Requirement: ViewProps Forwarding

Tag SHALL forward ViewProps to the underlying View component.

#### Scenario: Props forwarding

- **WHEN** testID or other ViewProps are passed
- **THEN** they are forwarded to the container View
- **AND** spread operator passes remaining props via ...props

### Requirement: Testing Coverage

Tag SHALL have comprehensive test coverage for all features.

#### Scenario: Basic rendering tests

- **WHEN** tests execute
- **THEN** basic rendering without crashing is verified
- **AND** children content rendering is tested
- **AND** ReactNode children (complex children) are tested

#### Scenario: Variant tests

- **WHEN** tests execute
- **THEN** all 5 variants (default, primary, success, warning, error) render correctly
- **AND** variant-specific styling is applied

#### Scenario: Size tests

- **WHEN** tests execute
- **THEN** all 3 sizes (sm, md, lg) render correctly
- **AND** size-specific styling is applied

#### Scenario: Dismissible tests

- **WHEN** tests execute
- **THEN** dismiss button renders when dismissible={true}
- **AND** dismiss button does not render when dismissible={false}
- **AND** onDismiss callback is called on button press
- **AND** dismiss button has correct accessibility label

#### Scenario: Style and props tests

- **WHEN** tests execute
- **THEN** custom styles are applied correctly
- **AND** ViewProps like testID are forwarded correctly

### Requirement: Documentation

Tag SHALL have comprehensive MDX documentation.

#### Scenario: Documentation content

- **WHEN** documentation is viewed
- **THEN** basic usage example is provided
- **AND** all 5 variants are demonstrated with semantic descriptions
- **AND** all 3 sizes are shown
- **AND** dismissible functionality is documented
- **AND** real-world examples are included (product cards, user profiles, status dashboards)
- **AND** interactive filter example is provided
- **AND** props table documents all available props
- **AND** usage code examples are included
