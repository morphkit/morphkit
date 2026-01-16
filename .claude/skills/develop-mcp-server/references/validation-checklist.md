# MCP Server Validation Checklist

This document provides comprehensive quality gates for MCP server development. **All checks must pass before marking implementation complete.**

## OpenSpec Validation

### Proposal Files

- [ ] **proposal.md exists** at `openspec/changes/add-{name}-mcp-server/proposal.md`
- [ ] **spec.md exists** at `openspec/changes/add-{name}-mcp-server/specs/{name}-mcp/spec.md`
- [ ] **tasks.md exists** at `openspec/changes/add-{name}-mcp-server/tasks.md`

### Proposal Content Quality

- [ ] **Why section** clearly explains the problem being solved
- [ ] **What section** lists all tools with descriptions
- [ ] **Impact section** describes user and developer benefits
- [ ] **Alternatives** section considers at least 2 alternatives
- [ ] **Implementation approach** is clear and actionable

### Spec Content Quality

- [ ] **Architecture section** explains transport choice
- [ ] **Package structure** diagram is accurate
- [ ] **Each tool** has detailed specification including:
  - [ ] Input schema with TypeScript types
  - [ ] Output format with examples
  - [ ] Error handling scenarios
  - [ ] Example usage
  - [ ] Edge cases documented
- [ ] **Dependencies** section lists all packages with versions
- [ ] **Environment variables** section documents all required vars
- [ ] **Testing strategy** is comprehensive
- [ ] **Security considerations** are addressed
- [ ] **Deployment instructions** are clear

### OpenSpec Validation Command

- [ ] **`openspec validate --strict`** passes with no errors
- [ ] All required sections present
- [ ] No broken links or references
- [ ] Markdown formatting is correct

### User Approval

- [ ] **User has explicitly approved** the OpenSpec proposal
- [ ] No implementation started before approval
- [ ] Any requested changes incorporated

## File Structure Validation

### Required Core Files

- [ ] **`package.json`** exists at `packages/{name}-mcp/package.json`
- [ ] **`src/index.ts`** exists at `packages/{name}-mcp/src/index.ts`
- [ ] **`src/tools/index.ts`** exists
- [ ] **`tsconfig.json`** exists and extends base config
- [ ] **`.env.example`** exists with all variables documented
- [ ] **`Dockerfile`** exists with multi-stage build
- [ ] **`docker-compose.yaml`** exists with correct configuration

### Tool Files

For each tool `{tool-name}` in feature `{feature}`:

- [ ] **Implementation file** exists: `src/tools/{feature}/{tool-name}.ts`
- [ ] **Test file** exists: `src/tools/{feature}/{tool-name}.test.ts`
- [ ] **Exported** from `src/tools/index.ts`
- [ ] **Registered** in `src/index.ts`

### Directory Structure

```
packages/{name}-mcp/
├── src/
│   ├── index.ts              ✅
│   ├── tools/
│   │   ├── {feature}/
│   │   │   ├── {tool}.ts     ✅
│   │   │   └── {tool}.test.ts ✅
│   │   └── index.ts          ✅
├── package.json              ✅
├── tsconfig.json             ✅
├── .env.example              ✅
├── Dockerfile                ✅
└── docker-compose.yaml       ✅
```

## Code Quality Validation

### TypeScript Requirements

- [ ] **`bun run check-types`** passes with zero errors
- [ ] **No `any` types** used anywhere in codebase
- [ ] **Strict mode enabled** in tsconfig.json
- [ ] **All imports** use proper TypeScript types
- [ ] **Type inference** used where appropriate
- [ ] **Generic types** used for reusable code
- [ ] **Zod schemas** defined for all tool inputs

### ESLint Requirements

- [ ] **`bun run lint`** passes with zero warnings
- [ ] **`--max-warnings 0`** flag enforced
- [ ] **No disabled rules** in code
- [ ] **No eslint-disable comments** used
- [ ] **All rules passing** without exceptions

### Prettier Requirements

- [ ] **`bun run format`** applied to all files
- [ ] **Consistent indentation** (2 spaces)
- [ ] **Consistent quotes** (double quotes for strings)
- [ ] **Trailing commas** where valid
- [ ] **Line length** reasonable (no excessive wrapping)

### Code Style Requirements

