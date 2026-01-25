# Known Inconsistencies and Detection Patterns

This document catalogs known inconsistencies across documentation files and provides detection patterns for finding them.

## Tech Stack Version Mismatches

### Description

Tech stack versions (Bun, Turborepo, TypeScript, React Native, Expo, Jest) may drift out of sync between `package.json` and documentation files.

### Authoritative Source

`package.json` is always authoritative for versions.

### Detection Patterns

#### Bun Version

**Command:**

```bash
# Extract Bun version from package.json
bunVersion=$(grep -o '"packageManager": "bun@[^"]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
echo "package.json Bun version: $bunVersion"

# Search for Bun mentions in docs
grep -n "Bun" CLAUDE.md openspec/project.md README.md
```

**Expected format:**

- `package.json`: `"packageManager": "bun@1.2.2"`
- `openspec/project.md` line 40: `- **Package Manager**: Bun v1.2.2`
- `CLAUDE.md` line 35: `- **Package Manager**: Bun (v1.2.2)`

**Common inconsistencies:**

- Version number differs between files
- Format differs ("v1.2.2" vs "1.2.2")
- Mention missing in one or more files

#### Turborepo Version

**Command:**

```bash
# Extract Turborepo version from package.json
turboVersion=$(grep -o '"turbo": "[^^]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
echo "package.json Turbo version: $turboVersion"

# Search for Turborepo mentions in docs
grep -n "Turborepo" CLAUDE.md openspec/project.md README.md
```

**Expected format:**

- `package.json`: `"turbo": "^2.7.2"`
- `openspec/project.md` line 41: `- **Build Tool**: Turborepo v2.7.2`
- `CLAUDE.md` line 36: `- **Build Tool**: Turborepo (v2.7.2)`

**Common inconsistencies:**

- Caret (^) included in docs version
- Version number outdated in docs after package.json update

#### TypeScript Version

**Command:**

```bash
# Extract TypeScript version from package.json
tsVersion=$(grep -o '"typescript": "[^^]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
echo "package.json TypeScript version: $tsVersion"

# Search for TypeScript version mentions
grep -n "TypeScript.*[0-9]\+\.[0-9]" CLAUDE.md openspec/project.md
```

**Expected format:**

- `package.json`: `"typescript": "^5.9.2"`
- `openspec/project.md` line 42: `- **Language**: TypeScript 5.9.2 (strict mode)`
- `CLAUDE.md` line 38: `- **Language**: TypeScript 5.9.2`

#### React Native Version

**Command:**

```bash
# Extract React Native version from workspace package.json
rnVersion=$(grep -o '"react-native": "[^^]*"' packages/react-native/package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
echo "React Native version: $rnVersion"

# Search for React Native version mentions
grep -n "React Native.*[0-9]\+\.[0-9]" openspec/project.md
```

**Expected format:**

- `packages/react-native/package.json`: `"react-native": "0.81.5"`
- `openspec/project.md` line 46: `- **Framework**: React Native 0.81.5`

#### Expo SDK Version

**Command:**

```bash
# Extract Expo version from demo app package.json
expoVersion=$(grep -o '"expo": "[~^]*[0-9][^"]*"' apps/kitchen-sink-app/package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
echo "Expo SDK version: $expoVersion"

# Search for Expo version mentions
grep -n "Expo.*[0-9]\+\.[0-9]" openspec/project.md CLAUDE.md
```

**Expected format:**

- `apps/kitchen-sink-app/package.json`: `"expo": "~54.0.30"`
- `openspec/project.md` line 48: `- **Platform**: Expo SDK ~54.0.30`

#### Jest Version

**Command:**

```bash
# Extract Jest version from jest-config package.json
jestVersion=$(grep -o '"jest": "[^^]*"' packages/jest-config/package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
echo "Jest version: $jestVersion"

# Search for Jest version mentions
grep -n "Jest.*[0-9]\+\.[0-9]" openspec/project.md
```

**Expected format:**

- `packages/jest-config/package.json`: `"jest": "30.0.0"`
- `openspec/project.md` line 53: `- **Test Framework**: Jest 30.0.0`

### Automated Detection Script

