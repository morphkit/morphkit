# Event Handlers Guide

Complete guide for extracting and structuring event handlers in flow templates.

## Overview

Event handlers are functions that contain business logic (API calls, data processing, state updates). In flow templates, handlers are **extracted to separate files** and left **empty with type signatures** for developers to implement.

## Why Extract Handlers?

**Benefits**:

- Separation of concerns (UI vs logic)
- Easier to test business logic
- Clear interface for what needs implementation
- Developers see exactly what to implement
- Type-safe contracts

**Without Extraction** (❌):

```typescript
const onLogin = async () => {
  // Business logic mixed with UI component
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  // ... more logic
};
```

**With Extraction** (✅):

```typescript
// Screen file - just UI
const onLogin = () => {
  handleLogin({ email, password });
};

// Handler file - business logic interface
export const handleLogin = (credentials: LoginCredentials): void => {
  // Implementation left to developer
};
```

## When to Extract Handlers

### Extract to Handlers

**Extract these to `handlers/{flow}-handlers.ts`**:

✅ **Form Submissions**

- Login, signup, forgot password
- Profile updates
- Settings changes
- Any form with data

✅ **API Calls**

- Authentication requests
- Data fetching
- CRUD operations
- Third-party integrations

✅ **Business Logic**

- Validation (complex rules)
- Data transformations
- Calculations
- State mutations (complex)

✅ **Side Effects**

- Analytics tracking
- Storage operations (AsyncStorage)
- File uploads
- Push notification registration

### Keep Inline

**Keep these in the screen component**:

❌ **Simple State Updates**

```typescript
const [email, setEmail] = useState("");
<Input value={email} onChange={setEmail} />
```

❌ **Navigation Calls**

```typescript
const navigateToSignup = () => {
  router.push("/(auth)/signup");
};
```

❌ **Simple UI Logic**

```typescript
const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
```

❌ **Computed Values**

```typescript
const isFormValid = email.length > 0 && password.length > 0;
```

## Handler File Structure

### File Location

```
src/{flow-name}/
└── handlers/
    └── {flow}-handlers.ts
```

Examples:

- `src/auth/handlers/auth-handlers.ts`
- `src/onboarding/handlers/onboarding-handlers.ts`
- `src/checkout/handlers/checkout-handlers.ts`

### File Template

```typescript
// Type definitions at top
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

export interface SocialProvider {
  provider: "google" | "apple" | "facebook";
  accessToken?: string;
}

// Handler functions below types
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

export const handleSocialLogin = (social: SocialProvider): void => {
  // Implementation left to developer
};

export const handleForgotPassword = (email: string): void => {
  // Implementation left to developer
};

export const handleResetPassword = (
  token: string,
  newPassword: string,
): void => {
  // Implementation left to developer
};
```

## Naming Conventions

### Handler Function Names

Use `handle` prefix + action name:

| Screen Action   | Handler Name           |
| --------------- | ---------------------- |
| Login button    | `handleLogin`          |
| Signup form     | `handleSignup`         |
| Forgot password | `handleForgotPassword` |
| Reset password  | `handleResetPassword`  |
| Update profile  | `handleProfileUpdate`  |
| Delete account  | `handleAccountDelete`  |
| Continue button | `handleContinue`       |
| Submit form     | `handleSubmit`         |
| Social login    | `handleSocialLogin`    |
| Google login    | `handleGoogleLogin`    |

### Interface Names

Use descriptive nouns for data interfaces:

| Handler Parameter | Interface Name        |
| ----------------- | --------------------- |
| Login credentials | `LoginCredentials`    |
| Signup data       | `SignupData`          |
| Profile updates   | `ProfileUpdate`       |
| Reset data        | `ResetPasswordData`   |
| OTP verification  | `OTPVerificationData` |
| Payment info      | `PaymentInformation`  |

## Type Definitions

### Interface Best Practices

**Good Interface** (✅):

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
```

**Poor Interface** (❌):

```typescript
export interface LoginData {
  data: any; // Don't use `any`
}

export interface Signup {
  [key: string]: string; // Too vague
}
```

### Optional vs Required Fields

Use `?` for optional fields:

```typescript
export interface ProfileUpdate {
  name: string; // Required
  email: string; // Required
  avatar?: string; // Optional
  bio?: string; // Optional
  phone?: string; // Optional
}
```

### Union Types for Variants

```typescript
export type SocialProvider = "google" | "apple" | "facebook";

