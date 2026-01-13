---
name: create-component
description: Creates React Native components for the morph-ui component library following the three-tier theme system and established patterns. Use when user asks to "create a component", "make a component", "add a component", "build a component", or mentions creating React Native UI components.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Create React Native Component

## OpenSpec Integration

This skill follows a **spec-driven development workflow** using OpenSpec. Every new component requires:

1. **Proposal Creation** - OpenSpec proposal with requirements and scenarios
2. **User Approval** - Explicit approval before implementation begins
3. **Implementation** - Follow tasks.md checklist
4. **Archiving** - Archive change after merge (user triggers)

### Three-Phase Workflow

**Phase 1: Proposal Creation (Automatic)**

- Create change proposal: `openspec/changes/add-[component-name]-component/`
- Write `proposal.md` (why, what, impact)
- Write `specs/[component-name]/spec.md` (requirements with scenarios)
- Write `tasks.md` (8-section implementation checklist)
- Validate: `openspec validate add-[component-name]-component --strict`
- **CRITICAL GATE**: Wait for user approval

**Phase 2: Implementation (After Approval)**

- Follow tasks.md sequentially
- Create all component files
- Update checkboxes as tasks complete
- Run verification (format, type-check, lint, test)

**Phase 3: Archiving (User Triggers After Merge)**

- User runs: `openspec archive add-[component-name]-component --yes`
- Spec moves to `openspec/specs/[component-name]/spec.md`
- Component added to official catalog

### OpenSpec File Structure

Each component proposal creates:

```
openspec/changes/add-[component-name]-component/
├── proposal.md              # Why, what changes, impact
├── tasks.md                 # Implementation checklist (8 sections)
└── specs/[component-name]/  # Component specification
    └── spec.md              # Requirements with scenarios
```

After archiving:

```
openspec/specs/[component-name]/
└── spec.md                  # Final specification
```

## Overview

This skill creates complete React Native components for the morph-ui component library following:

- **Three-tier theme system**: Primitive → Semantic → Component tokens
- **shadcn/ui philosophy**: Copy-paste friendly, customizable via theme
- **Full TypeScript support**: Strong typing for components and theme tokens
- **WCAG AA compliance**: Accessible by default
- **Comprehensive testing**: Jest tests for all components

## Quick Start

To create a new component:

1. **Ask**: "Create a [ComponentName] component"
2. **I'll create OpenSpec proposal** with requirements and scenarios
3. **I'll wait for your approval** before implementation
4. **I'll use scaffdog** to automatically generate all 7 required files:
   - Component.tsx, Component.theme.ts, Component.test.tsx
   - index.ts, meta.json, README.mdx, examples/
5. **I'll refine the generated code** with real implementation
6. **I'll run verification**: Format, type-check, lint, test

## Scaffdog Integration

### Overview

Scaffdog automates the creation of boilerplate files during Phase 2 (Implementation). It generates all 7 required files based on the approved OpenSpec proposal, significantly reducing manual work and ensuring consistency.

### When to Use Scaffdog

Use scaffdog in **Phase 2: Implementation** after:

- OpenSpec proposal is approved by user
- Spec.md defines requirements clearly
- Component variants, sizes, and features are known

**Time savings**: ~70% reduction in boilerplate creation time.

### Extracting Requirements from Spec

Read the approved `openspec/changes/add-[component-name]-component/specs/[component-name]/spec.md` file to extract configuration:

**Component Name**: From spec filename and title

**Description**: From "Why" section in proposal.md

**Variants**: Parse "Requirement: Variants" section

- Example: "Button SHALL provide 4 visual style variants: primary, secondary, tonal, plain."
- Extract: `primary, secondary, tonal, plain`

**Sizes**: Parse "Requirement: Sizes" section

- Example: "Button SHALL support 3 sizes: sm (small), md (medium), lg (large)."
- Extract: `sm, md, lg`

**Base Component**: Infer from requirements:

- Interactive behavior (onPress, tappable) → `Pressable`
- Text input (keyboard, validation) → `TextInput`
- Scrollable content → `ScrollView`
- Default container → `View`

**Feature Flags**:

- `hasIcons`: Check for "icon" in requirements
- `hasLoading`: Check for "loading state" in requirements
- `hasDisabled`: Check for "disabled state" in requirements
- `needsForwardRef`: Check for "ref" or "imperative" in requirements

### Scaffolding Command

**Programmatic Mode** (recommended for agents):

```bash
bun run scaffold:component '{
  "name": "ComponentName",
  "description": "Brief description from spec",
  "baseComponent": "View",
  "hasVariants": true,
  "variants": "primary, secondary",
  "hasSizes": true,
  "sizes": "sm, md, lg",
  "needsForwardRef": false,
  "hasIcons": true,
  "hasLoading": false,
  "hasDisabled": true
}'
```

**JSON Structure**:

```typescript
interface ComponentConfig {
  name: string; // Required: Component name (any case)
  description: string; // Required: Brief description
  baseComponent: "View" | "Pressable" | "TextInput" | "ScrollView"; // Required
  hasVariants: boolean; // Required: Does component have variants?
  variants?: string; // Optional: Only if hasVariants=true
  hasSizes: boolean; // Required: Does component have sizes?
  sizes?: string; // Optional: Only if hasSizes=true
  needsForwardRef: boolean; // Required: Use forwardRef pattern?
  hasIcons: boolean; // Required: Support icons?
  hasLoading: boolean; // Required: Has loading state?
  hasDisabled: boolean; // Required: Has disabled state?
  dependencies?: string; // Optional: Comma-separated deps
}
```

