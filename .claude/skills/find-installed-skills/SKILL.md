---
name: find-installed-skills
description: Searches installed project skills using semantic search. Use when user asks "what skills do I have", "find a skill for X", "is there a skill that can help with X", or when you need to discover relevant skills dynamically.
---

# Find Installed Skills

This skill queries the semantic FAISS index to find relevant installed skills.

## When to Use

- User asks "what skills are available"
- User asks "find a skill for X"
- User asks "is there a skill for X"
- You need to find specialized knowledge for a task
- You're unsure which skill might help with a request

## How to Search

Run the semantic search script:

```bash
echo '{"prompt":"YOUR_SEARCH_QUERY"}' | \
  CLAUDE_PROJECT_DIR=/Users/jaksamalisic/morph-ui \
  npx tsx "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-activation-prompt.ts"
```

Replace `YOUR_SEARCH_QUERY` with what you're looking for. Examples:

| Query                    | Finds                                 |
| ------------------------ | ------------------------------------- |
| "create a new component" | spec-component, develop-component     |
| "write tests"            | react-native-testing, jest-typescript |
| "upgrade expo"           | upgrading-expo                        |
| "review code"            | code-review                           |
| "accessibility"          | Accessibility Engineer                |

## Interpreting Results

The script outputs matching skills with similarity scores:

- Higher similarity (closer to 1.0) = better match
- Skills below threshold are filtered out
- Top 5 skills maximum are shown

## After Finding Skills

Once you identify relevant skills, use the Skill tool to load them:

```
Skill tool with skill="skill-name"
```

Then proceed with the user's request using the loaded skill knowledge.

## Listing All Skills

To see all indexed skills, check the docstore:

```bash
cat "$CLAUDE_PROJECT_DIR/.claude/hooks/skills.faiss/docstore.json" | jq '.[] | .metadata.skillName'
```
