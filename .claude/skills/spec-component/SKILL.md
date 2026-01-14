---
name: spec-component
description: Creates OpenSpec proposals for React Native components following morph-ui standards. Use when user asks to "create a proposal", "spec a component", "write an OpenSpec", or "plan a component".
allowed-tools: Read, Write, Bash, Grep, Glob, AskUserQuestion
---

# Spec Component Skill

Creates OpenSpec proposals for React Native components following morph-ui standards.

## When to Use

Automatically triggered when user says:
- "Create a proposal for [component]"
- "Spec a [component] component"
- "Write an OpenSpec for [component]"
- "Plan a [component] component"

## Workflow

### 1. Gather Requirements

Ask clarifying questions:
- What are the variants? (primary, secondary, outline, etc.)
- What sizes are needed? (sm, md, lg, xl, etc.)
- What features? (icons, loading states, disabled state, etc.)
- Base component? (View, Pressable, TextInput, ScrollView)
- Figma design URL? (optional)

### 2. Research Existing Patterns

Read similar components:
- Button (interactive, variants, sizes, icons, loading)
- Input (TextInput-based, variants, sizes, states)
- Typography (text-based, variants)
- Card (container, variants, elevation)

Extract patterns for requirements and scenarios.

### 3. Extract Figma Specifications (If URL Provided)

Use Figma MCP (`figma-desktop`) to:
- Extract design tokens (colors, spacing, typography, radii, shadows)
- Document component structure
- Note interaction states
- Capture animations

Map Figma values to theme tokens:
- Figma colors → semantic tokens (light.action.primary, dark.action.primary)
- Figma spacing → primitive.spacing[N]
- Figma typography → primitive.fontSize/textStyles
- Figma effects → primitive.shadows

### 4. Create OpenSpec Proposal

Create directory:
```
openspec/changes/add-[component-name]-component/
```

#### Write proposal.md

```markdown
# Change: Add [ComponentName] Component

## Why

[1-2 sentences explaining user need]

## What Changes

- Add new [ComponentName] component with [N] variants ([list])
- Add [M] size options ([list])
- Implement [features: icons, loading, disabled, etc.]
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

#### Write specs/[component-name]/spec.md

Include 6 core requirements (ALWAYS):
1. Component Structure
2. Three-Tier Theme Integration
3. Typography Integration (if component displays text)
4. Accessibility (WCAG AA)
5. Testing Coverage
6. Documentation

Add component-specific requirements based on type:
- **Variants**: If component has visual style variations
- **Sizes**: If component has size options
- **Interactive Behavior**: If Pressable-based
- **State Management**: If stateful (controlled/uncontrolled)
- **Input Handling**: If TextInput-based
- **Icon Integration**: If supports icons
- **Loading States**: If async operations
- **Error Handling**: If form component
- **Compound Components**: If multi-part (Accordion, Tabs)
- **Animation**: If has motion

Each requirement must have ≥1 scenario in WHEN/THEN/AND format:

```markdown
### Requirement: Button Press Behavior

Button SHALL respond to user interaction with visual feedback.

#### Scenario: Press state

- **WHEN** user presses the button
- **THEN** background color changes to theme.component.button.variant[colorScheme].primary.backgroundPressed
- **AND** onPress handler is called
- **AND** visual feedback is immediate (no lag)

#### Scenario: Press when disabled

- **WHEN** disabled={true} and user presses button
- **THEN** onPress handler is NOT called
- **AND** accessibilityState.disabled is true
```

#### Write tasks.md

8-section implementation checklist:

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

- [ ] 5.1 Create README.mdx with brief description (1-2 sentences, Apple HIG style)
- [ ] 5.2 Import all examples at top of README.mdx
- [ ] 5.3 Add Overview section (key characteristics, when to use)
- [ ] 5.4 Add When NOT to Use section (anti-patterns, alternatives)
- [ ] 5.5 Add Variants section with real-world use cases
- [ ] 5.6 Add Examples section (Basic Usage, Real-World Use Cases, Composition)
- [ ] 5.7 Add API Reference with grouped prop tables (Behavior, Styling, Content, Accessibility)
- [ ] 5.8 Add Theme Tokens section (Color, Spacing, Typography, Border, Shadow, Animation tokens)
- [ ] 5.9 Add comprehensive Accessibility section (WCAG level, keyboard nav, screen reader, visual requirements, testing)
- [ ] 5.10 Add Related Components section
- [ ] 5.11 Add Troubleshooting section with common issues

## 6. Metadata

- [ ] 6.1 Create meta.json with type, name, description (Apple HIG style)
- [ ] 6.2 Add category field (layout, input, display, interactive, feedback, navigation, surfaces)
- [ ] 6.3 Add tags array for searchability
- [ ] 6.4 Add dependencies array (list all components used)
- [ ] 6.5 Create index.ts barrel export (export component and types)

## 7. Registry Generation

- [ ] 7.1 Run `bun run generate` to update all registries (registry.json, docs-registry.ts, index.ts)

## 8. Verification

- [ ] 8.1 Run `bun run format` (Prettier)
- [ ] 8.2 Run `bun run check-types --filter=@warp-ui/react-native` (zero errors)
- [ ] 8.3 Run `bun run lint --filter=@warp-ui/react-native` (zero warnings)
- [ ] 8.4 Run `bun run test --filter=@warp-ui/react-native` (all tests passing)
- [ ] 8.5 Verify component appears in demo app sidebar
- [ ] 8.6 Verify documentation loads correctly in demo app
```

### 5. Validate Proposal

Run:
```bash
openspec validate add-[component-name]-component --strict
```

Fix any errors:
- "Change must have at least one delta" → Check spec.md has `## ADDED Requirements`
- "Requirement must have at least one scenario" → Add `#### Scenario:` (4 hashtags)
- Silent parsing failures → Verify exact format (no bullets for scenario headers)

### 6. Present to User

Output summary:
```
✅ OpenSpec Proposal Created

Component: [Name]
Variants: [list]
Sizes: [list]
Features: [list]
Figma Integration: [Yes/No - URL if yes]

Validation: PASSED (openspec validate --strict)

Location: openspec/changes/add-[component-name]-component/
Files:
  - proposal.md
  - specs/[component-name]/spec.md
  - tasks.md

Ready for review. Say "approved" to proceed with implementation using develop-component skill or component-developer agent.
```

## Reference Documentation

See `.claude/skills/create-component/SKILL.md` for:
- Complete requirement patterns
- Scenario templates
- Example proposals
- Common mistakes

## Quality Checklist

Before presenting proposal:
- [ ] All 3 files created (proposal.md, spec.md, tasks.md)
- [ ] Spec has 6 core requirements minimum
- [ ] Each requirement has ≥1 scenario
- [ ] Scenarios use **WHEN**/**THEN**/**AND** format
- [ ] Tasks.md has 8 numbered sections
- [ ] `openspec validate --strict` passes with zero errors
- [ ] Figma tokens documented (if URL provided)