```bash
#!/bin/bash

echo "=== Tech Stack Version Consistency Check ==="

# Bun
bunVersion=$(grep -o '"packageManager": "bun@[^"]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
echo "Checking Bun version: $bunVersion"
if ! grep -q "$bunVersion" CLAUDE.md; then
  echo "❌ CLAUDE.md: Bun version mismatch"
fi
if ! grep -q "$bunVersion" openspec/project.md; then
  echo "❌ openspec/project.md: Bun version mismatch"
fi

# Turborepo
turboVersion=$(grep -o '"turbo": "[^^]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
echo "Checking Turborepo version: $turboVersion"
if ! grep -q "$turboVersion" CLAUDE.md; then
  echo "❌ CLAUDE.md: Turborepo version mismatch"
fi
if ! grep -q "$turboVersion" openspec/project.md; then
  echo "❌ openspec/project.md: Turborepo version mismatch"
fi

# TypeScript
tsVersion=$(grep -o '"typescript": "[^^]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
echo "Checking TypeScript version: $tsVersion"
if ! grep -q "$tsVersion" CLAUDE.md; then
  echo "❌ CLAUDE.md: TypeScript version mismatch"
fi
if ! grep -q "$tsVersion" openspec/project.md; then
  echo "❌ openspec/project.md: TypeScript version mismatch"
fi

echo "=== Version check complete ==="
```

## Component Count Discrepancies

### Description

Component count may differ between actual codebase, `registry.json`, and documentation references.

### Authoritative Source

Actual component directories in `packages/react-native/src/` is ground truth. `registry.json` should match actual directories.

### Detection Patterns

#### Count Actual Components

**Command:**

```bash
# Count component directories (excluding src itself)
actualCount=$(find packages/react-native/src -maxdepth 1 -type d -not -name "src" | wc -l | tr -d ' ')
echo "Actual component count: $actualCount"
```

**Alternative (if not all directories are components):**

```bash
# Count only directories with component files
actualCount=$(find packages/react-native/src -maxdepth 1 -type d -exec test -f {}/*.tsx \; -print | wc -l)
echo "Actual component count: $actualCount"
```

#### Check registry.json

**Command:**

```bash
# Count components in registry (requires jq)
if command -v jq &> /dev/null; then
  registryCount=$(jq '.components | length' packages/react-native/registry.json)
  echo "registry.json component count: $registryCount"
else
  # Fallback without jq
  registryCount=$(grep -o '"[^"]*":' packages/react-native/registry.json | grep -c '"')
  echo "registry.json estimated count: $registryCount (verify manually)"
fi
```

#### Check Documentation References

**Command:**

```bash
# Search for component count mentions
echo "Component count references in documentation:"
grep -n "29" CLAUDE.md openspec/project.md README.md

# More specific search
grep -n "[0-9]\+ components" CLAUDE.md openspec/project.md README.md
grep -n "[0-9]\+ fully-implemented components" CLAUDE.md
grep -n "[0-9]\+ Production-Ready Components" openspec/project.md
```

**Expected locations:**

- `openspec/project.md` line 9: `- **29 Production-Ready Components**`
- `CLAUDE.md` line 93: `- **29 fully-implemented components**`
- `CLAUDE.md` line 102: Intro to component categories list

### Component List Verification

**Command:**

```bash
# List all component directories
echo "=== Actual components in codebase ==="
find packages/react-native/src -maxdepth 1 -type d -not -name "src" | sort

# Compare with component categories in CLAUDE.md
echo "=== Components mentioned in CLAUDE.md ==="
# Lines 100-108 contain component categories
sed -n '100,108p' CLAUDE.md
```

**Expected categories in CLAUDE.md (lines 100-108):**

- Layout: box, container, divider, flex
- Input: input, textarea, checkbox, radio, select, switch, slider, otp-input, label
- Display: typography, badge, tag, avatar, progress, skeleton, spinner
- Interactive: button, accordion
- Feedback: alert, toast
- Navigation: drawer, fab, stack, tabs
- Surfaces: card

### Automated Detection Script

