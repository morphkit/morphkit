# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**morph-ui** is an internal component library monorepo, similar in spirit to shadcn/ui. The primary focus is building a **React Native component library** with shared tooling and configurations.

The repository has been configured with a minimal React Native app using Expo Router and full Turborepo integration through shared ESLint and TypeScript configurations.

### Tech Stack

- **Package Manager**: Bun (v1.2.2)
- **Build Tool**: Turborepo (v2.7.2)
- **Node Version**: >=18
- **Language**: TypeScript 5.9.2
- **Primary Target**: React Native component library

## Monorepo Structure

The repository uses Turborepo workspaces defined in root `package.json`:

- `apps/*` - Applications
- `packages/*` - Shared tooling and configurations
- `react-native/*` - **Primary workspace for React Native component library**

### Current Structure

**`apps/react-native-ui/`** - Minimal Expo App with Router

- Single-screen "Hello World" app using Expo Router
- Fully integrated with monorepo shared configs
- Uses `@repo/eslint-config/react-native` and `@repo/typescript-config/react-native`
- File-based routing in `app/` directory
- Entry point: `expo-router/entry`

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

**`react-native/*`** - React Native Component Library (Future)

- Reserved for the main component library packages
- Components will follow shadcn/ui philosophy: customizable, copy-paste friendly

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
# Work with React Native UI app
turbo dev --filter=react-native-ui
turbo build --filter=react-native-ui
turbo lint --filter=react-native-ui
turbo check-types --filter=react-native-ui
```

## Turborepo Task Configuration

Tasks are defined in `turbo.json`:

- **build**: Has dependency graph (`^build`), includes `.env*` files, outputs: `[]` (no build artifacts cached)
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

## Development Workflow Rules

These rules are **non-negotiable** and must be followed strictly:

### 1. Static Analysis Requirements

**Before marking any task as complete, ALL static analysis checks must pass:**

- ✅ `bun run lint` - Zero ESLint warnings/errors
- ✅ `bun run check-types` - Zero TypeScript errors
- ✅ `bun run format` - Code must be formatted with Prettier
- ✅ All tests must pass (when tests are added to the project)

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
