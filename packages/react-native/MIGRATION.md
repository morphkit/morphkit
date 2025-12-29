# Migration Guide: Form Components Refactoring

This guide covers breaking changes introduced to make all form components compatible with popular form libraries like react-hook-form and formik.

## Overview

All form input components have been refactored to follow a consistent API pattern that works seamlessly with form libraries while maintaining their "dumb presentational" nature.

## Breaking Changes

### 1. Callback Prop Standardization

All components now use `onChange` instead of component-specific callback names.

| Component | Old Callback | New Callback |
|-----------|--------------|--------------|
| Input | `onChangeText` | `onChange` |
| Textarea | `onChangeText` | `onChange` |
| Checkbox | `onCheckedChange` | `onChange` |
| Switch | `onCheckedChange` | `onChange` |
| RadioGroup | `onValueChange` | `onChange` |
| Select | `onValueChange` | `onChange` |
| Slider | `onValueChange` | `onChange` |

### 2. New Props Added

All form components now support:
- `onBlur?: () => void` - Called when the input loses focus
- `name?: string` - Field identifier for form libraries
- Ref forwarding via `React.forwardRef`

### 3. Form Component Removed

The `Form` component and `useFormContext` hook have been removed. Use your preferred form library's Form component instead.

## Component Migration Examples

### Input

**Before:**
```tsx
<Input
  value={email}
  onChangeText={setEmail}
/>
```

**After:**
```tsx
<Input
  value={email}
  onChange={setEmail}
  onBlur={handleBlur}
  name="email"
/>
```

### Textarea

**Before:**
```tsx
<Textarea
  value={bio}
  onChangeText={setBio}
/>
```

**After:**
```tsx
<Textarea
  value={bio}
  onChange={setBio}
  onBlur={handleBlur}
  name="bio"
/>
```

### Checkbox

**Before:**
```tsx
<Checkbox
  checked={agree}
  onCheckedChange={setAgree}
>
  <Text>I agree to terms</Text>
</Checkbox>
```

**After:**
```tsx
<Checkbox
  checked={agree}
  onChange={setAgree}
  onBlur={handleBlur}
  name="agree"
>
  <Text>I agree to terms</Text>
</Checkbox>
```

### Switch

**Before:**
```tsx
<Switch
  checked={darkMode}
  onCheckedChange={setDarkMode}
  label="Dark Mode"
/>
```

**After:**
```tsx
<Switch
  checked={darkMode}
  onChange={setDarkMode}
  onBlur={handleBlur}
  name="darkMode"
  label="Dark Mode"
/>
```

### RadioGroup

**Before:**
```tsx
<RadioGroup value={theme} onValueChange={setTheme}>
  <RadioButton value="light">
    <Text>Light</Text>
  </RadioButton>
  <RadioButton value="dark">
    <Text>Dark</Text>
  </RadioButton>
</RadioGroup>
```

**After:**
```tsx
<RadioGroup value={theme} onChange={setTheme} onBlur={handleBlur} name="theme">
  <RadioButton value="light">
    <Text>Light</Text>
  </RadioButton>
  <RadioButton value="dark">
    <Text>Dark</Text>
  </RadioButton>
</RadioGroup>
```

### Select

**Before:**
```tsx
<Select value={country} onValueChange={setCountry}>
  <SelectOption value="us">
    <Text>United States</Text>
  </SelectOption>
  <SelectOption value="ca">
    <Text>Canada</Text>
  </SelectOption>
</Select>
```

**After:**
```tsx
<Select value={country} onChange={setCountry} onBlur={handleBlur} name="country">
  <SelectOption value="us">
    <Text>United States</Text>
  </SelectOption>
  <SelectOption value="ca">
    <Text>Canada</Text>
  </SelectOption>
</Select>
```

### Slider

**Before:**
```tsx
<Slider
  value={volume}
  onValueChange={setVolume}
  min={0}
  max={100}
/>
```

**After:**
```tsx
<Slider
  value={volume}
  onChange={setVolume}
  onBlur={handleBlur}
  name="volume"
  min={0}
  max={100}
/>
```

## Form Library Integration

### React Hook Form

```tsx
import { Controller, useForm } from "react-hook-form";
import { Input, Checkbox, RadioGroup, RadioButton } from "@warp-ui/react-native";

function MyForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      subscribe: false,
      theme: "light",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name="email"
            placeholder="Email"
          />
        )}
      />

      <Controller
        control={control}
        name="subscribe"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Checkbox
            ref={ref}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            name="subscribe"
          >
            <Text>Subscribe to newsletter</Text>
          </Checkbox>
        )}
      />

      <Controller
        control={control}
        name="theme"
        render={({ field: { onChange, onBlur, value } }) => (
          <RadioGroup
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name="theme"
          >
            <RadioButton value="light">
              <Text>Light</Text>
            </RadioButton>
            <RadioButton value="dark">
              <Text>Dark</Text>
            </RadioButton>
          </RadioGroup>
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}
```

### Formik

```tsx
import { Formik } from "formik";
import { Input, Checkbox, RadioGroup, RadioButton } from "@warp-ui/react-native";

function MyForm() {
  return (
    <Formik
      initialValues={{
        email: "",
        subscribe: false,
        theme: "light",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleChange, handleBlur, values, handleSubmit }) => (
        <View>
          <Input
            value={values.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            name="email"
            placeholder="Email"
          />

          <Checkbox
            checked={values.subscribe}
            onChange={(checked) => handleChange("subscribe")(String(checked))}
            onBlur={handleBlur("subscribe")}
            name="subscribe"
          >
            <Text>Subscribe to newsletter</Text>
          </Checkbox>

          <RadioGroup
            value={values.theme}
            onChange={handleChange("theme")}
            onBlur={handleBlur("theme")}
            name="theme"
          >
            <RadioButton value="light">
              <Text>Light</Text>
            </RadioButton>
            <RadioButton value="dark">
              <Text>Dark</Text>
            </RadioButton>
          </RadioGroup>

          <Button onPress={handleSubmit}>
            <Text>Submit</Text>
          </Button>
        </View>
      )}
    </Formik>
  );
}
```

## Ref Forwarding

All form components now support ref forwarding for programmatic access and form library integration.

```tsx
import { useRef } from "react";
import { TextInput } from "react-native";
import { Input } from "@warp-ui/react-native";

function MyComponent() {
  const inputRef = useRef<TextInput>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Input
      ref={inputRef}
      value={email}
      onChange={setEmail}
      name="email"
    />
  );
}
```

## Migration Checklist

- [ ] Replace all callback props with `onChange`
- [ ] Add `onBlur` handlers where needed
- [ ] Add `name` props for form library integration
- [ ] Add refs if using form libraries that require them
- [ ] Remove imports of `Form` and `useFormContext`
- [ ] Replace `Form` component with form library's Form component
- [ ] Update tests to use new API
- [ ] Verify form library integration works as expected

## Need Help?

If you encounter any issues during migration, please open an issue on GitHub with details about your use case.
