# Typography Component Specification

The Typography component is the foundational text rendering component for the morph-ui library. It provides 11 iOS-inspired typography variants following Apple Human Interface Guidelines, enabling consistent and accessible text styling across the entire component library.

## ADDED Requirements

### Requirement: Component Structure

Typography SHALL wrap React Native's Text component with theme-aware styling.

#### Scenario: Default rendering

- **WHEN** Typography is rendered with children
- **THEN** it renders a Text element containing the children
- **AND** applies the body variant by default

#### Scenario: Props passthrough

- **WHEN** Typography receives standard TextProps (numberOfLines, ellipsizeMode, etc.)
- **THEN** those props are passed through to the underlying Text component
- **AND** component functionality is preserved

### Requirement: Typography Variants

Typography SHALL support 11 iOS Human Interface Guidelines-inspired text variants.

#### Scenario: Large Title variant

- **WHEN** variant="large-title" is specified
- **THEN** fontSize is 34pt (primitive.fontSize["5xl"])
- **AND** fontWeight is "400" (regular)
- **AND** lineHeight uses tight multiplier
- **AND** letterSpacing uses tighter value

#### Scenario: Title 1 variant

- **WHEN** variant="title-1" is specified
- **THEN** fontSize is 28pt (primitive.fontSize["4xl"])
- **AND** fontWeight is "400" (regular)
- **AND** lineHeight uses tight multiplier

#### Scenario: Title 2 variant

- **WHEN** variant="title-2" is specified
- **THEN** fontSize is 22pt (primitive.fontSize["3xl"])
- **AND** fontWeight is "400" (regular)
- **AND** lineHeight uses normal multiplier

#### Scenario: Title 3 variant

- **WHEN** variant="title-3" is specified
- **THEN** fontSize is 20pt (primitive.fontSize["2xl"])
- **AND** fontWeight is "400" (regular)
- **AND** lineHeight uses normal multiplier

#### Scenario: Heading variant

- **WHEN** variant="heading" is specified
- **THEN** fontSize is 17pt (primitive.fontSize.xl)
- **AND** fontWeight is "600" (semibold)
- **AND** lineHeight uses normal multiplier

#### Scenario: Body variant (default)

- **WHEN** variant="body" is specified or no variant is provided
- **THEN** fontSize is 17pt (primitive.fontSize.xl)
- **AND** fontWeight is "400" (regular)
- **AND** lineHeight uses relaxed multiplier

#### Scenario: Callout variant

- **WHEN** variant="callout" is specified
- **THEN** fontSize is 16pt (primitive.fontSize.lg)
- **AND** fontWeight is "400" (regular)
- **AND** lineHeight uses relaxed multiplier

#### Scenario: Subhead variant

- **WHEN** variant="subhead" is specified
- **THEN** fontSize is 15pt (primitive.fontSize.base)
- **AND** fontWeight is "400" (regular)
- **AND** lineHeight uses relaxed multiplier

#### Scenario: Footnote variant

- **WHEN** variant="footnote" is specified
- **THEN** fontSize is 13pt (primitive.fontSize.md)
- **AND** fontWeight is "400" (regular)
- **AND** lineHeight uses normal multiplier

#### Scenario: Caption 1 variant

- **WHEN** variant="caption-1" is specified
- **THEN** fontSize is 12pt (primitive.fontSize.sm)
- **AND** fontWeight is "400" (regular)
- **AND** lineHeight uses normal multiplier

#### Scenario: Caption 2 variant

- **WHEN** variant="caption-2" is specified
- **THEN** fontSize is 11pt (primitive.fontSize.xs)
- **AND** fontWeight is "400" (regular)
- **AND** letterSpacing uses wide value

### Requirement: Three-Tier Theme Integration

Typography SHALL use the three-tier theme token system for all styling.

#### Scenario: Semantic text style access

- **WHEN** Typography renders with a variant
- **THEN** it retrieves the text style from theme.semantic.textStyles
- **AND** applies fontSize, fontWeight, lineHeight, letterSpacing, and fontFamily from the semantic token

