# Tool Configuration Guide

Comprehensive guide for configuring tool access and permission modes in custom agents.

## Overview

Tool configuration controls what actions an agent can perform. Proper tool configuration is critical for security, safety, and focused agent behavior.

**Two configuration approaches:**

1. **Whitelist** (`tools`): Explicitly list allowed tools
2. **Blacklist** (`disallowedTools`): Deny specific tools, inherit others

**Three dimensions of access control:**

1. **Tool access** - Which tools can the agent use?
2. **Permission mode** - How does the agent request approval?
3. **Hooks** - Fine-grained validation of specific operations

## Tools vs DisallowedTools

### Whitelist Approach (tools)

Explicitly list tools the agent can use. Agent CANNOT use any other tools.

**Syntax:**

```yaml
tools: Read, Grep, Glob
```

**When to use:**

- Agent should have restricted capabilities
- Security-sensitive operations
- Clear, focused workflow with known tool requirements
- Read-only agents
- You want certainty about what agent can do

**Advantages:**

- Explicit and clear what's allowed
- Safest approach (deny by default)
- Easy to audit permissions
- Prevents privilege creep

**Disadvantages:**

- Less flexible if agent needs unexpected tool
- Requires updating when workflow changes
- May be overly restrictive

**Examples:**

```yaml
# Read-only analysis
tools: Read, Grep, Glob

# Code review with web research
tools: Read, Grep, Glob, WebFetch, WebSearch

# Documentation writer
tools: Read, Write, Edit, Grep, Glob

# Database operations
tools: Read, Bash
```

### Blacklist Approach (disallowedTools)

Deny specific tools, inherit all others from main conversation.

**Syntax:**

```yaml
disallowedTools: Write, Edit, Bash
```

**When to use:**

- Agent needs most tools but with specific restrictions
- Simpler than listing many allowed tools
- You want flexibility but with guardrails
- Preventing specific dangerous operations

**Advantages:**

- More flexible than whitelist
- Simpler when denying few tools
- Agent can adapt to new tools
- Good for general-purpose agents with boundaries

**Disadvantages:**

- Less explicit about capabilities
- New dangerous tools are allowed by default
- Harder to audit complete permission set
- Can accidentally grant unwanted access

**Examples:**

```yaml
# Prevent file modifications
disallowedTools: Write, Edit

# Prevent command execution
disallowedTools: Bash

# Prevent web access
disallowedTools: WebFetch, WebSearch

# Prevent multi-agent orchestration
disallowedTools: Task
```

### Combining Both (Don't Do This)

**If both fields are specified, `tools` takes precedence and `disallowedTools` is ignored.**

**Wrong:**

```yaml
tools: Read, Write, Grep
disallowedTools: Bash # Ignored!
```

**Pick one approach:**

```yaml
# Option 1: Whitelist
tools: Read, Write, Grep

# Option 2: Blacklist
disallowedTools: Bash, Edit
```

### Choosing an Approach

**Use whitelist when:**

- Security is critical
- Agent role is well-defined
- You want explicit control
- Agent is read-only or has limited scope

**Use blacklist when:**

- Agent needs flexibility
- Only blocking a few specific tools
- Listing all allowed tools would be long
- Agent role may evolve

**Default recommendation:** Start with whitelist. It's safer and more explicit.

## Available Tools Reference

Complete catalog of tools available in Claude Code.

### File Operations

**Read**

Read file contents.

**Risk level**: Low
**Common use**: All agents that need to examine code/config
**Restrictions**: None needed

```yaml
tools: Read
```

**Write**

Create new files.

**Risk level**: High
**Common use**: Agents that generate code, tests, documentation
**Restrictions**: Use `acceptEdits` or `default` permission mode

```yaml
tools: Write
permissionMode: default # Or acceptEdits for trusted workflows
```

**Edit**

Modify existing files.

**Risk level**: High
**Common use**: Refactoring agents, code modifiers
**Restrictions**: Use `acceptEdits` or `default` permission mode

```yaml
tools: Edit
permissionMode: default # Or acceptEdits for trusted workflows
```

### Search Operations

**Glob**

Find files by pattern (e.g., `**/*.tsx`).

**Risk level**: Low
**Common use**: All agents that need to discover files
**Restrictions**: None needed

```yaml
tools: Glob
```

**Grep**

Search file contents with regex.

**Risk level**: Low
**Common use**: Agents that search for code patterns
**Restrictions**: None needed

```yaml
tools: Grep
```

### Command Execution

**Bash**

Execute shell commands.

**Risk level**: Very High
**Common use**: Database queries, test runs, builds, git operations
**Restrictions**: Strongly recommend hooks for validation

```yaml
tools: Bash
permissionMode: default
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-command.sh"
```

**Security considerations:**

