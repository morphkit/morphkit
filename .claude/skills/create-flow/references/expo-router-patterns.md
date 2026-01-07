# Expo Router Patterns

Complete guide to Expo Router v6 file-based routing for React Native flows.

## File-Based Routing Fundamentals

Expo Router uses the filesystem to define your app's routes. Every file in the `app/` directory becomes a route.

### Basic Route Structure

```
app/
├── index.tsx          → / (home screen)
├── about.tsx          → /about
└── profile.tsx        → /profile
```

### Nested Routes

```
app/
├── index.tsx          → /
└── settings/
    ├── index.tsx      → /settings
    ├── account.tsx    → /settings/account
    └── privacy.tsx    → /settings/privacy
```

## Route Groups

Route groups let you organize routes without affecting the URL structure. Use parentheses `(group-name)/` to create route groups.

### Why Route Groups?

- Organize related screens logically
- Share layouts between screens
- Create multiple variants of the same flow
- Keep file structure clean

### Route Group Syntax

```
app/
├── (auth)/
│   ├── _layout.tsx    → Shared layout for auth screens
│   ├── login.tsx      → /login (not /auth/login)
│   ├── signup.tsx     → /signup
│   └── reset.tsx      → /reset
└── (main)/
    ├── _layout.tsx    → Shared layout for main screens
    ├── home.tsx       → /home
    └── profile.tsx    → /profile
```

The `(auth)` and `(main)` folders are **not** part of the URL. They're organizational only.

### Multiple Variants with Route Groups

```
app/
└── flows/
    └── auth/
        ├── (default)/
        │   ├── _layout.tsx
        │   ├── login.tsx      → /flows/auth/login
        │   └── signup.tsx     → /flows/auth/signup
        └── (with-phone)/
            ├── _layout.tsx
            ├── phone.tsx       → /flows/auth/phone
            ├── verify-otp.tsx  → /flows/auth/verify-otp
            └── profile.tsx     → /flows/auth/profile
```

Both variants share the same base URL path but have different screen sets.

## Layout Files

Layout files (`_layout.tsx`) wrap all child routes and define navigation structure.

### Stack Navigation Layout

```typescript
import { Stack } from "expo-router";

export default function Layout() {
  return <Stack />;
}
```

### Stack with Options

```typescript
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    />
  );
}
```

### Per-Screen Options

```typescript
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Log In",
          headerShown: true,
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

### Tab Navigation Layout

```typescript
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
```

### Drawer Navigation Layout

```typescript
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerType: "slide",
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Home",
          drawerLabel: "Home",
        }}
      />
    </Drawer>
  );
}
```

## Navigation Hooks

### useRouter()

Programmatic navigation:

```typescript
import { useRouter } from "expo-router";

export default function Screen() {
  const router = useRouter();

  const navigateToProfile = () => {
    router.push("/profile");
  };

  const navigateBack = () => {
    router.back();
  };

  const replaceWithHome = () => {
    router.replace("/home");
  };

  return (
    <View>
      <Button onPress={navigateToProfile}>Go to Profile</Button>
      <Button onPress={navigateBack}>Go Back</Button>
      <Button onPress={replaceWithHome}>Replace with Home</Button>
    </View>
  );
}
```

**Navigation Methods**:

- `router.push(href)` - Navigate forward, adds to history
- `router.replace(href)` - Replace current screen, no back navigation
- `router.back()` - Navigate back in history
- `router.setParams(params)` - Update current route params

### usePathname()

Get the current pathname:

```typescript
import { usePathname } from "expo-router";

export default function Screen() {
  const pathname = usePathname();

  return <Typography>Current path: {pathname}</Typography>;
}
```

Useful for:

- Highlighting active navigation items
- Conditional rendering based on route
- Analytics tracking

### useLocalSearchParams()

Access route parameters:

```typescript
import { useLocalSearchParams } from "expo-router";

export default function Screen() {
  const { id, category } = useLocalSearchParams<{ id: string; category: string }>();

  return (
    <View>
      <Typography>ID: {id}</Typography>
      <Typography>Category: {category}</Typography>
    </View>
  );
}
```

### useSegments()

Get the current route segments:

```typescript
import { useSegments } from "expo-router";

export default function Screen() {
  const segments = useSegments();

  return <Typography>Segments: {segments.join("/")}</Typography>;
}
```

## Dynamic Routes

Create dynamic routes using square brackets `[param]`.

### Single Dynamic Route

```
app/
└── user/
    └── [id].tsx       → /user/123, /user/456
```

```typescript
import { useLocalSearchParams } from "expo-router";

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <Typography>User ID: {id}</Typography>;
}
```

### Multiple Parameters

```
app/
└── post/
    └── [category]/
        └── [id].tsx   → /post/tech/123, /post/news/456
```

```typescript
import { useLocalSearchParams } from "expo-router";

export default function Post() {
  const { category, id } = useLocalSearchParams<{ category: string; id: string }>();

  return (
    <View>
      <Typography>Category: {category}</Typography>
      <Typography>Post ID: {id}</Typography>
    </View>
  );
}
```

### Catch-All Routes

```
app/
└── [...slug].tsx      → /any/path/here
```

```typescript
import { useLocalSearchParams } from "expo-router";

export default function CatchAll() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>();

  return <Typography>Path: {slug.join("/")}</Typography>;
}
```

## Type-Safe Navigation

### Define Route Types

```typescript
type RootStackParamList = {
  "/": undefined;
  "/login": undefined;
  "/profile": { userId: string };
  "/post/[id]": { id: string };
};
```

### Type-Safe Push

```typescript
import { useRouter } from "expo-router";

