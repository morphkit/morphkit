# Flow Structure Guide

Complete guide to organizing and structuring flows in the `packages/react-native-flows/` package.

## Package Purpose

The `react-native-flows` package provides copy-paste flow templates that developers can use in their apps. Like shadcn/ui, flows are meant to be copied into the developer's project, giving them full control and allowing customization.

## Package Structure

```
packages/react-native-flows/
├── package.json              # Package configuration
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Package documentation
└── src/
    ├── index.ts              # Main exports (optional)
    ├── {flow-name}/          # One directory per flow
    │   ├── ({variant})/      # Route group for each variant
    │   │   ├── _layout.tsx   # Layout for this variant
    │   │   └── {screen}.tsx  # Screen files
    │   ├── handlers/         # Event handlers (empty functions)
    │   │   └── {flow}-handlers.ts
    │   ├── types.ts          # TypeScript type definitions
    │   └── README.md         # Flow documentation
    └── {another-flow}/
        └── ...
```

## First-Time Package Setup

If the `packages/react-native-flows/` package doesn't exist, create it with these files:

### package.json

```json
{
  "name": "@repo/react-native-flows",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts",
  "description": "Multi-screen user flow templates using morph-ui components",
  "scripts": {
    "lint": "eslint .",
    "check-types": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx}\""
  },
  "dependencies": {
    "@warp-ui/react-native": "workspace:*",
    "expo-router": "~6.0.21",
    "react": "^18.3.1",
    "react-native": "^0.76.6"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/react": "^18.3.1",
    "typescript": "^5.9.2"
  }
}
```

### tsconfig.json

```json
{
  "extends": "@repo/typescript-config/react-native.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### eslint.config.mjs

```javascript
import reactNativeConfig from "@repo/eslint-config/react-native";

export default [...reactNativeConfig];
```

### README.md

````markdown
# React Native Flows

Multi-screen user flow templates built with morph-ui components. Flows are designed to be copied into your app and customized.

## Available Flows

- [Auth](src/auth/README.md) - Authentication flows (login, signup, forgot password)

## Usage

Copy the flow variant you need into your app:

\`\`\`bash
cp -r packages/react-native-flows/src/auth/(default)/\* app/(auth)/
\`\`\`

Then implement the handlers in `handlers/{flow}-handlers.ts` according to your business logic.

## Features

- Built with morph-ui components
- Expo Router compatible
- Type-safe handlers
- Multiple variants per flow
- Copy-paste friendly
- No runtime dependencies (after copying)

## Creating New Flows

Use the `create-flow` skill to generate new flows from Figma designs.
\`\`\`

### src/index.ts

```typescript
export * from "./auth/types";
```
````

This file is optional but useful for importing types across flows.

## Flow Directory Structure

Each flow has its own directory with this structure:

```
src/{flow-name}/
├── ({variant})/              # Route group for each variant
│   ├── _layout.tsx          # Layout file
│   ├── {screen-1}.tsx       # First screen
│   ├── {screen-2}.tsx       # Second screen
│   └── ...                  # Additional screens
├── handlers/                 # Event handlers directory
│   └── {flow}-handlers.ts   # Handler functions
├── types.ts                  # Type definitions for this flow
└── README.md                 # Flow documentation
```

### Example: Auth Flow Structure

```
src/auth/
├── (default)/                # Default variant with email/password
│   ├── _layout.tsx
│   ├── login.tsx
│   ├── signup.tsx
│   └── forgot-password.tsx
├── (with-phone)/             # Alternative variant with phone number
│   ├── _layout.tsx
│   ├── phone.tsx
│   ├── verify-otp.tsx
│   └── profile.tsx
├── handlers/
│   └── auth-handlers.ts
├── types.ts
└── README.md
```

## Route Groups (Variants)

Route groups `(variant-name)/` allow multiple implementations of the same flow without affecting URLs.

### Why Use Route Groups?

- **Organization**: Keep related screens together
- **Variants**: Support different implementations (email vs phone, simple vs advanced)
- **Clean URLs**: `(auth)` doesn't appear in the URL path
- **Shared Layouts**: Each variant can have its own layout

### Naming Variants

Use kebab-case with descriptive names:

| Good Names      | Poor Names   |
| --------------- | ------------ |
| `(default)`     | `(variant1)` |
| `(with-phone)`  | `(v2)`       |
| `(with-social)` | `(new)`      |
| `(simplified)`  | `(alt)`      |

### Creating Variants

1. Create directory with parentheses: `(variant-name)/`
2. Add `_layout.tsx` file
3. Add screen files (`.tsx`)
4. Update flow README documenting the variant

## Layout Files

Each variant requires a `_layout.tsx` file that sets up navigation.

### Basic Stack Layout Template

```typescript
import { Stack } from "expo-router";

