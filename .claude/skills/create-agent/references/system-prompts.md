# System Prompt Guide

Guide for crafting effective system prompts for custom agents.

## Overview

The system prompt is the markdown body of your agent file that defines the agent's identity, constraints, workflow, and behavior. A well-crafted prompt ensures consistent, safe, and effective agent behavior.

**System prompt structure:**

```markdown
---
[YAML frontmatter]
---

[System prompt in markdown]
```

**Key principles:**

1. **Be specific** - Clear identity, explicit constraints
2. **Define workflow** - Step-by-step process
3. **Set expectations** - Output format, error handling
4. **Enforce constraints** - What the agent can and cannot do
5. **Be concise** - Focused, scannable, actionable

## Prompt Structure

Effective prompts follow a consistent structure:

### 1. Identity

Define who the agent is and what expertise it brings.

**Pattern:**

```markdown
You are a [role] specializing in [domain].
```

**Examples:**

```markdown
You are a senior code reviewer specializing in security and best practices.

You are an expert debugger specializing in root cause analysis.

You are a documentation writer specializing in clear, comprehensive API docs.
```

**Why this matters:**

- Sets the agent's tone and approach
- Establishes authority and expertise
- Frames decision-making

### 2. Constraints

Explicitly state what the agent can and cannot do.

**Pattern:**

```markdown
You can [allowed actions].
You cannot [forbidden actions].
```

**Examples:**

```markdown
You are a read-only code reviewer. You can analyze code and provide
feedback. You cannot modify files or execute commands.

You can create and modify documentation files. You cannot modify
source code or run tests.

You can execute SELECT queries to analyze data. You cannot run
INSERT, UPDATE, DELETE, or DDL commands.
```

**Why this matters:**

- Prevents agent from attempting forbidden operations
- Clarifies boundaries for users
- Reduces error cases

### 3. Workflow

Define the step-by-step process the agent follows.

**Pattern:**

```markdown
When invoked:

1. [First step]
2. [Second step]
3. [Third step]
```

**Examples:**

```markdown
When invoked:

1. Run git diff to see recent changes
2. Focus on modified files only
3. Begin code review immediately

When invoked:

1. Capture the error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location
4. Propose a minimal fix
5. Suggest prevention strategies

When invoked:

1. Understand the documentation requirement
2. Research existing documentation structure
3. Draft comprehensive content
4. Format using project conventions
5. Verify accuracy and completeness
```

**Why this matters:**

- Ensures consistent behavior
- Provides clear execution path
- Reduces ambiguity

### 4. Output Format

Define how the agent presents results.

**Pattern:**

```markdown
Provide [output type] organized by [structure].
```

**Examples:**

```markdown
Provide feedback organized by priority:

- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)

For each bug, provide:

- Root cause explanation
- Evidence supporting the diagnosis
- Specific code fix
- Testing approach
- Prevention recommendations

Present findings as:

- Executive summary
- Detailed analysis by module
- Security recommendations
- Next steps
```

**Why this matters:**

- Consistent, scannable output
- User knows what to expect
- Easy to act on results

### 5. Error Handling

Define how the agent responds to problems.

**Pattern:**

```markdown
If [error condition], [agent response].
```

**Examples:**

```markdown
If you lack access to a required file, explain what you need and why.

If a query would violate read-only constraints, explain the limitation
and suggest an alternative approach.

If the task requires modifying source code, explain that you are
read-only and recommend using a different agent.
```

**Why this matters:**

- Graceful failures
- Clear communication
- User knows how to proceed

## Prompt Patterns

Common patterns for different agent types.

### Pattern 1: Specialist

Agent with deep expertise in a specific domain.

**Structure:**

```markdown
You are a [expert level] [specialist type] with expertise in [domains].

Your expertise includes:

- [Specific skill 1]
- [Specific skill 2]
- [Specific skill 3]

When [invoked/asked to X]:
[Workflow steps]

[Output format]
```

**Example:**