```bash
#!/bin/bash

echo "=== Component Count Consistency Check ==="

# Count actual directories
actualCount=$(find packages/react-native/src -maxdepth 1 -type d -not -name "src" | wc -l | tr -d ' ')
echo "Actual component count: $actualCount"

# Check openspec/project.md
if ! grep -q "$actualCount Production-Ready Components" openspec/project.md; then
  echo "❌ openspec/project.md: Component count mismatch (expected $actualCount)"
fi

# Check CLAUDE.md (first mention)
if ! grep -q "$actualCount fully-implemented components" CLAUDE.md; then
  echo "❌ CLAUDE.md: Component count mismatch (expected $actualCount)"
fi

# Check skills
echo "Checking skills for component count mentions..."
grep -r "$actualCount components" .claude/skills/ || echo "❌ Skills: Component count may be outdated"
grep -r "$actualCount total" .claude/skills/ || echo "❌ Skills: Component count may be outdated"

echo "=== Component count check complete ==="
```

## README.md Staleness

### Description

README.md may contain generic Turborepo template instead of project-specific documentation.

### Detection Patterns

#### Generic Template Phrases

**Command:**

```bash
# Check for generic Turborepo starter phrases
grep -n "official starter Turborepo" README.md
grep -n "Turborepo template" README.md
grep -n "official Turborepo" README.md

# Check if README contains project name
grep -n "morph-ui\|MorphUI" README.md
```

**Common template phrases to look for:**

- "This is an official starter Turborepo"
- "Turborepo template"
- "official Turborepo"
- "starter"
- Generic "Apps and Packages" sections

#### Project-Specific Content Check

**Command:**

```bash
# README should mention these project-specific terms
echo "Checking for project-specific content in README:"

grep -q "morph-ui\|MorphUI" README.md && echo "✅ Project name found" || echo "❌ Project name missing"
grep -q "component library" README.md && echo "✅ Component library mentioned" || echo "❌ Component library not mentioned"
grep -q "three-tier" README.md && echo "✅ Theme system mentioned" || echo "❌ Theme system not mentioned"
grep -q "Expo" README.md && echo "✅ Expo mentioned" || echo "❌ Expo not mentioned"
```

### Automated Detection Script

```bash
#!/bin/bash

echo "=== README.md Staleness Check ==="

# Check for generic template
if grep -q "official starter Turborepo" README.md; then
  echo "❌ README.md: Contains generic Turborepo template"
  echo "   Found: $(grep -n 'official starter Turborepo' README.md)"
fi

# Check for project name
if ! grep -q "morph-ui\|MorphUI" README.md; then
  echo "❌ README.md: Project name missing"
fi

# Check for component library mention
if ! grep -q "component library" README.md; then
  echo "❌ README.md: Component library not mentioned"
fi

echo "=== README.md check complete ==="
```

## Skills Documentation Drift

### Description

Skill documentation in `.claude/skills/` may contain outdated component counts, tech stack versions, component lists, or code examples that drift out of sync with the actual codebase.

### Authoritative Sources

- **Component count**: `registry.json` and actual directories
- **Tech stack versions**: `package.json`
- **Component lists**: `registry.json`
- **Component props**: Component implementation files

### Detection Patterns

#### Check Component Count in Skills

**Command:**

```bash
# Search for component count mentions in skills
echo "=== Component count in skills ==="
grep -rn "29 components" .claude/skills/
grep -rn "29 total" .claude/skills/
grep -rn "29 fully" .claude/skills/

# Count actual components
actualCount=$(find packages/react-native/src -maxdepth 1 -type d -not -name "src" | wc -l | tr -d ' ')
echo "Actual component count: $actualCount"

# Check for mismatches
if grep -q "29 components" .claude/skills/ && [ "$actualCount" -ne 29 ]; then
  echo "❌ Skills reference outdated component count (27 vs $actualCount)"
fi
```

**Expected locations:**

- `.claude/skills/code-review/SKILL.md` - May mention component count
- `.claude/skills/code-review/references/morph-ui-standards.md` - Line ~93 ("29 components")
- `.claude/skills/create-component/SKILL.md` - May mention component count
- `.claude/skills/create-flow/SKILL.md` - May mention "29 total"
- `.claude/skills/create-flow/references/component-detection.md` - Component list

#### Check Tech Stack Versions in Skills

**Command:**

