---
name: code-review
description: Performs comprehensive architectural code reviews for the morphkit design system. Reviews package naming, component architecture, code duplication, and design patterns. Use when making architectural changes, refactoring, or when user requests "review code", "code health check", "architectural review", or "check codebase quality".
allowed-tools: Read, Grep, Glob, WebSearch, WebFetch, Task
---

# Code Review Skill

## Overview

This skill performs comprehensive architectural code reviews for the morphkit design system monorepo. It focuses on catching code smells and architectural issues that static analysis tools miss, while ensuring consistency with industry best practices for design systems and React Native component libraries.

## Purpose

Transform Claude into a world-class design system specialist who:

- Reviews package naming and organization consistency
- Identifies architectural patterns and anti-patterns
- Detects code duplication and reusability opportunities
- Validates adherence to the three-tier theme system
- Suggests component extraction opportunities
- Compares against industry best practices

## When This Skill Activates

This skill auto-suggests reviews when:

- Working on architectural changes or refactoring
- Creating new packages or components
- Modifying monorepo structure
- Making changes to flows or design patterns

Explicit activation phrases:

- "review the codebase"
- "code health check"
- "architectural review"
- "check codebase quality"
- "analyze code structure"
- "design system review"

## Review Workflow

### Phase 1: Discovery

**Objective**: Map the current state of the codebase

1. **Scan monorepo structure** using Task tool with Explore agent:
   - Identify all packages and their scopes
   - Map component organization in `packages/react-native/`
   - Find flow definitions in `packages/react-native-flows/`
   - Locate shared configurations

2. **Read critical manifests**:
   - All `package.json` files for naming patterns
   - Component `meta.json` files for dependencies
   - Flow `registry.json` for flow metadata

3. **Build mental model**:
   - Package scope usage (`@morphkit/`, `@morphkit/`, `@morphkit/`)
   - Public vs private package classification
   - Component categories and organization
   - Flow variants and screen counts

### Phase 2: Analysis

**Objective**: Identify issues and opportunities

Review each category systematically (see [review-categories.md](references/review-categories.md) for detailed checklists):

1. **Package Naming & Scoping**
   - Check npm scope consistency
   - Validate public/private classification
   - Review package naming conventions

2. **Component Architecture**
   - Verify three-tier theme system compliance
   - Check Typography component usage (no raw Text)
   - Validate token-based styling (no hardcoded values)
   - Review component file structure

3. **Code Organization**
   - Verify directory structure consistency
   - Check file naming conventions
   - Review export patterns
   - Validate monorepo workspace organization

4. **Code Duplication**
   - Find repeated component patterns
   - Identify duplicated theme tokens
   - Locate common utilities that should be extracted
   - Compare similar flow screens across variants

5. **Design Patterns**
   - Review component composition patterns
   - Analyze props API design
   - Check theme token composition
   - Validate flow navigation patterns

6. **Technical Debt**
   - Find unused imports
   - Identify dead code
   - Check for missing tests
   - Review documentation completeness

### Phase 3: Research

**Objective**: Ground recommendations in industry best practices

1. **Search for best practices** using WebSearch:
   - Design system monorepo patterns
   - React Native component library standards
   - npm package scoping guidelines
   - Turborepo optimization patterns

2. **Fetch authoritative sources** using WebFetch:
   - Official npm documentation
   - React Native best practices
   - Design system case studies
   - Monorepo architecture guides

3. **Compare against standards**:
   - Check morphkit patterns vs industry standards
   - Identify gaps and opportunities
   - Validate architectural decisions

### Phase 4: Reporting

**Objective**: Present findings in actionable format

Structure the report as follows:

```markdown
# Code Review Report - [Date]

## Summary

[Brief overview of codebase health, major findings, and priorities]

## High Priority 🔴

[Critical issues that impact architecture, consistency, or maintainability]

### Issue Title

**Issue**: [Clear description of the problem]
**Files**: [Specific file paths with line numbers]
**Impact**: [Why this matters]
**Recommendation**: [Concrete improvement steps]
**Research**: [Links to supporting best practices]

## Medium Priority 🟡

[Important improvements that enhance quality]

## Low Priority 🟢

[Nice-to-have improvements and optimizations]

## Positive Patterns ✅

[Highlight good practices worth preserving and replicating]

## Questions for Clarification

[Architectural decisions that need user input]
```

