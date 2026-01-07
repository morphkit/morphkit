# Skill Examples

This document provides complete working examples of Agent Skills, from minimal single-file skills to complex multi-file structures.

## Example 1: Minimal Single-File Skill

The simplest possible skill with just a SKILL.md file.

### Use Case

A skill that helps Claude explain code using visual diagrams and analogies.

### Directory Structure

```
explaining-code/
└── SKILL.md
```

### SKILL.md

```yaml
---
name: explaining-code
description: Explains code with visual diagrams and analogies. Use when explaining how code works, teaching about a codebase, or when the user asks "how does this work", "explain this code", or mentions code explanation.
---

# Explaining Code

## Overview

This skill helps Claude explain code by combining visual diagrams, real-world analogies, and step-by-step walkthroughs.

## Instructions

When explaining code, always include:

1. **Start with an analogy**: Compare the code to something from everyday life
2. **Draw a diagram**: Use ASCII art to show the flow, structure, or relationships
3. **Walk through the code**: Explain step-by-step what happens
4. **Highlight a gotcha**: What's a common mistake or misconception?

Keep explanations conversational. For complex concepts, use multiple analogies.

## Example

When asked to explain a React component:

**Analogy**: "A React component is like a blueprint for a house. You can use the same blueprint (component) to build many houses (instances)."

**Diagram**:
```

Component (Blueprint)
↓
Props (Customization)
↓
Render (Build)
↓
JSX (The House)

```

**Walkthrough**: "First, React receives props (like choosing paint colors). Then it runs the render function (building the house). Finally, it returns JSX (the finished structure)."

**Gotcha**: "People often forget that components re-render when props change - it's like rebuilding the house with different colors, not repainting it."
```

### When to Use This Pattern

✅ **Use single-file when**:

- Skill is straightforward with clear instructions
- No extensive reference material needed
- Total content under 500 lines
- Few examples cover all use cases

### Testing

```bash
# After creating the skill, restart Claude Code and test:
"How does this React component work?"
"Explain what this function does"
```

## Example 2: Multi-File Skill with References

A more complex skill that benefits from progressive disclosure.

### Use Case

A skill for generating commit messages following Conventional Commits format.

### Directory Structure

```
generate-commit/
├── SKILL.md
└── references/
    ├── conventional-commits.md
    └── examples.md
```

### SKILL.md

```yaml
---
name: generate-commit
description: Generates commit messages from git diffs following Conventional Commits format. Use when writing commits or when user asks to "create a commit message", "commit changes", "write a commit", or mentions committing code.
allowed-tools: Read, Bash
---

# Generate Commit Messages

## Overview

This skill generates commit messages by analyzing git diffs and following the Conventional Commits specification.

## Quick Start

To generate a commit message:

1. Run `git diff --staged` to see changes
2. I'll analyze the changes
3. I'll suggest a commit message with:
   - Type and scope
   - Concise summary (under 50 chars)
   - Detailed description if needed
   - Breaking change notice if applicable

## Commit Format

```

<type>(<scope>): <summary>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, perf, test, chore, ci

See [conventional-commits.md](references/conventional-commits.md) for complete specification.

## Basic Example

**Changes**: Added user authentication

**Generated commit**:

```
feat(auth): add JWT-based user authentication

Implement login and signup endpoints with JWT token generation.
Includes password hashing and token validation middleware.
```

## Advanced Usage

For complex commits involving breaking changes, multiple scopes, or detailed descriptions, see [examples.md](references/examples.md).

## Best Practices

1. **Keep summary under 50 characters**
2. **Use present tense** ("add" not "added")
3. **Explain what and why**, not how
4. **Mark breaking changes** with `BREAKING CHANGE:` in footer

````

### references/conventional-commits.md

```markdown
# Conventional Commits Specification

Complete reference for the Conventional Commits format.

## Commit Message Structure

````

<type>[optional scope][optional !]: <description>

[optional body]

[optional footer(s)]

```

