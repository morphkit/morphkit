# card Specification

## Purpose

The Card component provides a content container with elevation, borders, and padding for grouping related information into visually distinct sections within the interface.

## Requirements

### Requirement: Component Structure

Card SHALL be implemented as a View-based container component with optional Pressable behavior.

#### Scenario: Static card rendering

- **WHEN** Card component is rendered without onPress
- **THEN** it uses React Native View as the root element
- **AND** accepts children as ReactNode
- **AND** exports CardProps interface extending ViewProps

#### Scenario: Pressable card rendering

- **WHEN** Card component is rendered with onPress prop
- **THEN** it uses React Native Pressable as the root element
- **AND** accessibilityRole is set to "button"
- **AND** onPress handler is called when pressed

#### Scenario: Props interface

- **WHEN** consuming the Card component
- **THEN** the following props are available: children, variant, size, onPress, style
- **AND** all props extend from Omit<ViewProps, "children">

### Requirement: Visual Variants

Card SHALL support 4 visual variants for different visual hierarchy and use cases.

#### Scenario: Elevated variant (default)

- **WHEN** variant is "elevated" or unspecified
- **THEN** background uses theme.component.card.variant[colorScheme].elevated.background (surface.elevated)
- **AND** borderWidth is 0 (no border)
- **AND** shadow uses primitive.shadowPresets.lg for prominent elevation

#### Scenario: Outline variant

- **WHEN** variant is "outline"
- **THEN** background uses theme.component.card.variant[colorScheme].outlined.background (surface.primary)
- **AND** borderWidth is 1
- **AND** borderColor uses theme.component.card.variant[colorScheme].outlined.border (border.primary)
- **AND** shadow uses primitive.shadowPresets.sm for subtle depth

#### Scenario: Ghost variant

- **WHEN** variant is "ghost"
- **THEN** background uses theme.component.card.variant[colorScheme].ghost.background (surface.secondary)
- **AND** borderWidth is 0 (no border)
- **AND** shadow uses primitive.shadowPresets.sm for minimal depth

#### Scenario: Filled variant

- **WHEN** variant is "filled"
- **THEN** background uses theme.component.card.variant[colorScheme].filled.background (surface.tertiary)
- **AND** borderWidth is 0 (no border)
- **AND** shadow uses primitive.shadowPresets.md for medium depth

### Requirement: Size Options

Card SHALL support 3 size configurations for padding and border radius.

#### Scenario: Small size

- **WHEN** size is "sm"
- **THEN** padding uses theme.component.card.padding (primitive.spacing[4], 16px)
- **AND** borderRadius uses theme.component.card.borderRadius (primitive.borderRadius.lg, 12px)

#### Scenario: Medium size (default)

- **WHEN** size is "md" or unspecified
- **THEN** padding uses theme.component.card.padding (primitive.spacing[4], 16px)
- **AND** borderRadius uses theme.component.card.borderRadius (primitive.borderRadius.lg, 12px)

#### Scenario: Large size

- **WHEN** size is "lg"
- **THEN** padding uses theme.component.card.padding (primitive.spacing[4], 16px)
- **AND** borderRadius uses theme.component.card.borderRadius (primitive.borderRadius.lg, 12px)

### Requirement: Three-Tier Theme Integration

Card SHALL use the three-tier theme token system for all styling.

#### Scenario: Theme token access

- **WHEN** Card renders
- **THEN** useTheme() hook provides theme and colorScheme
- **AND** component tokens accessed via theme.component.card
- **AND** variant tokens accessed via theme.component.card.variant[colorScheme][variant]
- **AND** padding accessed via theme.component.card.padding
- **AND** borderRadius accessed via theme.component.card.borderRadius

#### Scenario: Light/dark mode support

- **WHEN** colorScheme changes between "light" and "dark"
- **THEN** all variant colors update from semantic tokens
- **AND** background colors reflect the active scheme (light.surface._ or dark.surface._)
- **AND** border colors reflect the active scheme
- **AND** shadow presets remain consistent across schemes

#### Scenario: Theme file structure

