---
name: maestro-cheatsheet
description: Maestro YAML flow writing cheatsheet. Use when writing or editing Maestro flow files (.yaml), creating e2e tests, or debugging Maestro syntax. Enforces best practices and correct YAML syntax.
allowed-tools: Read, Write, Edit, Bash, mcp__maestro__check_flow_syntax, mcp__maestro__run_flow, mcp__maestro__inspect_view_hierarchy
---

# Maestro YAML Cheatsheet

Quick reference for writing reliable Maestro flow files.

## Flow File Structure

Every Maestro flow file requires a header section separated from commands by `---`:

```yaml
appId: com.example.app
---
- launchApp
- tapOn: "Login"
```

### Required Headers

| Header  | Description               | Example           |
| ------- | ------------------------- | ----------------- |
| `appId` | Bundle ID or package name | `com.example.app` |

### Optional Headers

| Header           | Description                 | Example                                   |
| ---------------- | --------------------------- | ----------------------------------------- |
| `name`           | Flow display name           | `"Login Flow"`                            |
| `tags`           | Categories for filtering    | `[smoke, auth]`                           |
| `env`            | Environment variables       | `{ BASE_URL: "https://api.example.com" }` |
| `onFlowStart`    | Commands to run before flow | `- clearState`                            |
| `onFlowComplete` | Commands to run after flow  | `- stopApp`                               |

## Element Selectors

### Priority Order (Most Reliable → Least)

1. **`id`** - Element ID (most stable across UI changes)
2. **`text` + state** - Text content with `enabled`/`checked`/`selected`
3. **Relative position** - `below`, `above`, `leftOf`, `rightOf`, `childOf`, `containsChild`
4. **`index`** - When multiple elements match (0-based)
5. **`point`** - Exact coordinates (last resort, fragile)

### Selector Examples

```yaml
# By ID (PREFERRED)
- tapOn:
    id: "login-button"

# By text
- tapOn:
    text: "Submit"

# By text with state
- tapOn:
    text: "Accept"
    enabled: true

# Relative positioning
- tapOn:
    text: "Delete"
    below:
      id: "user-profile"

# By index (when multiple matches)
- tapOn:
    text: "Item"
    index: 2

# Combining selectors
- tapOn:
    text: "Save"
    enabled: true
    below:
      text: "Settings"
```

## Core Commands

### App Lifecycle

```yaml
# Launch app (uses appId from header)
- launchApp

# Launch with clear state
- launchApp:
    clearState: true

# Stop app
- stopApp

# Clear app state without launching
- clearState
```

### Tapping

```yaml
# Simple tap by text
- tapOn: "Button Text"

# Tap by ID
- tapOn:
    id: "button-id"

# Long press
- longPressOn: "Element"

# Double tap
- doubleTapOn: "Element"

# Tap at coordinates (avoid when possible)
- tapOn:
    point: "50%,50%"
```

### Text Input

```yaml
# Input into focused field
- inputText: "user@example.com"

# Clear and input
- eraseText: 50
- inputText: "new text"

# Input into specific field
- tapOn:
    id: "email-input"
- inputText: "user@example.com"
```

### Scrolling

```yaml
# Scroll down
- scroll

# Scroll in direction
- scroll:
    direction: DOWN

# Scroll until element visible
- scrollUntilVisible:
    element:
      text: "Target Element"
    direction: DOWN
    timeout: 10000
```

### Swiping

```yaml
# Swipe in direction
- swipe:
    direction: LEFT

# Swipe on specific element
- swipe:
    direction: RIGHT
    from:
      id: "carousel"

# Swipe with start/end points
- swipe:
    start: "90%,50%"
    end: "10%,50%"
```

### Navigation

```yaml
# Press back button
- back

# Press home button
- pressKey: Home

# Press enter/return
- pressKey: Enter
```

## Wait Patterns

### Correct Wait Usage

```yaml
# Wait for element to appear before tapping
- extendedWaitUntil:
    visible: "Submit Button"
    timeout: 5000
- tapOn: "Submit Button"

# Wait for element to disappear (loading states)
- extendedWaitUntil:
    notVisible: "Loading..."
    timeout: 10000

# Wait for specific condition
- extendedWaitUntil:
    visible:
      id: "success-message"
    timeout: 5000
```

### Anti-Pattern: Hardcoded Delays

```yaml
# ❌ NEVER use hardcoded sleep
- sleep: 3000
- tapOn: "Button"

# ✅ ALWAYS use explicit waits
- extendedWaitUntil:
    visible: "Button"
    timeout: 3000
- tapOn: "Button"
```

## Assertions

### Visibility Assertions

```yaml
# Assert element is visible
- assertVisible: "Welcome"

# Assert element with ID is visible
- assertVisible:
    id: "dashboard"

# Assert element is NOT visible
- assertNotVisible: "Error Message"

# Assert element is visible with timeout
- extendedWaitUntil:
    visible: "Success"
    timeout: 5000
```

### State Assertions

```yaml
# Assert checkbox is checked
- assertVisible:
    text: "Remember me"
    checked: true

# Assert button is enabled
- assertVisible:
    id: "submit-button"
    enabled: true

# Assert element is selected
- assertVisible:
    text: "Option A"
    selected: true
```

### Content Assertions

