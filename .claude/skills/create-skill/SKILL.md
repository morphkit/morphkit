---
name: create-skill
description: Creates Agent Skills following Anthropic best practices. Use when the user asks to "create a skill", "write a skill", "make a new skill", "build a skill", or mentions skill creation, SKILL.md files, agent skills, or skill development.
allowed-tools: Read, Write, Glob, Grep, Bash
---

# Creating Agent Skills

## Overview

Agent Skills teach Claude how to perform specialized tasks automatically. This skill helps you create new skills following Anthropic's official best practices.

Skills are **model-invoked**: Claude decides when to use them based on your request matching their description. You don't need to explicitly call a skill.

## Quick Start

To create a new skill:

1. **Create skill directory**: `.claude/skills/skill-name/` (project) or `~/.claude/skills/skill-name/` (personal)
2. **Write SKILL.md** with YAML frontmatter containing name and description
3. **Add supporting files** in `references/` or `scripts/` if needed (optional)
4. **Restart Claude Code** to load the new skill
5. **Test activation** by asking Claude something that matches your skill's description

## When to Use Skills

Use Skills when you want Claude to **automatically apply specialized knowledge** based on the context of your request.

**Good use cases for Skills**:

- ✅ Review PRs using your team's coding standards
- ✅ Generate commit messages in your preferred format
- ✅ Query databases using your schema and conventions
- ✅ Explain code with diagrams and analogies
- ✅ Fill out PDF forms following specific procedures
- ✅ Validate data against domain rules

**Don't use Skills when**:

- ❌ You need explicit invocation → Use **slash commands** instead
- ❌ You want always-on project rules → Use **CLAUDE.md** instead
- ❌ You need isolated context with different tools → Use **subagents** instead
- ❌ You need event-triggered automation → Use **hooks** instead
- ❌ You need to connect external tools/data → Use **MCP servers** instead

**Skills vs other options**:

- **Skills**: Auto-triggered specialized knowledge
- **Slash commands**: User types `/command` to run
- **CLAUDE.md**: Loaded into every conversation
- **Subagents**: Separate context, different tool access
- **Hooks**: Run on tool events (file save, etc.)
- **MCP**: Provide external tools and data sources

## Skill Structure

### Required: SKILL.md with YAML Frontmatter

Every skill needs a `SKILL.md` file with YAML metadata at the top:

```yaml
---
name: skill-name
description: What this skill does and when to use it. Include trigger phrases users would say.
---

# Skill Name

## Overview
Brief explanation of what this skill does.

## Instructions
Step-by-step guidance for Claude to follow.

## Examples
Concrete usage examples showing how to apply this skill.
```

**File naming**: The file MUST be named `SKILL.md` (all caps, case-sensitive).

**Directory naming**: Use kebab-case matching the skill name (e.g., `create-skill/`, `review-pr/`, `generate-commit/`).

### Optional: Supporting Files

For complex skills, use **progressive disclosure** to keep SKILL.md focused:

```
skill-name/
├── SKILL.md              (Overview ~300-500 lines)
├── references/           (Detailed documentation)
│   ├── api-docs.md
│   ├── examples.md
│   └── guidelines.md
└── scripts/              (Executable utilities)
    ├── validate.py
    └── process.sh
```

Link from SKILL.md to references: `See [api-docs.md](references/api-docs.md) for complete API reference.`

**Key principle**: Keep SKILL.md under 500 lines. Move detailed docs, comprehensive examples, and reference material to separate files.

## YAML Frontmatter Fields

### Required Fields

| Field         | Description                | Format                                                       |
| ------------- | -------------------------- | ------------------------------------------------------------ |
| `name`        | Skill identifier           | Lowercase, hyphens only, max 64 chars (e.g., `create-skill`) |
| `description` | What it does + when to use | Max 1024 chars, include trigger phrases                      |

### Optional Fields

| Field           | Description                   | Format                                          |
| --------------- | ----------------------------- | ----------------------------------------------- |
| `allowed-tools` | Restrict tools Claude can use | Comma-separated list (e.g., `Read, Grep, Glob`) |
| `model`         | Override conversation model   | Model ID (e.g., `claude-sonnet-4-5-20250929`)   |

