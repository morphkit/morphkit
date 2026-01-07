# Troubleshooting Agent Skills

This guide covers common issues when creating, loading, and using Agent Skills, along with solutions.

## Skill Doesn't Load

### Symptoms

- Skill doesn't appear when asking "What Skills are available?"
- No error messages
- Skill worked before but stopped loading

### Common Causes and Solutions

#### 1. Incorrect File Path or Name

**Problem**: File not in expected location or wrong filename.

**Check**:

```bash
# Verify file exists at correct path
ls -la .claude/skills/skill-name/SKILL.md
# or for personal skills
ls -la ~/.claude/skills/skill-name/SKILL.md
```

**Requirements**:

- File MUST be named `SKILL.md` (all caps, case-sensitive)
- Must be in `skill-name/` directory
- Directory name should match `name` field in YAML

**Fix**:

```bash
# Wrong
.claude/skills/skill-name.md
.claude/skills/skill-name/skill.md
.claude/skills/skill-name/Skill.md

# Correct
.claude/skills/skill-name/SKILL.md
```

#### 2. YAML Syntax Errors

**Problem**: Invalid YAML prevents skill from loading.

**Check**:

```bash
# Validate YAML syntax
python3 -c "import yaml; yaml.safe_load(open('.claude/skills/skill-name/SKILL.md').read().split('---')[1])"
```

**Common errors**:

```yaml
# ❌ Blank line before opening ---
---
name: skill-name
---
# ❌ Missing closing ---
---
name: skill-name
description: Text
# Markdown starts here (missing ---)

# ❌ Tab instead of spaces
---
name:→skill-name # Tab character
---
# ❌ No space after colon
---
name:skill-name
---
# ❌ Trailing spaces
---
name: skill-name
---
# ✅ Correct
---
name: skill-name
description: Description text here.
---
# Markdown content
```

**Fix**:

- Ensure `---` on line 1 (no blank lines before)
- Ensure closing `---` before markdown
- Use spaces (not tabs) for indentation
- Add space after colons: `name: value`
- Remove trailing spaces

#### 3. Missing Required Fields

**Problem**: YAML missing `name` or `description` fields.

**Check**:

```yaml
# ❌ Missing description
---
name: skill-name
---
# ❌ Missing name
---
description: Some text
---
# ✅ Correct
---
name: skill-name
description: What this does and when to use it.
---
```

**Fix**: Add both required fields.

#### 4. Name Mismatch

**Problem**: Directory name doesn't match `name` field.

**Check**:

```
Directory: .claude/skills/create-skill/
YAML name: create-component  ❌ Mismatch
```

**Fix**: Make them match:

```yaml
# Option 1: Rename directory
mv .claude/skills/create-skill .claude/skills/create-component
# Option 2: Update YAML
---
name: create-skill # Match directory name
---
```

#### 5. File Permissions

**Problem**: File not readable by Claude Code.

**Check**:

```bash
ls -la .claude/skills/skill-name/SKILL.md
# Should show readable permissions (r--) for user
```

**Fix**:

```bash
chmod 644 .claude/skills/skill-name/SKILL.md
```

### Debug Mode

Run Claude Code with debug flag to see loading errors:

```bash
claude --debug
```

Look for skill loading messages and error details.

## Skill Doesn't Trigger

### Symptoms

- Skill appears in "What Skills are available?"
- Skill doesn't activate when expected
- Claude doesn't suggest using the skill

### Common Causes and Solutions

#### 1. Vague Description

**Problem**: Description too generic, doesn't match user requests.

**Example**:

```yaml
# ❌ Too vague
description: Helps with components.

# ❌ No trigger phrases
description: A code generation tool.

# ❌ Missing "when to use"
description: Creates React Native components.
```

**Fix**: Add specific trigger phrases:

```yaml
# ✅ Specific with triggers
description: Creates React Native components with theme support. Use when user asks to "create a component", "make a new component", "add a component", or mentions component creation.
```

#### 2. Missing Trigger Keywords

**Problem**: User says different words than in description.

**User says**: "Help me build a new button"
**Description says**: "create a component"
**Result**: Doesn't match

**Fix**: Include variations:

```yaml
description: Creates React Native components. Use when user asks to "create a component", "make a component", "build a component", "add a component", or mentions creating UI elements, building components, or adding new components.
```

#### 3. Trigger Phrases Not Quoted

