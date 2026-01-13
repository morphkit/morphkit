# YAML Fields Reference

Complete reference for all YAML frontmatter fields in agent configuration files.

## Overview

Agent files use YAML frontmatter to configure behavior, tool access, permissions, and model settings. The frontmatter appears at the top of the AGENT.md file between `---` delimiters:

```markdown
---
name: agent-name
description: What this agent does
tools: Read, Grep, Glob
model: sonnet
permissionMode: default
---

[System prompt content in markdown]
```

## Required Fields

### name

**Type**: String
**Format**: Lowercase letters and hyphens only (kebab-case)
**Max length**: 64 characters

The unique identifier for the agent. Must match the directory name.

**Syntax rules:**

- Use kebab-case (lowercase with hyphens)
- No spaces, underscores, or special characters
- Must be unique within `.claude/agents/`
- Should be descriptive but concise

**Valid examples:**

```yaml
name: code-reviewer
name: security-scanner
name: test-generator
name: db-query-analyzer
```

**Invalid examples:**

```yaml
name: CodeReviewer          # Wrong: Use kebab-case
name: code_reviewer         # Wrong: Use hyphens, not underscores
name: code reviewer         # Wrong: No spaces allowed
name: code-reviewer-v2.0    # Wrong: No dots allowed
```

**Common mistakes:**

- Directory name doesn't match `name` field
- Using camelCase or snake_case instead of kebab-case
- Including version numbers or special characters
- Name too generic (use `security-reviewer` not `reviewer`)

**File structure requirement:**

```
.claude/agents/
└── code-reviewer/          # Directory name
    └── AGENT.md            # Contains: name: code-reviewer
```

### description

**Type**: String
**Max length**: 1024 characters
**Purpose**: Tells Claude when to delegate to this agent

The description determines when Claude automatically delegates tasks to this agent. Write it with both capabilities and trigger phrases.

**Effective descriptions answer:**

1. What does this agent do?
2. When should it be used?
3. What phrases trigger it?

**Structure:**

```yaml
description: [Capabilities]. Use [when/for] [scenarios]. [Trigger phrases in quotes].
```

**Good examples:**

```yaml
description: Reviews code for quality, security, and best practices. Use proactively after writing or modifying code, or when user asks to "review code", "check code quality", or "security review".

description: Executes read-only database queries for data analysis. Use when analyzing data or when user mentions "query database", "run SQL", "analyze data", or "database report".

description: Generates comprehensive test cases with edge cases and mocking. Use when creating tests or when user asks to "write tests", "generate tests", or "test coverage".
```

**Bad examples:**

```yaml
description: Code reviewer
# Too vague, no trigger phrases

description: This agent is responsible for performing code review operations on source files
# Too formal, missing natural trigger phrases

description: Use for code review
# Missing capabilities, too brief
```

**Key principles:**

- Include specific action verbs (reviews, generates, analyzes, validates)
- Add natural trigger phrases in quotes
- Mention key nouns users would say (code, database, tests, documentation)
- Be specific about capabilities, not just domain
- Include "Use proactively" if agent should activate without explicit request

**Testing your description:**

After creating the agent, test with phrases from your description:

```
Review my recent code changes
Generate tests for the authentication module
Query the database for user statistics
```

If the agent doesn't activate, add more trigger phrases to the description.

## Optional Fields

### tools

**Type**: String (comma-separated list) or Array
**Default**: Inherit all tools from main conversation

Whitelist of tools the agent can use. If specified, agent can ONLY use these tools.

**String format (recommended):**

```yaml
tools: Read, Grep, Glob, Bash
```

**Array format (alternative):**

```yaml
tools:
  - Read
  - Grep
  - Glob
  - Bash
```

**Available tools:**

**Core tools:**

- `Read` - Read file contents
- `Write` - Create new files
- `Edit` - Modify existing files
- `Glob` - Find files by pattern
- `Grep` - Search file contents
- `Bash` - Execute shell commands

**Workflow tools:**

- `Task` - Delegate to other agents
- `AskUserQuestion` - Ask clarifying questions
- `TodoWrite` - Manage task lists

**Web tools:**

- `WebFetch` - Fetch web content
- `WebSearch` - Search the web

**Integration tools:**

- MCP tools (depends on installed MCP servers)

**Common patterns by agent type:**

