# button Specification

## Purpose

The Button component provides a pressable action trigger with multiple visual variants, size options, icon support, and loading states for primary user interactions throughout the application.

## Requirements

### Requirement: Component Structure

Button SHALL be implemented as a Pressable-based component with TypeScript interface.

#### Scenario: Base implementation

- **WHEN** Button component is rendered
- **THEN** it uses React Native Pressable as the root element
- **AND** accepts children as ReactNode
- **AND** exports ButtonProps interface extending PressableProps

#### Scenario: Props interface

- **WHEN** consuming the Button component
- **THEN** the following props are available: variant, size, iconLeft, iconRight, iconAbsoluteLeft, iconAbsoluteRight, disabled, loading, onPress, style
- **AND** all props extend from Omit<PressableProps, "children">

### Requirement: Visual Variants

Button SHALL support 4 visual variants for different use cases.

#### Scenario: Primary variant (default)

- **WHEN** variant is "primary" or unspecified
- **THEN** background uses theme.component.button.variant[colorScheme].primary.background
- **AND** text uses theme.component.button.variant[colorScheme].primary.text (inverse color)
- **AND** pressed state uses backgroundPressed token

#### Scenario: Secondary variant

- **WHEN** variant is "secondary"
- **THEN** background uses surface.primary semantic token
- **AND** border uses border.primary semantic token with hairline width
- **AND** text uses text.primary semantic token

#### Scenario: Tonal variant

- **WHEN** variant is "tonal"
- **THEN** background uses status.info.surface semantic token
- **AND** text uses status.info.text semantic token
- **AND** border is transparent

#### Scenario: Plain variant

- **WHEN** variant is "plain"
- **THEN** background is transparent
- **AND** text uses action.primary semantic token
- **AND** border is transparent

### Requirement: Size Options

Button SHALL support 5 size configurations.

#### Scenario: Small size

- **WHEN** size is "sm"
- **THEN** height is 32px
- **AND** paddingHorizontal uses primitive.spacing[3] (12px)
- **AND** paddingVertical uses primitive.spacing[1.5]
- **AND** fontSize uses primitive.fontSize.sm
- **AND** iconSize is 16px
- **AND** gap is primitive.spacing[1.5]

#### Scenario: Medium size (default)

- **WHEN** size is "md" or unspecified
- **THEN** height is 40px
- **AND** paddingHorizontal uses primitive.spacing[4] (16px)
- **AND** paddingVertical uses primitive.spacing[2.5]
- **AND** fontSize uses primitive.fontSize.base
- **AND** iconSize is 20px
- **AND** gap is primitive.spacing[2]

#### Scenario: Large size

- **WHEN** size is "lg"
- **THEN** height is 48px
- **AND** paddingHorizontal uses primitive.spacing[5] (20px)
- **AND** paddingVertical uses primitive.spacing[3.5]
- **AND** fontSize uses primitive.fontSize.lg
- **AND** iconSize is 24px
- **AND** gap is primitive.spacing[2.5]

#### Scenario: Icon size

- **WHEN** size is "icon"
- **THEN** width equals height (40px)
- **AND** borderRadius is circular (height / 2)
- **AND** no padding is applied
- **AND** children render directly in center

#### Scenario: None size

- **WHEN** size is "none"
- **THEN** no padding or minHeight is applied
- **AND** content renders with base styling only

### Requirement: Three-Tier Theme Integration

Button SHALL use the three-tier theme token system for all styling.

#### Scenario: Theme token access

- **WHEN** Button renders
- **THEN** useTheme() hook provides theme and colorScheme
- **AND** component tokens accessed via theme.component.button
- **AND** variant colors accessed via theme.component.button.variant[colorScheme][variant]
- **AND** size tokens accessed via theme.component.button.size[size]

#### Scenario: Light/dark mode support

- **WHEN** colorScheme changes between "light" and "dark"
- **THEN** all variant colors update from semantic tokens
- **AND** background, text, and border colors reflect the active scheme
- **AND** disabled state uses scheme-specific disabled tokens

#### Scenario: Theme file structure

- **WHEN** Button.theme.ts is loaded
- **THEN** it imports primitive tokens from "../theme/tokens/primitive"
- **AND** it imports semantic colors from "../theme/tokens/semantic/colors"
- **AND** exports button object with size, borderWidth, and variant configurations
- **AND** uses "as const" for type safety

### Requirement: Typography Integration

Button SHALL use the Typography component for all text rendering.

#### Scenario: Text content rendering

- **WHEN** children is a text string
- **THEN** Typography component with variant="body" renders the text
- **AND** color is set from variantTokens.text
- **AND** no inline fontSize or fontWeight styles are applied

#### Scenario: Icon button text

- **WHEN** size="icon" and children contains text or emoji
- **THEN** Typography component renders the content
- **AND** uses body variant for consistent sizing

### Requirement: Icon Support

Button SHALL support icons in multiple positions.

#### Scenario: Left icon

- **WHEN** iconLeft prop is provided
- **THEN** icon renders before children text
- **AND** icon receives color from variantTokens.text via cloneElement
- **AND** icon receives size from sizeTokens.iconSize via cloneElement
- **AND** gap from size tokens separates icon from text

#### Scenario: Right icon

