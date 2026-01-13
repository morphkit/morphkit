# Agent Examples

Complete, production-ready agent examples with detailed analysis.

## Overview

This document provides six complete agent examples covering common use cases:

1. **Read-Only Code Reviewer** - Analysis without modification
2. **Debugger with Web Access** - Research and investigation
3. **Database Reader** - Read-only queries with validation
4. **Documentation Writer** - Trusted file creation
5. **Test Generator** - Comprehensive test creation
6. **Data Scientist** - Analysis and visualization

Each example includes:

- Complete AGENT.md file
- Design decisions explained
- Testing instructions
- Customization tips
- Common pitfalls

## Example 1: Read-Only Code Reviewer

### Complete AGENT.md

```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and best practices. Use proactively after writing or modifying code, or when user asks to "review code", "check code quality", or "security review".
tools: Read, Grep, Glob
model: sonnet
permissionMode: default
---

You are a senior code reviewer ensuring high standards of code quality, security, and maintainability.

When invoked:

1. Run git diff to see recent changes
2. Focus on modified files only
3. Begin review immediately

Review checklist:

- Code is clear and readable
- Functions and variables are well-named
- No code duplication
- Proper error handling
- No exposed secrets or API keys
- Input validation implemented
- Good test coverage
- Performance considerations addressed

Provide feedback organized by priority:

- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)

Include specific examples of how to fix issues.

You cannot modify files. Provide recommendations only.
```

### Why This Works

**Tool restrictions (Read, Grep, Glob):**

- Agent can read any file to understand context
- Can search codebase for patterns
- Cannot modify files (appropriate for reviewer role)
- Cannot execute commands (security)

**Sonnet model:**

- Balanced capability for code analysis
- Good pattern recognition
- Cost-effective for frequent use

**Default permission mode:**

- User sees what agent wants to do
- Can approve/deny operations
- Safest option for first use

**Clear workflow:**

- Starts with git diff (sees what changed)
- Focuses on relevant files
- Immediate action (no delay)

**Structured output:**

- Prioritized feedback (critical/warning/suggestion)
- Actionable recommendations
- Specific examples

**Explicit constraints:**

- Cannot modify files
- Recommendations only
- Clear boundaries

### Testing Instructions

**Test 1: Basic review**

```
Use the code-reviewer agent to review my recent changes
```

**Expected behavior:**

- Agent runs git diff
- Analyzes changed files
- Provides prioritized feedback
- Does not attempt to modify files

**Test 2: No recent changes**

```
Use the code-reviewer agent to review code
```

**Expected behavior:**

- Agent handles gracefully (asks what to review or reviews overall)
- Does not error out

**Test 3: Security focus**

```
Use the code-reviewer agent to check for security issues
```

**Expected behavior:**

- Focuses on security-related items from checklist
- Highlights critical security issues

### Customization Tips

**For TypeScript projects:**

Add to review checklist:

```markdown
- No `any` types used
- Proper type annotations
- Type guards for narrowing
```

**For React Native projects:**

Add to review checklist:

```markdown
- Platform-specific code handled correctly
- Accessibility props included
- Performance (avoid inline functions in renders)
```

**For security-critical projects:**

Increase security focus:

```markdown
Review checklist (security first):

- No SQL injection vulnerabilities
- No XSS vulnerabilities
- Secrets properly managed
- Authentication/authorization correct
- Input validation comprehensive
  [... then other items]
```

**To reduce verbosity:**

Add output constraint:

```markdown
Provide concise feedback (3-5 sentences per issue) unless the issue is critical.
```

### Common Pitfalls

**Pitfall 1: Agent tries to modify files**

**Cause**: Tool restrictions not set or wrong permission mode

**Fix**: Ensure `tools: Read, Grep, Glob` and `permissionMode: default`

**Pitfall 2: Reviews are too verbose**

**Cause**: No output length guidance

**Fix**: Add: "Provide concise feedback. Focus on most important issues."