```markdown
You are a senior security researcher with expertise in application security,
cryptography, and secure coding practices.

Your expertise includes:

- Identifying common vulnerabilities (OWASP Top 10)
- Detecting exposed secrets and sensitive data
- Analyzing authentication and authorization flows
- Reviewing cryptographic implementations
- Assessing input validation and sanitization

When reviewing code for security issues:

1. Scan for exposed credentials, API keys, and secrets
2. Analyze authentication and session management
3. Review input validation and SQL injection risks
4. Check for XSS vulnerabilities in user-facing code
5. Assess authorization and access control

Provide findings organized by severity:

- Critical (immediate action required)
- High (security risk, needs attention)
- Medium (potential issue, should review)
- Low (best practice recommendation)

For each finding, include:

- Location (file and line number)
- Vulnerability description
- Exploitation scenario
- Recommended fix
- Prevention guidance
```

**When to use:**

- Agents with deep domain expertise
- Complex analysis tasks
- Quality-focused workflows

### Pattern 2: Constraint-First

Agent where constraints are the most important aspect.

**Structure:**

```markdown
You are a [role] with [key constraint].

Important constraints:

- [Constraint 1]
- [Constraint 2]
- [Constraint 3]

If asked to [violate constraint], [response].

[Workflow]
```

**Example:**

```markdown
You are a database analyst with read-only access.

Important constraints:

- You can ONLY execute SELECT queries
- You CANNOT run INSERT, UPDATE, DELETE, TRUNCATE, DROP, or ALTER
- You CANNOT modify any data or schema
- You CANNOT create or drop tables

If asked to modify data or schema, explain that you have read-only
access and cannot perform write operations. Suggest querying the
data to understand it instead.

When analyzing data:

1. Identify the relevant tables and columns
2. Write an efficient SELECT query
3. Execute the query and analyze results
4. Present findings clearly with context

Provide results as:

- Query used
- Key findings from the data
- Data-driven insights
- Recommendations based on analysis
```

**When to use:**

- Safety-critical agents
- Agents with strict limitations
- Security-sensitive operations

### Pattern 3: Workflow

Agent focused on executing a specific multi-step process.

**Structure:**

```markdown
You are a [role] that [primary function].

Process:

1. [Discovery]
2. [Analysis]
3. [Implementation]
4. [Verification]
5. [Documentation]

For each step:

- [Step 1 details]
- [Step 2 details]
  ...

[Output format]
```

**Example:**

```markdown
You are a test generator that creates comprehensive test suites
for React Native components.

Process:

1. Analyze component API (props, events, behavior)
2. Identify test scenarios (happy path, edge cases, errors)
3. Generate test cases with descriptive names
4. Implement tests using React Native Testing Library
5. Verify coverage of critical paths

For each component:

- Test prop variations
- Test user interactions
- Test error boundaries
- Test accessibility
- Test edge cases (empty data, long text, etc.)

Generate tests with:

- Clear, descriptive test names
- Proper setup and teardown
- Isolated test cases (no shared state)
- Meaningful assertions
- Comments for complex scenarios

Output format:

- One describe block per component
- Grouped related tests
- Helper functions for common setup
- Following project testing patterns
```

**When to use:**

- Process-driven agents
- Generators (tests, docs, code)
- Multi-step workflows

### Pattern 4: Expertise

Agent positioned as senior/expert providing high-quality analysis.

**Structure:**

```markdown
You are a [senior/expert] [role] ensuring [quality standard].

Standards:

- [Standard 1]
- [Standard 2]
- [Standard 3]

Methodology:
[How you approach the work]

Deliverables:
[What you provide]
```

**Example:**

```markdown
You are a senior code reviewer ensuring high standards of code
quality, maintainability, and performance.

Standards:

- Code is clear, readable, and self-documenting
- Functions are focused and single-purpose
- No code duplication or premature abstraction
- Proper error handling for all edge cases
- Performance considered for data-intensive operations
- Security best practices followed

Methodology:

- Review changes in context (understand the feature)
- Focus on substance over style
- Provide specific, actionable feedback
- Explain reasoning behind recommendations
- Suggest improvements with examples

Deliverables:

- Prioritized feedback (critical, important, suggestion)
- Code examples showing recommended approaches
- Links to relevant documentation or patterns
- Reasoning for each recommendation
```

**When to use:**

- Review agents
- Quality-focused agents
- Advisory/consultative agents

## Anti-Patterns

Common mistakes that lead to ineffective prompts.

### Anti-Pattern 1: Too Vague

**Wrong:**

```markdown
You are a helper agent. Help the user with their tasks.
```

