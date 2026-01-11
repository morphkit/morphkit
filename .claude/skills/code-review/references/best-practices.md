# Industry Best Practices

This document compiles industry best practices for design systems, monorepo architecture, React Native component libraries, and npm package management. Use these as reference when evaluating morph-ui against external standards.

## Design System Best Practices

### Atomic Design Methodology

Design systems benefit from hierarchical component organization:

**Levels**:

1. **Atoms** - Basic building blocks (Button, Input, Typography)
2. **Molecules** - Simple combinations (FormField = Label + Input + Error)
3. **Organisms** - Complex components (LoginForm, ProductCard)
4. **Templates** - Page-level layouts
5. **Pages** - Specific instances

**Application to morph-ui**:

- morph-ui's 27 components are primarily atoms and molecules
- Flows represent organism/template level
- Demo app shows page-level implementations

**Source**: [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)

### Design Tokens

Industry standard for managing design values:

**Token Hierarchy**:

1. **Global/Primitive Tokens** - Raw values (morph-ui: Tier 1)
2. **Alias/Semantic Tokens** - Contextual meaning (morph-ui: Tier 2)
3. **Component Tokens** - Component-specific (morph-ui: Tier 3)

**Best Practices**:

- Never hardcode values in components
- Single source of truth for all design values
- Theme-aware token resolution
- Support for light/dark modes built-in

**morph-ui Alignment**: ✅ Fully implements three-tier token system

**Sources**:

- [Design Tokens W3C Community Group](https://design-tokens.github.io/community-group/)
- [Scaling Your Frontend: A Monorepo and Design System Playbook](https://medium.com/@satnammca/scaling-your-frontend-a-monorepo-and-design-system-playbook-957e38c8c9e4)

### Copy-Paste Philosophy (shadcn/ui model)

Modern design systems favor copy-paste over npm packages:

**Principles**:

- Components are self-contained and copyable
- Users can customize without forking
- No hidden dependencies
- Source code is the documentation

**Application to morph-ui**:

- Wildcard exports allow selective imports
- Components are self-contained with colocated themes
- Theme tokens enable easy customization
- Each component has full source in repo

**morph-ui Alignment**: ✅ Follows shadcn/ui philosophy

**Source**: [shadcn/ui documentation](https://ui.shadcn.com/docs)

### Theme System Architecture

Modern design systems use context-aware theming:

**Best Practices**:

- Single `ThemeProvider` at app root
- Hook-based theme access (`useTheme()`)
- Automatic light/dark mode switching
- CSS variables or token objects for runtime theming

**morph-ui Implementation**:

```tsx
// ✅ Correct pattern
const { theme, colorScheme } = useTheme();
const colors = theme.component.button.variant[colorScheme][variant];
```

**Source**: [Material Design Theming](https://m3.material.io/foundations/customization)

---

## Monorepo Architecture

### Workspace Organization

**Best Practices**:

1. **Clear Boundaries**:
   - `apps/*` for applications
   - `packages/*` for shared code
   - `tools/*` for build tooling (optional)

2. **Dependency Hygiene**:
   - No circular dependencies
   - Clear dependency graphs
   - Internal packages use workspace protocol

3. **Shared Configuration**:
   - Extract common configs (ESLint, TypeScript, Jest)
   - Version shared configs independently
   - Use `extends` in local configs

**morph-ui Alignment**: ✅ Follows standard workspace structure

**Sources**:

- [Monorepo Architecture: The Ultimate Guide for 2025](https://feature-sliced.design/blog/frontend-monorepo-explained)
- [A Guide to Monorepos for Front-end Code](https://www.toptal.com/front-end/guide-to-monorepos)

### Build Optimization

**Best Practices**:

1. **Computational Caching**:
   - Cache build outputs by content hash
   - Only rebuild changed packages
   - Share cache across CI/CD and local dev

2. **Affected Detection**:
   - Run tasks only on changed packages
   - Understand dependency graphs
   - Skip unaffected workspaces

3. **Parallel Execution**:
   - Run independent tasks in parallel
   - Respect dependency order
   - Maximize CPU utilization

**Turborepo Implementation** (morph-ui uses):

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

**Source**: [Turborepo Documentation](https://turbo.build/repo/docs)

### Code Quality Enforcement

**Best Practices**:

1. **Linting**:
   - Shared ESLint configs across packages
   - Zero warnings policy (`--max-warnings 0`)
   - Custom rules for monorepo patterns

2. **Type Checking**:
   - Shared TypeScript configs
   - Project references for faster checks
   - Strict mode enabled

3. **Testing**:
   - Shared test configurations
   - Run tests on affected packages only
   - Enforce minimum coverage

4. **Branch Policies**:
   - Require all checks to pass
   - Enforce naming conventions
   - Require code reviews

**morph-ui Alignment**: ✅ Implements strict quality enforcement

**Sources**:

- [Monorepo Best Practices](https://circleci.com/blog/monorepo-dev-practices/)
- [Scaling Your Frontend Playbook](https://medium.com/@satnammca/scaling-your-frontend-a-monorepo-and-design-system-playbook-957e38c8c9e4)

---

## React Native Component Libraries

### Component Naming Conventions

**Best Practices**:

1. **Component Files**: PascalCase (`Button.tsx`, `Input.tsx`)
2. **Utility Files**: camelCase (`formatDate.ts`, `validateEmail.ts`)
3. **Directory Names**: kebab-case (`password-input/`, `form-field/`)
4. **Test Files**: Match source + `.test.tsx`

**React Native Specifics**:

- Components should describe their role, not appearance
- Avoid abbreviations (`TextField` not `TxtFld`)
- Use industry-standard names (`Button` not `CustomButton`)

**morph-ui Alignment**: ✅ Follows naming conventions

**Sources**:

- [React Native Naming Conventions](https://medium.com/@imranrafeek/best-practices-for-naming-conventions-in-react-native-21f16df6179e)
- [React Native Coding Standards](https://medium.com/@mahesh.nagpure.mailbox/react-native-coding-standard-structure-ab5c5f9e6784)

### Component API Design

**Best Practices**:

1. **Props Naming**:
   - Boolean props: `is*`, `has*`, `should*` (e.g., `isDisabled`, `hasError`)
   - Event handlers: `on*` (e.g., `onPress`, `onChange`)
   - Avoid negatives: `disabled` not `notEnabled`

2. **Variant vs Boolean Props**:
   - Use `variant` for 3+ mutually exclusive options
   - Use booleans for simple toggles
   - Example: `variant="primary" | "secondary" | "ghost"` better than `isPrimary, isSecondary, isGhost`

3. **Size Consistency**:
   - Standard sizes: `sm`, `md`, `lg`, `xl`
   - Don't mix: `small` and `sm`

4. **Required Props**:
   - Minimize required props
   - Provide sensible defaults
   - Make components work with minimal configuration

**morph-ui Alignment**: ✅ Follows variant-based API design

**Example**:

```tsx
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost"; // ✅ Not 3 booleans
  size?: "sm" | "md" | "lg"; // ✅ Consistent values
  isDisabled?: boolean; // ✅ Clear naming
  onPress: () => void; // ✅ Required handler
  children: React.ReactNode;
}
```

### File Organization

**Best Practices**:

Colocated pattern (morph-ui uses):

```
ComponentName/
├── ComponentName.tsx       # Component
├── ComponentName.test.tsx  # Tests
├── ComponentName.styles.ts # Styles (or .theme.ts)
├── index.ts                # Export
└── README.md               # Docs
```

**Benefits**:

- Easy to find related files
- Simple to copy/move components
- Clear ownership boundaries
- Facilitates code review

**morph-ui Alignment**: ✅ Uses colocated pattern with `.theme.ts`

**Source**: [React Native File Organization](https://handsonreact.com/docs/code-organization-conventions)

### Platform Handling

**Best Practices**:

1. **Platform-Specific Files**:

   ```
   Component.tsx       # Shared
   Component.ios.tsx   # iOS-specific
   Component.android.tsx # Android-specific
   ```

2. **Platform Checks**:

   ```tsx
   import { Platform } from "react-native";

   const styles = {
     padding: Platform.OS === "ios" ? 10 : 12,
   };
   ```

3. **Design for Both Platforms**:
   - Test on iOS and Android
   - Respect platform conventions
   - Use platform-appropriate components

**morph-ui Context**: Component library should be platform-agnostic where possible

---

## npm Package Management

### Package Scoping

**Best Practices**:

1. **Use Scopes for Organizations**:
   - Scopes prevent name collisions
   - Signal official packages
   - Enable fine-grained access control

2. **Scope Naming**:
   - Match organization/product name
   - Lowercase only
   - No underscores or special chars

3. **Public vs Private**:
   - Public: `"private": false` + `"publishConfig": { "access": "public" }`
   - Private: `"private": true`

**Package.json Example**:

```json
{
  "name": "@morph-ui/react-native",
  "version": "0.1.0",
  "private": false,
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

**morph-ui Context**: Should standardize on single scope

**Sources**:

- [About npm Scopes](https://docs.npmjs.com/about-scopes/)
- [Best Practices for npm Packages](https://blog.inedo.com/npm/best-practices-for-your-organizations-npm-packages)

### Package Naming

**Best Practices**:

1. **Use kebab-case**: `react-native-flows` not `reactNativeFlows`
2. **Be descriptive**: `react-native-flows` not `rnf`
3. **Avoid generic names**: `form-validation` not `utils`
4. **Include platform/framework**: `react-native-*` for RN-specific packages

**URL-Safe Characters Only**:

- Lowercase letters
- Numbers
- Hyphens
- No spaces, underscores, or special chars

**morph-ui Alignment**: ✅ Uses kebab-case descriptive names

**Source**: [npm Package Name Guidelines](https://docs.npmjs.com/package-name-guidelines/)

### Semantic Versioning

**Best Practices**:

Format: `MAJOR.MINOR.PATCH`

1. **MAJOR**: Breaking changes
2. **MINOR**: New features (backward compatible)
3. **PATCH**: Bug fixes (backward compatible)

**Examples**:

- `1.0.0` → `1.0.1` - Bug fix
- `1.0.1` → `1.1.0` - New feature
- `1.1.0` → `2.0.0` - Breaking change

**Pre-release Versions**:

- `1.0.0-alpha.1` - Alpha release
- `1.0.0-beta.1` - Beta release
- `1.0.0-rc.1` - Release candidate

**morph-ui Context**: Currently at v0.x.x (pre-1.0 allows breaking changes in minor versions)

**Source**: [Semantic Versioning 2.0.0](https://semver.org/)

### Package.json Best Practices

**Essential Fields**:

```json
{
  "name": "@morph-ui/react-native",
  "version": "0.1.0",
  "description": "React Native component library",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    "./src/*": "./src/*"
  },
  "files": ["src", "README.md"],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-native": "^0.70.0"
  },
  "keywords": ["react-native", "component-library", "design-system"],
  "repository": {
    "type": "git",
    "url": "https://github.com/org/repo"
  },
  "license": "MIT"
}
```

**Key Points**:

- Include `types` for TypeScript
- Use `exports` for modern module resolution
- Specify `files` to control what's published
- Use `peerDependencies` for React/RN (don't bundle)
- Add `keywords` for discoverability

---

## Accessibility Best Practices

### WCAG AA Compliance

**Best Practices**:

1. **Color Contrast**:
   - Normal text: 4.5:1 minimum
   - Large text (18pt+): 3:1 minimum
   - UI components: 3:1 minimum

2. **Touch Targets**:
   - Minimum 44x44 points on iOS
   - Minimum 48x48 dp on Android

3. **Screen Reader Support**:
   - Meaningful `accessibilityLabel`
   - Proper `accessibilityRole`
   - `accessibilityState` for interactive elements

**React Native Implementation**:

```tsx
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Submit form"
  accessibilityState={{ disabled: isDisabled }}
  onPress={handlePress}
>
  <Text>Submit</Text>
</Pressable>
```

**Source**: [React Native Accessibility](https://reactnative.dev/docs/accessibility)

---

## Testing Best Practices

### Component Testing

**Best Practices**:

1. **Test User Behavior, Not Implementation**:
   - Test what users see and do
   - Avoid testing internal state
   - Focus on component API

2. **Test Coverage**:
   - Render tests for all variants
   - Interaction tests (press, input, etc.)
   - Edge cases and error states
   - Theme variants (light/dark)

3. **Test Organization**:

   ```tsx
   describe("Button", () => {
     describe("rendering", () => {
       it("renders with text", () => { ... });
       it("renders all variants", () => { ... });
     });

     describe("interactions", () => {
       it("calls onPress when pressed", () => { ... });
       it("does not call onPress when disabled", () => { ... });
     });

     describe("accessibility", () => {
       it("has correct accessibility role", () => { ... });
     });
   });
   ```

**morph-ui Context**: Uses React Native Testing Library

**Source**: [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

---

## Documentation Best Practices

### Component Documentation

**Best Practices**:

1. **Include**:
   - Brief description
   - Import statement
   - Basic usage example
   - Props table with types and defaults
   - All variant examples
   - Advanced usage patterns

2. **MDX for Rich Documentation**:
   - Live code examples
   - Interactive demos
   - Proper syntax highlighting

3. **Keep Up-to-Date**:
   - Document new props immediately
   - Update examples when API changes
   - Include migration guides for breaking changes

**morph-ui Alignment**: ✅ Uses MDX for component docs

### API Documentation

**Best Practices**:

Use JSDoc for props:

```tsx
interface ButtonProps {
  /**
   * Visual style variant
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "ghost";

  /**
   * Size variant
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Callback fired when button is pressed
   */
  onPress: () => void;
}
```

**Benefits**:

- IDE autocomplete
- Inline documentation
- Type safety

---

## CI/CD Best Practices

### Continuous Integration

**Best Practices**:

1. **Run on Every PR**:
   - Linting
   - Type checking
   - Tests
   - Build verification

2. **Fast Feedback**:
   - Run only affected packages
   - Use build cache
   - Parallelize independent tasks

3. **Quality Gates**:
   - Require all checks to pass
   - Enforce code coverage minimums
   - Block on security vulnerabilities

**Turborepo Integration**:

```bash
# Run only affected tasks
turbo run test --filter=[origin/main]
```

### Versioning and Publishing

**Best Practices**:

1. **Automated Versioning**:
   - Use conventional commits
   - Auto-generate changelogs
   - Semantic version bumps

2. **Pre-release Channels**:
   - `latest` for stable releases
   - `next` for beta/RC releases
   - `canary` for nightly builds

3. **Release Notes**:
   - Auto-generate from commits
   - Highlight breaking changes
   - Include migration guides

**Tools**: Changesets, semantic-release

---

## Performance Best Practices

### React Native Performance

**Best Practices**:

1. **Minimize Re-renders**:
   - Use `React.memo` for expensive components
   - Memoize callbacks with `useCallback`
   - Memoize values with `useMemo`

2. **List Optimization**:
   - Use `FlatList` or `FlashList` for long lists
   - Implement `getItemLayout` if possible
   - Set appropriate `windowSize`

3. **Bundle Size**:
   - Tree-shaking friendly exports
   - Lazy load heavy components
   - Analyze bundle with tools

4. **Image Optimization**:
   - Use appropriate formats (WebP)
   - Implement progressive loading
   - Cache images properly

**morph-ui Context**: Wildcard exports enable tree-shaking

---

## Summary

morph-ui should align with these industry standards:

1. **Design Systems**: Token-based theming, atomic design, copy-paste philosophy ✅
2. **Monorepo**: Clear workspace organization, build caching, quality gates ✅
3. **React Native**: Proper naming, variant-based APIs, colocated files ✅
4. **npm Packages**: Scoped names, semantic versioning, proper metadata ⚠️ (scope inconsistency)
5. **Accessibility**: WCAG AA compliance, proper touch targets
6. **Testing**: Component testing library, behavior-focused tests ✅
7. **Documentation**: MDX-based, comprehensive examples ✅
8. **CI/CD**: Automated checks, affected-only runs
9. **Performance**: Tree-shaking, memo optimization

**Key Alignment**:

- ✅ Excellent: Design system, monorepo, React Native patterns
- ⚠️ Needs work: Package naming consistency

**Sources**:

- [Scaling Your Frontend Playbook](https://medium.com/@satnammca/scaling-your-frontend-a-monorepo-and-design-system-playbook-957e38c8c9e4)
- [Monorepo Architecture Guide 2025](https://feature-sliced.design/blog/frontend-monorepo-explained)
- [npm Scopes Documentation](https://docs.npmjs.com/about-scopes/)
- [React Native Naming Best Practices](https://medium.com/@imranrafeek/best-practices-for-naming-conventions-in-react-native-21f16df6179e)
- [npm Package Organization](https://blog.inedo.com/npm/best-practices-for-your-organizations-npm-packages)
