import { createContext, useContext, ReactNode, forwardRef } from "react";
import {
  View,
  ViewProps,
  Pressable,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
} from "react-native";

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
    const colorScheme = useColorScheme() ?? "light";

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

    const circleSize = sizeMap[size].circle;
    const innerSize = sizeMap[size].inner;

    const themeColors = colorTheme[colorScheme];
    const borderColor = isSelected ? themeColors.primary : themeColors.border;

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        style={[baseStyles.container, isDisabled && baseStyles.disabled, style]}
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
              borderRadius: circleSize / 2,
              borderColor,
            },
          ]}
        >
          {isSelected && (
            <View
              style={[
                baseStyles.innerCircle,
                {
                  width: innerSize,
                  height: innerSize,
                  borderRadius: innerSize / 2,
                  backgroundColor: themeColors.primary,
                },
              ]}
            />
          )}
        </View>
        {children}
      </Pressable>
    );
  },
);

RadioButton.displayName = "RadioButton";

const sizeMap = {
  sm: { circle: 16, inner: 8 },
  md: { circle: 20, inner: 10 },
  lg: { circle: 24, inner: 12 },
};

const colorTheme = {
  light: {
    border: "#9CA3AF",
    primary: "#4A90E2",
  },
  dark: {
    border: "#6B7280",
    primary: "#5AA2F5",
  },
};

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 44,
    minWidth: 44,
  },
  circle: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {},
  disabled: {
    opacity: 0.5,
  },
});
