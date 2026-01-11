---
name: sync-docs
description: Keeps documentation files (CLAUDE.md, AGENTS.md, openspec/project.md, README.md) in sync during project development. Use when user mentions "sync docs", "update documentation", "docs out of sync", "keep docs consistent", or when making changes that affect project structure, tech stack, component count, or development rules.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
---

# Documentation Sync Skill

## Overview

This skill helps maintain consistency across multiple documentation files in the morph-ui project. During early-stage development, project structure frequently pivots, and documentation can easily drift out of sync.

**Key files monitored:**

- `CLAUDE.md` - Main development guide with comprehensive patterns
- `AGENTS.md` - Brief wrapper emphasizing critical quality gates
- `openspec/project.md` - Project conventions and philosophies
- `openspec/AGENTS.md` - OpenSpec workflow instructions
- `README.md` - User-facing project overview
- `package.json` - Single source of truth for tech stack versions
- `packages/react-native/registry.json` - Component registry

**When to use this skill:**

- Project structure changes (adding/removing workspaces)
- Version updates (Bun, Turborepo, TypeScript, React Native, Expo, Jest)
- Component additions or removals
- Development workflow rule changes
- README.md needs updating

## Detection Strategy

Before making changes, detect inconsistencies:

1. **Check tech stack versions**
   - Read `package.json` for authoritative versions
   - Compare with versions mentioned in `CLAUDE.md` and `openspec/project.md`
   - Look for: Bun, Turborepo, TypeScript, React Native, Expo SDK, Jest

2. **Verify component count**
   - Count actual component directories in `packages/react-native/src/`
   - Check `packages/react-native/registry.json` for component count
   - Compare with references in `CLAUDE.md` and `openspec/project.md`

3. **Check README.md relevance**
   - Verify README contains project-specific information
   - Look for generic Turborepo template phrases
   - Ensure project name is correct ("morph-ui" or "MorphUI")

4. **Verify development rules consistency**
   - Compare "zero tolerance" rules across all files
   - Check lint/check-types/format/test requirements
   - Verify Conventional Commits examples match

5. **Check cross-references**
   - Verify @ notation references in `AGENTS.md` work
   - Ensure file paths exist and are correct
   - Check relative paths in openspec files

## Sync Workflow

Follow this workflow when syncing documentation:

### Step 1: Identify Change Type

Determine what changed:

- **Tech stack versions**: package.json updated with new versions
- **Components**: New component added or existing component removed
- **Monorepo structure**: Workspaces added/removed/reorganized
- **Development rules**: Code quality gates or workflow rules changed
- **README**: Needs complete replacement or significant update

### Step 2: Find Authoritative Source

Each topic has a single source of truth:

- **Tech stack versions**: `package.json` (devDependencies, dependencies, packageManager)
- **Component count/metadata**: `packages/react-native/registry.json`
- **Development rules**: `openspec/project.md` (authoritative conventions)
- **Code quality gates**: `AGENTS.md` (emphasizes critical requirements)
- **Theme system**: `CLAUDE.md` (detailed implementation patterns)

See [file-ownership.md](references/file-ownership.md) for complete mapping.

### Step 3: Update Dependent Files in Order

Update files in this exact order to maintain consistency:

1. **Source of truth** (package.json or registry.json) - Already updated
2. **openspec/project.md** - Update detailed conventions and tech stack
3. **CLAUDE.md** - Update comprehensive guide and examples
4. **AGENTS.md** - Update brief references if critical quality gates changed
5. **README.md** - Update user-facing overview

**Important:** Never skip files in this order. Each file may reference information updated in previous files.

### Step 4: Verify Consistency

After updates, cross-check:

- All version numbers match across files
- Component count is consistent
- Development rules have same emphasis
- Cross-references work correctly
- No broken links or outdated information

### Step 5: Report Changes

Provide a summary of what was synced:

- List files updated
- Describe what changed in each file
- Note any inconsistencies detected and fixed
- Mention any files that need manual review

## File Ownership Matrix

Quick reference for which file owns which information:

| Information          | Authoritative Source | Consumers                                 |
| -------------------- | -------------------- | ----------------------------------------- |
| Tech Stack Versions  | package.json         | openspec/project.md, CLAUDE.md            |
| Component Count      | registry.json        | openspec/project.md, CLAUDE.md, README.md |
| Development Rules    | openspec/project.md  | CLAUDE.md, AGENTS.md                      |
| Code Quality Gates   | AGENTS.md            | CLAUDE.md, openspec/project.md            |
| Theme System Details | CLAUDE.md            | openspec/project.md (brief)               |
| Git Workflow         | openspec/project.md  | CLAUDE.md                                 |
| OpenSpec Process     | openspec/AGENTS.md   | AGENTS.md (reference)                     |

## Common Sync Scenarios

### Scenario 1: Adding a New Component

**Trigger:** New component added to `packages/react-native/src/`

**Detection:**

```bash
# Count component directories
find packages/react-native/src -maxdepth 1 -type d | wc -l
```

**Sync workflow:**

1. Update `packages/react-native/registry.json` with new component
2. Update component count in `openspec/project.md` (line ~9)
3. Update component count in `CLAUDE.md` (lines ~93, ~102)
4. Update component categories list in `CLAUDE.md` (lines ~100-108)
5. Update `README.md` if component count is mentioned

**Files to edit:**

- `packages/react-native/registry.json`
- `openspec/project.md`
- `CLAUDE.md`
- `README.md` (if applicable)

### Scenario 2: Version Upgrade

**Trigger:** package.json updated with new dependency versions

**Detection:**

