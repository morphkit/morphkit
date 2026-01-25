# File Ownership and Responsibility

This document defines which file is authoritative for each type of information in the morph-ui project documentation system.

## Single Source of Truth

### package.json (Authoritative for Tech Stack)

**Location:** `/Users/jaksamalisic/morph-ui/package.json`

**Authoritative information:**

- Bun version (from `packageManager` field)
- Turborepo version (from `devDependencies.turbo`)
- TypeScript version (from `devDependencies.typescript`)
- Node version requirement (from `engines.node` if specified)
- Workspace structure (from `workspaces` array)

**How to read:**

```javascript
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const bunVersion = packageJson.packageManager.split("@")[1]; // "1.2.2"
const turboVersion = packageJson.devDependencies.turbo; // "^2.7.2"
const typescriptVersion = packageJson.devDependencies.typescript; // "^5.9.2"
```

**Consumers:**

- `openspec/project.md` - Lines 39-42 (Tech Stack section)
- `CLAUDE.md` - Lines 33-40 (Tech Stack section)
- `README.md` - Getting started section (if versions mentioned)

### registry.json (Authoritative for Components)

**Location:** `/Users/jaksamalisic/morph-ui/packages/react-native/registry.json`

**Authoritative information:**

- Total component count
- Component names
- Component categories
- Component metadata (files, dependencies)

**How to read:**

```javascript
const registry = JSON.parse(
  fs.readFileSync("packages/react-native/registry.json", "utf8"),
);
const componentCount = Object.keys(registry.components).length;
const componentNames = Object.keys(registry.components);
```

