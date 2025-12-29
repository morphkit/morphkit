import { createContext, useContext, ReactNode, forwardRef } from "react";
import { View, ViewProps, Pressable, StyleProp, ViewStyle } from "react-native";

interface SelectContextValue {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onBlur?: () => void;
  multiple: boolean;
  disabled?: boolean;
}

const SelectContext = createContext<SelectContextValue | null>(null);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("SelectOption must be used within Select");
  }
  return context;
};

export interface SelectProps extends Omit<ViewProps, "children"> {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onBlur?: () => void;
  name?: string;
  children: ReactNode;
  multiple?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Select = ({
  value,
  onChange,
  onBlur,
  children,
  multiple = false,
  disabled = false,
  style,
  ...props
}: SelectProps) => {
  const contextValue: SelectContextValue = {
    value,
    onChange,
    onBlur,
    multiple,
    disabled,
  };

  return (
    <SelectContext.Provider value={contextValue}>
      <View style={style} accessibilityRole="radiogroup" {...props}>
        {children}
      </View>
    </SelectContext.Provider>
  );
};

export interface SelectOptionProps extends Omit<ViewProps, "children"> {
  value: string;
  onBlur?: () => void;
  name?: string;
  children: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const SelectOption = forwardRef<View, SelectOptionProps>(
  (
    {
      value,
      onBlur: optionOnBlur,
      children,
      disabled = false,
      style,
      ...props
    },
    ref,
  ) => {
    const context = useSelectContext();

    const isSelected = context.multiple
      ? (context.value as string[]).includes(value)
      : context.value === value;

    const isDisabled = disabled || context.disabled;

    const handlePress = () => {
      if (isDisabled) return;

      if (context.multiple) {
        const currentValues = context.value as string[];
        const newValue = isSelected
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];
        context.onChange(newValue);
      } else {
        context.onChange(value);
      }
    };

    const handlePressOut = () => {
      context.onBlur?.();
      optionOnBlur?.();
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        style={style}
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected, disabled: isDisabled }}
        {...props}
      >
        {children}
      </Pressable>
    );
  },
);

SelectOption.displayName = "SelectOption";