```yaml
# Read-only analysis
tools: Read, Grep, Glob

# Investigative research
tools: Read, Grep, Glob, WebFetch, WebSearch

# Implementation
tools: Read, Write, Grep, Glob

# Documentation
tools: Read, Write, Edit, Grep, Glob

# Database operations
tools: Read, Bash

# Orchestration
tools: Read, Task, AskUserQuestion
```

**When to use:**

- Agent should have restricted capabilities
- Security-sensitive operations (read-only database access)
- Focused workflows (analysis only, no modifications)

**When to omit:**

- Agent needs full toolset
- You want flexibility for agent to use any tool

**Precedence:**

If both `tools` and `disallowedTools` are specified, `tools` takes precedence (agent can only use listed tools, disallowedTools is ignored).

### disallowedTools

**Type**: String (comma-separated list) or Array
**Default**: None (no tools denied)

Blacklist of tools the agent cannot use. Agent inherits all other tools from main conversation except these.

**String format (recommended):**

```yaml
disallowedTools: Write, Edit, Bash
```

**Array format (alternative):**

```yaml
disallowedTools:
  - Write
  - Edit
  - Bash
```

**Common patterns:**

```yaml
# Prevent file modifications
disallowedTools: Write, Edit

# Prevent command execution
disallowedTools: Bash

# Prevent web access
disallowedTools: WebFetch, WebSearch

# Prevent task delegation
disallowedTools: Task
```

**When to use:**

- You want agent to inherit most tools but block a few
- Simpler than listing all allowed tools in `tools` field
- Agent needs flexibility but with specific restrictions

**Example use case:**

Database reader that can use all tools except Write/Edit:

```yaml
---
name: db-reader
description: Execute read-only database queries
disallowedTools: Write, Edit
---
```

**Precedence:**

If both `tools` and `disallowedTools` are specified, `tools` takes precedence and `disallowedTools` is ignored.

### model

**Type**: String
**Options**: `sonnet`, `opus`, `haiku`, `inherit`
**Default**: `sonnet`

Specifies which AI model the agent uses.

**Model characteristics:**

**Sonnet (default)**

- Balanced capability and speed
- Good for most tasks
- Recommended default choice

```yaml
model: sonnet
```

**Opus**

- Maximum capability
- Best for complex reasoning
- Higher cost, slower responses
- Use for: Complex analysis, architectural decisions, advanced debugging

```yaml
model: opus
```

**Haiku**

- Fast and low-cost
- Good for simple, well-defined tasks
- Use for: Simple queries, pattern matching, basic analysis

```yaml
model: haiku
```

**Inherit**

- Uses same model as main conversation
- Good for consistency
- Model changes with main conversation

```yaml
model: inherit
```

**Choosing a model:**

- **Sonnet**: Default choice for most agents
- **Opus**: Complex reasoning, architectural review, advanced debugging
- **Haiku**: Fast operations, simple queries, basic validation
- **Inherit**: When consistency with main conversation matters

**Examples by agent type:**

```yaml
# Code reviewer - needs strong reasoning
model: sonnet

# Data scientist - complex analysis
model: opus

# Quick validator - simple checks
model: haiku

# Implementation helper - match main conversation
model: inherit
```

### permissionMode

**Type**: String
**Options**: `default`, `acceptEdits`, `dontAsk`, `bypassPermissions`, `plan`
**Default**: `default`

Controls how the agent handles permission prompts.

**Modes:**

**default (recommended)**

Standard permission checking with prompts to user.

```yaml
permissionMode: default
```

**When to use:**

- Most agents (safest option)
- Agent performs sensitive operations
- User should review before execution

**acceptEdits**

Auto-accept file edit operations. Other permissions still prompt.

```yaml
permissionMode: acceptEdits
```

**When to use:**

- Documentation writers
- Test generators
- Trusted file modification workflows

**Warning:** Agent can modify files without confirmation. Use only for trusted operations.

**dontAsk**

Auto-deny permission prompts. Only explicitly allowed tools work.

```yaml
permissionMode: dontAsk
tools: Read, Grep, Glob
```

**When to use:**

- Agents with explicit tool allowlist
- Read-only operations with no user interaction needed
- Background agents that should never prompt

**bypassPermissions**

Skip all permission checks. Extremely dangerous.

```yaml
permissionMode: bypassPermissions
```

**Warning:** Agent can execute ANY operation without approval. Use only in controlled environments with strict tool restrictions.

**When to use:**

