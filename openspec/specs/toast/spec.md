# toast Specification

## Purpose
The Toast component provides temporary notification messages with slide-in animation, 4 semantic variants, top or bottom positioning, and auto-dismiss capability for non-intrusive user feedback.
## Requirements
### Requirement: Component Structure

Toast SHALL be implemented as an Animated.View-based component with TypeScript interface.

#### Scenario: Base implementation

- **WHEN** Toast component is rendered with visible={true}
- **THEN** it uses React Native Animated.View as the root element
- **AND** accepts message as required string prop
- **AND** exports ToastProps interface extending Omit<ViewProps, "children">

#### Scenario: Props interface

- **WHEN** consuming the Toast component
- **THEN** the following props are available: visible, variant, message, duration, position, onDismiss, style
- **AND** visible and message are required props
- **AND** all other props are optional with defaults

#### Scenario: Visibility control

- **WHEN** visible is false
- **THEN** component returns null
- **AND** no DOM elements are rendered

### Requirement: Visual Variants

Toast SHALL support 4 visual variants for different notification types.

#### Scenario: Info variant (default)

- **WHEN** variant is "info" or unspecified
- **THEN** background uses theme.component.toast.variant[colorScheme].info.background
- **AND** text uses theme.component.toast.variant[colorScheme].info.text
- **AND** border uses theme.component.toast.variant[colorScheme].info.border
- **AND** icon uses information-circle from Ionicons with info.icon color

#### Scenario: Success variant

- **WHEN** variant is "success"
- **THEN** background uses status.success.surface semantic token
- **AND** text uses status.success.text semantic token
- **AND** border uses status.success.border semantic token
- **AND** icon uses checkmark-circle from Ionicons

#### Scenario: Warning variant

- **WHEN** variant is "warning"
- **THEN** background uses status.warning.surface semantic token
- **AND** text uses status.warning.text semantic token
- **AND** border uses status.warning.border semantic token
- **AND** icon uses warning from Ionicons

#### Scenario: Error variant

- **WHEN** variant is "error"
- **THEN** background uses status.error.surface semantic token
- **AND** text uses status.error.text semantic token
- **AND** border uses status.error.border semantic token
- **AND** icon uses close-circle from Ionicons

### Requirement: Position Options

Toast SHALL support 2 position configurations for screen placement.

#### Scenario: Top position

- **WHEN** position is "top"
- **THEN** toast is positioned at the top of the screen
- **AND** top offset uses theme.component.toast.position.offset (primitive.spacing[12])
- **AND** slide animation comes from above (translateY: -100 to 0)

#### Scenario: Bottom position (default)

- **WHEN** position is "bottom" or unspecified
- **THEN** toast is positioned at the bottom of the screen
- **AND** bottom offset uses theme.component.toast.position.offset
- **AND** slide animation comes from below (translateY: 100 to 0)

#### Scenario: Horizontal positioning

- **WHEN** toast renders at any position
- **THEN** left and right margins use theme.component.toast.position.horizontal
- **AND** toast spans the available width minus horizontal margins

### Requirement: Three-Tier Theme Integration

Toast SHALL use the three-tier theme token system for all styling.

#### Scenario: Theme token access

- **WHEN** Toast renders
- **THEN** useTheme() hook provides theme and colorScheme
- **AND** component tokens accessed via theme.component.toast
- **AND** variant colors accessed via theme.component.toast.variant[colorScheme][variant]
- **AND** animation config accessed via theme.component.toast.animation

#### Scenario: Light/dark mode support

- **WHEN** colorScheme changes between "light" and "dark"
- **THEN** all variant colors update from semantic tokens
- **AND** background, text, border, and icon colors reflect the active scheme
- **AND** shadow preset applies consistently

#### Scenario: Theme file structure

- **WHEN** Toast.theme.ts is loaded
- **THEN** it imports primitive tokens from "../theme/tokens/primitive"
- **AND** it imports semantic colors from "../theme/tokens/semantic/colors"
- **AND** exports toast object with padding, borderRadius, gap, iconSize, position, animation, and variant configurations
- **AND** uses "as const" for type safety

### Requirement: Typography Integration

Toast SHALL use the Typography component for all text rendering.

#### Scenario: Message text rendering

- **WHEN** message prop is provided
- **THEN** Typography component with variant="body" renders the text
- **AND** color is set from variantTokens.text
- **AND** text has flex: 1 to fill available space after icon

### Requirement: Icon Support

Toast SHALL display variant-specific icons using Ionicons.

#### Scenario: Icon mapping

- **WHEN** toast renders with a variant
- **THEN** info variant shows information-circle icon
- **AND** success variant shows checkmark-circle icon
- **AND** warning variant shows warning icon
- **AND** error variant shows close-circle icon

