---
name: create-flow
description: Creates multi-screen user flows using morph-ui components from Figma designs. Use when user asks to "create a flow", "build a flow", "make a user flow", "create screens from Figma", or mentions multi-screen features like "auth flow", "onboarding flow", "signup flow". Integrates Figma MCP for design extraction and only uses existing morph-ui components.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, mcp__figma-desktop__get_design_context, mcp__figma-desktop__get_screenshot, mcp__expo-mcp__search_documentation, mcp__expo-mcp__learn
---

# Create Flow

## Overview

The **create-flow** skill helps developers build multi-screen user flows (authentication, onboarding, checkout, etc.) from Figma designs using only morph-ui components. It enforces a strict component-only architecture where all UI must come from the morph-ui library, ensuring consistency across flows.

This skill integrates Figma MCP for design extraction, validates components against the morph-ui registry, and generates complete flow templates in `packages/react-native-flows/` that developers can copy into their apps.

Flows are organized using Expo Router route groups, allowing multiple variants of the same flow (e.g., `/auth/default`, `/auth/with-phone-number`) with empty handler functions that developers implement according to their business logic.

## Quick Start

1. **Provide Figma Link**: User pastes a Figma design URL containing the flow screens
2. **Specify Flow Details**: Flow name (e.g., "auth"), variant name (e.g., "default"), and brief description
3. **Skill Generates Flow**: Complete flow structure created in `packages/react-native-flows/` with screens, handlers, and documentation

## Workflow

Follow these 9 steps to create a user flow from Figma designs:

### Step 1: Receive Figma Link and Context

**Input Required**:

- Figma URL containing the flow screens
- Flow name (kebab-case, e.g., "auth", "onboarding", "checkout")
- Variant name (kebab-case, e.g., "default", "with-phone-number", "simplified")
- Brief description of the flow

**Actions**:

- Parse and validate the Figma URL
- Validate flow and variant names (kebab-case, no special characters)
- Ask clarifying questions if needed (screen count, navigation flow, special requirements)

**Output**:

```typescript
{
  figmaUrl: "https://figma.com/...",
  flowName: "auth",
  variantName: "default",
  description: "Standard authentication flow with email/password"
}
```

### Step 2: Fetch Figma Screenshots

**Tool**: `mcp__figma-desktop__get_screenshot`

**Actions**:

- Extract node ID from Figma URL
- Fetch screenshots for all frames in the design
- Handle errors (invalid URL, no access, empty design)

**Example**:

```typescript
const screenshot =
  (await mcp__figma) -
  desktop__get_screenshot({
    nodeId: "123:456",
    clientLanguages: "typescript",
    clientFrameworks: "react-native,expo",
  });
```

**Error Handling**:

- If URL invalid → Ask user to provide valid Figma link
- If no screens found → Ask user to verify Figma file contains frames
- If access denied → Ask user to ensure file is shared

### Step 3: Analyze Screenshots

**Actions**:

- Identify distinct screens by looking for frame boundaries, backgrounds, and titles
- Count total screens in the flow
- For each screen:
  - Extract title/heading text for naming
  - List all UI elements (top-to-bottom, left-to-right order)
  - Identify layout pattern (centered, scrollable, grid, list)
  - Note navigation triggers (buttons, links)
- Map screen connections and navigation flow

**Reference**: See [figma-analysis-guide.md](references/figma-analysis-guide.md) for detailed analysis process.

**Output**:

```typescript
{
  screens: [
    {
      name: "login",
      title: "Log In",
      elements: [
        { type: "heading", text: "Welcome Back", size: "large" },
        { type: "input", label: "Email", inputType: "email" },
        { type: "input", label: "Password", inputType: "password" },
        { type: "button", text: "Log In", style: "filled" },
        {
          type: "link",
          text: "Forgot password?",
          destination: "forgot-password",
        },
        { type: "link", text: "Sign up", destination: "signup" },
      ],
      layout: "centered-form",
      navigation: { next: ["signup", "forgot-password"] },
    },
  ];
}
```

### Step 4: Map UI Elements to morph-ui Components

**Actions**:

- Read `packages/react-native/src/registry.json` to get available components
- For each UI element, determine the corresponding morph-ui component using the decision tree
- Determine component props based on visual design (size, variant, disabled state)
- Build a component mapping for each screen

**Reference**: See [component-detection.md](references/component-detection.md) for complete decision tree.

**Example Mapping**:

```typescript
{
  "heading (24px)": { component: "Typography", props: { variant: "title-1" } },
  "input (email)": { component: "Input", props: { keyboardType: "email-address" } },
  "input (password)": { component: "Input", props: { secureTextEntry: true } },
  "button (filled)": { component: "Button", props: { variant: "primary" } },
  "link text": { component: "Button", props: { variant: "plain" } }
}
```

### Step 5: Validate Component Availability

**Actions**:

- Check each required component exists in registry.json
- Verify all component props are supported (check component README.mdx if needed)
- Build lists of missing components and unsupported features

**Critical**: If ANY components are missing, STOP execution and report to user.

**Example Registry Check**:

```typescript
const registry = JSON.parse(
  readFile("packages/react-native/src/registry.json"),
);
const availableComponents = registry.components.map((c) => c.name);

const requiredComponents = ["typography", "input", "button", "container"];
const missingComponents = requiredComponents.filter(
  (c) => !availableComponents.includes(c),
);

if (missingComponents.length > 0) {
  // STOP - report missing components
}
```

### Step 6: Handle Missing Components

**If missing components**:

```
❌ Cannot create flow - missing components:

Missing Components:
- date-picker: Date selection input (not in registry)
- image-upload: File upload with preview (not in registry)
- social-button: Third-party auth button (not in registry)

Please create these components first using the create-component skill:
1. Create date-picker component
2. Create image-upload component
3. Create social-button component

Then re-run this flow creation.
```

**Do NOT**:

- Create placeholder components
- Use React Native UI components as fallbacks
- Continue with incomplete component set

**If all components exist**: Proceed to Step 7

### Step 7: Research Expo Router Patterns

**Tool**: `mcp__expo-mcp__search_documentation`

**Queries**:

- "expo router v6 route groups"
- "expo router file-based routing"
- "expo router stack navigation"

**Actions**:

- Research route group syntax and organization
- Understand layout file patterns
- Review navigation hooks and type-safe navigation
- Reference pre-loaded patterns in references

**Reference**: See [expo-router-patterns.md](references/expo-router-patterns.md) for comprehensive routing guide.

### Step 8: Create Flow Package Structure

**Location**: `packages/react-native-flows/`

