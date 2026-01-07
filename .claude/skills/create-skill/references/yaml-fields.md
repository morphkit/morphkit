# YAML Frontmatter Fields Reference

This document provides comprehensive documentation for all YAML frontmatter fields available in SKILL.md files.

## Overview

YAML frontmatter appears at the top of SKILL.md between `---` markers. It contains metadata that Claude uses to understand and activate your skill.

```yaml
---
name: skill-name
description: What this skill does and when to use it.
allowed-tools: Read, Write, Grep
model: claude-sonnet-4-5-20250929
---
```

## Required Fields

### name

**Type**: String
**Required**: Yes
**Max Length**: 64 characters
**Format**: Lowercase letters, numbers, hyphens only (kebab-case)
**Must Match**: Directory name

**Description**: Unique identifier for your skill. Used internally by Claude Code to reference the skill.

**Validation Rules**:

- Only lowercase letters (a-z)
- Numbers (0-9)
- Hyphens (-) for word separation
- No spaces, underscores, or special characters
- Maximum 64 characters
- Should match the directory name

**Examples**:

```yaml
# ✅ Good
name: create-skill
name: review-pr
name: generate-commit-message
name: pdf-form-filler
name: database-query-helper

# ❌ Bad
name: Create Skill        # Has spaces and capitals
name: create_skill        # Uses underscores
name: createSkill         # Uses camelCase
name: create-skill-for-making-new-agent-skills-following-best-practices  # Too long (>64 chars)
```

**Best Practices**:

- Use descriptive names that indicate what the skill does
- Keep it concise but clear
- Match the directory name exactly
- Use hyphens to separate words

### description

**Type**: String
**Required**: Yes
**Max Length**: 1024 characters
**Purpose**: Trigger phrases + what the skill does

**Description**: This is the MOST CRITICAL field. Claude uses the description to decide when to activate your skill. A vague description means your skill won't trigger properly.

**Structure of Good Descriptions**:

1. **What it does** - Specific capabilities
2. **When to use** - Trigger context
3. **Trigger phrases** - Exact words users would say (in quotes)

**Formula**:

```
[Action verbs describing capabilities]. Use when [context] or when user [mentions/asks about] "[exact phrase 1]", "[exact phrase 2]", or [related terms].
```

**Examples**:

```yaml
# ✅ Excellent - Specific capabilities + multiple trigger phrases
description: Generates commit messages from git diffs following Conventional Commits format. Use when writing commits or when user asks to "create a commit", "commit changes", "write a commit message", or mentions committing code.

# ✅ Excellent - Domain-specific with clear triggers
description: Extracts text and tables from PDF files, fills PDF forms, merges documents. Use when working with PDF files or when user mentions PDFs, forms, document extraction, or PDF processing.

# ✅ Good - Clear capabilities and triggers
description: Reviews pull requests for code quality, security issues, and best practices. Use when user asks to "review PR", "check pull request", or mentions code review.

# ⚠️ Okay - Has triggers but could be more specific
description: Helps with database queries. Use when user mentions SQL or databases.

# ❌ Bad - No trigger phrases
description: A helpful skill for working with Git commits.

# ❌ Bad - Too vague, no specific triggers
description: Code analysis tool.

# ❌ Bad - Missing the "when to use" context
description: Creates React Native components.
```

**Trigger Phrase Strategies**:

1. **Quote exact phrases** users would say:

   ```yaml
   "create a skill", "write a skill", "make a new skill"
   ```

2. **Include variations**:

   ```yaml
   "review PR", "review pull request", "check this PR"
   ```

3. **Add domain keywords**:

   ```yaml
   mentions PDFs, forms, or document extraction
   ```

4. **Use semantic similarity**:
   Claude matches based on meaning, so include related terms:
   ```yaml
   mentions skill creation, SKILL.md files, agent skills, or skill development
   ```

**Character Limit Management**:

If your description approaches 1024 characters, prioritize:

1. Core capabilities (what it does)
2. Most common trigger phrases
3. Key domain terms

**Testing Your Description**:

After writing a description, test it by:

1. Reading it aloud - does it sound natural?
2. Asking "Would a user say these words?"
3. Testing activation with your trigger phrases
4. Refining based on whether Claude activates appropriately

## Optional Fields

### allowed-tools

**Type**: String (comma-separated list)
**Required**: No
**Default**: No restrictions (all tools allowed)
**Purpose**: Limit which tools Claude can use when this skill is active

**Description**: When specified, Claude can only use the listed tools without asking for permission. This is useful for:

- Read-only skills that shouldn't modify files
- Security-sensitive workflows
- Skills with limited scope

**Available Tools**:

**Read Operations**:

- `Read` - Read file contents
- `Grep` - Search file contents
- `Glob` - Find files by pattern

**Write Operations**:

- `Write` - Create new files
- `Edit` - Modify existing files

**Execution**:

- `Bash` - Run shell commands
- `Task` - Delegate to subagents

**Web Access**:

- `WebFetch` - Fetch web pages
- `WebSearch` - Search the web

**MCP Tools**:

- `mcp__server_name__tool_name` - Specific MCP tools

**Common Patterns**:

```yaml
# Read-only skill (analysis, search, exploration)
allowed-tools: Read, Grep, Glob

# Implementation skill (creates and modifies files)
allowed-tools: Read, Write, Edit, Glob, Grep

# Full development skill (includes execution)
allowed-tools: Read, Write, Edit, Glob, Grep, Bash

# Research skill (web access)
allowed-tools: Read, Grep, Glob, WebFetch, WebSearch

# Orchestration skill (delegates to agents)
allowed-tools: Read, Glob, Grep, Task

# No restrictions (default)
allowed-tools:  # Omit the field entirely
```

**Examples**:

```yaml
# ✅ Read-only code analyzer
name: code-analyzer
description: Analyzes code for patterns and issues.
allowed-tools: Read, Grep, Glob

# ✅ Component generator (needs write access)
name: create-component
description: Creates new React Native components.
allowed-tools: Read, Write, Edit, Glob, Grep

# ✅ PR reviewer (read + web for documentation)
name: review-pr
description: Reviews pull requests for quality.
allowed-tools: Read, Grep, Glob, WebFetch

# ✅ Skill creator (needs all tools)
name: create-skill
description: Creates new agent skills.
allowed-tools: Read, Write, Glob, Grep, Bash
```

**When to Restrict Tools**:

✅ **Restrict when**:

- Skill should only read/analyze, never modify
- Security-sensitive operations
- Teaching/explanation skills
- Analysis and reporting skills

❌ **Don't restrict when**:

- Skill implements features (needs Write/Edit)
- Skill generates code or files
- Skill delegates to subagents (needs Task)
- You want maximum flexibility

**Security Considerations**:

Restricting tools provides a safety boundary:

- Read-only skills can't accidentally delete files
- Analysis skills can't make unwanted changes
- User knows the skill's capabilities are limited

**Best Practices**:

- Start restrictive, add tools as needed
- Match tool access to skill's purpose
- Document why you chose specific tools
- Test that your skill can complete its tasks

### model

**Type**: String
**Required**: No
**Default**: Inherits from conversation
**Purpose**: Override which Claude model to use for this skill

**Description**: Forces Claude to use a specific model when this skill is active. Useful for:

- Cost optimization (use Haiku for simple tasks)
- Capability requirements (use Opus for complex reasoning)
- Consistency (ensure same model for specific workflows)

**Available Models**:

**Current Models** (as of 2025):

- `claude-opus-4-5-20251101` - Most capable, highest cost
- `claude-sonnet-4-5-20250929` - Balanced capability and cost
- `claude-haiku-4-20250514` - Fast and economical

**Format**: Use exact model ID from Anthropic's model list.

**Examples**:

```yaml
# Use Haiku for simple, fast tasks
name: format-code
description: Formats code using Prettier.
model: claude-haiku-4-20250514

# Use Opus for complex analysis
name: architecture-review
description: Reviews system architecture for scalability.
model: claude-opus-4-5-20251101

# Use Sonnet (balanced)
name: review-pr
description: Reviews pull requests.
model: claude-sonnet-4-5-20250929

# No model specified (inherits from conversation)
name: create-component
description: Creates React Native components.
# model field omitted - uses whatever model user is chatting with
```

**When to Specify a Model**:

✅ **Specify when**:

- Task is simple and Haiku would save costs (formatting, linting)
- Task requires maximum capability (architecture, security review)
- Workflow needs consistency across all uses
- Specific model features required

❌ **Don't specify when**:

- User's model choice should apply
- Task complexity varies (let user choose)
- Default behavior is fine

**Cost Considerations**:

Using `model: claude-haiku-4-20250514` can significantly reduce costs for:

- Code formatting
- Simple linting
- Straightforward data transformations
- Template generation

Using `model: claude-opus-4-5-20251101` ensures quality for:

- Security analysis
- Complex refactoring
- Architecture decisions
- Critical code reviews

**Best Practices**:

- Only specify when you have a good reason
- Document why you chose a specific model
- Consider user experience vs cost tradeoffs
- Test that your chosen model can handle the skill

## Field Validation

### YAML Syntax Rules

**Critical Requirements**:

1. **Must start with `---`** on line 1 (no blank lines before)
2. **Must end with `---`** before markdown content
3. **Use spaces for indentation**, never tabs
4. **Use 2 spaces** per indentation level
5. **No trailing spaces** after field values