- Can execute arbitrary commands
- Can modify system state
- Can access sensitive data
- Can create security vulnerabilities

**Safe patterns:**

1. Combine with PreToolUse hook for command validation
2. Use `default` permission mode (user approval required)
3. Document expected command patterns in system prompt
4. Consider read-only alternatives when possible

### Web Operations

**WebFetch**

Fetch content from URLs.

**Risk level**: Medium
**Common use**: Research agents, documentation fetchers
**Restrictions**: Consider domain restrictions via hooks

```yaml
tools: WebFetch
```

**WebSearch**

Search the web.

**Risk level**: Medium
**Common use**: Research agents, problem solvers
**Restrictions**: Consider rate limiting

```yaml
tools: WebSearch
```

**Security considerations:**

- Can access external content
- May expose internal context in queries
- Subject to rate limits
- Results may contain untrusted content

### Workflow Operations

**Task**

Delegate to other agents.

**Risk level**: Medium
**Common use**: Orchestration agents, complex workflows
**Restrictions**: Careful with permission propagation

```yaml
tools: Task
```

**Considerations:**

- Subagents inherit permissions from parent
- Can spawn multiple expensive operations
- Harder to predict final behavior
- Useful for divide-and-conquer workflows

**AskUserQuestion**

Ask clarifying questions during execution.

**Risk level**: Low
**Common use**: Agents with ambiguous inputs
**Restrictions**: Don't overuse (annoying)

```yaml
tools: AskUserQuestion
```

**TodoWrite**

Manage task lists.

**Risk level**: Low
**Common use**: Project management agents, workflow trackers
**Restrictions**: None needed

```yaml
tools: TodoWrite
```

### MCP Tools

MCP (Model Context Protocol) tools depend on installed MCP servers.

**Risk level**: Varies by server
**Common use**: Database access, API integration, external services
**Restrictions**: Follow MCP server documentation

**Example:**

```yaml
tools: Read, mcp__database__query, mcp__database__schema
```

**Security considerations:**

- MCP tools can access external systems
- Permissions managed by MCP server
- May have side effects (database writes, API calls)
- Test thoroughly before production use

## Tool Access Patterns by Agent Type

### Read-Only Agents

**Purpose**: Analysis, review, exploration without modifications

**Tools:**

```yaml
tools: Read, Grep, Glob
```

**Examples:**

- Code reviewers
- Security scanners
- Architecture analyzers
- Documentation explorers

**Why this works:**

- Cannot modify files (no Write/Edit)
- Cannot execute commands (no Bash)
- Can search and read comprehensively
- Safe for automated use

### Investigative Agents

**Purpose**: Research, debugging, problem-solving with external data

**Tools:**

```yaml
tools: Read, Grep, Glob, WebFetch, WebSearch
```

**Examples:**

- Debuggers that research error messages
- API researchers
- Documentation aggregators
- Problem solvers

**Why this works:**

- Read-only local access
- Can fetch external documentation
- Can search for known issues
- No local modifications

### Implementation Agents

**Purpose**: Create and modify code, tests, documentation

**Tools:**

```yaml
tools: Read, Write, Edit, Grep, Glob
```

**Permission mode:**

```yaml
permissionMode: default # Or acceptEdits for trusted workflows
```

**Examples:**

- Test generators
- Documentation writers
- Code generators
- Refactoring agents

**Why this works:**

- Can create new files (Write)
- Can modify existing files (Edit)
- Can search and read for context
- Permission mode controls approval

### Database Agents

**Purpose**: Query and analyze data, read-only access

**Tools:**

```yaml
tools: Read, Bash
disallowedTools: Write, Edit
```

**Hooks:**

```yaml
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
```

**Examples:**

- Database query runners
- Data analysts
- Report generators

**Why this works:**

- Bash for running SQL queries
- Explicitly deny Write/Edit
- Hook validates queries are read-only
- Safe data access pattern

### Orchestration Agents

**Purpose**: Coordinate multiple agents for complex workflows

**Tools:**

```yaml
tools: Read, Task, AskUserQuestion, TodoWrite
```

**Examples:**

- Workflow coordinators
- Multi-step process managers
- Project planners

**Why this works:**

- Read for understanding context
- Task for delegating to specialized agents
- AskUserQuestion for clarifications
- TodoWrite for tracking progress
- No direct modifications (delegates that)

## Permission Modes

Permission modes control how agents request and handle approvals.

### default (Recommended)

Standard permission checking with user prompts.

**Behavior:**

- User prompted for each sensitive operation
- Clear what agent wants to do
- Can approve, deny, or modify

**When to use:**

- Most agents (safest default)
- Sensitive operations (file changes, command execution)
- First time testing an agent
- User wants control

**Example:**

```yaml
permissionMode: default
```

### acceptEdits

