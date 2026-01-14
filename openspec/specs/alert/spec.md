# alert Specification

## Purpose
The Alert component displays inline notifications with semantic variants (info, success, warning, error) to communicate important information, status updates, or warnings to users with optional dismissal functionality.
## Requirements
### Requirement: Component Structure

Alert SHALL be implemented as a View-based component with icon, content area, and optional dismiss button.

#### Scenario: Basic rendering

- **WHEN** Alert is rendered with a title prop
- **THEN** component displays as a horizontal flex container
- **AND** includes icon container, content area with title, and optional dismiss button
- **AND** container has border width of 1

#### Scenario: Description rendering

- **WHEN** description prop is provided
- **THEN** description text appears below the title
- **AND** uses footnote Typography variant
- **AND** matches variant text color

#### Scenario: Description omitted

- **WHEN** description prop is not provided
- **THEN** only title is rendered in content area
- **AND** no empty space is reserved for description

### Requirement: Variant Styling

Alert SHALL support 4 semantic variants with distinct color schemes for both light and dark themes.

#### Scenario: Info variant

- **WHEN** variant="info" or no variant specified
- **THEN** background uses light.status.info.surface or dark.status.info.surface
- **AND** border uses light.status.info.border or dark.status.info.border
- **AND** text uses light.status.info.text or dark.status.info.text
- **AND** icon displays information-circle from Ionicons

#### Scenario: Success variant

- **WHEN** variant="success"
- **THEN** background uses light.status.success.surface or dark.status.success.surface
- **AND** border uses light.status.success.border or dark.status.success.border
- **AND** icon displays checkmark-circle from Ionicons

#### Scenario: Warning variant

- **WHEN** variant="warning"
- **THEN** background uses light.status.warning.surface or dark.status.warning.surface
- **AND** border uses light.status.warning.border or dark.status.warning.border
- **AND** icon displays warning from Ionicons

#### Scenario: Error variant

- **WHEN** variant="error"
- **THEN** background uses light.status.error.surface or dark.status.error.surface
- **AND** border uses light.status.error.border or dark.status.error.border
- **AND** icon displays close-circle from Ionicons

### Requirement: Three-Tier Theme Integration

Alert SHALL use the three-tier token system exclusively for all styling values.

#### Scenario: Primitive token usage

- **WHEN** Alert is rendered
- **THEN** padding uses primitive.spacing[4]
- **AND** borderRadius uses primitive.borderRadius.md
- **AND** gap uses primitive.spacing[2]
- **AND** contentGap uses primitive.spacing[1]

#### Scenario: Semantic token usage

- **WHEN** Alert variant colors are applied
- **THEN** colors are sourced from semantic light/dark status tokens
- **AND** background, border, text, and icon colors are variant-specific

#### Scenario: Component token usage

- **WHEN** Alert is styled
- **THEN** theme.component.alert provides iconSize (20), dismissHitSlop, and all variant colors
- **AND** component tokens are accessed via useTheme() hook

### Requirement: Icon Customization

Alert SHALL display variant-appropriate default icons with option for custom override.

#### Scenario: Default icon selection

- **WHEN** icon prop is not provided
- **THEN** icon is automatically selected based on variant
- **AND** info shows information-circle
- **AND** success shows checkmark-circle
- **AND** warning shows warning
- **AND** error shows close-circle

#### Scenario: Custom icon override

- **WHEN** icon prop is provided with ReactNode
- **THEN** custom icon replaces default variant icon
- **AND** icon container alignment is preserved

### Requirement: Dismiss Button Behavior

Alert SHALL support optional dismiss functionality with accessible button.

#### Scenario: Dismissible enabled

- **WHEN** dismissible={true}
- **THEN** close button appears on right side of alert
- **AND** button uses Ionicons close icon
- **AND** icon color matches variant text color

#### Scenario: Dismiss interaction

- **WHEN** user presses dismiss button
- **THEN** onDismiss callback is invoked
- **AND** button has hitSlop from theme.component.alert.dismissHitSlop

#### Scenario: Dismissible disabled

- **WHEN** dismissible={false} or not provided
- **THEN** no dismiss button is rendered
- **AND** full width is available for content

### Requirement: Typography Integration

Alert SHALL use Typography component for all text rendering.

#### Scenario: Title typography

- **WHEN** title is rendered
- **THEN** Typography component with variant="body" is used
- **AND** fontWeight 600 is applied
- **AND** color matches variantColors.text

#### Scenario: Description typography

- **WHEN** description is rendered
- **THEN** Typography component with variant="footnote" is used
- **AND** color matches variantColors.text

### Requirement: Style Merge Pattern

Alert SHALL follow standard style merge order allowing user customization.

#### Scenario: Style application order

- **WHEN** Alert is rendered with custom style prop
- **THEN** baseStyles are applied first
- **AND** theme-derived dynamic styles are applied second
- **AND** user style prop is applied last with highest priority

#### Scenario: Custom style override

- **WHEN** style prop contains backgroundColor
- **THEN** user backgroundColor overrides theme variant backgroundColor

### Requirement: Accessibility

Alert SHALL implement WCAG AA compliant accessibility attributes.

#### Scenario: Alert role

- **WHEN** Alert is rendered
- **THEN** container has accessibilityRole="alert"
- **AND** screen readers announce content as alert

#### Scenario: Dismiss button accessibility

- **WHEN** dismiss button is rendered
- **THEN** button has accessibilityRole="button"
- **AND** button has accessibilityLabel="Dismiss alert"

### Requirement: ViewProps Forwarding

Alert SHALL forward standard React Native ViewProps to container.

#### Scenario: TestID forwarding

- **WHEN** testID prop is provided
- **THEN** testID is applied to container View
- **AND** component is queryable in tests

#### Scenario: Other ViewProps

- **WHEN** additional ViewProps are provided
- **THEN** props are spread onto container View
- **AND** children prop is excluded via Omit type

### Requirement: Testing Coverage

Alert SHALL have comprehensive test coverage for all features.

#### Scenario: Basic rendering tests

- **WHEN** test suite runs
- **THEN** tests verify component renders without crashing
- **AND** tests verify title renders correctly
- **AND** tests verify description renders when provided

#### Scenario: Variant tests

- **WHEN** test suite runs
- **THEN** tests verify all 4 variants render correctly
- **AND** tests verify default icons render for each variant

#### Scenario: Interaction tests

- **WHEN** test suite runs
- **THEN** tests verify dismiss button renders when dismissible
- **AND** tests verify onDismiss callback is called on press
- **AND** tests verify custom icon renders when provided

#### Scenario: Style and prop tests

- **WHEN** test suite runs
- **THEN** tests verify custom styles are applied
- **AND** tests verify ViewProps are forwarded
- **AND** tests verify accessibility role is set

