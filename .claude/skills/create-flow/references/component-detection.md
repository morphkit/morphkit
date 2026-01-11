# Component Detection Guide

Complete decision tree for mapping Figma UI elements to morph-ui components.

## Available Components (27 total)

accordion, alert, avatar, badge, box, button, card, checkbox, container, divider, fab, input, label, otp-input, progress, radio, select, skeleton, slider, spinner, stack, switch, tag, tabs, textarea, toast, typography

## Decision Tree

### Text Elements → Typography

Use **Typography** component for ALL text display. NEVER use React Native's `Text` component.

| Visual Characteristic | Typography Variant      | Use Case                            |
| --------------------- | ----------------------- | ----------------------------------- |
| 34px, bold            | `variant="large-title"` | Main app title, splash screens      |
| 28-32px, bold         | `variant="title-1"`     | Page titles, screen headers         |
| 22-24px, semi-bold    | `variant="title-2"`     | Section titles                      |
| 20px, regular         | `variant="title-3"`     | Subsection titles                   |
| 17-18px, semi-bold    | `variant="heading"`     | Card titles, form section headers   |
| 16-17px, regular      | `variant="body"`        | Body text, paragraphs, descriptions |
| 16px, regular         | `variant="callout"`     | Emphasized body text                |
| 15px, regular         | `variant="subheadline"` | Secondary information               |
| 13px, regular         | `variant="footnote"`    | Help text, timestamps               |
| 12px, regular         | `variant="caption-1"`   | Input labels, minor details         |
| 11px, regular         | `variant="caption-2"`   | Very small text, legal text         |

**Code Example**:

```typescript
import { Typography } from "@morph-ui/react-native";

<Typography variant="title-1">Welcome Back</Typography>
<Typography variant="body">Please enter your credentials</Typography>
<Typography variant="caption-1">Forgot password?</Typography>
```

### Input Elements

#### Single-Line Text Input → Input

**Visual Indicators**:

- Rectangular box with border
- Single line of text
- Placeholder text visible
- May have label above

**Props Mapping**:

| Input Type | Props                                                   |
| ---------- | ------------------------------------------------------- |
| Email      | `keyboardType="email-address"`, `autoCapitalize="none"` |
| Password   | `secureTextEntry={true}`                                |
| Phone      | `keyboardType="phone-pad"`                              |
| Number     | `keyboardType="numeric"`                                |
| URL        | `keyboardType="url"`, `autoCapitalize="none"`           |
| Search     | `placeholder="Search..."`                               |
| Disabled   | `disabled={true}`                                       |
| With Error | `error="Error message"`                                 |
| With Label | Use separate `Label` component or `label` prop          |

**Code Example**:

```typescript
import { Input } from "@morph-ui/react-native";

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
```

#### Multi-Line Text Input → Textarea

**Visual Indicators**:

- Larger rectangular box
- Multiple lines of text
- Resize handle (optional)
- Character count (optional)

**Props Mapping**:

| Feature     | Props                            |
| ----------- | -------------------------------- |
| Max length  | `maxLength={200}`                |
| Auto-resize | `autoResize={true}`              |
| Show count  | `showCount={true}`               |
| Min rows    | `rows={4}`                       |
| Placeholder | `placeholder="Enter message..."` |

**Code Example**:

```typescript
import { Textarea } from "@morph-ui/react-native";

<Textarea
  value={message}
  onChange={setMessage}
  placeholder="Enter your message"
  rows={4}
  maxLength={500}
  showCount
/>
```

#### OTP/Verification Code → OTPInput

**Visual Indicators**:

- 4-6 separate boxes for individual digits
- Auto-advance to next box
- Usually numeric only
- Used for verification codes

**Code Example**:

```typescript
import { OTPInput } from "@morph-ui/react-native";

<OTPInput
  length={6}
  value={otp}
  onChange={setOtp}
/>
```

#### Dropdown/Picker → Select

**Visual Indicators**:

- Dropdown arrow icon
- Shows selected option
- Opens list of options
- May have search

**Code Example**:

```typescript
import { Select } from "@morph-ui/react-native";

<Select
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={[
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
  ]}
  placeholder="Select country"
/>
```

