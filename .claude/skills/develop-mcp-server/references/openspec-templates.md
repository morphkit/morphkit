# OpenSpec Templates for MCP Servers

This document provides template examples for creating OpenSpec proposals for MCP servers.

## Proposal Structure

Every MCP server OpenSpec proposal contains three files:

1. **proposal.md** - High-level overview (why, what, impact)
2. **specs/{server-name}-mcp/spec.md** - Detailed technical specification
3. **tasks.md** - Implementation checklist

## Template: proposal.md

```markdown
# Add {Server Name} MCP Server

## Why

{Explain the problem or need this MCP server addresses}

**Current State:**

- {Describe current limitations or pain points}
- {What's missing or inefficient}

**Desired State:**

- {How this MCP server solves the problem}
- {Benefits to users and developers}

## What

A Model Context Protocol server that provides {domain} functionality through {number} tools:

- **{tool-name-1}**: {brief description}
- **{tool-name-2}**: {brief description}
- **{tool-name-3}**: {brief description}

**Transport Type:** {STDIO | Streamable HTTP}

**Key Features:**

- {Feature 1}
- {Feature 2}
- {Feature 3}

## Impact

### Users

- {How end users benefit from this server}
- {New capabilities enabled}

### Developers

- {How developers benefit}
- {Integration possibilities}

### Architecture

- **Package Location:** `packages/{name}-mcp/`
- **Dependencies:** {major dependencies}
- **Integration Points:** {how it fits in the ecosystem}

## Alternatives Considered

### Alternative 1: {Name}

- **Description:** {What it is}
- **Rejected Because:** {Why it wasn't chosen}

### Alternative 2: {Name}

- **Description:** {What it is}
- **Rejected Because:** {Why it wasn't chosen}

## Implementation Approach

1. **Phase 1:** Generate server structure using scaffdog template
2. **Phase 2:** Implement {count} tools in parallel using dedicated agents
3. **Phase 3:** Add Docker containerization for deployment
4. **Phase 4:** Integrate with monorepo build system
5. **Phase 5:** Add comprehensive testing and documentation

**Estimated Complexity:** {Low | Medium | High}

**Risk Assessment:**

- {Risk 1 and mitigation}
- {Risk 2 and mitigation}

## Success Criteria

- All {count} tools implemented and tested
- Zero TypeScript errors and ESLint warnings
- All tests passing with adequate coverage
- Server runs successfully in both dev and production
- Docker container builds and runs
- Documentation complete with usage examples
```

## Template: specs/{name}-mcp/spec.md

