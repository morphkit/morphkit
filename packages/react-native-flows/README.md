# React Native Flows

Multi-screen user flow templates built with morph-ui components. Flows are designed to be copied into your app and customized.

## Purpose

This package provides ready-to-use flow templates for common multi-screen features:

- Authentication (login, signup, password reset)
- Onboarding (welcome, features, permissions)
- Checkout (cart, shipping, payment)
- Profile management
- Settings flows

## Philosophy

Flows follow the shadcn/ui approach:

- **Copy-paste friendly**: Copy flow files directly into your app
- **Full control**: Modify, delete, or extend as needed
- **Component-only**: Built exclusively with morph-ui components
- **Type-safe**: Complete TypeScript definitions
- **Empty handlers**: Implement business logic yourself

## Available Flows

Currently, this package is empty and ready to receive flows. Use the `create-flow` skill to generate new flows from Figma designs.

## Usage

### Copy a Flow

Once flows are added, copy them into your app:

```bash
# Copy default auth flow
cp -r packages/react-native-flows/src/auth/default/* app/auth/

# Copy onboarding flow
cp -r packages/react-native-flows/src/onboarding/default/* app/onboarding/
```

### Implement Handlers

After copying, implement the empty handler functions within each screen component:

```typescript
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Implement login logic
    // Example:
    // try {
    //   const user = await authService.login({ email, password });
    //   await authStore.setUser(user);
    //   router.push("/home");
    // } catch (error) {
    //   showErrorToast(error.message);
    // }
  };

  return (
    <Container>
      <Stack direction="vertical" spacing={16}>
        <Input value={email} onChange={setEmail} placeholder="Email" />
        <Input value={password} onChange={setPassword} placeholder="Password" secureTextEntry />
        <Button onPress={handleLogin} variant="primary">Log In</Button>
      </Stack>
    </Container>
  );
}
```

### Customize

All components support props for customization:

```typescript
<Button size="lg" variant="primary">
<Input variant="filled" size="lg">
<Typography variant="title-2">
```

Use morph-ui layout components for positioning:

```typescript
<Container>
  <Stack direction="vertical" spacing={20} padding={32} align="flex-start">
    <Typography variant="title-1">Title</Typography>
    <Input placeholder="Enter text" />
    <Button variant="primary">Submit</Button>
  </Stack>
</Container>
```

## Creating New Flows

Use the `create-flow` skill to generate flows from Figma designs:

1. Provide a Figma link with your flow screens
2. Specify flow name (e.g., "auth", "onboarding")
3. Specify variant name (e.g., "default", "with-phone-number")
4. The skill generates complete flow structure in this package

## Architecture

### Component-Only

Flows use **only** morph-ui components. React Native UI components (Text, Button, TextInput) are forbidden.

✅ **Allowed**:

```typescript
import { Typography, Button, Input } from "@warp-ui/react-native";
```

❌ **Forbidden**:

```typescript
import { Text, Button, TextInput } from "react-native";
```

### Inline Event Handlers

Event handlers are defined within screen components with empty implementations:

```typescript
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Implement login logic
  };

  return (
    <Container>
      <Stack direction="vertical" spacing={16}>
        <Input value={email} onChange={setEmail} />
        <Button onPress={handleLogin}>Log In</Button>
      </Stack>
    </Container>
  );
}
```

### Flow Structure

Flows use Expo Router for file-based routing:

```
src/auth/
├── default/                # Default variant
│   ├── _layout.tsx         # Navigation setup
│   ├── login.tsx           # Login screen with inline handlers
│   └── signup.tsx          # Signup screen with inline handlers
├── with-phone/             # Alternative variant
│   ├── _layout.tsx
│   ├── phone.tsx           # Phone input screen
│   └── verify-otp.tsx      # OTP verification screen
├── types.ts                # Shared type definitions
└── README.md               # Flow documentation
```

## Dependencies

- **@warp-ui/react-native**: Component library (peer dependency)
- **expo-router**: File-based routing (peer dependency)
- **react**: React library (peer dependency)
- **react-native**: React Native framework (peer dependency)

## Development

```bash
# Lint flows
bun run lint

# Type-check flows
bun run check-types

# Format code
bun run format
```

## Contributing

When adding new flows:

1. Follow the established structure (variant directories, screen files, types)
2. Use only morph-ui components (Stack, Box, Container for layout)
3. Keep event handlers inline with TODO comments
4. Include comprehensive README for each flow
5. Ensure all static analysis checks pass

## License

MIT
