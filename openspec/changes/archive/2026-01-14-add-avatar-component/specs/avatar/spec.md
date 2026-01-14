## ADDED Requirements

### Requirement: Component Structure

Avatar SHALL be implemented as a Pressable-based component with TypeScript interface.

#### Scenario: Base implementation

- **WHEN** Avatar component is rendered
- **THEN** it uses React Native Pressable as the root element
- **AND** accepts source prop for image display
- **AND** accepts fallback prop for initials text
- **AND** exports AvatarProps interface extending PressableProps

#### Scenario: Props interface

- **WHEN** consuming the Avatar component
- **THEN** the following props are available: source, fallback, size, onPress, style
- **AND** all props extend from Omit<PressableProps, "children">

### Requirement: Size Options

Avatar SHALL support 4 size configurations.

#### Scenario: Small size

- **WHEN** size is "sm"
- **THEN** width and height are 32px
- **AND** fontSize uses primitive.fontSize.xs
- **AND** borderRadius is primitive.borderRadius.full (999)

#### Scenario: Medium size (default)

- **WHEN** size is "md" or unspecified
- **THEN** width and height are 40px
- **AND** fontSize uses primitive.fontSize.lg
- **AND** borderRadius is primitive.borderRadius.full (999)

#### Scenario: Large size

- **WHEN** size is "lg"
- **THEN** width and height are 48px
- **AND** fontSize uses primitive.fontSize.2xl
- **AND** borderRadius is primitive.borderRadius.full (999)

#### Scenario: Extra large size

- **WHEN** size is "xl"
- **THEN** width and height are 64px
- **AND** fontSize uses primitive.fontSize.3xl
- **AND** borderRadius is primitive.borderRadius.full (999)

### Requirement: Image Display

Avatar SHALL display an image when source prop is provided.

#### Scenario: Image source rendering

- **WHEN** source prop is provided with ImageSourcePropType
- **THEN** Image component renders with 100% width and height
- **AND** fallback text is not displayed
- **AND** image fills the circular container

#### Scenario: Image with fallback

- **WHEN** both source and fallback props are provided
- **THEN** image takes precedence and displays
- **AND** fallback text remains hidden

### Requirement: Fallback Text

Avatar SHALL display fallback text (initials) when no image source is provided.

#### Scenario: Fallback rendering

- **WHEN** source is undefined and fallback is provided
- **THEN** fallback text renders centered in the avatar
- **AND** text color uses theme.component.avatar.variant[colorScheme].text
- **AND** fontWeight uses primitive.fontWeight.semibold

#### Scenario: Empty fallback

- **WHEN** source is undefined and fallback is empty string or not provided
- **THEN** avatar renders with background color only
- **AND** no text is displayed

### Requirement: Three-Tier Theme Integration

Avatar SHALL use the three-tier theme token system for all styling.

#### Scenario: Theme token access

- **WHEN** Avatar renders
- **THEN** useTheme() hook provides theme and colorScheme
- **AND** component tokens accessed via theme.component.avatar
- **AND** size dimensions accessed via theme.component.avatar.size[size]
- **AND** variant colors accessed via theme.component.avatar.variant[colorScheme]

#### Scenario: Light/dark mode support

- **WHEN** colorScheme changes between "light" and "dark"
- **THEN** background color updates from semantic tokens (light.action.primary, dark.action.primary)
- **AND** text color updates from semantic tokens (light.text.inverse, dark.text.inverse)

#### Scenario: Theme file structure

- **WHEN** Avatar.theme.ts is loaded
- **THEN** it imports primitive tokens from "../theme/tokens/primitive"
- **AND** it imports semantic colors from "../theme/tokens/semantic/colors"
- **AND** exports avatar object with size, borderRadius, and variant configurations
- **AND** uses "as const" for type safety

### Requirement: Press Behavior

Avatar SHALL respond to user interaction with visual feedback.

#### Scenario: Press state feedback

- **WHEN** user presses the avatar
- **THEN** opacity changes to theme.semantic.state.pressed.opacity
- **AND** onPress handler is called on release

#### Scenario: Unpressed state

- **WHEN** avatar is not being pressed
- **THEN** opacity remains at 1
- **AND** all colors display at full intensity

### Requirement: Style Merging

Avatar SHALL support custom style overrides through the style prop.

#### Scenario: Style merge order

- **WHEN** custom style prop is provided
- **THEN** styles merge in order: baseStyles, theme-derived, user style
- **AND** user styles have highest priority (override theme values)

#### Scenario: Custom styling example

- **WHEN** style={{ backgroundColor: "red" }} is passed
- **THEN** background color displays as red
- **AND** other theme-derived styles remain intact

### Requirement: Accessibility

Avatar SHALL meet WCAG AA accessibility standards.

#### Scenario: Accessibility role

- **WHEN** Avatar renders
- **THEN** accessibilityRole is set to "imagebutton"
- **AND** role is announced by screen readers

#### Scenario: Custom accessibility label

- **WHEN** accessibilityLabel prop is provided
- **THEN** custom label overrides default behavior
- **AND** screen readers announce the custom label

### Requirement: Testing Coverage

Avatar SHALL have comprehensive test coverage for all functionality.

#### Scenario: Render tests

- **WHEN** tests execute
- **THEN** tests verify image renders when source is provided
- **AND** tests verify fallback text renders when no source
- **AND** tests verify all 4 sizes apply correct dimensions

#### Scenario: Size tests

- **WHEN** tests execute
- **THEN** tests verify sm size renders 32x32px
- **AND** tests verify md size renders 40x40px (default)
- **AND** tests verify lg size renders 48x48px
- **AND** tests verify circular borderRadius (999) applies

#### Scenario: Image vs fallback tests

- **WHEN** tests execute
- **THEN** tests verify Image component present when source provided
- **AND** tests verify Image hidden when no source
- **AND** tests verify fallback text present when no source
- **AND** tests verify fallback text hidden when source provided

#### Scenario: Interaction tests

- **WHEN** tests execute
- **THEN** tests verify onPress is called when pressed
- **AND** tests verify pressed opacity change occurs

#### Scenario: Style and accessibility tests

- **WHEN** tests execute
- **THEN** tests verify custom style prop merges correctly
- **AND** tests verify accessibilityRole is "imagebutton"
- **AND** tests verify accessibilityLabel forwarding
- **AND** tests verify light theme colors apply correctly

### Requirement: Documentation

Avatar SHALL include MDX documentation with usage examples.

#### Scenario: Documentation content

- **WHEN** README.mdx is rendered
- **THEN** description explains component purpose
- **AND** all sizes are demonstrated with live examples
- **AND** image avatar examples are shown
- **AND** fallback text examples are shown
- **AND** props table documents all available props

#### Scenario: Real-world examples

- **WHEN** documentation is viewed
- **THEN** profile card example demonstrates avatar with user info
- **AND** user list example demonstrates multiple avatars
- **AND** interactive profile example demonstrates press handling
- **AND** code snippets show basic usage patterns