```markdown
# {Server Name} MCP Server Specification

## Overview

{Detailed description of the server's purpose, capabilities, and use cases}

**Target Use Cases:**

1. {Use case 1}
2. {Use case 2}
3. {Use case 3}

## Architecture

### Transport: {STDIO | Streamable HTTP}

**Rationale:** {Explain why this transport type was chosen}

{For STDIO:}

- Used for local CLI integration and Claude Desktop
- Simpler setup with no port binding required
- Process-to-process communication

{For Streamable HTTP:}

- Enables remote access and web API integration
- Supports standard HTTP tooling
- Allows horizontal scaling and load balancing

### Package Structure

\`\`\`
packages/{name}-mcp/
├── src/
│ ├── index.ts # Server entry point and tool registration
│ ├── tools/
│ │ ├── {feature-1}/
│ │ │ ├── {tool-1}.ts
│ │ │ ├── {tool-1}.test.ts
│ │ │ ├── {tool-2}.ts
│ │ │ └── {tool-2}.test.ts
│ │ ├── {feature-2}/
│ │ │ ├── {tool-3}.ts
│ │ │ └── {tool-3}.test.ts
│ │ └── index.ts # Tool exports
│ ├── types.ts # Shared TypeScript types
│ └── utils.ts # Shared utilities
├── package.json
├── tsconfig.json
├── .env.example
├── Dockerfile
├── docker-compose.yaml
└── README.md
\`\`\`

### Technology Stack

- **Runtime:** Node.js 20+
- **Language:** TypeScript 5.9.2
- **MCP SDK:** @modelcontextprotocol/sdk ^1.0.0
- **Validation:** Zod ^3.23.8
- **Testing:** Jest 30.2.0
  {For HTTP:}
- **Web Framework:** Express ^4.19.2
- **CORS:** cors ^2.8.5

## Tools

### Tool 1: {tool-name}

**Name:** `{tool-name}`

**Description:** {Detailed description of what this tool does and when to use it}

**Input Schema:**
\`\`\`typescript
{
param1: string; // {description}
param2: number; // {description}
param3?: boolean; // {description} (optional)
options?: {
setting1: string; // {description}
setting2: number; // {description}
};
}
\`\`\`

**Output Format:**
\`\`\`json
{
"status": "success",
"data": {
"result": "...",
"metadata": {
"timestamp": "2024-01-01T00:00:00Z",
"count": 42
}
}
}
\`\`\`

**Error Handling:**

- **InvalidInput:** When parameters fail validation
- **NotFound:** When requested resource doesn't exist
- **RateLimitExceeded:** When rate limit is hit
- **ExternalAPIError:** When external API call fails
- **Timeout:** When operation exceeds time limit

**Example Usage:**
\`\`\`json
{
"name": "{tool-name}",
"arguments": {
"param1": "example",
"param2": 42,
"options": {
"setting1": "value"
}
}
}
\`\`\`

**Example Response:**
\`\`\`json
{
"content": [
{
"type": "text",
"text": "{formatted result}"
}
]
}
\`\`\`

**Edge Cases:**

1. {Edge case 1 and how it's handled}
2. {Edge case 2 and how it's handled}
3. {Edge case 3 and how it's handled}

**Performance Considerations:**

- {Caching strategy if applicable}
- {Rate limiting approach}
- {Timeout configuration}

---

{Repeat Tool section for each tool}

---

## Dependencies

### Core Dependencies

- **@modelcontextprotocol/sdk** (^1.0.0): Core MCP protocol implementation
- **zod** (^3.23.8): Runtime type validation and schema definition
- **dotenv** (^16.4.5): Environment variable management

{For HTTP Transport:}

### HTTP Transport Dependencies

- **express** (^4.19.2): Web framework for HTTP endpoints
- **cors** (^2.8.5): Cross-origin resource sharing middleware

### External Service Dependencies

- **{service-name}** ({version}): {purpose and usage}
- **{service-name}** ({version}): {purpose and usage}

### Development Dependencies

- **@morph-ui/typescript-config**: Shared TypeScript configuration
- **@morph-ui/eslint-config**: Shared ESLint rules
- **typescript** (~5.9.2): TypeScript compiler
- **tsx** (^4.0.0): TypeScript execution for development
- **jest** (^30.2.0): Testing framework

## Environment Variables

### Required Variables

**{VAR_NAME}**

- **Type:** string
- **Description:** {Detailed description}
- **Example:** `{example-value}`
- **Validation:** {How it's validated}

**{VAR_NAME_2}**

- **Type:** number
- **Description:** {Detailed description}
- **Default:** `{default-value}`

### Optional Variables

{For HTTP:}
**PORT**

- **Type:** number
- **Description:** Server port for HTTP transport
- **Default:** `3000`

**NODE_ENV**

- **Type:** enum("development", "production", "test")
- **Description:** Environment mode
- **Default:** `"development"`

## Testing Strategy

### Unit Tests

- Each tool has dedicated test file: `{tool-name}.test.ts`
- Test successful execution with valid inputs
- Test error handling with invalid inputs
- Test edge cases and boundary conditions
- Mock external dependencies for isolation

### Integration Tests

- Test server initialization and startup
- Test tool registration
- Test end-to-end tool execution
- Test error propagation

### Test Coverage Goals

- **Statements:** 80%+
- **Branches:** 75%+
- **Functions:** 80%+
- **Lines:** 80%+

### Mocking Strategy

- Mock external API calls using jest.mock()
- Mock file system operations
- Mock database connections
- Use test fixtures for consistent data

## Security Considerations

### API Key Management

- All API keys stored in environment variables
- Never commit secrets to version control
- Use .env.example for documentation only
- Validate presence of required keys at startup

### Input Validation

- All inputs validated using Zod schemas
- Strict type checking enforced
- Sanitize error messages to prevent information leakage
- Validate URLs to prevent SSRF attacks

### Rate Limiting

{If applicable:}

- Implement rate limiting per {client/IP/user}
- Limit: {X requests per Y timeframe}
- Return clear error when limit exceeded

### Error Handling

- Catch all errors and return formatted responses
- Don't expose internal implementation details
- Log errors with sufficient context for debugging
- Use structured error codes

### CORS Configuration

{For HTTP:}

- Allow specific origins only
- Don't use wildcard (\*) in production
- Configure allowed methods and headers

## Deployment

### Local Development

\`\`\`bash

# Install dependencies

cd packages/{name}-mcp
bun install

# Set up environment

cp .env.example .env

# Edit .env with your values

# Run in development mode

bun run dev
\`\`\`

### Production Deployment

#### Docker Container

\`\`\`bash

# Build image

docker build -t {name}-mcp .

# Run with docker-compose

docker-compose up -d

# Check logs

docker-compose logs -f
\`\`\`

#### Direct Execution

\`\`\`bash

# Build TypeScript

bun run build

# Set production environment

export NODE_ENV=production

# Run server

{For STDIO:}
node dist/index.js

{For HTTP:}
node dist/index.js

# Server will listen on PORT (default 3000)

\`\`\`

### Health Checks

{For HTTP:}

- **Endpoint:** `GET /health`
- **Response:** `{"status": "healthy", "server": "{name}-mcp"}`
- **Use:** Load balancer health checks, monitoring

### Monitoring

- Log all tool executions with timing
- Track error rates by tool and error type
- Monitor external API response times
- Alert on rate limit thresholds

## Integration

### Claude Desktop Integration

{For STDIO:}

Add to Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

\`\`\`json
{
"mcpServers": {
"{name}": {
"command": "node",
"args": ["/path/to/packages/{name}-mcp/dist/index.js"],
"env": {
"{VAR_NAME}": "value"
}
}
}
}
\`\`\`

### HTTP API Integration

{For HTTP:}

\`\`\`bash

# Call tool via HTTP

curl -X POST http://localhost:3000/mcp/v1/tools/{tool-name} \\
-H "Content-Type: application/json" \\
-d '{
"param1": "value",
"param2": 42
}'
\`\`\`

### SDK Integration

\`\`\`typescript
import { McpClient } from "@modelcontextprotocol/sdk/client/index.js";

const client = new McpClient({
name: "my-client",
version: "1.0.0",
});

await client.connect(transport);

const result = await client.callTool("{tool-name}", {
param1: "value",
param2: 42,
});
\`\`\`

## Performance Benchmarks

### Expected Performance

- **Tool execution time:** {X}ms average
- **Concurrent requests:** {Y} per second
- **Memory usage:** {Z}MB average
- **Startup time:** {W}ms

### Optimization Strategies

1. {Optimization 1}
2. {Optimization 2}
3. {Optimization 3}

## Maintenance

### Logging

- Log level configurable via LOG_LEVEL env var
- Structured JSON logging for production
- Human-readable logs for development
- Include request IDs for tracing

### Versioning

- Follow Semantic Versioning (semver)
- Document breaking changes in CHANGELOG
- Maintain backward compatibility when possible
- Provide migration guides for major versions

### Updates

- Keep dependencies updated monthly
- Test thoroughly before deploying updates
- Document any configuration changes
- Notify users of breaking changes

## Success Criteria

### Functional Requirements

- ✅ All {count} tools implemented and working
- ✅ Input validation working for all tools
- ✅ Error handling comprehensive and clear
- ✅ MCP protocol compliance verified

### Quality Requirements

- ✅ Zero TypeScript errors
- ✅ Zero ESLint warnings
- ✅ All tests passing
- ✅ Test coverage meets goals (80%+)
- ✅ No `any` types used
- ✅ No code comments (self-documenting)

### Operational Requirements

- ✅ Server starts successfully in dev mode
- ✅ Server starts successfully in production mode
- ✅ Docker container builds without errors
- ✅ Docker container runs successfully
- ✅ Environment variables documented
- ✅ README with usage examples complete

### Performance Requirements

- ✅ Tool execution under {X}ms for 95th percentile
- ✅ Memory usage stable under load
- ✅ No memory leaks detected
- ✅ Handles {Y} concurrent requests

## Future Enhancements

### Phase 2 Considerations

- {Potential feature 1}
- {Potential feature 2}
- {Potential feature 3}

### Not In Scope (Current Version)

- {Feature explicitly excluded}
- {Feature deferred to later}
- {Feature deemed unnecessary}
```