See [yaml-fields.md](references/yaml-fields.md) for comprehensive field documentation.

## Writing Effective Descriptions

The description determines when Claude activates your skill. Make it specific and keyword-rich.

**Good descriptions answer two questions**:

1. **What does this skill do?** - List specific capabilities
2. **When should it be used?** - Include phrases users would naturally say

### Examples

✅ **Good**:

```yaml
description: Generates commit messages from git diffs. Use when writing commits or when user asks to "create a commit message", "commit changes", or "write a commit".
```

✅ **Good**:

```yaml
description: Extracts text and tables from PDF files, fills PDF forms, merges documents. Use when working with PDF files or when user mentions PDFs, forms, or document extraction.
```

❌ **Bad** (too vague):

```yaml
description: Helps with git commits
```

❌ **Bad** (missing triggers):

```yaml
description: PDF processing utility
```

**Tips for writing descriptions**:

- Include specific action verbs (extract, generate, review, validate)
- Add natural trigger phrases in quotes ("create a skill", "review PR")
- Mention key nouns users would say (PDF, commit, database, schema)
- Keep under 1024 characters total

## Progressive Disclosure

Keep SKILL.md focused and scannable by moving detailed content to supporting files.

**What goes in SKILL.md** (~300-500 lines):

- Essential overview and quick start
- Core workflow and instructions
- Basic examples showing the pattern
- Links to detailed references

