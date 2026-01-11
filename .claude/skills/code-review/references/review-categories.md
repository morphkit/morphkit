# Review Categories - Detailed Checklists

This document provides comprehensive checklists for each review category. Use these as systematic guides when performing code reviews on the morph-ui monorepo.

## 1. Package Naming & Scoping

### npm Scope Consistency

**Check for**:

- [ ] All public packages use the same npm scope (`@morph-ui/` or `@warp-ui/`)
- [ ] Internal-only packages use `@repo/` prefix
- [ ] Scope matches the primary branding (repo name or product name)
- [ ] No mixing of scopes for similar packages (e.g., components vs flows)

**Files to Review**:
- All `package.json` files in `packages/*/`
- All `package.json` files in `apps/*/`

**Common Issues**:
- Mixed `@warp-ui/` and `@morph-ui/` usage
- Public packages using `@repo/` prefix
- Inconsistent scope for related packages (components, flows, CLI)

**Best Practice**:
```json
// Public package
{
  "name": "@morph-ui/react-native",
  "private": false
}

// Internal tooling
{
  "name": "@repo/eslint-config",
  "private": true
}
```

### Public vs Private Classification

**Check for**:

- [ ] `private: true` set for internal-only packages
- [ ] `private: false` or omitted for packages intended for npm
- [ ] Appropriate `publishConfig` for scoped packages
- [ ] Correct `access` level (public/restricted)

**Common Issues**:
- Flows package marked private but should be public
- Missing `publishConfig.access: "public"` for scoped packages
- Incorrect private flag

**Best Practice**:
```json
// Public scoped package
{
  "name": "@morph-ui/react-native",
  "private": false,
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

### Package Naming Conventions

**Check for**:

- [ ] kebab-case for all package names
- [ ] Descriptive, not generic names
- [ ] Consistent naming patterns (e.g., `react-native-*` prefix for RN packages)
- [ ] No abbreviations unless industry standard

**Common Issues**:
- Generic names like `utils`, `helpers`, `common`
- PascalCase or camelCase instead of kebab-case
- Inconsistent prefixes

**Good Examples**:
- `@morph-ui/react-native` ✅
- `@morph-ui/react-native-flows` ✅
- `@morph-ui/cli` ✅

**Bad Examples**:
- `@morph-ui/rnComponents` ❌ (camelCase)
- `@morph-ui/utils` ❌ (too generic)
- `@morph-ui/rn-lib` ❌ (abbreviation)

---

## 2. Component Architecture

### Three-Tier Theme System Compliance

**Check for**:

- [ ] All components use tokens from theme system
- [ ] No hardcoded colors, spacing, or typography values
- [ ] Each component has colocated `.theme.ts` file
- [ ] Component tokens compose primitive and semantic tokens correctly

**Files to Review**:
- All component `*.tsx` files in `packages/react-native/src/*/`
- All `*.theme.ts` files
- `packages/react-native/src/theme/tokens/components.ts`

**Common Issues**:
- Hardcoded colors: `backgroundColor: "#4A90E2"`
- Hardcoded spacing: `padding: 16`
- Hardcoded typography: `fontSize: 14`
- Missing `.theme.ts` file for component

**Best Practice**:
```tsx
// ❌ Wrong - hardcoded values
<View style={{
  padding: 16,
  backgroundColor: "#4A90E2",
  borderRadius: 8
}} />

// ✅ Correct - theme tokens
const { theme } = useTheme();
<View style={{
  padding: theme.primitive.spacing[4],
  backgroundColor: theme.semantic.colors.action.primary,
  borderRadius: theme.component.button.borderRadius
}} />
```

### Typography Component Usage

**Check for**:

- [ ] No raw `Text` components in library code
- [ ] All text uses `Typography` component with variants
- [ ] Correct variant selection for semantic meaning
- [ ] No inline fontSize, fontWeight, or color overrides

**Common Issues**:
- Using React Native's `Text` component directly
- Applying custom styles to override Typography
- Wrong variant for semantic meaning (e.g., using `body` for headings)

**Best Practice**:
```tsx
// ❌ Wrong
<Text style={{ fontSize: 14, color: "#000" }}>
  {children}
</Text>

// ✅ Correct
<Typography variant="body" style={{ color: variantTokens.text }}>
  {children}
</Typography>
```

### Component File Structure

**Check for**:

- [ ] Component directory named in kebab-case
- [ ] Main component file in PascalCase
- [ ] Colocated `.theme.ts`, `.test.tsx`, `README.mdx`, `meta.json`
- [ ] Clean `index.ts` with named export only

**Expected Structure**:
```
component-name/
├── ComponentName.tsx          # Main component (PascalCase)
├── ComponentName.theme.ts     # Theme tokens
├── ComponentName.test.tsx     # Tests
├── README.mdx                 # Documentation
├── meta.json                  # Metadata
└── index.ts                   # Named export
```

**Common Issues**:
- Missing test files
- Missing theme files
- Component file and directory name mismatch
- Default exports instead of named exports

### Token-Based Styling

**Check for**:

- [ ] All styles derive from theme tokens
- [ ] Style merge pattern followed: `[baseStyles, dynamicStyles, customStyle]`
- [ ] No magic numbers in styles
- [ ] Responsive values use theme breakpoints

**Style Merge Pattern**:
```tsx
style={[
  baseStyles.container,        // Static StyleSheet styles
  {
    // Dynamic theme-derived styles
    backgroundColor: variantTokens.background,
    borderColor: variantTokens.border,
    padding: sizeTokens.padding,
  },
  style,                        // User overrides (highest priority)
]}
```

---

## 3. Code Organization

### Directory Structure Consistency

**Check for**:

- [ ] Clear workspace separation: `apps/*`, `packages/*`
- [ ] Related packages grouped logically
- [ ] Consistent nesting levels
- [ ] No deeply nested directories (max 3-4 levels)

**Expected Structure**:
```
morph-ui/
├── apps/
│   └── demo-react-native-app/
├── packages/
│   ├── react-native/              # Component library
│   ├── react-native-flows/        # Flow templates
│   ├── cli/                       # CLI tool
│   ├── eslint-config/             # Shared config
│   ├── typescript-config/         # Shared config
│   └── jest-config/               # Shared config
├── openspec/                      # Specifications
└── .claude/                       # Agent skills
```

### File Naming Conventions

**Check for**:

- [ ] Component files: PascalCase (`Button.tsx`, `Input.tsx`)
- [ ] Utility files: camelCase (`formatDate.ts`, `validateEmail.ts`)
- [ ] Type files: camelCase (`types.ts`, `interfaces.ts`)
- [ ] Test files: Match source file + `.test.tsx`
- [ ] Config files: kebab-case (`jest-config.ts`)

**Common Issues**:
- Component files in camelCase or kebab-case
- Utility files in PascalCase
- Inconsistent test file naming

### Export Patterns

**Check for**:

- [ ] Named exports for components (not default)
- [ ] Wildcard exports in package.json for tree-shaking
- [ ] Clean barrel files (`index.ts`) for each package
- [ ] No re-export chains (max 1 level)

**Package Exports Example**:
```json
{
  "exports": {
    "./src/*": "./src/*"
  }
}
```

**Component Export Example**:
```tsx
// ✅ Correct - named export
export const Button: React.FC<ButtonProps> = ({...}) => {...}

// ❌ Wrong - default export
export default Button;
```

### Monorepo Workspace Organization

**Check for**:

- [ ] Correct workspace definitions in root `package.json`
- [ ] Dependencies properly cross-referenced
- [ ] No circular dependencies
- [ ] Shared configs properly referenced

**Common Issues**:
- Workspaces not defined correctly
- Packages importing from `node_modules` instead of workspace
- Circular dependencies between packages

---

## 4. Code Duplication

### Repeated Component Patterns

**Check for**:

- [ ] Similar component logic in multiple files
- [ ] Repeated input patterns (e.g., password with visibility toggle)
- [ ] Duplicated validation logic
- [ ] Common UI patterns not extracted

**Detection Strategy**:
1. Search for similar file names across packages
2. Compare component implementations
3. Look for repeated props interfaces
4. Find common styling patterns

**Example Duplication**:
```tsx
// File 1: auth/password.tsx
<Input type="password" /* ... */ />

