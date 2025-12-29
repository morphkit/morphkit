import { forwardRef, ReactNode, useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  Text,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface InputProps extends Omit<TextInputProps, "style" | "onChange"> {
  value: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  name?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled";
  type?: "text" | "email" | "password" | "number";
  style?: StyleProp<ViewStyle>;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      name,
      label,
      placeholder,
      error,
      disabled = false,
      prefixIcon,
      suffixIcon,
      size = "md",
      variant = "outline",
      type = "text",
      style,
      ...props
    },
    ref,
  ) => {
    const colorScheme = useColorScheme() ?? "light";
    const [isFocused, setIsFocused] = useState(false);

    const themeColors = variantTheme[colorScheme][variant];
    const { height, fontSize, padding } = sizeMap[size];

    const keyboardType = typeToKeyboard[type];
    const secureTextEntry = type === "password";

    const containerBorderColor = error
      ? errorColors[colorScheme]
      : isFocused
        ? focusColors[colorScheme]
        : themeColors.border;

    const containerStyles: ViewStyle = {
      height,
      borderWidth: variant === "outline" ? 1 : 0,
      borderColor: containerBorderColor,
      backgroundColor: themeColors.background,
      paddingHorizontal: padding,
      opacity: disabled ? 0.5 : 1,
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    return (
      <View style={style}>
        {label && (
          <Text style={[baseStyles.label, { color: themeColors.labelColor }]}>
            {label}
          </Text>
        )}
        <View style={[baseStyles.inputContainer, containerStyles]}>
          {prefixIcon && <View style={baseStyles.icon}>{prefixIcon}</View>}
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={themeColors.placeholderColor}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            style={[
              baseStyles.textInput,
              {
                fontSize,
                color: themeColors.textColor,
              },
            ]}
            accessibilityLabel={label || name}
            {...props}
          />
          {suffixIcon && <View style={baseStyles.icon}>{suffixIcon}</View>}
        </View>
        {error && (
          <Text
            style={[baseStyles.error, { color: errorColors[colorScheme] }]}
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = "Input";

const sizeMap = {
  sm: { height: 36, fontSize: 14, padding: 8 },
  md: { height: 44, fontSize: 16, padding: 12 },
  lg: { height: 52, fontSize: 18, padding: 16 },
};

const typeToKeyboard: Record<string, TextInputProps["keyboardType"]> = {
  text: "default",
  email: "email-address",
  password: "default",
  number: "numeric",
};

const variantTheme = {
  light: {
    outline: {
      background: "#FFFFFF",
      border: "#E5E7EB",
      textColor: "#1F2937",
      placeholderColor: "#9CA3AF",
      labelColor: "#374151",
    },
    filled: {
      background: "#F3F4F6",
      border: "transparent",
      textColor: "#1F2937",
      placeholderColor: "#9CA3AF",
      labelColor: "#374151",
    },
  },
  dark: {
    outline: {
      background: "#374151",
      border: "#4B5563",
      textColor: "#F9FAFB",
      placeholderColor: "#9CA3AF",
      labelColor: "#D1D5DB",
    },
    filled: {
      background: "#4B5563",
      border: "transparent",
      textColor: "#F9FAFB",
      placeholderColor: "#9CA3AF",
      labelColor: "#D1D5DB",
    },
  },
};

const focusColors = {
  light: "#4A90E2",
  dark: "#5AA2F5",
};

const errorColors = {
  light: "#EF4444",
  dark: "#F87171",
};

const baseStyles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    gap: 8,
  },
  textInput: {
    flex: 1,
    padding: 0,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
});
