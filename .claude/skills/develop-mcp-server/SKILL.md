---
name: develop-mcp-server
description: Develops MCP (Model Context Protocol) servers in TypeScript following modelcontextprotocol.io standards. Creates OpenSpec proposals, generates server scaffolding, and spawns parallel agents to implement tools. Use when user asks to "create an MCP server", "build an MCP server", "develop MCP tools", or mentions Model Context Protocol development.
allowed-tools: Read, Write, Edit, Bash, Grep, Glob, Task, TodoWrite, AskUserQuestion
model: inherit
---

# MCP Server Development Skill

This skill guides you through developing Model Context Protocol (MCP) servers in TypeScript following the official modelcontextprotocol.io documentation.

## Activation

Use this skill when the user requests:

- "create an MCP server"
- "build an MCP server"
- "develop MCP tools"
- "implement Model Context Protocol server"
- Any mention of MCP server development

## Workflow Overview

The skill follows a **5-phase workflow**:

1. **Requirements Gathering & Planning** - Collect server specifications
2. **OpenSpec Proposal Creation** - Create spec-driven proposal files
3. **Scaffdog Server Generation** - Auto-generate server structure
4. **Parallel Tool Development** - Spawn agents to implement tools
5. **Integration & Verification** - Validate and test complete server

## Phase 1: Requirements Gathering & Planning

### Step 1.1: Collect Core Requirements

Use `AskUserQuestion` to gather:

**Question 1: Server Basics**

- Header: "Server Info"
- Question: "What is the MCP server name and purpose?"
- Collect: name (kebab-case), description (1-2 sentences)

**Question 2: Transport Type**

- Header: "Transport"
- Question: "Which transport type should this server use?"
- Options:
  - "STDIO (Standard Input/Output)" - For local CLI integration, simpler setup
  - "Streamable HTTP" - For web APIs, remote access, requires Express server
- Multi-select: false

**Question 3: Tools to Implement**

- Header: "Tools"
- Question: "What tools should this server provide?"
- Ask for structured list: Each tool needs:
  - `name` (kebab-case, e.g., "calculate-sum", "format-text")
  - `feature` (category, e.g., "math", "formatting", "database")
  - `description` (what it does, 1 sentence)
  - `inputs` (parameters needed)

Example format:

```json
[
  {
    "name": "calculate-sum",
    "feature": "math",
    "description": "Calculates the sum of an array of numbers",
    "inputs": ["numbers"]
  },
  {
    "name": "format-date",
    "feature": "formatting",
    "description": "Formats a date string to specified format",
    "inputs": ["date", "format"]
  }
]
```

**Question 4: External Dependencies**

- Header: "Dependencies"
- Question: "What external npm packages does this server need?"
- Collect: Array of package names (e.g., ["axios", "node-fetch"])

**Question 5: Environment Variables**

- Header: "Config"
- Question: "What environment variables are required?"
- Collect: List with descriptions (e.g., "OPENAI_API_KEY - OpenAI API authentication")

### Step 1.2: Validate Requirements

Check that:

- Server name is valid kebab-case
- At least one tool is defined
- Tool names don't conflict with MCP SDK reserved methods
- Dependencies exist on npm (search if uncertain)
- Transport type is appropriate for use case

### Step 1.3: Present Summary

Show the user a formatted summary:

```
MCP Server: {name}
Description: {description}
Transport: {STDIO|Streamable HTTP}

Tools ({count}):
1. {tool-name} - {description}
2. ...

Dependencies: {list}
Environment Variables: {list}
```

Ask for confirmation before proceeding.

## Phase 2: OpenSpec Proposal Creation

### Step 2.1: Create Proposal Directory

```bash
mkdir -p openspec/changes/add-{name}-mcp-server/specs/{name}-mcp
```

### Step 2.2: Write proposal.md

Create `openspec/changes/add-{name}-mcp-server/proposal.md`:

```markdown
# Add {Name} MCP Server

## Why

[Explain the problem this MCP server solves]

## What

A Model Context Protocol server that provides the following tools:

- **{tool-name}**: {description}
- ...

Transport: {STDIO|Streamable HTTP}

## Impact

- **Users**: Can integrate {name} functionality into Claude Desktop and other MCP clients
- **Developers**: Provides {count} tools for {domain} operations
- **Architecture**: Adds new package at `packages/{name}-mcp/`

## Alternatives Considered

- Manual API integration: Rejected due to lack of MCP protocol support
- Existing MCP servers: No existing server provides these specific tools

## Implementation Approach

1. Generate server structure using scaffdog template
2. Implement tools in parallel using dedicated agents
3. Add Docker containerization for deployment
4. Integrate with monorepo build system
```

### Step 2.3: Write specs/{name}-mcp/spec.md

Create detailed specification:

```markdown
# {Name} MCP Server Specification

## Overview

{Detailed description of server purpose and capabilities}

## Architecture

### Transport: {STDIO|Streamable HTTP}

[Explain why this transport was chosen]

### Package Structure

\`\`\`
packages/{name}-mcp/
├── src/
│ ├── index.ts # Server entry point
│ ├── tools/
│ │ ├── {feature}/
│ │ │ ├── {tool-name}.ts
│ │ │ └── {tool-name}.test.ts
│ │ └── index.ts
├── package.json
├── tsconfig.json
├── .env.example
├── Dockerfile
└── docker-compose.yaml
\`\`\`

## Tools

### Tool: {tool-name}

**Description**: {detailed description}

**Input Schema**:
\`\`\`typescript
{
param1: string;
param2?: number;
}
\`\`\`

**Output**: {description of return value}

**Error Handling**: {edge cases and error responses}

**Example**:
\`\`\`json
{
"name": "{tool-name}",
"arguments": {
"param1": "value"
}
}
\`\`\`

[Repeat for each tool]

## Dependencies

- `@modelcontextprotocol/sdk`: ^1.0.0 - Core MCP SDK
- `zod`: ^3.23.8 - Input validation
- `dotenv`: ^16.4.5 - Environment configuration
  [List other dependencies]

## Environment Variables

- `{VAR_NAME}`: {description} (required/optional)

## Testing Strategy

- Unit tests for each tool using Jest
- Integration tests for server startup
- Mock external API calls
- Validate Zod schemas

## Security Considerations

- API key management via environment variables
- Input validation using Zod schemas
- Rate limiting (if applicable)
- Error message sanitization

## Deployment

### Docker

Server includes Dockerfile and docker-compose.yaml for containerized deployment.

### Local Development

\`\`\`bash
cd packages/{name}-mcp
bun install
bun run dev
\`\`\`

## Success Criteria

- All {count} tools implemented and tested
- Zero TypeScript errors
- Zero ESLint warnings
- All tests passing
- Server starts successfully in both dev and production modes
- Docker container builds and runs
```

### Step 2.4: Write tasks.md

Create implementation checklist:

```markdown
# Implementation Tasks: {Name} MCP Server

## Phase 1: Project Setup

- [ ] Run scaffdog generation: `bun run scaffold:mcp-server`
- [ ] Install dependencies: `bun install`
- [ ] Verify package.json configuration
- [ ] Verify TypeScript configuration extends base config

## Phase 2: Server Configuration

- [ ] Configure transport ({STDIO|Streamable HTTP})
- [ ] Set up environment variable loading
- [ ] Configure error handling
- [ ] Add logging setup

## Phase 3: Tool Implementation

[For each tool:]

- [ ] **{tool-name}**
  - [ ] Define Zod input schema
  - [ ] Implement tool logic in `src/tools/{feature}/{tool-name}.ts`
  - [ ] Add error handling
  - [ ] Write unit tests in `{tool-name}.test.ts`
  - [ ] Register tool in `src/index.ts`

## Phase 4: Testing

- [ ] Run all unit tests: `bun run test`
- [ ] Test server startup
- [ ] Test each tool with sample inputs
- [ ] Verify error handling
- [ ] Test with invalid inputs

## Phase 5: Docker Setup

- [ ] Verify Dockerfile builds: `docker build -t {name}-mcp .`
- [ ] Test docker-compose: `docker-compose up`
- [ ] Verify environment variables work in container
- [ ] Test tool execution in containerized environment

## Phase 6: Documentation

- [ ] Update .env.example with all required variables
- [ ] Document tool usage examples
- [ ] Add troubleshooting section
- [ ] Document deployment steps

## Phase 7: Quality Checks

- [ ] Format code: `bun run format`
- [ ] Type check: `bun run check-types` (zero errors)
- [ ] Lint: `bun run lint` (zero warnings)
- [ ] Run tests: `bun run test` (all passing)

## Phase 8: Final Validation

- [ ] Manually test server with MCP client
- [ ] Verify all tools work end-to-end
- [ ] Check error messages are clear
- [ ] Simplify code where possible
- [ ] Remove any unnecessary complexity
```

### Step 2.5: Validate OpenSpec

Run validation:

```bash
openspec validate --strict
```

If validation fails, fix issues and re-validate.

### Step 2.6: Wait for User Approval

**CRITICAL: DO NOT PROCEED TO PHASE 3 WITHOUT USER APPROVAL**

Present the OpenSpec proposal to the user:

```
OpenSpec proposal created at:
- openspec/changes/add-{name}-mcp-server/proposal.md
- openspec/changes/add-{name}-mcp-server/specs/{name}-mcp/spec.md
- openspec/changes/add-{name}-mcp-server/tasks.md

Validation: PASSED

Please review the proposal. Reply "approved" or "proceed" to continue with implementation.
```