```bash
# Check Bun version
grep -n "Bun" CLAUDE.md openspec/project.md

# Check Turborepo version
grep -n "Turborepo" CLAUDE.md openspec/project.md
```

**Sync workflow:**

1. Read `package.json` for authoritative versions
2. Update tech stack section in `openspec/project.md` (lines ~36-72)
3. Update tech stack section in `CLAUDE.md` (lines ~33-40)
4. Update `README.md` if versions are mentioned in getting started

**Files to edit:**

- `openspec/project.md`
- `CLAUDE.md`
- `README.md` (if applicable)

### Scenario 3: Monorepo Structure Change

**Trigger:** Workspace added, removed, or reorganized

**Detection:**

```bash
# Check workspace structure
grep -A 20 '"workspaces"' package.json
```

**Sync workflow:**

1. Update monorepo structure in `openspec/project.md`
2. Update "Monorepo Structure" section in `CLAUDE.md` (lines ~42-108)
3. Update `README.md` project structure section

**Files to edit:**

- `openspec/project.md`
- `CLAUDE.md`
- `README.md`

### Scenario 4: README.md Replacement

**Trigger:** README.md contains generic Turborepo template

**Detection:**

```bash
# Check for generic template phrases
grep -n "official starter Turborepo" README.md
```

**Sync workflow:**

1. Read current `CLAUDE.md` and `openspec/project.md` for context
2. Create new `README.md` with:
   - Project overview from `openspec/project.md` Purpose section
   - Getting started with installation and dev commands
   - Key features (components, flows, theme system)
   - Links to detailed documentation (CLAUDE.md, openspec/AGENTS.md)
3. Verify project name is "morph-ui" or "MorphUI"
4. Include badges, tech stack, and contribution guidelines

**Files to edit:**

- `README.md` (complete replacement)

## Examples

### Example 1: Detect Version Mismatch

```typescript
// Read package.json
const packageJson = JSON.parse(await readFile("package.json"));
const bunVersion = packageJson.packageManager.split("@")[1]; // "1.2.2"

// Check CLAUDE.md
const claudeMd = await readFile("CLAUDE.md");
if (!claudeMd.includes(bunVersion)) {
  console.log(`CLAUDE.md: Bun version mismatch (expected ${bunVersion})`);
  // Update CLAUDE.md
}
```

### Example 2: Sync Component Count

```typescript
// Count actual components
const componentDirs = await readdir("packages/react-native/src", {
  withFileTypes: true,
});
const componentCount = componentDirs.filter((d) => d.isDirectory()).length;

// Check registry
const registry = JSON.parse(
  await readFile("packages/react-native/registry.json"),
);
const registryCount = Object.keys(registry.components).length;

if (componentCount !== registryCount) {
  console.log(
    `Registry mismatch: Found ${componentCount} dirs, registry has ${registryCount}`,
  );
}

// Update documentation files
// Update openspec/project.md line 9
// Update CLAUDE.md lines 93, 102
```

### Example 3: Update Multiple Files

```bash
# After detecting Turborepo version update from 2.7.2 to 2.8.0
# Update openspec/project.md
sed -i '' 's/Turborepo v2.7.2/Turborepo v2.8.0/g' openspec/project.md

# Update CLAUDE.md
sed -i '' 's/Turborepo (v2.7.2)/Turborepo (v2.8.0)/g' CLAUDE.md
```

## Progressive Disclosure

For detailed information, see these reference files:

- **[file-ownership.md](references/file-ownership.md)** - Complete file responsibility mapping and propagation order
- **[sync-checklist.md](references/sync-checklist.md)** - Manual verification checklist for after changes
- **[inconsistencies.md](references/inconsistencies.md)** - Known issues and detection patterns with example commands

## Validation Script

An optional Node.js script is available to automate inconsistency detection:

```bash
node .claude/skills/sync-docs/scripts/validate-docs.js
```

This script:

- Reads `package.json` for versions
- Counts component directories
- Checks version mentions in documentation files
- Reports all detected inconsistencies
- Exits with code 1 if issues found, 0 if all in sync

Use this script in CI/CD or pre-commit hooks to catch drift early.

## Best Practices

1. **Always start with detection** - Run detection strategy before making changes
2. **Follow the update order** - Never skip files in the propagation sequence
3. **Use authoritative sources** - Always reference package.json and registry.json for truth
4. **Cross-check after updates** - Verify consistency across all files
5. **Report all changes** - Provide clear summary of what was synced
6. **Run static analysis** - Ensure lint, check-types, format pass after sync
7. **Test activation** - Verify skill triggers on expected phrases
8. **Keep examples updated** - Update this file if new patterns emerge

## Troubleshooting

**Skill doesn't activate:**

- Add more trigger phrases to description in YAML frontmatter
- User should try: "sync docs", "check documentation consistency", "update CLAUDE.md"

**Inconsistencies not detected:**

- Verify detection commands work correctly
- Check if file paths have changed
- Ensure grep patterns match actual content

**Updates break files:**

- Always read files before editing
- Use Edit tool with exact old_string matches
- Verify line numbers are current
- Run format after updates to fix whitespace

**Static analysis fails:**

- Run `bun run lint` to fix ESLint issues
- Run `bun run format` to fix Prettier issues
- Run `bun run check-types` to fix TypeScript issues
- All must pass before marking sync complete

## Success Criteria

This skill is successful when:

- ✅ Detects all common inconsistencies automatically
- ✅ Updates files in correct propagation order
- ✅ Maintains consistency across all documentation files
- ✅ All static analysis checks pass after sync
- ✅ README.md contains project-specific information
- ✅ Tech stack versions match package.json
- ✅ Component count matches actual codebase
- ✅ Development rules are consistent across files
