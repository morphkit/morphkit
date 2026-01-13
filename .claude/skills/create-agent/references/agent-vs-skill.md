# Agent vs Skill Decision Guide

Comprehensive guide for choosing the right Claude Code extensibility pattern.

## Overview

Claude Code offers five main extensibility patterns, each with distinct use cases:

1. **CLAUDE.md** - Always-on project instructions
2. **Skills** - Auto-triggered specialized knowledge
3. **Agents** - Isolated contexts with custom tools
4. **Hooks** - Event-triggered automation
5. **MCP** - External tool and data integration

This guide helps you choose the right pattern for your needs.

## Quick Decision Tree

```
Do you need to connect external tools or data sources?
  └─ YES → Use MCP (Model Context Protocol)

Do you want automation triggered by specific events (file save, tool use)?
  └─ YES → Use Hooks

Do you need isolated context with custom tool access?
  └─ YES → Use Agent

Do you want auto-triggered knowledge for specific tasks?
  └─ YES → Use Skill

Do you need always-on project rules for all conversations?
  └─ YES → Use CLAUDE.md
```

## Pattern Comparison

### CLAUDE.md

**What**: Project-wide instructions loaded into every conversation.

**Location**: Root of repository (`/CLAUDE.md`)

**When loaded**: Start of every conversation

**Context**: Main conversation (shared with everything)

**Use cases:**

- Project conventions and rules
- Tech stack and architecture overview
- Development workflow instructions
- Coding standards
- File structure explanations

**Advantages:**

- Always available, no activation needed
- Shared context across all tasks
- Simple to create and maintain
- Version controlled with project

**Disadvantages:**

- Adds to every conversation's context
- Cannot be disabled per-task
- No tool restrictions
- No permission control

**Example:**

```markdown
# morph-ui Development Guide

## Tech Stack

- React Native 0.81.5
- TypeScript 5.9.2
- Turborepo monorepo

## Conventions

- Use three-tier theme system for all components
- Never hardcode colors or spacing
- Use Typography component for all text
- Follow Conventional Commits for git messages

## Development Workflow

1. Run `bun run format` before committing
2. Ensure `bun run lint` passes
3. Run `bun run check-types` to verify TypeScript
4. All tests must pass before merging
```

**When to use:**

- Information relevant to ALL tasks
- Project-wide conventions
- Architecture explanations
- Tech stack documentation

**When NOT to use:**

- Task-specific workflows
- Specialized knowledge only some tasks need
- Instructions that should be isolated

### Skills

**What**: Auto-triggered specialized knowledge that runs in main conversation context.

**Location**: `.claude/skills/{skill-name}/SKILL.md`

**When activated**: Claude detects task matches skill description

**Context**: Main conversation (shared context)

**Use cases:**

- Component creation workflows (create-component)
- Code review processes (code-review)
- Documentation syncing (sync-docs)
- Domain-specific knowledge that applies to multiple tasks

**Advantages:**

- Auto-triggered based on user request
- Shares context with main conversation
- Reusable across similar tasks
- Can include detailed documentation via progressive disclosure
- Can restrict tool access

**Disadvantages:**

- Adds to main conversation context
- Cannot isolate verbose output
- Limited permission control
- Context shared (no isolation)

**Example skill:**

```yaml
---
name: create-component
description: Creates React Native components following morph-ui patterns. Use when user asks to "create a component", "make a component", or "build a component".
allowed-tools: Read, Write, Grep, Glob, Task
---

# Creating React Native Components

When creating components for morph-ui:
1. Use three-tier theme system
2. Create Component.tsx, Component.theme.ts, index.ts
3. Use Typography for all text
4. Never hardcode styles
...
```

**When to use:**

- Workflows you want auto-triggered
- Knowledge relevant to multiple similar tasks
- Processes that benefit from main context
- Reusable patterns

**When NOT to use:**

- High-volume output that clutters context
- Operations needing tool restrictions
- Tasks requiring different permission modes
- Simple one-time instructions (use CLAUDE.md)

### Agents

**What**: Isolated AI assistants with custom system prompts, tool access, and permissions.

**Location**: `.claude/agents/{agent-name}/AGENT.md`

**When activated**: Claude delegates based on agent description or explicit user request