## Phase 3: Scaffdog Server Generation

**Prerequisites**: User has approved the OpenSpec proposal

### Step 3.1: Prepare Scaffdog Inputs

Transform requirements into JSON format:

```json
{
  "name": "calculator",
  "description": "MCP server for mathematical calculations",
  "transportType": "stdio",
  "toolsJson": "[{\"name\":\"calculate-sum\",\"feature\":\"math\",\"description\":\"Calculates sum of numbers\"}]",
  "dependenciesJson": "[]"
}
```

### Step 3.2: Run Scaffdog

Execute generation command:

```bash
bun run scaffold:mcp-server '<json-string>'
```

This generates:

1. `packages/{name}-mcp/package.json`
2. `packages/{name}-mcp/src/index.ts`
3. `packages/{name}-mcp/src/tools/index.ts`
4. `packages/{name}-mcp/tsconfig.json`
5. `packages/{name}-mcp/.env.example`
6. `packages/{name}-mcp/Dockerfile`
7. `packages/{name}-mcp/docker-compose.yaml`
8. Tool files: `packages/{name}-mcp/src/tools/{feature}/{tool-name}.ts`
9. Test files: `packages/{name}-mcp/src/tools/{feature}/{tool-name}.test.ts`

### Step 3.3: Install Dependencies

```bash
bun install
```

### Step 3.4: Verify Generation

Check that all files exist:

```bash
ls -la packages/{name}-mcp/
ls -la packages/{name}-mcp/src/tools/
```

## Phase 4: Parallel Tool Development

**CRITICAL: Always spawn one general-purpose agent per tool for parallel implementation**

### Step 4.1: Prepare Agent Tasks

For each tool, create a detailed task description:

```
Implement the MCP tool: {tool-name}

Location: packages/{name}-mcp/src/tools/{feature}/{tool-name}.ts

Requirements:
- Read the OpenSpec at openspec/changes/add-{name}-mcp-server/specs/{name}-mcp/spec.md
- Implement the tool logic according to the specification
- Define Zod input schema with proper validation
- Add comprehensive error handling
- Return properly formatted MCP response
- Write unit tests in {tool-name}.test.ts
- Ensure zero TypeScript errors
- Ensure zero ESLint warnings
- Follow morph-ui code standards (no comments, no `any` types)

The tool should:
{specific requirements from spec}

Input parameters:
{list parameters with types}

Expected output:
{describe output format}

Error cases to handle:
{list error scenarios}

After implementation:
- Run `bun run check-types` - must pass
- Run `bun run lint` - must pass
- Run `bun run test` - must pass
- Simplify code where possible
```

### Step 4.2: Spawn Parallel Agents

Use the Task tool to spawn one general-purpose agent per tool. Create ONE message with MULTIPLE Task tool invocations to run agents in parallel.

For each tool, call Task with:

- `subagent_type`: "general-purpose"
- `description`: "Implement {tool-name} tool"
- `prompt`: The detailed task description from Step 4.1

Example: For 3 tools, send ONE message with THREE Task tool calls running in parallel.

### Step 4.3: Monitor Agent Progress

Agents will work autonomously. Each agent will:

1. Read the OpenSpec specification
2. Implement the tool logic
3. Add Zod validation schema
4. Write comprehensive tests
5. Run quality checks
6. Report completion or errors

### Step 4.4: Handle Agent Results

When agents complete:

- Review each tool implementation
- Check that all agents succeeded
- If any agent failed, address the issue and re-run that agent
- Verify all tools are registered in `src/index.ts`

## Phase 5: Integration & Verification

### Step 5.1: Review Tool Implementations

Read and verify each generated tool file:

```bash
cat packages/{name}-mcp/src/tools/{feature}/{tool-name}.ts
```

Check for:

- Proper Zod schema definition
- Error handling implementation
- MCP response format compliance
- No `any` types
- No comments (code should be self-documenting)

### Step 5.2: Verify Tool Registration

Read `packages/{name}-mcp/src/index.ts` and confirm:

- All tools are imported
- All tools are registered with the server
- Server configuration is correct for the transport type

### Step 5.3: Run Quality Checks

Execute all verification commands:

```bash
cd packages/{name}-mcp

# Format code
bun run format

# Type checking (must pass with zero errors)
bun run check-types

# Linting (must pass with zero warnings)
bun run lint

# Run tests (all must pass)
bun run test
```

**CRITICAL**: All checks must pass before proceeding. Fix any errors immediately.

### Step 5.4: Manual Server Testing

Test the server manually based on transport type:

**For STDIO:**

```bash
cd packages/{name}-mcp
bun run dev

# In another terminal, test with MCP client or inspector
```

**For Streamable HTTP:**

