# container Specification

## Purpose

The Container component provides a centered max-width wrapper for page content with responsive width constraints, ensuring consistent content boundaries across different screen sizes.

## Requirements

### Requirement: Component Structure

Container SHALL be implemented as a View-based layout component for constraining content width.

#### Scenario: Basic rendering

- **WHEN** Container component is rendered
- **THEN** it uses React Native View as the root element
- **AND** accepts children as ReactNode
- **AND** exports ContainerProps interface extending Omit<ViewProps, "children">

#### Scenario: Props interface

- **WHEN** consuming the Container component
- **THEN** the following props are available: children, maxWidth, padding, centered, insets, style
- **AND** children prop accepts ReactNode
- **AND** maxWidth accepts number or MaxWidthPreset ("sm" | "md" | "lg" | "xl")
- **AND** padding accepts number for custom horizontal padding
- **AND** centered accepts boolean for horizontal alignment
- **AND** insets accepts array of Inset ("top" | "right" | "bottom" | "left")

#### Scenario: Default values

- **WHEN** Container is rendered without props
- **THEN** maxWidth defaults to "lg" (1024px)
- **AND** centered defaults to true
- **AND** insets defaults to empty array
- **AND** padding defaults to theme.component.container.padding (16px)

### Requirement: Max Width Presets

Container SHALL support 4 max-width presets for different content types.

#### Scenario: Small preset

- **WHEN** maxWidth is "sm"
- **THEN** maxWidth uses theme.component.container.maxWidth.sm (640px)
- **AND** suitable for forms and narrow content

#### Scenario: Medium preset

- **WHEN** maxWidth is "md"
- **THEN** maxWidth uses theme.component.container.maxWidth.md (768px)
- **AND** suitable for articles and reading content

#### Scenario: Large preset (default)

- **WHEN** maxWidth is "lg" or unspecified
- **THEN** maxWidth uses theme.component.container.maxWidth.lg (1024px)
- **AND** suitable for most standard layouts

#### Scenario: Extra large preset

- **WHEN** maxWidth is "xl"
- **THEN** maxWidth uses theme.component.container.maxWidth.xl (1280px)
- **AND** suitable for dashboards and data-rich displays

#### Scenario: Custom numeric width

- **WHEN** maxWidth is a number (e.g., 900)
- **THEN** maxWidth uses the exact pixel value provided
- **AND** bypasses preset lookup

### Requirement: Layout Behavior

Container SHALL provide consistent layout constraints and centering.

#### Scenario: Width constraints

- **WHEN** Container renders
- **THEN** width is set to "100%" via baseStyles
- **AND** maxWidth constrains the maximum width
- **AND** flex is set to 1 for proper layout participation

#### Scenario: Centered alignment

- **WHEN** centered is true (default)
- **THEN** alignSelf is set to "center"
- **AND** Container is horizontally centered within its parent

#### Scenario: Non-centered alignment

- **WHEN** centered is false
- **THEN** alignSelf is not set to "center"
- **AND** Container aligns to its default position (typically left)

#### Scenario: Horizontal padding

- **WHEN** padding prop is not provided
- **THEN** paddingHorizontal uses theme.component.container.padding (16px)
- **AND** content is prevented from touching screen edges

#### Scenario: Custom padding

- **WHEN** padding prop is provided (e.g., 24)
- **THEN** paddingHorizontal uses the provided value
- **AND** overrides the theme default

### Requirement: Safe Area Insets

Container SHALL support safe area inset padding for edge-to-edge layouts.

#### Scenario: No insets by default

- **WHEN** insets prop is empty array or not provided
- **THEN** no safe area padding is applied
- **AND** content does not account for device notches or home indicators

#### Scenario: Top inset

- **WHEN** insets array includes "top"
- **THEN** paddingTop is set to useSafeAreaInsets().top
- **AND** content avoids the device notch area

#### Scenario: Bottom inset

- **WHEN** insets array includes "bottom"
- **THEN** paddingBottom is set to useSafeAreaInsets().bottom
- **AND** content avoids the home indicator area

#### Scenario: Left inset

- **WHEN** insets array includes "left"
- **THEN** paddingLeft is set to useSafeAreaInsets().left
- **AND** content avoids left edge safe area

#### Scenario: Right inset

- **WHEN** insets array includes "right"
- **THEN** paddingRight is set to useSafeAreaInsets().right
- **AND** content avoids right edge safe area

#### Scenario: Multiple insets

- **WHEN** insets array includes multiple values (e.g., ["top", "bottom"])
- **THEN** corresponding safe area padding is applied for each
- **AND** insets combine correctly with other padding

### Requirement: Three-Tier Theme Integration

Container SHALL use the three-tier theme token system for all styling.

#### Scenario: Theme token access

- **WHEN** Container renders
- **THEN** useTheme() hook provides theme and colorScheme
- **AND** component tokens accessed via theme.component.container
- **AND** maxWidth presets accessed via theme.component.container.maxWidth[preset]
- **AND** default padding accessed via theme.component.container.padding

#### Scenario: Theme file structure

