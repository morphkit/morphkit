<!-- OPENSPEC:START -->

# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**morph-ui** is a production-ready component library monorepo, similar in spirit to shadcn/ui. The repository features a **fully-implemented React Native component library** (`@warp-ui/react-native`) with 27 components, multi-screen flow templates, CLI tooling, and comprehensive testing infrastructure.

The repository includes a full-featured demo app for browsing components and flows, with MDX-based documentation, drawer navigation, and dynamic component showcases. All components follow the three-tier theme system and are backed by Jest tests.

### Tech Stack

- **Package Manager**: Bun (v1.2.2)
- **Build Tool**: Turborepo (v2.7.2)
- **Node Version**: >=18
- **Language**: TypeScript 5.9.2
- **Framework**: React Native (0.81.5 demo app, ^0.76.6 library peer dependency)
- **React**: 19.1.0
- **Platform**: Expo SDK ~54.0.30
- **Testing**: Jest 30.2.0 with React Native Testing Library
- **Primary Target**: React Native component library

## Monorepo Structure

The repository uses Turborepo workspaces defined in root `package.json`:

- `apps/*` - Applications
- `packages/*` - Shared tooling and configurations
- `react-native/*` - **Primary workspace for React Native component library**

### Current Structure

**`apps/kitchen-sink-app/`** - Component Library Browser & Flow Showcase

- Full-featured demo app with Drawer navigation
- Dynamic component documentation viewer using MDX
- Multi-screen flow demonstrations (auth flow with 4 screens)
- Fully integrated with monorepo shared configs
- Uses `@repo/eslint-config/react-native` and `@repo/typescript-config/react-native`
- File-based routing with Expo Router in `app/` directory
- Component sidebar for browsing 27 documented components
- Entry point: `expo-router/entry`
- Theme customization with Inter font family

**`packages/*`** - Shared Tooling

- **@repo/eslint-config**: Shared ESLint configurations
  - `base.js` - Core ESLint config
  - `next.js` - Next.js specific config
  - `react-internal.js` - React library config
  - `react-native.js` - React Native config (includes `__DEV__` global, style-prop-object rule disabled)
- **@repo/typescript-config**: Shared TypeScript configurations
  - `base.json` - Core strict TypeScript settings
  - `nextjs.json` - Next.js specific config
  - `react-library.json` - React library config
  - `react-native.json` - React Native config (jsx: "react-native", module: "ESNext")
- **@repo/jest-config**: Shared Jest testing configuration
  - Used across all packages for consistent test setup
  - Integrated with React Native testing library
- **@repo/react-native-flows**: Multi-screen user flow templates
  - Version: 0.1.0
  - Flow registry system for managing user journeys
  - Implements authentication flows using Expo Router
  - Structure: `src/auth/(default)/` for default auth flow
  - Components: welcome, email, name, password screens
- **@warp-ui/cli**: Command-line interface for Warp UI
  - Version: 0.3.4
  - Published to GitHub Packages (npm.pkg.github.com)
  - Supports both CommonJS and ESM exports
  - Features: GitHub auth, component registry management, config management

**`packages/react-native/`** - Production-Ready React Native Component Library

- **Package name**: `@warp-ui/react-native` (v0.1.0)
- **27 fully-implemented components** following three-tier theme system
- Components exported via wildcard pattern for tree-shaking: `"./src/*"`
- Complete testing infrastructure with Jest
- MDX documentation system with component registry
- All components include `.theme.ts` files for token-based styling

**Component Categories**:

- Layout: box, container, stack, divider
- Input: input, textarea, checkbox, radio, select, switch, slider, otp-input, label
- Display: typography, badge, tag, avatar, progress, skeleton, spinner
- Interactive: button, accordion, tabs
- Feedback: alert, toast
- Navigation: fab
- Surfaces: card

## Development Commands

### Running the Monorepo

```bash
# Install dependencies (uses Bun)
bun install

# Run all apps in dev mode
bun run dev

# Build all apps and packages
bun run build

# Lint all packages
bun run lint

# Type-check all packages
bun run check-types

# Format code
bun run format
```

### Working with Specific Packages

Use Turbo filters to target specific packages:

```bash
# Work with demo app
turbo dev --filter=kitchen-sink-app
turbo build --filter=kitchen-sink-app
turbo lint --filter=kitchen-sink-app
turbo check-types --filter=kitchen-sink-app
```

### Working with Flows

```bash
# Run the demo app to see flows in action
turbo dev --filter=kitchen-sink-app

# View auth flow documentation
# Navigate to /flows in the running app
```

## Turborepo Task Configuration

Tasks are defined in `turbo.json`:

- **build**: Has dependency graph (`^build`), includes `.env*` files, outputs: `[]` (no build artifacts cached)
- **lint**: Has dependency graph (`^lint`)
- **check-types**: Has dependency graph (`^check-types`)
  - Uses `tsc --noEmit` for type checking
- **test**: Has dependency graph (`^test`), no caching
- **dev**: No caching, persistent task

Global environment variables: `DEBUG`, `GITHUB_TOKEN`, `GH_TOKEN`

## Design Philosophy

As a component library with comprehensive theming:

- **Theme-first**: All styling uses the three-tier token system (primitive → semantic → component)
- **No hardcoded values**: Every color, spacing, size, and style comes from design tokens
- **Typography-driven**: Use the Typography component for all text rendering
- **Copy-paste friendly**: Components can be copied and customized via theme tokens
- **TypeScript-first**: Strong typing for all components, props, and theme tokens
- **Composable**: Small, focused components that work together
- **Accessible**: Follow React Native accessibility best practices with WCAG AA compliance
- **Flow-based UX**: Multi-screen user journeys using flow templates
- **Documentation-driven**: MDX-based component documentation with live examples

## Three-Tier Theme System

The component library uses a hierarchical token system for consistent, theme-aware styling:

### Token Hierarchy

**Tier 1: Primitive Tokens** (`src/theme/tokens/primitive/`)

- Raw design values without semantic meaning
- Examples: `neutral[900]`, `spacing[4]`, `fontSize.base`, `borderRadius.md`
- Files: `colors.ts`, `spacing.ts`, `typography.ts`, `radii.ts`, `shadows.ts`, `animation.ts`

**Tier 2: Semantic Tokens** (`src/theme/tokens/semantic/`)

- Context-aware tokens mapped to light/dark themes
- Examples: `light.text.primary`, `dark.surface.elevated`, `textStyles.body`
- Provides meaning: "primary action", "text color", "elevated surface"
- Files: `colors.ts`, `typography.ts`, `state.ts`

**Tier 3: Component Tokens** (Colocated with components)

- Component-specific styling rules
- File: `{Component}.theme.ts` in each component folder
- Composes primitive and semantic tokens
- Exported via `src/theme/tokens/components.ts`

### Theme Token Access

All components use the `useTheme()` hook:

```typescript
import { useTheme } from "../theme";

const { theme, colorScheme } = useTheme();

// Access component tokens:
const variantColors = theme.component.button.variant[colorScheme][variant];
const sizeTokens = theme.component.button.size[size];

// Use in styles:
<View style={{
  backgroundColor: variantColors.background,
  padding: sizeTokens.paddingHorizontal,
  borderRadius: theme.component.button.borderRadius,
}} />
```

### Typography Component

**Location**: `packages/react-native/src/typography/Typography.tsx`

The Typography component is fully implemented and replaces React Native's `Text`:

```typescript
import { Typography } from "../typography";

// ✅ Correct
<Typography variant="body" style={{ color: variantTokens.text }}>
  {children}
</Typography>

// ❌ Never use
<Text style={{ fontSize: 14, color: "#000" }}>
  {children}
</Text>
```

Typography variants: `large-title`, `title-1`, `title-2`, `title-3`, `heading`, `body`, `callout`, `subhead`, `footnote`, `caption-1`, `caption-2`

Each variant maps to semantic text styles with proper fontSize, fontWeight, lineHeight, letterSpacing, and fontFamily from theme tokens.

### Token-Based Styling Rules

**NEVER hardcode values. Always use tokens:**

```typescript
// ❌ Wrong - hardcoded values
style={{
  padding: 16,
  backgroundColor: "#4A90E2",
  borderRadius: 8,
  fontSize: 14,
}}

// ✅ Correct - token-based
style={{
  padding: theme.primitive.spacing[4],
  backgroundColor: theme.semantic.colors.action.primary,
  borderRadius: theme.primitive.borderRadius.md,
  // Typography handles fontSize via variant
}}
```

### Style Merge Pattern

All components follow this merge order:

```typescript
style={[
  baseStyles.container,        // Static StyleSheet styles
  {
    // Theme-derived dynamic styles
    backgroundColor: variantTokens.background,
    borderColor: variantTokens.border,
    padding: sizeTokens.padding,
  },
  style,                        // Custom user overrides (highest priority)
]}
```

## Development Workflow Rules

These rules are **non-negotiable** and must be followed strictly:

### 1. Static Analysis Requirements

**Before marking any task as complete, ALL static analysis checks must pass:**

- ✅ `bun run lint` - Zero ESLint warnings/errors
- ✅ `bun run check-types` - Zero TypeScript errors
- ✅ `bun run format` - Code must be formatted with Prettier
- ✅ All tests must pass (`bun run test` - Jest with React Native Testing Library)
  - **CRITICAL**: Even if failing tests are unrelated to your current change, ALL tests must pass before marking work as complete
  - Never ignore or skip failing tests - fix them before proceeding
  - Zero tolerance for test failures