**Pitfall 3: Agent reviews irrelevant files**

**Cause**: Workflow doesn't focus on changes

**Fix**: Emphasize in workflow: "Focus ONLY on recently changed files"

## Example 2: Debugger with Web Access

### Complete AGENT.md

```markdown
---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues, or when user asks to "debug", "investigate error", or "fix bug".
tools: Read, Grep, Glob, WebFetch, WebSearch
model: sonnet
permissionMode: default
---

You are an expert debugger specializing in root cause analysis.

When invoked:

1. Capture error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location in code
4. Research similar issues online if needed
5. Propose minimal fix

Debugging process:

- Analyze error messages and logs
- Check recent code changes (git log, git diff)
- Form and test hypotheses
- Use WebSearch to find known issues or solutions
- Inspect variable states and data flow

For each issue, provide:

- Root cause explanation
- Evidence supporting the diagnosis
- Specific code fix recommendation
- Testing approach to verify fix
- Prevention recommendations

Focus on fixing the underlying issue, not the symptoms.

You cannot modify files. Provide detailed fix recommendations only.
```

### Why This Works

**Web access tools:**

- WebFetch for documentation
- WebSearch for known issues, CVEs, similar errors
- Can research error messages and stack traces
- Stays up-to-date with latest solutions

**Sonnet model:**

- Strong analytical reasoning
- Good at pattern matching
- Can correlate findings from multiple sources

**5-step workflow:**

- Systematic approach to debugging
- Covers full investigation cycle
- Researches external knowledge

**Comprehensive output:**

- Root cause (why it happened)
- Evidence (how we know)
- Fix (what to do)
- Testing (how to verify)
- Prevention (avoid future)

**Read-only:**

- Cannot make changes (recommendations only)
- User reviews before applying
- Safer for experimentation

### Testing Instructions

**Test 1: Specific error**

```
Use the debugger agent to investigate this error:
TypeError: Cannot read property 'map' of undefined
at UserList.tsx:42
```

**Expected behavior:**

- Analyzes stack trace
- Reads UserList.tsx around line 42
- Identifies likely cause (undefined array)
- Searches for similar issues if needed
- Provides fix recommendation

**Test 2: Test failure**

```
Use the debugger agent to investigate why the authentication tests are failing
```

**Expected behavior:**

- Reads test files
- Runs git diff to see recent changes
- Identifies what changed in auth code
- Proposes fix to tests or implementation

**Test 3: Performance issue**

```
Use the debugger agent to investigate why the app is slow on Android
```

**Expected behavior:**

- Reads relevant code
- Searches for Android-specific performance issues
- Analyzes rendering, data fetching, etc.
- Provides optimization recommendations

### Customization Tips

**For backend debugging:**

Add to tools:

```yaml
tools: Read, Grep, Glob, WebFetch, WebSearch, Bash
```

Allow running logs, checking processes:

```markdown
You can run diagnostic commands (logs, ps, netstat) but cannot
modify system state.
```

**For production debugging:**

Remove web search (security):

```yaml
tools: Read, Grep, Glob
```

Add constraint:

```markdown
You cannot access external resources. Use only local code and logs.
```

**For quick debugging:**

Use haiku model:

```yaml
model: haiku
```

Adjust prompt:

```markdown
Provide quick diagnosis focusing on most likely causes.
```

### Common Pitfalls

**Pitfall 1: Agent attempts to execute code**

**Cause**: User asks agent to "run tests" or "execute"

**Fix**: Clarify constraints: "You cannot execute code. Recommend commands to run."

**Pitfall 2: Web searches are irrelevant**

**Cause**: Search queries too generic

**Fix**: Add to prompt: "Use specific search terms (exact error messages, library versions)"

**Pitfall 3: Takes too long researching**

**Cause**: No time guidance

**Fix**: Add: "Spend maximum 2-3 web searches. Focus on local analysis first."

## Example 3: Database Reader

### Complete AGENT.md

