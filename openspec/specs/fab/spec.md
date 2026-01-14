# fab Specification

## Purpose

The Floating Action Button (FAB) component provides a prominent circular action button with placement options and extended variant for primary screen-level actions that float above content.

## Requirements

### Requirement: Component Structure

FAB SHALL be implemented as a Pressable-based component wrapped in Animated.View with TypeScript interface.

#### Scenario: Base implementation

- **WHEN** FAB component is rendered
- **THEN** it uses Animated.View as the outer container for animations
- **AND** uses React Native Pressable as the interactive element
- **AND** accepts icon as required ReactNode prop
- **AND** exports FABProps interface extending Omit<PressableProps, "children">

#### Scenario: Props interface

- **WHEN** consuming the FAB component
- **THEN** the following props are available: icon, onPress, label, size, placement, variant, disabled, style
- **AND** icon and onPress are required props
- **AND** all other props have sensible defaults

### Requirement: Visual Variants

FAB SHALL support 2 visual variants for different use cases.

#### Scenario: Primary variant (default)

- **WHEN** variant is "primary" or unspecified
- **THEN** background uses theme.component.fab.variant[colorScheme].primary.background (action.primary semantic token)
- **AND** icon color uses light.text.inverse / dark.text.inverse
- **AND** shadow uses primitive.shadowPresets.lg

#### Scenario: Secondary variant

- **WHEN** variant is "secondary"
- **THEN** background uses theme.component.fab.variant[colorScheme].secondary.background (surface.elevated semantic token)
- **AND** icon color uses light.text.primary / dark.text.inverse
- **AND** shadow uses primitive.shadowPresets.lg

### Requirement: Size Options

FAB SHALL support 3 size configurations.

#### Scenario: Small size

- **WHEN** size is "sm"
- **THEN** width and height are 40px
- **AND** borderRadius is 20px (circular)
- **AND** iconSize is 20px

#### Scenario: Medium size (default)

- **WHEN** size is "md" or unspecified
- **THEN** width and height are 56px
- **AND** borderRadius is 28px (circular)
- **AND** iconSize is 24px

#### Scenario: Large size

- **WHEN** size is "lg"
- **THEN** width and height are 64px
- **AND** borderRadius is 32px (circular)
- **AND** iconSize is 28px

### Requirement: Placement Options

FAB SHALL support 6 screen placement positions.

#### Scenario: Bottom-right placement (default)

- **WHEN** placement is "bottom-right" or unspecified
- **THEN** FAB positions with bottom and right using theme.component.fab.offset (primitive.spacing[4])
- **AND** position is absolute with zIndex 999

#### Scenario: Bottom-left placement

- **WHEN** placement is "bottom-left"
- **THEN** FAB positions with bottom and left using offset token

#### Scenario: Bottom-center placement

- **WHEN** placement is "bottom-center"
- **THEN** FAB positions with bottom using offset token
- **AND** alignSelf is "center" for horizontal centering

#### Scenario: Top-right placement

- **WHEN** placement is "top-right"
- **THEN** FAB positions with top and right using offset token

#### Scenario: Top-left placement

- **WHEN** placement is "top-left"
- **THEN** FAB positions with top and left using offset token

#### Scenario: Top-center placement

- **WHEN** placement is "top-center"
- **THEN** FAB positions with top using offset token
- **AND** alignSelf is "center" for horizontal centering

### Requirement: Extended Variant

FAB SHALL support an extended mode with icon and label.

#### Scenario: Extended mode activation

- **WHEN** label prop is provided
- **THEN** FAB renders in extended mode with icon and text side by side
- **AND** flexDirection is "row"
- **AND** minWidth uses theme.component.fab.extended.minWidth[size]

#### Scenario: Extended typography

- **WHEN** label is provided
- **THEN** Typography component renders the label with variant="body"
- **AND** fontWeight uses theme.component.fab.extended.fontWeight (semibold)
- **AND** color uses theme.component.fab.extended.variant[colorScheme][variant].text

#### Scenario: Extended spacing

- **WHEN** label is provided
- **THEN** gap between icon and label uses theme.component.fab.extended.gap (primitive.spacing[2])
- **AND** paddingHorizontal uses theme.component.fab.extended.paddingHorizontal (primitive.spacing[4])

### Requirement: Three-Tier Theme Integration

FAB SHALL use the three-tier theme token system for all styling.

#### Scenario: Theme token access

- **WHEN** FAB renders
- **THEN** useTheme() hook provides theme and colorScheme
- **AND** component tokens accessed via theme.component.fab
- **AND** variant colors accessed via theme.component.fab.variant[colorScheme][variant]
- **AND** size tokens accessed via theme.component.fab.size[size]

#### Scenario: Light/dark mode support

- **WHEN** colorScheme changes between "light" and "dark"
- **THEN** all variant colors update from semantic tokens
- **AND** background, icon, and text colors reflect the active scheme
- **AND** extended label colors use scheme-specific tokens

#### Scenario: Theme file structure

- **WHEN** Fab.theme.ts is loaded
- **THEN** it imports primitive tokens from "../theme/tokens/primitive"
- **AND** it imports light and dark semantic colors from "../theme/tokens/semantic/colors"
- **AND** exports fab object with size, offset, extended, animation, and variant configurations
- **AND** uses "as const" for type safety