export default function FlowLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

### Stack with Custom Options

```typescript
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    />
  );
}
```

### Per-Screen Configuration

```typescript
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Log In",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
```

## Screen Files

Each screen is a separate `.tsx` file in the variant directory.

### Screen File Template

```typescript
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Typography, Input, Button, Container } from "@warp-ui/react-native";
import { handleLogin, LoginCredentials } from "../handlers/auth-handlers";

export default function Login() {
  const router = useRouter();
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
      <View style={styles.container}>
        <Typography variant="title-1">Welcome Back</Typography>
        <Typography variant="body">Please enter your credentials</Typography>
        <Input
          value={email}
          onChange={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          value={password}
          onChange={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <Button onPress={onLogin} variant="primary">
          Log In
        </Button>
        <Button onPress={navigateToSignup} variant="plain">
          Don't have an account? Sign up
        </Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
    justifyContent: "center",
  },
});
```

### Screen Naming Convention

Screen files are named in kebab-case, matching the route:

| Screen Purpose   | File Name             | Route              |
| ---------------- | --------------------- | ------------------ |
| Login screen     | `login.tsx`           | `/login`           |
| Signup screen    | `signup.tsx`          | `/signup`          |
| Forgot password  | `forgot-password.tsx` | `/forgot-password` |
| OTP verification | `verify-otp.tsx`      | `/verify-otp`      |
| Profile setup    | `profile-setup.tsx`   | `/profile-setup`   |

## Handlers Directory

Handlers contain empty functions with type signatures that developers implement.

### handlers/{flow}-handlers.ts

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

export interface ResetPasswordData {
  email: string;
}

export const handleLogin = (credentials: LoginCredentials): void => {
  // Implementation left to developer
  // Example:
  // try {
  //   const user = await authService.login(credentials);
  //   await authStore.setUser(user);
  //   router.push("/(app)/home");
  // } catch (error) {
  //   showErrorToast(error.message);
  // }
};

export const handleSignup = (data: SignupData): void => {
  // Implementation left to developer
  // Example:
  // try {
  //   const user = await authService.signup(data);
  //   await sendVerificationEmail(user.email);
  //   router.push("/(auth)/verify-email");
  // } catch (error) {
  //   showErrorToast(error.message);
  // }
};

export const handleResetPassword = (data: ResetPasswordData): void => {
  // Implementation left to developer
};

