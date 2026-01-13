---
name: create-agent
description: Creates custom subagents for Claude Code with isolated contexts, custom system prompts, and tool restrictions. Use when user asks to "create an agent", "make a subagent", "build an agent", "create a custom agent", or mentions agent creation, subagents, isolated contexts, or agent architecture.
allowed-tools: Read, Write, Glob, Grep
---

# Creating Custom Agents

## Overview

Custom agents (subagents) are specialized AI assistants that run in isolated contexts with their own system prompts, tool access restrictions, and permission modes. Unlike Skills, which run in the main conversation context, agents provide complete context isolation and fine-grained control over capabilities.

**Agents are stored in `.claude/agents/` within this project.**

**When to use Agents vs other patterns:**

- **Agents**: Isolated context, custom tools, separate permissions, high-volume output
- **Skills**: Auto-triggered knowledge in main context, reusable workflows
- **CLAUDE.md**: Always-on project rules, loaded in every conversation
- **Hooks**: Event-triggered automation (file save, tool execution)
- **MCP**: External tool and data source integration

See [agent-vs-skill.md](references/agent-vs-skill.md) for a comprehensive decision guide.

**Key benefits of agents:**

- Preserve main conversation context by isolating verbose operations
- Enforce strict tool and permission constraints for safety
- Run specialized workflows with custom system prompts
- Manage different permission contexts for sensitive operations

## Quick Start

Creating a custom agent involves five steps:

1. **Identify the need** - Determine if an agent is the right pattern
2. **Interactive Q&A** - Answer 9 questions about the agent's purpose and configuration
3. **Generate system prompt** - Craft an effective prompt that defines the agent's behavior
4. **Configure tools and permissions** - Set up appropriate access restrictions
5. **Create and test** - Generate the agent file and verify it works

The workflow below guides you through each step with examples and best practices.

## Agent Creation Workflow

### Step 1: Identify Agent Need

Before creating an agent, confirm this is the right extensibility pattern:

**Use an agent when you need:**

- Isolated context to keep verbose output separate (test runs, logs, documentation)
- Strict tool restrictions (read-only, no Bash, specific MCP tools only)
- Different permission modes (auto-accept edits, auto-deny prompts)
- Specialized workflows that don't fit the main conversation

**Consider Skills instead when:**

- You want auto-triggered knowledge in the main conversation
- The task benefits from shared context with other operations
- You don't need tool restrictions or permission isolation

**Consider CLAUDE.md instead when:**

- You need always-on project rules loaded in every conversation
- The guidance applies broadly across all tasks

See [agent-vs-skill.md](references/agent-vs-skill.md) for detailed comparison.

### Step 2: Interactive Q&A

When creating an agent, I'll ask you nine questions to gather requirements:

**Q1: What should your agent do?**
Free-text description of the agent's purpose and capabilities.

**Q2: Should this agent modify files?**
Yes/No. Determines if Write/Edit tools are needed.

**Q3: Does this agent need to research or fetch external data?**
Yes/No. Determines if WebFetch/WebSearch tools are needed.

**Q4: Should this agent delegate to other agents?**
Yes/No. Determines if Task tool is needed for orchestration.

**Q5: What tools should this agent have?**
Based on Q2-Q4, I'll present a curated tool list. You can customize.

**Q6: What should the system prompt emphasize?**
Free text describing the agent's role, constraints, and workflow.

**Q7: What permission mode?**

- `default`: Standard permission checking with prompts
- `acceptEdits`: Auto-accept file edits (use for documentation writers, test generators)
- `dontAsk`: Auto-deny permission prompts (use with explicit tool allowlist)

**Q8: Should this agent use any Skills?**
Yes/No. If yes, which skills should be loaded into the agent's context?

**Q9: Override model, or inherit from conversation?**

- `sonnet`: Default, balanced capability
- `opus`: Maximum capability for complex reasoning
- `haiku`: Fast, low-cost for simple tasks
- `inherit`: Use same model as main conversation

After gathering answers, I'll confirm my understanding and generate the agent file.

### Step 3: Generate System Prompt

The system prompt defines the agent's identity, constraints, workflow, and output format. A well-crafted prompt ensures the agent behaves consistently and safely.

**Effective prompts include:**

- **Identity**: "You are a [role] specializing in [domain]..."
- **Constraints**: "You can/cannot..."
- **Workflow**: "When invoked: 1. ... 2. ... 3. ..."
- **Output Format**: "Provide results as..."
- **Error Handling**: "If blocked, explain why..."

**Example structure:**

```markdown
You are a senior code reviewer specializing in security and best practices.

When invoked:

1. Run git diff to see recent changes
2. Focus on modified files only
3. Begin review immediately

Review for:

- Security vulnerabilities (SQL injection, XSS, exposed secrets)
- Code quality (naming, duplication, complexity)
- Error handling and edge cases
- Performance considerations

Provide feedback organized by priority:

- Critical (must fix)
- Warnings (should fix)
- Suggestions (consider improving)
```

