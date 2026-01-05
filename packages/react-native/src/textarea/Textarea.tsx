import { forwardRef, useState } from "react";
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
    const { theme, colorScheme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [height, setHeight] = useState<number | undefined>(undefined);

    const sizeTokens = theme.component.input.size[size];
    const variantTokens = theme.component.input.variant[colorScheme];

    const lineHeight = sizeTokens.fontSize * theme.primitive.lineHeight.relaxed;
    const initialHeight = rows * lineHeight + sizeTokens.padding * 2;

    const borderColor = error
      ? variantTokens.error.border
      : isFocused
        ? variantTokens.focus.border
        : variantTokens.default.border;

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    const handleContentSizeChange = (event: {
      nativeEvent: { contentSize: { height: number } };
    }) => {
      if (autoResize) {
        setHeight(event.nativeEvent.contentSize.height + sizeTokens.padding * 2);
      }
    };

    const characterCount = value.length;
    const countText = maxLength
      ? `${characterCount} / ${maxLength}`
      : `${characterCount}`;

    return (
      <View style={style}>
        {label && (
          <Text
            style={[
              baseStyles.label,
              {
                color: theme.semantic.colors.text.secondary,
                fontSize: theme.component.label.fontSize,
                fontWeight: theme.component.label.fontWeight,
                marginBottom: theme.component.label.marginBottom,
              },
            ]}
          >
            {label}
          </Text>
        )}
        <View
          style={[
            baseStyles.textareaContainer,
            {
              borderColor,
              backgroundColor: variantTokens.default.background,
              borderRadius: sizeTokens.borderRadius,
              paddingHorizontal: sizeTokens.padding,
              paddingVertical: sizeTokens.padding,
              minHeight: autoResize ? initialHeight : undefined,
              height: autoResize ? height : initialHeight,
              opacity: disabled ? theme.semantic.state.disabled.opacity : 1,
            },
          ]}
        >
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={variantTokens.default.placeholder}
            editable={!disabled}
            multiline
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            onContentSizeChange={handleContentSizeChange}
            maxLength={maxLength}
            style={[
              baseStyles.textInput,
              {
                fontSize: sizeTokens.fontSize,
                lineHeight,
                color: variantTokens.default.text,
              },
            ]}
            accessibilityLabel={label || name}
            {...props}
          />
        </View>
        <View
          style={[
            baseStyles.footer,
            {
              marginTop: theme.primitive.spacing[1],
            },
          ]}
        >
          {error && (
            <Text
              style={[
                baseStyles.error,
                {
                  color: theme.semantic.colors.status.error.main,
                  fontSize: theme.primitive.fontSize.xs,
                },
              ]}
              accessibilityLiveRegion="polite"
            >
              {error}
            </Text>
          )}
          {showCount && (
            <Text
              style={[
                baseStyles.count,
                {
                  color: theme.semantic.colors.text.secondary,
                  fontSize: theme.primitive.fontSize.xs,
                  marginLeft: theme.primitive.spacing[2],
                },
              ]}
            >
              {countText}
            </Text>
          )}
        </View>
      </View>
    );
  },
);

Textarea.displayName = "Textarea";

const baseStyles = StyleSheet.create({
  label: {},
  textareaContainer: {
    borderWidth: 1,
  },
  textInput: {
    padding: 0,
    textAlignVertical: "top",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  error: {
    flex: 1,
  },
  count: {},
});