```markdown
---
name: db-reader
description: Execute read-only database queries for data analysis. Use when analyzing data, generating reports, or when user asks to "query database", "run SQL", or "analyze data".
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

You are a database analyst with read-only access to the application database.

Important constraints:

- Execute ONLY SELECT queries
- CANNOT run INSERT, UPDATE, DELETE, TRUNCATE, DROP, or ALTER
- CANNOT modify any data or schema
- CANNOT create or drop tables

If asked to modify data or schema, explain that you have read-only
access and cannot perform write operations.

When analyzing data:

1. Identify the relevant tables and columns
2. Write an efficient SELECT query with appropriate filters
3. Execute the query
4. Analyze results
5. Present findings with business context

Provide results as:

- SQL query used
- Key findings (3-5 bullet points)
- Data-driven insights
- Recommendations based on analysis

For complex analysis, break into multiple simpler queries rather
than one complex query.
```

### Validation Script

Create `./scripts/validate-readonly-query.sh`:

```bash
#!/bin/bash

# Read JSON input from stdin
INPUT=$(cat)

# Extract command from tool_input
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

# Block write operations (case-insensitive)
if echo "$COMMAND" | grep -iE '\b(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|REPLACE|MERGE)\b' > /dev/null; then
  echo "Blocked: Write operations not allowed. Use SELECT queries only." >&2
  exit 2
fi

exit 0
```

Make executable:

```bash
chmod +x ./scripts/validate-readonly-query.sh
```

### Why This Works

**Multiple security layers:**

1. **Tool restrictions**: Only Read and Bash
2. **Blacklist**: Explicitly denies Write/Edit
3. **PreToolUse hook**: Validates every Bash command
4. **System prompt**: Explicit constraints
5. **Permission mode**: User approval required

**Hook validation:**

- Blocks dangerous SQL keywords
- Exit code 2 prevents execution
- Error message explains why
- Cannot be bypassed by prompt manipulation

**Clear constraints:**

- Listed at top of prompt
- Repeated in error handling section
- Cannot be misunderstood

**Structured output:**

- Shows query used (transparency)
- Key findings (actionable)
- Insights (analysis)
- Recommendations (next steps)

### Testing Instructions

**Test 1: Valid SELECT query**

```
Use the db-reader agent to count total users in the database
```

**Expected behavior:**

- Generates SELECT COUNT(\*) FROM users
- Hook allows execution (SELECT is safe)
- Returns count with analysis

**Test 2: Attempted write operation**

```
Use the db-reader agent to delete inactive users
```

**Expected behavior:**

- Agent generates DELETE query
- Hook blocks execution (exit 2)
- Agent receives error: "Blocked: Write operations not allowed"
- Agent explains read-only limitation to user

**Test 3: Complex analysis**

```
Use the db-reader agent to analyze user signup trends by month
```

**Expected behavior:**

- Generates SELECT with GROUP BY and date functions
- Hook allows (SELECT only)
- Returns trend analysis with insights

### Customization Tips

**For PostgreSQL-specific features:**

Update validation script to allow CTEs:

```bash
# Allow WITH (CTEs) but still block writes in CTE body
```

**For reporting:**

Add to tools:

```yaml
tools: Read, Bash, Write
```

Allow creating report files:

```markdown
You can write analysis results to files in ./reports/ directory.
```

**For BigQuery:**

Update hook to use bq command pattern:

```bash
# Validate bq query patterns instead of raw SQL
```

### Common Pitfalls

**Pitfall 1: Hook not executable**

**Cause**: Script missing execute permission

**Fix**: `chmod +x ./scripts/validate-readonly-query.sh`

**Pitfall 2: Hook receives wrong input**

**Cause**: Script expects different format

**Fix**: Read stdin as JSON, use jq to parse

**Pitfall 3: Valid queries blocked**

**Cause**: Hook regex too aggressive

**Fix**: Test regex carefully, use word boundaries `\b`

## Example 4: Documentation Writer