#### Checkbox → Checkbox

**Visual Indicators**:

- Square box with checkmark when selected
- Usually with label text
- Can have indeterminate state

**Code Example**:

```typescript
import { Checkbox } from "@morph-ui/react-native";

<Checkbox
  checked={agreedToTerms}
  onChange={setAgreedToTerms}
  label="I agree to terms and conditions"
/>
```

#### Radio Button → Radio

**Visual Indicators**:

- Circular button
- Filled dot when selected
- Multiple options (only one selected)
- Group of related choices

**Code Example**:

```typescript
import { Radio } from "@morph-ui/react-native";

<Radio
  value={paymentMethod}
  onChange={setPaymentMethod}
  options={[
    { label: "Credit Card", value: "card" },
    { label: "PayPal", value: "paypal" },
    { label: "Bank Transfer", value: "bank" },
  ]}
/>
```

#### Toggle Switch → Switch

**Visual Indicators**:

- Rounded rectangular pill
- Slides left/right
- Binary on/off state
- Usually with label

**Code Example**:

```typescript
import { Switch } from "@morph-ui/react-native";

<Switch
  value={enableNotifications}
  onChange={setEnableNotifications}
  label="Enable push notifications"
/>
```

#### Range Slider → Slider

**Visual Indicators**:

- Horizontal bar with draggable thumb
- Shows numeric value
- May have min/max labels
- Can be single or dual thumb

**Code Example**:

```typescript
import { Slider } from "@morph-ui/react-native";

<Slider
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  step={1}
/>
```

### Button Elements

#### Primary Action Button → Button (variant="primary")

**Visual Indicators**:

- Filled background (solid color)
- Most prominent button on screen
- High contrast text
- Usually one per screen/section

**Code Example**:

```typescript
import { Button } from "@morph-ui/react-native";

<Button variant="primary" onPress={handleSubmit}>
  Sign Up
</Button>
```

#### Secondary Action Button → Button (variant="secondary")

**Visual Indicators**:

- Outlined border, transparent background
- Less prominent than primary
- Usually paired with primary button

**Code Example**:

```typescript
<Button variant="secondary" onPress={handleCancel}>
  Cancel
</Button>
```

#### Text/Link Button → Button (variant="plain")

**Visual Indicators**:

- No background or border
- Just text (often colored or underlined)
- Used for tertiary actions or links

**Code Example**:

```typescript
<Button variant="plain" onPress={navigateToForgotPassword}>
  Forgot password?
</Button>
```

#### Destructive Button → Button (variant="tonal")

**Visual Indicators**:

- Light colored background
- Medium prominence
- For less critical actions

**Code Example**:

```typescript
<Button variant="tonal" onPress={handleEdit}>
  Edit Profile
</Button>
```

#### Button with Icon

**Visual Indicators**:

- Icon + text or icon only
- Icon positioned before or after text

**Code Example**:

```typescript
<Button variant="primary" icon="arrow-right" iconPosition="right" onPress={handleNext}>
  Continue
</Button>
```

#### Button Sizes

| Visual Size      | Size Prop   |
| ---------------- | ----------- |
| Very small       | `size="xs"` |
| Small            | `size="sm"` |
| Medium (default) | `size="md"` |
| Large            | `size="lg"` |
| Extra large      | `size="xl"` |

#### Floating Action Button → FAB

**Visual Indicators**:

- Circular button
- Floats above content (bottom-right)
- Single prominent icon
- Primary action for screen

**Code Example**:

```typescript
import { FAB } from "@morph-ui/react-native";

<FAB
  icon="plus"
  onPress={handleCreate}
  position="bottom-right"
/>
```

### Container Elements

#### Page Wrapper → Container

**Visual Indicators**:

- Full-screen container
- Centers content horizontally
- Responsive max-width
- Root container for screens

**Code Example**:

```typescript
import { Container } from "@morph-ui/react-native";

<Container>
  {/* Screen content */}
</Container>
```

#### Content Card → Card

**Visual Indicators**:

- Elevated container with shadow
- Rounded corners
- Groups related content
- Has padding and border