**Correct Structure**:

```yaml
---
name: skill-name
description: Description text here.
allowed-tools: Read, Write
---
# Markdown content starts here
```

**Common Syntax Errors**:

```yaml
# ❌ Blank line before opening ---

---
name: skill-name
---

# ❌ Using tabs instead of spaces
---
name:→skill-name  # Tab character
---

# ❌ Missing closing ---
---
name: skill-name
description: Text

# ❌ No space after colon
name:skill-name

# ✅ Correct spacing
name: skill-name
```

### Validation Checklist

Before finalizing your SKILL.md frontmatter:

- [ ] `name` field present and valid (kebab-case, max 64 chars)
- [ ] `description` field present and has trigger phrases (max 1024 chars)
- [ ] `allowed-tools` field valid if present (comma-separated tool names)
- [ ] `model` field valid if present (exact model ID)
- [ ] YAML starts with `---` on line 1
- [ ] YAML ends with `---` before markdown
- [ ] Uses spaces for indentation (not tabs)
- [ ] All colons have space after them (`name: value` not `name:value`)
- [ ] No trailing spaces or special characters

## Complete Examples

### Minimal Skill

```yaml
---
name: explain-code
description: Explains code using visual diagrams and analogies. Use when user asks "how does this work", "explain this code", or mentions code explanation.
---
```

### Full-Featured Skill

```yaml
---
name: create-skill
description: Creates Agent Skills following Anthropic best practices. Use when the user asks to "create a skill", "write a skill", "make a new skill", or mentions skill creation, SKILL.md files, or agent skills.
allowed-tools: Read, Write, Glob, Grep, Bash
model: claude-sonnet-4-5-20250929
---
```

### Read-Only Analysis Skill

```yaml
---
name: security-audit
description: Audits code for security vulnerabilities and OWASP top 10 issues. Use when user asks to "review security", "check for vulnerabilities", "security audit", or mentions security analysis.
allowed-tools: Read, Grep, Glob, WebFetch
model: claude-opus-4-5-20251101
---
```

## Troubleshooting Field Issues

### Skill doesn't load

**Symptoms**: Skill doesn't appear in "What Skills are available?"

**Check**:

1. File named exactly `SKILL.md` (case-sensitive)
2. YAML starts on line 1 with `---`
3. YAML ends with `---` before markdown
4. No syntax errors (tabs, missing spaces, etc.)
5. `name` field matches directory name

### Skill doesn't trigger

**Symptoms**: Skill appears but doesn't activate when expected

**Check**:

1. `description` has specific trigger phrases
2. Trigger phrases match what users actually say
3. Description includes domain keywords
4. Not too vague or generic

**Fix**: Add more specific triggers to description:

```yaml
# Before
description: Helps with components.

# After
description: Creates React Native components with theme support. Use when user asks to "create a component", "make a new component", or mentions component creation.
```

### YAML parse errors

**Symptoms**: Error loading skill, YAML syntax error in logs

**Check**:

1. No tabs (use spaces only)
2. Space after every colon: `name: value`
3. Opening `---` on line 1
4. Closing `---` before markdown
5. All required fields present

**Fix**: Validate YAML syntax:

```bash
# Check for syntax errors
python3 -c "import yaml; yaml.safe_load(open('.claude/skills/skill-name/SKILL.md').read().split('---')[1])"
```

### Tool restrictions too limiting

**Symptoms**: Skill can't complete its task, permission errors

**Check**:

1. `allowed-tools` includes all necessary tools
2. Skill needs Write but only has Read
3. Skill needs Task but it's not listed

**Fix**: Add required tools:

```yaml
# Before - too restrictive
allowed-tools: Read, Grep

# After - can actually do its job
allowed-tools: Read, Write, Edit, Grep, Glob
```

## Best Practices Summary

1. **Always include `name` and `description`** - They're required
2. **Make description specific** - Include exact trigger phrases
3. **Test trigger phrases** - Ask Claude with them to verify activation
4. **Restrict tools conservatively** - Start restrictive, add as needed
5. **Only specify model when necessary** - Let user choice apply by default
6. **Validate YAML syntax** - Use spaces, proper structure
7. **Match name to directory** - Keeps organization clear
8. **Keep description under 1024 chars** - Prioritize common triggers

## Additional Resources

- [Anthropic Model Documentation](https://docs.anthropic.com/en/docs/about-claude/models)
- [YAML Syntax Guide](https://yaml.org/spec/1.2/spec.html)
- [Skill Creation Best Practices](../SKILL.md)
- [Progressive Disclosure Patterns](progressive-disclosure.md)
- [Example Skills](examples.md)