```bash
# Extract versions from package.json
bunVersion=$(grep -o '"packageManager": "bun@[^"]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
turboVersion=$(grep -o '"turbo": "[^^]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
tsVersion=$(grep -o '"typescript": "[^^]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')

echo "=== Tech stack versions in skills ==="
echo "Bun: $bunVersion"
echo "Turborepo: $turboVersion"
echo "TypeScript: $tsVersion"

# Check skills for version mentions
grep -rn "Bun.*[0-9]\+\.[0-9]" .claude/skills/code-review/
grep -rn "Turborepo.*[0-9]\+\.[0-9]" .claude/skills/code-review/
grep -rn "TypeScript.*[0-9]\+\.[0-9]" .claude/skills/code-review/

# Check sync-docs detection commands
grep -rn "Bun.*1.2.2" .claude/skills/sync-docs/
grep -rn "Turborepo.*2.7.2" .claude/skills/sync-docs/
```

**Expected locations:**

- `.claude/skills/code-review/references/morph-ui-standards.md` - Tech stack version references
- `.claude/skills/sync-docs/SKILL.md` - Detection command examples
- `.claude/skills/sync-docs/references/inconsistencies.md` - Version detection patterns

#### Check Component Lists in Skills

**Command:**

```bash
# Get actual component list
echo "=== Actual components ==="
find packages/react-native/src -maxdepth 1 -type d -not -name "src" -exec basename {} \; | sort

# Check component lists in skills
echo "=== Component lists in skills ==="
echo "Checking create-flow component-detection.md..."
# This file should list all 29 components with their props

echo "Checking code-review morph-ui-standards.md..."
# Should list component categories

# Look for outdated component names
grep -rn "tooltip\|popover\|dropdown" .claude/skills/ && echo "⚠️ Check if these components exist"
```

#### Check Code Examples in Skills

**Command:**

```bash
# Check for outdated button size examples
echo "=== Button size examples ==="
grep -rn 'Button.*size=' .claude/skills/create-flow/

# Check for outdated spacing token references
echo "=== Spacing token references ==="
grep -rn 'spacing\[' .claude/skills/create-flow/

# Check for outdated variant props
echo "=== Variant props ==="
grep -rn 'variant=' .claude/skills/create-flow/
```

### Automated Detection Script

```bash
#!/bin/bash

echo "=== Skills Documentation Drift Check ==="

errors=0

# Check component count in skills
actualCount=$(find packages/react-native/src -maxdepth 1 -type d -not -name "src" | wc -l | tr -d ' ')
echo "Actual component count: $actualCount"

skillComponentRefs=$(grep -r "29 components\|29 total\|29 fully" .claude/skills/ | wc -l)
if [ "$skillComponentRefs" -gt 0 ] && [ "$actualCount" -ne 27 ]; then
  echo "❌ Skills contain outdated component count (found 27, actual is $actualCount)"
  ((errors++))
fi

# Check tech stack versions in skills
bunVersion=$(grep -o '"packageManager": "bun@[^"]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
if [ -n "$bunVersion" ]; then
  # Check if old version is referenced in skills
  if grep -rq "1.2.2" .claude/skills/ && [ "$bunVersion" != "1.2.2" ]; then
    echo "❌ Skills may reference outdated Bun version"
    ((errors++))
  fi
fi

turboVersion=$(grep -o '"turbo": "[^^]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
if [ -n "$turboVersion" ]; then
  if grep -rq "2.7.2" .claude/skills/ && [ "$turboVersion" != "2.7.2" ]; then
    echo "❌ Skills may reference outdated Turborepo version"
    ((errors++))
  fi
fi

# Check if critical skill files exist
if [ ! -f .claude/skills/code-review/references/morph-ui-standards.md ]; then
  echo "❌ code-review morph-ui-standards.md missing"
  ((errors++))
fi

if [ ! -f .claude/skills/create-flow/references/component-detection.md ]; then
  echo "❌ create-flow component-detection.md missing"
  ((errors++))
fi

# Summary
if [ $errors -eq 0 ]; then
  echo "✅ Skills documentation appears in sync"
else
  echo "❌ Found $errors potential skills documentation issues"
fi

echo "=== Skills drift check complete ==="
```

## Broken Cross-References

### Description

@ notation references in AGENTS.md may point to non-existent or moved files.

### Detection Patterns

#### Check @ Notation References

**Command:**

```bash
# Find all @ notation references in AGENTS.md
echo "=== @ notation references in AGENTS.md ==="
grep -n "@" AGENTS.md

# Verify files exist
echo "=== Verifying referenced files exist ==="
test -f CLAUDE.md && echo "✅ CLAUDE.md exists" || echo "❌ CLAUDE.md missing"
test -f openspec/project.md && echo "✅ openspec/project.md exists" || echo "❌ openspec/project.md missing"
test -f openspec/AGENTS.md && echo "✅ openspec/AGENTS.md exists" || echo "❌ openspec/AGENTS.md missing"
```