Auto-accept file edit operations. Other permissions still prompt.

**Behavior:**

- File edits (Write/Edit) approved automatically
- Other operations still prompt
- Faster for trusted file operations

**When to use:**

- Documentation writers
- Test generators
- Code formatters
- Trusted file modification workflows

**Warning:** Agent can modify files without confirmation.

**Example:**

```yaml
tools: Read, Write, Edit, Grep, Glob
permissionMode: acceptEdits
```

**Safety requirements:**

- Agent has clear, focused purpose
- System prompt defines constraints
- Tool access is appropriate
- You trust the agent's behavior

### dontAsk

Auto-deny permission prompts. Only explicitly allowed tools work.

**Behavior:**

- Never prompts user
- Denied operations fail silently or with error
- Only pre-allowed operations succeed

**When to use:**

- Background agents
- Read-only agents with no user interaction
- Automated workflows
- Agents with explicit tool allowlist

**Example:**

```yaml
tools: Read, Grep, Glob
permissionMode: dontAsk
```

**Requirements:**

- Must specify `tools` field (whitelist)
- Agent doesn't need user decisions
- Failures are acceptable

### bypassPermissions

Skip ALL permission checks. Extremely dangerous.

**Behavior:**

- No prompts whatsoever
- All operations execute immediately
- User has zero visibility or control

**When to use:**

- Almost never in production
- Automated CI/CD (with extreme caution)
- Fully trusted agents in controlled environments
- You've tested exhaustively with `default` first

**Warning:** Agent can execute ANY operation without approval. Use only when you fully trust the agent.

**Example:**

```yaml
tools: Read, Write, Bash
permissionMode: bypassPermissions
```

**Safety requirements:**

- Extensive testing with `default` mode first
- Clear, well-defined system prompt with constraints
- Limited tool access (whitelist)
- Monitoring and logging in place
- Rollback plan if things go wrong
- Documentation of why this mode is needed

### plan

Plan mode with read-only exploration.

**Behavior:**

- Read-only operations
- No modifications allowed
- Good for research and planning

**When to use:**

- Planning agents
- Research agents
- Architecture analyzers

**Example:**

```yaml
permissionMode: plan
```

## Security Considerations

### Risk Levels by Tool

**Low risk:**

- Read, Grep, Glob
- WebFetch, WebSearch (medium in sensitive environments)

**Medium risk:**

- Task (spawns other agents)
- AskUserQuestion (interrupts user)
- TodoWrite (modifies UI state)

**High risk:**

- Write, Edit (modifies files)
- Bash (executes commands)
- MCP tools (depends on server)

### Defense in Depth

Use multiple layers of security:

**Layer 1: Tool Access**

```yaml
tools: Read, Bash # Whitelist
```

**Layer 2: Blacklist**

```yaml
disallowedTools: Write, Edit # Extra safety
```

**Layer 3: Permission Mode**

```yaml
permissionMode: default # User approval
```

**Layer 4: Hooks**

```yaml
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate.sh"
```

**Layer 5: System Prompt**

```markdown
You are a read-only analyst. You CANNOT modify files or execute
destructive commands. If asked to do so, explain your limitations.
```

### Safe Patterns by Security Level

**Maximum Security (Production)**

```yaml
tools: Read, Grep, Glob
permissionMode: default
```

**High Security (Sensitive Operations)**

```yaml
tools: Read, Write, Grep, Glob
permissionMode: default
hooks:
  PreToolUse:
    - matcher: "Write"
      hooks:
        - type: command
          command: "./scripts/validate-write.sh"
```

**Medium Security (Trusted Workflows)**

```yaml
tools: Read, Write, Edit, Grep, Glob
permissionMode: acceptEdits
```

**Low Security (Controlled Environments)**

```yaml
tools: Read, Write, Edit, Bash, Grep, Glob
permissionMode: default
```

### Common Security Mistakes

**Mistake 1: Too permissive by default**

**Wrong:**

```yaml
# No tool restrictions = agent inherits everything
permissionMode: acceptEdits # And auto-accepts!
```

**Fix:**

```yaml
tools: Read, Write, Grep, Glob
permissionMode: default
```

**Mistake 2: Bash without validation**

**Wrong:**

```yaml
tools: Bash
permissionMode: acceptEdits
```

**Fix:**

```yaml
tools: Bash
permissionMode: default
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-command.sh"
```

**Mistake 3: bypassPermissions without reason**

**Wrong:**

```yaml
permissionMode: bypassPermissions
# Why is this needed? Is it safe?
```

**Fix:**

```yaml
permissionMode: default
# Use bypass only after extensive testing and with clear justification
```

**Mistake 4: Read-only agent with write tools**

**Wrong:**

```yaml
name: code-reviewer
description: Reviews code (read-only)
# No tool restrictions - can modify files!
```