**Conditional Properties Rule**: Only include `variants` property if `hasVariants: true`, only include `sizes` if `hasSizes: true`.

### What Scaffdog Generates

Running the command automatically creates all 7 required files:

1. `ComponentName.tsx` - React component with useTheme hook
2. `ComponentName.theme.ts` - Theme tokens with `as const`
3. `ComponentName.test.tsx` - Jest test structure
4. `index.ts` - Module exports
5. `meta.json` - Component metadata
6. `README.mdx` - MDX documentation structure
7. `examples/BasicExample.tsx` - Basic usage example

**Plus automatic post-processing**:

- Updates `src/theme/tokens/components.ts` with theme export
- Regenerates all registries (registry.json, docs-registry.ts, index.ts)
- Formats all generated code with Prettier

### Post-Scaffolding Steps

After scaffold generation completes:

1. **Refine generated code**:
   - **Theme tokens**: Adjust colors, sizes, spacing to match design system
   - **Component logic**: Implement spec requirements (animations, complex state)
   - **Tests**: Add scenario-based tests from spec.md (scaffdog only creates structure)
   - **README**: Enhance examples with realistic use cases
   - **Accessibility**: Add proper ARIA props beyond basic scaffolding

2. **Update tasks.md**:
   Mark scaffolded tasks complete:

   ```markdown
   - [x] 1.1 Create ComponentName.theme.ts
   - [x] 1.2 Define size tokens
   - [x] 1.3 Define variant tokens (light)
   - [x] 1.4 Define variant tokens (dark)
   - [x] 1.5 Export theme with as const
   - [x] 2.1 Create ComponentName.tsx
   - [x] 2.2 Define Props interface
   - [x] 2.3 Implement component function
   - [ ] 2.4 Add animations (manual refinement needed)
   - [ ] 2.5 Add gesture handling (manual refinement needed)
         ...
   ```

3. **Run verification**:
   ```bash
   bun run check-types  # Must pass
   bun run lint         # Must pass
   bun run format       # Auto-fix
   bun run test         # Must pass
   ```

### Scaffolding Examples

**Example 1: Simple Component (No Variants, No Sizes)**

Component: Divider (horizontal line)

```bash
bun run scaffold:component '{
  "name": "Divider",
  "description": "Visual separator line between content sections",
  "baseComponent": "View",
  "hasVariants": false,
  "hasSizes": false,
  "needsForwardRef": false,
  "hasIcons": false,
  "hasLoading": false,
  "hasDisabled": false
}'
```

**Example 2: Interactive Component (Variants + Sizes + Icons + Loading)**

Component: Button

```bash
bun run scaffold:component '{
  "name": "Button",
  "description": "Pressable button with variants, sizes, icons, and loading states",
  "baseComponent": "Pressable",
  "hasVariants": true,
  "variants": "primary, secondary, tonal, plain",
  "hasSizes": true,
  "sizes": "sm, md, lg",
  "needsForwardRef": false,
  "hasIcons": true,
  "hasLoading": true,
  "hasDisabled": true
}'
```

**Example 3: Input Component (ForwardRef + TextInput)**

Component: Input

```bash
bun run scaffold:component '{
  "name": "Input",
  "description": "Text input field with label, error states, and validation",
  "baseComponent": "TextInput",
  "hasVariants": true,
  "variants": "outline, filled",
  "hasSizes": true,
  "sizes": "sm, md, lg",
  "needsForwardRef": true,
  "hasIcons": true,
  "hasLoading": false,
  "hasDisabled": true
}'
```

### Scaffdog Limitations

Scaffdog generates **structure**, not **complete implementation**. You MUST:

✅ **Scaffdog provides**: File structure, imports, basic types, theme skeleton, test structure

❌ **You must add**: Complex logic, animations, gestures, comprehensive tests, WCAG compliance

**Common manual refinements**:

1. Theme tokens accuracy (scaffdog uses generic mappings)
2. Complex interactions (drag, swipe, animations)
3. Compound components (Accordion.Item, Tabs.Tab)
4. Comprehensive test scenarios (scaffdog only creates render test)
5. Real README examples (scaffdog creates placeholders)
6. Accessibility enhancements (ARIA labels, roles, state)

### Updated Phase 2 Workflow

**Old (Manual)**:

1. Create ComponentName.tsx manually
2. Create ComponentName.theme.ts manually
3. Create ComponentName.test.tsx manually
4. Create index.ts, meta.json, README.mdx manually
5. Create examples/ manually
6. Run `bun run generate`

**New (With Scaffdog)**:

1. Extract requirements from approved spec.md
2. Construct scaffdog JSON configuration from requirements
3. Run: `bun run scaffold:component '<json>'` (auto-generates 7 files + runs registry generation + formats code)
4. Refine generated code (theme, logic, tests, docs)
5. Run verification (type-check, lint, format, test)

**Time savings**: ~70% reduction in boilerplate creation time.

### Programmatic Usage for Agents

All coding agents should construct the JSON configuration programmatically:

```typescript
// Build configuration from spec.md
const config = {
  name: extractComponentName(spec),
  description: extractDescription(spec),
  baseComponent: inferBaseComponent(spec),
  hasVariants: hasRequirement(spec, "Variants"),
  variants: hasRequirement(spec, "Variants")
    ? extractVariants(spec)
    : undefined,
  hasSizes: hasRequirement(spec, "Sizes"),
  sizes: hasRequirement(spec, "Sizes") ? extractSizes(spec) : undefined,
  needsForwardRef:
    hasRequirement(spec, "ref") || hasRequirement(spec, "imperative"),
  hasIcons: hasRequirement(spec, "icon"),
  hasLoading: hasRequirement(spec, "loading"),
  hasDisabled: hasRequirement(spec, "disabled"),
};

// Remove undefined properties
Object.keys(config).forEach(
  (key) => config[key] === undefined && delete config[key],
);

// Execute scaffolding
execSync(`bun run scaffold:component '${JSON.stringify(config)}'`, {
  stdio: "inherit",
});
```

**Benefits**:

- Single command runs scaffdog + registry generation + formatting
- JSON is easier to construct programmatically than CLI flags
- No need to escape quotes or handle shell parsing
- Built-in error handling and validation

## Component Creation Workflow

This skill implements a **three-phase spec-driven workflow** with OpenSpec integration:

### Phase 1: Proposal Creation

**Step 1.1: Gather Requirements**

I'll ask you about:

- **Variants**: What style variations? (e.g., primary, secondary, outline)
- **Sizes**: What size options? (sm, md, lg)
- **Features**: Special functionality? (icons, loading states, etc.)
- **Base component**: Extends View, Pressable, TextInput, etc.?

**Step 1.2: Create OpenSpec Proposal**

Create change directory:

```
openspec/changes/add-[component-name]-component/
```

**Step 1.3: Write proposal.md**

```markdown
# Change: Add [ComponentName] Component

## Why

[1-2 sentences explaining user need for this component]

## What Changes

- Add new [ComponentName] component with [X] variants and [Y] sizes
- Implement [key features]
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `[component-name]` (new spec)
- Affected code:
  - `packages/react-native/src/[component-name]/` (new directory)
  - `packages/react-native/src/theme/tokens/components.ts` (export theme)
  - `packages/react-native/src/index.ts` (export component)
  - `packages/react-native/src/docs-registry.ts` (register docs)
  - `packages/react-native/src/registry.json` (add metadata)
```

**Step 1.4: Write specs/[component-name]/spec.md**

See "OpenSpec Proposal Structure" section below for detailed requirement patterns and scenario templates.

**Step 1.5: Write tasks.md**

See "OpenSpec Proposal Structure" section below for complete tasks.md template.

**Step 1.6: Validate Proposal**

Run validation:

```bash
openspec validate add-[component-name]-component --strict
```

Fix any errors (common issues: missing scenarios, wrong format).

**Step 1.7: Wait for User Approval**

**CRITICAL GATE**: Present proposal summary to user. Do NOT proceed to implementation until approved.

### Phase 2: Implementation (After Approval)

**Step 2.1: Read Proposal Files**

- Read proposal.md to understand requirements
- Read spec.md to understand what must be built
- Read tasks.md to get implementation roadmap

**Step 2.2: Generate Component Scaffolding**

Use scaffdog to automatically generate all 7 required files (see "Scaffdog Integration" section above):

1. Extract requirements from spec.md (variants, sizes, features)
2. Construct JSON configuration
3. Run: `bun run scaffold:component '<json>'`
4. Verify all files generated successfully

This creates the component structure, theme file, test file, documentation, and automatically updates all registries.

**Step 2.3: Refine Theme Tokens**

After scaffolding, customize `Component.theme.ts` with the three-tier system:

```typescript
import * as primitive from "../theme/tokens/primitive";
import { light, dark } from "../theme/tokens/semantic/colors";

export const componentName = {
  // Size tokens (primitive-based)
  size: {
    sm: { height: primitive.spacing[8], padding: primitive.spacing[2] },
    md: { height: primitive.spacing[11], padding: primitive.spacing[3] },
    lg: { height: primitive.spacing[12], padding: primitive.spacing[4] },
  },

  // Variant tokens (semantic colors, light/dark)
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        text: light.text.inverse,
        border: light.border.primary,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        text: dark.text.inverse,
        border: dark.border.primary,
      },
    },
  },
} as const;
```

See [theme-system.md](references/theme-system.md) for complete theme patterns.

**Step 2.4: Refine Component Implementation**

Scaffdog generates the basic component structure. Enhance it with spec requirements:

```typescript
import { useTheme } from "../theme";
import { Typography } from "../typography";

export const Component = ({ variant = "primary", size = "md", style }) => {
  const { theme, colorScheme } = useTheme();

  const variantTokens = theme.component.componentName.variant[colorScheme][variant];
  const sizeTokens = theme.component.componentName.size[size];

  return (
    <View
      style={[
        baseStyles.container,
        {
          backgroundColor: variantTokens.background,
          height: sizeTokens.height,
          padding: sizeTokens.padding,
        },
        style, // User overrides (highest priority)
      ]}
    >
      <Typography variant="body" style={{ color: variantTokens.text }}>
        {children}
      </Typography>
    </View>
  );
};
```

See [component-patterns.md](references/component-patterns.md) for detailed patterns.