See [system-prompts.md](references/system-prompts.md) for patterns, anti-patterns, and detailed examples.

### Step 4: Configure Tools & Permissions

Tool access and permission modes control what the agent can do and how it requests approval.

**Tool configuration approaches:**

- **Whitelist** (`tools: [Read, Grep, Glob]`): Explicitly allow specific tools
- **Blacklist** (`disallowedTools: [Write, Edit]`): Deny specific tools, allow others
- **Inherit**: Omit both fields to inherit all tools from main conversation

**Common tool patterns:**

- **Read-only agents**: `tools: [Read, Grep, Glob]`
- **Investigative agents**: `tools: [Read, Grep, Glob, WebFetch, WebSearch]`
- **Implementation agents**: `tools: [Read, Write, Grep, Glob]`
- **Database agents**: `tools: [Read, Bash]` + PreToolUse hook for query validation

**Permission modes:**

- **default**: Standard permission checking (safest)
- **acceptEdits**: Auto-accept file edits (use for trusted operations like documentation)
- **dontAsk**: Auto-deny prompts (use with explicit tool allowlist)
- **bypassPermissions**: Skip all checks (dangerous, use sparingly)
- **plan**: Plan mode, read-only exploration

See [tool-configuration.md](references/tool-configuration.md) for comprehensive tool reference and security patterns.

### Step 5: Create Agent File

Based on your answers, I'll generate an agent file at `.claude/agents/{name}/AGENT.md`:

```markdown
---
name: agent-name
description: What this agent does and when to use it
tools: Read, Grep, Glob
model: sonnet
permissionMode: default
---

[System prompt content here]
```

The file structure:

- **YAML frontmatter**: Agent configuration
- **Markdown body**: System prompt that guides agent behavior

### Step 6: Test & Verify

After creating the agent:

1. **Restart Claude Code** to load the new agent
2. **Verify it appears** in `/agents` command output
3. **Test invocation** by asking Claude to use the agent
4. **Verify behavior** matches your expectations
5. **Check tool restrictions** are enforced
6. **Iterate if needed** by editing the agent file

**Test invocation examples:**

```
Use the code-reviewer agent to analyze recent changes
Have the security-scanner agent check for vulnerabilities
Run the test-generator agent on the authentication module
```

## Agent Structure

Agents are Markdown files with YAML frontmatter stored in `.claude/agents/{name}/AGENT.md`.

**File location:**

```
.claude/agents/
├── code-reviewer/
│   └── AGENT.md
├── security-scanner/
│   └── AGENT.md
└── test-generator/
    └── AGENT.md
```

**YAML frontmatter fields:**

**Required:**

- `name`: Agent identifier (kebab-case, matches directory name)
- `description`: When Claude should delegate to this agent (include trigger phrases)

**Optional:**

- `tools`: Whitelist of allowed tools (comma-separated)
- `disallowedTools`: Blacklist of denied tools (comma-separated)
- `model`: Model override (sonnet/opus/haiku/inherit)
- `permissionMode`: Permission handling (default/acceptEdits/dontAsk/bypassPermissions/plan)
- `skills`: Skills to load into agent context (comma-separated)
- `hooks`: Lifecycle hooks (PreToolUse, PostToolUse, Stop)

See [yaml-fields.md](references/yaml-fields.md) for complete field reference with examples.

## Testing Your Agent

After creating an agent file, verify it works correctly:

**1. Restart Claude Code**

Agents are loaded at session start. Restart to load new agents.

**2. Verify agent is available**

Run `/agents` command or ask: "What agents are available?"

**3. Test invocation**

Ask Claude to use your agent with a test task:

```
Use the [agent-name] agent to [test task]
```

**4. Verify tool restrictions**

Confirm the agent respects tool access rules. If it's read-only, it shouldn't modify files.

**5. Check system prompt**

Verify the agent follows the workflow and constraints defined in the system prompt.

**6. Iterate as needed**

Edit the agent file to refine configuration, system prompt, or tool access.

## Best Practices

**Safety first:**

- Use restrictive tool access by default (whitelist approach)
- Read-only agents should never have Write/Edit tools
- High-risk operations need `default` permission mode (prompts for approval)
- Test agents with non-critical operations first

**Specificity matters:**

- Write detailed system prompts with clear workflows
- Include explicit constraints and error handling
- Define output format expectations
- Add trigger phrases to description field

**Test thoroughly:**

- Verify tool restrictions work as expected
- Test edge cases and error scenarios
- Confirm permission mode behaves correctly
- Iterate based on real usage

