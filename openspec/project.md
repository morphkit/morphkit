# Project Context

## Purpose

**MorphUI** is a next-generation React Native UI library optimized for AI agents. At its core is a growing set of beautifully crafted and highly customizable UI components that "morph" to any app look and feel.

### Core Features

- **27 Production-Ready Components** (many more planned): Layout, input, display, interactive, feedback, navigation, and surface components
- **Multi-Screen Flows**: Pre-built user journeys (auth flow currently, more planned) that can be copied to consumer projects with routing
- **Three-Tier Customization Model**:
  1. Global theme customization (primitive & semantic token layers)
  2. Component-level theme overrides
  3. Direct source code modification (shadcn-inspired copy-paste model)
- **CLI Tooling**: Component and flow scaffolding with metadata tracking (meta.json for dependencies)
- **MCP Integration** (roadmap): Comprehensive AI agent tooling
  - `init` - Initialize MorphUI, setup CLAUDE.md, skills, and theme
  - `customize_theme` - Generate WCAG-compatible themes from design tokens or Figma
  - `analyze_design` - Image similarity/semantic search for matching components
  - `search_docs` - Semantic search with FAISS index for component discovery
  - **Contribution tools** - Standardize custom components and submit PRs back to the library

### Philosophy

- **Copy-paste friendly**: Inspired by shadcn/ui, components and flows are copied to your project
- **Fully customizable**: Everything can be customized at every layer (theme → component → source)
- **Token efficient**: AI agents copy pre-built components rather than generating code line-by-line, significantly reducing token consumption
- **AI-first**: Components designed for AI agent consumption with `search_docs` tool for understanding copied code
- **Solid building blocks**: Comprehensive catalog for most app UI needs

### Future Vision

- **Growing catalog**: Expand components and flows to cover wider range of use cases
- **Contribution workflow**: CLI/MCP tools will enable users to standardize their custom components (the 30% not covered by MorphUI) and submit PRs to contribute back to the library

## Tech Stack

**Build & Tooling:**

- **Package Manager**: Bun v1.2.2
- **Build Tool**: Turborepo v2.7.2
- **Language**: TypeScript 5.9.2 (strict mode)

**Framework & Runtime:**

- **Framework**: React Native (0.81.5 demo app, ^0.76.6 library peer dependency)
- **React**: 19.1.0
- **Platform**: Expo SDK ~54.0.30
- **Router**: Expo Router (file-based routing)

**Testing:**

- **Test Framework**: Jest 30.2.0
- **Testing Library**: React Native Testing Library
- **Shared Config**: @repo/jest-config

**Documentation:**

- **Format**: MDX
- **Rendering**: @bacons/mdx

**Code Quality:**

- **Linter**: ESLint v9 (flat config, zero warnings policy)
- **Formatter**: Prettier
- **TypeScript Config**: Shared via @repo/typescript-config

**Publishing:**

- **@warp-ui/cli**: GitHub Packages (v0.3.4)
- **@warp-ui/react-native**: npm registry (planned)

## Project Conventions

### Code Style

**Non-Negotiable Rules:**