- [ ] **Zero code comments** - code is self-documenting
- [ ] **Clear function names** that describe purpose
- [ ] **Clear variable names** that describe content
- [ ] **Small focused functions** (single responsibility)
- [ ] **No magic numbers** - use named constants
- [ ] **No nested ternaries** - use if-else instead
- [ ] **Error messages** are clear and actionable

### Code Simplicity

- [ ] **No unnecessary abstractions**
- [ ] **No single-use helper functions** (inline instead)
- [ ] **No premature optimization**
- [ ] **No hypothetical future features**
- [ ] **Minimum complexity** for current requirements
- [ ] **No defensive coding** for impossible scenarios

## Tool Implementation Validation

### For Each Tool

#### Input Schema

- [ ] **Zod schema defined** with proper types
- [ ] **All parameters** have descriptions in spec
- [ ] **Optional parameters** marked with `.optional()`
- [ ] **Default values** provided where appropriate
- [ ] **Validation rules** applied (min, max, regex, etc.)
- [ ] **Type inference** used: `type Input = z.infer<typeof schema>`

#### Tool Registration

- [ ] **Tool registered** with `server.registerTool()`
- [ ] **Tool name** matches specification
- [ ] **Description** is clear and concise
- [ ] **Input schema** passed to registration
- [ ] **Handler function** is async
- [ ] **Tool listed** in `server.listTools()` output

#### Implementation Logic

- [ ] **Input validation** using `schema.parse(input)`
- [ ] **Error handling** with try-catch blocks
- [ ] **All edge cases** handled from spec
- [ ] **External calls** have timeouts
- [ ] **Responses formatted** according to MCP spec
- [ ] **Error responses** use `isError: true`

#### Error Handling

- [ ] **Validation errors** caught and formatted
- [ ] **External API errors** caught and handled
- [ ] **Timeout errors** caught and reported
- [ ] **Rate limit errors** caught and handled
- [ ] **Unknown errors** caught with fallback message
- [ ] **Error messages** don't expose sensitive data

#### Response Format

- [ ] **Response structure** matches MCP spec
- [ ] **Content array** present with at least one item
- [ ] **Content type** is "text"
- [ ] **Text content** is string (not object)
- [ ] **JSON responses** are stringified with `JSON.stringify()`
- [ ] **Pretty printing** used: `JSON.stringify(data, null, 2)`

## Testing Validation

### Test Files

- [ ] **Every tool** has corresponding `.test.ts` file
- [ ] **Test imports** use correct paths
- [ ] **Test setup** includes server initialization
- [ ] **Test cleanup** performed in afterEach
- [ ] **No skipped tests** (no `.skip()` calls)
- [ ] **No focused tests** (no `.only()` calls)

### Test Coverage

- [ ] **`bun run test`** passes with all tests green
- [ ] **Zero test failures** (zero tolerance)
- [ ] **Statements coverage** ≥ 80%
- [ ] **Branches coverage** ≥ 75%
- [ ] **Functions coverage** ≥ 80%
- [ ] **Lines coverage** ≥ 80%

### Test Scenarios

For each tool, tests cover:

- [ ] **Happy path** - valid input, successful execution
- [ ] **Invalid input** - validation errors handled
- [ ] **Missing required fields** - proper error message
- [ ] **Invalid types** - type validation works
- [ ] **Edge cases** - boundary conditions tested
- [ ] **External API failure** - mocked and handled
- [ ] **Timeout scenarios** - timeout handling works
- [ ] **Empty results** - handled gracefully

### Mocking

- [ ] **External dependencies** are mocked
- [ ] **API calls** use jest.mock()
- [ ] **File system** operations mocked (if used)
- [ ] **Database calls** mocked (if used)
- [ ] **Environment variables** mocked in tests
- [ ] **Mocks reset** between tests

## Server Configuration Validation

### Package.json

- [ ] **Name** follows pattern: `@morph-ui/{name}-mcp`
- [ ] **Version** starts at `0.1.0`
- [ ] **Type** is `"module"` (ESM)
- [ ] **Main** points to `"./dist/index.js"`
- [ ] **Scripts** include:
  - [ ] `build`: TypeScript compilation
  - [ ] `dev`: Development mode
  - [ ] `lint`: ESLint execution
  - [ ] `check-types`: TypeScript type checking
  - [ ] `test`: Jest test execution
