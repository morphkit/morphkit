# Authentication Flow

Default authentication flow with social login and email/password signup.

## Overview

This flow provides a complete authentication experience with 4 screens:

- Welcome screen with social login options (Apple, Google, Facebook)
- Email input screen
- Password creation screen with security requirements
- Name input screen (first and last name)

## Variants

### Default (`/(default)/`)

Standard authentication flow with social login options and email/password fallback.

**Screens**:

- `welcome.tsx` - Entry point with social login buttons and email option
- `email.tsx` - Email address collection
- `password.tsx` - Password creation with security requirements
- `name.tsx` - User name collection (first and last name)

**Navigation Flow**:

```
welcome
   ↓ "Continue with email"
email
   ↓ "Continue" → passes { email }
password (receives email)
   ↓ "Continue" → passes { email }
name (receives email)
   ↓ "Finish" → router.replace('/home')

Back navigation:
name ← password ← email ← welcome
```

## Components Used

- **Typography** - Text rendering (title-1, caption-1, caption-2, footnote)
- **Input** - Email, password, and text input fields
- **Button** - Primary, secondary, and plain variants
- **Container** - Page wrapper with centered max-width
- **Stack** - Layout component with consistent spacing
- **Box** - Flexible container for layout
- **Image** (React Native) - Logo display
- **@expo/vector-icons** - Social auth button icons

## Dependencies

This flow requires the following dependencies:

```json
{
  "@warp-ui/react-native": "workspace:*",
  "@expo/vector-icons": "^15.0.3",
  "expo-router": "~6.0.21",
  "react": "^18.3.1",
  "react-native": "^0.76.6"
}
```

## Installation

Copy the flow variant into your app:

```bash
cp -r packages/react-native-flows/src/auth/(default)/* app/auth/
```

Ensure your app has the required dependencies installed:

```bash
bun add @expo/vector-icons
```

## Usage

### 1. Copy Files

Copy the auth flow files into your app's routing structure:

```bash
mkdir -p app/auth
cp -r packages/react-native-flows/src/auth/(default)/* app/auth/
```

### 2. Implement Handlers

The handler functions are currently empty. Implement them according to your authentication service:

**welcome.tsx**:

```typescript
const handleSocialLogin = async (provider: SocialProvider) => {
  try {
    setLoading(provider);
    const result = await authService.socialLogin(provider);
    await authStore.setUser(result.user);
    router.replace("/home");
  } catch (error) {
    showErrorToast(error.message);
  } finally {
    setLoading(null);
  }
};
```

**email.tsx**:

```typescript
const handleContinue = async () => {
  setError(undefined);
  if (!email || !email.includes("@")) {
    setError("Please enter a valid email address");
    return;
  }
  setLoading(true);
  try {
    await authService.checkEmailExists(email);
    router.push({
      pathname: "/auth/password",
      params: { email },
    });
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

**password.tsx**:

```typescript
const handleContinue = async () => {
  setError(undefined);

  if (password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }
  if (!/[A-Z]/.test(password)) {
    setError("Password must contain an uppercase letter");
    return;
  }
  if (!/[0-9]/.test(password)) {
    setError("Password must contain a number");
    return;
  }

  setLoading(true);
  try {
    router.push({
      pathname: "/auth/name",
      params: { email },
    });
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

**name.tsx**:

```typescript
const handleFinish = async () => {
  setFirstNameError(undefined);
  setLastNameError(undefined);

  if (!firstName.trim()) {
    setFirstNameError("First name is required");
    return;
  }
  if (!lastName.trim()) {
    setLastNameError("Last name is required");
    return;
  }

  setLoading(true);
  try {
    const user = await authService.register({
      email,
      password,
      firstName,
      lastName,
    });
    await authStore.setUser(user);
    router.replace("/home");
  } catch (error) {
    showErrorToast(error.message);
  } finally {
    setLoading(false);
  }
};
```

### 3. Add Authentication Service

Create an authentication service to handle API calls:

```typescript
// services/auth.ts
export const authService = {
  async socialLogin(provider: "apple" | "google" | "facebook") {
    // Implement OAuth flow
  },

  async checkEmailExists(email: string) {
    // Check if email is already registered
  },

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    // Create new user account
  },
};
```

### 4. Add State Management

Implement global auth state using Context, Redux, or Zustand:

```typescript
// store/auth.ts
export const authStore = {
  async setUser(user: User) {
    // Store user in state
    // Store auth token in secure storage
  },
};
```

### 5. Configure Navigation

Ensure your app's routing structure supports the auth flow:

```
app/
├── (auth)/
│   ├── welcome.tsx
│   ├── email.tsx
│   ├── password.tsx
│   └── name.tsx
└── (app)/
    └── home.tsx
```

## Customization

### Changing Component Sizes

Adjust button and input sizes:

```typescript
<Button size="lg" variant="primary">  // md, lg, sm
<Input size="lg" />  // md, lg, sm
```

### Modifying Typography

Change text styles:

```typescript
<Typography variant="title-2">  // title-1, title-2, heading, body, etc.
```

### Adjusting Spacing

Modify gaps and padding:

```typescript
<Stack direction="vertical" gap={32}>  // Increase spacing
<Stack style={{ padding: 32 }}>  // Increase padding
```

### Social Login Icons

Customize icon sizes and colors:

```typescript
<Button
  iconLeft={<Ionicons name="logo-apple" size={24} color="#000" />}
>
  Continue with Apple
</Button>
```

## Security Notes

### Password Handling

**⚠️ Security Warning**: The current implementation passes email via route params. While this is acceptable for email addresses, **NEVER pass passwords through route params**.

**Recommended Approaches**:

1. **Use Secure Storage**:

```typescript
import * as SecureStore from "expo-secure-store";

// Save password temporarily
await SecureStore.setItemAsync("temp_password", password);

// Retrieve on final screen
const password = await SecureStore.getItemAsync("temp_password");
```

2. **Use Context Provider**:

```typescript
// Create auth context
const AuthContext = createContext();

// Store form data in context
const { setFormData } = useAuthContext();
setFormData({ email, password });
```

3. **Progressive Registration**:
   Send data to backend after each step instead of collecting all data first.

### Token Storage

Store authentication tokens securely:

```typescript
import * as SecureStore from "expo-secure-store";

await SecureStore.setItemAsync("auth_token", token);
```

### OAuth Implementation

For social login, use official libraries:

- **Apple**: `expo-apple-authentication`
- **Google**: `@react-native-google-signin/google-signin`
- **Facebook**: `react-native-fbsdk-next`

## Validation

### Email Validation

```typescript
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Password Validation

```typescript
const validatePassword = (
  password: string,
): { isValid: boolean; message?: string } => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain an uppercase letter",
    };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: "Password must contain a number" };
  }
  return { isValid: true };
};
```

### Name Validation

```typescript
const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};
```

## Accessibility

This flow follows WCAG AA accessibility guidelines:

- All inputs have proper labels
- Error messages are announced to screen readers
- Keyboard navigation works correctly
- Color contrast meets WCAG standards
- Focus states are visible

## Testing

Manual testing checklist:

- [ ] Social login buttons trigger handlers
- [ ] Email input validates format
- [ ] Password requirements are displayed
- [ ] Back button navigates correctly
- [ ] Loading states show during async operations
- [ ] Error messages display properly
- [ ] Keyboard behavior is correct
- [ ] Screen reader announces content

## Troubleshooting

**Icons not displaying**: Ensure `@expo/vector-icons` is installed and the app has been rebuilt.

**Navigation not working**: Verify Expo Router is properly configured in `app.json` and `babel.config.js`.

**Theme colors not applied**: Ensure `ThemeProvider` wraps your app in the root layout.

**Image not loading**: Verify the asset path is correct (`@/assets/icon.png`) and the file exists.