#### Scenario: Icon styling

- **WHEN** icon renders
- **THEN** icon size uses theme.component.toast.iconSize (20px)
- **AND** icon color uses variantTokens.icon
- **AND** gap between icon and text uses theme.component.toast.gap

### Requirement: Animation

Toast SHALL animate entrance and exit with smooth transitions.

#### Scenario: Entrance animation

- **WHEN** visible changes from false to true
- **THEN** Animated.spring animates the toast into view
- **AND** spring configuration uses theme.component.toast.animation.spring (primitive.spring.gentle)
- **AND** translateY interpolates from 100/-100 to 0 (based on position)
- **AND** opacity interpolates from 0 to 1
- **AND** useNativeDriver is true for performance

#### Scenario: Exit animation

- **WHEN** visible changes from true to false
- **THEN** Animated.timing animates the toast out of view
- **AND** duration uses theme.component.toast.animation.duration (primitive.duration.normal)
- **AND** translateY and opacity animate to hidden state
- **AND** useNativeDriver is true for performance

### Requirement: Auto-Dismiss Behavior

Toast SHALL automatically dismiss after a configurable duration.

#### Scenario: Default duration

- **WHEN** duration is not specified
- **THEN** toast auto-dismisses after 3000ms
- **AND** onDismiss callback is called after the duration

#### Scenario: Custom duration

- **WHEN** duration is set to a custom value (e.g., 5000)
- **THEN** toast auto-dismisses after the specified milliseconds
- **AND** onDismiss callback is called after the custom duration

#### Scenario: Manual dismiss only

- **WHEN** duration is set to 0
- **THEN** toast does NOT auto-dismiss
- **AND** toast remains visible until visible prop is set to false externally

#### Scenario: Timer cleanup

- **WHEN** component unmounts or visible changes
- **THEN** any pending timeout is cleared
- **AND** no memory leaks occur from orphaned timers

### Requirement: Style Merging

Toast SHALL support custom style overrides through the style prop.

#### Scenario: Style merge order

- **WHEN** custom style prop is provided
- **THEN** styles merge in order: baseStyles, theme-derived, user style
- **AND** user styles have highest priority (override theme values)

#### Scenario: Custom styling example

- **WHEN** style={{ marginTop: 20 }} is passed
- **THEN** margin top is applied to the toast container
- **AND** other theme-derived styles remain intact

### Requirement: Accessibility

Toast SHALL meet WCAG AA accessibility standards for notifications.

#### Scenario: Alert role

- **WHEN** Toast renders
- **THEN** accessibilityRole is set to "alert"
- **AND** screen readers announce the toast content

#### Scenario: Live region

- **WHEN** Toast becomes visible
- **THEN** accessibilityLiveRegion is set to "polite"
- **AND** screen readers announce the message without interrupting current task

#### Scenario: View props forwarding

- **WHEN** additional ViewProps like testID are provided
- **THEN** props are forwarded to the Animated.View container
- **AND** testID can be used for testing queries

### Requirement: Testing Coverage

Toast SHALL have comprehensive test coverage for all functionality.

#### Scenario: Visibility tests

- **WHEN** tests execute
- **THEN** tests verify toast renders when visible={true}
- **AND** tests verify toast returns null when visible={false}

#### Scenario: Variant tests

- **WHEN** tests execute
- **THEN** tests verify all 4 variants (info, success, warning, error) render correctly
- **AND** tests verify message text appears for each variant

#### Scenario: Position tests

- **WHEN** tests execute
- **THEN** tests verify top position renders correctly
- **AND** tests verify bottom position renders correctly (default)

#### Scenario: Auto-dismiss tests

- **WHEN** tests execute
- **THEN** tests verify onDismiss is called after default duration (3000ms)
- **AND** tests verify onDismiss is NOT called when duration is 0
- **AND** tests verify custom duration timing works correctly

#### Scenario: Props tests

- **WHEN** tests execute
- **THEN** tests verify custom styles are applied
- **AND** tests verify ViewProps like testID are forwarded
- **AND** tests verify accessibility attributes are set

### Requirement: Documentation

Toast SHALL include MDX documentation with usage examples.

#### Scenario: Documentation content

- **WHEN** README.mdx is rendered
- **THEN** description explains component purpose (temporary notification)
- **AND** basic usage example is demonstrated
- **AND** all variants are demonstrated with live examples
- **AND** position options are demonstrated
- **AND** props table documents all available props

#### Scenario: Code examples

- **WHEN** documentation is viewed
- **THEN** basic usage example with state management is provided
- **AND** example shows integration with button press
- **AND** example demonstrates onDismiss callback pattern