- [ ] **Dependencies** include:
  - [ ] `@modelcontextprotocol/sdk`: ^1.0.0
  - [ ] `zod`: ^3.23.8
  - [ ] `dotenv`: ^16.4.5
  - [ ] (For HTTP) `express`: ^4.19.2
  - [ ] (For HTTP) `cors`: ^2.8.5
- [ ] **DevDependencies** include:
  - [ ] `@morph-ui/typescript-config`
  - [ ] `@morph-ui/eslint-config`
  - [ ] `typescript`: ~5.9.2
  - [ ] `tsx`: ^4.0.0
  - [ ] `jest`: ^30.2.0

### TypeScript Configuration

- [ ] **Extends** `@morph-ui/typescript-config/base.json`
- [ ] **Include** covers `src/**/*`
- [ ] **OutDir** is `dist`
- [ ] **Module** is `ESNext` or `NodeNext`
- [ ] **ModuleResolution** is `bundler` or `node16`
- [ ] **Strict** mode enabled

### Environment Configuration

- [ ] **`.env.example`** documents all variables
- [ ] **Each variable** has description comment
- [ ] **Required variables** clearly marked
- [ ] **Example values** provided (non-sensitive)
- [ ] **No actual secrets** in .env.example
- [ ] **dotenv.config()** called in index.ts

### Server Initialization

For STDIO:

- [ ] **McpServer** created with name and version
- [ ] **StdioServerTransport** instantiated
- [ ] **server.connect()** called with transport
- [ ] **Error handling** for startup failures
- [ ] **Logging** uses console.error (not console.log)

For Streamable HTTP:

- [ ] **Express app** created
- [ ] **CORS middleware** configured
- [ ] **JSON body parser** added
- [ ] **MCP routes** configured
- [ ] **Health check** endpoint added
- [ ] **PORT** from environment or default 3000
- [ ] **Server listens** on configured port
- [ ] **Startup logging** included

## Docker Validation

### Dockerfile

- [ ] **Multi-stage build** pattern used
- [ ] **Builder stage** uses Node 20
- [ ] **Bun installed** in builder stage
- [ ] **Dependencies installed** with frozen lockfile
- [ ] **TypeScript built** in builder stage
- [ ] **Runtime stage** uses Node 20 slim/alpine
- [ ] **Only necessary files** copied to runtime
- [ ] **Working directory** set to `/app`
- [ ] **(For HTTP) Port exposed** (e.g., 3000)
- [ ] **CMD** starts the server

### Build Verification

- [ ] **`docker build -t {name}-mcp .`** succeeds
- [ ] **Build output** shows no errors
- [ ] **Image size** is reasonable (< 500MB)
- [ ] **All layers** cached correctly on rebuild

### Docker Compose

- [ ] **Service name** matches server name
- [ ] **Build context** is `.`
- [ ] **Container name** specified
- [ ] **env_file** points to `.env`
- [ ] **(For HTTP) Ports mapped** correctly
- [ ] **Restart policy** set to `unless-stopped`
- [ ] **(For STDIO) stdin_open** and **tty** enabled
- [ ] **(For HTTP) Health check** configured (optional)

### Container Testing

- [ ] **`docker-compose up`** starts successfully
- [ ] **Container logs** show no errors
- [ ] **Server starts** inside container
- [ ] **Environment variables** loaded correctly
- [ ] **Tools work** when called in container
- [ ] **Container stops** gracefully with Ctrl+C

## Integration Validation

### Server Startup

- [ ] **Development mode** starts: `bun run dev`
- [ ] **No startup errors** logged
- [ ] **Port binding** successful (for HTTP)
- [ ] **All tools registered** on startup
- [ ] **Server ready** message displayed

### Tool Execution

For STDIO:

- [ ] **Test with MCP Inspector**: `npx @modelcontextprotocol/inspector node dist/index.js`
- [ ] **All tools listed** in inspector
- [ ] **Tools execute** successfully with valid input
- [ ] **Errors formatted** correctly for invalid input

For Streamable HTTP:

- [ ] **Health check** responds: `curl http://localhost:3000/health`
- [ ] **Tool execution** via POST works
- [ ] **CORS headers** present in response
- [ ] **Error responses** have proper status codes
- [ ] **Response format** matches MCP spec

### End-to-End Testing