**Context**: Isolated (separate context window)

**Use cases:**

- Code review with verbose output
- Test generation
- Database queries with restricted access
- Research tasks that produce lots of results
- Operations requiring specific tool/permission configurations

**Advantages:**

- Complete context isolation
- Custom tool access (whitelist/blacklist)
- Different permission modes
- Can run in background
- Output doesn't clutter main conversation

**Disadvantages:**

- No shared context with main conversation
- More complex setup
- Requires restart to load new agents
- Cannot access main conversation state

**Example agent:**

```yaml
---
name: code-reviewer
description: Reviews code for quality and security. Use after writing or modifying code.
tools: Read, Grep, Glob
model: sonnet
permissionMode: default
---

You are a senior code reviewer ensuring high standards.

When invoked:
1. Run git diff to see changes
2. Review for quality, security, performance
3. Provide prioritized feedback

You cannot modify files, only provide recommendations.
```

**When to use:**

- Verbose operations (tests, logs, reviews)
- Need tool restrictions (read-only, no Bash)
- Different permission modes (auto-accept edits)
- Background operations
- Context isolation important

**When NOT to use:**

- Task benefits from shared context
- Simple, quick operations
- Needs main conversation state

### Hooks

**What**: Scripts triggered by events (tool use, file save, agent start/stop).

**Location**: `.claude/settings.json` or agent frontmatter

**When activated**: Specific events occur

**Context**: Runs outside conversation (subprocess)

**Use cases:**

- Validate operations before execution (PreToolUse)
- Format code after edits (PostToolUse)
- Run tests after file changes
- Update documentation automatically
- Cleanup after agent completes (Stop)

**Advantages:**

- Event-driven automation
- Can block operations (PreToolUse with exit 2)
- Runs for specific tools/patterns
- No context overhead

**Disadvantages:**

- Requires writing scripts
- Debugging can be tricky
- Not conversational
- Limited to event-based triggers

**Example hook:**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/validate-command.sh"
          }
        ]
      }
    ]
  }
}
```

**When to use:**

- Validation before operations
- Automation after actions
- Enforce policies programmatically
- Event-triggered workflows

**When NOT to use:**

- Interactive guidance needed
- Complex decision-making
- Conversational workflows

### MCP (Model Context Protocol)

**What**: Servers that provide external tools and data sources to Claude.

**Location**: Installed as packages, configured in settings

**When activated**: Tools available throughout conversation

**Context**: Tools callable from any context

**Use cases:**

- Database access
- API integrations
- File system operations beyond built-in tools
- External service integration

**Advantages:**

- Connect to external systems
- Reusable across projects
- Standard protocol
- Community ecosystem

**Disadvantages:**

- Requires installation and configuration
- More complex than other patterns
- Security considerations for external access

**Example:**

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"]
    }
  }
}
```

**When to use:**

- Need external tool integration
- Database access required
- API interactions
- Beyond built-in tool capabilities

**When NOT to use:**

- Built-in tools are sufficient
- Don't need external connections
- Complexity not warranted

## Feature Comparison Matrix

| Feature                  | CLAUDE.md | Skills  | Agents | Hooks  | MCP     |
| ------------------------ | --------- | ------- | ------ | ------ | ------- |
| Auto-triggered           | Always    | Yes     | Yes    | Event  | N/A     |
| Context isolation        | No        | No      | Yes    | N/A    | N/A     |
| Tool restrictions        | No        | Yes     | Yes    | N/A    | N/A     |
| Permission control       | No        | Limited | Full   | N/A    | By tool |
| Shares main context      | Yes       | Yes     | No     | N/A    | N/A     |
| Can be disabled          | No        | No      | No     | Yes    | Yes     |
| External integration     | No        | No      | No     | No     | Yes     |
| Version controlled       | Yes       | Yes     | Yes    | Yes    | Config  |
| Setup complexity         | Low       | Low     | Medium | Medium | High    |
| Restart required         | No        | No      | Yes    | No     | Yes     |
| Background execution     | No        | No      | Yes    | Yes    | No      |
| Can block operations     | No        | No      | No     | Yes    | No      |
| Event-driven             | No        | No      | No     | Yes    | No      |
| Progressive disclosure   | No        | Yes     | No     | No     | No      |
| Custom system prompt     | No        | No      | Yes    | N/A    | N/A     |
| Multi-file documentation | No        | Yes     | No     | No     | No      |