**Progressive refinement:**

- Start with restrictive permissions, expand as needed
- Monitor agent behavior and adjust system prompt
- Collect feedback from actual usage
- Document successful patterns for future agents

## Inline Examples

### Example 1: Read-Only Code Reviewer

An agent that reviews code without modifying files.

```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and best practices. Use proactively after writing or modifying code.
tools: Read, Grep, Glob
model: inherit
permissionMode: default
---

You are a senior code reviewer ensuring high standards of code quality and security.

When invoked:

1. Run git diff to see recent changes
2. Focus on modified files
3. Begin review immediately

Review checklist:

- Code clarity and readability
- Proper naming conventions
- No code duplication
- Proper error handling
- No exposed secrets or API keys
- Input validation implemented
- Good test coverage
- Performance considerations

Provide feedback organized by priority:

- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)

Include specific examples of how to fix issues.
```

**Why this works:**

- **Read-only tools** prevent accidental modifications
- **Clear workflow** (run diff, focus on changes, begin immediately)
- **Explicit checklist** ensures consistent reviews
- **Prioritized output** helps focus on critical issues
- **Inherits model** for consistency with main conversation

### Example 2: Debugger with Web Access

An agent that investigates issues and researches solutions online.

```markdown
---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.
tools: Read, Grep, Glob, WebFetch, WebSearch
model: sonnet
permissionMode: default
---

You are an expert debugger specializing in root cause analysis.

When invoked:

1. Capture error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location
4. Research similar issues online if needed
5. Propose minimal fix

Debugging process:

- Analyze error messages and logs
- Check recent code changes
- Form and test hypotheses
- Search for known issues online
- Inspect variable states

For each issue, provide:

- Root cause explanation
- Evidence supporting the diagnosis
- Specific code fix recommendation
- Testing approach
- Prevention recommendations

Focus on fixing the underlying issue, not symptoms.
```

**Why this works:**

- **Web access tools** allow researching known issues and solutions
- **Sonnet model** provides strong analytical reasoning
- **Clear process** from diagnosis to solution
- **Read-only** prevents making changes (only suggests fixes)
- **Default permissions** prompts for any sensitive operations

## Quality Checklist

Before marking agent creation complete, verify:

**File Structure:**

- [ ] AGENT.md exists in `.claude/agents/{name}/`
- [ ] Directory name matches agent name field
- [ ] Valid YAML frontmatter with proper syntax
- [ ] All required fields present (name, description)

**YAML Configuration:**

- [ ] Name is kebab-case format
- [ ] Description clearly explains purpose with trigger phrases
- [ ] Tools appropriate for agent role (read-only agents lack Write/Edit)
- [ ] Permission mode matches safety requirements
- [ ] Model choice appropriate (haiku for speed, sonnet for capability)

**System Prompt:**

- [ ] Clear role definition ("You are a...")
- [ ] Explicit constraints ("You can/cannot...")
- [ ] Defined workflow ("When invoked: 1. ... 2. ...")
- [ ] Output format specified
- [ ] Error handling instructions included

**Safety:**

- [ ] Tools match stated capabilities
- [ ] Read-only agents use restrictive tool list
- [ ] Destructive tools use appropriate permission mode
- [ ] High-risk operations have proper guardrails

**Testing:**

- [ ] Agent loads without errors after restart
- [ ] Agent appears in `/agents` command output
- [ ] Agent responds to test invocation
- [ ] Agent follows tool restrictions correctly
- [ ] Agent follows system prompt instructions

## Reference Documentation

For comprehensive guidance on specific topics, see these reference files:

**[yaml-fields.md](references/yaml-fields.md)** - Complete YAML field reference
Detailed documentation of all frontmatter fields with syntax rules, validation, examples, and common mistakes.

**[agent-vs-skill.md](references/agent-vs-skill.md)** - Pattern decision guide
When to use Agents vs Skills vs CLAUDE.md vs Hooks vs MCP. Includes decision tree, comparison matrix, and migration patterns.

**[system-prompts.md](references/system-prompts.md)** - Writing effective prompts
Prompt patterns, anti-patterns, testing strategies, and 10+ examples with detailed analysis.

**[tool-configuration.md](references/tool-configuration.md)** - Tool access & security
Complete tool catalog, access patterns by agent type, permission modes, security considerations, and common mistakes.

**[examples.md](references/examples.md)** - Production-ready examples
Six complete agent examples with full AGENT.md files, design analysis, testing instructions, and customization tips.

## Next Steps

After creating your first agent:

1. **Test thoroughly** with real tasks
2. **Gather feedback** on agent behavior
3. **Refine system prompt** based on usage
4. **Share patterns** that work well
5. **Document learnings** for future agents
6. **Consider Skills** for workflows that don't need isolation
