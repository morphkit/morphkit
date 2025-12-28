# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**morph-ui** is an internal component library monorepo, similar in spirit to shadcn/ui. The primary focus is building a **React Native component library** with shared tooling and configurations.

**IMPORTANT**: The current repository contains default Turborepo scaffolding that will be overwritten. The apps (`web`, `docs`) and existing `packages/ui` are placeholder files from the initial `create-turbo` setup.

### Tech Stack
- **Package Manager**: Bun (v1.2.2)
- **Build Tool**: Turborepo (v2.7.2)
- **Node Version**: >=18
- **Language**: TypeScript 5.9.2
- **Primary Target**: React Native component library

## Monorepo Structure

The repository uses Turborepo workspaces defined in root `package.json`:
- `apps/*` - Demo/example applications
- `packages/*` - Shared tooling and configurations
- `react-native/*` - **Primary workspace for React Native component library**

### Planned Structure

**`react-native/*`** - React Native Component Library (Primary Focus)
- This is where the main component library will be built
- Components should follow shadcn/ui philosophy: customizable, copy-paste friendly
- Currently an empty directory, ready for initial setup

**`packages/*`** - Shared Tooling
- **@repo/eslint-config**: Shared ESLint configurations (currently has base, next.js, react-internal)
- **@repo/typescript-config**: Shared TypeScript configurations (currently has base, nextjs, react-library)
- Additional packages can be added for shared utilities, testing configs, etc.

**`apps/*`** - Demo Applications (Optional)
- Placeholder apps from Turborepo scaffolding (web, docs)
- Can be repurposed for component documentation or demo apps
- May be removed or replaced with React Native example apps

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
# Work with React Native component library (once created)
turbo dev --filter=<react-native-package-name>
turbo build --filter=<react-native-package-name>
turbo lint --filter=<react-native-package-name>

# Work with placeholder apps
turbo dev --filter=web
turbo dev --filter=docs
```

Note: Replace `<react-native-package-name>` with the actual package name once the React Native library is set up.

## Turborepo Task Configuration

Tasks are defined in `turbo.json`:

- **build**: Has dependency graph (`^build`), includes `.env*` files, outputs to `.next/**`
  - Will need to be updated for React Native build outputs
- **lint**: Has dependency graph (`^lint`)
- **check-types**: Has dependency graph (`^check-types`)
  - Uses `tsc --noEmit` for type checking
- **dev**: No caching, persistent task

## Design Philosophy

As a shadcn/ui-inspired library for React Native:

- **Copy-paste friendly**: Components should be easy to copy into projects and customize
- **Unstyled by default**: Provide structure and behavior, styling should be flexible
- **TypeScript-first**: Strong typing for all components and props
- **Composable**: Small, focused components that work together
- **Accessible**: Follow React Native accessibility best practices

## Architecture Notes

### ESLint Configuration
The monorepo uses ESLint v9 with flat config format:
- All configs enforce zero warnings: `--max-warnings 0`
- Shared configs available in `@repo/eslint-config`
- React Native packages will need appropriate ESLint config (may need new config file)

### TypeScript Setup
- Shared configs in `@repo/typescript-config` provide base settings
- Each package has its own `tsconfig.json` extending the shared configs
- Type checking runs with `tsc --noEmit`

## Important Patterns

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