**Fallback (if registry.json doesn't exist):**

```bash
# Count component directories directly
find packages/react-native/src -maxdepth 1 -type d -not -name "src" | wc -l
```

**Consumers:**

- `openspec/project.md` - Line 9 (Core Features section)
- `CLAUDE.md` - Lines 93, 102 (component count mentions)
- `CLAUDE.md` - Lines 100-108 (Component Categories list)
- `README.md` - Key features section

### openspec/project.md (Authoritative for Conventions)

**Location:** `/Users/jaksamalisic/morph-ui/openspec/project.md`

**Authoritative information:**

- Project purpose and philosophy
- Code style conventions (zero comments, zero `any`, Conventional Commits)
- Architecture patterns (three-tier theme system)
- Testing strategy requirements
- Git workflow (branching, commit policy)
- External dependencies reasoning

**Consumers:**

- `CLAUDE.md` - Development Workflow Rules section (lines 293-421)
- `AGENTS.md` - Critical Quality Gates section

### AGENTS.md (Authoritative for Quality Gates Emphasis)

**Location:** `/Users/jaksamalisic/morph-ui/AGENTS.md`

**Authoritative information:**

- Emphasis on "zero tolerance for failed tests"
- Critical quality gates (lint, check-types, format, test)
- Cross-references to other files using @ notation

**Consumers:**

- `CLAUDE.md` - References quality gate requirements
- `openspec/project.md` - Includes similar testing strategy

### CLAUDE.md (Authoritative for Implementation Patterns)

**Location:** `/Users/jaksamalisic/morph-ui/CLAUDE.md`

**Authoritative information:**

- Three-tier theme system detailed examples
- Typography component usage patterns
- Style merge patterns
- Development commands with Turbo filters
- Testing infrastructure (test-utils.tsx, customRender)
- Documentation system architecture (MDX registry)
- Flow system implementation details

**Consumers:**

- `openspec/project.md` - References theme system (brief version)
- `README.md` - Links to CLAUDE.md for development details

### openspec/AGENTS.md (Authoritative for OpenSpec Workflow)

**Location:** `/Users/jaksamalisic/morph-ui/openspec/AGENTS.md`

**Authoritative information:**

- OpenSpec proposal creation process
- Spec file format and structure
- OpenSpec CLI commands (list, show, validate, archive)
- Decision tree for when to create proposals

**Consumers:**

- `AGENTS.md` - References OpenSpec instructions in managed block

## Propagation Order

When a source of truth changes, update dependent files in this exact order:

### Order 1: Source of Truth Updated

**Files:** `package.json`, `registry.json`

**Action:** External change already happened (version bump, component added)

**No action needed:** These files are the starting point.

### Order 2: Update Detailed Conventions

**File:** `openspec/project.md`

**Sections to update:**

- Lines 39-42: Tech Stack (Build & Tooling)
- Lines 44-49: Framework & Runtime versions
- Lines 51-54: Testing framework versions
- Line 9: Component count in Core Features

**Why first:** This file contains the most detailed and authoritative conventions that other files reference.

### Order 3: Update Comprehensive Guide

**File:** `CLAUDE.md`

**Sections to update:**

- Lines 33-40: Tech Stack section
- Lines 93, 102: Component count mentions
- Lines 100-108: Component Categories list
- Lines 42-108: Monorepo Structure (if workspace changes)

**Why second:** CLAUDE.md is the main development guide and should reflect conventions from openspec/project.md.

### Order 4: Update Brief Wrapper

**File:** `AGENTS.md`

**Sections to update:**

- Only if critical quality gates change
- References to other files (verify @ notation still works)

**Why third:** AGENTS.md is intentionally brief and only changes when critical gates are affected.

### Order 5: Update User-Facing Overview

**File:** `README.md`

**Sections to update:**

- Getting started (if versions mentioned)
- Key features (if component count mentioned)
- Project structure (if workspaces changed)

**Why last:** README is user-facing and should be updated last to ensure internal docs are consistent first.

## Topic Ownership Table

Comprehensive mapping of which file owns each piece of information:

| Topic                       | Primary Source           | Update Order | Secondary Consumers                                                                                                                |
| --------------------------- | ------------------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Bun version**             | package.json             | 1            | openspec/project.md (2), CLAUDE.md (3), skills/code-review (4), skills/sync-docs (4)                                               |
| **Turborepo version**       | package.json             | 1            | openspec/project.md (2), CLAUDE.md (3), skills/code-review (4), skills/sync-docs (4)                                               |
| **TypeScript version**      | package.json             | 1            | openspec/project.md (2), CLAUDE.md (3), skills/code-review (4)                                                                     |
| **React Native version**    | package.json (workspace) | 1            | openspec/project.md (2)                                                                                                            |
| **Expo SDK version**        | package.json (workspace) | 1            | openspec/project.md (2)                                                                                                            |
| **Jest version**            | package.json (workspace) | 1            | openspec/project.md (2)                                                                                                            |
| **Component count**         | registry.json            | 1            | openspec/project.md (2), CLAUDE.md (3), skills/code-review (4), skills/create-component (4), skills/create-flow (4), README.md (7) |
| **Component names**         | registry.json            | 1            | CLAUDE.md (3), skills/create-component (4), skills/create-flow (4)                                                                 |
| **Component categories**    | registry.json            | 1            | CLAUDE.md (3), skills/code-review (4), skills/create-flow (4)                                                                      |
| **Workspace structure**     | package.json             | 1            | openspec/project.md (2), CLAUDE.md (3), README.md (5)                                                                              |
| **Code style rules**        | openspec/project.md      | -            | CLAUDE.md (consumer), AGENTS.md (consumer)                                                                                         |
| **Zero comments rule**      | openspec/project.md      | -            | CLAUDE.md (consumer)                                                                                                               |
| **Zero `any` type rule**    | openspec/project.md      | -            | CLAUDE.md (consumer)                                                                                                               |
| **Conventional Commits**    | openspec/project.md      | -            | CLAUDE.md (consumer)                                                                                                               |
| **Zero failed tests**       | AGENTS.md                | -            | openspec/project.md (consumer), CLAUDE.md (consumer)                                                                               |
| **Three-tier theme system** | CLAUDE.md                | -            | openspec/project.md (brief reference)                                                                                              |
| **Typography patterns**     | CLAUDE.md                | -            | None                                                                                                                               |
| **Testing infrastructure**  | CLAUDE.md                | -            | openspec/project.md (brief strategy)                                                                                               |
| **Git workflow**            | openspec/project.md      | -            | CLAUDE.md (consumer)                                                                                                               |
| **OpenSpec process**        | openspec/AGENTS.md       | -            | AGENTS.md (reference)                                                                                                              |
| **Project purpose**         | openspec/project.md      | -            | README.md (consumer)                                                                                                               |
| **MCP roadmap**             | openspec/project.md      | -            | None                                                                                                                               |
| **Theme token values**      | theme/tokens/primitive/  | -            | CLAUDE.md (consumer), skills/create-flow (consumer)                                                                                |

## File Roles Summary

### package.json

**Role:** Technical configuration and version authority
**Type:** Source of truth (tech stack)
**Update frequency:** Whenever dependencies change
**Consumers:** All documentation files

### registry.json

**Role:** Component catalog and metadata
**Type:** Source of truth (components)
**Update frequency:** Whenever components added/removed
**Consumers:** openspec/project.md, CLAUDE.md, README.md

### openspec/project.md

**Role:** Project conventions and detailed tech context
**Type:** Authoritative conventions + consumer of package.json
**Update frequency:** When project structure or conventions change
**Consumers:** CLAUDE.md, AGENTS.md, README.md

### CLAUDE.md

**Role:** Comprehensive development guide with patterns
**Type:** Consumer + authoritative implementation patterns
**Update frequency:** When patterns change or project details update
**Consumers:** openspec/project.md (references theme system)

### AGENTS.md

**Role:** Brief quality gates emphasis and cross-references
**Type:** Consumer + authoritative quality emphasis
**Update frequency:** When critical gates change
**Consumers:** CLAUDE.md, openspec/project.md

### openspec/AGENTS.md

**Role:** OpenSpec workflow and proposal process
**Type:** Authoritative OpenSpec process
**Update frequency:** When OpenSpec workflow changes
**Consumers:** AGENTS.md (references it)

### README.md

**Role:** User-facing project overview
**Type:** Consumer only
**Update frequency:** When project details change
**Consumers:** None (terminal node)

### .claude/skills/_/SKILL.md and references/_.md

**Role:** Skill documentation with reference material
**Type:** Consumers of project documentation and codebase state
**Update frequency:** When component count, versions, or patterns change
**Consumers:** None (terminal nodes)

**Key skills that consume project information:**

- **code-review**: Consumes component count, tech stack versions, component categories
- **create-component**: Consumes component count, component patterns, theme system
- **create-flow**: Consumes component list, component props, theme token values
- **sync-docs**: Consumes tech stack versions (in detection patterns), file structure

**Update triggers:**

- Component added/removed → Update code-review, create-component, create-flow skills
- Tech stack version change → Update code-review, sync-docs skills
- Component API change → Update create-flow skill examples
- Theme token change → Update create-flow skill reference docs

## Conflict Resolution

If conflicting information exists across files, resolve using this priority:

### Tech Stack Versions

1. **package.json** (always wins)
2. openspec/project.md (should match #1)
3. CLAUDE.md (should match #1)
4. skills/\* (should match #1)
5. README.md (should match #1)

**Resolution:** Update all files to match package.json, including skill documentation.

### Component Count

1. **Actual codebase** (count directories in packages/react-native/src/)
2. **registry.json** (should match #1)
3. openspec/project.md (should match #2)
4. CLAUDE.md (should match #2)
5. skills/\* (should match #2)
6. README.md (should match #2)

**Resolution:** Update registry.json first, then propagate to docs and skill files.

### Development Rules

1. **openspec/project.md** (authoritative conventions)
2. CLAUDE.md (consumer, should match #1)
3. AGENTS.md (consumer, should match #1)

**Resolution:** Update openspec/project.md first, then propagate to consumers.

### Quality Gates Emphasis

1. **AGENTS.md** (emphasizes zero failed tests)
2. openspec/project.md (includes testing strategy)
3. CLAUDE.md (includes testing requirements)

**Resolution:** AGENTS.md can emphasize more strongly than others, but requirements should be consistent.

### Implementation Patterns

1. **CLAUDE.md** (authoritative patterns)
2. openspec/project.md (can reference briefly)

**Resolution:** CLAUDE.md is authoritative for how to implement. openspec/project.md describes what to implement.

## Update Checklist by Change Type

### Tech Stack Version Change

**Files to update in order:**

1. ✅ package.json (already updated)
2. ⬜ openspec/project.md - Tech Stack section
3. ⬜ CLAUDE.md - Tech Stack section
4. ⬜ README.md - If versions mentioned in getting started

**Verification:**

```bash
grep -n "Bun" package.json openspec/project.md CLAUDE.md README.md
grep -n "Turborepo" package.json openspec/project.md CLAUDE.md README.md
grep -n "TypeScript" package.json openspec/project.md CLAUDE.md README.md
```

### Component Addition/Removal

**Files to update in order:**

1. ⬜ registry.json - Add/remove component entry
2. ⬜ openspec/project.md - Update component count (line 9)
3. ⬜ CLAUDE.md - Update component count (lines 93, 102)
4. ⬜ CLAUDE.md - Update component categories (lines 100-108)
5. ⬜ .claude/skills/code-review/SKILL.md - Update component categories if mentioned
6. ⬜ .claude/skills/code-review/references/morph-ui-standards.md - Update component list
7. ⬜ .claude/skills/create-component/SKILL.md - Update component count
8. ⬜ .claude/skills/create-flow/SKILL.md - Update available components
9. ⬜ .claude/skills/create-flow/references/component-detection.md - Update component list
10. ⬜ README.md - Update component count if mentioned

**Verification:**

```bash
# Count actual components
find packages/react-native/src -maxdepth 1 -type d -not -name "src" | wc -l

# Check mentions in docs and skills
grep -n "29 components" openspec/project.md CLAUDE.md README.md
grep -r "29 components" .claude/skills/
grep -r "29 total" .claude/skills/
```

### Monorepo Structure Change

**Files to update in order:**

1. ✅ package.json workspaces (already updated)
2. ⬜ openspec/project.md - Update structure description
3. ⬜ CLAUDE.md - Update Monorepo Structure section
4. ⬜ README.md - Update project structure section

**Verification:**

```bash
# Check workspace structure
grep -A 10 '"workspaces"' package.json

# Verify documentation matches
grep -n "apps/\*" openspec/project.md CLAUDE.md README.md
```

### Development Rule Change

**Files to update in order:**

1. ⬜ openspec/project.md - Update conventions
2. ⬜ CLAUDE.md - Update workflow rules
3. ⬜ AGENTS.md - Update if critical quality gate

**Verification:**

```bash
# Check rule consistency
grep -n "zero tolerance" openspec/project.md CLAUDE.md AGENTS.md
grep -n "Conventional Commits" openspec/project.md CLAUDE.md
```

## Cross-Reference Validation

Verify cross-references work correctly:

### AGENTS.md References

**Expected references:**

- `@CLAUDE.md` - Should resolve to `/Users/jaksamalisic/morph-ui/CLAUDE.md`
- `@openspec/project.md` - Should resolve to `/Users/jaksamalisic/morph-ui/openspec/project.md`
- `@openspec/AGENTS.md` - Should resolve to `/Users/jaksamalisic/morph-ui/openspec/AGENTS.md`

**Validation:**

```bash
# Check @ notation usage
grep -n "@CLAUDE.md" AGENTS.md
grep -n "@openspec" AGENTS.md

# Verify files exist
test -f CLAUDE.md && echo "✅ CLAUDE.md exists"
test -f openspec/project.md && echo "✅ openspec/project.md exists"
test -f openspec/AGENTS.md && echo "✅ openspec/AGENTS.md exists"
```

### OpenSpec Block References

**Expected references in CLAUDE.md:**

- `@/openspec/AGENTS.md` - OpenSpec instructions block (lines 7-17)

**Validation:**

```bash
# Check OpenSpec block
grep -A 10 "OPENSPEC:START" CLAUDE.md

# Verify OpenSpec AGENTS.md exists
test -f openspec/AGENTS.md && echo "✅ openspec/AGENTS.md exists"
```

## Maintenance

This file should be updated when:

- New documentation files are added
- File ownership responsibilities change
- New topics need authoritative sources
- Propagation order needs adjustment
- Cross-reference patterns change

**Last updated:** 2026-01-11 (initial creation)
