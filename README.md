<div align="center">
  <img src="apps/kitchen-sink-app/assets/logo.png" alt="MorphUI Logo" width="600" />
</div>

<div align="center">

![Tests](https://github.com/warp-ui/warp-ui/actions/workflows/ci.yml/badge.svg)
![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/jaksm/b03e443032a9a1ccbe2811be5d8ee83d/raw/morph-ui-coverage.json&logo=codecov&logoColor=white)
![Expo](https://img.shields.io/badge/expo-54.0-000020?logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-5.9.2-3178c6?logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/react%20native-0.81.5-61dafb?logo=react&logoColor=white)
![Jest](https://img.shields.io/badge/jest-30.2.0-c21325?logo=jest&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?logo=opensourceinitiative&logoColor=white)

</div>

MorphUI is a next-generation React Native UI library optimized for AI agents. At its core is a growing set of beautifully crafted and highly customizable UI components that "morph" to any app look and feel.

## Overview

MorphUI provides 27 production-ready components, multi-screen flow templates, and a sophisticated three-tier theme system for building beautiful React Native applications. Inspired by shadcn/ui, components are designed to be copied to your project for full customization.

### Key Features

- **27 Production-Ready Components**: Layout, input, display, interactive, feedback, navigation, and surface components
- **Three-Tier Theme System**: Hierarchical token system (primitive → semantic → component) for consistent, customizable styling
- **Multi-Screen Flows**: Pre-built user journeys (authentication flow with 4 screens, more planned)
- **Comprehensive Testing**: Jest with React Native Testing Library for all components
- **MDX Documentation**: Rich component documentation with live examples
- **TypeScript-First**: Strict typing for all components, props, and theme tokens
- **WCAG AA Accessibility**: Target accessibility compliance for all components
- **CLI Tooling**: Component and flow scaffolding with metadata tracking

## Getting Started

### Prerequisites

- **Bun**: v1.2.2
- **Node**: >=18

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd morph-ui
bun install
```

### Development

Run all apps and packages in development mode:

```bash
bun run dev
```

Run the demo app to see all components and flows:

```bash
turbo dev --filter=kitchen-sink-app
```

## Project Structure

MorphUI is organized as a Turborepo monorepo with the following structure:

```
morph-ui/
├── apps/
│   └── kitchen-sink-app/    # Component library browser & flow showcase
├── packages/
│   ├── react-native/              # @warp-ui/react-native - 27 component library
│   ├── react-native-flows/        # Multi-screen flow templates
│   ├── cli/                       # @warp-ui/cli - Component scaffolding tool
│   ├── eslint-config/             # Shared ESLint configurations
│   ├── typescript-config/         # Shared TypeScript configurations
│   └── jest-config/               # Shared Jest testing configuration
```

### Primary Workspaces

- **`packages/react-native/`**: The core component library (`@warp-ui/react-native`)
  - 27 components with `.theme.ts` files for token-based styling
  - Component registry and MDX documentation
  - Comprehensive test coverage
- **`apps/kitchen-sink-app/`**: Full-featured demo application
  - Drawer navigation for browsing components
  - Dynamic MDX documentation viewer
  - Multi-screen flow demonstrations
- **`packages/react-native-flows/`**: Multi-screen user journey templates
  - Authentication flow (welcome, email, name, password screens)
  - Flow registry system for discovery

## Tech Stack

### Build & Tooling

- **Package Manager**: Bun v1.2.2
- **Build Tool**: Turborepo v2.7.2
- **Language**: TypeScript 5.9.2 (strict mode)

### Framework & Runtime

- **Framework**: React Native (0.81.5 demo app, ^0.76.6 library peer dependency)
- **React**: 19.1.0
- **Platform**: Expo SDK ~54.0.30
- **Router**: Expo Router (file-based routing)

### Testing

- **Test Framework**: Jest 30.2.0
- **Testing Library**: React Native Testing Library
- **Shared Config**: @repo/jest-config

### Code Quality

- **Linter**: ESLint v9 (flat config, zero warnings policy)
- **Formatter**: Prettier
- **TypeScript Config**: Shared via @repo/typescript-config

## Development

### Available Commands

```bash
# Install dependencies
bun install

# Run all apps in dev mode
bun run dev

# Build all apps and packages
bun run build

# Lint all packages (zero warnings enforced)
bun run lint

# Type-check all packages
bun run check-types

# Format code with Prettier
bun run format

# Run tests
bun run test
```

### Working with Specific Packages

Use Turbo filters to target specific workspaces:

```bash
# Demo app
turbo dev --filter=kitchen-sink-app
turbo build --filter=kitchen-sink-app
turbo lint --filter=kitchen-sink-app
turbo check-types --filter=kitchen-sink-app

# Component library
turbo test --filter=@warp-ui/react-native
```

### Development Workflow

For comprehensive development guidelines, see:

- **[CLAUDE.md](./CLAUDE.md)**: Complete development guide with architecture patterns, theming system, and coding standards
- **[openspec/AGENTS.md](./openspec/AGENTS.md)**: OpenSpec workflow for change proposals and specifications
- **[.claude/skills/create-component/SKILL.md](./.claude/skills/create-component/SKILL.md)**: Spec-driven component creation workflow

### Non-Negotiable Rules

MorphUI enforces strict code quality standards:

- **Zero tolerance for comments**: Code must be self-documenting
- **Zero tolerance for `any` type**: Always use proper TypeScript types
- **Conventional Commits**: All commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- **Static analysis gates**: All checks must pass before any work is complete:
  - `bun run lint` (zero warnings)
  - `bun run check-types` (zero errors)
  - `bun run format` (Prettier formatted)
  - `bun run test` (all tests passing)

## Component Library

### Three-Tier Theme System

MorphUI uses a hierarchical token system for consistent, theme-aware styling:

1. **Primitive Tokens**: Raw design values (colors, spacing, typography, radii, shadows)
2. **Semantic Tokens**: Context-aware tokens mapped to light/dark themes
3. **Component Tokens**: Component-specific styling in colocated `.theme.ts` files

### Available Components (27)

**Layout**: box, container, stack, divider

**Input**: input, textarea, checkbox, radio, select, switch, slider, otp-input, label

**Display**: typography, badge, tag, avatar, progress, skeleton, spinner

**Interactive**: button, accordion, tabs

**Feedback**: alert, toast

**Navigation**: fab

**Surfaces**: card

### Component Documentation

All components include:

- TypeScript prop interfaces
- MDX documentation with examples
- Jest tests with React Native Testing Library
- Theme tokens for full customization

See the [component registry](./packages/react-native/src/registry.json) for complete component metadata.

### CLI Usage

The `@warp-ui/cli` package provides scaffolding and management commands:

```bash
# Install CLI globally (from GitHub Packages)
npm install -g @warp-ui/cli

# Initialize Warp UI in project
warp-ui init

# Add component to project
warp-ui add [component]

# Manage CLI configuration
warp-ui config
```

**Note**: CLI is published to GitHub Packages and requires authentication.

## Contributing

We welcome contributions! Before submitting a pull request:

1. **Follow Conventional Commits**: Use the format `<type>[optional scope]: <description>`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`
   - Breaking changes: Add `!` after type/scope

2. **Pass all static analysis checks**:

   ```bash
   bun run lint
   bun run check-types
   bun run format
   bun run test
   ```

3. **Coverage Reporting**:
   - Coverage is automatically collected and displayed in README badges
   - Coverage artifacts are stored for 30 days in GitHub Actions
   - Coverage does not block PR merging but is tracked for quality
   - Aim to maintain or improve coverage with new code
   - View detailed coverage in CI artifacts or coverage-summary.json

4. **Review the development guide**: See [CLAUDE.md](./CLAUDE.md) for complete coding standards, architecture patterns, and theming guidelines

### Development Philosophy

- **Theme-first**: All styling uses design tokens, no hardcoded values
- **TypeScript-first**: Strict typing for all code
- **Copy-paste friendly**: Components designed to be copied to consumer projects
- **Accessible**: WCAG AA compliance target
- **AI-optimized**: Token-efficient design for AI agent consumption

## License

See [LICENSE](./LICENSE) for license information.

---

**Documentation**: [CLAUDE.md](./CLAUDE.md) | **OpenSpec**: [openspec/AGENTS.md](./openspec/AGENTS.md) | **Component Registry**: [registry.json](./packages/react-native/src/registry.json)