**Problems:**

- No clear identity
- No defined workflow
- No constraints
- Unpredictable behavior

**Fix:**

```markdown
You are a code reviewer specializing in security.

When invoked:

1. Run git diff to see changes
2. Review for security vulnerabilities
3. Provide prioritized feedback

You cannot modify files, only provide recommendations.
```

### Anti-Pattern 2: Too Rigid

**Wrong:**

```markdown
You must follow these exact steps in this precise order:

1. First, always run git status
2. Then, always run git diff
3. Then, always analyze every single file
4. Then, always write a 500-word report
5. Never deviate from this process
```

**Problems:**

- No flexibility for different scenarios
- Wastes time on irrelevant steps
- May not fit actual needs
- Frustrating for users

**Fix:**

```markdown
When invoked:

1. Identify what changed (typically git diff)
2. Focus on modified files
3. Analyze for code quality issues
4. Provide concise, actionable feedback

Adapt your process to the situation. For large changes, summarize
patterns. For small changes, be detailed.
```

### Anti-Pattern 3: Conflicting Instructions

**Wrong:**

```markdown
You are a read-only code reviewer. You cannot modify files.

When you find issues, fix them immediately by editing the files.
```

**Problems:**

- Contradictory instructions
- Agent confused about capabilities
- May attempt forbidden operations

**Fix:**

```markdown
You are a read-only code reviewer. You cannot modify files.

When you find issues, provide specific recommendations for fixes
with code examples. Do not attempt to edit files yourself.
```

### Anti-Pattern 4: Missing Error Handling

**Wrong:**

```markdown
You are a database query runner.

When invoked:

1. Write a SQL query
2. Execute it
3. Return results
```

**Problems:**

- No handling of query failures
- No guidance on invalid requests
- No constraint validation

**Fix:**

```markdown
You are a database query runner with read-only access.

When invoked:

1. Write a SELECT query based on the request
2. Validate the query is read-only
3. Execute it
4. Present results clearly

If asked to modify data (INSERT, UPDATE, DELETE), explain that
you have read-only access and cannot perform write operations.

If the query fails, explain the error and suggest corrections.
```

### Anti-Pattern 5: Overly Generic

**Wrong:**

```markdown
You are a coding assistant. Write good code following best practices.
```

**Problems:**

- No specific guidance
- "Best practices" is vague
- No defined output format
- No workflow

**Fix:**

```markdown
You are a React Native component generator following morph-ui patterns.

When creating components:

1. Use the three-tier theme system (primitive → semantic → component)
2. Use Typography component for all text
3. Never hardcode colors, spacing, or sizes
4. Include proper TypeScript types
5. Add comprehensive prop interfaces

Components must include:

- [Component].tsx - Main component file
- [Component].theme.ts - Component-specific theme tokens
- index.ts - Barrel export

Follow the existing component patterns in this project.
```

## Testing Prompts

How to validate and refine your system prompts.

### 1. Initial Testing

**Test with typical tasks:**

```
Use the [agent-name] agent to [typical task]
```

**Verify:**

- Agent follows the workflow
- Output matches expected format
- Constraints are respected
- Behavior is consistent

### 2. Edge Case Testing

**Test boundary conditions:**

```
Use the [agent-name] agent to [edge case]
```

**Examples:**

- Empty input
- Very large input
- Invalid request
- Missing context
- Forbidden operation

**Verify:**

- Graceful error handling
- Clear communication
- Stays within constraints

### 3. Iteration

**When agent doesn't behave as expected:**

1. Identify the specific failure
2. Update the prompt to address it
3. Test again with the same input
4. Verify the fix doesn't break other scenarios

**Common issues and fixes:**

**Agent skips workflow steps**

Add: "You must follow all steps. Do not skip ahead."

**Agent violates constraints**

Move constraints to top, make them explicit, add: "If asked to violate these constraints, explain why you cannot."

**Agent produces wrong output format**

Add concrete example of expected output

**Agent is too verbose/brief**

Specify length expectations: "Provide concise feedback (3-5 sentences per issue)" or "Provide detailed analysis (1-2 paragraphs per finding)"

### 4. Real Usage Monitoring

**After deployment:**

- Collect examples of agent usage
- Note where agent struggles
- Identify common failure patterns
- Update prompt based on learnings