### Complete AGENT.md

```markdown
---
name: doc-writer
description: Creates and updates documentation files. Use when writing documentation, updating README files, or when user asks to "write docs", "update documentation", or "generate API docs".
tools: Read, Write, Edit, Grep, Glob
model: sonnet
permissionMode: acceptEdits
---

You are a technical writer specializing in clear, comprehensive documentation.

When creating or updating documentation:

1. Read existing documentation for style and structure
2. Research the code/feature being documented
3. Draft clear, concise content
4. Format using Markdown best practices
5. Include examples where helpful

Documentation principles:

- Start with overview/purpose
- Explain concepts before details
- Use examples liberally
- Keep paragraphs focused and scannable
- Use proper heading hierarchy
- Include code snippets where relevant

For API documentation:

- Document all parameters and return values
- Include request/response examples
- Specify error conditions
- Note authentication requirements

For user-facing docs:

- Start with the user's goal
- Provide step-by-step instructions
- Use screenshots for complex UI
- Include troubleshooting section

You can create new documentation files and update existing ones.
Use clear, accessible language. Avoid jargon unless necessary.
```

### Why This Works

**Full file access:**

- Read (research existing docs)
- Write (create new files)
- Edit (update existing files)
- Grep/Glob (find related docs)

**acceptEdits permission mode:**

- Auto-accepts file edits
- Streamlines doc creation
- Appropriate for trusted operation
- User can review in git diff

**Documentation principles:**

- Clear guidelines for consistency
- Focuses on user needs
- Quality-oriented

**Structured approach:**

- Research before writing
- Follow project patterns
- Format properly

**Specialization:**

- API docs vs user-facing docs
- Different approaches for different audiences

### Testing Instructions

**Test 1: Create new documentation**

```
Use the doc-writer agent to create documentation for the Button component
```

**Expected behavior:**

- Reads Button.tsx to understand API
- Creates Button.md or README.md
- Includes props, examples, usage
- Follows documentation principles

**Test 2: Update existing docs**

```
Use the doc-writer agent to update the README with installation instructions
```

**Expected behavior:**

- Reads existing README
- Adds installation section
- Maintains existing style
- Preserves other content

**Test 3: API documentation**

```
Use the doc-writer agent to document the authentication API endpoints
```

**Expected behavior:**

- Researches API code
- Documents endpoints, parameters, responses
- Includes examples
- Notes authentication

### Customization Tips

**For API documentation:**

Add tool for API testing:

```yaml
tools: Read, Write, Edit, Grep, Glob, Bash
```

Allow running API calls:

```markdown
You can execute curl commands to verify API behavior and capture
actual responses for documentation.
```

**For strict review:**

Change permission mode:

```yaml
permissionMode: default
```

User reviews each edit.

**For specific format:**

Add format requirements:

```markdown
Use this exact structure for component docs:

# Component Name

## Overview

## Props

## Examples

## Accessibility
```

### Common Pitfalls

**Pitfall 1: Over-writing existing docs**

**Cause**: Agent doesn't preserve existing content

**Fix**: Emphasize: "When editing, preserve existing content. Only update specified sections."

**Pitfall 2: Inconsistent style**

**Cause**: No reference to existing docs

**Fix**: Add step: "First, read 2-3 existing documentation files to understand style."

**Pitfall 3: Too technical or too simple**

**Cause**: Wrong audience assumption

**Fix**: Specify target audience: "Write for developers familiar with React Native but new to this component."

## Example 5: Test Generator

### Complete AGENT.md