**Problem**: Important phrases not highlighted as triggers.

**Less effective**:

```yaml
description: Generates commit messages when writing commits.
```

**More effective**:

```yaml
description: Generates commit messages. Use when user asks to "create a commit", "write a commit message", "commit changes", or mentions committing code.
```

Quoting exact phrases helps Claude recognize them as triggers.

#### 4. Wrong Scope

**Problem**: Description too narrow or too broad.

**Too narrow**:

```yaml
description: Fixes React useState bugs.
# Only triggers for very specific useState bug scenarios
```

**Too broad**:

```yaml
description: Helps with coding.
# Triggers too often, competes with other skills
```

**Balanced**:

```yaml
description: Analyzes React code for common issues including hooks, re-renders, and state management. Use when reviewing React components or debugging React performance.
```

### Testing Triggers

After updating description, test activation:

1. **Restart Claude Code** - Changes require restart
2. **Try exact trigger phrases** - Test quoted phrases first
3. **Try variations** - Test similar phrasings
4. **Try different contexts** - Test in various scenarios

**Example tests**:

```
# For create-component skill
"Create a Button component"        ✅ Should trigger
"Make a new Input component"       ✅ Should trigger
"Add a Card component"             ✅ Should trigger
"Review this component"            ❌ Shouldn't trigger (different purpose)
```

## YAML Parse Errors

### Symptoms

- Error loading skill
- "Invalid YAML" in debug logs
- Skill doesn't appear at all

### Common YAML Mistakes

#### Tab Characters

**Problem**:

```yaml
---
name:→skill-name  # Tab after colon
description:→Text # Tab character
---
```

**Fix**: Use spaces only:

```yaml
---
name: skill-name
description: Text
---
```

**How to check**:

```bash
# Show tabs as visible characters
cat -A .claude/skills/skill-name/SKILL.md | head -20
# Tabs show as ^I
```

#### Missing Spaces After Colons

**Problem**:

```yaml
---
name:skill-name      # No space after colon
description:Text here
---
```

**Fix**:

```yaml
---
name: skill-name # Space after colon
description: Text here
---
```

#### Multi-Line Values

**Problem**: Trying to span multiple lines incorrectly.

```yaml
# ❌ Wrong - line break in value
---
description: This is a long
description that spans multiple lines.
---

# ✅ Correct - single line
---
description: This is a long description that spans multiple lines but is written as one continuous line in YAML.
---

# ✅ Also correct - YAML multi-line string
---
description: >
  This is a long description
  that spans multiple lines
  using YAML's multi-line syntax.
---
```

#### Special Characters

**Problem**: Unescaped special characters in values.

```yaml
# ❌ Problematic - colon in value
---
description: Use when: user asks to create a skill
---

# ✅ Fixed - quote the value
---
description: "Use when: user asks to create a skill"
---
```

### Validation Tools

#### Python YAML Validator

```bash
# Validate YAML syntax
python3 << 'EOF'
import yaml
import sys

try:
    with open('.claude/skills/skill-name/SKILL.md') as f:
        content = f.read()
        frontmatter = content.split('---')[1]
        yaml.safe_load(frontmatter)
    print("✅ YAML is valid")
except yaml.YAMLError as e:
    print(f"❌ YAML error: {e}")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
EOF
```

#### Online Validators

Copy YAML frontmatter (between `---` markers) to:

- [YAML Lint](http://www.yamllint.com/)
- [YAML Checker](https://yamlchecker.com/)

## Tool Restrictions Too Limiting

### Symptoms

- Skill activates but can't complete task
- "Permission denied" or tool access errors
- Skill asks permission for tools frequently

### Problem

`allowed-tools` field doesn't include necessary tools.

### Examples

#### Read-Only Skill Trying to Write

```yaml
# ❌ Can't create files
---
name: create-component
allowed-tools: Read, Grep, Glob # No Write/Edit
---
```

**Error**: Skill tries to create files but doesn't have Write permission.

**Fix**:

```yaml
# ✅ Add required tools
---
name: create-component
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
---
```

#### Missing Task Tool for Delegation

```yaml
# ❌ Can't delegate to subagents
---
name: complex-analyzer
allowed-tools: Read, Grep, Glob # No Task
---
```

**Error**: Skill tries to delegate work but doesn't have Task permission.

**Fix**:

```yaml
# ✅ Add Task tool
---
name: complex-analyzer
allowed-tools: Read, Grep, Glob, Task
---
```

### Finding Required Tools

**Review skill instructions**: What operations does the skill perform?

- Reading files? → `Read, Grep, Glob`
- Creating files? → `Write`
- Modifying files? → `Edit`
- Running commands? → `Bash`
- Delegating to agents? → `Task`
- Fetching web pages? → `WebFetch, WebSearch`

**Test and refine**:

1. Start restrictive
2. Try using the skill
3. Note what tools it needs
4. Add those tools
5. Repeat

## Skill Conflicts

### Symptoms

- Wrong skill activates
- Multiple skills compete
- Unexpected skill behavior

### Causes

#### Overlapping Descriptions

**Problem**: Two skills with similar descriptions.

```yaml
# Skill 1
description: Helps with data analysis.

# Skill 2
description: Analyzes data and generates reports.
```

Both trigger on "analyze data", causing confusion.

**Fix**: Make descriptions distinct:

```yaml
# Skill 1
description: Analyzes sales data in Excel files and CRM exports. Use for "sales analysis", "Excel data", or "CRM reports".

# Skill 2
description: Analyzes log files and system metrics for debugging. Use for "log analysis", "system metrics", or "debug logs".
```

#### Same Name, Different Locations

**Problem**: Skills with same name in different locations.

```
~/.claude/skills/review-code/         (Personal)
.claude/skills/review-code/           (Project)
```

**Precedence**: Enterprise > Personal > Project > Plugin

Higher precedence wins. Project skill won't load if personal skill exists with same name.

**Fix**: Rename one of them:

```bash
# Rename project skill
mv .claude/skills/review-code .claude/skills/review-pr

# Update YAML
---
name: review-pr
---
```

## References Not Loading

### Symptoms

- SKILL.md loads but references don't
- Incomplete information in Claude's responses
- "File not found" when clicking links

### Common Causes

#### Broken Links

**Problem**: Link path incorrect.

```markdown
# ❌ Wrong paths

[reference](api-reference.md) # Missing references/
[reference](./references/api-ref.md) # Wrong filename
[reference](refs/api-reference.md) # Wrong directory
```

**Fix**: Use correct relative paths:

```markdown
# ✅ Correct

[reference](references/api-reference.md)
```

#### File Doesn't Exist

**Problem**: Reference file not created.

```bash
# Check if file exists
ls -la .claude/skills/skill-name/references/
```

**Fix**: Create missing files:

```bash
touch .claude/skills/skill-name/references/api-reference.md
```

#### Circular References

**Problem**: Files reference each other in a loop.

```
SKILL.md → api-reference.md → details.md → api-reference.md
```

**Fix**: Keep references one level deep:

```
SKILL.md → api-reference.md ✅
SKILL.md → details.md ✅
SKILL.md → examples.md ✅

api-reference.md → details.md ❌ (don't chain)
```

## Performance Issues

### Symptoms

- Slow skill activation
- Claude takes long to respond
- Context window fills quickly

### Causes

#### SKILL.md Too Large

**Problem**: Main file exceeds recommended 500 lines.

**Check**:

```bash
wc -l .claude/skills/skill-name/SKILL.md
```

**Fix**: Move content to references:

```bash
# Create reference file
vim .claude/skills/skill-name/references/details.md
# Move detailed content there
# Update SKILL.md with link
```

#### Too Many Small References

**Problem**: Many tiny reference files create overhead.

```
references/
├── method-1.md  (30 lines)
├── method-2.md  (30 lines)
...
├── method-20.md (30 lines)
```

**Fix**: Consolidate related content:

```
references/
├── core-methods.md     (300 lines, methods 1-10)
└── utility-methods.md  (300 lines, methods 11-20)
```

#### Duplicate Content

**Problem**: Same information in SKILL.md and references.

**Fix**:

- SKILL.md: Overview and basic examples
- references/: Detailed documentation

Don't repeat full details in both places.

## Dependencies Missing

### Symptoms

- Skill loads but fails during execution
- "Module not found" errors
- Script execution failures

### Problem

Skill requires external packages not installed.

### Example

```yaml
---
description: Processes PDF files. Requires pypdf and pdfplumber packages.
---
```

User doesn't have pypdf installed → skill fails.

### Solutions

#### Document Requirements Clearly

````yaml
---
name: pdf-processing
description: Extract text, fill forms, merge PDFs. Requires pypdf and pdfplumber packages. Use when working with PDF files.
---

# PDF Processing

## Requirements

Install required packages:
```bash
pip install pypdf pdfplumber
````

## Usage

...

````

#### Check Dependencies

Add verification step:
```markdown
## Before Using This Skill

Verify dependencies are installed:
```bash
python3 -c "import pypdf, pdfplumber; print('✅ Dependencies installed')"
````

If you see errors, install missing packages:

```bash
pip install pypdf pdfplumber
```

````

#### Graceful Degradation

```python
# In scripts, check for dependencies
try:
    import pypdf
    HAS_PYPDF = True
except ImportError:
    HAS_PYPDF = False
    print("Warning: pypdf not installed. Some features unavailable.")
````

## Debug Checklist

When troubleshooting any skill issue, go through this checklist:

### File Structure

- [ ] File named exactly `SKILL.md` (case-sensitive)
- [ ] Located in `.claude/skills/skill-name/` or `~/.claude/skills/skill-name/`
- [ ] Directory name matches YAML `name` field
- [ ] File is readable (`chmod 644`)

### YAML Frontmatter

- [ ] Starts with `---` on line 1 (no blank lines before)
- [ ] Ends with `---` before markdown
- [ ] Uses spaces (not tabs) for indentation
- [ ] Space after every colon: `name: value`
- [ ] No trailing spaces
- [ ] `name` field present (kebab-case, max 64 chars)
- [ ] `description` field present (max 1024 chars)
- [ ] `allowed-tools` valid if present
- [ ] `model` valid if present

### Description

- [ ] Includes specific capabilities
- [ ] Includes trigger phrases (ideally quoted)
- [ ] Mentions keywords users would naturally say
- [ ] Not too vague or too broad
- [ ] Distinct from other skills

### References

- [ ] Links use correct relative paths
- [ ] Referenced files actually exist
- [ ] No circular reference chains
- [ ] One level deep from SKILL.md

### Tools

- [ ] `allowed-tools` includes all needed tools
- [ ] Read operations: Read, Grep, Glob
- [ ] Write operations: Write, Edit
- [ ] Execution: Bash, Task
- [ ] Web access: WebFetch, WebSearch

### Testing

- [ ] Restarted Claude Code after changes
- [ ] Skill appears in "What Skills are available?"
- [ ] Triggers with expected phrases
- [ ] Can complete its intended tasks
- [ ] No permission errors

## Getting Help

If issues persist after troubleshooting:

1. **Run debug mode**:

   ```bash
   claude --debug > debug.log 2>&1
   # Try using your skill
   # Review debug.log for errors
   ```

2. **Validate YAML**:

   ```bash
   python3 -c "import yaml; print(yaml.safe_load(open('.claude/skills/skill-name/SKILL.md').read().split('---')[1]))"
   ```

3. **Check file paths**:

   ```bash
   find .claude/skills -name "SKILL.md" -ls
   ```

4. **Simplify temporarily**:
   - Remove optional fields
   - Simplify description
   - Test if minimal skill loads

5. **Start from working example**:
   - Copy a working skill as template
   - Modify incrementally
   - Test after each change

## Common Errors Reference

| Error                 | Likely Cause          | Fix                              |
| --------------------- | --------------------- | -------------------------------- |
| Skill doesn't appear  | File path/name wrong  | Check `SKILL.md` location        |
| YAML parse error      | Syntax issue          | Validate YAML, check tabs/spaces |
| Skill doesn't trigger | Vague description     | Add specific trigger phrases     |
| Permission denied     | Missing allowed-tools | Add required tools               |
| Reference not found   | Broken link           | Fix relative path                |
| Module not found      | Missing dependency    | Document and install packages    |
| Slow performance      | File too large        | Move content to references       |

## Prevention Tips

**Before creating a skill**:

1. Start with a working example
2. Test early and often
3. Keep SKILL.md under 500 lines
4. Use specific trigger phrases
5. Document all dependencies

**During development**:

1. Restart Claude Code after each change
2. Test activation with real queries
3. Verify file paths and names
4. Validate YAML syntax
5. Check allowed-tools are sufficient

**After completion**:

1. Run through debug checklist
2. Test all common use cases
3. Verify references load properly
4. Document any requirements
5. Share with others for testing