## Types

### feat
A new feature for the user.

**Examples**:
- `feat(auth): add social login`
- `feat: add dark mode toggle`

### fix
A bug fix for the user.

**Examples**:
- `fix(api): handle null responses correctly`
- `fix: prevent duplicate submissions`

### docs
Documentation only changes.

**Examples**:
- `docs(readme): update installation instructions`
- `docs: add API endpoint documentation`

### style
Changes that don't affect code meaning (formatting, whitespace).

**Examples**:
- `style: format with prettier`
- `style(components): fix indentation`

### refactor
Code changes that neither fix bugs nor add features.

**Examples**:
- `refactor(auth): extract validation logic`
- `refactor: simplify error handling`

### perf
Performance improvements.

**Examples**:
- `perf(api): add response caching`
- `perf: optimize image loading`

### test
Adding or updating tests.

**Examples**:
- `test(auth): add login flow tests`
- `test: increase coverage to 80%`

### chore
Build process, tooling, or dependency updates.

**Examples**:
- `chore(deps): upgrade react to 18.3`
- `chore: update build scripts`

### ci
CI/CD configuration changes.

**Examples**:
- `ci: add automated deployments`
- `ci(github): update workflow`

## Scopes

Scopes are optional and project-specific. Common scopes:

- Component names: `(auth)`, `(api)`, `(ui)`
- Feature areas: `(payments)`, `(dashboard)`, `(settings)`
- File types: `(deps)`, `(config)`, `(build)`

## Breaking Changes

Mark breaking changes with `!` or `BREAKING CHANGE:` in footer:

```

feat(api)!: change response format

BREAKING CHANGE: API now returns paginated data structure

```

## Footer Conventions

- `Closes #123` - Link to issue
- `Refs #456` - Reference issue
- `BREAKING CHANGE:` - Document breaking change
- `Co-authored-by:` - Credit contributors
```

### references/examples.md

```markdown
# Commit Message Examples

Comprehensive examples for various scenarios.

## Simple Feature

**Changes**: Added a new button component
```

feat(components): add Button component

Implement reusable Button component with variants (primary, secondary, tonal)
and sizes (sm, md, lg). Includes full theme integration and accessibility.

```

## Bug Fix

**Changes**: Fixed form validation error

```

fix(forms): prevent submission with invalid email

Validate email format before form submission. Show error message
for invalid emails instead of silently failing.

Closes #234

```

## Breaking Change

**Changes**: Updated API response structure

```

feat(api)!: implement pagination for all list endpoints

BREAKING CHANGE: All list endpoints now return { data: [], pagination: {} }
instead of returning arrays directly. Update client code to access .data

Migration:

- Before: response.map(...)
- After: response.data.map(...)

```

## Multiple Scopes

**Changes**: Updated auth and database

```

feat(auth,db): add OAuth provider support

- Add OAuth authentication endpoints
- Update user schema to include provider info
- Implement provider-specific login flows

Closes #456, #457

```

## Refactoring

**Changes**: Extracted reusable logic

```

refactor(utils): extract validation helpers

Move email, phone, and date validation into shared utils module.
No functional changes, improves code reusability.

```

## Performance

**Changes**: Optimized queries

```

perf(db): add indexes for user lookups

Add composite index on (email, status) for faster user queries.
Reduces average query time from 200ms to 15ms.

```

## Documentation

**Changes**: Updated README

```

docs(readme): add troubleshooting section

Include solutions for common setup issues:

- Environment variable configuration
- Database connection problems
- Port conflicts

```

## Dependency Update

**Changes**: Upgraded packages

```

chore(deps): upgrade dependencies

- react: 18.2.0 → 18.3.1
- typescript: 5.3.0 → 5.9.2
- eslint: 8.0.0 → 9.18.0

No breaking changes or required code updates.

```

## Large Feature with Body

**Changes**: Implemented complete payment system