#### Check OpenSpec Block References

**Command:**

```bash
# Check for OpenSpec managed blocks
echo "=== OpenSpec managed blocks ==="
grep -n "OPENSPEC:START\|OPENSPEC:END" CLAUDE.md AGENTS.md

# Verify OpenSpec AGENTS.md is referenced correctly
grep -A 5 "OPENSPEC:START" CLAUDE.md
```

### Automated Detection Script

```bash
#!/bin/bash

echo "=== Cross-Reference Validation ==="

# Check @ notation references
if grep -q "@CLAUDE.md" AGENTS.md; then
  test -f CLAUDE.md && echo "✅ @CLAUDE.md reference valid" || echo "❌ @CLAUDE.md reference broken"
fi

if grep -q "@openspec/project.md" AGENTS.md; then
  test -f openspec/project.md && echo "✅ @openspec/project.md reference valid" || echo "❌ @openspec/project.md reference broken"
fi

if grep -q "@openspec/AGENTS.md" AGENTS.md; then
  test -f openspec/AGENTS.md && echo "✅ @openspec/AGENTS.md reference valid" || echo "❌ @openspec/AGENTS.md reference broken"
fi

# Check OpenSpec blocks
if grep -q "OPENSPEC:START" CLAUDE.md; then
  if grep -q "@/openspec/AGENTS.md" CLAUDE.md; then
    test -f openspec/AGENTS.md && echo "✅ OpenSpec block reference valid" || echo "❌ OpenSpec block reference broken"
  fi
fi

echo "=== Cross-reference check complete ==="
```

## Development Rules Drift

### Description

"Zero tolerance" rules and quality gates may have inconsistent emphasis or different wording across files.

### Detection Patterns

#### Check Zero Tolerance Rules

**Command:**

```bash
# Find all "zero tolerance" mentions
echo "=== Zero tolerance rules ==="
grep -n "zero tolerance" CLAUDE.md AGENTS.md openspec/project.md

# Check specific rules
echo "=== Zero comments rule ==="
grep -n -i "zero.*comment\|no.*comment" CLAUDE.md openspec/project.md

echo "=== Zero any type rule ==="
grep -n -i "zero.*\`any\`\|ban.*\`any\`" CLAUDE.md openspec/project.md

echo "=== Zero failed tests rule ==="
grep -n -i "zero.*failed tests\|all tests.*pass" CLAUDE.md AGENTS.md openspec/project.md
```

#### Check Quality Gates

**Command:**

```bash
# Verify all files mention same quality gates
echo "=== Quality gates consistency ==="
grep -n "bun run lint" CLAUDE.md AGENTS.md openspec/project.md
grep -n "bun run check-types" CLAUDE.md AGENTS.md openspec/project.md
grep -n "bun run format" CLAUDE.md AGENTS.md openspec/project.md
grep -n "bun run test" CLAUDE.md AGENTS.md openspec/project.md
```

#### Check Conventional Commits Examples

**Command:**

```bash
# Check commit format examples
echo "=== Conventional Commits format ==="
grep -n "feat(\|fix(\|docs(" CLAUDE.md openspec/project.md

# Verify format description matches
grep -n "<type>\[optional scope\]:\|<type>(<scope>):" CLAUDE.md openspec/project.md
```

### Automated Detection Script

