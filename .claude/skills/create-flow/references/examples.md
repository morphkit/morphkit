# Flow Examples

Complete working examples of user flows built with morphkit components.

## Example 1: Authentication Flow (Default Variant)

### Flow Overview

**Flow Name**: `auth`
**Variant**: `(default)`
**Description**: Standard authentication with email/password, signup, and password reset
**Screens**: 3 screens (login, signup, forgot-password)

### File Structure

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

### \_layout.tsx

```typescript
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
}
```

### login.tsx

```typescript
import { View, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Typography, Input, Button, Container, Divider } from "@morphkit/react-native";
import { handleLogin, handleSocialLogin, LoginCredentials } from "../handlers/auth-handlers";

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

  const navigateToForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  const onGoogleLogin = () => {
    handleSocialLogin({ provider: "google" });
  };

  const onAppleLogin = () => {
    handleSocialLogin({ provider: "apple" });
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Typography variant="title-1">Welcome Back</Typography>
          <Typography variant="body">Please enter your credentials to continue</Typography>

          <View style={styles.form}>
            <Input
              value={email}
              onChange={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Input
              value={password}
              onChange={setPassword}
              placeholder="Password"
              secureTextEntry
            />

            <Button onPress={onLogin} variant="primary" size="lg">
              Log In
            </Button>

            <Button onPress={navigateToForgotPassword} variant="plain">
              Forgot password?
            </Button>
          </View>

          <Divider />

          <View style={styles.socialButtons}>
            <Button onPress={onGoogleLogin} variant="secondary" size="md">
              Continue with Google
            </Button>
            <Button onPress={onAppleLogin} variant="secondary" size="md">
              Continue with Apple
            </Button>
          </View>

          <View style={styles.footer}>
            <Typography variant="body">Don't have an account?</Typography>
            <Button onPress={navigateToSignup} variant="plain">
              Sign up
            </Button>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
    justifyContent: "center",
  },
  form: {
    gap: 16,
  },
  socialButtons: {
    gap: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
```

### signup.tsx

```typescript
import { View, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Typography, Input, Button, Container, Checkbox } from "@morphkit/react-native";
import { handleSignup, SignupData } from "../handlers/auth-handlers";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const onSignup = () => {
    const data: SignupData = {
      name,
      email,
      password,
      agreedToTerms,
    };
    handleSignup(data);
  };

  const navigateToLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Typography variant="title-1">Create Account</Typography>
          <Typography variant="body">Sign up to get started</Typography>

          <View style={styles.form}>
            <Input
              value={name}
              onChange={setName}
              placeholder="Full Name"
              autoCapitalize="words"
            />
            <Input
              value={email}
              onChange={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Input
              value={password}
              onChange={setPassword}
              placeholder="Password"
              secureTextEntry
            />

            <Checkbox
              checked={agreedToTerms}
              onChange={setAgreedToTerms}
              label="I agree to the Terms of Service and Privacy Policy"
            />

            <Button
              onPress={onSignup}
              variant="primary"
              size="lg"
              disabled={!agreedToTerms}
            >
              Sign Up
            </Button>
          </View>

          <View style={styles.footer}>
            <Typography variant="body">Already have an account?</Typography>
            <Button onPress={navigateToLogin} variant="plain">
              Log in
            </Button>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
    justifyContent: "center",
  },
  form: {
    gap: 16,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
```

### forgot-password.tsx

```typescript
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Typography, Input, Button, Container, Alert } from "@morphkit/react-native";
import { handleForgotPassword } from "../handlers/auth-handlers";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const onResetPassword = () => {
    handleForgotPassword(email);
  };

  const navigateToLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <Container>
      <View style={styles.container}>
        <Typography variant="title-1">Reset Password</Typography>
        <Typography variant="body">
          Enter your email address and we'll send you a link to reset your password
        </Typography>

        <Alert variant="info">
          Check your spam folder if you don't see the email within a few minutes
        </Alert>

        <View style={styles.form}>
          <Input
            value={email}
            onChange={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Button onPress={onResetPassword} variant="primary" size="lg">
            Send Reset Link
          </Button>

          <Button onPress={navigateToLogin} variant="plain">
            Back to login
          </Button>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
    justifyContent: "center",
  },
  form: {
    gap: 16,
  },
});
```

### handlers/auth-handlers.ts