```bash
cd packages/{name}-mcp
bun run dev

# Test endpoints with curl
curl -X POST http://localhost:3000/tools/{tool-name} \
  -H "Content-Type: application/json" \
  -d '{"param1": "value"}'
```

### Step 5.5: Test Each Tool

For each tool:

1. Call with valid inputs - verify correct response
2. Call with invalid inputs - verify proper error handling
3. Call with edge cases - verify robustness
4. Verify response format matches MCP specification

### Step 5.6: Docker Verification

Test Docker containerization:

```bash
cd packages/{name}-mcp

# Build Docker image
docker build -t {name}-mcp .

# Test with docker-compose
docker-compose up

# Verify server starts successfully
# Test tool execution in container
```

### Step 5.7: Code Simplification

Review the entire implementation and simplify where possible:

- Remove unnecessary abstractions
- Inline single-use functions
- Remove defensive coding for impossible scenarios
- Eliminate redundant type checks
- Consolidate similar logic

**Rule**: Keep minimum complexity needed for current requirements. Don't design for hypothetical future needs.

### Step 5.8: Final Documentation

Generate or update:

- README.md with usage examples
- Tool documentation with input/output examples
- Troubleshooting guide for common issues
- Deployment instructions

## Success Criteria

Before marking the skill complete, verify:

**OpenSpec**:

- ✅ proposal.md exists and explains the "why"
- ✅ spec.md exists with detailed specifications
- ✅ tasks.md exists with implementation checklist
- ✅ `openspec validate --strict` passes

**Scaffolding**:

- ✅ All 7 core files generated
- ✅ Tool files created in correct structure
- ✅ package.json has correct dependencies
- ✅ TypeScript configuration extends base config

**Code Quality**:

- ✅ `bun run format` - All files formatted
- ✅ `bun run check-types` - Zero TypeScript errors
- ✅ `bun run lint` - Zero ESLint warnings
- ✅ `bun run test` - All tests passing
- ✅ No `any` types used
- ✅ No code comments (self-documenting code only)

**Tool Implementation**:

- ✅ Each tool has Zod input schema
- ✅ Each tool has error handling
- ✅ Each tool has unit tests
- ✅ All tools registered in index.ts
- ✅ All tools tested manually

**Docker**:

- ✅ Dockerfile builds successfully
- ✅ docker-compose.yaml configured correctly
- ✅ .env.example documents all variables
- ✅ Server runs in container

**Integration**:

- ✅ Server starts successfully
- ✅ All tools work end-to-end
- ✅ Error messages are clear and helpful
- ✅ Code is simplified where possible

## Reference Files

Consult these reference files for additional guidance:

- `references/transport-patterns.md` - STDIO vs Streamable HTTP examples
- `references/tool-development.md` - Tool implementation patterns
- `references/openspec-templates.md` - OpenSpec example templates
- `references/validation-checklist.md` - Detailed quality gates
- `references/troubleshooting.md` - Common issues and solutions

## Important Notes

### Agent Execution

**Always spawn parallel agents for tool implementation.** Even if there's only one tool, use the agent pattern for consistency. For multiple tools, spawn all agents in a SINGLE message with MULTIPLE Task tool calls.

### OpenSpec Workflow

Never skip the OpenSpec proposal phase. This creates a documentation trail and ensures architectural review before implementation.

### Code Standards

Follow morph-ui repository rules strictly:

- Zero tolerance for `any` types - use proper TypeScript types
- Zero tolerance for comments - code must be self-documenting
- All static analysis must pass (format, type-check, lint, test)
- Conventional commits when creating git commits

### Transport Types

**STDIO**: Use for local CLI integration, Claude Desktop, and simpler deployment scenarios.

**Streamable HTTP**: Use for web APIs, remote access, and when you need RESTful endpoints.

### MCP SDK Patterns

Follow official modelcontextprotocol.io documentation for:

- Server initialization
- Tool registration
- Input validation with Zod
- Response formatting
- Error handling

## Troubleshooting

If scaffdog generation fails:

1. Check that template syntax is valid
2. Verify JSON inputs are properly formatted
3. Check file system permissions

If agent implementation fails:

1. Review the agent's error message
2. Check OpenSpec specification is clear
3. Re-run failed agent with more detailed prompt
4. Consider implementing manually if agent struggles

If quality checks fail:

1. Fix errors immediately - don't proceed
2. Read error messages carefully
3. Consult references for patterns
4. Simplify complex logic

If server won't start:

1. Check environment variables are set
2. Verify dependencies are installed
3. Check TypeScript compilation succeeded
4. Review server logs for errors

## Completion

When all success criteria are met:

1. Present summary of what was created
2. Show how to run the server
3. Demonstrate testing a tool
4. Provide next steps for deployment

Do NOT mark the skill complete until ALL quality checks pass and ALL tools work correctly.