// File 2: settings/change-password.tsx
<Input type="password" /* ... */ />

// Solution: Extract PasswordInput component
```

### Duplicated Theme Tokens

**Check for**:

- [ ] Same color values in multiple theme files
- [ ] Repeated spacing patterns
- [ ] Duplicated semantic token definitions
- [ ] Inconsistent token naming for same values

**Detection Strategy**:
```bash
# Find duplicate color values
grep -r "#[0-9A-Fa-f]\{6\}" packages/react-native/src/theme/

# Find duplicate spacing values
grep -r "spacing.*:" packages/react-native/src/theme/
```

### Common Utilities to Extract

**Check for**:

- [ ] Repeated validation functions
- [ ] Duplicated formatting logic
- [ ] Common data transformations
- [ ] Repeated API calls or hooks

**Extraction Candidates**:
- Email validation appearing in multiple components
- Date formatting logic
- Common hooks like `useDebounce`, `useToggle`
- API request wrappers

### Similar Flow Screens

**Check for**:

- [ ] Repeated screen layouts across flow variants
- [ ] Duplicated navigation logic
- [ ] Similar form validation
- [ ] Common screen transitions

**Example**:
If `auth/(default)/email.tsx` and `auth/(sso)/email.tsx` are very similar, consider creating a shared component or merging variants.

---

## 5. Design Patterns

### Component Composition Patterns

**Check for**:

- [ ] Components compose smaller primitives
- [ ] Proper separation of concerns
- [ ] Container vs presentational components
- [ ] Compound component patterns where appropriate

**Good Pattern**:
```tsx
// Card composes smaller primitives
<Card>
  <CardHeader>
    <Typography variant="heading">Title</Typography>
  </CardHeader>
  <CardContent>
    <Typography variant="body">Content</Typography>
  </CardContent>