#### Scenario: Component token for color

- **WHEN** Typography renders in light mode
- **THEN** text color is theme.component.typography.variant.light.text
- **AND** maps to semantic light.text.primary token

#### Scenario: Dark mode color adaptation

- **WHEN** Typography renders in dark mode
- **THEN** text color is theme.component.typography.variant.dark.text
- **AND** maps to semantic dark.text.primary token

#### Scenario: Theme hook usage

- **WHEN** Typography component mounts
- **THEN** it calls useTheme() to access theme and colorScheme
- **AND** uses colorScheme to select correct color variant

### Requirement: Style Merge Pattern

Typography SHALL follow the standard style merge pattern for customization.

#### Scenario: Style merge order

- **WHEN** Typography receives a custom style prop
- **THEN** styles are merged in order: [textStyle, themeColor, customStyle]
- **AND** custom style has highest priority and can override any default

#### Scenario: Color override

- **WHEN** style={{ color: "blue" }} is passed
- **THEN** the text renders with blue color
- **AND** theme color is overridden

#### Scenario: Multiple style properties

- **WHEN** custom style contains multiple properties
- **THEN** all custom properties are applied
- **AND** non-overridden theme properties are preserved

### Requirement: Accessibility

Typography SHALL support accessible text rendering following WCAG AA standards.

#### Scenario: Accessibility role passthrough

- **WHEN** accessibilityRole="header" is specified
- **THEN** the Text component receives accessibilityRole="header"
- **AND** screen readers announce it as a heading

#### Scenario: Accessibility label support

- **WHEN** accessibilityLabel is specified
- **THEN** the Text component receives the accessibilityLabel
- **AND** screen readers use the label for announcement

#### Scenario: Color contrast compliance

- **WHEN** Typography uses theme text colors
- **THEN** light mode uses #111827 (neutral[900])
- **AND** dark mode provides sufficient contrast against dark backgrounds
- **AND** both meet WCAG AA minimum contrast ratio of 4.5:1

### Requirement: Testing Coverage

Typography SHALL have comprehensive test coverage for all variants and behaviors.

#### Scenario: Children rendering test

- **WHEN** test renders Typography with "Hello World" children
- **THEN** getByText("Hello World") returns truthy
- **AND** text content is visible

#### Scenario: Default variant test

- **WHEN** test renders Typography without variant prop
- **THEN** body variant styles are applied
- **AND** fontSize is 17, fontWeight is "400"

#### Scenario: Variant-specific tests

- **WHEN** test renders Typography with each variant
- **THEN** correct fontSize and fontWeight are applied
- **AND** test verifies via StyleSheet.flatten()

#### Scenario: Style merge test

- **WHEN** test renders Typography with custom style
- **THEN** custom style overrides theme defaults
- **AND** test verifies color override works

#### Scenario: TextProps passthrough test

- **WHEN** test renders Typography with numberOfLines={1}
- **THEN** element.props.numberOfLines equals 1
- **AND** TextProps are preserved

#### Scenario: Accessibility props test

- **WHEN** test renders Typography with accessibilityRole and accessibilityLabel
- **THEN** element.props contain the accessibility values
- **AND** accessibility is testable

### Requirement: Documentation

Typography SHALL have comprehensive MDX documentation with live examples.

#### Scenario: Component description

- **WHEN** README.mdx is rendered
- **THEN** it displays component description mentioning 11 iOS-inspired variants
- **AND** explains the iOS Human Interface Guidelines typography scale

#### Scenario: Variant showcase

- **WHEN** documentation Variants section is viewed
- **THEN** all 11 variants are displayed with their font sizes
- **AND** users can see the visual hierarchy

#### Scenario: Props table

- **WHEN** Props section is viewed
- **THEN** variant, children, style, and ...props are documented
- **AND** types and defaults are shown

#### Scenario: Live examples

- **WHEN** documentation is rendered in demo app
- **THEN** Typography examples render inline
- **AND** users can see actual component output