```typescript
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
}

export interface SocialLoginData {
  provider: "google" | "apple" | "facebook";
  accessToken?: string;
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
  //   const user = await authService.signup({
  //     name: data.name,
  //     email: data.email,
  //     password: data.password,
  //   });
  //   await sendVerificationEmail(user.email);
  //   showSuccessToast("Account created! Check your email.");
  //   router.push("/(auth)/verify-email");
  // } catch (error) {
  //   showErrorToast(error.message);
  // }
};

export const handleSocialLogin = (data: SocialLoginData): void => {
  // Implementation left to developer
  // Example:
  // try {
  //   const user = await authService.socialLogin(data.provider, data.accessToken);
  //   await authStore.setUser(user);
  //   router.push("/(app)/home");
  // } catch (error) {
  //   showErrorToast("Social login failed");
  // }
};

export const handleForgotPassword = (email: string): void => {
  // Implementation left to developer
  // Example:
  // try {
  //   await authService.sendPasswordResetEmail(email);
  //   showSuccessToast("Reset link sent! Check your email.");
  //   router.push("/(auth)/login");
  // } catch (error) {
  //   showErrorToast("Failed to send reset link");
  // }
};
```

### types.ts

```typescript
export type AuthScreen = "login" | "signup" | "forgot-password";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthError {
  code: string;
  message: string;
}
```

### README.md (excerpt)

```markdown
# Authentication Flow

Standard authentication flow with email/password login, signup, and password reset.

## Variants

### Default (`/(default)/`)

Email and password authentication with social login options.

**Screens**:

- `login.tsx` - User login with email/password and social options
- `signup.tsx` - New user registration with terms agreement
- `forgot-password.tsx` - Password reset request

**Navigation Flow**:
\`\`\`
login → (on success) → home
login → signup → login
login → forgot-password → login
signup → (on success) → verify-email
\`\`\`

## Components Used

- Typography (title-1, body)
- Input (email, password types)
- Button (primary, secondary, plain variants)
- Container
- Checkbox
- Divider
- Alert

## Usage

\`\`\`bash
cp -r packages/react-native-flows/src/auth/(default)/\* app/(auth)/
\`\`\`
```

---

## Example 2: Onboarding Flow

### Flow Overview

**Flow Name**: `onboarding`
**Variant**: `(default)`
**Description**: Multi-step onboarding with progress indicator
**Screens**: 4 screens (welcome, features, permissions, complete)

### File Structure

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

### welcome.tsx

```typescript
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Typography, Button, Container, Progress } from "@morphkit/react-native";

export default function Welcome() {
  const router = useRouter();

  const onContinue = () => {
    router.push("/(onboarding)/features");
  };

  const onSkip = () => {
    router.replace("/(app)/home");
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.header}>
          <Progress variant="bar" value={25} max={100} />
          <Typography variant="caption-1">Step 1 of 4</Typography>
        </View>

        <View style={styles.content}>
          <Typography variant="large-title">Welcome to App</Typography>
          <Typography variant="body">
            We'll help you get started with a quick tour of the key features
          </Typography>
        </View>

        <View style={styles.footer}>
          <Button onPress={onContinue} variant="primary" size="lg">
            Get Started
          </Button>
          <Button onPress={onSkip} variant="plain">
            Skip for now
          </Button>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    gap: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  footer: {
    gap: 12,
  },
});
```

### features.tsx

```typescript
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Typography, Button, Container, Progress, Card } from "@morphkit/react-native";

export default function Features() {
  const router = useRouter();

  const onContinue = () => {
    router.push("/(onboarding)/permissions");
  };

  const onBack = () => {
    router.back();
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.header}>
          <Progress variant="bar" value={50} max={100} />
          <Typography variant="caption-1">Step 2 of 4</Typography>
        </View>

        <View style={styles.content}>
          <Typography variant="title-1">Key Features</Typography>

          <View style={styles.features}>
            <Card>
              <Typography variant="heading">Feature 1</Typography>
              <Typography variant="body">Description of feature 1</Typography>
            </Card>
            <Card>
              <Typography variant="heading">Feature 2</Typography>
              <Typography variant="body">Description of feature 2</Typography>
            </Card>
            <Card>
              <Typography variant="heading">Feature 3</Typography>
              <Typography variant="body">Description of feature 3</Typography>
            </Card>
          </View>
        </View>

        <View style={styles.footer}>
          <Button onPress={onContinue} variant="primary" size="lg">
            Continue
          </Button>
          <Button onPress={onBack} variant="secondary">
            Back
          </Button>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    gap: 8,
  },
  content: {
    flex: 1,
    gap: 24,
  },
  features: {
    gap: 16,
  },
  footer: {
    gap: 12,
  },
});
```

### permissions.tsx