export interface SocialLoginData {
  provider: SocialProvider;
  accessToken?: string;
}
```

### Nested Interfaces

```typescript
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CheckoutData {
  shippingAddress: Address;
  billingAddress?: Address;
  useShippingAsBilling: boolean;
}
```

## Handler Implementations (Examples Only)

Handlers are left empty, but provide example implementations in comments:

### Simple Handler

```typescript
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
```

### Async Handler with Error Handling

```typescript
export const handleSignup = (data: SignupData): void => {
  // Implementation left to developer
  // Example:
  // try {
  //   const user = await authService.signup({
  //     name: data.name,
  //     email: data.email,
  //     password: data.password,
  //   });
  //
  //   await sendVerificationEmail(user.email);
  //
  //   showSuccessToast("Account created! Check your email.");
  //   router.push("/(auth)/verify-email");
  // } catch (error) {
  //   if (error.code === "EMAIL_EXISTS") {
  //     showErrorToast("Email already registered");
  //   } else {
  //     showErrorToast("Signup failed. Please try again.");
  //   }
  // }
};
```

### Handler with Multiple Steps

```typescript
export const handleCheckout = (data: CheckoutData): void => {
  // Implementation left to developer
  // Example:
  // try {
  //   // Step 1: Validate cart
  //   const cart = await cartService.getCart();
  //   if (cart.items.length === 0) {
  //     throw new Error("Cart is empty");
  //   }
  //
  //   // Step 2: Process payment
  //   const payment = await paymentService.charge({
  //     amount: cart.total,
  //     paymentMethod: data.paymentMethod,
  //   });
  //
  //   // Step 3: Create order
  //   const order = await orderService.create({
  //     cartId: cart.id,
  //     paymentId: payment.id,
  //     shippingAddress: data.shippingAddress,
  //   });
  //
  //   // Step 4: Clear cart and navigate
  //   await cartService.clear();
  //   router.push(`/order-confirmation/${order.id}`);
  // } catch (error) {
  //   handleCheckoutError(error);
  // }
};
```

### Handler with Validation

```typescript
export const handleProfileUpdate = (data: ProfileUpdate): void => {
  // Implementation left to developer
  // Example:
  // try {
  //   // Validation
  //   if (!data.name || data.name.length < 2) {
  //     throw new Error("Name must be at least 2 characters");
  //   }
  //
  //   if (!isValidEmail(data.email)) {
  //     throw new Error("Invalid email format");
  //   }
  //
  //   // Update profile
  //   const user = await userService.updateProfile({
  //     name: data.name,
  //     email: data.email,
  //     avatar: data.avatar,
  //     bio: data.bio,
  //   });
  //
  //   // Update local state
  //   await authStore.setUser(user);
  //
  //   showSuccessToast("Profile updated successfully");
  //   router.back();
  // } catch (error) {
  //   showErrorToast(error.message);
  // }
};
```

## Screen-Handler Integration

### Importing Handlers

```typescript
import { handleLogin, LoginCredentials } from "../handlers/auth-handlers";
```

### Calling Handlers

**Simple Call**:

```typescript
const onLogin = () => {
  handleLogin({ email, password });
};
```

**With Loading State**:

```typescript
const [loading, setLoading] = useState(false);

const onLogin = async () => {
  setLoading(true);
  try {
    await handleLogin({ email, password });
  } finally {
    setLoading(false);
  }
};
```

**With Error State**:

```typescript
const [error, setError] = useState<string | null>(null);

const onLogin = async () => {
  setError(null);
  try {
    await handleLogin({ email, password });
  } catch (err) {
    setError(err.message);
  }
};
```

**With Validation**:

```typescript
const onLogin = () => {
  if (!email) {
    showErrorToast("Email is required");
    return;
  }
  if (!password) {
    showErrorToast("Password is required");
    return;
  }

  const credentials: LoginCredentials = { email, password };
  handleLogin(credentials);
};
```

## Common Handler Patterns

### Authentication Handlers

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

export const handleLogin = (credentials: LoginCredentials): void => {};
export const handleSignup = (data: SignupData): void => {};
export const handleLogout = (): void => {};
export const handleForgotPassword = (email: string): void => {};
export const handleResetPassword = (
  token: string,
  password: string,
): void => {};
export const handleVerifyEmail = (token: string): void => {};
export const handleResendVerification = (email: string): void => {};
```

### Profile Handlers

