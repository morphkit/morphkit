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

When users request component creation (e.g., "create a Button component", "add a new Input component"), use the `create-component` skill. This implements a spec-driven workflow:

- Every component requires an OpenSpec proposal before implementation
- Proposal must be validated and approved before coding begins
- Implementation follows a structured tasks.md checklist
- See `.claude/skills/create-component/SKILL.md` for the three-phase workflow

This ensures architectural consistency and proper documentation for all components.

## Additional Requirements

For complete project conventions, see:

- **`@CLAUDE.md`** - Comprehensive development workflow rules and conventions
- **`@openspec/project.md`** - OpenSpec-specific project context and constraints
