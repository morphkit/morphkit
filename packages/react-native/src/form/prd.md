# Form

## Overview
Container component for grouping form inputs with validation support, error handling, and submission management. Provides context for child inputs to access shared form state and display validation errors.

## Component Behavior
Form wraps input components and provides shared context for validation state, errors, and disabled state. On submission (via onSubmit), triggers validation and prevents submission if errors exist. Error messages display near respective input fields. Manages form-wide disabled state affecting all child inputs simultaneously.

## Props

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| children | `ReactNode` | Form inputs and other form elements |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onSubmit | `() => void` | `undefined` | Callback when form is submitted (typically via Submit button) |
| errors | `Record<string, string>` | `undefined` | Map of field names to error messages |
| disabled | `boolean` | `false` | Disables all form inputs when true |
| style | `StyleProp<ViewStyle>` | `undefined` | Additional custom styles |

### Extends
`ViewProps` - All standard React Native View props

## Variants
None - Form is a pure container without visual variants.

## States
- **default**: Normal editable state
- **disabled**: All child inputs disabled, typically shown during submission
- **error**: Contains validation errors for one or more fields

## Theme Support
Minimal - Form itself has no theme-specific styling. Errors displayed in theme-aware error color (red variants for light/dark).

## Accessibility Requirements
- Groups related form controls semantically
- Error messages associated with inputs via accessibilityDescribedBy pattern
- Form submission should announce success/error via screen reader
- Maintain focus management (error field receives focus on validation failure)
- Provide clear labels for all inputs

## Usage Examples

### Basic Usage
Simple form with inputs:
```tsx
<Form onSubmit={handleSubmit}>
  <Input label="Email" name="email" />
  <Input label="Password" name="password" type="password" />
  <Button onPress={submitForm}>Submit</Button>
</Form>
```

### Advanced Usage
Form with validation errors:
```tsx
<Form
  errors={{ email: "Invalid email format", password: "Password too short" }}
  disabled={isSubmitting}
  onSubmit={handleSubmit}
>
  <Input label="Email" name="email" />
  <Input label="Password" name="password" type="password" />
  <Button disabled={isSubmitting}>
    {isSubmitting ? "Submitting..." : "Submit"}
  </Button>
</Form>
```

## Edge Cases
- **No onSubmit**: Form still provides context but doesn't handle submission
- **errors with non-existent field names**: Errors ignored if no matching input field
- **disabled during submission**: Prevents double-submission, fields grayed out
- **Nested forms**: Not supported in HTML, should be avoided
- **Dynamic fields**: Error keys must match current field names

## Dependencies
- May use React Context for form state distribution to child inputs
- Child inputs (Input, Checkbox, etc.) should consume form context

## Design Considerations

### Styling Approach
- Form is unstyled View container
- Errors displayed by inputs consuming error from context
- Use React Context (FormContext) to provide errors, disabled state to children

### Layout Strategy
- Children render in natural flow (vertical stack by default)
- Consider Stack component for consistent spacing between inputs
- No built-in layout - parent controls spacing

### Performance Considerations
- Context updates trigger re-renders of all consuming children
- Memoize error object to prevent unnecessary updates
- Use field-level error lookup to avoid whole-form rerenders

### Customization Points
- Can extend with validation library integration (Formik, react-hook-form)
- Error display customizable per input
- Can add success state alongside errors
- Submit button placement flexible (inside or outside Form)