- **Zero tolerance for comments**: Code must be self-documenting through clear variable/function names, small focused functions, and proper type annotations
- **Zero tolerance for `any` type**: Always use specific types, interfaces, `unknown`, generics, or type guards
- **Conventional Commits**: All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`
  - Breaking changes: Add `!` after type/scope (e.g., `feat(api)!: change response format`)
- **Prettier**: All code must be formatted with Prettier
- **ESLint v9**: Flat config format with `--max-warnings 0` enforcement
- **TypeScript**: Strict mode required, zero TypeScript errors
- **Zero tolerance for failed tests**: Even if failed tests are not directly related to the current changes, all tests must pass before caling something done. Always.

**Naming Conventions:**

- Variables/functions: camelCase
- Components: PascalCase
- Files: kebab-case for utilities, PascalCase for components
- Theme files: `{Component}.theme.ts` colocated with component

### Architecture Patterns

**Three-Tier Theme System:**

- **Tier 1 - Primitive Tokens** (`src/theme/tokens/primitive/`): Raw design values (colors, spacing, typography, radii, shadows, animation)
- **Tier 2 - Semantic Tokens** (`src/theme/tokens/semantic/`): Context-aware tokens mapped to light/dark themes
- **Tier 3 - Component Tokens**: Component-specific styling in `{Component}.theme.ts` files

**Key Patterns:**

- **Token-based styling**: No hardcoded values - all colors, spacing, sizes, and styles come from design tokens
- **Typography component**: Always use `Typography` instead of React Native's `Text`
- **Theme access**: All components use `useTheme()` hook
- **Monorepo structure**: Turborepo workspaces with shared ESLint and TypeScript configurations
- **Component exports**: Wildcard pattern (`"./src/*"`) for tree-shaking
- **Style merge order**: Base styles → Theme-derived dynamic styles → User overrides
- **Minimal dependencies**: Beyond core Expo packages, minimize third-party dependencies

### Testing Strategy

**Requirements:**

- **Jest with React Native Testing Library**: All components must have tests
- **Test location**: `{Component}.test.tsx` alongside component implementation
- **Custom render utilities**: Use `customRender()` from test-utils.tsx (wraps with ThemeProvider and SafeAreaProvider)
- **Zero tolerance for failed tests**: No task is complete until `bun run test` passes with zero failures
  - **CRITICAL**: Even if failing tests are unrelated to your current change, ALL tests must pass before marking work as complete
  - Never ignore or skip failing tests
  - Fix all test failures before proceeding
- **Shared config**: Use `@repo/jest-config` for consistent setup across packages

**Test Coverage:**

- Component rendering
- User interactions
- Theme token application
- Accessibility props
- Edge cases and error states

### Git Workflow

**Commit Policy:**

- **Conventional Commits required**: See Code Style section
- **Never commit without explicit user approval**: Wait for user to explicitly request commits
- **No proactive commits**: Even if task is complete and checks pass
- **Breaking changes**: Must be marked with `!` and include `BREAKING CHANGE:` in commit body

**Branching:**

- **Main branch**: `main`
- **Feature branches**: Create feature branches for changes
- **Pull requests**: Required for all changes

**Static Analysis Before Commits:**

- ✅ `bun run lint` - Zero ESLint warnings/errors
- ✅ `bun run check-types` - Zero TypeScript errors
- ✅ `bun run format` - Code formatted with Prettier
- ✅ `bun run test` - All tests passing

## Domain Context

### Component Library Specifics

**Design Philosophy:**

- **Copy-paste friendly**: Inspired by shadcn/ui, components are copied to consumer projects for full customization
- **WCAG AA accessibility**: Target WCAG AA compliance (some components need verification)
- **Platform considerations**: Components must work on both iOS and Android
- **MDX documentation**: Each component has MDX documentation with live examples in component registry

**Component Structure:**

- Component file: `{Component}.tsx`
- Theme file: `{Component}.theme.ts` (colocated)
- Test file: `{Component}.test.tsx`
- Examples: `examples/` directory with usage examples
- Documentation: MDX files in `docs/` or embedded
- Metadata: `meta.json` for dependencies and metadata

### Flows System

**Concept:**

- Multi-screen UI flows (e.g., authentication, onboarding) that can be copied to consumer projects
- Routing files included (Expo Router integration)
- meta.json tracks dependencies (e.g., which components the flow requires)

**Current Flows:**

- **Auth Flow (default)**: Email/password, Apple, Google, Facebook authentication
  - 4 screens: welcome, email, name, password
  - Expo Router layout for navigation

**Planned:**

- Many more flow types (onboarding, checkout, profile setup, etc.)

### AI-First Design

**Token Efficiency:**

- Components/flows are copied rather than generated line-by-line
- Significantly reduces token consumption during code generation
- AI agents can reference pre-built patterns instead of creating from scratch

**MCP Tools (Roadmap):**

- **`init`**: Initialize MorphUI in consumer project, setup CLAUDE.md, skills, and theme
- **`customize_theme`**: Generate WCAG-compatible themes from design tokens or Figma
- **`analyze_design`**: Image similarity/semantic search to find matching components
- **`search_docs`**: Semantic search with FAISS index for component discovery
- **Contribution tools**: Standardize custom components and submit PRs to library

**Metadata System:**

- meta.json files enable dependency resolution
- AI agents understand component relationships
- CLI commands will be non-interactive for AI compatibility

### Three-Tier Customization Model

1. **Global Theme** - Customize primitive and semantic tokens for brand consistency
2. **Component Theme** - Override specific component styling via `.theme.ts` files
3. **Source Code** - Full control by modifying copied component source

### Current Roadmap

**Component Library:**

- WCAG compliance verification and fixes
- Expand component catalog (many more planned)
- Better code example handling in README.mdx files

**CLI:**

- Non-interactive mode for AI agent compatibility
- Improved file copying (determine which files are essential)

**MCP:**

- Local transport MCP server setup
- Implement all MCP tools (init, customize_theme, analyze_design, search_docs)
- FAISS indexing for documentation
- Image similarity search for design matching
- Figma API integration

**Contribution Workflow:**

- Tools for standardizing custom components (the 30% not in MorphUI catalog)
- PR submission workflow back to the library

## Important Constraints

**Technical Constraints:**

- **React Native compatibility**: All components must work with React Native (not React DOM)
- **Expo ecosystem integration**: Leverage Expo SDK and tools
- **TypeScript strict mode**: Required for all code
- **Zero warnings policy**: ESLint and TypeScript must have zero warnings/errors
- **Zero tolerance for failed tests**: All tests must pass - even if failures are unrelated to current changes
- **Theme-first design**: No hardcoded values - all styling through design tokens
- **Platform-agnostic**: Components should work on iOS and Android where possible
- **Minimal external dependencies**: Beyond core Expo packages (expo-router, expo-vector-icons, reanimated, etc.), minimize third-party dependencies for maximum flexibility and minimal bundle size
- **WCAG AA compliance**: Target accessibility standard (verification in progress)

**Workflow Constraints:**

- **No proactive commits**: Never commit without explicit user approval
- **Static analysis gates**: All checks must pass before any work is considered complete
- **Conventional Commits**: Strict adherence to commit message format

**Development Constraints:**

- **Node version**: >=18 required
- **Bun compatibility**: All npm scripts must work with Bun v1.2.2
- **Turborepo tasks**: Build, lint, check-types, test, dev must all function correctly

## External Dependencies

### Core Framework

- **Expo SDK** (~54.0.30): Core platform for React Native development
- **Expo Router**: File-based routing for navigation
- **React Native** (0.81.5 demo app, ^0.76.6 library peer dependency): Mobile framework
- **React** (19.1.0): UI library

### Publishing & Distribution

- **GitHub Packages**: Hosts @warp-ui/cli (v0.3.4)
- **npm registry** (planned): Future home for @warp-ui/react-native

### UI & Theming

- **@expo-google-fonts/inter**: Custom font support
- **@expo/vector-icons** (^15.0.3): Icon library
- **expo-font**: Custom font loading system

### Navigation & Interaction

- **react-native-gesture-handler**: Touch and gesture handling
- **react-native-reanimated**: Performant animations
- **react-native-screens**: Native screen optimization
- **react-native-safe-area-context**: Safe area management

### Testing & Development Tools

- **jest-expo** (^52.0.0): Jest preset for Expo projects
- **@babel/core** and related packages: JavaScript transpilation
- **react-native-worklets** (0.5.1): High-performance JavaScript worklets

### Documentation

- **@bacons/mdx**: MDX rendering for component documentation
- MDX files embedded in component packages

### Future Dependencies (MCP Roadmap)

- **FAISS**: Vector database for semantic search indexing
- **MCP SDK**: Model Context Protocol for AI agent integration
- **Image similarity libraries**: For design matching in `analyze_design` tool
- **Figma API**: Design token extraction and analysis