```bash
#!/bin/bash

echo "=== Development Rules Consistency Check ==="

# Check zero comments rule
claudeComments=$(grep -c "zero tolerance.*comment" CLAUDE.md)
projectComments=$(grep -c "zero tolerance.*comment" openspec/project.md)
if [ "$claudeComments" -eq 0 ] || [ "$projectComments" -eq 0 ]; then
  echo "❌ Zero comments rule not consistently mentioned"
fi

# Check zero any rule
claudeAny=$(grep -c "zero tolerance.*\`any\`" CLAUDE.md)
projectAny=$(grep -c "zero tolerance.*\`any\`" openspec/project.md)
if [ "$claudeAny" -eq 0 ] || [ "$projectAny" -eq 0 ]; then
  echo "❌ Zero any type rule not consistently mentioned"
fi

# Check zero failed tests rule
agentsTests=$(grep -c "zero.*failed tests\|all tests.*pass" AGENTS.md)
if [ "$agentsTests" -eq 0 ]; then
  echo "❌ Zero failed tests emphasis missing in AGENTS.md"
fi

# Check quality gates
for gate in "bun run lint" "bun run check-types" "bun run format" "bun run test"; do
  if ! grep -q "$gate" CLAUDE.md; then
    echo "❌ CLAUDE.md: Quality gate '$gate' not mentioned"
  fi
  if ! grep -q "$gate" AGENTS.md; then
    echo "❌ AGENTS.md: Quality gate '$gate' not mentioned"
  fi
done

echo "=== Development rules check complete ==="
```

## Full Validation Script

Combine all detection patterns into a comprehensive validation:

```bash
#!/bin/bash

echo "======================================"
echo "Documentation Sync Validation"
echo "======================================"

errors=0

# Tech Stack Versions
echo ""
echo "[1/6] Tech Stack Versions"
bunVersion=$(grep -o '"packageManager": "bun@[^"]*"' package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
if [ -n "$bunVersion" ]; then
  grep -q "$bunVersion" CLAUDE.md || { echo "❌ CLAUDE.md: Bun version mismatch"; ((errors++)); }
  grep -q "$bunVersion" openspec/project.md || { echo "❌ openspec/project.md: Bun version mismatch"; ((errors++)); }
fi

# Component Count
echo ""
echo "[2/6] Component Count"
actualCount=$(find packages/react-native/src -maxdepth 1 -type d -not -name "src" | wc -l | tr -d ' ')
grep -q "$actualCount Production-Ready Components" openspec/project.md || { echo "❌ openspec/project.md: Component count mismatch (expected $actualCount)"; ((errors++)); }
grep -q "$actualCount fully-implemented components" CLAUDE.md || { echo "❌ CLAUDE.md: Component count mismatch (expected $actualCount)"; ((errors++)); }

# Skills Documentation
echo ""
echo "[3/6] Skills Documentation"
skillComponentRefs=$(grep -r "29 components\|29 total" .claude/skills/ 2>/dev/null | wc -l)
if [ "$skillComponentRefs" -gt 0 ] && [ "$actualCount" -ne 29 ]; then
  echo "❌ Skills: Component count may be outdated (found 29, actual is $actualCount)"
  ((errors++))
fi
test -f .claude/skills/code-review/references/morph-ui-standards.md || { echo "❌ code-review skill files missing"; ((errors++)); }
test -f .claude/skills/create-flow/references/component-detection.md || { echo "❌ create-flow skill files missing"; ((errors++)); }

# README Staleness
echo ""
echo "[4/6] README.md Staleness"
grep -q "official starter Turborepo" README.md && { echo "❌ README.md: Contains generic template"; ((errors++)); }
grep -q "morph-ui\|MorphUI" README.md || { echo "❌ README.md: Project name missing"; ((errors++)); }

# Cross-References
echo ""
echo "[5/6] Cross-References"
test -f CLAUDE.md || { echo "❌ CLAUDE.md missing"; ((errors++)); }
test -f openspec/project.md || { echo "❌ openspec/project.md missing"; ((errors++)); }
test -f openspec/AGENTS.md || { echo "❌ openspec/AGENTS.md missing"; ((errors++)); }

# Development Rules
echo ""
echo "[6/6] Development Rules"
for gate in "bun run lint" "bun run check-types" "bun run format" "bun run test"; do
  grep -q "$gate" CLAUDE.md || { echo "❌ CLAUDE.md: Missing '$gate'"; ((errors++)); }
  grep -q "$gate" AGENTS.md || { echo "❌ AGENTS.md: Missing '$gate'"; ((errors++)); }
done

# Summary
echo ""
echo "======================================"
if [ $errors -eq 0 ]; then
  echo "✅ All documentation files are in sync"
  exit 0
else
  echo "❌ Found $errors inconsistency/inconsistencies"
  exit 1
fi
```

## Maintenance

This file should be updated when:

- New inconsistencies are discovered
- Detection patterns change
- New documentation files are added
- File paths or formats change

**Last updated:** 2026-01-11 (initial creation)