**First-time package setup** (if package doesn't exist):

Create `packages/react-native-flows/package.json`:

```json
{
  "name": "@repo/react-native-flows",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts",
  "dependencies": {
    "@warp-ui/react-native": "workspace:*",
    "expo-router": "~6.0.21",
    "react": "^18.3.1",
    "react-native": "^0.76.6"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*"
  }
}
```

Create `packages/react-native-flows/tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/react-native.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

Create `packages/react-native-flows/README.md`:

```markdown
# React Native Flows

Multi-screen user flow templates using morph-ui components.

## Available Flows

- [Auth](src/auth/README.md) - Authentication flows (login, signup, forgot password)

## Usage

Copy the flow variant you need into your app:

\`\`\`bash
cp -r packages/react-native-flows/src/auth/(default)/\* app/(auth)/
\`\`\`

Then implement the handlers in the copied files.
```

**Flow directory structure**:

```
packages/react-native-flows/src/{flow-name}/
├── ({variant})/
│   ├── _layout.tsx
│   └── {screen}.tsx (one per screen)
├── handlers/
│   └── {flow}-handlers.ts
├── types.ts
└── README.md
```

### Step 9: Generate Screen Files and Handlers

**For each screen**, create a `.tsx` file following this template:

```typescript
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * PRODUCTION NOTE: Remove the eslint-disable comment above when implementing
 * this flow. It exists only because handler functions are empty templates.
 * Once you implement the handlers and use all variables, this comment should be deleted.
 */
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Container,
  Stack,
  useTheme,
} from "@warp-ui/react-native";
import { handleLogin, LoginCredentials } from "../handlers/auth-handlers";

export default function Login() {
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    const credentials: LoginCredentials = { email, password };
    handleLogin(credentials);
  };

  const navigateToSignup = () => {
    router.push("/(auth)/signup");
  };

  return (
    <Container>
      <Stack
        gap={theme.primitive.spacing[6]}
        style={[styles.container, { padding: theme.primitive.spacing[6] }]}
      >
        <Typography variant="title-1">Welcome Back</Typography>
        <Input
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Password"
        />
        <Button size="lg" onPress={onLogin}>
          Log In
        </Button>
        <Button variant="plain" onPress={navigateToSignup}>
          Sign up
        </Button>
      </Stack>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
```

**Create layout file** (`_layout.tsx`):

```typescript
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button, useTheme } from "@warp-ui/react-native";

export default function AuthLayout() {
  const router = useRouter();
  const { theme, colorScheme } = useTheme();

  const iconColor = theme.component.button.variant[colorScheme].tonal.text;
  const iconSize = theme.component.button.size.md.iconSize;

  const renderBackButton = ({ canGoBack }: { canGoBack?: boolean }) =>
    canGoBack ? (
      <Button size="icon" variant="tonal" onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={iconSize} color={iconColor} />
      </Button>
    ) : null;

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerShadowVisible: false,
        headerTintColor: iconColor,
        headerTitle: "",
        headerBackVisible: false,
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerLeft: renderBackButton }} />
      <Stack.Screen name="signup" options={{ headerLeft: renderBackButton }} />
    </Stack>
  );
}
```

**Create handlers file** (`handlers/{flow}-handlers.ts`):

```typescript
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const handleLogin = (credentials: LoginCredentials): void => {
  // Implementation left to developer
  // Example:
  // try {
  //   const user = await authService.login(credentials);
  //   // Update auth state
  //   // Navigate to home screen
  // } catch (error) {
  //   // Show error message
  // }
};

export const handleSignup = (data: SignupData): void => {
  // Implementation left to developer
};

export const handleForgotPassword = (email: string): void => {
  // Implementation left to developer
};
```

**Create types file** (`types.ts`):

```typescript
export type AuthScreen = "login" | "signup" | "forgot-password";

export interface User {
  id: string;
  email: string;
  name: string;
}
```

**Create flow README** (`README.md`):
See [Flow README Template](#flow-readme-template) section below.

**References**:

- [flow-structure.md](references/flow-structure.md) for package organization details
- [event-handlers.md](references/event-handlers.md) for handler extraction patterns
- [examples.md](references/examples.md) for complete working examples

## Component-Only Architecture

### ✅ Allowed React Native Imports

Only import for layout structure:

```typescript
import { View, StyleSheet, ScrollView } from "react-native";
```

**Purpose**: Layout structure only (flex, padding, gap).

### ❌ Forbidden React Native Imports

NEVER import these UI components:

```typescript
// FORBIDDEN
import {
  Text,
  Button,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
```

**Why**: All UI must come from morph-ui for consistency.

### ✅ Required morph-ui Imports

All UI components must come from morph-ui:

```typescript
import {
  Typography, // Instead of Text
  Button, // Instead of Pressable
  Input, // Instead of TextInput
  Container, // Page wrapper
  Stack, // Layout helper
  // ... other components from registry
} from "@warp-ui/react-native";
```

### StyleSheet Rules

**✅ Allowed in StyleSheet** (layout only):

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
    width: "100%",
    height: "100%",
  },
});
```

**❌ Forbidden in StyleSheet** (use component props instead):

```typescript
const styles = StyleSheet.create({
  // NO colors
  backgroundColor: "#ffffff",
  color: "#000000",

  // NO typography
  fontSize: 16,
  fontWeight: "bold",

  // NO borders/shadows
  borderRadius: 8,
  borderWidth: 1,
  shadowColor: "#000",
});
```

Use component variants and props for styling:

```typescript
<Button variant="primary" size="lg">
<Typography variant="title-1">
<Input variant="filled">
```

## Code Quality Standards

All generated flow code must follow these strict quality standards:

### Theme Tokens (Required)

**✅ DO:**
- Import `useTheme` from @warp-ui/react-native in every screen file
- Use `theme.primitive.spacing[n]` for all spacing values
- Use theme tokens for colors (iconColor, text colors)
- Apply padding/margins via inline styles with theme tokens
- Use Stack component for vertical layouts with theme-based gap

**❌ DON'T:**
- Hardcode numeric values: `gap={24}`, `padding: 24`
- Hardcode colors: `"#000"`, `"#fff"`
- Put spacing values in StyleSheet.create()

**Spacing reference:**
- 4px = `spacing[1]`
- 12px = `spacing[3]`
- 16px = `spacing[4]`
- 24px = `spacing[6]`

**Example:**
```typescript
import { useTheme } from "@warp-ui/react-native";

const { theme } = useTheme();

<Stack
  gap={theme.primitive.spacing[6]}
  style={[styles.container, { padding: theme.primitive.spacing[6] }]}
