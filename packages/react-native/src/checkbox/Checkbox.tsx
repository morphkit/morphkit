import { forwardRef, ReactNode } from "react";
import {
  View,
  ViewProps,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";

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
    const { theme, colorScheme } = useTheme();

    const handlePress = () => {
      if (!disabled) {
        onChange(!checked);
      }
    };

    const boxSize = theme.component.checkbox.size[size];
    const iconSize = Math.round(boxSize * 0.7);

    const isCheckedOrIndeterminate = checked || indeterminate;

    const variantColors = disabled
      ? theme.component.checkbox.variant[colorScheme].disabled
      : isCheckedOrIndeterminate
        ? theme.component.checkbox.variant[colorScheme].checked
        : theme.component.checkbox.variant[colorScheme].unchecked;

    const boxStyles: ViewStyle[] = [
      baseStyles.box,
      {
        width: boxSize,
        height: boxSize,
        borderRadius: theme.component.checkbox.borderRadius,
        borderWidth: theme.component.checkbox.borderWidth,
        borderColor:
          color && isCheckedOrIndeterminate ? color : variantColors.border,
        backgroundColor:
          color && isCheckedOrIndeterminate ? color : variantColors.background,
      },
    ];

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        onPressOut={onBlur}
        disabled={disabled}
        style={[
          baseStyles.container,
          {
            gap: theme.primitive.spacing[2],
            minHeight: theme.primitive.spacing[12],
            minWidth: theme.primitive.spacing[12],
            opacity: disabled ? theme.semantic.state.disabled.opacity : 1,
          },
          style,
        ]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        {...props}
      >
        <View style={boxStyles}>
          {indeterminate ? (
            <MinusIcon size={iconSize} color={variantColors.icon} />
          ) : checked ? (
            <CheckIcon size={iconSize} color={variantColors.icon} />
          ) : null}
        </View>
        {children}
      </Pressable>
    );
  },
);

Checkbox.displayName = "Checkbox";

const CheckIcon = ({ size, color }: { size: number; color: string }) => (
  <View style={iconStyles.checkContainer}>
    <Ionicons name="checkmark" size={size * 0.7} color={color} />
  </View>
);

const MinusIcon = ({ size, color }: { size: number; color: string }) => (
  <View style={iconStyles.minusContainer}>
    <View
      style={[iconStyles.minusIcon, { width: size, backgroundColor: color }]}
    />
  </View>
);

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const iconStyles = StyleSheet.create({
  checkContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: {
    fontWeight: "bold",
  },
  minusContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  minusIcon: {
    height: 2,
  },
});
