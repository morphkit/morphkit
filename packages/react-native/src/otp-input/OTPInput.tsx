import { forwardRef, useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { useTheme } from "../theme";
import { Input } from "../input";

export interface OTPInputProps extends Omit<ViewProps, "children"> {
  value: string;
  onChange: (otp: string) => void;
  onComplete?: (otp: string) => void;
  length?: number;
  type?: "number" | "text";
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled";
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const OTPInput = forwardRef<View, OTPInputProps>(
  (
    {
      value,
      onChange,
      onComplete,
      length = 6,
      type = "number",
      size = "md",
      variant = "outline",
      error = false,
      disabled = false,
      autoFocus = true,
      style,
      accessibilityLabel,
      ...props
    },
    ref,
  ) => {
    const { theme, colorScheme } = useTheme();
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const [fieldValues, setFieldValues] = useState<string[]>([]);
    const inputRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
      const chars = value.slice(0, length).split("");
      const newFieldValues = Array(length)
        .fill("")
        .map((_, i) => chars[i] || "");
      setFieldValues(newFieldValues);
    }, [value, length]);

    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    const handleChangeText = (index: number, text: string) => {
      if (text.length > 1) {
        handlePaste(index, text);
        return;
      }

      let validText = text;
      if (type === "number") {
        validText = text.replace(/[^0-9]/g, "");
      }

      const newFieldValues = [...fieldValues];
      newFieldValues[index] = validText;
      setFieldValues(newFieldValues);

      const newValue = newFieldValues.join("");
      onChange(newValue);

      if (validText && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (newFieldValues.every((v) => v !== "")) {
        onComplete?.(newValue);
        Keyboard.dismiss();
      }
    };

    const handlePaste = (index: number, text: string) => {
      const pastedChars = text.trim().split("");

      let validChars = pastedChars;
      if (type === "number") {
        validChars = pastedChars.filter((char) => /^\d$/.test(char));
      }

      validChars = validChars.slice(0, length);

      const newFieldValues = [...fieldValues];
      validChars.forEach((char, offset) => {
        if (index + offset < length) {
          newFieldValues[index + offset] = char;
        }
      });

      setFieldValues(newFieldValues);
      const newValue = newFieldValues.join("");
      onChange(newValue);

      if (newFieldValues.every((v) => v !== "")) {
        onComplete?.(newValue);
        Keyboard.dismiss();
      } else {
        const nextEmptyIndex = newFieldValues.findIndex((v) => v === "");
        if (nextEmptyIndex !== -1) {
          inputRefs.current[nextEmptyIndex]?.focus();
        }
      }
    };

    const handleKeyPress = (
      index: number,
      e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    ) => {
      if (e.nativeEvent.key === "Backspace") {
        if (!fieldValues[index] && index > 0) {
          const newFieldValues = [...fieldValues];
          newFieldValues[index - 1] = "";
          setFieldValues(newFieldValues);
          onChange(newFieldValues.join(""));
          inputRefs.current[index - 1]?.focus();
        }
      }
    };

    const handleFocus = (index: number) => {
      setFocusedIndex(index);
    };

    const handleBlur = () => {
      setFocusedIndex(-1);
    };

    const isComplete = fieldValues.every((v) => v !== "");

    const getBorderColor = (index: number): string | undefined => {
      if (error) {
        return theme.semantic.colors.border.error;
      }

      if (focusedIndex === index) {
        return theme.semantic.colors.border.focus;
      }

      if (isComplete && !error) {
        return theme.component.otpInput.variant[colorScheme].success.border;
      }

      return undefined;
    };

    return (
      <View
        ref={ref}
        style={[
          baseStyles.container,
          { gap: theme.component.otpInput.gap },
          style,
        ]}
        accessibilityLabel={accessibilityLabel || "One time password input"}
        {...props}
      >
        {Array.from({ length }).map((_, index) => (
          <Input
            key={index}
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el as unknown as TextInput;
              }
            }}
            value={fieldValues[index] || ""}
            onChange={(text) => handleChangeText(index, text)}
            onKeyPress={(e) => handleKeyPress(index, e)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            type={type}
            size={size}
            variant={variant}
            disabled={disabled}
            maxLength={1}
            textAlign="center"
            style={{
              width: theme.component.otpInput.fieldWidth[size],
              borderColor: getBorderColor(index),
            }}
            accessibilityLabel={`Digit ${index + 1} of ${length}`}
          />
        ))}
      </View>
    );
  },
);

OTPInput.displayName = "OTPInput";

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