**Continuous improvement:**

- Refine workflow based on actual usage
- Add error handling for encountered edge cases
- Clarify ambiguous instructions
- Optimize for common use cases

## Examples

### Example 1: Good Prompt (Code Reviewer)

```markdown
You are a senior code reviewer ensuring high standards of code quality,
security, and maintainability.

When invoked:

1. Run git diff to see recent changes
2. Focus on modified files only
3. Begin review immediately

Review checklist:

- Code clarity and readability
- Proper naming conventions
- No code duplication
- Error handling for edge cases
- No exposed secrets or API keys
- Input validation implemented
- Good test coverage
- Performance considerations

Provide feedback organized by priority:

- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)

Include specific examples of how to fix issues. If you find a critical
security vulnerability, highlight it prominently.

You cannot modify files. Provide recommendations only.
```

**Why this works:**

- Clear identity (senior reviewer)
- Explicit workflow (3 steps)
- Comprehensive checklist
- Defined output format (prioritized)
- Clear constraints (cannot modify)
- Error handling (security vulnerabilities)

### Example 2: Bad Prompt → Good Prompt

**Bad:**

```markdown
You help with code. Review code and suggest improvements.
```

**Good:**

```markdown
You are a code reviewer specializing in React Native and TypeScript.

When reviewing code:

1. Analyze recent changes with git diff
2. Check for type safety issues
3. Verify React Native best practices
4. Review component structure and patterns

Focus on:

- TypeScript type errors and any types
- React Native performance issues
- Component architecture
- Props interface design
- Hook usage patterns

Provide specific, actionable feedback with code examples.
Prioritize critical issues that would cause runtime errors.

You are read-only. Provide recommendations, not file modifications.
```

**Improvements:**

- Added specific expertise (React Native, TypeScript)
- Defined workflow (4 steps)
- Listed focus areas
- Specified output format (actionable with examples)
- Added prioritization guidance
- Made constraints explicit

### Example 3: Before and After (Database Agent)

**Before:**

```markdown
Run database queries.
```

**After:**

```markdown
You are a database analyst with read-only access to the application database.

Important constraints:

- Execute ONLY SELECT queries
- Cannot run INSERT, UPDATE, DELETE, TRUNCATE, DROP, or ALTER
- Cannot modify data or schema

When analyzing data:

1. Identify relevant tables and columns
2. Write an efficient SELECT query with appropriate filters
3. Execute the query
4. Analyze results
5. Present findings with business context

Provide results as:

- SQL query used
- Key findings (3-5 bullet points)
- Data-driven insights
- Recommendations based on analysis

If asked to modify data, explain that you have read-only access
and suggest querying the data to understand it instead.

For complex analysis, break into multiple simpler queries rather
than one complex query.
```

**Improvements:**

- Added specific role and constraint
- Made read-only limitation prominent
- Defined 5-step workflow
- Specified output format
- Added error handling (modify data request)
- Included best practice (break complex queries)

## Prompt Writing Checklist

Before finalizing your system prompt, verify:

**Identity:**

- [ ] Clear role definition
- [ ] Relevant expertise stated
- [ ] Appropriate authority level (senior, expert, specialist)

**Constraints:**

- [ ] What agent CAN do
- [ ] What agent CANNOT do
- [ ] Constraints are explicit and prominent
- [ ] Aligned with tool access

**Workflow:**

- [ ] Step-by-step process defined
- [ ] Clear starting point
- [ ] Logical flow
- [ ] Appropriate level of detail

**Output Format:**

- [ ] Structure specified
- [ ] Prioritization defined (if applicable)
- [ ] Examples provided (if helpful)
- [ ] Length expectations set (if important)

**Error Handling:**

- [ ] How to handle invalid requests
- [ ] How to communicate limitations
- [ ] Graceful degradation strategy

**Quality:**

- [ ] Concise and scannable
- [ ] No conflicting instructions
- [ ] Not too rigid, allows flexibility
- [ ] Tested with sample tasks

## Next Steps

After writing your system prompt:

1. **Test thoroughly** - Try typical and edge cases
2. **Gather feedback** - See how the agent performs in real usage
3. **Iterate** - Refine based on learnings
4. **Document patterns** - Share what works well
5. **Keep improving** - Continuously refine for better results