```typescript
export interface ProfileUpdate {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export const handleProfileUpdate = (data: ProfileUpdate): void => {};
export const handleAvatarUpload = (imageUri: string): void => {};
export const handlePasswordChange = (
  oldPassword: string,
  newPassword: string,
): void => {};
export const handleAccountDelete = (): void => {};
```

### Onboarding Handlers

```typescript
export interface OnboardingData {
  interests: string[];
  notifications: boolean;
  location?: string;
}

export const handleCompleteOnboarding = (data: OnboardingData): void => {};
export const handleSkipStep = (stepName: string): void => {};
export const handleRequestPermissions = (
  permission: "location" | "notifications" | "camera",
): void => {};
```

### Checkout Handlers

```typescript
export interface PaymentMethod {
  type: "card" | "paypal" | "apple-pay";
  token: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export const handleAddToCart = (
  productId: string,
  quantity: number,
): void => {};
export const handleUpdateQuantity = (
  itemId: string,
  quantity: number,
): void => {};
export const handleRemoveFromCart = (itemId: string): void => {};
export const handleApplyDiscount = (code: string): void => {};
export const handleCheckout = (
  payment: PaymentMethod,
  shipping: ShippingInfo,
): void => {};
```

## Return Types

### Void for User Actions

Most handlers return `void` because they represent user-initiated actions:

```typescript
export const handleLogin = (credentials: LoginCredentials): void => {};
export const handleSignup = (data: SignupData): void => {};
```

Developers will make these async and handle results internally.

### Promise<void> for Async Operations

If you want to indicate async nature:

```typescript
export const handleLogin = async (
  credentials: LoginCredentials,
): Promise<void> => {};
```

But `void` is simpler and lets developers decide sync vs async.

### Avoid Returning Data

Don't return data from handlers:

**Bad** (❌):

```typescript
export const handleLogin = (credentials: LoginCredentials): User => {
  // Handler returns data?
};
```

**Good** (✅):

```typescript
export const handleLogin = (credentials: LoginCredentials): void => {
  // Developer updates state internally
};
```

## Documentation in Handlers

Use JSDoc comments for complex handlers:

```typescript
/**
 * Handles user login with email and password
 *
 * @param credentials - User's email and password
 *
 * @example
 * handleLogin({ email: "user@example.com", password: "password123" });
 */
export const handleLogin = (credentials: LoginCredentials): void => {
  // Implementation left to developer
};

/**
 * Handles social authentication (Google, Apple, Facebook)
 *
 * @param provider - Social provider name and access token
 *
 * @example
 * handleSocialLogin({ provider: "google", accessToken: "abc123" });
 */
export const handleSocialLogin = (provider: SocialProvider): void => {
  // Implementation left to developer
};
```

## Testing Handlers

While handlers are empty in templates, show examples of how to test them:

```typescript
// Example test (not included in template)
// describe("handleLogin", () => {
//   it("should call authService.login with credentials", async () => {
//     const credentials = {
//       email: "test@example.com",
//       password: "password123",
//     };
//
//     await handleLogin(credentials);
//
//     expect(authService.login).toHaveBeenCalledWith(credentials);
//   });
//
//   it("should navigate to home on success", async () => {
//     const credentials = { email: "test@example.com", password: "pass" };
//
//     await handleLogin(credentials);
//
//     expect(router.push).toHaveBeenCalledWith("/(app)/home");
//   });
//
//   it("should show error toast on failure", async () => {
//     authService.login.mockRejectedValue(new Error("Invalid credentials"));
//
//     await handleLogin({ email: "test@example.com", password: "wrong" });
//
//     expect(showErrorToast).toHaveBeenCalledWith("Invalid credentials");
//   });
// });
```

## Summary

**Extract to Handlers**:

- Form submissions
- API calls
- Business logic
- Side effects

**Keep in Screens**:

- Simple state updates
- Navigation calls
- Simple UI logic
- Computed values

**Handler Structure**:

- Type definitions at top
- Handler functions below
- Empty implementation
- Example in comments
- JSDoc for complex handlers

**Naming**:

- Functions: `handle{Action}`
- Interfaces: `{Description}Data` or `{Action}Credentials`
- Use descriptive, specific names

**Return Type**:

- Usually `void`
- Let developers implement async/sync as needed
- Don't return data (use state management)

**Integration**:

- Import handlers in screens
- Call from event handlers
- Add loading/error states in screens
- Developers implement business logic in handlers