export const handleSocialLogin = (
  provider: "google" | "apple" | "facebook",
): void => {
  // Implementation left to developer
};
```

### Handler Best Practices

**Do**:

- Export interfaces for all handler parameters
- Use descriptive interface names
- Provide example implementation in comments
- Keep functions pure (no side effects in signature)
- Use `void` return type for async operations developers will implement

**Don't**:

- Implement actual logic (leave empty)
- Import external services or APIs
- Add state management
- Include navigation logic (leave in screens)

## Types File

Define flow-specific types in `types.ts`:

```typescript
export type AuthScreen =
  | "login"
  | "signup"
  | "forgot-password"
  | "reset-success";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
  name?: string;
}
```

## Flow README Template

Each flow needs comprehensive documentation in `README.md`:

````markdown
# {Flow Name}

{Brief description of what this flow does}

## Variants

### Default (\`/(default)/\`)

{Description of default variant}

**Screens**:

- \`login.tsx\` - User authentication with email and password
- \`signup.tsx\` - New user registration
- \`forgot-password.tsx\` - Password reset request
- \`reset-success.tsx\` - Password reset confirmation

**Navigation Flow**:
\`\`\`
login → (on success) → home
login → signup → verify-email → home
login → forgot-password → reset-success → login
\`\`\`

### With Phone Number (\`/(with-phone)/\`)

{Description of alternative variant}

**Screens**:

- \`phone.tsx\` - Phone number input
- \`verify-otp.tsx\` - OTP verification
- \`profile-setup.tsx\` - Profile information
- \`complete.tsx\` - Completion confirmation

**Navigation Flow**:
\`\`\`
phone → verify-otp → profile-setup → complete → home
\`\`\`

## Components Used

List all morph-ui components used across variants:

- **Typography**: title-1, heading, body, caption-1
- **Input**: email, password, phone keyboard types
- **Button**: primary, secondary, plain variants
- **Container**: page wrapper
- **Card**: grouped content (if applicable)
- **Alert**: error messages
- **Spinner**: loading states

## Usage

### Installation

Copy the desired variant into your app:

\`\`\`bash

# For default variant

cp -r packages/react-native-flows/src/auth/(default)/\* app/(auth)/

# For phone variant

cp -r packages/react-native-flows/src/auth/(with-phone)/\* app/(auth)/
\`\`\`

### Implementation Steps

1. **Implement Handlers**

   Edit \`handlers/auth-handlers.ts\` to add your business logic:

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

2. **Add State Management**

   Integrate with your state solution (Context, Redux, Zustand):

   \`\`\`typescript
   import { useAuthStore } from "@/store/auth";

   const { login, isLoading } = useAuthStore();
   \`\`\`

3. **Connect API Endpoints**

   Replace handler implementations with your API calls:

   \`\`\`typescript
   const response = await fetch("/api/auth/login", {
   method: "POST",
   body: JSON.stringify(credentials),
   });
   \`\`\`

4. **Add Validation**

   Implement form validation:

   \`\`\`typescript
   const validateEmail = (email: string): string | undefined => {
   if (!email) return "Email is required";
   if (!email.includes("@")) return "Invalid email format";
   };
   \`\`\`

5. **Error Handling**

   Add error states and messages:

   \`\`\`typescript
   const [error, setError] = useState<string | null>(null);

   try {
   await handleLogin(credentials);
   } catch (err) {
   setError(err.message);
   }
   \`\`\`

## Customization

### Styling

All components support props for customization:

\`\`\`typescript
<Button size="lg" variant="primary">
<Input variant="filled" size="lg">
<Typography variant="title-2">
\`\`\`

### Layout

Adjust StyleSheet for different layouts:

\`\`\`typescript
const styles = StyleSheet.create({
container: {
flex: 1,
padding: 32, // Increase padding
gap: 20, // Increase spacing
justifyContent: "flex-start", // Top-align instead of center
},
});
\`\`\`

### Navigation

Modify navigation paths in screen files:

\`\`\`typescript
router.push("/your-custom-path");
router.replace("/your-custom-path");
\`\`\`

## Dependencies

- \`@warp-ui/react-native\` - Component library
- \`expo-router\` ~6.0.0 - File-based routing
- \`react-native\` - React Native framework
- \`react\` - React library

## Related Flows

- [Onboarding](../onboarding/README.md) - User onboarding flow
- [Checkout](../checkout/README.md) - Payment checkout flow
  \`\`\`

## Developer Consumption Model

Flows use a **copy-paste model** inspired by shadcn/ui:

### Why Copy-Paste?

**Advantages**:

- Full control over code
- No runtime dependencies after copying
- Easy customization
- No version conflicts
- Can modify as needed

**vs. npm Package**:

- Package: Shared code, updates via npm, less control
- Copy-paste: Owned code, manual updates, full control

### Copy Instructions

Developers copy flows into their app's routing structure:

```bash
cp -r packages/react-native-flows/src/auth/(default)/* app/(auth)/
```
````

After copying:

1. Files are now in developer's codebase
2. They can modify, delete, or extend
3. No link back to original package
4. They implement handlers with their logic

## Summary

**Package Structure**:

- `packages/react-native-flows/` - Root package
- `src/{flow-name}/` - One directory per flow
- `({variant})/` - Route groups for variants
- `handlers/` - Empty handler functions
- `types.ts` - Type definitions
- `README.md` - Documentation

**Files Per Variant**:

- `_layout.tsx` - Layout configuration
- `{screen}.tsx` - Screen components (one per screen)

**Developer Workflow**:

1. Browse available flows in package
2. Copy desired variant to their app
3. Implement handlers with business logic
4. Customize styling and behavior
5. Deploy to production

**Benefits**:

- Pre-built UI flows
- Type-safe handlers
- Copy-paste simplicity
- Full customization
- No runtime overhead