```yaml
# Assert text contains substring
- assertVisible:
    text: ".*Welcome.*"

# Assert specific element contains text
- assertVisible:
    id: "user-greeting"
    text: "Hello, John"
```

## Conditional Logic

```yaml
# Run commands if element visible
- runFlow:
    when:
      visible: "Cookie Banner"
    commands:
      - tapOn: "Accept"

# Skip flow if condition met
- stopFlow:
    when:
      visible: "Already Logged In"
```

## Subflows

```yaml
# Run another flow file
- runFlow: flows/login.yaml

# Run with condition
- runFlow:
    file: flows/onboarding.yaml
    when:
      visible: "Welcome to the app"

# Inline subflow
- runFlow:
    commands:
      - tapOn: "Settings"
      - tapOn: "Logout"
```

## Best Practices

### DO

```yaml
# ✅ Use specific IDs
- tapOn:
    id: "login-submit-button"

# ✅ Wait for elements before interaction
- extendedWaitUntil:
    visible:
      id: "form-loaded"
    timeout: 5000
- tapOn:
    id: "submit"

# ✅ Assert expected state after actions
- tapOn: "Submit"
- assertVisible: "Success Message"

# ✅ Use relative selectors for disambiguation
- tapOn:
    text: "Edit"
    below:
      text: "Profile Settings"

# ✅ Clear state before test
- launchApp:
    clearState: true

# ✅ Use descriptive flow names
name: "User Login with Valid Credentials"
```

### DON'T

```yaml
# ❌ Vague selectors
- tapOn: "OK"
- tapOn: "Button"
- tapOn: "Text"

# ❌ Hardcoded delays
- sleep: 5000

# ❌ Missing assertions
- tapOn: "Delete"
# No verification that delete succeeded

# ❌ Coordinate-based taps (fragile)
- tapOn:
    point: "150,300"

# ❌ Assuming element is immediately available
- launchApp
- tapOn: "Login" # May fail if splash screen showing

# ❌ Over-generic text matching
- tapOn:
    text: ".*"
```

## Common Anti-Patterns

### 1. Race Conditions

```yaml
# ❌ WRONG - Element may not be loaded
- launchApp
- tapOn: "Login"

# ✅ CORRECT - Wait for app to be ready
- launchApp
- extendedWaitUntil:
    visible:
      id: "login-button"
    timeout: 10000
- tapOn:
    id: "login-button"
```

### 2. Missing State Verification

```yaml
# ❌ WRONG - No verification
- tapOn: "Add to Cart"
- tapOn: "Checkout"

# ✅ CORRECT - Verify state before proceeding
- tapOn: "Add to Cart"
- assertVisible: "Item added to cart"
- tapOn: "Checkout"
- assertVisible: "Checkout Page"
```

### 3. Brittle Text Selectors

```yaml
# ❌ WRONG - Text may change with localization
- tapOn: "Continue"

# ✅ CORRECT - Use stable ID
- tapOn:
    id: "continue-button"
```

### 4. Ignoring Loading States

```yaml
# ❌ WRONG - May tap during loading
- tapOn: "Submit"
- tapOn: "Next Step"

# ✅ CORRECT - Wait for loading to complete
- tapOn: "Submit"
- extendedWaitUntil:
    notVisible: "Loading..."
    timeout: 10000
- extendedWaitUntil:
    visible: "Next Step"
    timeout: 5000
- tapOn: "Next Step"
```

## Quick Reference Table

| Action               | Command              | Example                           |
| -------------------- | -------------------- | --------------------------------- |
| Tap                  | `tapOn`              | `- tapOn: "Button"`               |
| Long press           | `longPressOn`        | `- longPressOn: "Item"`           |
| Double tap           | `doubleTapOn`        | `- doubleTapOn: "Image"`          |
| Input text           | `inputText`          | `- inputText: "hello"`            |
| Clear text           | `eraseText`          | `- eraseText: 20`                 |
| Scroll               | `scroll`             | `- scroll`                        |
| Scroll until visible | `scrollUntilVisible` | See above                         |
| Swipe                | `swipe`              | `- swipe: { direction: LEFT }`    |
| Back button          | `back`               | `- back`                          |
| Assert visible       | `assertVisible`      | `- assertVisible: "Text"`         |
| Assert not visible   | `assertNotVisible`   | `- assertNotVisible: "Error"`     |
| Wait for visible     | `extendedWaitUntil`  | See above                         |
| Launch app           | `launchApp`          | `- launchApp`                     |
| Stop app             | `stopApp`            | `- stopApp`                       |
| Clear state          | `clearState`         | `- clearState`                    |
| Run subflow          | `runFlow`            | `- runFlow: other.yaml`           |
| Take screenshot      | `takeScreenshot`     | `- takeScreenshot: "name"`        |
| Copy text            | `copyTextFrom`       | `- copyTextFrom: { id: "field" }` |

## Workflow

When writing Maestro flows:

1. **Inspect the UI first** - Use `mcp__maestro__inspect_view_hierarchy` to get element IDs and structure
2. **Prefer IDs over text** - IDs are stable, text may change
3. **Add explicit waits** - Every tap should be preceded by a wait if element may not be immediately available
4. **Verify with assertions** - Assert expected state after important actions
5. **Validate syntax** - Use `mcp__maestro__check_flow_syntax` before running
6. **Test incrementally** - Use `mcp__maestro__run_flow` to test small sections