```

feat(payments): add Stripe integration

Implement complete payment processing workflow:

- Product selection and checkout flow
- Stripe payment intent creation
- Webhook handling for payment events
- Receipt generation and email delivery
- Payment history dashboard

Includes comprehensive error handling and retry logic.
Supports both one-time and recurring payments.

Closes #123, #124, #125
Co-authored-by: Jane Doe <jane@example.com>

```

```

### When to Use This Pattern

✅ **Use multi-file with references when**:

- Need comprehensive reference material
- Specification is detailed (like Conventional Commits)
- Many examples to document
- Want to keep SKILL.md focused

### Testing

```bash
# Test the skill
git add .
# Then ask: "Generate a commit message for these changes"
```

## Example 3: Read-Only Analysis Skill

A skill with restricted tool access for security.

### Use Case

Code analyzer that searches for common issues but doesn't modify files.

### Directory Structure

```
code-analyzer/
├── SKILL.md
└── references/
    └── patterns.md
```

### SKILL.md

```yaml
---
name: code-analyzer
description: Analyzes code for common issues, anti-patterns, and potential bugs. Use when user asks to "analyze code", "check for issues", "review code quality", or mentions code analysis.
allowed-tools: Read, Grep, Glob
---

# Code Analyzer

## Overview

This skill analyzes code for common issues without making any changes. It's a read-only analysis tool.

## What I Check

1. **Common bugs**: Null checks, error handling, edge cases
2. **Performance**: Inefficient loops, unnecessary re-renders
3. **Security**: Input validation, SQL injection, XSS
4. **Best practices**: Code organization, naming, patterns

## How It Works

1. I scan your code using Read, Grep, and Glob
2. I identify potential issues
3. I provide a report with:
   - Issue description
   - Location (file:line)
   - Severity (critical, warning, info)
   - Suggested fix

I won't modify your code - I only analyze and report.

## Example Analysis

**Input**: React component with state management

**Output**:
```

Code Analysis Report

CRITICAL (auth.ts:45)

- SQL injection vulnerability
- User input directly in query
- Fix: Use parameterized queries

WARNING (Dashboard.tsx:23)

- Unnecessary re-render
- Object created in render function
- Fix: Move outside component or use useMemo

INFO (utils.ts:12)

- Could use optional chaining
- Current: user && user.name
- Better: user?.name

```

## Advanced Patterns

See [patterns.md](references/patterns.md) for comprehensive anti-pattern documentation.
```

### references/patterns.md

````markdown
# Code Analysis Patterns

## React Anti-Patterns

### 1. Objects in JSX

**Problem**:

```tsx
// ❌ Creates new object on every render
<Button style={{ padding: 10 }}>Click</Button>
```
````

**Fix**:

```tsx
// ✅ Define once outside
const buttonStyle = { padding: 10 };
<Button style={buttonStyle}>Click</Button>;
```

### 2. Missing Dependencies

**Problem**:

```tsx
// ❌ useEffect missing dependency
useEffect(() => {
  fetchData(userId);
}, []);
```

**Fix**:

```tsx
// ✅ Include all dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

## Security Patterns

### 1. SQL Injection

**Problem**:

```ts
// ❌ User input in query
const query = `SELECT * FROM users WHERE name = '${userName}'`;
```

**Fix**:

```ts
// ✅ Parameterized query
const query = db.prepare("SELECT * FROM users WHERE name = ?");
query.run(userName);
```

### 2. XSS Vulnerability

**Problem**:

```tsx
// ❌ Dangerous HTML injection
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**Fix**:

```tsx
// ✅ Sanitize first
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />;
```

## Performance Patterns

### 1. Inefficient Loops

**Problem**:

```ts
// ❌ Nested loop with O(n²)
for (const item of items) {
  for (const user of users) {
    if (item.userId === user.id) { ... }
  }
}
```

**Fix**:

```ts
// ✅ Use Map for O(n) lookup
const userMap = new Map(users.map(u => [u.id, u]));
for (const item of items) {
  const user = userMap.get(item.userId);
  if (user) { ... }
}
```

### 2. Unnecessary Computations

**Problem**:

```tsx
// ❌ Recalculates on every render
const sortedItems = items.sort((a, b) => a.price - b.price);
```

**Fix**:

```tsx
// ✅ Memoize expensive calculations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.price - b.price),
  [items],
);
```

````

### Key Features

- **allowed-tools: Read, Grep, Glob** - Cannot modify files
- **Security boundary**: Read-only analysis
- **Safe for production**: Can't break anything

### Testing

```bash
# Test the skill
"Analyze the code in src/components/"
"Check this file for issues"
````

## Example 4: Implementation Skill with Write Access

A skill that creates and modifies files.

### Use Case

Creates React Native components following project patterns.

### Directory Structure

```
create-component/
├── SKILL.md
└── references/
    ├── theme-system.md
    ├── component-patterns.md
    └── examples.md
```

### SKILL.md

```yaml
---
name: create-component
description: Creates React Native components following project patterns with theme integration. Use when user asks to "create a component", "make a component", "add a component", or mentions creating UI components.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Create React Native Component

## Overview

This skill creates complete React Native components following the project's three-tier theme system and established patterns.

## What Gets Created

For a new component, I'll create:

1. `Component.tsx` - Main implementation
2. `Component.theme.ts` - Theme tokens
3. `Component.test.tsx` - Jest tests
4. `index.ts` - Exports
5. `README.mdx` - Documentation

## Quick Start

Just ask: "Create a Badge component"

I'll:
1. Ask about variants and sizes needed
2. Create all required files
3. Integrate with theme system
4. Add to package exports
5. Run tests and type-checking

## Theme Integration

All components use the three-tier token system:

**Primitive** → **Semantic** → **Component**

See [theme-system.md](references/theme-system.md) for details.

## Component Patterns

See [component-patterns.md](references/component-patterns.md) for:
- forwardRef pattern
- Style merging
- Accessibility
- Testing strategies

## Examples

See [examples.md](references/examples.md) for complete component examples.
```

### references/theme-system.md

````markdown
# Three-Tier Theme System

## Overview

The component library uses a hierarchical token system for consistent, theme-aware styling.

## Tier 1: Primitive Tokens

Raw design values without semantic meaning.

**Location**: `src/theme/tokens/primitive/`

**Examples**:

```ts
primitive.spacing[4]; // 16px
primitive.fontSize.base; // 16px
primitive.borderRadius.md; // 8px
primitive.opacity.disabled; // 0.5
```
````

## Tier 2: Semantic Tokens

Context-aware tokens mapped to light/dark themes.

**Location**: `src/theme/tokens/semantic/`

**Examples**:

```ts
light.text.primary; // #000000 (in light mode)
dark.text.primary; // #FFFFFF (in dark mode)
light.action.primary; // #4A90E2
dark.surface.elevated; // #2A2A2A
```

## Tier 3: Component Tokens

Component-specific styling rules.

**Location**: Colocated with component (`Component.theme.ts`)

**Example**:

```ts
export const button = {
  size: {
    sm: {
      height: primitive.spacing[9],
      paddingHorizontal: primitive.spacing[3],
      fontSize: primitive.fontSize.sm,
    },
    md: {
      height: primitive.spacing[11],
      paddingHorizontal: primitive.spacing[4],
      fontSize: primitive.fontSize.base,
    },
  },
  variant: {
    light: {
      primary: {
        background: light.action.primary,
        text: light.text.inverse,
      },
    },
    dark: {
      primary: {
        background: dark.action.primary,
        text: dark.text.inverse,
      },
    },
  },
} as const;
```

## Using Tokens in Components

```tsx
import { useTheme } from "../theme";

export const Button = ({ variant = "primary", size = "md" }) => {
  const { theme, colorScheme } = useTheme();

  const sizeTokens = theme.component.button.size[size];
  const variantTokens = theme.component.button.variant[colorScheme][variant];

  return (
    <Pressable
      style={{
        height: sizeTokens.height,
        paddingHorizontal: sizeTokens.paddingHorizontal,
        backgroundColor: variantTokens.background,
      }}
    />
  );
};
```