**What goes in references/** (unlimited):

- Comprehensive API documentation
- Detailed examples and edge cases
- Reference tables and schemas
- In-depth explanations

**What goes in scripts/** (executable code):

- Validation logic
- Data processing utilities
- Helper scripts

**Linking strategy**:

- Link directly from SKILL.md to reference files: `[file.md](references/file.md)`
- Keep references one level deep (don't chain: file A → file B → file C)
- Claude loads references only when the task requires them

See [progressive-disclosure.md](references/progressive-disclosure.md) for detailed patterns.

## Tool Access Control

Use `allowed-tools` to restrict which tools Claude can use when your skill is active.

**Common patterns**:

```yaml
# Read-only skill (analysis, search)
allowed-tools: Read, Grep, Glob

# Implementation skill (creates/edits files)
allowed-tools: Read, Write, Edit, Glob, Grep

# Research skill (needs web access)
allowed-tools: Read, Grep, Glob, WebFetch, WebSearch

# Full access (delegates to other agents)
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task
```

**When to restrict tools**:

- Read-only skills that shouldn't modify files
- Analysis skills with limited scope
- Security-sensitive workflows

**When to allow all tools**:

- Implementation skills that create/modify code
- Skills that delegate to subagents (need Task tool)
- General-purpose skills with broad capabilities

If `allowed-tools` is omitted, the skill doesn't restrict Claude's tool access.

## Skill Locations

Where you save a skill determines who can use it:

| Type           | Path                             | Scope                     |
| -------------- | -------------------------------- | ------------------------- |
| **Project**    | `.claude/skills/skill-name/`     | This repository only      |
| **Personal**   | `~/.claude/skills/skill-name/`   | All your projects         |
| **Plugin**     | `plugin-name/skills/skill-name/` | Users who install plugin  |
| **Enterprise** | See enterprise docs              | All users in organization |

**For this project**: Use `.claude/skills/skill-name/` for team-shared skills.

**Precedence**: If multiple skills have the same name, higher rows win (enterprise > personal > project > plugin).

## Testing Your Skill

After creating a skill, verify it works:

1. **Restart Claude Code** - Exit and relaunch to load new skills
2. **Check it's available** - Ask: "What Skills are available?"
3. **Test activation** - Ask something matching your description's trigger phrases
4. **Verify behavior** - Ensure Claude follows your skill's instructions
5. **Debug if needed** - Run `claude --debug` to see skill loading errors

**Common test queries**:

- For `create-skill`: "Help me create a new skill"
- For `review-pr`: "Review this pull request"
- For `generate-commit`: "Create a commit message"

**Troubleshooting**:

- Skill doesn't appear → Check file path and name (`SKILL.md` exactly)
- Skill doesn't trigger → Add more specific keywords to description
- YAML errors → Verify syntax (spaces not tabs, proper structure)

See [troubleshooting.md](references/troubleshooting.md) for detailed debugging.

## Skill Creation Workflow

Follow these steps to create a new skill:

### 1. Identify the Need

Ask yourself:

- What specialized knowledge should Claude have?
- When would this knowledge be useful?
- Can this be triggered automatically based on user requests?

If yes to all three, create a skill.

### 2. Choose Location

Decide where the skill should live:

- **Project**: `.claude/skills/` - Team-shared, repo-specific
- **Personal**: `~/.claude/skills/` - Your workflows, all projects

### 3. Create Directory Structure

```bash
mkdir -p .claude/skills/skill-name/references
# or
mkdir -p ~/.claude/skills/skill-name/references
```

### 4. Write SKILL.md

Start with the YAML frontmatter:

```yaml
---
name: skill-name
description: Specific description with trigger phrases users would say.
allowed-tools: Read, Write, Grep, Glob # Optional, adjust as needed
---
```

Then add the markdown content:

- Overview section
- Instructions for Claude
- Examples showing usage
- Links to references (if using progressive disclosure)

Keep under 500 lines total.

### 5. Add Supporting Files (Optional)

If your skill needs detailed documentation:

```bash
# Create reference files
touch .claude/skills/skill-name/references/examples.md
touch .claude/skills/skill-name/references/api-docs.md

# Create scripts (make executable)
touch .claude/skills/skill-name/scripts/helper.py
chmod +x .claude/skills/skill-name/scripts/helper.py
```

Link from SKILL.md using relative paths.

### 6. Test and Iterate

1. Restart Claude Code
2. Verify skill appears in "What Skills are available?"
3. Test with trigger phrases
4. Refine description if it doesn't activate properly
5. Adjust instructions if Claude doesn't follow them correctly

## Examples

See [examples.md](references/examples.md) for complete working examples:

1. **Minimal single-file skill** - Just SKILL.md, simple use case
2. **Multi-file skill with references** - Complex skill with progressive disclosure
3. **Read-only analysis skill** - Using `allowed-tools` restrictions
4. **Implementation skill** - Full Write/Edit capabilities
5. **Plugin skill structure** - Distribution-ready format

## Best Practices

1. **Keep SKILL.md scannable** - Under 500 lines, clear sections, good headings
2. **Use specific trigger phrases** - Include exact words/phrases users would say
3. **Link, don't nest** - Reference files one level deep, no chains
4. **Test with natural language** - Ask Claude like a real user would
5. **Document dependencies** - List required packages, tools, or setup
6. **Version your skills** - Track changes, update descriptions as skills evolve
7. **Start simple** - Begin with single-file skill, add complexity only if needed
8. **Use examples** - Show concrete usage, not just abstract instructions

## Distribution

To share your skill:

**Project skills** (`.claude/skills/`):

- Commit to version control
- Anyone who clones the repo gets the skill
- Good for team workflows

**Personal skills** (`~/.claude/skills/`):

- Keep in personal dotfiles repo
- Share by copying directory
- Good for individual workflows

**Plugin skills**:

- Create plugin with `skills/` directory
- Distribute via plugin marketplace
- Good for public distribution

**Enterprise skills**:

- Use managed settings (see enterprise docs)
- Deploy organization-wide
- Good for company standards

## Next Steps

After creating your first skill:

1. **Test thoroughly** - Verify activation and behavior
2. **Gather feedback** - See how others use it
3. **Iterate on description** - Refine trigger phrases
4. **Add examples** - Document common use cases
5. **Share if useful** - Contribute to plugin marketplace or team repo

For detailed guidance, see:

- [yaml-fields.md](references/yaml-fields.md) - Complete YAML field reference
- [progressive-disclosure.md](references/progressive-disclosure.md) - Multi-file organization
- [examples.md](references/examples.md) - Working skill examples
- [troubleshooting.md](references/troubleshooting.md) - Common issues and fixes
