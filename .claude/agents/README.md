# Component Creation Agents & Skills

This directory contains specialized agents and skills for creating React Native components in the morph-ui component library.

## Architecture Overview

The component creation workflow is split into four pieces for maximum parallelization and flexibility:

### Skills (Main Conversation Context)

- **spec-component**: Creates OpenSpec proposals with Figma integration
- **develop-component**: Implements components from approved proposals

### Agents (Isolated Context)

- **component-spec-writer**: Agent version of spec-component for autonomous operation
- **component-developer**: Agent version of develop-component for autonomous operation

## When to Use What

### Use Skills (spec-component, develop-component) when:

- Working on 1-2 components sequentially
- Want shared context with main conversation
- Prefer interactive Q&A during development
- Quick iteration and feedback

### Use Agents (component-spec-writer, component-developer) when:

- Creating 5-10+ proposals in parallel
- Implementing 5-10+ components simultaneously
- Want isolated context (keep verbose output separate)
- Fully autonomous execution

## Usage Examples

### Sequential Workflow (Skills)

Create a single component from start to finish in the main conversation:

```
User: Create a proposal for a Tooltip component with 2 variants (light, dark) and 3 positions (top, bottom, left)

Claude: [Uses spec-component skill]
✅ OpenSpec Proposal Created
Component: Tooltip
Variants: light, dark
...
Ready for review. Say "approved" to proceed.

User: approved

User: Implement the Tooltip component

Claude: [Uses develop-component skill]
✅ Component Implementation Complete
...
```

### Parallel Proposal Creation (Agents)

Create multiple proposals simultaneously:

```
User: (Send single message with multiple requests)
Use component-spec-writer agent for Card proposal (2 variants, 2 elevations)
Use component-spec-writer agent for Modal proposal (fullscreen, centered)
Use component-spec-writer agent for Sheet proposal (bottom, top)
```

All 3 agents run concurrently, each creating isolated proposals.

### Parallel Implementation (Agents)

Implement multiple components simultaneously after proposals are approved:

```
User: (Send single message with multiple requests)
Use component-developer agent to implement Card
Use component-developer agent to implement Modal
Use component-developer agent to implement Sheet
```

All 3 agents implement concurrently (each runs own scaffdog, tests, verification).

### Mixed Workflow

Combine skills and agents as needed:

```
# Use skill for proposal in main conversation
User: Create a proposal for Avatar component

Claude: [Uses spec-component skill]
✅ Proposal created

User: approved

# Then delegate implementation to agent for parallel work
User: Use component-developer agent to implement Avatar
```

## Figma Integration

Both spec-component skill and component-spec-writer agent support Figma MCP integration.

### Setup

The Figma MCP server is configured as `figma-desktop` in Claude Code settings. When connected, agents can extract design specifications.

### Usage

```
User: Create a proposal for IconButton from Figma: [URL]

Claude: [Extracts Figma specifications]
- Colors → semantic tokens (light.action.primary, dark.action.primary)
- Spacing → primitive.spacing[N]
- Typography → primitive.fontSize/textStyles
- Effects → primitive.shadows

✅ Proposal created with Figma token mappings
```

## Component Creation Workflow

### Phase 1: Proposal Creation

**Tools**: spec-component skill OR component-spec-writer agent

**Output**:

- `openspec/changes/add-[component-name]-component/proposal.md`
- `openspec/changes/add-[component-name]-component/specs/[component-name]/spec.md`
- `openspec/changes/add-[component-name]-component/tasks.md`

**Validation**: `openspec validate --strict` must pass

### Phase 2: Implementation

**Tools**: develop-component skill OR component-developer agent

**Prerequisites**: Approved OpenSpec proposal

**Output**:

- All 7 component files (Component.tsx, .theme.ts, .test.tsx, index.ts, meta.json, README.mdx, examples/)
- Updated registries (automatic via scaffdog)
- Passing verification (format, type-check, lint, test)

### Phase 3: Archiving

**User command** (after merge to main):

```bash
openspec archive add-[component-name]-component --yes
```