## Common Use Cases

### Code Review

**Option 1: Skill**

Use when review is quick and context matters.

```yaml
# .claude/skills/code-review/SKILL.md
---
name: code-review
description: Review code for quality and security
---
```

**Advantages:**

- Shares context with implementation
- Can see recent conversation
- Quick for small reviews

**Disadvantages:**

- Verbose output clutters main conversation
- No tool restrictions

**Option 2: Agent**

Use when review is thorough and verbose.

```yaml
# .claude/agents/code-reviewer/AGENT.md
---
name: code-reviewer
description: Reviews code for quality and security
tools: Read, Grep, Glob
---
```

**Advantages:**

- Isolated context (verbose output separate)
- Read-only (cannot modify files)
- Can run in background

**Disadvantages:**

- No shared context
- More setup required

**Recommendation**: **Agent** for thorough reviews, **Skill** for quick checks.

### Database Queries

**Option 1: Agent with Tool Restrictions**

```yaml
# .claude/agents/db-reader/AGENT.md
---
name: db-reader
description: Execute read-only database queries
tools: Read, Bash
disallowedTools: Write, Edit
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-query.sh"
---
```

**Advantages:**

- Tool restrictions (read-only)
- Hook validates queries
- Isolated context

**Option 2: MCP Database Server**

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"]
    }
  }
}
```

**Advantages:**

- Direct database integration
- Proper connection management
- Reusable across agents/skills

**Recommendation**: **MCP** for production, **Agent** for prototyping.

### Component Creation

**Option 1: Skill with OpenSpec**

```yaml
# .claude/skills/create-component/SKILL.md
---
name: create-component
description: Creates React Native components following patterns
---
```

**Advantages:**

- Auto-triggered on "create component"
- Shares context with conversation
- Can use Task tool for subagents
- Progressive disclosure for detailed docs

**Option 2: Agent**

Less suitable because:

- Needs shared context for understanding
- Not particularly verbose
- Benefits from seeing conversation

**Recommendation**: **Skill** (current pattern in morph-ui).

### Documentation Sync

**Option 1: Skill**

```yaml
# .claude/skills/sync-docs/SKILL.md
---
name: sync-docs
description: Keep documentation files in sync
---
```

**Advantages:**

- Auto-triggered on doc changes
- Shares context (knows what changed)
- Can coordinate multiple files

**Option 2: Hook (PostToolUse)**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/update-docs.sh"
          }
        ]
      }
    ]
  }
}
```

**Advantages:**

- Automatic (no trigger needed)
- Runs after every file change
- Enforces consistency

**Recommendation**: **Skill** for intelligent updates, **Hook** for mechanical updates.

## Migration Patterns

### Skill → Agent

**When to convert:**

- Output becoming too verbose
- Need tool restrictions
- Want context isolation
- Background execution desired

**Example:**

Before (Skill):

```yaml
# .claude/skills/test-runner/SKILL.md
---
name: test-runner
description: Runs tests and reports results
---
```

After (Agent):

```yaml
# .claude/agents/test-runner/AGENT.md
---
name: test-runner
description: Runs tests and reports results
tools: Read, Bash, Grep, Glob
permissionMode: default
---
You are a test runner that executes test suites.
[Keep output isolated from main conversation]
```

### Agent → Skill

**When to convert:**

- Context isolation causing problems
- Output not actually verbose
- Needs shared context
- Quick operations

**Example:**

Before (Agent):

```yaml
# .claude/agents/quick-validator/AGENT.md
---
name: quick-validator
description: Validates code format
tools: Read, Grep
---
```

After (Skill):

```yaml
# .claude/skills/quick-validator/SKILL.md
---
name: quick-validator
description: Validates code format quickly
---
```

### CLAUDE.md → Skills

**When to split:**

- CLAUDE.md becoming too large
- Some instructions only needed sometimes
- Want tool restrictions on certain operations

**Example:**

Before (CLAUDE.md):

```markdown
# Project Instructions

... general instructions ...

## Creating Components

1. Use three-tier theme system
2. Create Component.tsx, Component.theme.ts
   ...
   [20 more lines]
```

