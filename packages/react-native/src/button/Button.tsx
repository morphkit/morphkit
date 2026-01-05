import {
  Pressable,
  PressableProps,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { ReactNode } from "react";
import { useTheme } from "../theme";

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
  const { theme, colorScheme } = useTheme();
  const isIconButton = size === "icon";
  const isDisabled = disabled || loading;

  const renderContent = ({ pressed }: { pressed: boolean }) => {
    const themeStyles = getThemeStyles(
      theme,
      colorScheme,
      variant,
      pressed,
      isDisabled,
    );
    const textThemeStyles = getTextThemeStyles(
      theme,
      colorScheme,
      variant,
      isDisabled,
    );

    const sizeTokens = theme.component.button.size[size === "none" ? "md" : size === "icon" ? "md" : size];

    const containerStyles = [
      baseStyles.container,
      {
        borderRadius: sizeTokens.borderRadius,
        borderWidth: variant === "secondary" ? 1 : 0,
      },
      !isIconButton && size !== "none" && {
        paddingHorizontal: sizeTokens.paddingHorizontal,
        paddingVertical: sizeTokens.paddingVertical,
        minHeight: sizeTokens.height,
        gap: sizeTokens.gap,
      },
      isIconButton && {
        width: sizeTokens.height,
        height: sizeTokens.height,
        borderRadius: sizeTokens.height / 2,
      },
      themeStyles,
      isDisabled && {
        opacity: theme.semantic.state.disabled.opacity,
      },
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
              <Text style={[{ fontSize: sizeTokens.fontSize }, textThemeStyles]}>{children}</Text>
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
});

const getThemeStyles = (
  theme: ReturnType<typeof useTheme>["theme"],
  colorScheme: "light" | "dark",
  variant: ButtonVariant,
  pressed: boolean,
  isDisabled: boolean,
) => {
  const { colors } = theme.semantic;

  if (isDisabled) {
    return {
      backgroundColor: colors.surface.tertiary,
      borderColor: colors.border.primary,
    };
  }

  switch (variant) {
    case "primary":
      return {
        backgroundColor: pressed ? colors.action.primaryPressed : colors.action.primary,
        borderColor: "transparent",
      };
    case "secondary":
      return {
        backgroundColor: colors.surface.primary,
        borderColor: colors.border.primary,
      };
    case "tonal":
      return {
        backgroundColor: colorScheme === "light"
          ? colors.status.info.surface
          : colors.surface.tertiary,
        borderColor: "transparent",
      };
    case "plain":
      return {
        backgroundColor: pressed
          ? (colorScheme === "light" ? colors.surface.secondary : colors.surface.tertiary)
          : "transparent",
        borderColor: "transparent",
      };
  }
};

const getTextThemeStyles = (
  theme: ReturnType<typeof useTheme>["theme"],
  colorScheme: "light" | "dark",
  variant: ButtonVariant,
  isDisabled: boolean,
) => {
  const { colors } = theme.semantic;

  if (isDisabled) {
    return {
      color: colors.text.disabled,
    };
  }

  switch (variant) {
    case "primary":
      return {
        color: colors.text.inverse,
      };
    case "secondary":
      return {
        color: colors.text.primary,
      };
    case "tonal":
      return {
        color: colors.status.info.text,
      };
    case "plain":
      return {
        color: colors.action.primary,
      };
  }
};
