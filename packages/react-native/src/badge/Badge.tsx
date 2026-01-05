import {
  View,
  ViewProps,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";
import { useTheme } from "../theme";

type BadgeColor = "red" | "blue";

export interface BadgeProps extends Omit<ViewProps, "children"> {
  count: number;
  maxCount?: number;
  color?: BadgeColor;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Badge = ({
  count,
  maxCount = 99,
  color = "red",
  children,
  style,
  ...props
}: BadgeProps) => {
  const { theme, colorScheme } = useTheme();
  const shouldShowBadge = count > 0;
  const displayCount = count > maxCount ? `${maxCount}+` : `${count}`;

  const colorMap = {
    red: theme.component.badge.variant[colorScheme].error,
    blue: theme.component.badge.variant[colorScheme].primary,
  };
  const badgeColors = colorMap[color];

  const getTextFontSize = () => {
    if (displayCount.length >= 4) return theme.primitive.fontSize.xs * 0.75;
    if (displayCount.length === 3) return theme.primitive.fontSize.xs * 0.75;
    if (displayCount.length === 2) return theme.primitive.fontSize.xs * 0.83;
    return theme.component.badge.fontSize;
  };

  const getBadgePositioning = () => {
    if (displayCount.length >= 3) return baseStyles.badgePosition3Digits;
    if (displayCount.length === 2) return baseStyles.badgePosition2Digits;
    return baseStyles.badgePosition1Digit;
  };

  return (
    <View
      style={[baseStyles.wrapper, style]}
      accessibilityLabel={
        shouldShowBadge ? `${displayCount} notifications` : undefined
      }
      {...props}
    >
      {children}
      {shouldShowBadge && (
        <View
          style={[
            baseStyles.badge,
            {
              backgroundColor: badgeColors.background,
              borderRadius: theme.component.badge.borderRadius,
              paddingHorizontal: theme.component.badge.paddingHorizontal,
            },
            getBadgePositioning(),
          ]}
        >
          <Text
            style={[
              baseStyles.badgeText,
              {
                color: badgeColors.text,
                fontSize: getTextFontSize(),
                fontWeight: theme.primitive.fontWeight.semibold,
              },
            ]}
          >
            {displayCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -6,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  badgePosition1Digit: {
    right: -6,
  },
  badgePosition2Digits: {
    right: -8,
  },
  badgePosition3Digits: {
    right: -14,
  },
  badgeText: {},
});