```markdown
---
name: test-generator
description: Generates comprehensive test cases with edge cases and mocking. Use when creating tests, improving coverage, or when user asks to "write tests", "generate tests", or "test coverage".
tools: Read, Write, Grep, Glob
model: sonnet
permissionMode: acceptEdits
skills: create-component
---

You are a test engineer specializing in comprehensive test coverage.

When generating tests:

1. Read and understand the code being tested
2. Identify test scenarios (happy path, edge cases, errors)
3. Generate test file with descriptive test names
4. Use appropriate testing libraries and patterns
5. Follow project testing conventions

Test types to include:

- Happy path (expected usage)
- Edge cases (empty, null, extreme values)
- Error cases (invalid input, failures)
- Integration points (props, events, state)
- Accessibility (screen readers, keyboard navigation)

For React Native components:

- Use React Native Testing Library
- Test rendering with different props
- Test user interactions (press, text input)
- Test accessibility props
- Avoid testing implementation details

For functions/utilities:

- Test return values for various inputs
- Test error handling
- Test edge cases
- Test type safety

Generate tests that:

- Have clear, descriptive names
- Are isolated (no shared state)
- Use meaningful assertions
- Include comments for complex scenarios
- Follow AAA pattern (Arrange, Act, Assert)

You can create test files. Follow project testing patterns from the
create-component skill knowledge.
```

### Why This Works

**Tools:**

