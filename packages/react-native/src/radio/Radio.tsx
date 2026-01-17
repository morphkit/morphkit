import { createContext, useContext, ReactNode, forwardRef } from "react";
import {
  View,
  ViewProps,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../theme";

interface RadioContextValue {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
}

const RadioContext = createContext<RadioContextValue | null>(null);

const useRadioContext = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error("RadioButton must be used within RadioGroup");
  }
  return context;
};

export interface RadioGroupProps extends Omit<ViewProps, "children"> {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  children: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const RadioGroup = ({
  value,
  onChange,
  onBlur,
  children,
  disabled = false,
  style,
  ...props
}: RadioGroupProps) => {
  const contextValue: RadioContextValue = {
    value,
    onChange,
    onBlur,
    disabled,
  };

  return (
    <RadioContext.Provider value={contextValue}>
      <View style={style} accessibilityRole="radiogroup" {...props}>
        {children}
      </View>
    </RadioContext.Provider>
  );
};

export interface RadioButtonProps extends Omit<ViewProps, "children"> {
  value: string;
  onBlur?: () => void;
  name?: string;
  children?: ReactNode;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
}

export const RadioButton = forwardRef<View, RadioButtonProps>(
  (
    {
      value,
      onBlur: buttonOnBlur,
      children,
      disabled = false,
      size = "md",
      style,
      ...props
    },
    ref,
  ) => {
    const context = useRadioContext();
    const { theme, colorScheme } = useTheme();

    const isSelected = context.value === value;
    const isDisabled = disabled || context.disabled;

    const handlePress = () => {
      if (!isDisabled) {
        context.onChange(value);
      }
    };

    const handlePressOut = () => {
      context.onBlur?.();
      buttonOnBlur?.();
    };

    const circleSize = theme.component.radio.size[size];
    const innerSize = Math.round(circleSize / 2);

    const variantColors = isDisabled
      ? theme.component.radio.variant[colorScheme].disabled
      : isSelected
        ? theme.component.radio.variant[colorScheme].checked
        : theme.component.radio.variant[colorScheme].unchecked;

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        style={[
          baseStyles.container,
          {
            gap: theme.primitive.spacing[2],
            minHeight: theme.primitive.spacing[12],
            minWidth: theme.primitive.spacing[12],
            opacity: isDisabled ? theme.semantic.state.disabled.opacity : 1,
          },
          style,
        ]}
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected, disabled: isDisabled }}
        {...props}
      >
        <View
          style={[
            baseStyles.circle,
            {
              width: circleSize,
              height: circleSize,
              borderRadius: theme.component.radio.borderRadius,
              borderWidth: theme.component.radio.borderWidth,
              borderColor: variantColors.border,
            },
          ]}
        >
          {isSelected && (
            <View
              style={{
                width: innerSize,
                height: innerSize,
                borderRadius: innerSize / 2,
                backgroundColor: variantColors.dot,
              }}
            />
          )}
        </View>
        {children}
      </Pressable>
    );
  },
);

RadioButton.displayName = "RadioButton";

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