**Fix:**

```yaml
name: code-reviewer
description: Reviews code (read-only)
tools: Read, Grep, Glob
```

## Common Mistakes and Fixes

### Too Restrictive

**Problem**: Agent can't perform its task due to missing tools.

**Symptom**: Agent reports "I don't have access to the X tool" or operations fail silently.

**Wrong:**

```yaml
name: test-generator
tools: Read, Grep # Missing Write! Can't create tests
```

**Fix:**

```yaml
name: test-generator
tools: Read, Write, Grep, Glob
```

### Too Permissive

**Problem**: Agent has unnecessary capabilities, security risk.

**Symptom**: Agent can do things it shouldn't (modify files when read-only, execute commands when analyzing).

**Wrong:**

```yaml
name: code-reviewer
description: Reviews code (read-only)
# No tool restrictions - can modify files!
```

**Fix:**

```yaml
name: code-reviewer
tools: Read, Grep, Glob
```

### Wrong Permission Mode

**Problem**: Permission mode doesn't match agent's trust level.

**Symptom**: Too many prompts (annoying) or too few prompts (risky).

**Wrong:**

```yaml
name: db-query-runner
permissionMode: bypassPermissions # Way too permissive!
```

**Fix:**

```yaml
name: db-query-runner
tools: Read, Bash
permissionMode: default
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-query.sh"
```

### Missing Tool for Critical Operation

**Problem**: Workflow requires tool not in allowlist.

**Symptom**: Agent can't complete tasks, reports missing access.

**Wrong:**

```yaml
name: debugger
description: Investigates issues and suggests fixes
tools: Read, Grep, Glob
# Missing WebSearch - can't research errors online!
```

**Fix:**

```yaml
name: debugger
tools: Read, Grep, Glob, WebSearch
```

## Configuration Examples

### Example 1: Secure Code Reviewer

```yaml
---
name: code-reviewer
description: Reviews code for quality and security
tools: Read, Grep, Glob
model: sonnet
permissionMode: default
---
```

**Security analysis:**

- ✅ Read-only (no Write/Edit)
- ✅ No command execution (no Bash)
- ✅ Default permission mode (safest)
- ✅ Appropriate for code review

### Example 2: Documentation Writer

```yaml
---
name: doc-writer
description: Creates and updates documentation
tools: Read, Write, Edit, Grep, Glob
model: sonnet
permissionMode: acceptEdits
---
```

**Security analysis:**

- ✅ Can modify files (appropriate for docs)
- ✅ acceptEdits mode (trusted workflow)
- ⚠️ Consider `default` for first use, switch to `acceptEdits` after trust established

### Example 3: Database Reader

```yaml
---
name: db-reader
description: Execute read-only database queries
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

**Security analysis:**

- ✅ Bash access (needed for queries)
- ✅ Explicitly denies Write/Edit (defense in depth)
- ✅ PreToolUse hook validates queries
- ✅ Default permission mode (user reviews)
- ✅ Multiple security layers

### Example 4: Test Generator

```yaml
---
name: test-generator
description: Generates comprehensive test cases
tools: Read, Write, Grep, Glob
model: sonnet
permissionMode: acceptEdits
skills: create-component
---
```

**Security analysis:**

- ✅ Can create files (appropriate for tests)
- ✅ No Edit (only creates new files)
- ✅ No Bash (doesn't run tests)
- ✅ acceptEdits mode (streamlines creation)
- ✅ Loads skill for project patterns

## Tool Configuration Checklist

Before finalizing tool configuration, verify:

**Security:**

- [ ] Tool access matches agent's stated purpose
- [ ] Read-only agents lack Write/Edit tools
- [ ] Bash access has appropriate guardrails (hooks or prompts)
- [ ] Permission mode matches trust level
- [ ] High-risk operations have user approval

**Functionality:**

- [ ] Agent has all tools needed for its task
- [ ] No missing tools that would block workflow
- [ ] Tool combination makes sense for agent type
- [ ] MCP tools (if any) are properly configured

**Best Practices:**

- [ ] Used whitelist approach for security-sensitive agents
- [ ] Used blacklist only when appropriate
- [ ] Not using both tools and disallowedTools
- [ ] Permission mode documented and justified
- [ ] Hooks configured if using Bash

**Testing:**

- [ ] Tested with `default` permission mode first
- [ ] Verified tool restrictions work
- [ ] Confirmed agent can complete its tasks
- [ ] Validated hooks (if any) block inappropriate operations

## Next Steps

After configuring tool access:

1. Write the system prompt with clear constraints
2. Test agent with sample tasks
3. Verify tool restrictions work as expected
4. Monitor agent behavior in real usage
5. Iterate based on security and functionality needs
6. Document successful patterns for future agents
