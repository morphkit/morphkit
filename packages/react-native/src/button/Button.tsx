import {
  Pressable,
  PressableProps,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  ViewStyle,
  StyleProp,
} from "react-native";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tonal" | "plain";
type ButtonSize = "none" | "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  disabled = false,
  loading = false,
  onPress,
  style,
  ...props
}: ButtonProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const isIconButton = size === "icon";
  const isDisabled = disabled || loading;

  const renderContent = ({ pressed }: { pressed: boolean }) => {
    const themeStyles = getThemeStyles(
      colorScheme,
      variant,
      pressed,
      isDisabled,
    );
    const textThemeStyles = getTextThemeStyles(
      colorScheme,
      variant,
      isDisabled,
    );

    const containerStyles = [
      baseStyles.container,
      variantStyles[variant],
      isIconButton ? iconSizeStyles[size] : sizeStyles[size],
      themeStyles,
      isDisabled && baseStyles.disabled,
      style,
    ];

    return (
      <View style={containerStyles}>
        {loading ? (
          <ActivityIndicator color={textThemeStyles.color} size="small" />
        ) : (
          <>
            {iconLeft && !isIconButton && <View>{iconLeft}</View>}
            {!isIconButton && children && (
              <Text style={textThemeStyles}>{children}</Text>
            )}
            {isIconButton && children && (
              <Text style={textThemeStyles}>{children}</Text>
            )}
            {iconRight && !isIconButton && <View>{iconRight}</View>}
          </>
        )}
      </View>
    );
  };

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...props}
    >
      {renderContent}
    </Pressable>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    borderRadius: 8,
    borderWidth: 0,
  },
  secondary: {
    borderRadius: 8,
    borderWidth: 1,
  },
  tonal: {
    borderRadius: 8,
    borderWidth: 0,
  },
  plain: {
    borderRadius: 8,
    borderWidth: 0,
  },
});

const sizeStyles = StyleSheet.create({
  none: {},
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 32,
    gap: 6,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 40,
    gap: 8,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    minHeight: 48,
    gap: 10,
  },
  icon: {},
});

const iconSizeStyles = StyleSheet.create({
  none: {},
  sm: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  md: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  lg: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

const colors = {
  light: {
    primary: {
      background: "#4A90E2",
      backgroundPressed: "#357ABD",
      text: "#FFFFFF",
      border: "transparent",
    },
    secondary: {
      background: "#FFFFFF",
      backgroundPressed: "#F5F5F5",
      text: "#333333",
      border: "#E0E0E0",
    },
    tonal: {
      background: "#E3F2FD",
      backgroundPressed: "#BBDEFB",
      text: "#1565C0",
      border: "transparent",
    },
    plain: {
      background: "transparent",
      backgroundPressed: "rgba(74, 144, 226, 0.1)",
      text: "#4A90E2",
      border: "transparent",
    },
    disabled: {
      background: "#E0E0E0",
      text: "#9E9E9E",
      border: "#CCCCCC",
    },
  },
  dark: {
    primary: {
      background: "#5AA2F5",
      backgroundPressed: "#4A90E2",
      text: "#FFFFFF",
      border: "transparent",
    },
    secondary: {
      background: "#2C2C2C",
      backgroundPressed: "#3D3D3D",
      text: "#E0E0E0",
      border: "#4D4D4D",
    },
    tonal: {
      background: "#1E3A5F",
      backgroundPressed: "#2A4D7C",
      text: "#90CAF9",
      border: "transparent",
    },
    plain: {
      background: "transparent",
      backgroundPressed: "rgba(90, 162, 245, 0.1)",
      text: "#5AA2F5",
      border: "transparent",
    },
    disabled: {
      background: "#3D3D3D",
      text: "#6E6E6E",
      border: "#4D4D4D",
    },
  },
};

const getThemeStyles = (
  colorScheme: "light" | "dark",
  variant: ButtonVariant,
  pressed: boolean,
  isDisabled: boolean,
) => {
  if (isDisabled) {
    return {
      backgroundColor: colors[colorScheme].disabled.background,
      borderColor: colors[colorScheme].disabled.border,
    };
  }

  const variantColors = colors[colorScheme][variant];
  return {
    backgroundColor: pressed
      ? variantColors.backgroundPressed
      : variantColors.background,
    borderColor: variantColors.border,
  };
};

const getTextThemeStyles = (
  colorScheme: "light" | "dark",
  variant: ButtonVariant,
  isDisabled: boolean,
) => {
  if (isDisabled) {
    return {
      color: colors[colorScheme].disabled.text,
    };
  }

  return {
    color: colors[colorScheme][variant].text,
  };
};