const router = useRouter();

router.push({
  pathname: "/profile",
  params: { userId: "123" },
});

router.push({
  pathname: "/post/[id]",
  params: { id: "456" },
});
```

### Type-Safe useLocalSearchParams

```typescript
interface ProfileParams {
  userId: string;
  tab?: string;
}

export default function Profile() {
  const { userId, tab } = useLocalSearchParams<ProfileParams>();

  return (
    <View>
      <Typography>User: {userId}</Typography>
      {tab && <Typography>Tab: {tab}</Typography>}
    </View>
  );
}
```

## Screen Component Structure

### Basic Screen Template

```typescript
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Typography, Button, Container } from "@warp-ui/react-native";

export default function Screen() {
  const router = useRouter();

  const handleAction = () => {
    router.push("/next-screen");
  };

  return (
    <Container>
      <View style={styles.container}>
        <Typography variant="title-1">Screen Title</Typography>
        <Button onPress={handleAction} variant="primary">
          Continue
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
  },
});
```

### Screen with State

```typescript
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Typography, Input, Button, Container } from "@warp-ui/react-native";

export default function FormScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    router.push({
      pathname: "/confirmation",
      params: { name, email },
    });
  };

  return (
    <Container>
      <View style={styles.container}>
        <Typography variant="title-1">Enter Details</Typography>
        <Input value={name} onChange={setName} placeholder="Name" />
        <Input value={email} onChange={setEmail} placeholder="Email" keyboardType="email-address" />
        <Button onPress={handleSubmit} variant="primary" disabled={!name || !email}>
          Submit
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
  },
});
```

### Screen with Loading State

```typescript
import { View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Typography, Spinner, Container } from "@warp-ui/react-native";

export default function DataScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setLoading(false);
  };

  if (loading) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <Spinner size="lg" />
          <Typography variant="body">Loading...</Typography>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView style={styles.scrollContainer}>
        <Typography variant="title-1">Data</Typography>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  scrollContainer: {
    flex: 1,
    padding: 24,
  },
});
```

## Common Navigation Flows

### Linear Flow (Wizard)

```
app/
└── (onboarding)/
    ├── _layout.tsx
    ├── welcome.tsx    → step 1
    ├── features.tsx   → step 2
    ├── permissions.tsx → step 3
    └── complete.tsx   → step 4
```

Navigation: `welcome → features → permissions → complete`

```typescript
const router = useRouter();

const goToNextStep = () => {
  router.push("/(onboarding)/features");
};
```

### Branching Flow (Conditional)

```
app/
└── (checkout)/
    ├── cart.tsx
    ├── shipping.tsx
    ├── payment.tsx
    └── confirmation.tsx
```

Navigation:

- `cart → shipping → payment → confirmation`
- `cart → (if guest) → login → shipping → ...`

```typescript
const router = useRouter();

const proceedToShipping = () => {
  if (isLoggedIn) {
    router.push("/(checkout)/shipping");
  } else {
    router.push("/login?redirect=/(checkout)/shipping");
  }
};
```

### Tab-Based Flow

```
app/
└── (tabs)/
    ├── _layout.tsx    → Tabs layout
    ├── home.tsx       → Tab 1
    ├── search.tsx     → Tab 2
    └── profile.tsx    → Tab 3
```

Users can switch between tabs freely.

### Modal Flow

```typescript
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
```

## Navigation Best Practices

### Use router.replace() for Auth Flows

```typescript
const handleLogin = async () => {
  await authService.login(credentials);
  router.replace("/(app)/home");
};
```

Prevents back navigation to login screen after successful authentication.

### Use router.push() for Forward Navigation

```typescript
const navigateToDetails = () => {
  router.push("/details");
};
```

Allows back navigation to return to previous screen.

### Use router.back() for Cancel/Close Actions

```typescript
const handleCancel = () => {
  router.back();
};
```

Returns to previous screen in navigation history.

### Pass Data via Route Params (Small Data)

```typescript
router.push({
  pathname: "/details",
  params: { id: "123", name: "John" },
});
```

Use for IDs, simple strings, numbers.

### Use Context/State for Complex Data

```typescript
const [formData, setFormData] = useContext(FormContext);

router.push("/step-2");
```

Use Context, Redux, or Zustand for complex objects and arrays.

### Validate Required Params

```typescript
export default function Screen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return <ErrorScreen message="Invalid ID" />;
  }

  return <Content id={id} />;
}
```

Always validate required parameters exist before using them.

## Expo Router Configuration

### app.json Configuration

```json
{
  "expo": {
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

### Entry Point (package.json)

```json
{
  "main": "expo-router/entry"
}
```

This replaces the traditional `App.tsx` entry point.

## Summary

**Route Groups**: Use `(group-name)/` to organize routes without affecting URLs

**Layouts**: Create `_layout.tsx` to wrap child routes with navigation structure

**Navigation Hooks**:

- `useRouter()` - Programmatic navigation
- `usePathname()` - Get current pathname
- `useLocalSearchParams()` - Access route parameters

**Navigation Methods**:

- `router.push()` - Forward navigation (allows back)
- `router.replace()` - Replace current screen (no back)
- `router.back()` - Navigate backwards

**Dynamic Routes**: Use `[param].tsx` for parameterized routes

**Type Safety**: Define route types and use typed navigation