**Step 2.5: Enhance Supporting Files**

Scaffdog generates all required files. Enhance them with real content:

**Component.test.tsx** - Add comprehensive tests:

- Test all variants with correct tokens
- Test all sizes with correct tokens
- Test event handlers (onPress, onChange, etc.)
- Test disabled state behavior
- Test style merging (user overrides work)
- Test accessibility props

**README.mdx** - Enhance documentation:

- Add realistic usage examples
- Document all props with descriptions
- Add accessibility guidance
- Add theme customization examples
- Link to related components

**examples/** - Create additional examples:

- `VariantsExample.tsx` (if component has variants)
- `SizesExample.tsx` (if component has sizes)
- `InteractiveExample.tsx` (if component is stateful)
- Update `examples/index.ts` to export all examples

See [file-structure.md](references/file-structure.md) for complete file specifications.

**Note**: Registries are already updated by scaffdog. DO NOT manually edit:

- `src/registry.json`
- `src/docs-registry.ts`
- `src/index.ts`

**Step 2.6: Update tasks.md Checkboxes**

Mark tasks as complete `- [x]` as you finish each one. Many tasks will be marked complete after scaffolding. Track progress through all 8 sections.

**Step 2.7: Verification**

Follow tasks.md section 8 to run all checks:

```bash
bun run format                                  # Prettier
bun run check-types --filter=@morph-ui/react-native  # TypeScript
bun run lint --filter=@morph-ui/react-native         # ESLint
bun run test --filter=@morph-ui/react-native         # Jest
```

All checks must pass before the component is complete.

### Phase 3: Archiving (User Triggers After Merge)

After the component is merged to main:

**Step 3.1: Verify Completion**

- [ ] All tasks.md checkboxes marked `- [x]`
- [ ] All verification checks passing
- [ ] Component visible in demo app
- [ ] Documentation loads correctly

**Step 3.2: Archive Proposal (User Command)**

User runs:

```bash
openspec archive add-[component-name]-component --yes
```

**Step 3.3: Verify Archive**

Confirm spec is discoverable:

```bash
openspec list --specs  # Should show [component-name]
```

**Result:**

- Change moved to `changes/archive/YYYY-MM-DD-add-[component-name]-component/`
- Final spec at `specs/[component-name]/spec.md`
- Component now in official catalog

## OpenSpec Proposal Structure

This section provides complete templates for creating OpenSpec proposals.

### proposal.md Template

```markdown
# Change: Add [ComponentName] Component

## Why

[1-2 sentences explaining user need for this component. Examples:]

- "Users need a themeable, accessible button for all interactive actions"
- "Apps require a flexible input component for text entry with validation"
- "Developers need a card component for grouping related content"

## What Changes

- Add new [ComponentName] component with [N] variants ([list variants])
- Add [M] size options ([list sizes])
- Implement [key features: icons, loading states, disabled state, etc.]
- Include comprehensive tests and MDX documentation
- Register in all 4 registries (theme, package, docs, metadata)

## Impact

- Affected specs: `[component-name]` (new spec)
- Affected code:
  - `packages/react-native/src/[component-name]/` (new directory with 7 files)
  - `packages/react-native/src/theme/tokens/components.ts` (add theme export)
  - `packages/react-native/src/index.ts` (add component export)
  - `packages/react-native/src/docs-registry.ts` (register MDX docs)
  - `packages/react-native/src/registry.json` (add component metadata)
```

### specs/[component-name]/spec.md Template

Complete specification with all requirements:

```markdown
## ADDED Requirements

### Requirement: Component Structure

[ComponentName] SHALL follow the morph-ui component architecture.

#### Scenario: File structure compliance

- **WHEN** component is created
- **THEN** all 7 required files exist (Component.tsx, Component.theme.ts, Component.test.tsx, index.ts, meta.json, README.mdx, examples/)
- **AND** all files pass TypeScript strict mode

### Requirement: Three-Tier Theme Integration

[ComponentName] SHALL use the three-tier theme system for all styling.

#### Scenario: Theme token usage

- **WHEN** component renders
- **THEN** all colors come from semantic tokens (light/dark)
- **AND** all spacing and sizes come from primitive tokens
- **AND** no hardcoded values exist in styles

#### Scenario: Theme switching

- **WHEN** color scheme changes from light to dark
- **THEN** component updates to dark variant tokens
- **AND** all visual elements reflect new theme
- **AND** contrast remains WCAG AA compliant

### Requirement: Typography Integration

[ComponentName] SHALL use Typography component for all text rendering.

#### Scenario: Text rendering

- **WHEN** component displays text content
- **THEN** Typography component is used (never React Native Text)
- **AND** variant prop specifies semantic text style
- **AND** text color comes from theme tokens

### Requirement: Accessibility

[ComponentName] SHALL meet WCAG AA accessibility standards.

#### Scenario: Screen reader support

- **WHEN** component is rendered
- **THEN** accessibilityRole is set appropriately
- **AND** accessibilityLabel provides clear description
- **AND** accessibilityState reflects current state (disabled, selected, etc.)

#### Scenario: Color contrast

- **WHEN** component renders in any variant
- **THEN** text-to-background contrast ratio is at least 4.5:1 for normal text
- **AND** large text (18pt+) has contrast ratio of at least 3:1
- **AND** UI components have contrast ratio of at least 3:1

### Requirement: Testing Coverage

[ComponentName] SHALL have comprehensive Jest test coverage.

#### Scenario: Core functionality tests

- **WHEN** tests run via `bun run test`
- **THEN** all variants are tested for correct rendering
- **AND** all sizes are tested for correct token application
- **AND** event handlers are tested for correct behavior
- **AND** style merging is tested (user overrides work)
- **AND** accessibility props are verified
- **AND** zero test failures occur

### Requirement: Documentation

[ComponentName] SHALL have complete MDX documentation.

#### Scenario: Documentation completeness

- **WHEN** README.mdx is reviewed
- **THEN** basic usage example exists
- **AND** all variants are demonstrated with code
- **AND** props table lists all component props
- **AND** accessibility section explains WCAG compliance
- **AND** theme customization example is provided

[Add component-specific requirements based on type:]

### Requirement: Variants (if component has variants)

[ComponentName] SHALL provide [N] visual style variants: [list variants].

#### Scenario: [Variant name] rendering

- **WHEN** variant="[variant]" is specified
- **THEN** background matches theme.component.[name].variant[colorScheme].[variant].background
- **AND** text color matches [variant].text token
- **AND** border color matches [variant].border token

[Repeat scenario for each variant]

### Requirement: Sizes (if component has sizes)

[ComponentName] SHALL provide [M] size options: [list sizes].

#### Scenario: [Size name] rendering

- **WHEN** size="[size]" is specified
- **THEN** height matches theme.component.[name].size.[size].height
- **AND** padding matches theme.component.[name].size.[size].padding
- **AND** font size comes from size token (if applicable)

[Repeat scenario for each size]

### Requirement: Interactive Behavior (if Pressable-based)

[ComponentName] SHALL respond to user interaction with visual feedback.

#### Scenario: Press state

- **WHEN** user presses the component
- **THEN** background color changes to backgroundPressed token
- **AND** onPress event handler is called with correct arguments
- **AND** visual feedback is immediate (no lag)

#### Scenario: Disabled state

- **WHEN** disabled={true}
- **THEN** component uses disabled variant tokens
- **AND** onPress handler is not called on press
- **AND** opacity is set to theme.primitive.opacity.disabled
- **AND** accessibilityState.disabled is true

### Requirement: State Management (if stateful)

[ComponentName] SHALL manage internal state correctly.

#### Scenario: Value updates

- **WHEN** onChange/onValueChange is called with new value
- **THEN** component re-renders with updated value
- **AND** visual state reflects the new value
- **AND** controlled mode works with value prop

### Requirement: Icon Integration (if supports icons)

[ComponentName] SHALL support icon placement.

#### Scenario: Icon rendering

- **WHEN** icon prop is provided
- **THEN** icon is cloned with theme-aware color
- **AND** icon size matches theme.component.[name].icon.size
- **AND** gap between icon and content matches theme.component.[name].icon.gap

### Requirement: Loading States (if async)

[ComponentName] SHALL display loading state during async operations.

#### Scenario: Loading activation

- **WHEN** loading={true}
- **THEN** Spinner component is displayed
- **AND** component is functionally disabled
- **AND** spinner color matches variant text color
- **AND** original content is hidden
```

### tasks.md Template

Complete implementation checklist (8 sections):

```markdown
## 1. Theme System

- [ ] 1.1 Create Component.theme.ts with primitive token imports
- [ ] 1.2 Define size variants using primitive spacing/typography
- [ ] 1.3 Define color variants with light/dark semantic colors
- [ ] 1.4 Export theme with `as const` for type safety
- [ ] 1.5 Add theme export to `src/theme/tokens/components.ts`

## 2. Component Implementation

- [ ] 2.1 Create Component.tsx with TypeScript interface
- [ ] 2.2 Implement useTheme() hook for theme access
- [ ] 2.3 Implement variant switching logic
- [ ] 2.4 Implement size handling
- [ ] 2.5 Use Typography component for all text
- [ ] 2.6 Implement style merge pattern (base, theme, user)
- [ ] 2.7 Add accessibility props (role, label, state, hint)
- [ ] 2.8 Implement forwardRef (if needed for ref support)

## 3. Testing

- [ ] 3.1 Create Component.test.tsx with customRender from test-utils
- [ ] 3.2 Test basic rendering with default props
- [ ] 3.3 Test all variants render with correct tokens
- [ ] 3.4 Test all sizes render with correct tokens
- [ ] 3.5 Test event handlers (onPress, onChange, etc.)
- [ ] 3.6 Test disabled state behavior
- [ ] 3.7 Test style merging (user styles override defaults)
- [ ] 3.8 Test accessibility props are set correctly
- [ ] 3.9 Test ref forwarding (if applicable)

## 4. Examples

- [ ] 4.1 Create examples/ directory
- [ ] 4.2 Create BasicExample.tsx showing default usage
- [ ] 4.3 Create VariantsExample.tsx showing all variants
- [ ] 4.4 Create SizesExample.tsx showing all sizes (if applicable)
- [ ] 4.5 Create InteractiveExample.tsx showing stateful behavior (if applicable)
- [ ] 4.6 Create examples/index.ts barrel export

## 5. Documentation

- [ ] 5.1 Create README.mdx with component description
- [ ] 5.2 Import all examples at top of README.mdx
- [ ] 5.3 Add Installation section
- [ ] 5.4 Add Usage section with BasicExample
- [ ] 5.5 Create props table with all component props
- [ ] 5.6 Add Variants section with VariantsExample (if applicable)
- [ ] 5.7 Add Sizes section with SizesExample (if applicable)
- [ ] 5.8 Add Accessibility section explaining WCAG compliance
- [ ] 5.9 Add Theme Customization section with override example
- [ ] 5.10 Add Related Components section

## 6. Metadata

- [ ] 6.1 Create meta.json with name, category, dependencies
- [ ] 6.2 Create index.ts barrel export (export component and types)

## 7. Registry Generation

- [ ] 7.1 Run `bun run generate` to update all registries (registry.json, docs-registry.ts, index.ts)

## 8. Verification

- [ ] 8.1 Run `bun run format` (Prettier)
- [ ] 8.2 Run `bun run check-types --filter=@morph-ui/react-native` (zero errors)
- [ ] 8.3 Run `bun run lint --filter=@morph-ui/react-native` (zero warnings)
- [ ] 8.4 Run `bun run test --filter=@morph-ui/react-native` (all tests passing)
- [ ] 8.5 Verify component appears in demo app sidebar
- [ ] 8.6 Verify documentation loads correctly in demo app
```

## Requirement Patterns

When creating component specs, include requirements based on component type.

### Core Requirements (ALWAYS Include)

These 6 requirements are **mandatory for every component**:

1. **Component Structure** - File organization, TypeScript compliance
2. **Three-Tier Theme Integration** - Token usage, theme switching
3. **Typography Integration** - Typography component usage (if component displays text)
4. **Accessibility** - WCAG AA compliance, screen reader support
5. **Testing Coverage** - Comprehensive Jest tests
6. **Documentation** - Complete MDX documentation

### Optional Requirements (Include Based on Type)

Add these requirements when applicable to your component:

**Variants** - Include if component has visual style variations

- Primary, secondary, outline, ghost, etc.
- Each variant should have its own scenario
- Example: Button, Badge, Alert

**Sizes** - Include if component has size options

- sm, md, lg, xl, etc.
- Each size should have its own scenario
- Example: Button, Input, Typography

**Interactive Behavior** - Include for Pressable-based components

- Press states, hover states
- Disabled state handling
- Event handler behavior
- Example: Button, Card, FAB

**State Management** - Include for stateful components

- Value updates, controlled/uncontrolled modes
- Internal state handling
- Example: Input, Checkbox, Switch, Slider

**Input Handling** - Include for TextInput-based components

- Text entry, validation
- Focus states, placeholder behavior
- Example: Input, Textarea, OTPInput

**Icon Integration** - Include if component supports icons

- Icon placement (left, right, only)
- Icon sizing, color inheritance
- Example: Button, Input, Alert

**Loading States** - Include for async components

- Spinner display during operations
- Disabled state during loading
- Example: Button

**Error Handling** - Include for form components

- Error message display
- Error state styling
- Validation feedback
- Example: Input, Textarea, Select

**Compound Components** - Include for complex components

- Sub-component composition
- Parent-child relationship
- Example: Accordion, Tabs, Select

**Animation** - Include if component has motion

- Animation timing, easing
- Reduced motion support
- Example: Accordion, Toast, Modal

### Requirement Selection Guide

**Container/Display Components** (View-based):

- Core requirements only
- Optional: Variants, Sizes
- Example: Box, Container, Card, Divider

**Interactive Components** (Pressable-based):

- Core requirements
- Interactive Behavior (mandatory)
- Optional: Variants, Sizes, Icon Integration, Loading States
- Example: Button, FAB

**Input Components** (TextInput-based):

- Core requirements
- State Management (mandatory)
- Input Handling (mandatory)
- Optional: Variants, Sizes, Icon Integration, Error Handling
- Example: Input, Textarea, OTPInput, Select

**Display Components** (Text-based):

- Core requirements
- Typography Integration (mandatory)
- Optional: Variants, Sizes
- Example: Typography, Badge, Tag

**Stateful Components** (with internal state):

- Core requirements
- State Management (mandatory)
- Interactive Behavior (if clickable)
- Optional: Variants, Sizes, Icon Integration
- Example: Checkbox, Radio, Switch, Slider

**Complex Components** (multi-part):

- Core requirements
- Compound Components (mandatory)
- State Management (if stateful)
- Optional: Variants, Animation
- Example: Accordion, Tabs, Select

### Scenario Writing Tips

**Use WHEN/THEN/AND format:**

```markdown
#### Scenario: Button press

- **WHEN** user presses the button
- **THEN** onPress handler is called
- **AND** background color changes to pressed state
```

**Be specific with token references:**

```markdown
- **THEN** background matches theme.component.button.variant[colorScheme].primary.background
```

**Cover edge cases:**

```markdown
#### Scenario: Press when disabled

- **WHEN** disabled={true} and user presses button
- **THEN** onPress handler is NOT called
```

**Include accessibility checks:**

```markdown
- **AND** accessibilityState.disabled is true
```

## OpenSpec Commands Reference

Quick reference for OpenSpec CLI commands used during component creation.

### Exploration Commands

**List existing specs:**

```bash
openspec list --specs
```

Use before creating a proposal to check if a component already exists.

**List active changes:**

```bash
openspec list
```

Shows proposals currently in development.

**Show spec details:**

```bash
openspec show [component-name] --type spec
```

View requirements for an existing component.

**Show change details:**

```bash
openspec show add-[component-name]-component
```

View proposal details, tasks, and deltas.

### Validation Commands

**Validate proposal (strict mode):**

```bash
openspec validate add-[component-name]-component --strict
```

**CRITICAL**: Always use `--strict` flag for comprehensive validation.

Run this after creating proposal files and before presenting to user.

**Common validation errors:**

- "Change must have at least one delta" → Check `specs/[component]/spec.md` exists with `## ADDED Requirements`
- "Requirement must have at least one scenario" → Ensure each requirement has `#### Scenario:` (4 hashtags)
- Silent scenario parsing failures → Verify exact format: `#### Scenario: Name` (not bullets, not bold)

**Debug validation:**

```bash
openspec show add-[component-name]-component --json --deltas-only
```

Shows parsed deltas in JSON format for debugging.

### Archiving Commands

**Archive completed change:**

```bash
openspec archive add-[component-name]-component --yes
```

User runs this after component is merged to main.

**Verify archive:**

```bash
openspec list --specs  # Should now show [component-name]
openspec validate --strict  # Ensure no errors after archiving
```

### Validation Checklist

Before presenting proposal, ensure:

**Structure:**

- [ ] `proposal.md` has Why, What Changes, Impact sections
- [ ] `tasks.md` has 8 numbered sections with checkboxes
- [ ] `spec.md` uses `## ADDED Requirements` header
- [ ] All markdown properly formatted

**Spec Quality:**

- [ ] Each requirement uses SHALL/MUST wording
- [ ] Each requirement has ≥1 `#### Scenario:` (4 hashtags, not 3)
- [ ] Scenarios use **WHEN**/**THEN**/**AND** format (bold keywords)
- [ ] No bullets or bold for scenario headers (just `#### Scenario: Name`)

**Core Requirements:**

- [ ] Component Structure requirement present
- [ ] Three-Tier Theme Integration requirement present
- [ ] Typography Integration requirement present (if component has text)
- [ ] Accessibility requirement present
- [ ] Testing Coverage requirement present
- [ ] Documentation requirement present

**OpenSpec Validation:**

- [ ] `openspec validate add-[component-name]-component --strict` passes with zero errors

## Required Files Structure

All components go in `packages/react-native/src/<component-name>/`:

```
component-name/
├── ComponentName.tsx        (Main implementation)
├── ComponentName.theme.ts   (Theme tokens)
├── ComponentName.test.tsx   (Jest tests)
├── index.ts                 (Barrel export)
├── meta.json                (Metadata)
├── README.mdx               (Documentation)
└── examples/                (Example components)
    ├── BasicExample.tsx
    ├── VariantsExample.tsx
    └── index.ts
```

## Theme System Essentials

### Three Tiers

1. **Primitive**: Raw values (spacing, colors, sizes)
   - `primitive.spacing[4]` → 16px
   - `primitive.fontSize.base` → 16px
   - `primitive.borderRadius.md` → 8px

2. **Semantic**: Context-aware, theme-specific
   - `light.text.primary` → #000000
   - `dark.text.primary` → #FFFFFF
   - `light.action.primary` → #4A90E2

3. **Component**: Component-specific composition
   - `theme.component.button.size.md`
   - `theme.component.button.variant[colorScheme].primary`

### Core Rules

**✅ Always**:

- Use `useTheme()` hook to access theme
- Use `Typography` component instead of `Text`
- Access colors via `variant[colorScheme][variant]`
- Export theme with `as const` for type safety
- Merge styles: `[baseStyles, themeStyles, customStyle]`

**❌ Never**:

- Hardcode values (colors, spacing, sizes)
- Use React Native's `Text` component directly
- Skip the theme token file
- Forget to update component registry exports

## Component Patterns

### Props Interface

```typescript
export interface ComponentProps extends Omit<ViewProps, "style"> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

### Style Merging

```typescript
style={[
  baseStyles.static,     // 1. Static StyleSheet
  {
    // 2. Theme-derived dynamic styles
    backgroundColor: variantTokens.background,
    padding: sizeTokens.padding,
  },
  style,                 // 3. User overrides (highest priority)
]}
```

### State Handling

```typescript
const variantTokens = disabled
  ? theme.component.componentName.variant[colorScheme].disabled
  : theme.component.componentName.variant[colorScheme][variant];

const backgroundColor = disabled
  ? variantTokens.background
  : pressed
    ? variantTokens.backgroundPressed
    : variantTokens.background;
```

## Example Components

For complete examples, reference existing components:

- **Button** (`src/button/`) - Pressable with variants, sizes, icons, loading
- **Input** (`src/input/`) - TextInput with variants, label, error states
- **Typography** (`src/typography/`) - Text with variant system
- **Card** (`src/card/`) - Container with elevation and variants

## Quality Checklist

Before marking complete, verify all OpenSpec and implementation requirements.

### OpenSpec Proposal (Phase 1)

- [ ] Change ID follows format: `add-[component-name]-component`
- [ ] proposal.md has Why, What Changes, Impact sections
- [ ] spec.md has all 6 core requirements (Structure, Theme, Typography, Accessibility, Testing, Documentation)
- [ ] spec.md has component-specific requirements (Variants, Sizes, etc.)
- [ ] Each requirement has at least one `#### Scenario:` (4 hashtags)
- [ ] Scenarios use **WHEN**/**THEN**/**AND** format
- [ ] tasks.md has 8 numbered sections with checkboxes
- [ ] `openspec validate add-[component-name]-component --strict` passes

### Files Created (Phase 2)

- [ ] Component.tsx with proper implementation
- [ ] Component.theme.ts with three-tier tokens
- [ ] Component.test.tsx with comprehensive tests
- [ ] index.ts barrel export
- [ ] meta.json with metadata
- [ ] README.mdx with examples
- [ ] examples/ directory with at least BasicExample

### Theme Integration

- [ ] Theme file uses `as const`
- [ ] NO hardcoded values (all from tokens)
- [ ] Variant tokens have light/dark objects
- [ ] Component uses `useTheme()` hook
- [ ] Typography component used for text

### Implementation

- [ ] Props interface properly typed
- [ ] Style merge order correct
- [ ] Accessibility props included
- [ ] forwardRef if needed
- [ ] State handling via theme tokens

### Registry Updates

- [ ] `theme/tokens/components.ts` updated
- [ ] `src/index.ts` updated
- [ ] `src/docs-registry.ts` updated
- [ ] `src/registry.json` updated

### Verification (Phase 2)

- [ ] `bun run format` passes
- [ ] `bun run check-types` passes (zero errors)
- [ ] `bun run lint` passes (zero warnings)
- [ ] `bun run test` passes (all tests green)
- [ ] Component appears in demo app sidebar
- [ ] Documentation loads correctly in demo app

### Archiving Readiness (Phase 3)

- [ ] All tasks.md checkboxes marked `- [x]`
- [ ] All verification checks passing
- [ ] Code merged to main branch
- [ ] Ready for user to run: `openspec archive add-[component-name]-component --yes`

## Naming Conventions

- **Directory**: kebab-case (`button`, `text-input`)
- **Component file**: PascalCase (`Button.tsx`, `TextInput.tsx`)
- **Theme file**: PascalCase + `.theme.ts` (`Button.theme.ts`)
- **meta.json name**: kebab-case matching directory (`"button"`)
- **Variants**: kebab-case (`"primary"`, `"outline"`)
- **Examples**: PascalCase + `Example` (`BasicExample.tsx`)

## Development Notes

### Theme-First Approach

1. **Design theme tokens** before writing implementation
2. **Define all variants and sizes** in theme file
3. **Implement component** using only theme tokens
4. **Test theme switching** (light/dark modes)

### Typography Component

**Always use Typography instead of Text**:

```typescript
// ✅ Correct
<Typography variant="body" style={{ color: variantTokens.text }}>
  {children}
</Typography>

// ❌ Wrong - never do this
<Text style={{ fontSize: 14, color: "#000" }}>
  {children}
</Text>
```

Typography handles font sizes, line heights, and font families automatically.

### Accessibility

All components should include:

- `accessibilityRole` - Semantic role
- `accessibilityLabel` - Screen reader label
- `accessibilityState` - Current state (disabled, checked, etc.)
- `accessibilityHint` - Usage hint if needed
- Sufficient color contrast (WCAG AA)
- Proper focus indicators

## Common Patterns

### Interactive Components (Pressable)

```typescript
<Pressable
  onPress={onPress}
  disabled={disabled}
  style={({ pressed }) => [
    baseStyles.container,
    {
      backgroundColor: pressed
        ? variantTokens.backgroundPressed
        : variantTokens.background,
    },
    style,
  ]}
  accessibilityRole="button"
  accessibilityState={{ disabled }}
>
```

### Input Components (TextInput)

```typescript
<TextInput
  value={value}
  onChangeText={onChange}
  style={[
    baseStyles.input,
    {
      color: variantTokens.text,
      borderColor: isFocused ? variantTokens.focus : variantTokens.border,
    },
    style,
  ]}
  placeholderTextColor={variantTokens.placeholder}
/>
```

### Container Components (View)

```typescript
<View
  style={[
    baseStyles.container,
    {
      backgroundColor: variantTokens.background,
      padding: sizeTokens.padding,
      borderRadius: theme.primitive.borderRadius.md,
    },
    style,
  ]}
>
```

## Troubleshooting

**TypeScript errors after creating component**:

- Run `bun run check-types` to see specific errors
- Ensure theme file exports with `as const`
- Check that all registry files are updated

**Tests failing**:

- Verify component exports match test imports
- Check that ThemeProvider wraps test components
- Ensure mock data matches component prop types

**Theme tokens not found**:

- Verify `components.ts` includes your theme export
- Check import path in component matches theme file location
- Restart TypeScript server if types not updating

## Reference Documentation

For detailed information, see:

- [theme-system.md](references/theme-system.md) - Complete theme system guide
- [component-patterns.md](references/component-patterns.md) - Implementation patterns
- [file-structure.md](references/file-structure.md) - File requirements and registry updates

## Project Context

This component library is for **morph-ui**, a React Native component library following shadcn/ui principles. Components are:

- **Theme-first**: All styling uses design tokens
- **Copy-paste friendly**: Can be copied and customized
- **TypeScript-first**: Strong typing throughout
- **Accessible**: WCAG AA compliant by default
- **Composable**: Small, focused components that work together

The library uses Expo, Turborepo, and Bun for development.