**Code Example**:

```typescript
import { Card } from "@morph-ui/react-native";

<Card>
  <Typography variant="heading">Card Title</Typography>
  <Typography variant="body">Card content goes here</Typography>
</Card>
```

#### Flexible Layout → Box

**Visual Indicators**:

- Generic container for custom layouts
- No default styling
- Used for flexbox layouts with spacing

**Code Example**:

```typescript
import { Box } from "@morph-ui/react-native";

<Box padding={4} gap="xs">
  {/* Children with consistent spacing */}
</Box>
```

#### Stacked Layout → Stack

**Visual Indicators**:

- Children arranged vertically or horizontally
- Consistent spacing between items
- Alignment options

**Code Example**:

```typescript
import { Stack } from "@morph-ui/react-native";

<Stack direction="vertical" spacing={16} align="center">
  <Typography variant="title-1">Title</Typography>
  <Typography variant="body">Description</Typography>
  <Button variant="primary">Action</Button>
</Stack>
```

### Visual Elements

#### User Avatar → Avatar

**Visual Indicators**:

- Circular image
- Shows user profile picture or initials
- Fixed size (small, medium, large)

**Code Example**:

```typescript
import { Avatar } from "@morph-ui/react-native";

<Avatar source={{ uri: "https://..." }} size="md" />

<Avatar text="JD" size="md" />
```

#### Notification Badge → Badge

**Visual Indicators**:

- Small circular indicator
- Shows count or dot
- Overlays another element (icon, avatar)
- Usually red or blue

**Code Example**:

```typescript
import { Badge } from "@morph-ui/react-native";

<Badge count={5} variant="red">
  <IconComponent />
</Badge>
```

#### Category Tag → Tag

**Visual Indicators**:

- Small pill-shaped label
- Used for categorization or status
- Multiple color variants
- May have dismiss button

**Code Example**:

```typescript
import { Tag } from "@morph-ui/react-native";

<Tag variant="primary" size="sm">
  New
</Tag>

<Tag variant="success" onDismiss={handleRemove}>
  Active
</Tag>
```

#### Visual Separator → Divider

**Visual Indicators**:

- Thin horizontal or vertical line
- Separates content sections
- Subtle gray color

**Code Example**:

```typescript
import { Divider } from "@morph-ui/react-native";

<Divider orientation="horizontal" />
<Divider orientation="vertical" />
```

### Feedback Elements

#### Loading Spinner → Spinner

**Visual Indicators**:

- Circular rotating animation
- Indicates loading state
- Different sizes
- Can be colored

**Code Example**:

```typescript
import { Spinner } from "@morph-ui/react-native";

<Spinner size="md" />
<Spinner size="lg" />
```

#### Progress Bar → Progress

**Visual Indicators**:

- Horizontal bar showing completion
- Percentage or fraction value
- Determinate (known progress) or indeterminate
- Can be circular

**Code Example**:

```typescript
import { Progress } from "@morph-ui/react-native";

<Progress variant="bar" value={75} max={100} />
<Progress variant="circle" value={50} max={100} />
```

#### Loading Placeholder → Skeleton

**Visual Indicators**:

- Gray placeholder with shimmer effect
- Represents loading content
- Matches shape of final content (text, rectangle, circle)

**Code Example**:

```typescript
import { Skeleton } from "@morph-ui/react-native";

<Skeleton variant="text" width={200} />
<Skeleton variant="rectangle" width={300} height={200} />
<Skeleton variant="circle" size={50} />
```

#### Inline Notification → Alert

**Visual Indicators**:

- Colored box with icon
- Info, success, warning, or error variant
- Shows important messages
- May have dismiss button

**Code Example**:

```typescript
import { Alert } from "@morph-ui/react-native";

<Alert variant="success" dismissible>
  Your profile has been updated successfully
</Alert>

<Alert variant="error">
  Please fix the errors before continuing
</Alert>
```

#### Temporary Notification → Toast

**Visual Indicators**:

- Slides in from top or bottom
- Auto-dismisses after timeout
- Shows temporary feedback
- 4 variants (info, success, warning, error)

**Code Example**:

```typescript
import { Toast } from "@morph-ui/react-native";

<Toast
  variant="success"
  message="Changes saved"
  position="bottom"
  duration={3000}
  visible={showToast}
  onDismiss={() => setShowToast(false)}
/>
```

### Interactive Components

#### Expandable Section → Accordion

**Visual Indicators**:

- Collapsible content section
- Header with expand/collapse icon
- Content hidden when collapsed
- Smooth animation

**Code Example**:

```typescript
import { Accordion } from "@morph-ui/react-native";

<Accordion title="Frequently Asked Questions">
  <Typography variant="body">Answer content here...</Typography>
</Accordion>
```

#### Tab Navigation → Tabs

**Visual Indicators**:

- Multiple tab headers
- Content area switches based on active tab
- Horizontal or vertical orientation
- Active tab highlighted

**Code Example**:

```typescript
import { Tabs } from "@morph-ui/react-native";

<Tabs
  tabs={[
    { key: "profile", label: "Profile", content: <ProfileContent /> },
    { key: "settings", label: "Settings", content: <SettingsContent /> },
  ]}
  activeTab="profile"
  onChange={setActiveTab}
/>
```

### Form Labels

#### Form Label → Label

**Visual Indicators**:

- Small text above input field
- May have required indicator (\*)
- Can show error state

**Code Example**:

```typescript
import { Label } from "@morph-ui/react-native";

<Label required error={emailError}>
  Email Address
</Label>
<Input value={email} onChange={setEmail} />
```

## Props Determination from Visuals

### Determining Size

| Visual Size    | Size Prop                  |
| -------------- | -------------------------- |
| <30px height   | `size="xs"` or `size="sm"` |
| 30-40px height | `size="sm"` or `size="md"` |
| 40-50px height | `size="md"`                |
| 50-60px height | `size="lg"`                |
| >60px height   | `size="xl"`                |

### Determining Variant

**Button Variants**:

- Filled with solid color → `variant="primary"`
- Outlined with border → `variant="secondary"`
- No background/border → `variant="plain"`
- Light colored background → `variant="tonal"`

**Alert Variants**:

- Blue background → `variant="info"`
- Green background → `variant="success"`
- Yellow/orange background → `variant="warning"`
- Red background → `variant="error"`

**Tag Variants**:

- Default gray → `variant="default"`
- Blue → `variant="primary"`
- Green → `variant="success"`
- Red → `variant="error"`
- Orange → `variant="warning"`

### Determining Disabled State

**Visual Indicators**:

- Reduced opacity (50-60%)
- Gray color instead of themed color
- Cursor not-allowed (web)
- "Disabled" in screen name or label

**Prop**: `disabled={true}`

### Determining Required Fields

**Visual Indicators**:

- Red asterisk (\*) after label
- "Required" text in label
- Error shown when left empty
- Highlighted in red before submission

**Prop**: `required={true}` on Label or Input

## Component Availability Check

Before generating code, verify all components exist in registry:

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
  throw new Error(`Missing components: ${missingComponents.join(", ")}`);
}
```

## Summary Decision Flow

1. **Identify element type** from visual appearance
2. **Match to component** using decision tree above
3. **Determine props** from visual characteristics (size, variant, state)
4. **Verify component exists** in registry.json
5. **Generate code** with correct imports and props

## Common Patterns

### Login Form

- Typography (title-1) for "Welcome Back"
- Input (email) for email field
- Input (secureTextEntry) for password
- Button (primary) for "Log In"
- Button (plain) for "Forgot password?"

### Signup Form

- Typography (title-1) for "Create Account"
- Input for name, email, password
- Checkbox for "I agree to terms"
- Button (primary) for "Sign Up"
- Button (plain) for "Already have account? Log in"

### Profile Screen

- Avatar for profile picture
- Typography (title-2) for user name
- Card for grouped information
- Divider between sections
- Button (secondary) for "Edit Profile"

### Loading State

- Spinner while fetching data
- Skeleton placeholders for content
- Progress bar for upload/download

### Error State

- Alert (error) for error messages
- Typography (caption-1) for field errors
- Button (primary) for retry action