**Reporting Guidelines**:

- Provide specific file paths and line numbers (e.g., `password.tsx:38-49`)
- Include code snippets showing current vs recommended patterns
- Link to relevant best practices and research
- Categorize by priority (high/medium/low)
- Highlight positive patterns to preserve
- Ask clarifying questions for ambiguous issues

### Phase 5: Clarification

**Objective**: Confirm priorities and architectural decisions

Before suggesting changes:

1. **Ask about naming decisions**:
   - "Should we standardize on `@morphkit/` or keep `@morphkit/`?"
   - "Should flows package be public or remain private?"

2. **Confirm architectural choices**:
   - "Should we extract PasswordInput as a reusable component?"
   - "Do you want to consolidate similar flow screens?"

3. **Prioritize recommendations**:
   - "Which category should we address first?"
   - "Are there any findings you want to defer?"

4. **Understand context**:
   - "Are there reasons for current patterns I should know about?"
   - "Any upcoming changes that affect these decisions?"

## Review Categories

See [review-categories.md](references/review-categories.md) for comprehensive checklists covering:

- Package Naming & Scoping
- Component Architecture
- Code Organization
- Code Duplication
- Design Patterns
- Technical Debt

## Project-Specific Standards

See [morphkit-standards.md](references/morphkit-standards.md) for morphkit conventions:

- Three-tier theme system
- Component structure patterns
- Flow architecture
- Package naming guidelines

## Industry Best Practices

See [best-practices.md](references/best-practices.md) for external standards:

- Design system monorepo patterns
- React Native component libraries
- npm package organization
- Turborepo optimization

## Example Review Findings

### High Priority Example

```markdown
### 🔴 Package Naming Inconsistency

**Issue**: Mixed usage of `@morphkit/` and `@morphkit/` scopes across packages

**Files**:

- `packages/react-native/package.json` - Uses `@morphkit/react-native`
- `packages/react-native-flows/package.json` - Uses `@morphkit/react-native-flows`
- `packages/cli/package.json` - Uses `@morphkit/cli`

**Impact**:

- Confusing for developers joining the project
- Unclear which packages are intended for public consumption
- Inconsistent with repository name "morphkit"

**Recommendation**:
Choose one primary scope and apply consistently:

Option A: Standardize on `@morphkit/` (matches repo name)

- Rename `@morphkit/react-native` → `@morphkit/react-native`
- Rename `@morphkit/cli` → `@morphkit/cli`
- Rename `@morphkit/react-native-flows` → `@morphkit/react-native-flows`

Option B: Keep `@morphkit/` (existing branding)

- Keep `@morphkit/react-native` and `@morphkit/cli`
- Rename `@morphkit/react-native-flows` → `@morphkit/react-native-flows`

**Research**:

- [npm scope best practices](https://docs.npmjs.com/about-scopes/)
- [Package organization guide](https://blog.inedo.com/npm/best-practices-for-your-organizations-npm-packages)
```

### Medium Priority Example

````markdown
### 🟡 Component Extraction Opportunity: PasswordInput

**Issue**: Password input pattern with visibility toggle is repeated in flow screens

**File**: `packages/react-native-flows/src/auth/(default)/password.tsx:38-49`

**Current Pattern**:

```tsx
<Input
  size="lg"
  label="Password"
  type="password"
  value={password}
  onChange={setPassword}
  error={error}
  placeholder="Enter password"
  autoComplete="password-new"
  autoFocus
  onSubmitEditing={handleContinue}
/>
```
````

**Impact**:

- Pattern will be repeated across different flows
- Misses opportunity for consistent password UX
- Doesn't follow component library philosophy

**Recommendation**:
Create `PasswordInput` component in `@morphkit/react-native`:

```tsx
// packages/react-native/src/password-input/PasswordInput.tsx
interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  autoComplete?: "password" | "password-new" | "current-password";
  // ... other Input props
}

export const PasswordInput: React.FC<PasswordInputProps> = ({...}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Input
      type={isVisible ? "text" : "password"}
      rightIcon={
        <IconButton
          icon={isVisible ? "eye-off" : "eye"}
          onPress={() => setIsVisible(!isVisible)}
        />
      }
      {...props}
    />
  );
};
```

Benefits:

- Encapsulates password visibility toggle logic
- Provides consistent password input UX
- Reusable across all flows and applications
- Follows shadcn/ui component library model

**Research**:

- [React Native input best practices](https://medium.com/@imranrafeek/best-practices-for-naming-conventions-in-react-native-21f16df6179e)

````

### Low Priority Example

```markdown
### 🟢 Unused Import

**Issue**: Unused imports in component files

**Files**:
- `packages/react-native/src/button/Button.tsx:5` - Unused `Platform` import

**Impact**: Minimal - slightly increases bundle size

**Recommendation**: Remove unused imports before next commit

ESLint should catch these with `no-unused-vars` rule. If not, consider enabling.
````

## Critical Files to Review

Always review these files in every comprehensive code review:

**Package Manifests** (naming consistency):

- `packages/react-native/package.json`
- `packages/react-native-flows/package.json`
- `packages/cli/package.json`
- `packages/*/package.json` (all shared configs)

**Component Files** (architecture patterns):

- `packages/react-native/src/*/` (all 27 components)
- Component `.theme.ts` files (theme system compliance)
- Component `.test.tsx` files (test coverage)

**Flow Files** (duplication detection):

- `packages/react-native-flows/src/auth/(default)/`
- Flow screen implementations

**Theme Files** (token usage):

- `packages/react-native/src/theme/tokens/`
- Theme provider and configuration

**Config Files** (consistency):

- `packages/eslint-config/`
- `packages/typescript-config/`
- `packages/jest-config/`

## Review Execution Strategy

For efficient reviews, use this strategy:

1. **Quick Scan** (5 minutes):
   - Run Grep for common issues (unused imports, hardcoded values)
   - Check package.json files for naming
   - Review recent git changes

2. **Deep Analysis** (15-20 minutes):
   - Use Task tool with Explore agent for component patterns
   - Read critical component files
   - Analyze theme token usage

3. **Research** (5-10 minutes):
   - Search for relevant best practices
   - Fetch official documentation
   - Compare patterns

4. **Report Generation** (10 minutes):
   - Categorize findings
   - Write clear recommendations
   - Link to research

Total estimated time: 35-45 minutes for full codebase scan

## Output Format Rules

1. **Always provide file paths with line numbers**:
   - Good: `password.tsx:38-49`
   - Bad: "in the password file"

2. **Include code snippets**:
   - Show current pattern
   - Show recommended pattern
   - Explain the difference

3. **Link to research**:
   - Official documentation
   - Best practice guides
   - Case studies

4. **Categorize by impact**:
   - 🔴 High Priority: Architectural issues, inconsistencies
   - 🟡 Medium Priority: Improvements, optimization
   - 🟢 Low Priority: Nice-to-haves
   - ✅ Positive Patterns: Things to preserve

5. **Be specific and actionable**:
   - Not: "Naming could be better"
   - Yes: "Rename `@morphkit/react-native-flows` to `@morphkit/react-native-flows` for consistency"

## Principles

1. **Evidence-based**: Every recommendation backed by research or project standards
2. **Specific**: Provide file paths, line numbers, and code examples
3. **Actionable**: Clear steps for improvement
4. **Balanced**: Highlight both issues and positive patterns
5. **Collaborative**: Ask questions for architectural decisions
6. **Comprehensive**: Review all aspects (naming, architecture, duplication, patterns)

## Don't Review

Avoid reviewing these areas (static analysis handles them):

- Code formatting (Prettier handles this)
- Lint errors (ESLint handles this)
- Type errors (TypeScript handles this)
- Test failures (Jest handles this)

Focus on architectural and design issues that tools can't catch.

## Next Steps After Review

After presenting the report:

1. Ask user which priorities to address first
2. Confirm architectural decisions
3. Offer to implement fixes if requested
4. Document decisions in `openspec/` if architectural

Never automatically implement changes without user approval.
