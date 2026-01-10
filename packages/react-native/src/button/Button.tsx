import {
  Pressable,
  PressableProps,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { ReactNode, ReactElement, isValidElement, cloneElement } from "react";
import { useTheme } from "../theme";
import { Typography } from "../typography";
import { Spinner } from "../spinner";

type ButtonVariant = "primary" | "secondary" | "tonal" | "plain";
type ButtonSize = "none" | "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconAbsoluteLeft?: ReactNode;
  iconAbsoluteRight?: ReactNode;
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
  iconAbsoluteLeft,
  iconAbsoluteRight,
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
    const variantTokens = disabled
      ? theme.component.button.variant[colorScheme].disabled
      : theme.component.button.variant[colorScheme][variant];

    const backgroundColor = disabled
      ? variantTokens.background
      : pressed && "backgroundPressed" in variantTokens
        ? variantTokens.backgroundPressed
        : variantTokens.background;

    const containerStyles: StyleProp<ViewStyle> = [
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
      !isIconButton && size !== "none"
        ? {
            paddingHorizontal: sizeTokens.paddingHorizontal,
            paddingVertical: sizeTokens.paddingVertical,
            minHeight: sizeTokens.height,
          }
        : undefined,
      !isIconButton && iconAbsoluteLeft
        ? {
            paddingLeft: sizeTokens.iconSize + sizeTokens.paddingHorizontal,
          }
        : undefined,
      !isIconButton && iconAbsoluteRight
        ? {
            paddingRight: sizeTokens.iconSize + sizeTokens.paddingHorizontal,
          }
        : undefined,
      isIconButton
        ? {
            width: sizeTokens.height,
            height: sizeTokens.height,
            borderRadius: sizeTokens.height / 2,
          }
        : undefined,
      disabled && "opacity" in variantTokens
        ? {
            opacity: variantTokens.opacity,
          }
        : undefined,
      style,
    ];

    return (
      <View style={containerStyles}>
        {iconAbsoluteLeft && !isIconButton && (
          <View
            style={[
              baseStyles.absoluteIcon,
              {
                left: sizeTokens.paddingHorizontal,
              },
            ]}
          >
            {isValidElement(iconAbsoluteLeft)
              ? cloneElement(
                  iconAbsoluteLeft as ReactElement<{
                    color?: string;
                    size?: number;
                  }>,
                  {
                    color: variantTokens.text,
                    size: sizeTokens.iconSize,
                  },
                )
              : iconAbsoluteLeft}
          </View>
        )}
        {iconAbsoluteRight && !isIconButton && (
          <View
            style={[
              baseStyles.absoluteIcon,
              {
                right: sizeTokens.paddingHorizontal,
              },
            ]}
          >
            {isValidElement(iconAbsoluteRight)
              ? cloneElement(
                  iconAbsoluteRight as ReactElement<{
                    color?: string;
                    size?: number;
                  }>,
                  {
                    color: variantTokens.text,
                    size: sizeTokens.iconSize,
                  },
                )
              : iconAbsoluteRight}
          </View>
        )}
        <View
          style={[
            baseStyles.contentWrapper,
            iconAbsoluteLeft
              ? {
                  marginLeft: -(sizeTokens.iconSize / 2),
                }
              : undefined,
            iconAbsoluteRight
              ? {
                  marginRight: -(sizeTokens.iconSize / 2),
                }
              : undefined,
          ]}
        >
          {loading && (
            <View style={baseStyles.loadingOverlay}>
              <Spinner color={variantTokens.text} size="sm" />
            </View>
          )}
          <View
            style={[
              baseStyles.contentInner,
              !isIconButton && size !== "none"
                ? {
                    gap: sizeTokens.gap,
                  }
                : undefined,
              loading ? { opacity: 0 } : undefined,
            ]}
          >
            {iconLeft && !isIconButton && (
              <View>
                {isValidElement(iconLeft)
                  ? cloneElement(
                      iconLeft as ReactElement<{
                        color?: string;
                        size?: number;
                      }>,
                      {
                        color: variantTokens.text,
                        size: sizeTokens.iconSize,
                      },
                    )
                  : iconLeft}
              </View>
            )}
            {!isIconButton && children && (
              <Typography
                variant="body"
                style={{
                  color: variantTokens.text,
                }}
              >
                {children}
              </Typography>
            )}
            {isIconButton && children && (
              <Typography variant="body" style={{ color: variantTokens.text }}>
                {children}
              </Typography>
            )}
            {iconRight && !isIconButton && (
              <View>
                {isValidElement(iconRight)
                  ? cloneElement(
                      iconRight as ReactElement<{
                        color?: string;
                        size?: number;
                      }>,
                      {
                        color: variantTokens.text,
                        size: sizeTokens.iconSize,
                      },
                    )
                  : iconRight}
              </View>
            )}
          </View>
        </View>
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
  absoluteIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  contentWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  contentInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
