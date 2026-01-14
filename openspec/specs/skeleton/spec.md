# skeleton Specification

## Purpose
The Skeleton component provides a placeholder loading component with shimmer animation, supporting rectangle, circle, and text line shapes with customizable dimensions for improved perceived performance during content loading.
## Requirements
### Requirement: Component Structure

Skeleton SHALL be a View-based component that displays a placeholder with shimmer animation.

#### Scenario: Basic rendering

- **WHEN** Skeleton is rendered with default props
- **THEN** a rectangular placeholder is displayed
- **AND** the component extends ViewProps (excluding children)
- **AND** displayName is set to "Skeleton"

#### Scenario: Props interface

- **WHEN** SkeletonProps type is used
- **THEN** variant prop accepts "rect", "circle", or "text"
- **AND** width prop accepts number or string
- **AND** height prop accepts number or string
- **AND** style prop accepts StyleProp<ViewStyle>

### Requirement: Shape Variants

Skeleton SHALL support three shape variants for different content types.

#### Scenario: Rectangle variant (default)

- **WHEN** variant="rect" or variant is not specified
- **THEN** a rectangular placeholder is rendered
- **AND** default dimensions are width: "100%" and height: 20
- **AND** borderRadius uses theme.component.skeleton.borderRadius

#### Scenario: Circle variant

- **WHEN** variant="circle"
- **THEN** a circular placeholder is rendered
- **AND** default dimensions are width: 40 and height: 40
- **AND** borderRadius is calculated as size / 2 for perfect circle

#### Scenario: Text variant

- **WHEN** variant="text"
- **THEN** a text-line placeholder is rendered
- **AND** default dimensions are width: "100%" and height: 12
- **AND** borderRadius uses theme.component.skeleton.borderRadius

### Requirement: Custom Dimensions

Skeleton SHALL support custom width and height for flexible placeholder sizing.

#### Scenario: Custom width as number

- **WHEN** width={200} is provided
- **THEN** the skeleton width is 200 pixels
- **AND** the default variant width is overridden

#### Scenario: Custom width as string

- **WHEN** width="50%" is provided
- **THEN** the skeleton width is 50% of parent container
- **AND** percentage strings are supported

#### Scenario: Custom height as number

- **WHEN** height={100} is provided
- **THEN** the skeleton height is 100 pixels
- **AND** the default variant height is overridden

#### Scenario: Custom height as string

- **WHEN** height="100px" is provided
- **THEN** the skeleton height uses the string value
- **AND** string dimension values are supported

### Requirement: Shimmer Animation

Skeleton SHALL display an animated shimmer effect to indicate loading.

#### Scenario: Animation initialization

- **WHEN** Skeleton is mounted
- **THEN** Animated.loop starts immediately
- **AND** shimmerValue animates from 0 to 1
- **AND** useNativeDriver is true for performance

#### Scenario: Animation timing

- **WHEN** shimmer animation runs
- **THEN** duration is theme.component.skeleton.duration (1500ms)
- **AND** easing uses Easing.ease for smooth motion
- **AND** animation loops infinitely

#### Scenario: Shimmer visual effect

- **WHEN** shimmer animates
- **THEN** translateX interpolates from -layoutWidth to layoutWidth
- **AND** shimmer overlay uses theme.component.skeleton.variant[colorScheme].shimmer color
- **AND** opacity uses theme.primitive.opacity.shimmer (0.5)

### Requirement: Three-Tier Theme Integration

Skeleton SHALL use the three-tier token system for all styling.

#### Scenario: Theme token usage

- **WHEN** Skeleton is rendered
- **THEN** borderRadius uses primitive.borderRadius.md
- **AND** duration uses primitive.duration.verySlow
- **AND** background colors come from semantic tokens
- **AND** no hardcoded color or dimension values exist in component

#### Scenario: Light mode colors

- **WHEN** colorScheme is "light"
- **THEN** background uses light.surface.tertiary
- **AND** shimmer uses light.surface.secondary

#### Scenario: Dark mode colors

- **WHEN** colorScheme is "dark"
- **THEN** background uses dark.surface.tertiary
- **AND** shimmer uses dark.surface.secondary

### Requirement: Layout Measurement

Skeleton SHALL measure its layout to calculate shimmer animation bounds.

#### Scenario: Layout width capture

- **WHEN** Skeleton is rendered
- **THEN** onLayout event captures component width
- **AND** layoutWidth state is updated via setLayoutWidth
- **AND** shimmer translateX uses layoutWidth for proper animation range

### Requirement: Style Merging

Skeleton SHALL support custom styles that merge with theme styles.

#### Scenario: Custom style override

- **WHEN** style prop is provided
- **THEN** custom styles are applied after theme styles
- **AND** style merge follows pattern: [baseStyles.container, variantStyles, dimensionStyles, style]
- **AND** custom styles have highest priority

#### Scenario: Base styles

- **WHEN** Skeleton renders
- **THEN** container has overflow: "hidden" to clip shimmer
- **AND** container has position: "relative" for shimmer positioning
- **AND** shimmer has position: "absolute" with full coverage (top/left/right/bottom: 0)

### Requirement: ViewProps Forwarding

Skeleton SHALL forward ViewProps to the underlying View component.

#### Scenario: testID forwarding

- **WHEN** testID="skeleton-test" is provided
- **THEN** the testID is accessible via getByTestId
- **AND** all standard ViewProps are forwarded

### Requirement: Testing Coverage

Skeleton SHALL have comprehensive test coverage for all features.

#### Scenario: Variant tests

- **WHEN** tests execute
- **THEN** rect variant (default) is tested
- **AND** circle variant is tested
- **AND** text variant is tested

#### Scenario: Dimension tests

- **WHEN** tests execute
- **THEN** custom width as number is tested
- **AND** custom width as string is tested
- **AND** custom height as number is tested
- **AND** custom height as string is tested
- **AND** combined width and height is tested

#### Scenario: Style and props tests

- **WHEN** tests execute
- **THEN** custom style application is tested
- **AND** ViewProps forwarding (testID) is tested

### Requirement: Documentation

Skeleton SHALL have comprehensive MDX documentation.

#### Scenario: Documentation content

- **WHEN** documentation is viewed
- **THEN** basic usage example is provided
- **AND** all shape variants are demonstrated
- **AND** custom dimensions are shown
- **AND** real-world composition examples are included (profile card, content feed)
- **AND** props table documents all available props
- **AND** code examples show common usage patterns