## Template: tasks.md

```markdown
# Implementation Tasks: {Server Name} MCP Server

## Phase 1: Project Setup

### Scaffolding

- [ ] Create OpenSpec proposal directory: `openspec/changes/add-{name}-mcp-server/`
- [ ] Write proposal.md
- [ ] Write specs/{name}-mcp/spec.md
- [ ] Write tasks.md (this file)
- [ ] Run `openspec validate --strict`
- [ ] Get user approval on proposal

### Generate Server Structure

- [ ] Prepare scaffdog input JSON with all tool definitions
- [ ] Run `bun run scaffold:mcp-server '<json>'`
- [ ] Verify all 7 core files generated:
  - [ ] package.json
  - [ ] src/index.ts
  - [ ] src/tools/index.ts
  - [ ] tsconfig.json
  - [ ] .env.example
  - [ ] Dockerfile
  - [ ] docker-compose.yaml
- [ ] Verify tool files generated for all {count} tools
- [ ] Install dependencies: `bun install`

## Phase 2: Server Configuration

### Transport Setup

- [ ] {For STDIO} Configure StdioServerTransport in src/index.ts
- [ ] {For HTTP} Configure Express app with routes
- [ ] Set up environment variable loading with dotenv
- [ ] Add environment variable validation
- [ ] Configure error handling middleware
- [ ] Add logging setup (development vs production)
- [ ] {For HTTP} Add CORS configuration
- [ ] {For HTTP} Add health check endpoint

### Type Definitions

- [ ] Create src/types.ts for shared types
- [ ] Define tool input types
- [ ] Define tool output types
- [ ] Define error types
- [ ] Export all types for reuse

## Phase 3: Tool Implementation

**Strategy:** Spawn one general-purpose agent per tool for parallel implementation

### Tool: {tool-name-1}

- [ ] Define Zod input schema in `src/tools/{feature}/{tool-name-1}.ts`
- [ ] Implement core tool logic
- [ ] Add input validation
- [ ] Add error handling for all edge cases:
  - [ ] Invalid input
  - [ ] External API errors
  - [ ] Timeout errors
  - [ ] Rate limit errors
- [ ] Format response according to MCP spec
- [ ] Write unit tests in `{tool-name-1}.test.ts`:
  - [ ] Test successful execution
  - [ ] Test invalid input handling
  - [ ] Test error scenarios
  - [ ] Test edge cases
- [ ] Register tool in src/index.ts
- [ ] Verify: `bun run check-types` passes
- [ ] Verify: `bun run lint` passes
- [ ] Verify: `bun run test` passes

{Repeat for each tool}

### Tool Integration

- [ ] Import all tools in src/tools/index.ts
- [ ] Register all tools in src/index.ts
- [ ] Verify no naming conflicts
- [ ] Test tool list endpoint {For HTTP}

## Phase 4: Testing

### Unit Testing

- [ ] Verify all tool files have corresponding .test.ts files
- [ ] Run all tests: `bun run test`
- [ ] Check coverage report
- [ ] Add tests for missed branches
- [ ] Mock all external dependencies
- [ ] Test error paths thoroughly

### Integration Testing

- [ ] Test server initialization
- [ ] Test tool registration
- [ ] {For STDIO} Test with MCP Inspector
- [ ] {For HTTP} Test all HTTP endpoints with curl
- [ ] Test each tool with valid inputs
- [ ] Test each tool with invalid inputs
- [ ] Test concurrent tool execution
- [ ] Verify error responses are formatted correctly

### Manual Testing Scenarios

- [ ] Scenario 1: {Describe test scenario}
  - [ ] Setup: {prerequisites}
  - [ ] Execute: {actions}
  - [ ] Verify: {expected results}
- [ ] Scenario 2: {Describe test scenario}
  - [ ] Setup: {prerequisites}
  - [ ] Execute: {actions}
  - [ ] Verify: {expected results}

{Add more scenarios as needed}

## Phase 5: Docker Setup

### Dockerfile

- [ ] Verify multi-stage build configuration
- [ ] Test build: `docker build -t {name}-mcp .`
- [ ] Check image size is reasonable
- [ ] Verify all dependencies included
- [ ] Test image runs: `docker run {name}-mcp`

### Docker Compose

- [ ] Verify docker-compose.yaml configuration
- [ ] Add all required environment variables
- [ ] {For HTTP} Configure port mapping
- [ ] Add volume mounts if needed
- [ ] Test: `docker-compose up`
- [ ] Verify server starts in container
- [ ] Test tool execution in containerized environment
- [ ] Check logs: `docker-compose logs`

### Container Testing

- [ ] Test with environment variables from .env
- [ ] Test with inline environment variables
- [ ] Verify graceful shutdown
- [ ] Test container restart behavior
- [ ] {For HTTP} Test health check endpoint

## Phase 6: Documentation

### README.md

- [ ] Write project overview
- [ ] Document installation steps
- [ ] Add usage examples for each tool
- [ ] Document environment variables
- [ ] Add development setup instructions
- [ ] Add production deployment guide
- [ ] Include Docker instructions
- [ ] Add troubleshooting section

### .env.example

- [ ] Document all required environment variables
- [ ] Add descriptions for each variable
- [ ] Provide example values
- [ ] Add validation notes
- [ ] Group related variables

### API Documentation

- [ ] {For HTTP} Document all HTTP endpoints
- [ ] {For HTTP} Provide curl examples
- [ ] {For HTTP} Document response formats
- [ ] Document error codes and messages
- [ ] Add rate limiting information

## Phase 7: Quality Checks

### Code Quality

- [ ] Run Prettier: `bun run format`
- [ ] Verify formatting applied correctly
- [ ] Run TypeScript compiler: `bun run check-types`
- [ ] Fix all TypeScript errors (zero tolerance)
- [ ] Run ESLint: `bun run lint`
- [ ] Fix all lint warnings (zero tolerance)
- [ ] Remove all `any` types
- [ ] Remove all code comments
- [ ] Verify code is self-documenting

### Testing

- [ ] Run full test suite: `bun run test`
- [ ] Verify all tests passing (zero tolerance for failures)
- [ ] Check test coverage meets goals
- [ ] Add tests for uncovered code
- [ ] Verify no skipped or disabled tests

### Code Review

- [ ] Review all tool implementations
- [ ] Check error handling is comprehensive
- [ ] Verify input validation is strict
- [ ] Check for security issues
- [ ] Look for performance bottlenecks
- [ ] Identify unnecessary complexity
- [ ] Simplify where possible

## Phase 8: Final Validation

### Functional Testing

- [ ] Start server in development mode
- [ ] Test each tool manually with valid inputs
- [ ] Test each tool with invalid inputs
- [ ] Verify error messages are clear and helpful
- [ ] Test edge cases for each tool
- [ ] {For HTTP} Test CORS configuration
- [ ] {For HTTP} Verify health check works

### Performance Testing

- [ ] Measure tool execution times
- [ ] Test with concurrent requests
- [ ] Monitor memory usage under load
- [ ] Check for memory leaks
- [ ] Verify startup time is acceptable
- [ ] Profile slow operations

### Production Readiness

- [ ] Build production bundle: `bun run build`
- [ ] Test production mode
- [ ] Verify environment variable validation
- [ ] Test graceful error handling
- [ ] Check logging output
- [ ] Verify secrets not logged

### Docker Verification

- [ ] Build final Docker image
- [ ] Test image size is acceptable
- [ ] Run container in production mode
- [ ] Test all tools work in container
- [ ] Verify environment variable injection
- [ ] Test container health and restart

### Documentation Review

- [ ] README is complete and accurate
- [ ] All examples work as documented
- [ ] .env.example is up to date
- [ ] Troubleshooting section is helpful
- [ ] No outdated information

## Phase 9: Deployment Preparation

### Pre-Deployment Checklist

- [ ] All quality checks passing
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Docker container working
- [ ] Environment variables documented
- [ ] Security review completed
- [ ] Performance acceptable

### Deployment Steps

- [ ] Tag release version
- [ ] Build production Docker image
- [ ] Push image to registry (if applicable)
- [ ] Update deployment configuration
- [ ] Deploy to environment
- [ ] Verify deployment successful
- [ ] Run smoke tests
- [ ] Monitor for errors

## Completion Criteria

**Before marking this implementation complete, verify:**

✅ All {count} tools implemented and working
✅ OpenSpec proposal approved and archived
✅ Zero TypeScript errors
✅ Zero ESLint warnings
✅ All tests passing
✅ No `any` types in codebase
✅ No code comments (self-documenting)
✅ Docker container builds and runs
✅ Documentation complete with examples
✅ Manual testing successful
✅ Performance benchmarks met
✅ Security review completed
✅ Code simplified where possible

**Do not proceed to deployment until ALL criteria are met.**
```

## Usage Tips

1. **Replace placeholders** - All `{placeholder}` text should be replaced with actual values
2. **Customize for context** - Adapt templates to specific server requirements
3. **Be specific** - Provide concrete examples and detailed explanations
4. **Keep consistent** - Use the same terminology throughout all three files
5. **Stay focused** - Don't add unnecessary features or complexity
6. **Think ahead** - Consider edge cases and error scenarios
7. **Document decisions** - Explain why choices were made

**Note:** The templates use generic placeholders like `{tool-name}`, `{feature}`, and `{server-name}`. Replace these with your actual server-specific values (e.g., calculator, database, api-client, etc.).