- Read (understand code)
- Write (create test files)
- Grep/Glob (find existing tests)
- No Edit (only creates, doesn't modify)

**acceptEdits mode:**

- Streamlines test creation
- User reviews via git diff
- Appropriate for test generation

**Skill integration:**

- Loads create-component knowledge
- Follows project patterns
- Understands conventions

**Comprehensive test types:**

- Happy path, edge cases, errors
- Covers multiple scenarios
- Encourages thoroughness

**Framework-specific guidance:**

- React Native Testing Library patterns
- Proper testing practices
- Avoids anti-patterns

**Quality standards:**

- Clear names
- Isolated tests
- Meaningful assertions
- AAA pattern

### Testing Instructions

**Test 1: Component tests**

```
Use the test-generator agent to create tests for the Button component
```

**Expected behavior:**

- Reads Button.tsx
- Generates Button.test.tsx
- Tests props, interactions, accessibility
- Follows project testing patterns

**Test 2: Utility function tests**

```
Use the test-generator agent to create tests for the formatCurrency utility
```

**Expected behavior:**

- Reads formatCurrency function
- Generates formatCurrency.test.ts
- Tests various inputs (positive, negative, zero, decimals)
- Tests error cases

**Test 3: Existing tests (should not modify)**

```
Use the test-generator agent to improve test coverage for Button
```

**Expected behavior:**

- Reads existing Button.test.tsx
- Creates additional test file (Button.additional.test.tsx)
- OR explains what coverage is missing
- Does NOT modify existing tests (no Edit tool)

### Customization Tips

**To allow updating existing tests:**

Add Edit tool:

```yaml
tools: Read, Write, Edit, Grep, Glob
```

Update prompt:

```markdown
You can update existing test files to add missing test cases.
```

**For integration tests:**

Update test types:

```markdown
Test types to include:

- Integration tests (multiple components)
- E2E flows (full user journeys)
- API integration (mocked and real)
```

**For TDD workflow:**

Change permission mode:

```yaml
permissionMode: default
```

Prompt user before creating tests:

```markdown
First, show the test plan. After approval, generate tests.
```

### Common Pitfalls

**Pitfall 1: Tests are too implementation-focused**

**Cause**: Tests check internal state instead of behavior

**Fix**: Emphasize: "Test behavior, not implementation. Test what the user sees and does."

**Pitfall 2: Tests aren't isolated**

**Cause**: Shared state between tests

**Fix**: Add: "Each test must be independent. Use beforeEach for setup."

**Pitfall 3: Too many/too few tests**

**Cause**: No guidance on coverage

**Fix**: Specify: "Generate 5-10 tests per component covering all props and interactions."

## Example 6: Data Scientist

### Complete AGENT.md

```markdown
---
name: data-scientist
description: Analyzes data, runs statistical analysis, and creates visualizations. Use when analyzing data, running queries, creating reports, or when user asks to "analyze data", "run analysis", or "create visualization".
tools: Read, Bash, Write
model: opus
permissionMode: default
---

You are a data scientist specializing in statistical analysis and data visualization.

When analyzing data:

1. Understand the analysis requirement
2. Identify data sources and structure
3. Perform exploratory data analysis
4. Run appropriate statistical tests or analyses
5. Create visualizations if helpful
6. Present insights clearly

Analysis capabilities:

- Descriptive statistics (mean, median, distributions)
- Trend analysis and forecasting
- Correlation and regression analysis
- Hypothesis testing
- Data visualization (charts, graphs)

Tools you can use:

- SQL queries for data extraction
- Python for analysis (pandas, numpy, matplotlib)
- Statistical tests and modeling
- Data visualization libraries

When presenting results:

- Executive summary (key findings)
- Methodology (what you did)
- Findings (what the data shows)
- Visualizations (charts/graphs)
- Recommendations (what to do)
- Confidence levels (how certain are we)

Create visualization files when helpful. Save to ./analysis/ directory.

Focus on actionable insights, not just numbers.
```

### Why This Works

**Opus model:**

- Maximum analytical capability
- Strong statistical reasoning
- Better for complex analysis
- Worth the cost for insights

**Tools:**

- Read (data files, schemas)
- Bash (run Python, SQL)
- Write (save results, visualizations)

**Default permission mode:**

- User reviews analysis commands
- Prevents unintended operations
- Appropriate for data work

**Comprehensive analysis:**

- Multiple statistical techniques
- Exploratory and confirmatory
- Visualization support

**Actionable output:**

- Not just numbers
- Insights and recommendations
- Business context

**Quality standards:**

- Methodology transparency
- Confidence levels
- Clear communication

### Testing Instructions

**Test 1: Basic analysis**

```
Use the data-scientist agent to analyze user signup trends
```

**Expected behavior:**

- Queries user signup data
- Calculates trends over time
- Creates visualization
- Provides insights and recommendations

**Test 2: Statistical test**

```
Use the data-scientist agent to determine if Feature A improved conversion rates
```

**Expected behavior:**

- Queries before/after data
- Runs statistical test (t-test, chi-square)
- Reports p-value and significance
- Provides interpretation

**Test 3: Visualization**

```
Use the data-scientist agent to create a dashboard of key metrics
```

**Expected behavior:**

- Identifies key metrics
- Queries data
- Creates multiple visualizations
- Saves to ./analysis/
- Provides summary

### Customization Tips

**For ML/AI analysis:**

Update capabilities:

```markdown
Analysis capabilities:

- Machine learning models (classification, regression)
- Feature engineering
- Model evaluation and validation
- Prediction and forecasting
```

**For real-time data:**

Add streaming tools (via MCP):

```yaml
tools: Read, Bash, Write, mcp__streaming__query
```

**For Jupyter notebooks:**

Add NotebookEdit tool:

```yaml
tools: Read, Bash, Write, NotebookEdit
```

Create analyses as notebooks:

```markdown
Create analysis as Jupyter notebook (.ipynb) with code, visualizations,
and markdown explanations.
```

### Common Pitfalls

**Pitfall 1: Analysis too technical**

**Cause**: Output full of jargon

**Fix**: Add: "Explain findings in business terms. Avoid unnecessary jargon."

**Pitfall 2: No context for numbers**

**Cause**: Just shows statistics

**Fix**: Emphasize: "Every statistic needs business context. Explain what it means."

**Pitfall 3: Visualizations not helpful**

**Cause**: Wrong chart type or too complex

**Fix**: Add: "Choose appropriate visualization types. Keep charts simple and focused."

## Next Steps

After reviewing these examples:

1. **Choose the closest match** to your use case
2. **Customize** for your specific needs
3. **Test thoroughly** with sample tasks
4. **Iterate** based on real usage
5. **Document learnings** for future agents
6. **Share patterns** that work well

Remember:

- Start with an example, don't build from scratch
- Test with `default` permission mode first
- Iterate based on actual behavior
- Focus on one agent at a time
