# Documentation Sync Checklist

Use this checklist after making project changes to ensure all documentation files are in sync.

## Quick Verification Commands

Run these commands to quickly check for common inconsistencies:

```bash
# Check Bun version consistency
grep -n "Bun" CLAUDE.md openspec/project.md

# Check Turborepo version consistency
grep -n "Turborepo" CLAUDE.md openspec/project.md

# Check TypeScript version consistency
grep -n "TypeScript" CLAUDE.md openspec/project.md

# Count actual components
find packages/react-native/src -maxdepth 1 -type d | wc -l

# Check component count mentions
grep -n "26 components" CLAUDE.md openspec/project.md README.md

# Check README for generic template
grep -n "official starter Turborepo" README.md
```

## Version Changes

Use this checklist when tech stack versions change in package.json:

- [ ] **package.json updated** with new version
- [ ] **openspec/project.md Tech Stack section matches package.json**
  - Lines 39-42: Build & Tooling (Bun, Turborepo, TypeScript)
  - Lines 44-49: Framework & Runtime (React Native, React, Expo)
  - Lines 51-54: Testing (Jest)
- [ ] **CLAUDE.md Tech Stack section matches package.json**
  - Lines 33-40: Package Manager, Build Tool, Node, Language
- [ ] **README.md mentions correct versions** (if applicable in getting started)
- [ ] **Run verification commands** to confirm consistency

### Version Change Example

If Bun upgrades from 1.2.2 to 1.2.3:

1. Update `package.json`:

   ```json
   "packageManager": "bun@1.2.3"
   ```

2. Update `openspec/project.md` line 40:

   ```markdown
   - **Package Manager**: Bun v1.2.3
   ```

3. Update `CLAUDE.md` line 35:

   ```markdown
   - **Package Manager**: Bun (v1.2.3)
   ```

4. Verify:
   ```bash
   grep "1.2.3" package.json openspec/project.md CLAUDE.md
   ```

## Component Changes

Use this checklist when components are added or removed:

- [ ] **Component added/removed** from `packages/react-native/src/`
- [ ] **registry.json updated** with new component count
  - Add/remove component entry in `components` object
- [ ] **openspec/project.md component count updated**
  - Line 9: Core Features section ("26 Production-Ready Components")
- [ ] **CLAUDE.md component count updated**
  - Line 93: Repository Overview ("**26 fully-implemented components**")
  - Line 102: Component Categories intro ("**26 fully-implemented components**")
- [ ] **CLAUDE.md component categories list updated**
  - Lines 100-108: Add/remove from category list
- [ ] **README.md component count updated** (if component count is mentioned)
- [ ] **Run verification commands** to confirm count is accurate

### Component Addition Example

If adding a new "Tooltip" component in the "Feedback" category:

1. Create component in `packages/react-native/src/tooltip/`

2. Update `packages/react-native/registry.json`:

   ```json
   "components": {
     ...existing components,
     "tooltip": {
       "name": "Tooltip",
       "category": "feedback",
       ...
     }
   }
   ```

3. Update `openspec/project.md` line 9:

   ```markdown
   - **27 Production-Ready Components** (many more planned)
   ```

4. Update `CLAUDE.md` line 93:

   ```markdown
   - **27 fully-implemented components** following three-tier theme system
   ```

5. Update `CLAUDE.md` line 102:

   ```markdown
   **Component Categories**:
   ```

6. Update `CLAUDE.md` lines 105 (Feedback category):

   ```markdown
   - Feedback: alert, toast, tooltip
   ```

7. Verify:
   ```bash
   find packages/react-native/src -maxdepth 1 -type d -not -name "src" | wc -l  # Should show 28
   grep "28" openspec/project.md CLAUDE.md
   grep -r "28 components" .claude/skills/
   grep -r "28 total" .claude/skills/
   ```

## Skills Documentation Sync

Use this checklist when component count, versions, or patterns change that affect skill documentation:

- [ ] **Identify affected skills** based on change type:
  - Component count change → code-review, create-component, create-flow
  - Tech stack versions → code-review, sync-docs
  - Component API/props → create-flow, create-component
  - Theme tokens → create-flow
- [ ] **Update code-review skill** (if component count or versions changed)
  - `.claude/skills/code-review/SKILL.md` - Component categories mention
  - `.claude/skills/code-review/references/morph-ui-standards.md` - Component count and categories
- [ ] **Update create-component skill** (if component count or patterns changed)
  - `.claude/skills/create-component/SKILL.md` - Component count references
  - `.claude/skills/create-component/references/component-patterns.md` - Pattern examples
- [ ] **Update create-flow skill** (if component list or props changed)
  - `.claude/skills/create-flow/SKILL.md` - Available components mention
  - `.claude/skills/create-flow/references/component-detection.md` - Full component list with props
  - `.claude/skills/create-flow/references/examples.md` - Example usage
- [ ] **Update sync-docs skill** (if tech stack versions in detection commands changed)
  - `.claude/skills/sync-docs/SKILL.md` - Detection command examples
  - `.claude/skills/sync-docs/references/inconsistencies.md` - Version patterns
- [ ] **Run verification commands** to confirm skills are in sync

### Skills Sync Example

If adding a new "Tooltip" component (28th component):

1. Update all main docs first (openspec/project.md, CLAUDE.md, etc.)

2. Update `.claude/skills/code-review/references/morph-ui-standards.md`:
   - Line ~93: Change "27 components" to "28 components"
   - Update Feedback category to include tooltip

3. Update `.claude/skills/create-component/SKILL.md`:
   - Update any "27 components" references to "28 components"

4. Update `.claude/skills/create-flow/SKILL.md`:
   - Update "27 total" to "28 total"

5. Update `.claude/skills/create-flow/references/component-detection.md`:
   - Add Tooltip component with its props and usage examples

6. Verify:

   ```bash
   # Check all skills updated
   grep -r "28 components" .claude/skills/
   grep -r "28 total" .claude/skills/
   grep -r "tooltip" .claude/skills/create-flow/

   # Should find new component in all expected locations
   ```

## Structure Changes

Use this checklist when monorepo workspace structure changes:

- [ ] **Monorepo workspace structure changed** in `package.json` workspaces
- [ ] **openspec/project.md updated** with new structure
  - Add/remove workspace descriptions in appropriate sections
- [ ] **CLAUDE.md "Monorepo Structure" section updated**
  - Lines 42-49: Workspace list
  - Lines 51-108: Current Structure section with package descriptions
- [ ] **README.md reflects new structure**
  - Update project structure section if present
- [ ] **Run verification commands** to confirm workspaces listed correctly

### Structure Change Example

If adding a new `web/*` workspace for web components:

1. Update `package.json`:

   ```json
   "workspaces": [
     "apps/*",
     "packages/*",
     "react-native/*",
     "web/*"
   ]
   ```

2. Update `openspec/project.md` (add to appropriate section)