After (CLAUDE.md + Skill):

CLAUDE.md:

```markdown
# Project Instructions

... general instructions ...

Use the create-component skill for component creation.
```

Skill:

```yaml
# .claude/skills/create-component/SKILL.md
---
name: create-component
description: Creates React Native components
---
[Full component creation workflow]
```

## Decision Checklist

Use this checklist to choose the right pattern:

**Question 1: Does this need to be available in EVERY conversation?**

- YES → Consider CLAUDE.md
- NO → Continue to Q2

**Question 2: Do you need external tool/data integration?**

- YES → Use MCP
- NO → Continue to Q3

**Question 3: Is this event-driven automation (file save, tool use)?**

- YES → Use Hooks
- NO → Continue to Q4

**Question 4: Does this produce high-volume output?**

- YES → Use Agent
- NO → Continue to Q5

**Question 5: Do you need tool restrictions or custom permissions?**

- YES → Use Agent
- NO → Continue to Q6

**Question 6: Do you want auto-triggered specialized knowledge?**

- YES → Use Skill
- NO → Use CLAUDE.md

## Best Practices

### Combining Patterns

Patterns can work together:

**Example 1: Skill + Agent**

Skill delegates to agent for isolation:

```yaml
# Skill uses Task tool to delegate
Use the code-reviewer agent to analyze with isolated context
```

**Example 2: Agent + Hook**

Agent with validation hook:

```yaml
# Agent with PreToolUse hook
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate.sh"
```

**Example 3: CLAUDE.md + Skills**

CLAUDE.md references skills:

```markdown
# CLAUDE.md

For component creation, use the create-component skill.
For code review, use the code-review skill.
```

**Example 4: Skill + MCP**

Skill uses MCP tools:

```yaml
# Skill with MCP database access
Use mcp__database__query to fetch data
```

### Pattern Selection Strategy

1. **Start simple**: Begin with CLAUDE.md for general instructions
2. **Add skills**: As specialized knowledge grows, extract to skills
3. **Use agents**: When isolation or tool restrictions needed
4. **Add hooks**: For validation and automation
5. **Integrate MCP**: When external systems are needed

### Anti-Patterns

**Don't:**

- Put everything in CLAUDE.md (context bloat)
- Create agents for simple tasks (overhead)
- Use skills for always-needed information (use CLAUDE.md)
- Use hooks for conversational workflows (use skills/agents)
- Build custom tools when MCP servers exist

## Examples by Scenario

### Scenario 1: "I want Claude to follow project conventions"

**Use**: CLAUDE.md

```markdown
# CLAUDE.md

## Conventions

- Use TypeScript strict mode
- Follow three-tier theme system
- Never hardcode values
```

### Scenario 2: "I want Claude to create components following a specific pattern"

**Use**: Skill

```yaml
# .claude/skills/create-component/SKILL.md
---
name: create-component
description: Creates React Native components following patterns
---
```

### Scenario 3: "I want Claude to review code but the output is too verbose"

**Use**: Agent

```yaml
# .claude/agents/code-reviewer/AGENT.md
---
name: code-reviewer
description: Reviews code with isolated context
tools: Read, Grep, Glob
---
```

### Scenario 4: "I want to validate SQL queries are read-only before execution"

**Use**: Agent + Hook

```yaml
# .claude/agents/db-reader/AGENT.md
---
name: db-reader
tools: Read, Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-query.sh"
---
```

### Scenario 5: "I want to format code after every file change"

**Use**: Hook

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bun run format"
          }
        ]
      }
    ]
  }
}
```

### Scenario 6: "I want to connect to a PostgreSQL database"

**Use**: MCP

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://..."
      }
    }
  }
}
```

## Summary

**Quick reference:**

- **Always-on instructions** → CLAUDE.md
- **Auto-triggered workflows** → Skill
- **Isolated, tool-restricted operations** → Agent
- **Event-driven automation** → Hook
- **External integrations** → MCP

**When in doubt:**

1. Start with CLAUDE.md for general info
2. Use Skill for specialized workflows
3. Use Agent when isolation or tool restrictions needed

Choose the simplest pattern that meets your needs.
