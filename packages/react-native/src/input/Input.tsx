import { forwardRef, ReactNode, useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../theme";

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
    const { theme, colorScheme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const sizeTokens = theme.component.input.size[size];
    const variantTokens = theme.component.input.variant[colorScheme];

    const keyboardType = typeToKeyboard[type];
    const secureTextEntry = type === "password";

    const containerBorderColor = error
      ? variantTokens.error.border
      : isFocused
        ? variantTokens.focus.border
        : variantTokens.default.border;

    const containerStyles: ViewStyle = {
      height: sizeTokens.height,
      borderWidth: variant === "outline" ? 1 : 0,
      borderColor: containerBorderColor,
      backgroundColor: variant === "outline"
        ? variantTokens.default.background
        : theme.semantic.colors.surface.tertiary,
      paddingHorizontal: sizeTokens.padding,
      opacity: disabled ? theme.semantic.state.disabled.opacity : 1,
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    return (
      <View style={style}>
        {label && (
          <Text style={[
            baseStyles.label,
            {
              color: theme.semantic.colors.text.secondary,
              fontSize: theme.component.label.fontSize,
              fontWeight: theme.component.label.fontWeight,
              marginBottom: theme.component.label.marginBottom,
            }
          ]}>
            {label}
          </Text>
        )}
        <View style={[
          baseStyles.inputContainer,
          {
            borderRadius: sizeTokens.borderRadius,
            gap: theme.primitive.spacing[2],
          },
          containerStyles,
        ]}>
          {prefixIcon && <View style={baseStyles.icon}>{prefixIcon}</View>}
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={variantTokens.default.placeholder}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            style={[
              baseStyles.textInput,
              {
                fontSize: sizeTokens.fontSize,
                color: variantTokens.default.text,
              },
            ]}
            accessibilityLabel={label || name}
            {...props}
          />
          {suffixIcon && <View style={baseStyles.icon}>{suffixIcon}</View>}
        </View>
        {error && (
          <Text
            style={[
              baseStyles.error,
              {
                color: theme.semantic.colors.status.error.main,
                fontSize: theme.primitive.fontSize.sm,
                marginTop: theme.primitive.spacing[1],
              }
            ]}
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

const typeToKeyboard: Record<string, TextInputProps["keyboardType"]> = {
  text: "default",
  email: "email-address",
  password: "default",
  number: "numeric",
};

const baseStyles = StyleSheet.create({
  label: {
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    padding: 0,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  error: {},
});