3. Update `CLAUDE.md` lines 43-47:

   ```markdown
   The repository uses Turborepo workspaces defined in root `package.json`:

   - `apps/*` - Applications
   - `packages/*` - Shared tooling and configurations
   - `react-native/*` - **Primary workspace for React Native component library**
   - `web/*` - Web component library
   ```

4. Add description in `CLAUDE.md` Current Structure section

5. Verify:
   ```bash
   grep -A 10 '"workspaces"' package.json
   grep "web/\*" CLAUDE.md openspec/project.md
   ```

## Development Rules Changes

Use this checklist when development workflow rules change:

- [ ] **openspec/project.md conventions updated**
  - Code Style section (lines 75-87)
  - Architecture Patterns section (lines 96-113)
  - Testing Strategy section (lines 115-134)
  - Git Workflow section (lines 136-156)
- [ ] **CLAUDE.md workflow rules updated**
  - Development Workflow Rules section (lines 293-421)
- [ ] **AGENTS.md quality gates updated** (if critical requirement changed)
  - Critical Quality Gates section (lines 26-43)
- [ ] **Verify consistency** of "zero tolerance" rules across all files
- [ ] **Update examples** if commit format or patterns changed

### Rule Change Example

If changing Conventional Commits to require scope:

1. Update `openspec/project.md` line 82:

   ```markdown
   - **Conventional Commits**: All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification with required scope
   ```

2. Update `CLAUDE.md` line 363:

   ```markdown
   Format: `<type>(<scope>): <description>` (scope is required)
   ```

3. Update examples in both files to include scopes

4. Verify:
   ```bash
   grep -n "Conventional Commits" openspec/project.md CLAUDE.md
   ```

## README.md Replacement

Use this checklist when replacing the outdated README.md:

- [ ] **README.md replaced** with actual project documentation
- [ ] **Includes: Project overview** (from openspec/project.md Purpose section)
- [ ] **Includes: Getting started** with installation and dev commands
- [ ] **Includes: Key features**
  - Component count (from registry.json)
  - Multi-screen flows
  - Three-tier theme system
  - CLI tooling
- [ ] **Includes: Tech stack** (from package.json and openspec/project.md)
- [ ] **Includes: Project structure** (from CLAUDE.md Monorepo Structure)
- [ ] **References CLAUDE.md** for development details
- [ ] **References openspec/AGENTS.md** for spec workflow
- [ ] **Project name is correct** ("morph-ui" or "MorphUI")
- [ ] **No generic Turborepo template phrases remain**
- [ ] **Badges included** (if applicable: build status, version, license)
- [ ] **Contribution guidelines** mentioned or linked

### README.md Template Structure

````markdown
# MorphUI

[Brief tagline from openspec/project.md Purpose]

## Overview

[Project overview from openspec/project.md]

## Features

- **[Component count] Production-Ready Components** - [Categories]
- **Multi-Screen Flows** - Pre-built user journeys
- **Three-Tier Theme System** - Fully customizable styling
- **CLI Tooling** - Component and flow scaffolding
- **AI-First Design** - Optimized for AI agent consumption

## Tech Stack

[From package.json and openspec/project.md]

## Getting Started

### Prerequisites

- Node.js >= 18
- Bun v[version from package.json]

### Installation

```bash
bun install
```
````

### Development

```bash
# Run all apps in dev mode
bun run dev

# Run demo app
turbo dev --filter=kitchen-sink-app
```

## Project Structure

[From CLAUDE.md Monorepo Structure section]

## Documentation

- **[CLAUDE.md](CLAUDE.md)** - Comprehensive development guide
- **[openspec/AGENTS.md](openspec/AGENTS.md)** - OpenSpec workflow

## Contributing

[Contribution guidelines]

## License

[License information]

````

## Post-Sync Verification

After completing any sync, run these verification steps:

### 1. Static Analysis Checks

```bash
# Lint check (must pass with zero warnings)
bun run lint

# Type check (must pass with zero errors)
bun run check-types

# Format check (must pass)
bun run format

# Test check (must pass with zero failures)
bun run test
````

**All checks must pass before marking sync complete.**

### 2. Content Verification

```bash
# Verify versions match
node .claude/skills/sync-docs/scripts/validate-docs.js

# Or manually:
# Check Bun version
bunVersion=$(grep -o '"packageManager": "bun@[^"]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
grep "$bunVersion" CLAUDE.md openspec/project.md .claude/skills/code-review/references/morph-ui-standards.md

# Check component count
componentCount=$(find packages/react-native/src -maxdepth 1 -type d -not -name "src" | wc -l | tr -d ' ')
grep "$componentCount" CLAUDE.md openspec/project.md
grep -r "$componentCount components" .claude/skills/
grep -r "$componentCount total" .claude/skills/

# Check skills exist
test -f .claude/skills/code-review/references/morph-ui-standards.md && echo "✅ code-review skill exists"
test -f .claude/skills/create-flow/references/component-detection.md && echo "✅ create-flow skill exists"
```

### 3. Cross-Reference Verification

```bash
# Verify @ notation references exist
grep -n "@CLAUDE.md" AGENTS.md
test -f CLAUDE.md && echo "✅ CLAUDE.md exists" || echo "❌ CLAUDE.md missing"

grep -n "@openspec/project.md" AGENTS.md
test -f openspec/project.md && echo "✅ openspec/project.md exists" || echo "❌ openspec/project.md missing"

grep -n "@openspec/AGENTS.md" AGENTS.md
test -f openspec/AGENTS.md && echo "✅ openspec/AGENTS.md exists" || echo "❌ openspec/AGENTS.md missing"
```

### 4. Consistency Checks

```bash
# Check zero tolerance rules are consistent
grep -n "zero tolerance" CLAUDE.md AGENTS.md openspec/project.md

# Check Conventional Commits examples match
grep -A 5 "feat(" CLAUDE.md openspec/project.md

# Check quality gates are consistent
grep -n "bun run lint" CLAUDE.md AGENTS.md openspec/project.md
grep -n "bun run check-types" CLAUDE.md AGENTS.md openspec/project.md
grep -n "bun run format" CLAUDE.md AGENTS.md openspec/project.md
grep -n "bun run test" CLAUDE.md AGENTS.md openspec/project.md
```

## Troubleshooting

### Inconsistencies Detected After Sync

**Problem:** Verification commands show mismatches after sync

**Solution:**

1. Identify which file has incorrect information
2. Check file ownership in [file-ownership.md](file-ownership.md)
3. Update files in correct propagation order
4. Re-run verification commands

### Static Analysis Fails After Sync

**Problem:** `bun run lint` or `bun run check-types` fails after updates

**Solution:**

1. Run `bun run format` to fix formatting issues
2. Check if updates introduced syntax errors
3. Verify all files are valid markdown
4. Run individual commands to isolate issue:
   ```bash
   bun run lint
   bun run check-types
   bun run format
   ```

### Component Count Mismatch

**Problem:** registry.json count doesn't match actual component directories

**Solution:**

1. Count actual directories:
   ```bash
   find packages/react-native/src -maxdepth 1 -type d -not -name "src" | wc -l
   ```
2. Update registry.json to match actual count
3. Propagate to documentation files in order

### Version String Format Differs

**Problem:** Version mentioned as "1.2.2" in one file and "v1.2.2" in another

**Solution:**

1. Standardize format based on authoritative source (package.json)
2. Update all files to use consistent format
3. Prefer format without "v" prefix unless package.json includes it

## Maintenance Schedule

Recommended sync schedule:

- **After every dependency update**: Sync tech stack versions
- **After adding/removing components**: Sync component count
- **After monorepo restructure**: Sync structure descriptions
- **After rule changes**: Sync development workflow rules
- **Weekly**: Run full verification to catch drift
- **Before releases**: Complete sync check using all checklists

## Automation

Consider automating sync checks using:

1. **Pre-commit hook**: Run validation script before commits

   ```bash
   # .git/hooks/pre-commit
   #!/bin/bash
   node .claude/skills/sync-docs/scripts/validate-docs.js
   ```

2. **CI/CD pipeline**: Run validation in GitHub Actions

   ```yaml
   # .github/workflows/validate-docs.yml
   - name: Validate documentation sync
     run: node .claude/skills/sync-docs/scripts/validate-docs.js
   ```

3. **Periodic checks**: Schedule weekly automation to detect drift
   ```bash
   # cron job or GitHub Actions scheduled workflow
   0 0 * * 1 node .claude/skills/sync-docs/scripts/validate-docs.js
   ```

## Success Criteria

Documentation is successfully synced when:

- ✅ All verification commands pass
- ✅ Static analysis checks pass (lint, check-types, format, test)
- ✅ Tech stack versions match package.json across all files
- ✅ Component count matches actual codebase
- ✅ Cross-references resolve correctly
- ✅ Development rules are consistent
- ✅ README.md contains project-specific information
- ✅ No generic template phrases remain
