# Figma Analysis Guide

Step-by-step process for analyzing Figma design screenshots to extract flow structure and UI elements.

## Overview

Figma analysis involves:

1. Fetching screenshots from Figma using MCP tools
2. Identifying distinct screens within the design
3. Analyzing UI elements in each screen
4. Mapping navigation flow between screens
5. Extracting layout patterns

## Step 1: Fetch Screenshots from Figma

### Using Figma MCP Tools

```typescript
const screenshot =
  (await mcp__figma) -
  desktop__get_screenshot({
    nodeId: "123:456",
    clientLanguages: "typescript",
    clientFrameworks: "react-native,expo",
  });
```

### Extracting Node ID from Figma URL

Figma URLs come in several formats:

**Design file format**:

```
https://figma.com/design/:fileKey/:fileName?node-id=1-2
```

Extract node ID: `1:2` (replace `-` with `:`)

**Board format (FigJam)**:

```
https://figma.com/board/:fileKey/:fileName?node-id=1-2
```

Extract node ID: `1:2`

**With branch**:

```
https://figma.com/design/:fileKey/branch/:branchKey/:fileName?node-id=1-2
```

Use `branchKey` as the file key, extract node ID: `1:2`

### Error Handling

**Invalid URL**:

```typescript
if (!figmaUrl.includes("figma.com")) {
  throw new Error(
    "Invalid Figma URL. Please provide a valid Figma design link.",
  );
}
```

**No node ID**:

```typescript
const nodeIdMatch = figmaUrl.match(/node-id=([0-9]+-[0-9]+)/);
if (!nodeIdMatch) {
  throw new Error("Figma URL must include a node-id parameter.");
}
```

**Access denied**:

```
Error: Unable to fetch Figma screenshot. Please ensure:
1. The Figma file is shared (at least view access)
2. You have permission to view the file
3. The node ID exists in the file
```

## Step 2: Identify Distinct Screens

Screens are typically separated by:

- **Frame boundaries**: Clear visual separation
- **Background colors**: Different colored backgrounds
- **Titles/headers**: Each screen has a distinct title
- **Spacing**: Significant gaps between screen designs

### Analysis Process

1. **Count frames**: Look for rectangular containers that group UI elements
2. **Identify screen titles**: Top heading or title text in each frame
3. **Note screen boundaries**: Where one screen ends and another begins
4. **Number screens**: Assign sequential numbers for tracking

### Example Analysis

**Figma Screenshot Contains**:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   "Welcome"     │  │    "Sign Up"    │  │   "Verify"      │
│                 │  │                 │  │                 │
│  Welcome text   │  │  Name input     │  │  OTP input      │
│  Get Started    │  │  Email input    │  │  Verify button  │
│  button         │  │  Password input │  │                 │
│                 │  │  Sign Up button │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Identified Screens**:

1. Screen 1: "welcome" - Onboarding welcome screen
2. Screen 2: "signup" - User registration form
3. Screen 3: "verify" - OTP verification

### Naming Screens

Convert screen titles to kebab-case:

| Title              | Screen Name       |
| ------------------ | ----------------- |
| "Welcome"          | `welcome`         |
| "Log In"           | `login`           |
| "Sign Up"          | `signup`          |
| "Forgot Password?" | `forgot-password` |
| "Verify Email"     | `verify-email`    |
| "User Profile"     | `user-profile`    |

Rules:

- Lowercase only
- Replace spaces with hyphens
- Remove special characters (?, !, etc.)
- Keep concise (max 3 words)

## Step 3: Analyze UI Elements Per Screen

For each identified screen, analyze UI elements from **top to bottom**, **left to right**.

### Element Categories

**Text Elements**:

- Headings (large text, bold)
- Body text (regular size, paragraph)
- Labels (small text above inputs)
- Caption text (tiny text, hints, errors)
- Links (underlined or colored text)

**Input Elements**:

- Text fields (single line input)
- Text areas (multi-line input)
- Password fields (masked input)
- Dropdowns/Selects (picker UI)
- Checkboxes (square selector)
- Radio buttons (circular selector)
- Toggle switches
- Date pickers
- OTP inputs (4-6 digit codes)

**Interactive Elements**:

- Primary buttons (filled, prominent)
- Secondary buttons (outlined)
- Text/link buttons (no background)
- Icon buttons
- Floating action buttons (FAB)

**Content Elements**:

- Images
- Icons
- Avatars
- Cards (grouped content)
- Dividers/separators
- Progress bars
- Spinners/loading indicators
- Badges
- Tags

**Container Elements**:

- Sections/groups
- Scrollable areas
- Modals/dialogs
- Tabs
- Accordions

### Analysis Template

For each screen, document:

```typescript
{
  name: "screen-name",
  title: "Screen Title",
  elements: [
    {
      type: "heading" | "body" | "input" | "button" | "image" | "container",
      text: "Visible text content",
      size: "small" | "medium" | "large",
      variant: "primary" | "secondary" | "plain",
      inputType: "text" | "email" | "password" | "number",
      placeholder: "Placeholder text",
      required: true | false,
      disabled: false | true
    }
  ],
  layout: "centered" | "top-aligned" | "scrollable" | "grid" | "list",
  navigation: {
    next: ["screen-name"],
    back: "screen-name" | null
  }
}
```

### Example: Login Screen Analysis

**Figma Screenshot**:

```
┌─────────────────────────────┐
│                             │
│       "Welcome Back"        │  ← Title (large, 32px)
│                             │
│  ┌───────────────────────┐  │
│  │ Email                 │  │  ← Input label (small, 14px)
│  │ your@email.com        │  │  ← Input field
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Password              │  │  ← Input label
│  │ ••••••••••            │  │  ← Password input (masked)
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │      Log In           │  │  ← Primary button (filled, blue)
│  └───────────────────────┘  │
│                             │
│    Forgot password?         │  ← Link (blue, underlined)
│                             │
│    Don't have an account?   │  ← Body text (gray)
│    Sign up                  │  ← Link (blue)
│                             │
└─────────────────────────────┘
```

**Analyzed Data**:

```typescript
{
  name: "login",
  title: "Welcome Back",
  elements: [
    { type: "heading", text: "Welcome Back", size: "large" },
    { type: "input", label: "Email", inputType: "email", placeholder: "your@email.com", required: true },
    { type: "input", label: "Password", inputType: "password", placeholder: "••••••••••", required: true },
    { type: "button", text: "Log In", variant: "primary", size: "medium" },
    { type: "link", text: "Forgot password?", destination: "forgot-password" },
    { type: "body", text: "Don't have an account?" },
    { type: "link", text: "Sign up", destination: "signup" }
  ],
  layout: "centered",
  navigation: {
    next: ["home", "forgot-password", "signup"],
    back: null
  }
}
```

## Step 4: Identify Layout Patterns

Recognize common layout patterns to structure screens appropriately.

### Centered Form

**Visual Characteristics**:

- Content centered horizontally and vertically
- Fixed width (doesn't fill screen)
- Typical for login, signup, simple forms

**StyleSheet Pattern**:

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
```

### Top-Aligned Content

**Visual Characteristics**:

- Content starts at top of screen
- Full width
- Typical for profiles, settings, content pages

**StyleSheet Pattern**:

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
```

### Scrollable Content

**Visual Characteristics**:

- Content exceeds screen height
- Scroll indicator visible
- Typical for long forms, articles, lists

**Implementation**:

```typescript
import { ScrollView } from "react-native";

<ScrollView style={styles.scrollContainer}>
  {/* Content */}
</ScrollView>
```

### Grid Layout

**Visual Characteristics**:

- Items arranged in columns and rows
- Equal spacing between items
- Typical for image galleries, product grids

**StyleSheet Pattern**:

```typescript
const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  gridItem: {
    width: "48%",
  },
});
```

### List Layout

**Visual Characteristics**:

- Items stacked vertically
- Dividers between items
- Typical for messages, transactions, settings

**StyleSheet Pattern**:

```typescript
const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
});
```

## Step 5: Map Navigation Flow

Identify how users navigate between screens.

### Navigation Triggers

**Button Actions**:

- Primary action → Next screen
- Secondary action → Alternative path
- Cancel/Back → Previous screen

**Link Actions**:

- Text links → Related screens
- "Forgot password?" → Password reset flow
- "Sign up" → Registration flow

**Automatic Navigation**:

- After form submission → Confirmation screen
- After OTP verification → Home screen
- On error → Error screen or stay on current

### Flow Mapping

**Linear Flow**:

```
Screen A → Screen B → Screen C → Screen D
```

Example: Onboarding (Welcome → Features → Permissions → Complete)

**Branching Flow**:

```
Screen A → Screen B (if condition)
Screen A → Screen C (else)
```

Example: Login → Home (if authenticated) | Login → Error (if failed)

**Circular Flow**:

```
Screen A ⇄ Screen B
```

Example: Login ⇄ Signup

**Multi-Path Flow**:

```
Screen A → Screen B
Screen A → Screen C
Screen A → Screen D
```

Example: Home → Profile | Settings | Notifications

### Example: Auth Flow Mapping

```
login → home (success)
login → signup
login → forgot-password

signup → verify-email
signup → login

forgot-password → reset-success → login

verify-email → home
```

## Step 6: Handle Edge Cases

### Modals and Overlays

**Characteristics**:

- Appears on top of existing screen
- Partially transparent background
- Has close/dismiss action

**Implementation**:

- Create as separate screen with modal presentation
- Or use component-level modal (Alert, Toast)

### Multi-State Screens

**Characteristics**:

- Same screen shows different UI based on state
- Loading state, error state, empty state, success state

**Analysis**:

- Identify all states shown in Figma
- Document state transitions
- Create single screen with conditional rendering

**Example**:

```typescript
{
  name: "profile",
  states: {
    loading: { elements: [{ type: "spinner" }] },
    error: { elements: [{ type: "alert", message: "Failed to load" }] },
    success: { elements: [/* normal profile UI */] }
  }
}
```

### Complex Interactions

**Characteristics**:

- Drag and drop
- Swipe gestures
- Pinch to zoom
- Long press actions

**Analysis**:

- Document interaction type
- Note trigger conditions
- Identify result of interaction
- May require custom component or library

### Responsive Layouts

**Characteristics**:

- Different layouts for phone vs tablet
- Portrait vs landscape orientations

**Analysis**:

- Document different layout breakpoints
- Use flexible layouts with percentages
- Avoid fixed pixel dimensions

## Step 7: Output Structured Data

Combine all analysis into a structured format:

```typescript
interface FlowAnalysis {
  flowName: string;
  variantName: string;
  description: string;
  screens: ScreenData[];
  navigationFlow: NavigationMap;
}

interface ScreenData {
  name: string;
  title: string;
  elements: UIElement[];
  layout: LayoutPattern;
  navigation: {
    next: string[];
    back: string | null;
  };
}

interface UIElement {
  type: ElementType;
  text?: string;
  size?: Size;
  variant?: Variant;
  inputType?: InputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  destination?: string;
}
```

**Example Output**:

```typescript
{
  flowName: "auth",
  variantName: "default",
  description: "Standard authentication with email/password",
  screens: [
    {
      name: "login",
      title: "Welcome Back",
      elements: [/* ... */],
      layout: "centered",
      navigation: { next: ["home", "signup", "forgot-password"], back: null }
    },
    {
      name: "signup",
      title: "Create Account",
      elements: [/* ... */],
      layout: "centered",
      navigation: { next: ["verify-email"], back: "login" }
    }
  ],
  navigationFlow: {
    "login": ["home", "signup", "forgot-password"],
    "signup": ["verify-email"],
    "forgot-password": ["login"],
    "verify-email": ["home"]
  }
}
```

## Best Practices

### Accuracy

- Analyze every visible UI element
- Don't skip small details (labels, hints, icons)
- Note disabled states and error messages

### Consistency

- Use consistent naming conventions
- Follow kebab-case for screen names
- Standardize element type names

### Completeness

- Document all screens in the flow
- Map all navigation paths
- Include all interactive elements

### Clarity

- Use descriptive names
- Group related elements
- Provide context for complex interactions

## Summary

1. **Fetch screenshots** using Figma MCP with correct node ID
2. **Identify screens** by looking for frame boundaries and titles
3. **Analyze elements** top-to-bottom, left-to-right for each screen
4. **Identify layout patterns** (centered, scrollable, grid, list)
5. **Map navigation flow** between screens
6. **Handle edge cases** (modals, multi-state, interactions)
7. **Output structured data** for component mapping and code generation