## Rules

1. **Never hardcode values** - Always use tokens
2. **Primitive for spacing/sizes** - Use primitive tokens
3. **Semantic for colors** - Use semantic tokens
4. **Component for specifics** - Use component tokens
5. **Export as const** - Type safety

````

### When to Use This Pattern

✅ **Use implementation skill when**:
- Skill creates or modifies files
- Needs full tool access
- Generates code or components
- Requires execution (Bash, Task)

### Testing

```bash
# Test the skill
"Create a Card component with primary and secondary variants"
````

## Example 5: Plugin Skill Structure

A skill designed for distribution via plugin marketplace.

### Use Case

PDF processing skill that can be installed as a plugin.

### Directory Structure

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    └── pdf-processing/
        ├── SKILL.md
        ├── references/
        │   ├── api-reference.md
        │   ├── form-filling.md
        │   └── examples.md
        └── scripts/
            ├── validate_form.py
            └── merge_pdfs.sh
```

### .claude-plugin/plugin.json

```json
{
  "name": "pdf-tools",
  "version": "1.0.0",
  "description": "PDF processing skills for Claude Code",
  "author": "Your Name",
  "skills": ["pdf-processing"]
}
```

### SKILL.md

````yaml
---
name: pdf-processing
description: Extract text, fill forms, merge PDFs. Use when working with PDF files or when user mentions PDFs, forms, document extraction, or PDF processing.
allowed-tools: Read, Bash
---

# PDF Processing

## Overview

Process PDF files: extract text, fill forms, merge documents.

**Requirements**: Requires `pypdf` and `pdfplumber` packages:
```bash
pip install pypdf pdfplumber
````

## Quick Start

**Extract text**:

```python
import pdfplumber
with pdfplumber.open("doc.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

**Fill form**:
See [form-filling.md](references/form-filling.md)

**Merge PDFs**:

```bash
bash scripts/merge_pdfs.sh file1.pdf file2.pdf output.pdf
```

## Complete Documentation

- [API Reference](references/api-reference.md)
- [Form Filling Guide](references/form-filling.md)
- [Examples](references/examples.md)

## Validation

Validate PDF forms before processing:

```bash
python scripts/validate_form.py input.pdf
```

```

### Distribution

1. Create plugin repository
2. Add to plugin marketplace
3. Users install with: `/plugin install pdf-tools@marketplace`
4. Skill becomes available automatically

### When to Use This Pattern

✅ **Use plugin structure when**:
- Distributing publicly
- Sharing across multiple repositories
- Providing as a service/tool
- Want versioning and updates

## Summary Table

| Example | Files | Tools | Use Case |
|---------|-------|-------|----------|
| 1. Minimal | 1 (SKILL.md only) | All | Simple, straightforward skill |
| 2. Multi-File | 3 (SKILL + 2 refs) | Read, Bash | Specification-based workflow |
| 3. Read-Only | 2 (SKILL + 1 ref) | Read, Grep, Glob | Analysis, no modifications |
| 4. Implementation | 4 (SKILL + 3 refs) | Read, Write, Edit, Bash | Code generation |
| 5. Plugin | 5+ (full structure) | Read, Bash | Public distribution |

## Choosing the Right Pattern

**Start simple**: Begin with Example 1 (minimal). Add complexity only when needed.

**Add references**: When SKILL.md exceeds ~400 lines, move details to references/ (Example 2).

**Restrict tools**: For analysis-only skills, limit to read tools (Example 3).

**Full access**: For implementation skills, allow Write/Edit/Bash (Example 4).

**Plugin structure**: For public distribution, use full plugin format (Example 5).

## Next Steps

Pick the example closest to your use case and adapt it to your needs. Start minimal and expand as requirements grow.
```