- **WHEN** Card.theme.ts is loaded
- **THEN** it imports primitive tokens from "../theme/tokens/primitive"
- **AND** it imports semantic colors from "../theme/tokens/semantic/colors"
- **AND** exports card object with padding, borderRadius, gap, and variant configurations
- **AND** uses "as const" for type safety

### Requirement: Press Behavior

Card SHALL respond to user interaction when onPress is provided.

#### Scenario: Press state feedback

- **WHEN** user presses a card with onPress prop
- **THEN** opacity changes to theme.component.card.variant[colorScheme].pressed.opacity (primitive.opacity.pressed)
- **AND** onPress handler is called on release
- **AND** visual feedback is immediate

#### Scenario: Static card behavior

- **WHEN** Card has no onPress prop
- **THEN** Card renders as View (not Pressable)
- **AND** no press interaction is available
- **AND** accessibilityRole is not set to "button"

### Requirement: Style Merging

Card SHALL support custom style overrides through the style prop.

#### Scenario: Style merge order

- **WHEN** custom style prop is provided
- **THEN** styles merge in order: baseStyles.card, theme-derived (padding, borderRadius, variant), user style
- **AND** user styles have highest priority (override theme values)

#### Scenario: Custom styling example

- **WHEN** style={{ marginTop: 20 }} is passed
- **THEN** marginTop of 20 is applied
- **AND** other theme-derived styles remain intact

### Requirement: Accessibility

Card SHALL meet WCAG AA accessibility standards for interactive cards.

#### Scenario: Accessibility role for pressable card

- **WHEN** Card has onPress prop
- **THEN** accessibilityRole is set to "button"
- **AND** role is announced by screen readers

#### Scenario: Non-interactive card accessibility

- **WHEN** Card has no onPress prop
- **THEN** no accessibilityRole is set (inherits View default)
- **AND** content is accessible to screen readers

#### Scenario: ViewProps forwarding

- **WHEN** testID or other ViewProps are provided
- **THEN** props are forwarded to the root element
- **AND** testID is accessible for testing

### Requirement: Testing Coverage

Card SHALL have comprehensive test coverage for all functionality.

#### Scenario: Render tests

- **WHEN** tests execute
- **THEN** tests verify children render correctly
- **AND** tests verify all 4 variants apply correct background colors
- **AND** tests verify outline variant applies borderWidth 1
- **AND** tests verify default (elevated) variant styling

#### Scenario: Size tests

- **WHEN** tests execute
- **THEN** tests verify sm size applies correct padding and borderRadius
- **AND** tests verify md size (default) applies correct padding and borderRadius
- **AND** tests verify lg size applies correct padding and borderRadius
- **AND** tests verify size and variant combine correctly

#### Scenario: Interaction tests

- **WHEN** tests execute
- **THEN** tests verify Pressable renders when onPress provided
- **AND** tests verify View renders when onPress not provided
- **AND** tests verify onPress is called when pressed
- **AND** tests verify accessibilityRole is "button" for pressable cards

#### Scenario: Style merge tests

- **WHEN** tests execute
- **THEN** tests verify custom style prop merges correctly
- **AND** tests verify ViewProps (testID) are forwarded
- **AND** tests verify Card renders without children

### Requirement: Documentation

Card SHALL include MDX documentation with usage examples.

#### Scenario: Documentation content

- **WHEN** README.mdx is rendered
- **THEN** description explains component as content container with elevation, borders, and padding
- **AND** all 4 variants are demonstrated with live examples
- **AND** all 3 sizes are demonstrated with live examples
- **AND** pressable card is demonstrated
- **AND** complex card example shows real-world composition

#### Scenario: Code examples

- **WHEN** documentation is viewed
- **THEN** basic usage example is provided
- **AND** interactive card with outline example is provided
- **AND** large filled card example is provided
- **AND** custom styling example is provided

#### Scenario: Props documentation

- **WHEN** Props section is viewed
- **THEN** children prop is documented as ReactNode
- **AND** variant prop is documented with all 4 options and default
- **AND** size prop is documented with all 3 options and default
- **AND** onPress prop is documented for pressable behavior
- **AND** style prop is documented for custom styles
- **AND** ViewProps spreading is documented