>
```

### Default Props (Required)

**Never declare these default props:**
- Stack: `direction="vertical"` (vertical is default)
- Button: `variant="primary"` (primary is default)
- Input: `type="text"` (text is default)
- Typography: `variant="body"` (body is default)

**Only declare non-default values:**
- Stack: `direction="horizontal"` ✅
- Button: `variant="secondary"`, `variant="tonal"`, `size="lg"` ✅
- Input: `type="email"`, `type="password"` ✅
- Typography: `variant="title-1"`, `variant="caption-1"` ✅

### ESLint Comments (Required)

Every screen file must start with:

```typescript
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * PRODUCTION NOTE: Remove the eslint-disable comment above when implementing
 * this flow. It exists only because handler functions are empty templates.
 * Once you implement the handlers and use all variables, this comment should be deleted.
 */
```

### TypeScript Patterns (Required)

**✅ Concise useState:**
```typescript
const [error, setError] = useState<string>();
const [loading, setLoading] = useState(false);
```

**❌ Verbose useState:**
```typescript
const [error, setError] = useState<string | undefined>(undefined);
```

### StyleSheet Patterns (Required)

**✅ Static layout only:**
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  spacer: {
    flex: 1,
  },
});
```

**❌ Don't include spacing/colors:**
```typescript
const styles = StyleSheet.create({
  container: {
    padding: 24,  // ❌ Use theme tokens instead
    gap: 16,      // ❌ Use theme tokens instead
  },
});
```

### Component Usage (Required)

**Use Stack for vertical layouts:**
```typescript
<Stack gap={theme.primitive.spacing[6]}>
  <Typography variant="title-1">Title</Typography>
  <Input />
  <Button>Submit</Button>
</Stack>
```

**Don't use View with gap:**
```typescript
// ❌ Wrong
<View style={{ gap: 16 }}>
```

### Header Navigation (Required)

**Custom back button in _layout.tsx:**
```typescript
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button, useTheme } from "@warp-ui/react-native";

const { theme, colorScheme } = useTheme();
const iconColor = theme.component.button.variant[colorScheme].tonal.text;
const iconSize = theme.component.button.size.md.iconSize;

const renderBackButton = ({ canGoBack }: { canGoBack?: boolean }) =>
  canGoBack ? (
    <Button size="icon" variant="tonal" onPress={() => router.back()}>
      <Ionicons name="chevron-back" size={iconSize} color={iconColor} />
    </Button>
  ) : null;
```

**Key points:**
- Use Button component with `size="icon"` and `variant="tonal"`
- Pass icon as children (not via iconLeft prop)
- Get colors and sizes from theme tokens
- Apply to screens via `headerLeft: renderBackButton`

## Examples

### Example 1: Basic Auth Flow

**Input**:

- Figma URL: `https://figma.com/file/abc123/auth-screens?node-id=1:2`
- Flow name: "auth"
- Variant name: "default"
- Description: "Standard authentication with email/password"

**Output**:

```
packages/react-native-flows/src/auth/
├── (default)/
│   ├── _layout.tsx
│   ├── login.tsx
│   ├── signup.tsx
│   └── forgot-password.tsx
├── handlers/
│   └── auth-handlers.ts
├── types.ts
└── README.md
```

**Generated login.tsx** (excerpt):

```typescript
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * PRODUCTION NOTE: Remove the eslint-disable comment above when implementing
 * this flow. It exists only because handler functions are empty templates.
 * Once you implement the handlers and use all variables, this comment should be deleted.
 */
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Container,
  Stack,
  useTheme,
} from "@warp-ui/react-native";
import { handleLogin, LoginCredentials } from "../handlers/auth-handlers";

export default function Login() {
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    handleLogin({ email, password });
  };

  return (
    <Container>
      <Stack
        gap={theme.primitive.spacing[6]}
        style={[styles.container, { padding: theme.primitive.spacing[6] }]}
      >
        <Typography variant="title-1">Welcome Back</Typography>
        <Input
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Password"
        />
        <Button size="lg" onPress={onLogin}>
          Log In
        </Button>
      </Stack>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
});
```

### Example 2: Onboarding Flow

**Input**:

- Figma URL with 4 onboarding screens
- Flow name: "onboarding"
- Variant name: "default"

**Output**:

```
packages/react-native-flows/src/onboarding/
├── (default)/
│   ├── _layout.tsx
│   ├── welcome.tsx
│   ├── features.tsx
│   ├── permissions.tsx
│   └── complete.tsx
├── handlers/
│   └── onboarding-handlers.ts
├── types.ts
└── README.md
```

See [examples.md](references/examples.md) for complete code examples.

## Flow README Template

Create `README.md` in each flow directory with this structure:

```markdown
# {Flow Name}

{Brief description of the flow}

## Variants

### {Variant Name} (\`/({variant})/\`)

{Description of this variant}

**Screens**:

- \`login.tsx\` - User login with email/password
- \`signup.tsx\` - New user registration
- \`forgot-password.tsx\` - Password reset request

**Navigation Flow**:
\`\`\`
login → signup
login → forgot-password → login
signup → (app)
\`\`\`

## Components Used

- Typography (title-1, body, caption-1)
- Input (email, password types)
- Button (primary, secondary, plain variants)
- Container

## Usage

### Installation

\`\`\`bash
cp -r packages/react-native-flows/src/auth/(default)/\* app/(auth)/
\`\`\`

### Implementation Steps

1. Implement handlers in \`handlers/auth-handlers.ts\`
2. Add authentication service/API calls
3. Add state management (Context/Redux/Zustand)
4. Implement error handling and validation
5. Add loading states

### Example Handler Implementation

\`\`\`typescript
export const handleLogin = async (credentials: LoginCredentials): Promise<void> => {
try {
const user = await authService.login(credentials);
await authStore.setUser(user);
router.push("/(app)/home");
} catch (error) {
showErrorToast(error.message);
}
};
\`\`\`

## Customization

Adjust component props for different styling:

\`\`\`typescript
<Button size="lg" variant="primary">
<Input variant="filled" size="lg">
\`\`\`

## Dependencies

- @warp-ui/react-native
- expo-router ~6.0.0
- react-native
```

## Quality Checklist

Before marking the flow creation as complete, verify:

### Files Created

- [ ] Flow directory in `packages/react-native-flows/src/{flow}/`
- [ ] Route group directory `({variant})/`
- [ ] Layout file `_layout.tsx`
- [ ] All screen files (`.tsx`)
- [ ] Handlers file `handlers/{flow}-handlers.ts`
- [ ] Types file `types.ts`
- [ ] Flow README `README.md`

### Code Quality

- [ ] NO React Native UI imports (Text, Button, TextInput, Pressable)
- [ ] ALL UI components from `@warp-ui/react-native`
- [ ] Typography component used for all text
- [ ] useRouter() for navigation
- [ ] useTheme() hook imported and used in every screen file
- [ ] All spacing uses theme tokens (no hardcoded values)
- [ ] Stack component used for vertical layouts with theme-based gap
- [ ] Padding/margins applied via inline styles with theme tokens
- [ ] StyleSheet only for layout (no colors, borders, typography, spacing)
- [ ] ESLint disable comment with production note at top of each screen
- [ ] Concise useState types (no explicit undefined)
- [ ] No default props declared (direction="vertical", variant="primary", type="text")
- [ ] Custom Button back button in _layout.tsx using theme tokens
- [ ] Explicit Stack.Screen definitions in _layout.tsx
- [ ] All handlers extracted to handlers file
- [ ] Handlers are empty with TypeScript signatures
- [ ] Handler examples in comments show implementation pattern

### Documentation

- [ ] README includes all variants
- [ ] README shows navigation flow diagram
- [ ] README has copy-paste installation instructions
- [ ] README lists all components used
- [ ] README documents handler implementation steps
- [ ] README shows customization examples

### Validation

- [ ] All components exist in `packages/react-native/src/registry.json`
- [ ] No missing or unavailable components
- [ ] Package README updated with new flow (if first-time)

### Static Analysis

- [ ] `bun run format` passes
- [ ] `bun run check-types` passes
- [ ] `bun run lint` passes

## Reference Documentation

For detailed guidance, see these reference files:

- [expo-router-patterns.md](references/expo-router-patterns.md) - Complete Expo Router v6 guide
- [figma-analysis-guide.md](references/figma-analysis-guide.md) - Screenshot analysis process
- [component-detection.md](references/component-detection.md) - UI element → component mapping
- [flow-structure.md](references/flow-structure.md) - Package organization details
- [event-handlers.md](references/event-handlers.md) - Handler extraction patterns
- [examples.md](references/examples.md) - Complete working flow examples

## Troubleshooting

**Figma screenshot not loading**: Verify user has access to Figma file and URL is correct

**Component not found**: Check `packages/react-native/src/registry.json` and create missing component first

**Type errors**: Ensure all imports are from `@warp-ui/react-native`, not `react-native`

**Navigation not working**: Verify route group syntax `(variant)` and screen names match navigation calls

**Handlers not working**: Ensure handler file is in correct location and exports are named correctly