- [ ] **Each tool** tested with valid input
- [ ] **Each tool** tested with invalid input
- [ ] **Concurrent requests** handled correctly
- [ ] **Error propagation** works properly
- [ ] **Timeouts** trigger correctly
- [ ] **Rate limiting** works (if implemented)

## Security Validation

### Input Validation

- [ ] **All inputs** validated with Zod schemas
- [ ] **No raw input** used without validation
- [ ] **Type coercion** explicit and intentional
- [ ] **Regex validation** for patterns
- [ ] **URL validation** for external calls
- [ ] **File path validation** for filesystem access

### Secret Management

- [ ] **No hardcoded secrets** in code
- [ ] **All secrets** from environment variables
- [ ] **`.env` in `.gitignore`**
- [ ] **`.env.example` has no real secrets**
- [ ] **Secrets not logged** anywhere

### Error Messages

- [ ] **No stack traces** exposed to clients
- [ ] **No internal paths** in error messages
- [ ] **No database details** in errors
- [ ] **No API keys** in error messages
- [ ] **Generic messages** for sensitive errors

### Dependencies

- [ ] **All dependencies** have specific versions
- [ ] **No `*` or `latest`** version specifiers
- [ ] **Dependencies** from trusted sources
- [ ] **No deprecated** packages
- [ ] **Security vulnerabilities** checked: `bun audit`

## Documentation Validation

### README.md

- [ ] **Overview** section explains purpose
- [ ] **Installation** section with step-by-step
- [ ] **Configuration** section for environment vars
- [ ] **Usage** section with examples
- [ ] **Development** section for contributors
- [ ] **Docker** section for containerization
- [ ] **Troubleshooting** section for common issues
- [ ] **All code examples** are correct and tested

### .env.example

- [ ] **All variables** documented
- [ ] **Comments** explain each variable
- [ ] **Required vs optional** clearly marked
- [ ] **Example values** provided
- [ ] **No sensitive data** included

### Inline Documentation

- [ ] **No comments** in implementation code
- [ ] **Function names** are self-explanatory
- [ ] **Variable names** are descriptive
- [ ] **Type annotations** serve as documentation
- [ ] **Complex logic** extracted to named functions

## Performance Validation

### Tool Execution Time

- [ ] **95th percentile** under acceptable threshold
- [ ] **No operations** block event loop excessively
- [ ] **External calls** have reasonable timeouts
- [ ] **No infinite loops** or recursive calls
- [ ] **Database queries** optimized (if applicable)

### Memory Usage

- [ ] **Memory stable** under load
- [ ] **No memory leaks** detected
- [ ] **Large responses** handled efficiently
- [ ] **Connections closed** properly
- [ ] **No global state accumulation**

### Startup Time

- [ ] **Server starts** in reasonable time (< 5s)
- [ ] **Dependencies loaded** efficiently
- [ ] **No unnecessary work** on startup
- [ ] **Lazy loading** used where appropriate

## Completion Checklist

Before marking implementation complete, verify **ALL** of the following:

### OpenSpec

✅ proposal.md, spec.md, tasks.md exist
✅ `openspec validate --strict` passes
✅ User explicitly approved proposal

### Code Quality

✅ `bun run format` - all files formatted
✅ `bun run check-types` - zero TypeScript errors
✅ `bun run lint` - zero ESLint warnings
✅ No `any` types anywhere
✅ No code comments (self-documenting)
✅ Code simplified where possible

### Testing

✅ `bun run test` - all tests passing
✅ Zero test failures (zero tolerance)
✅ Coverage meets goals (80%+)
✅ All edge cases tested
✅ External dependencies mocked

### Implementation

✅ All tools implemented per spec
✅ Input validation with Zod
✅ Comprehensive error handling
✅ MCP response format compliance
✅ All tools registered

### Docker

✅ Dockerfile builds successfully
✅ docker-compose starts successfully
✅ Container runs server correctly
✅ Environment variables work
✅ Tools execute in container

### Integration

✅ Server starts in dev mode
✅ Server starts in production mode
✅ All tools work end-to-end
✅ Error handling works correctly
✅ Performance acceptable

### Documentation

✅ README complete with examples
✅ .env.example documents all variables
✅ All examples tested and working
✅ Troubleshooting section helpful

### Security

✅ No secrets in code
✅ Input validation comprehensive
✅ Error messages don't leak info
✅ Dependencies secure

**DO NOT mark complete until every checkbox is ✅**