**Never say something is "done" or "complete" until all checks pass.**

### 2. Zero Tolerance for Comments

**Absolutely no code comments are allowed.** Code must be self-documenting through:

- Clear, descriptive variable and function names
- Small, focused functions with single responsibilities
- Proper type annotations that serve as documentation
- Extract complex logic into well-named utility functions

❌ **Never write:**

```typescript
// Calculate the total price
const total = price * quantity;
```

✅ **Instead write:**

```typescript
const calculateTotalPrice = (price: number, quantity: number): number => {
  return price * quantity;
};
```

### 3. Zero Tolerance for `any` Type

**The `any` type is completely banned.** Always use proper TypeScript types:

- Use specific types, interfaces, or type aliases
- Use `unknown` instead of `any` when the type is truly unknown
- Use generic type parameters for reusable components
- Use type guards to narrow `unknown` types
- Use utility types (`Partial`, `Pick`, `Omit`, etc.) when appropriate

❌ **Never write:**

```typescript
const processData = (data: any) => { ... }
```

✅ **Instead write:**

```typescript
interface UserData {
  id: string;
  name: string;
}

const processUserData = (data: UserData): ProcessedData => { ... }
```

### 4. Conventional Commits

**All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:**

Format: `<type>[optional scope]: <description>`

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, tooling, or dependency updates
- `ci`: CI/CD configuration changes

**Examples:**

```bash
feat(components): add button component with accessibility support
fix(routing): resolve navigation state persistence issue
docs(readme): update installation instructions
refactor(utils): extract validation logic into separate module
chore(deps): upgrade expo to v54.0.30
```

**Breaking Changes:**
Add `!` after type/scope and include `BREAKING CHANGE:` in commit body:

```bash
feat(api)!: change response format to support pagination

BREAKING CHANGE: API responses now return paginated data structure
```

### 5. Git Commit and Push Policy

**NEVER commit or push code without explicit user approval:**

- Always wait for the user to explicitly ask to commit changes
- Never proactively create commits, even after completing tasks
- Never push to remote repositories unless explicitly requested
- When asked to commit, follow the Conventional Commits specification
- Include detailed commit messages that explain what was changed and why

**The only time to commit is when the user explicitly says:**

- "commit the changes"
- "create a commit"
- "commit this"
- Or similar direct instructions

**Never commit just because:**

- A task is complete
- All checks are passing
- Code has been written
- The user seems satisfied

## Architecture Notes

### ESLint Configuration

The monorepo uses ESLint v9 with flat config format:

- All configs enforce zero warnings: `--max-warnings 0`
- Shared configs available in `@repo/eslint-config`:
  - `base.js` - Core config with TypeScript ESLint
  - `next.js` - Next.js specific rules
  - `react-internal.js` - React library rules
  - `react-native.js` - React Native rules (includes `__DEV__` global, disables `react/style-prop-object`)

### TypeScript Setup

- Shared configs in `@repo/typescript-config` provide base settings
- Each package has its own `tsconfig.json` extending the shared configs
- Type checking runs with `tsc --noEmit`

### Testing Infrastructure

The monorepo has comprehensive testing setup:

- **Shared Config**: `@repo/jest-config` package provides base Jest configuration
- **Test Utilities**: Custom render utilities in `packages/react-native/src/test-utils.tsx`
  - Wraps components with ThemeProvider and SafeAreaProvider
  - Provides type-safe testing helpers
- **Component Tests**: Each component has corresponding `.test.tsx` file
- **Run tests**: `bun run test` at root or package level

### Documentation System

Components use MDX for rich documentation:

- **Registry**: `registry.json` contains component metadata (auto-generated from `meta.json` files)
- **Docs Registry**: `docs-registry.ts` provides MDX documentation loader (auto-generated from `README.mdx` files)
- **Generation**: Run `bun run generate` to regenerate all registries after adding/modifying components
- **CI Validation**: `.github/workflows/ci.yml` ensures registries stay up-to-date
- **MDX Provider**: Maps MDX elements to Warp UI components
- **Demo App**: Renders documentation dynamically at `/docs/[component]` route

### Flow System

Multi-screen user journeys are managed through the flows package:

- **Package**: `@repo/react-native-flows`
- **Registry**: Flow metadata for discovery and navigation
- **Integration**: Uses Expo Router for screen navigation
- **Current Flows**: Authentication (default variant) with 4 screens

## Important Patterns

### Working with the Demo App

The demo app at `apps/kitchen-sink-app` showcases all components and flows:

1. **Component Documentation**: All components automatically appear in sidebar via registry
2. **Adding Components**: New components in `@warp-ui/react-native` appear automatically
3. **Adding Flows**: Register new flows in `@repo/react-native-flows/src/registry.ts`
4. **Custom Theme**: Demo app uses Inter font family with theme overrides via `createTheme()`
5. **Navigation**: Drawer navigation with routes:
   - `/` - Home
   - `/docs/[component]` - Component documentation
   - `/flows/[type]/[variant]/[screen]` - Flow screens

### Testing Components

When developing components:

1. Write component tests in `{Component}.test.tsx` alongside component file
2. Use `customRender()` from test-utils to wrap with providers
3. Run tests with `bun run test`
4. Ensure all tests pass before committing

Example:

```typescript
import { customRender } from "../test-utils";
import { Button } from "./Button";

describe("Button", () => {
  it("renders correctly", () => {
    const { getByText } = customRender(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeTruthy();
  });
});
```

### Adding New Dependencies

When adding dependencies to the monorepo:

1. Use `bun add` instead of npm/yarn/pnpm
2. Add to the appropriate workspace (app or package)
3. For React Native, be mindful of platform compatibility
4. Shared dependencies should go in `packages/*` when reused across workspaces

### React Native Component Development

When building the component library in `react-native/*`:

- Components should be framework-agnostic where possible
- Export components as named exports for tree-shaking
- Include comprehensive TypeScript prop interfaces
- Follow React Native's component patterns (View, Text, Pressable, etc.)
- Consider both iOS and Android platform differences
- Provide examples/documentation for each component

### Component Export Strategy

Similar to shadcn/ui, consider:

- Individual component files that can be copied
- Minimal dependencies between components
- Clear, documented component APIs
- Export pattern that allows selective imports (e.g., wildcard pattern `"./*": "./src/*.tsx"`)

### Automatic Registry Generation

The component library uses automated scripts to maintain consistency:

**Generation Scripts:**

- `bun run generate` - Regenerate all registries and exports
- `bun run generate:registry` - Regenerate `registry.json` from `meta.json` files
- `bun run generate:docs` - Regenerate `docs-registry.ts` from `README.mdx` files
- `bun run generate:exports` - Regenerate barrel exports in `index.ts`

**When to Run:**

- After adding a new component
- After modifying `meta.json` or `README.mdx`
- After removing a component
- Before committing component changes

**How It Works:**

1. Scans `packages/react-native/src/` for component directories
2. Reads `meta.json` files for component metadata
3. Generates `registry.json` with alphabetically sorted components
4. Generates `docs-registry.ts` by importing all `README.mdx` files
5. Generates `index.ts` with `export * from "./{component}"` pattern

**CI Enforcement:**
The `.github/workflows/ci.yml` workflow validates that registries are up-to-date. If you forget to run `bun run generate`, the CI will fail with a helpful message.

**DO NOT manually edit:**

- `packages/react-native/src/registry.json`
- `packages/react-native/src/docs-registry.ts`
- `packages/react-native/src/index.ts`

These files are auto-generated and manual changes will be overwritten.

## CLI Usage

The `@warp-ui/cli` package provides scaffolding and management commands:

```bash
# Install CLI globally (from GitHub Packages)
npm install -g @warp-ui/cli

# Component management
warp-ui add [component]     # Add component to project
warp-ui init                # Initialize Warp UI in project

# Configuration
warp-ui config              # Manage CLI configuration
```

**Note**: CLI is published to GitHub Packages and requires authentication.

## Component Creation Workflow

**All new components must follow the spec-driven OpenSpec workflow.**

Use the `create-component` skill for all component development work. This skill implements a three-phase process:

1. **Phase 1: Proposal Creation**
   - Create OpenSpec proposal in `openspec/changes/add-[component-name]-component/`
   - Write `proposal.md` (why, what, impact)
   - Write `specs/[component-name]/spec.md` with requirements and scenarios
   - Write `tasks.md` with 8-section implementation checklist
   - Validate with `openspec validate --strict`
   - **Wait for user approval before proceeding**

2. **Phase 2: Implementation**
   - Follow tasks.md checklist sequentially
   - Create all 7 required files (Component.tsx, .theme.ts, .test.tsx, index.ts, meta.json, README.mdx, examples/)
   - Run `bun run generate` to automatically update all registries
   - Run verification (format, type-check, lint, test)

3. **Phase 3: Archiving**
   - After merge, user runs: `openspec archive add-[component-name]-component --yes`
   - Creates final spec at `openspec/specs/[component-name]/spec.md`

**Important:** Never implement components without an approved OpenSpec proposal. This ensures architectural consistency and creates a documentation trail.

See `.claude/skills/create-component/SKILL.md` for complete details, templates, and requirement patterns.
