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
    const sizeTokens =
      theme.component.button.size[
        size === "none" ? "md" : size === "icon" ? "md" : size
      ];
    const variantTokens = isDisabled
      ? theme.component.button.variant[colorScheme].disabled
      : theme.component.button.variant[colorScheme][variant];

    const backgroundColor = isDisabled
      ? variantTokens.background
      : pressed && "backgroundPressed" in variantTokens
        ? variantTokens.backgroundPressed
        : variantTokens.background;

    const containerStyles = [
      baseStyles.container,
      {
        backgroundColor,
        borderColor: variantTokens.border,
        borderRadius: sizeTokens.borderRadius,
        borderWidth:
          variant === "secondary"
            ? theme.component.button.borderWidth.secondary
            : theme.component.button.borderWidth.default,
      },
      !isIconButton &&
        size !== "none" && {
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
      isDisabled &&
        "opacity" in variantTokens && {
          opacity: variantTokens.opacity,
        },
      style,
    ];

    return (
      <View style={containerStyles}>
        {loading ? (
          <ActivityIndicator color={variantTokens.text} size="small" />
        ) : (
          <>
            {iconLeft && !isIconButton && <View>{iconLeft}</View>}
            {!isIconButton && children && (
              <Text
                style={{
                  fontSize: sizeTokens.fontSize,
                  color: variantTokens.text,
                }}
              >
                {children}
              </Text>
            )}
            {isIconButton && children && (
              <Text style={{ color: variantTokens.text }}>{children}</Text>
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
