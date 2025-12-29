import { forwardRef, useState } from "react";
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

export interface TextareaProps extends Omit<
  TextInputProps,
  "multiline" | "numberOfLines" | "style" | "onChange"
> {
  value: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  name?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  autoResize?: boolean;
  size?: "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(
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
      rows = 4,
      maxLength,
      showCount = false,
      autoResize = false,
      size = "md",
      style,
      ...props
    },
    ref,
  ) => {
    const colorScheme = useColorScheme() ?? "light";
    const [isFocused, setIsFocused] = useState(false);
    const [height, setHeight] = useState<number | undefined>(undefined);

    const themeColors = variantTheme[colorScheme];
    const { fontSize, padding, lineHeight } = sizeMap[size];

    const initialHeight = rows * lineHeight + padding * 2;

    const borderColor = error
      ? errorColors[colorScheme]
      : isFocused
        ? focusColors[colorScheme]
        : themeColors.border;

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    const handleContentSizeChange = (event: {
      nativeEvent: { contentSize: { height: number } };
    }) => {
      if (autoResize) {
        setHeight(event.nativeEvent.contentSize.height + padding * 2);
      }
    };

    const characterCount = value.length;
    const countText = maxLength
      ? `${characterCount} / ${maxLength}`
      : `${characterCount}`;

    return (
      <View style={style}>
        {label && (
          <Text style={[baseStyles.label, { color: themeColors.labelColor }]}>
            {label}
          </Text>
        )}
        <View
          style={[
            baseStyles.textareaContainer,
            {
              borderColor,
              backgroundColor: themeColors.background,
              paddingHorizontal: padding,
              paddingVertical: padding,
              minHeight: autoResize ? initialHeight : undefined,
              height: autoResize ? height : initialHeight,
              opacity: disabled ? 0.5 : 1,
            },
          ]}
        >
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={themeColors.placeholderColor}
            editable={!disabled}
            multiline
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            onContentSizeChange={handleContentSizeChange}
            maxLength={maxLength}
            style={[
              baseStyles.textInput,
              {
                fontSize,
                lineHeight,
                color: themeColors.textColor,
              },
            ]}
            accessibilityLabel={label || name}
            {...props}
          />
        </View>
        <View style={baseStyles.footer}>
          {error && (
            <Text
              style={[baseStyles.error, { color: errorColors[colorScheme] }]}
              accessibilityLiveRegion="polite"
            >
              {error}
            </Text>
          )}
          {showCount && (
            <Text style={[baseStyles.count, { color: themeColors.labelColor }]}>
              {countText}
            </Text>
          )}
        </View>
      </View>
    );
  },
);

Textarea.displayName = "Textarea";

const sizeMap = {
  sm: { fontSize: 14, padding: 8, lineHeight: 20 },
  md: { fontSize: 16, padding: 12, lineHeight: 24 },
  lg: { fontSize: 18, padding: 16, lineHeight: 28 },
};

const variantTheme = {
  light: {
    background: "#FFFFFF",
    border: "#E5E7EB",
    textColor: "#1F2937",
    placeholderColor: "#9CA3AF",
    labelColor: "#374151",
  },
  dark: {
    background: "#374151",
    border: "#4B5563",
    textColor: "#F9FAFB",
    placeholderColor: "#9CA3AF",
    labelColor: "#D1D5DB",
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
  textareaContainer: {
    borderWidth: 1,
    borderRadius: 8,
  },
  textInput: {
    padding: 0,
    textAlignVertical: "top",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  error: {
    fontSize: 12,
    flex: 1,
  },
  count: {
    fontSize: 12,
    marginLeft: 8,
  },
});