- Automated CI/CD agents
- Trusted batch operations
- Only when you fully trust the agent and have tested it thoroughly

**plan**

Plan mode with read-only exploration.

```yaml
permissionMode: plan
```

**When to use:**

- Planning and research agents
- Agents that explore without making changes

**Choosing a permission mode:**

**Start with `default`** (safest), then consider:

- `acceptEdits` - Trusted file modifications (docs, tests)
- `dontAsk` - Read-only with no prompts needed
- `bypassPermissions` - Only for fully trusted, well-tested agents
- `plan` - Research and exploration only

**Security considerations:**

- Higher permission modes = higher risk
- Always test with `default` first
- Document why non-default mode is needed
- Combine with tool restrictions for defense in depth

### skills

**Type**: String (comma-separated list) or Array
**Default**: None (no skills loaded)

Skills to load into the agent's context at startup. The full skill content is injected, not just made available for invocation.

**String format (recommended):**

```yaml
skills: create-component, code-review
```

**Array format (alternative):**

```yaml
skills:
  - create-component
  - code-review
```

**Important notes:**

- Skills must exist in `.claude/skills/` or `~/.claude/skills/`
- Full skill content (SKILL.md + references) is loaded into agent context
- Increases agent's initial context size
- Agents don't inherit skills from parent conversation

**When to use:**

- Agent needs specialized knowledge from a skill
- Agent should follow project conventions defined in a skill
- Agent requires domain expertise encoded in a skill

**Example:**

Component generator agent that uses create-component knowledge:

```yaml
---
name: component-generator
description: Generate React Native components following project patterns
tools: Read, Write, Grep, Glob
skills: create-component
---
You are a component generator that follows morph-ui conventions.
Use the create-component skill knowledge to ensure components match project patterns.
```

**Common mistakes:**

