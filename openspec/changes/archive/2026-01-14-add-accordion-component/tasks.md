## 1. Theme System

- [x] 1.1 Create Accordion.theme.ts with primitive token imports
- [x] 1.2 Define padding using primitive.spacing[4]
- [x] 1.3 Define gap using primitive.spacing[3]
- [x] 1.4 Define borderRadius using primitive.borderRadius.md
- [x] 1.5 Define iconSize as 20 pixels
- [x] 1.6 Define header.fontSize and header.fontWeight
- [x] 1.7 Define duration using primitive.duration.normal
- [x] 1.8 Define light/dark variant colors for header (background, text, border, icon, pressed)
- [x] 1.9 Define light/dark variant colors for content (background, text, border)
- [x] 1.10 Define disabled state with opacity from primitive.opacity.disabled
- [x] 1.11 Export theme with `as const` for type safety
- [x] 1.12 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [x] 2.1 Create Accordion.tsx with AccordionProps and AccordionItemProps TypeScript interfaces
- [x] 2.2 Create AccordionContext with value, onValueChange, type, collapsible, disabled
- [x] 2.3 Create useAccordionContext hook with error for orphan items
- [x] 2.4 Implement Accordion container with AccordionContext.Provider
- [x] 2.5 Implement useTheme() hook for theme access
- [x] 2.6 Apply gap styling from theme.component.accordion.gap
- [x] 2.7 Spread ViewProps to container View
- [x] 2.8 Implement AccordionItem with expansion logic
- [x] 2.9 Implement isExpanded calculation for single and multiple modes
- [x] 2.10 Implement handlePress with collapsible logic
- [x] 2.11 Use Typography component for header title
- [x] 2.12 Create ChevronIcon component with rotation animation
- [x] 2.13 Implement Animated.timing for chevron rotation
- [x] 2.14 Implement LayoutAnimation for content height (native only)
- [x] 2.15 Apply variant colors from theme based on colorScheme
- [x] 2.16 Implement pressed state visual feedback
- [x] 2.17 Implement disabled state with opacity and interaction prevention
- [x] 2.18 Add accessibility props (role: button, state: expanded/disabled, label)
- [x] 2.19 Implement style merge pattern for both components

## 3. Testing

- [x] 3.1 Create Accordion.test.tsx with render and fireEvent from test-utils
- [x] 3.2 Test children rendering in Accordion container
- [x] 3.3 Test value context in single mode
- [x] 3.4 Test single mode only one item open at a time
- [x] 3.5 Test multiple mode multiple items can be open
- [x] 3.6 Test onValueChange when item pressed in single mode
- [x] 3.7 Test onValueChange with array in multiple mode
- [x] 3.8 Test toggles item off in multiple mode
- [x] 3.9 Test disables all items when container disabled
- [x] 3.10 Test collapsible mode allows closing only open item
- [x] 3.11 Test non-collapsible mode keeps item open
- [x] 3.12 Test defaults to single type
- [x] 3.13 Test defaults to collapsible true
- [x] 3.14 Test forwards ViewProps on Accordion
- [x] 3.15 Test applies custom styles on Accordion
- [x] 3.16 Test AccordionItem renders title
- [x] 3.17 Test AccordionItem expands when value matches in single mode
- [x] 3.18 Test AccordionItem collapses when value does not match
- [x] 3.19 Test AccordionItem expands when value in array in multiple mode
- [x] 3.20 Test AccordionItem collapses when value not in array
- [x] 3.21 Test AccordionItem renders children when expanded
- [x] 3.22 Test AccordionItem does not render children when collapsed
- [x] 3.23 Test AccordionItem calls onValueChange when pressed
- [x] 3.24 Test AccordionItem can be individually disabled
- [x] 3.25 Test AccordionItem applies container disabled state
- [x] 3.26 Test AccordionItem has button role with expanded state
- [x] 3.27 Test AccordionItem forwards ViewProps
- [x] 3.28 Test AccordionItem applies custom styles
- [x] 3.29 Test AccordionItem throws error when used outside Accordion
- [x] 3.30 Test integration: switches content when item pressed
- [x] 3.31 Test integration: works with multiple items open

## 4. Examples

- [x] 4.1 Create examples/ directory
- [x] 4.2 Create BasicExample.tsx with single mode FAQ usage
- [x] 4.3 Create MultipleExample.tsx with settings sections
- [x] 4.4 Create FAQExample.tsx with realistic FAQ content
- [x] 4.5 Create examples/index.ts barrel export

## 5. Documentation

- [x] 5.1 Create README.mdx with component description
- [x] 5.2 Import examples and components at top
- [x] 5.3 Add Basic Usage (Single Mode) section with BasicExample
- [x] 5.4 Add Multiple Mode section with MultipleExample
- [x] 5.5 Add Collapsible Mode section with collapsible={true} and collapsible={false} examples
- [x] 5.6 Add Disabled State section with individual and all items disabled examples
- [x] 5.7 Add FAQ Example section with FAQExample
- [x] 5.8 Add Accordion Props table with type, default, description
- [x] 5.9 Add AccordionItem Props table with type, default, description
- [x] 5.10 Add Usage Examples section with code samples

## 6. Metadata

- [x] 6.1 Create meta.json with type: "react-native"
- [x] 6.2 Add name: "accordion"
- [x] 6.3 Add description: "Collapsible content sections with expand/collapse animation"
- [x] 6.4 Add dependencies array (empty - no component dependencies)
- [x] 6.5 Create index.ts barrel export (Accordion, AccordionItem, AccordionProps, AccordionItemProps)

## 7. Registry Generation

- [x] 7.1 Component registered in registry.json
- [x] 7.2 Component documentation registered in docs-registry.ts
- [x] 7.3 Component exported from index.ts barrel

## 8. Verification

- [x] 8.1 Code formatted with Prettier
- [x] 8.2 TypeScript type checking passes (zero errors)
- [x] 8.3 ESLint passes (zero warnings)
- [x] 8.4 All 34 tests pass
- [x] 8.5 Component appears in demo app sidebar
- [x] 8.6 Documentation loads correctly in demo app