```typescript
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Typography, Button, Container, Progress, Switch, Alert } from "@morphkit/react-native";
import { handleRequestPermissions } from "../handlers/onboarding-handlers";

export default function Permissions() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(false);
  const [location, setLocation] = useState(false);

  const onRequestNotifications = () => {
    setNotifications(true);
    handleRequestPermissions("notifications");
  };

  const onRequestLocation = () => {
    setLocation(true);
    handleRequestPermissions("location");
  };

  const onContinue = () => {
    router.push("/(onboarding)/complete");
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.header}>
          <Progress variant="bar" value={75} max={100} />
          <Typography variant="caption-1">Step 3 of 4</Typography>
        </View>

        <View style={styles.content}>
          <Typography variant="title-1">Permissions</Typography>
          <Typography variant="body">
            Enable permissions to get the most out of the app
          </Typography>

          <View style={styles.permissions}>
            <View style={styles.permissionItem}>
              <View style={styles.permissionInfo}>
                <Typography variant="heading">Notifications</Typography>
                <Typography variant="body">Receive important updates</Typography>
              </View>
              <Button onPress={onRequestNotifications} variant="secondary" size="sm">
                {notifications ? "Enabled" : "Enable"}
              </Button>
            </View>

            <View style={styles.permissionItem}>
              <View style={styles.permissionInfo}>
                <Typography variant="heading">Location</Typography>
                <Typography variant="body">Personalized recommendations</Typography>
              </View>
              <Button onPress={onRequestLocation} variant="secondary" size="sm">
                {location ? "Enabled" : "Enable"}
              </Button>
            </View>
          </View>

          <Alert variant="info">
            You can change these permissions anytime in settings
          </Alert>
        </View>

        <View style={styles.footer}>
          <Button onPress={onContinue} variant="primary" size="lg">
            Continue
          </Button>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    gap: 8,
  },
  content: {
    flex: 1,
    gap: 24,
  },
  permissions: {
    gap: 16,
  },
  permissionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  permissionInfo: {
    flex: 1,
    gap: 4,
  },
  footer: {
    gap: 12,
  },
});
```

### complete.tsx

```typescript
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Typography, Button, Container, Progress } from "@morphkit/react-native";
import { handleCompleteOnboarding } from "../handlers/onboarding-handlers";

export default function Complete() {
  const router = useRouter();

  const onComplete = () => {
    handleCompleteOnboarding();
    router.replace("/(app)/home");
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.header}>
          <Progress variant="bar" value={100} max={100} />
          <Typography variant="caption-1">Step 4 of 4</Typography>
        </View>

        <View style={styles.content}>
          <Typography variant="large-title">You're All Set!</Typography>
          <Typography variant="body">
            Start exploring the app and discover all the features
          </Typography>
        </View>

        <View style={styles.footer}>
          <Button onPress={onComplete} variant="primary" size="lg">
            Get Started
          </Button>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    gap: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  footer: {
    gap: 12,
  },
});
```

### handlers/onboarding-handlers.ts

```typescript
export type Permission = "notifications" | "location" | "camera";

export interface OnboardingData {
  permissions: Permission[];
  skipped: boolean;
}

export const handleRequestPermissions = (permission: Permission): void => {
  // Implementation left to developer
  // Example:
  // try {
  //   const granted = await requestPermission(permission);
  //   if (granted) {
  //     await savePermissionPreference(permission, true);
  //   }
  // } catch (error) {
  //   showErrorToast(`Failed to enable ${permission}`);
  // }
};

export const handleCompleteOnboarding = (): void => {
  // Implementation left to developer
  // Example:
  // try {
  //   await AsyncStorage.setItem("onboarding_completed", "true");
  //   await analytics.track("onboarding_completed");
  // } catch (error) {
  //   console.error("Failed to save onboarding status");
  // }
};

export const handleSkipOnboarding = (): void => {
  // Implementation left to developer
  // Example:
  // await AsyncStorage.setItem("onboarding_skipped", "true");
  // router.replace("/(app)/home");
};
```

---

## Summary

These examples demonstrate:

**Complete file structure** for multi-screen flows

**Proper component usage**:

- Typography for all text
- Container for page wrapper
- Input with proper keyboard types
- Button with variants and sizes
- Progress for multi-step flows
- Alert for informational messages
- Card for grouped content
- Checkbox and Switch for selections

**Navigation patterns**:

- router.push() for forward navigation
- router.back() for backward navigation
- router.replace() for final destinations

**Handler extraction**:

- All business logic in separate handlers file
- Type-safe interfaces
- Empty implementations with examples in comments

**StyleSheet patterns**:

- Layout properties only (flex, padding, gap)
- No colors, borders, or typography styling
- Responsive layouts with percentages

**State management**:

- useState for local form state
- Handlers called from event callbacks
- Loading and error states handled in screens