</Card>
```

### Props API Design

**Check for**:

- [ ] Consistent prop naming across components
- [ ] Appropriate use of variants vs boolean props
- [ ] Size props use consistent values (`sm`, `md`, `lg`, `xl`)
- [ ] Event handlers follow `onAction` naming
- [ ] Proper TypeScript interfaces with JSDoc

**Common Issues**:
- Inconsistent size values (`small` vs `sm`)
- Too many boolean props (use `variant` instead)
- Missing required prop types
- Unclear prop names

**Good Props Design**:
```tsx
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  children: React.ReactNode;
}
```

### Theme Token Composition

**Check for**:

- [ ] Component tokens compose primitive + semantic tokens
- [ ] No duplication of primitive values in component tokens
- [ ] Proper light/dark mode token mapping
- [ ] Consistent token naming convention

**Best Practice**:
```ts
// Component theme composes base tokens
export const buttonTheme = {
  variant: {
    light: {
      primary: {
        background: semanticColors.light.action.primary,
        text: primitiveColors.neutral[0],
        border: semanticColors.light.action.primary,
      },
    },
  },
  size: {
    md: {
      paddingHorizontal: primitiveSpacing[4],
      paddingVertical: primitiveSpacing[2],
      fontSize: primitiveTypography.fontSize.base,
    },
  },
};
```

### Flow Navigation Patterns

**Check for**:

- [ ] Consistent routing approach across flows
- [ ] Proper use of Expo Router conventions
- [ ] Type-safe navigation parameters
- [ ] Appropriate use of layouts

**Common Issues**:
- Mixing navigation approaches
- Unsafe navigation parameters
- Missing flow layouts
- Incorrect route naming

---

## 6. Technical Debt

### Unused Imports

**Detection**:
```bash
# ESLint should catch these
grep -r "^import .* from" --include="*.tsx" --include="*.ts" packages/
```

**Check for**:
- [ ] Imports not referenced in code
- [ ] Duplicate imports
- [ ] Unused type imports

**Fix**: Remove or comment with reason to keep

### Dead Code

**Check for**:

- [ ] Unreachable code blocks
- [ ] Unused functions or components
- [ ] Commented-out code blocks
- [ ] Unused constants or variables

**Detection Strategy**:
1. Search for unused exports
2. Check for unreachable conditional branches
3. Look for old commented code
4. Review for unused utility functions

**Note**: Per project standards, no comments allowed. Remove commented code entirely.

### Missing Tests

**Check for**:

- [ ] All components have `.test.tsx` files
- [ ] Tests cover main functionality
- [ ] Edge cases tested
- [ ] No skipped tests without reason

**Per project standards**: Zero tolerance for test failures. All tests must pass.

**Coverage Expectations**:
- Every component has basic render test
- Key interactions tested (button press, input change)
- Theme variants tested
- Error states tested

### Incomplete Documentation

**Check for**:

- [ ] All components have `README.mdx`
- [ ] Props documented with JSDoc
- [ ] Usage examples provided
- [ ] `meta.json` includes dependencies

**Documentation Requirements**:
```tsx
/**
 * Button component following the three-tier theme system
 *
 * @param variant - Visual style variant
 * @param size - Size variant
 * @param loading - Show loading spinner
 * @param disabled - Disable interaction
 * @param onPress - Click handler
 * @param children - Button content
 */
export const Button: React.FC<ButtonProps> = ({...}) => {...}
```

---

## Review Execution Checklist

Use this checklist to ensure comprehensive coverage:

### Initial Scan
- [ ] Review all `package.json` files
- [ ] Check component directory structure
- [ ] Scan for obvious duplication
- [ ] Review recent git changes

### Deep Analysis
- [ ] Read critical component implementations
- [ ] Analyze theme token usage
- [ ] Check flow screen patterns
- [ ] Review shared configuration

### Pattern Detection
- [ ] Search for repeated code patterns
- [ ] Identify extraction opportunities
- [ ] Find inconsistent naming
- [ ] Locate technical debt

### Research & Validation
- [ ] Search for relevant best practices
- [ ] Validate against industry standards
- [ ] Check official documentation
- [ ] Compare to similar projects

### Reporting
- [ ] Categorize findings by priority
- [ ] Provide specific file references
- [ ] Include code examples
- [ ] Link to supporting research
- [ ] Highlight positive patterns

---

## Priority Guidelines

### High Priority 🔴

Issues that:
- Break architectural consistency
- Affect public API or published packages
- Create confusion for contributors
- Impact maintainability significantly

### Medium Priority 🟡

Issues that:
- Reduce code quality
- Miss optimization opportunities
- Create minor inconsistencies
- Could improve developer experience

### Low Priority 🟢

Issues that:
- Are nice-to-haves
- Have minimal impact
- Require significant effort for small gain
- Can be deferred safely

### Positive Patterns ✅

Always highlight:
- Well-designed abstractions
- Proper use of patterns
- Good documentation
- Effective testing strategies
- Clean architecture decisions

These should be preserved and replicated across the codebase.
