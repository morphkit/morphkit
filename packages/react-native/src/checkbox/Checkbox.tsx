import { forwardRef, ReactNode } from "react";
import {
  View,
  ViewProps,
  Pressable,
  Text,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface CheckboxProps extends Omit<ViewProps, "children"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  name?: string;
  children?: ReactNode;
  indeterminate?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Checkbox = forwardRef<View, CheckboxProps>(
  (
    {
      checked,
      onChange,
      onBlur,
      children,
      indeterminate = false,
      disabled = false,
      size = "md",
      color,
      style,
      ...props
    },
    ref,
  ) => {
    const colorScheme = useColorScheme() ?? "light";

    const handlePress = () => {
      if (!disabled) {
        onChange(!checked);
      }
    };

    const boxSize = sizeMap[size].box;
    const iconSize = sizeMap[size].icon;

    const themeColors = colorTheme[colorScheme];
    const primaryColor = color ?? themeColors.primary;

    const isCheckedOrIndeterminate = checked || indeterminate;

    const boxStyles: ViewStyle[] = [
      baseStyles.box,
      {
        width: boxSize,
        height: boxSize,
        borderColor: isCheckedOrIndeterminate
          ? primaryColor
          : themeColors.border,
        backgroundColor: isCheckedOrIndeterminate
          ? primaryColor
          : "transparent",
      },
    ];

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        onPressOut={onBlur}
        disabled={disabled}
        style={[baseStyles.container, disabled && baseStyles.disabled, style]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        {...props}
      >
        <View style={boxStyles}>
          {indeterminate ? (
            <MinusIcon size={iconSize} />
          ) : checked ? (
            <CheckIcon size={iconSize} />
          ) : null}
        </View>
        {children}
      </Pressable>
    );
  },
);

Checkbox.displayName = "Checkbox";

const CheckIcon = ({ size }: { size: number }) => (
  <View style={iconStyles.checkContainer}>
    <Text style={[iconStyles.checkIcon, { fontSize: size, lineHeight: size }]}>
      ✓
    </Text>
  </View>
);

const MinusIcon = ({ size }: { size: number }) => (
  <View style={iconStyles.minusContainer}>
    <View style={[iconStyles.minusIcon, { width: size }]} />
  </View>
);

const sizeMap = {
  sm: { box: 16, icon: 10 },
  md: { box: 20, icon: 14 },
  lg: { box: 24, icon: 18 },
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
    alignItems: "flex-start",
    gap: 8,
    minHeight: 44,
    minWidth: 44,
  },
  box: {
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});

const iconStyles = StyleSheet.create({
  checkContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  minusContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  minusIcon: {
    height: 2,
    backgroundColor: "#FFFFFF",
  },
});
