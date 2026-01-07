# Progressive Disclosure Patterns

This document covers patterns for organizing complex skills across multiple files to keep SKILL.md focused and scannable while providing comprehensive documentation.

## What is Progressive Disclosure?

Progressive disclosure is a design pattern where you present essential information upfront and provide detailed information only when needed. For Agent Skills, this means:

1. **SKILL.md** (~300-500 lines): Core overview, instructions, basic examples
2. **references/** (unlimited): Detailed documentation, comprehensive examples, reference tables
3. **scripts/** (executable): Utility code that runs without loading into context

Claude loads only the metadata (name + description) at startup. When activated, Claude reads SKILL.md. References are loaded only if the task requires them.

## Why Use Progressive Disclosure?

**Context Window Management**: Claude's context window is shared between:

- Conversation history
- Multiple skills
- Your current request
- Tool results

By keeping SKILL.md under 500 lines and moving details to references, you:

- ✅ Load skills faster
- ✅ Use less context for simple tasks
- ✅ Load comprehensive docs only when needed
- ✅ Can bundle extensive examples and reference material

**Token Efficiency Example**:

```
Simple task: "Create a basic skill"
- Loads: SKILL.md (~400 lines, ~3K tokens)
- Doesn't load: references/ (~2000 lines, ~15K tokens)
- Savings: 12K tokens for other context

Complex task: "Create a plugin skill with all fields"
- Loads: SKILL.md + yaml-fields.md + examples.md (~2400 lines, ~18K tokens)
- Uses: Comprehensive documentation as needed
```

## When to Use Multi-File Structure

### Use Single File (SKILL.md only) When:

- ✅ Skill is simple and straightforward
- ✅ Instructions fit comfortably under 500 lines
- ✅ No extensive reference material needed
- ✅ Few examples cover all cases
- ✅ No utility scripts required

**Example skills**:

- Code formatter
- Commit message generator
- Simple explanation skill

### Use Multi-File Structure When:

- ✅ Comprehensive API documentation needed
- ✅ Many detailed examples required
- ✅ Reference tables or schemas to include
- ✅ Utility scripts for deterministic operations
- ✅ SKILL.md would exceed 500 lines

**Example skills**:

- PDF processing (multiple operations, complex API)
- Database query helper (schema documentation, examples)
- Component generator (templates, multiple patterns)
- Security auditor (rules reference, checklists)

## Directory Structure Patterns

### Pattern 1: Minimal Multi-File

For skills needing one or two reference documents:

```
skill-name/
├── SKILL.md              (Overview + instructions)
└── references/
    └── api-reference.md  (Comprehensive API docs)
```

**When to use**: Skill has one main reference document (API docs, schema, rules).

**Example**: Database query skill with schema reference.

### Pattern 2: Organized References

For skills with multiple reference topics:

```
skill-name/
├── SKILL.md              (Overview + instructions)
└── references/
    ├── api-docs.md       (API reference)
    ├── examples.md       (Detailed examples)
    └── guidelines.md     (Best practices)
```

**When to use**: Multiple distinct reference topics.

**Example**: Component generator with API docs, component examples, and style guidelines.

### Pattern 3: Reference + Scripts

For skills that benefit from utility code:

```
skill-name/
├── SKILL.md              (Overview + instructions)
├── references/
│   ├── api-docs.md
│   └── examples.md
└── scripts/
    ├── validate.py       (Validation logic)
    └── transform.sh      (Data transformation)
```

**When to use**: Skill has deterministic operations better handled by code.

**Example**: Form filler with validation scripts, PDF processor with conversion utilities.

### Pattern 4: Comprehensive

For complex, feature-rich skills:

```
skill-name/
├── SKILL.md              (Overview + quick start)
├── references/
│   ├── getting-started.md
│   ├── api-reference.md
│   ├── examples/
│   │   ├── basic.md
│   │   ├── advanced.md
│   │   └── edge-cases.md
│   ├── troubleshooting.md
│   └── faq.md
└── scripts/
    ├── validate.py
    ├── process.py
    └── helpers/
        └── utils.py
```

**When to use**: Complex domain, many use cases, needs extensive documentation.

**Example**: Full-featured PDF toolkit, comprehensive code reviewer, multi-operation data processor.

## What Goes Where

### SKILL.md (300-500 lines)

**Include**:

- ✅ YAML frontmatter (name, description, allowed-tools, model)
- ✅ Overview explaining what the skill does
- ✅ Quick start with minimal example
- ✅ Core instructions Claude should follow
- ✅ 1-3 basic examples showing the pattern
- ✅ Links to reference documents
- ✅ Troubleshooting basics (common issues)
- ✅ Best practices summary

**Exclude**:

- ❌ Comprehensive API documentation (→ references/api-reference.md)
- ❌ Extensive example library (→ references/examples.md)
- ❌ Detailed troubleshooting guide (→ references/troubleshooting.md)
- ❌ Complete reference tables (→ references/reference-tables.md)
- ❌ Edge case documentation (→ references/edge-cases.md)

**Structure Template**:

```markdown
---
name: skill-name
description: ...
---

# Skill Name

## Overview

Brief explanation of what this skill does.

## Quick Start

Minimal example to get started immediately.

## Core Instructions

Step-by-step guidance for Claude to follow.

## Basic Examples

1-3 examples covering common use cases.

## Advanced Usage

Link to references for detailed docs.

## Best Practices

Key guidelines summary.

## Troubleshooting

Common issues + link to detailed guide.
```

### references/ Directory

**Purpose**: Detailed documentation loaded only when the task requires it.

**Common Files**:

#### api-reference.md

- Complete API documentation
- All methods, parameters, return types
- Configuration options
- Technical specifications

#### examples.md

- Comprehensive example library
- Basic to advanced examples
- Edge cases and special scenarios
- Real-world use cases

#### guidelines.md / best-practices.md

- In-depth best practices
- Anti-patterns to avoid
- Design principles
- Style guides

#### troubleshooting.md

- Common errors and solutions
- Debug strategies
- Known limitations
- FAQ for technical issues

#### getting-started.md

- Detailed setup instructions
- Environment configuration
- Dependencies and prerequisites
- Installation steps

#### reference-tables.md

- Lookup tables
- Configuration matrices
- Compatibility charts
- Reference data

### scripts/ Directory

**Purpose**: Executable code that runs without loading into context.

**When to Use Scripts**:

- ✅ Validation logic (checking input format, required fields)
- ✅ Data transformation (parsing, converting formats)
- ✅ Deterministic operations (calculations, processing)
- ✅ Complex logic better expressed as code than prose

**Examples**:

```python
# scripts/validate_form.py
# Validates PDF form has required fields

import sys
import pdfplumber

def validate_form(pdf_path):
    required_fields = ['name', 'email', 'date']
    with pdfplumber.open(pdf_path) as pdf:
        form = pdf.pages[0].extract_form()
        missing = [f for f in required_fields if f not in form]
        if missing:
            print(f"Missing fields: {', '.join(missing)}")
            return False
    print("Form validation passed")
    return True

if __name__ == "__main__":
    validate_form(sys.argv[1])
```

```bash
# scripts/convert_format.sh
# Converts data between formats

#!/bin/bash
input_file=$1
output_format=$2

case $output_format in
  json)
    python3 -c "import csv, json, sys; print(json.dumps(list(csv.DictReader(sys.stdin))))" < "$input_file"
    ;;
  csv)
    python3 -c "import json, csv, sys; csv.DictWriter(sys.stdout, json.load(sys.stdin)[0].keys()).writerows(json.load(sys.stdin))" < "$input_file"
    ;;
esac
```

**How to Reference Scripts in SKILL.md**:

````markdown
## Validation

To validate input files, run the validation script:

```bash
python scripts/validate_form.py input.pdf
```
````

The script checks for required fields and returns validation errors.

````

Claude will execute the script and see its output without loading the script code into context.

## Linking Strategy

### One Level Deep Rule

**DO** link directly from SKILL.md to references:

```markdown
See [api-reference.md](references/api-reference.md) for complete API documentation.
````

**DON'T** create chains of links:

```markdown
❌ SKILL.md → overview.md → details.md → examples.md
```

Claude may partially read chained references, causing incomplete information.

### Effective Link Examples

```markdown
## Advanced Topics

For detailed information:

- [Complete API Reference](references/api-reference.md) - All methods and parameters
- [Example Library](references/examples.md) - 20+ working examples
- [Troubleshooting Guide](references/troubleshooting.md) - Common issues and solutions
```

```markdown
## Reference Documents

See these guides for comprehensive documentation:

**Getting Started**: [getting-started.md](references/getting-started.md)

- Installation and setup
- Environment configuration
- First example walkthrough

**API Reference**: [api-reference.md](references/api-reference.md)

- Complete method documentation
- Parameter specifications
- Return types and errors

**Examples**: [examples.md](references/examples.md)

- Basic usage examples
- Advanced patterns
- Edge cases and special scenarios
```

### Context-Sensitive Linking

Help Claude understand when to load references:

```markdown
## Quick Examples

For simple use cases, follow these patterns:
[Basic examples inline...]

## Complex Scenarios

For advanced use cases involving multiple operations or edge cases, see [examples.md](references/examples.md) for comprehensive examples including:

- Multi-step workflows
- Error handling strategies
- Integration patterns
- Performance optimization
```

This tells Claude:

- Simple task → Use inline examples
- Complex task → Load references/examples.md

## File Organization Examples

### Example 1: PDF Processing Skill

```
pdf-processing/
├── SKILL.md                    (Quick start + basic examples)
└── references/
    ├── api-reference.md        (pypdf + pdfplumber API docs)
    ├── form-filling.md         (Form field mappings + examples)
    └── examples.md             (Text extraction, merging, splitting)
```

**SKILL.md** (~400 lines):

- Overview of PDF operations
- Quick start for text extraction
- Basic form filling example
- Links to detailed docs

**api-reference.md** (~600 lines):

- Complete pypdf API
- Complete pdfplumber API
- All methods with parameters

**form-filling.md** (~300 lines):

- Form field reference
- Field mapping strategies
- Validation rules

**examples.md** (~500 lines):

- Text extraction variations
- Table extraction
- Form filling examples
- PDF merging and splitting
- Bookmark manipulation

### Example 2: Component Generator Skill

```
create-component/
├── SKILL.md                    (Component creation workflow)
└── references/
    ├── theme-system.md         (Theme token documentation)
    ├── patterns.md             (Component patterns + anti-patterns)
    └── examples.md             (Example components)
```

**SKILL.md** (~450 lines):

- Component creation workflow
- File structure requirements
- Basic component example
- Testing requirements
- Links to theme docs and patterns

**theme-system.md** (~800 lines):

- Three-tier token architecture
- Primitive token reference
- Semantic token reference
- Component token patterns
- Theme usage examples

**patterns.md** (~600 lines):

- forwardRef pattern
- Style merging pattern
- State management patterns
- Accessibility patterns
- Common anti-patterns to avoid

**examples.md** (~1000 lines):

- Button component (complete)
- Input component (complete)
- Card component (complete)
- Custom hook examples

### Example 3: Security Audit Skill

```
security-audit/
├── SKILL.md                    (Audit process overview)
├── references/
│   ├── owasp-top-10.md        (OWASP vulnerability reference)
│   ├── react-security.md      (React-specific issues)
│   ├── node-security.md       (Node.js-specific issues)
│   └── checklist.md           (Security audit checklist)
└── scripts/
    └── dependency-check.sh    (Check for vulnerable deps)
```

**SKILL.md** (~350 lines):

- Security audit workflow
- What to check for
- Basic SQL injection example
- Basic XSS example
- Links to OWASP reference and checklists

**references/owasp-top-10.md** (~1200 lines):

- Detailed OWASP Top 10 vulnerabilities
- Code examples for each
- Detection strategies
- Mitigation approaches

**references/react-security.md** (~500 lines):

- React-specific vulnerabilities
- dangerouslySetInnerHTML issues
- Component security patterns

**references/checklist.md** (~400 lines):

- Complete security audit checklist
- Item-by-item verification steps

**scripts/dependency-check.sh**:

- Runs `npm audit` or similar
- Checks for known vulnerabilities
- Outputs results without loading code into context

## Progressive Loading Workflow

### How Claude Uses Progressive Disclosure

1. **Startup**: Load name + description only (all skills, ~100 words each)
2. **Activation**: User request matches description
3. **Load SKILL.md**: Read main file (~400 lines, ~3K tokens)
4. **Assess Task**: Determine if references needed
5. **Load References**: If task is complex, load specific reference files

### Example Workflow

**User**: "Help me fill out a PDF form"

**Claude**:

1. Matches against `pdf-processing` skill description
2. Loads `SKILL.md` (~400 lines)
3. Sees this is about form filling
4. Loads `references/form-filling.md` (~300 lines)
5. Executes task using both documents

**Total context**: ~700 lines (~5K tokens)

**vs. Single File Approach**:

- Would load entire skill (~2000 lines, ~15K tokens)
- 3x more context used
- Slower loading
- Less room for conversation history

## Token Optimization Strategies

### Strategy 1: Categorize References

Organize references by topic so Claude loads only relevant ones:

```
references/
├── basics.md           (For simple tasks)
├── advanced.md         (For complex tasks)
└── troubleshooting.md  (For error handling)
```

Claude can intelligently load:

- Simple task → basics.md only
- Complex task → basics.md + advanced.md
- Error → troubleshooting.md

### Strategy 2: Example Libraries

Separate examples by complexity:

```
references/
└── examples/
    ├── basic.md        (Common 80% of use cases)
    ├── advanced.md     (20% complex scenarios)
    └── edge-cases.md   (Rare edge cases)
```

Most tasks load basic.md only. Advanced scenarios load more.

### Strategy 3: Modular References

Break large reference docs into modules:

```
references/
├── api/
│   ├── core-methods.md      (Essential API)
│   ├── utility-methods.md   (Helper functions)
│   └── advanced-api.md      (Power user features)
└── configuration/
    ├── basic-config.md      (Common settings)
    └── advanced-config.md   (All options)
```

Load only relevant modules for each task.

### Strategy 4: Script Execution

Move deterministic logic to scripts:

**Instead of** (loads into context):

```markdown
## Validation Rules

Check that:

1. Name field is 1-100 characters
2. Email matches regex: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
3. Date is in YYYY-MM-DD format
4. ...50 more validation rules
```

**Use scripts** (executes without context):

````markdown
## Validation

Run the validation script:

```bash
python scripts/validate.py input.json
```
````

The script checks all required fields and formats.

````

Script contains 200 lines of validation logic but uses 0 tokens (only output shown).

## Best Practices

### 1. Keep SKILL.md Focused

**Goal**: Someone should be able to scan SKILL.md in 2-3 minutes and understand:
- What the skill does
- How to use it for simple cases
- Where to find detailed information

**Achieve this by**:
- Clear section headings
- Concise paragraphs
- Basic examples inline
- Links to detailed references

### 2. Make References Self-Contained

Each reference file should:
- ✅ Be complete on its topic
- ✅ Not require reading other references
- ✅ Have clear headings and structure
- ✅ Include examples relevant to that topic

### 3. Use Descriptive Link Text

```markdown
❌ For more info, see [this document](references/api-reference.md).
✅ See [api-reference.md](references/api-reference.md) for complete API documentation including all methods, parameters, and return types.
````

Help Claude understand what's in the reference without loading it.

### 4. Test Progressive Loading

After creating your skill, test:

- Simple task (should only need SKILL.md)
- Medium task (SKILL.md + one reference)
- Complex task (SKILL.md + multiple references)

Verify Claude loads appropriate files for each complexity level.

### 5. Maintain Clear Boundaries

**SKILL.md**: "How to do common things"
**references/**: "Comprehensive information for specific topics"
**scripts/**: "Executable code for deterministic operations"

Don't blur these boundaries or you lose the benefits.

### 6. Update Both Places

When updating your skill:

- ✅ Update SKILL.md if workflow changes
- ✅ Update references if details change
- ✅ Keep links in SKILL.md accurate
- ✅ Maintain version consistency

### 7. Version Reference Files

Add version info to references:

```markdown
# API Reference

**Version**: 2.1.0
**Last Updated**: 2025-01-07
**Compatibility**: Skill version 2.x

This document covers...
```

Helps maintain consistency across updates.

## Common Mistakes

### Mistake 1: Too Many Small Files

```
❌ Over-fragmented:
references/
├── method-1.md  (50 lines)
├── method-2.md  (50 lines)
├── method-3.md  (50 lines)
...
├── method-20.md (50 lines)
```

**Problem**: Claude has to load many files, overhead exceeds benefits.

**Better**:

```
✅ Grouped logically:
references/
├── core-methods.md     (500 lines, 10 methods)
└── utility-methods.md  (500 lines, 10 methods)
```

### Mistake 2: Duplicate Content

Repeating information in SKILL.md and references.

**Problem**: Wastes tokens, creates inconsistency risk.

**Solution**: SKILL.md has summary, references have complete docs.

### Mistake 3: Broken Links

Links that don't work or point to wrong files.

**Problem**: Claude can't find referenced information.

**Solution**: Test all links, use relative paths, verify after updates.

### Mistake 4: Chained References

```
❌ SKILL.md → overview.md → details.md → examples.md
```

**Problem**: Claude may not follow the chain completely.

**Solution**: Link directly from SKILL.md to all references.

### Mistake 5: No Context in Links

```
❌ See [here](references/api-reference.md) for more.
✅ See [api-reference.md](references/api-reference.md) for complete API documentation.
```

Help Claude decide if it needs to load the reference.

## Summary

Progressive disclosure keeps your skills efficient and maintainable:

1. **SKILL.md** (~300-500 lines): Essential information, quick start, basic examples
2. **references/**: Detailed documentation loaded as needed
3. **scripts/**: Executable code for deterministic operations
4. **Link directly**: One level deep from SKILL.md to references
5. **Test loading**: Verify appropriate files load for different task complexities

This pattern enables comprehensive documentation while maintaining fast loading and efficient context usage.
