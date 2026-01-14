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

# Project-Specific Agent Instructions

## Critical Quality Gates

**Before marking any task as complete, ALL checks must pass:**

- ✅ `bun run lint` - Zero ESLint warnings/errors
- ✅ `bun run check-types` - Zero TypeScript errors
- ✅ `bun run format` - Code must be formatted with Prettier
- ✅ `bun run test` - **ALL tests must pass with zero failures**

### Zero Tolerance for Failed Tests

**CRITICAL REQUIREMENT**: Even if failing tests are unrelated to your current change, ALL tests must pass before marking work as complete.

- Never ignore or skip failing tests
- Never mark a task as "done" with failing tests
- Fix all test failures before proceeding
- If tests are failing due to issues outside your scope, fix them anyway before completing your task

This is non-negotiable. The test suite must always be green.

## Component Creation

Component creation uses a split workflow with specialized skills and agents:

### Skills (Main Conversation)
- **`spec-component`**: Creates OpenSpec proposals with Figma integration
- **`develop-component`**: Implements components from approved proposals

### Agents (Isolated Context)
- **`component-spec-writer`**: Autonomous proposal creation (parallel execution: 10+ agents)
- **`component-developer`**: Autonomous component implementation (parallel execution: 10+ agents)

**Use skills** for sequential work on 1-2 components. **Use agents** for parallel work on 5-10+ components.

Every component requires an OpenSpec proposal before implementation. See `.claude/agents/README.md` for complete usage guide, workflow examples, and when to use skills vs agents.

## Additional Requirements

For complete project conventions, see:

- **`@CLAUDE.md`** - Comprehensive development workflow rules and conventions
- **`@openspec/project.md`** - OpenSpec-specific project context and constraints