- **WHEN** Container.theme.ts is loaded
- **THEN** it imports primitive tokens from "../theme/tokens/primitive"
- **AND** exports container object with maxWidth presets and padding
- **AND** maxWidth object contains sm (640), md (768), lg (1024), xl (1280)
- **AND** padding uses primitive.spacing[4] (16px)
- **AND** uses "as const" for type safety

#### Scenario: Background color

- **WHEN** Container renders
- **THEN** backgroundColor uses theme.semantic.colors.surface.primary
- **AND** adapts to light/dark color scheme

### Requirement: Style Merging

Container SHALL support custom style overrides through the style prop.

#### Scenario: Style merge order

- **WHEN** custom style prop is provided
- **THEN** styles merge in order: baseStyles.container, theme-derived (maxWidth, paddingHorizontal, backgroundColor), insetPadding, centered style, user style
- **AND** user styles have highest priority (override all others)

#### Scenario: Base styles

- **WHEN** Container renders
- **THEN** baseStyles.container applies flex: 1 and width: "100%"
- **AND** baseStyles.centered applies alignSelf: "center" when centered=true

#### Scenario: Custom styling example

- **WHEN** style={{ marginTop: 20 }} is passed
- **THEN** marginTop of 20 is applied
- **AND** other styles remain intact

### Requirement: Accessibility

Container SHALL meet accessibility standards as a layout component.

#### Scenario: ViewProps forwarding

- **WHEN** testID or other ViewProps are provided
- **THEN** props are forwarded to the root View element
- **AND** testID is accessible for testing

#### Scenario: Accessibility attributes

- **WHEN** accessibilityLabel is provided
- **THEN** label is applied to the View
- **AND** screen readers can identify the container

#### Scenario: Layout semantics

- **WHEN** Container is rendered
- **THEN** no specific accessibilityRole is set (inherits View default)
- **AND** content within Container remains accessible to assistive technologies

### Requirement: Testing Coverage

Container SHALL have comprehensive test coverage for all functionality.

#### Scenario: Render tests

- **WHEN** tests execute
- **THEN** tests verify children render correctly
- **AND** tests verify Container renders without children

#### Scenario: Max width tests

- **WHEN** tests execute
- **THEN** tests verify lg maxWidth by default (1024px)
- **AND** tests verify sm maxWidth preset (640px)
- **AND** tests verify md maxWidth preset (768px)
- **AND** tests verify xl maxWidth preset (1280px)
- **AND** tests verify custom numeric maxWidth (e.g., 900)

#### Scenario: Padding tests

- **WHEN** tests execute
- **THEN** tests verify default padding of 16px
- **AND** tests verify custom padding (e.g., 24)

#### Scenario: Alignment tests

- **WHEN** tests execute
- **THEN** tests verify centered alignment by default (alignSelf: center)
- **AND** tests verify non-centered when centered=false
- **AND** tests verify width 100% by default

#### Scenario: Style merge tests

- **WHEN** tests execute
- **THEN** tests verify custom style prop merges correctly
- **AND** tests verify all props combine correctly
- **AND** tests verify ViewProps (testID) are forwarded

### Requirement: Documentation

Container SHALL include MDX documentation with usage examples.

#### Scenario: Documentation content

- **WHEN** README.mdx is rendered
- **THEN** description explains component as centered max-width wrapper
- **AND** basic usage example is demonstrated
- **AND** all 4 max-width presets are demonstrated
- **AND** custom max-width is demonstrated
- **AND** padding customization is demonstrated
- **AND** alignment control is demonstrated

#### Scenario: Complex examples

- **WHEN** documentation is viewed
- **THEN** nested containers example is provided
- **AND** article layout example is provided
- **AND** dashboard layout example is provided
- **AND** form container example is provided
- **AND** full page layout example is provided

#### Scenario: Code examples

- **WHEN** Usage Examples section is viewed
- **THEN** basic container example is provided
- **AND** small container for forms example is provided
- **AND** wide dashboard container example is provided
- **AND** custom width container example is provided
- **AND** full page layout example is provided

#### Scenario: Props documentation

- **WHEN** Props section is viewed
- **THEN** children prop is documented as ReactNode
- **AND** maxWidth prop is documented with all 4 presets and number option
- **AND** padding prop is documented with default of 16
- **AND** centered prop is documented with default of true
- **AND** style prop is documented for custom styles
- **AND** ViewProps spreading is documented

### Requirement: Examples

Container SHALL include example components demonstrating real-world usage patterns.

#### Scenario: Dashboard layout example

- **WHEN** DashboardLayoutExample is rendered
- **THEN** demonstrates xl maxWidth for wide dashboard
- **AND** shows metric cards with revenue and user stats
- **AND** uses Stack and Card components for composition

#### Scenario: Form container example

- **WHEN** FormContainerExample is rendered
- **THEN** demonstrates sm maxWidth for focused forms
- **AND** shows account creation form layout
- **AND** uses Card and Stack for form structure

#### Scenario: Full page layout example

- **WHEN** FullPageLayoutExample is rendered
- **THEN** demonstrates lg maxWidth for standard pages
- **AND** shows header, content, and footer sections
- **AND** uses Card and Typography for content hierarchy