This moves the spec to `openspec/specs/[component-name]/spec.md`.

## Parallel Execution Tips

### Maximum Parallelization

For best performance when creating many components:

1. **Batch proposals first** (spawn 10 component-spec-writer agents)
2. **Review and approve all** proposals
3. **Batch implementations** (spawn 10 component-developer agents)

### Resource Considerations

- Each agent runs scaffdog independently (no conflicts)
- Each agent runs verification independently
- Registries are updated per component (no race conditions with scaffdog)
- Demo app shows all components after completion

### Example: Creating 10 Components

**Step 1**: Create all proposals in parallel (single message with 10 agent requests)

```
Use component-spec-writer agent for Card
Use component-spec-writer agent for Modal
Use component-spec-writer agent for Sheet
Use component-spec-writer agent for Drawer
Use component-spec-writer agent for Dialog
Use component-spec-writer agent for Popover
Use component-spec-writer agent for Tooltip
Use component-spec-writer agent for Badge
Use component-spec-writer agent for Chip
Use component-spec-writer agent for Tag
```

**Step 2**: Review all 10 proposals, approve them

**Step 3**: Implement all in parallel (single message with 10 agent requests)

```
Use component-developer agent to implement Card
Use component-developer agent to implement Modal
Use component-developer agent to implement Sheet
Use component-developer agent to implement Drawer
Use component-developer agent to implement Dialog
Use component-developer agent to implement Popover
Use component-developer agent to implement Tooltip
Use component-developer agent to implement Badge
Use component-developer agent to implement Chip
Use component-developer agent to implement Tag
```

## Quality Guarantees

### Proposals (spec-component / component-spec-writer)

- ✅ Pass `openspec validate --strict`
- ✅ Include 6 core requirements minimum
- ✅ Each requirement has ≥1 scenario
- ✅ Scenarios use WHEN/THEN/AND format
- ✅ Tasks.md has 8 numbered sections
- ✅ Figma tokens documented (if URL provided)

### Implementations (develop-component / component-developer)

- ✅ All 7 files created (10+ including examples)
- ✅ Theme uses three-tier system (no hardcoded values)
- ✅ Typography component used for all text
- ✅ All tests passing (zero failures)
- ✅ Zero TypeScript errors
- ✅ Zero ESLint warnings
- ✅ Code formatted with Prettier
- ✅ Component visible in demo app
- ✅ Documentation renders correctly

## Reference

### Skills Documentation

- `.claude/skills/spec-component/SKILL.md` - Proposal creation workflow
- `.claude/skills/develop-component/SKILL.md` - Implementation workflow

### Agent Configuration

- `.claude/agents/component-spec-writer/AGENT.md` - Proposal agent
- `.claude/agents/component-developer/AGENT.md` - Implementation agent

### External Documentation

- **Figma MCP**: https://help.figma.com/hc/en-us/articles/32132100833559
- **OpenSpec**: See `openspec/` directory for specs and changes

## Troubleshooting

### Proposals failing validation

**Error**: "Change must have at least one delta"
**Fix**: Ensure spec.md has `## ADDED Requirements` header

**Error**: "Requirement must have at least one scenario"
**Fix**: Add `#### Scenario:` (4 hashtags, not 3) with WHEN/THEN/AND format

### Implementation failing verification

**Error**: TypeScript errors
**Fix**: Agent will fix automatically and re-run check

**Error**: Test failures
**Fix**: Agent will fix tests based on spec requirements and re-run

**Error**: Lint warnings
**Fix**: Agent will fix formatting/style issues and re-run

### Figma MCP not connected

**Error**: "figma-desktop MCP not available"
**Fix**: Connect Figma desktop app and ensure MCP server is running

**Workaround**: Create proposal without Figma URL, manually specify tokens

## Next Steps

After creating new components:

1. Test in demo app (`bun run dev --filter=kitchen-sink-app`)
2. Verify documentation loads at `/docs/[component-name]`
3. When ready, archive proposal: `openspec archive add-[component-name]-component --yes`
