# Label Component Specification

Form label component for describing input fields with optional required indicator and error states. Provides consistent typography, spacing, and semantic HTML association on web for accessible forms.

## ADDED Requirements

### Requirement: Component Structure

Label SHALL be a text-based component that wraps Typography for consistent text rendering.

#### Scenario: Basic label rendering

- **WHEN** Label is rendered with children
- **THEN** the children text is displayed using Typography component
- **AND** variant is set to "callout" by default

#### Scenario: Label with required indicator

- **WHEN** required prop is true
- **THEN** a red asterisk (*) is appended after the label text
- **AND** asterisk uses Typography variant "caption-1"
- **AND** asterisk has bold fontWeight

### Requirement: Props Interface

Label SHALL expose a TypeScript interface extending TypographyProps with form-specific additions.

#### Scenario: Core props

- **WHEN** developer uses Label component
- **THEN** the following props are available:
  - children: ReactNode (required)
  - htmlFor: string (optional, for web accessibility)
  - required: boolean (default: false)
  - error: boolean (default: false)
  - style: StyleProp<TextStyle> (optional)
- **AND** all standard React Native TextProps are forwarded via TypographyProps spread

#### Scenario: Props omission

- **WHEN** LabelProps interface is defined
- **THEN** "children" and "variant" are omitted from TypographyProps
- **AND** Label manages its own children and variant internally

### Requirement: Three-Tier Theme Integration

Label SHALL use the three-tier theme token system for all visual styling.

#### Scenario: Primitive token usage

- **WHEN** Label theme tokens are defined
- **THEN** fontSize uses primitive.fontSize (xs, sm, lg) for size variants
- **AND** fontWeight uses primitive.fontWeight.medium
- **AND** marginBottom uses primitive.spacing[1.5]

#### Scenario: Semantic token usage

- **WHEN** Label renders text color
- **THEN** normal state uses light.text.secondary or dark.text.secondary
- **AND** error/required indicator uses light.status.error.main or dark.status.error.main
- **AND** colors automatically switch based on colorScheme from useTheme()

#### Scenario: Component token structure

- **WHEN** Label.theme.ts exports label tokens
- **THEN** structure includes fontSize (sm, md, lg), fontWeight, marginBottom
- **AND** variant object contains light and dark sub-objects
- **AND** each color scheme has text and required color tokens
- **AND** export uses "as const" for type safety

### Requirement: Size Variants

Label SHALL support three size presets for different form contexts.

#### Scenario: Small size

- **WHEN** size="sm" is provided
- **THEN** fontSize is set to primitive.fontSize.xs (12px)

#### Scenario: Medium size (default)

- **WHEN** size prop is omitted or size="md"
- **THEN** fontSize is set to primitive.fontSize.sm (14px)

#### Scenario: Large size

- **WHEN** size="lg" is provided
- **THEN** fontSize is set to primitive.fontSize.lg (16px)

### Requirement: Error State

Label SHALL visually indicate form validation errors.

#### Scenario: Error color application

- **WHEN** error prop is true
- **THEN** text color changes to theme.component.label.variant[colorScheme].required
- **AND** the error color is derived from semantic status.error.main token

#### Scenario: Combined error and required

- **WHEN** both error and required props are true
- **THEN** label text displays in error color
- **AND** required asterisk is also displayed
- **AND** asterisk uses the same required/error color

### Requirement: Typography Integration

Label SHALL use the Typography component for all text rendering.

#### Scenario: Base typography variant

- **WHEN** Label renders its main text
- **THEN** Typography component is used with variant="callout"
- **AND** fontWeight is applied from theme tokens

#### Scenario: Asterisk typography

- **WHEN** required indicator asterisk is rendered
- **THEN** Typography component is used with variant="caption-1"
- **AND** asterisk includes a leading space character
- **AND** asterisk has bold fontWeight via baseStyles

### Requirement: Style Merge Pattern

Label SHALL follow the standard style merge pattern for customization.

#### Scenario: Style priority order

- **WHEN** Label applies styles
- **THEN** baseStyles are applied first (empty label style, bold asterisk)
- **AND** theme-derived styles are applied second (color, fontWeight, marginBottom)
- **AND** user-provided style prop is applied last with highest priority

#### Scenario: Custom style override

- **WHEN** user provides custom style prop
- **THEN** custom styles override default theme styles
- **AND** base structure and accessibility are preserved

### Requirement: Accessibility

Label SHALL meet WCAG AA accessibility standards for form labels.

#### Scenario: Web accessibility association

- **WHEN** htmlFor prop is provided
- **THEN** the prop is available for web platform semantic HTML association
- **AND** screen readers can associate label with corresponding input

#### Scenario: Color contrast

- **WHEN** Label renders in any state (normal, error, required)
- **THEN** text colors maintain WCAG AA contrast ratio (4.5:1 minimum)
- **AND** colors are theme-aware for both light and dark modes

#### Scenario: Required field indication

- **WHEN** required prop is true
- **THEN** visual asterisk indicator is displayed
- **AND** indicator uses high-contrast error color for visibility

### Requirement: Testing Coverage

Label SHALL have comprehensive test coverage for all features.

#### Scenario: Basic rendering tests

- **WHEN** tests are executed
- **THEN** basic label text rendering is verified
- **AND** empty children rendering is verified

#### Scenario: Required indicator tests

- **WHEN** required prop variations are tested
- **THEN** asterisk presence when required=true is verified
- **AND** asterisk absence when required=false is verified
- **AND** multiple Text components are rendered when required

#### Scenario: Error state tests

- **WHEN** error prop is tested
- **THEN** error styling application is verified
- **AND** combined error + required states are verified

#### Scenario: Size variant tests

- **WHEN** size variants are tested
- **THEN** sm, md (default), and lg sizes render correctly

#### Scenario: Props forwarding tests

- **WHEN** prop forwarding is tested
- **THEN** custom styles are applied correctly
- **AND** testID prop is forwarded
- **AND** htmlFor prop is accepted for web accessibility

### Requirement: Documentation

Label SHALL have comprehensive MDX documentation with examples.

#### Scenario: Usage examples

- **WHEN** documentation is viewed
- **THEN** basic usage example is provided
- **AND** required indicator example is provided
- **AND** error state example is provided
- **AND** size variants example is provided
- **AND** combined states example is provided

#### Scenario: Real-world form examples

- **WHEN** documentation is viewed
- **THEN** login form example demonstrates practical usage
- **AND** profile settings form example shows different sizes
- **AND** error state form example shows validation feedback

#### Scenario: API reference

- **WHEN** documentation is viewed
- **THEN** complete props table is provided
- **AND** each prop has type, default value, and description
- **AND** TextProps inheritance is noted