- Loading too many skills (context bloat)
- Expecting skills to be invocable (they're injected as knowledge, not callable)
- Not checking if skills exist before referencing

**Best practices:**

- Only load skills the agent truly needs
- Document why each skill is loaded
- Test agent with and without skills to verify necessity

### hooks

**Type**: Object
**Default**: None (no hooks)

Lifecycle hooks that run during agent execution. Hooks can validate operations, run scripts, or trigger automation.

**Hook types:**

- `PreToolUse` - Runs before agent uses a tool
- `PostToolUse` - Runs after agent uses a tool
- `Stop` - Runs when agent completes

**Structure:**

```yaml
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-command.sh"
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: "./scripts/run-linter.sh"
  Stop:
    - hooks:
        - type: command
          command: "./scripts/cleanup.sh"
```

**PreToolUse hook:**

Validates tool usage before execution. Can block operations by exiting with code 2.

```yaml
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
```

**Use cases:**

- Validate SQL queries are read-only
- Check file paths before operations
- Enforce security policies

**PostToolUse hook:**

Runs after tool completes. Cannot block operation.

```yaml
hooks:
  PostToolUse:
    - matcher: "Write|Edit"
      hooks:
        - type: command
          command: "./scripts/format-code.sh"
```

**Use cases:**

- Format code after edits
- Run linters
- Update documentation
- Trigger builds

**Stop hook:**

Runs when agent finishes execution.

```yaml
hooks:
  Stop:
    - hooks:
        - type: command
          command: "./scripts/cleanup-temp-files.sh"
```

**Use cases:**

- Cleanup temporary files
- Generate reports
- Update logs
- Notify completion

**Matcher:**

Regular expression matching tool names.

```yaml
matcher: "Bash"              # Matches Bash tool only
matcher: "Edit|Write"        # Matches Edit or Write
matcher: "Read|Grep|Glob"    # Matches any read tool
```

**Hook commands:**

Scripts receive JSON input via stdin. Exit codes control behavior:

- `0`: Success, continue
- `1`: Error, continue (logged)
- `2`: Block operation (PreToolUse only)

See Claude Code hooks documentation for complete input schema.

## Complete Examples

### Example 1: Read-Only Code Reviewer

```yaml
---
name: code-reviewer
description: Reviews code for quality, security, and best practices. Use proactively after writing or modifying code.
tools: Read, Grep, Glob
model: sonnet
permissionMode: default
---
```

**Why this configuration:**

- `tools: Read, Grep, Glob` - Read-only, cannot modify files
- `model: sonnet` - Balanced capability for analysis
- `permissionMode: default` - Safest option

### Example 2: Documentation Writer

```yaml
---
name: doc-writer
description: Creates and updates documentation files. Use when writing documentation or when user asks to "write docs", "update documentation", or "generate API docs".
tools: Read, Write, Edit, Grep, Glob
model: sonnet
permissionMode: acceptEdits
---
```

**Why this configuration:**

- `tools: Read, Write, Edit, Grep, Glob` - Can create and modify files
- `permissionMode: acceptEdits` - Auto-accept file edits (trusted operation)
- `model: sonnet` - Good writing capability

### Example 3: Database Reader with Hook

```yaml
---
name: db-reader
description: Execute read-only database queries for data analysis
tools: Read, Bash
disallowedTools: Write, Edit
model: sonnet
permissionMode: default
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
---
```

**Why this configuration:**

- `tools: Read, Bash` - Can run queries via Bash
- `disallowedTools: Write, Edit` - Extra safety layer
- `hooks.PreToolUse` - Validates SQL is read-only before execution
- `permissionMode: default` - User reviews database operations

### Example 4: Test Generator

```yaml
---
name: test-generator
description: Generates comprehensive test cases with edge cases and mocking. Use when creating tests or when user asks to "write tests", "generate tests", or "test coverage".
tools: Read, Write, Grep, Glob
model: sonnet
permissionMode: acceptEdits
skills: create-component
---
```

**Why this configuration:**

- `tools: Read, Write, Grep, Glob` - Can create test files
- `permissionMode: acceptEdits` - Streamlines test file creation
- `skills: create-component` - Follows project testing patterns
- `model: sonnet` - Good test writing capability

### Example 5: Security Scanner

```yaml
---
name: security-scanner
description: Scans code for security vulnerabilities and exposed secrets. Use proactively or when user asks to "security scan", "check for vulnerabilities", or "find secrets".
tools: Read, Grep, Glob, WebSearch
model: opus
permissionMode: default
---
```

**Why this configuration:**

- `tools: Read, Grep, Glob, WebSearch` - Read code + research vulnerabilities
- `model: opus` - Maximum capability for security analysis
- `permissionMode: default` - User reviews findings
- `WebSearch` - Can research CVEs and security advisories

## Common Mistakes and Fixes

### Mistake 1: Directory and name mismatch

**Wrong:**

```
.claude/agents/codeReviewer/
    AGENT.md with name: code-reviewer
```

**Fix:**

```
.claude/agents/code-reviewer/
    AGENT.md with name: code-reviewer
```

### Mistake 2: Too permissive tool access

**Wrong:**

```yaml
name: db-reader
description: Read-only database queries
# No tool restrictions - agent can modify files!
```

**Fix:**

```yaml
name: db-reader
description: Read-only database queries
tools: Read, Bash
disallowedTools: Write, Edit
```

### Mistake 3: Missing trigger phrases

**Wrong:**

```yaml
description: Code reviewer for quality and security
```

**Fix:**

```yaml
description: Reviews code for quality, security, and best practices. Use when user asks to "review code", "check code quality", or "security review".
```

### Mistake 4: Wrong permission mode

**Wrong:**

```yaml
name: code-reviewer
description: Reviews code
permissionMode: acceptEdits # Read-only agent doesn't need this!
```

**Fix:**

```yaml
name: code-reviewer
description: Reviews code
tools: Read, Grep, Glob
permissionMode: default
```

### Mistake 5: Using both tools and disallowedTools

**Wrong:**

```yaml
tools: Read, Write, Grep
disallowedTools: Bash # Ignored! tools takes precedence
```

**Fix (pick one approach):**

```yaml
# Option 1: Whitelist
tools: Read, Write, Grep

# Option 2: Blacklist
disallowedTools: Bash
```

## Validation Checklist

Before finalizing agent configuration, verify:

- [ ] Name is kebab-case and matches directory
- [ ] Description includes trigger phrases in quotes
- [ ] Tools appropriate for agent role
- [ ] Permission mode matches security requirements
- [ ] Model choice matches task complexity
- [ ] Skills (if any) exist in project
- [ ] Hooks (if any) reference valid scripts
- [ ] No conflicting fields (tools + disallowedTools)
- [ ] Configuration tested with sample invocation

## Next Steps

After configuring YAML frontmatter:

1. Write the system prompt (agent behavior)
2. Test the agent with sample tasks
3. Iterate based on actual behavior
4. Document successful patterns
5. Share learnings with team