- **WHEN** iconRight prop is provided
- **THEN** icon renders after children text
- **AND** icon receives color and size via cloneElement
- **AND** gap from size tokens separates text from icon

#### Scenario: Absolute left icon

- **WHEN** iconAbsoluteLeft prop is provided
- **THEN** icon renders in absolute position on the left
- **AND** button paddingLeft increases by iconSize + paddingHorizontal
- **AND** content shifts right by half the iconSize

#### Scenario: Absolute right icon

- **WHEN** iconAbsoluteRight prop is provided
- **THEN** icon renders in absolute position on the right
- **AND** button paddingRight increases by iconSize + paddingHorizontal
- **AND** content shifts left by half the iconSize

### Requirement: Loading State

Button SHALL display a loading indicator when loading prop is true.

#### Scenario: Loading indicator

- **WHEN** loading is true
- **THEN** Spinner component renders centered over content
- **AND** Spinner color matches variantTokens.text
- **AND** Spinner size is "sm"
- **AND** content opacity is set to 0 (hidden but preserves layout)
- **AND** button is functionally disabled

#### Scenario: Loading accessibility

- **WHEN** loading is true
- **THEN** accessibilityState.busy is true
- **AND** onPress handler is not called on press

### Requirement: Disabled State

Button SHALL visually indicate and functionally disable when disabled.

#### Scenario: Disabled appearance

- **WHEN** disabled is true
- **THEN** background uses disabled variant tokens
- **AND** text uses text.secondary semantic token
- **AND** opacity applies from primitive.opacity.disabled (0.5)
- **AND** border uses border.primary if applicable

#### Scenario: Disabled interaction

- **WHEN** disabled is true and user presses button
- **THEN** onPress handler is NOT called
- **AND** no visual press feedback occurs
- **AND** accessibilityState.disabled is true

### Requirement: Press Behavior

Button SHALL respond to user interaction with visual feedback.

#### Scenario: Press state feedback

- **WHEN** user presses the button
- **THEN** background color changes to backgroundPressed token
- **AND** transition is immediate (no animation delay)
- **AND** onPress handler is called on release

#### Scenario: Press when loading

- **WHEN** loading is true and user attempts press
- **THEN** onPress handler is NOT called
- **AND** isDisabled internal state is true

### Requirement: Style Merging

Button SHALL support custom style overrides through the style prop.

#### Scenario: Style merge order

- **WHEN** custom style prop is provided
- **THEN** styles merge in order: baseStyles, theme-derived, user style
- **AND** user styles have highest priority (override theme values)

#### Scenario: Custom styling example

- **WHEN** style={{ backgroundColor: "red" }} is passed
- **THEN** background color displays as red
- **AND** other theme-derived styles remain intact

### Requirement: Accessibility

Button SHALL meet WCAG AA accessibility standards.

#### Scenario: Accessibility role

- **WHEN** Button renders
- **THEN** accessibilityRole is set to "button"
- **AND** role is announced by screen readers

#### Scenario: Accessibility state for disabled

- **WHEN** disabled prop is true
- **THEN** accessibilityState includes disabled: true
- **AND** screen readers announce disabled state

#### Scenario: Accessibility state for loading

- **WHEN** loading prop is true
- **THEN** accessibilityState includes busy: true
- **AND** accessibilityState includes disabled: true
- **AND** screen readers announce busy state

#### Scenario: Custom accessibility label

- **WHEN** accessibilityLabel prop is provided
- **THEN** custom label overrides default behavior
- **AND** screen readers announce the custom label

### Requirement: Testing Coverage

Button SHALL have comprehensive test coverage for all functionality.

#### Scenario: Render tests

- **WHEN** tests execute
- **THEN** tests verify children render correctly
- **AND** tests verify all 4 variants apply correct colors
- **AND** tests verify all 5 sizes apply correct dimensions

#### Scenario: Interaction tests

- **WHEN** tests execute
- **THEN** tests verify onPress is called when pressed
- **AND** tests verify onPress is NOT called when disabled
- **AND** tests verify onPress is NOT called when loading

#### Scenario: State tests

- **WHEN** tests execute
- **THEN** tests verify Spinner appears when loading
- **AND** tests verify content hidden during loading
- **AND** tests verify disabled styles apply correctly

#### Scenario: Icon tests

- **WHEN** tests execute
- **THEN** tests verify iconLeft renders correctly
- **AND** tests verify iconRight renders correctly
- **AND** tests verify both icons render together
- **AND** tests verify icon button renders children

#### Scenario: Accessibility tests

- **WHEN** tests execute
- **THEN** tests verify accessibilityRole is "button"
- **AND** tests verify accessibilityState.disabled when disabled
- **AND** tests verify accessibilityState.busy when loading
- **AND** tests verify accessibilityLabel forwarding

### Requirement: Documentation

Button SHALL include MDX documentation with usage examples.

#### Scenario: Documentation content

- **WHEN** README.mdx is rendered
- **THEN** description explains component purpose
- **AND** all variants are demonstrated with live examples
- **AND** all sizes are demonstrated with live examples
- **AND** icon usage is demonstrated
- **AND** state examples (disabled, loading) are shown
- **AND** props table documents all available props

#### Scenario: Code examples

- **WHEN** documentation is viewed
- **THEN** basic usage example is provided
- **AND** icon button example is provided
- **AND** loading button example is provided
- **AND** custom styling example is provided