### Requirement: Typography Integration

FAB SHALL use the Typography component for extended label rendering.

#### Scenario: Extended label rendering

- **WHEN** label prop is provided
- **THEN** Typography component with variant="body" renders the label text
- **AND** fontWeight is set from theme.component.fab.extended.fontWeight
- **AND** color is set from theme.component.fab.extended.variant[colorScheme][variant].text

#### Scenario: Icon-only mode

- **WHEN** label is not provided
- **THEN** Typography component is NOT rendered
- **AND** only the icon prop renders centered in the FAB

### Requirement: Animation

FAB SHALL provide animated feedback on press interactions.

#### Scenario: Press animation

- **WHEN** user presses the FAB (onPressIn)
- **THEN** scale animates to 0.95 using Animated.spring
- **AND** opacity animates to theme.component.fab.variant[colorScheme].hover.opacity
- **AND** animation duration uses theme.component.fab.animation.duration (primitive.duration.fast)

#### Scenario: Release animation

- **WHEN** user releases the FAB (onPressOut)
- **THEN** scale animates back to 1 using Animated.spring with theme.component.fab.animation.spring
- **AND** opacity animates back to 1
- **AND** useNativeDriver is true for performance

### Requirement: Disabled State

FAB SHALL visually indicate and functionally disable when disabled.

#### Scenario: Disabled appearance

- **WHEN** disabled is true
- **THEN** opacity uses theme.component.fab.variant[colorScheme].disabled.opacity (primitive.opacity.disabled)
- **AND** shadow is removed (shadowOpacity: 0, elevation: 0)
- **AND** visual appearance indicates non-interactive state

#### Scenario: Disabled interaction

- **WHEN** disabled is true and user presses FAB
- **THEN** onPress handler is NOT called
- **AND** press animations still fire but no action occurs
- **AND** accessibilityState.disabled is true

### Requirement: Style Merging

FAB SHALL support custom style overrides through the style prop.

#### Scenario: Style merge order

- **WHEN** custom style prop is provided
- **THEN** styles merge in order: baseStyles, theme-derived, placement, user style
- **AND** user styles have highest priority (override theme values)

#### Scenario: Custom styling example

- **WHEN** style={{ margin: 10 }} is passed
- **THEN** margin is applied to the container
- **AND** other theme-derived styles remain intact

### Requirement: Accessibility

FAB SHALL meet WCAG AA accessibility standards.

#### Scenario: Accessibility role

- **WHEN** FAB renders
- **THEN** accessibilityRole is set to "button"
- **AND** role is announced by screen readers

#### Scenario: Accessibility label with label prop

- **WHEN** label prop is provided
- **THEN** accessibilityLabel defaults to the label text
- **AND** screen readers announce the label

#### Scenario: Custom accessibility label

- **WHEN** accessibilityLabel prop is explicitly provided
- **THEN** custom label overrides the default label prop
- **AND** screen readers announce the custom label

#### Scenario: Accessibility state for disabled

- **WHEN** disabled prop is true
- **THEN** accessibilityState includes disabled: true
- **AND** screen readers announce disabled state

### Requirement: Testing Coverage

FAB SHALL have comprehensive test coverage for all functionality.

#### Scenario: Render tests

- **WHEN** tests execute
- **THEN** tests verify icon renders correctly
- **AND** tests verify extended variant renders with label
- **AND** tests verify all 3 sizes apply correctly
- **AND** tests verify all 2 variants apply correctly

#### Scenario: Placement tests

- **WHEN** tests execute
- **THEN** tests verify all 6 placements apply correctly
- **AND** tests verify bottom-right is the default placement

#### Scenario: Interaction tests

- **WHEN** tests execute
- **THEN** tests verify onPress is called when pressed
- **AND** tests verify onPress is NOT called when disabled

#### Scenario: State tests

- **WHEN** tests execute
- **THEN** tests verify disabled styles apply correctly
- **AND** tests verify custom style prop merges correctly

#### Scenario: Accessibility tests

- **WHEN** tests execute
- **THEN** tests verify accessibilityRole is "button"
- **AND** tests verify accessibilityState.disabled when disabled
- **AND** tests verify accessibilityLabel uses label prop by default
- **AND** tests verify explicit accessibilityLabel overrides label prop
- **AND** tests verify PressableProps forwarding

### Requirement: Documentation

FAB SHALL include MDX documentation with usage examples.

#### Scenario: Documentation content

- **WHEN** README.mdx is rendered
- **THEN** description explains component purpose as floating action button
- **AND** basic usage with icon is demonstrated
- **AND** extended FAB with label is demonstrated
- **AND** all sizes are demonstrated with live examples
- **AND** all variants are demonstrated with live examples
- **AND** all placements are demonstrated with live examples
- **AND** disabled state is demonstrated

#### Scenario: Props table

- **WHEN** documentation is viewed
- **THEN** props table documents icon (required ReactNode)
- **AND** props table documents onPress (required function)
- **AND** props table documents label, size, placement, variant, disabled, style
- **AND** default values are clearly indicated

#### Scenario: Code examples

- **WHEN** documentation is viewed
- **THEN** basic FAB example is provided with import statement
- **AND** extended FAB example is provided
- **AND** examples show realistic use cases (Create, Compose buttons)
