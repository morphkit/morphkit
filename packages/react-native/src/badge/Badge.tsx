import {
  View,
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";
import { useTheme } from "../theme";
import { Typography } from "../typography";

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

  const getBadgePositioning = (): ViewStyle => {
    if (displayCount.length >= 3) {
      return { right: theme.component.badge.position.right.threeDigits };
    }
    if (displayCount.length === 2) {
      return { right: theme.component.badge.position.right.twoDigits };
    }
    return { right: theme.component.badge.position.right.oneDigit };
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
              top: theme.component.badge.position.top,
              minWidth: theme.component.badge.dimensions.minWidth,
              height: theme.component.badge.dimensions.height,
            },
            getBadgePositioning(),
          ]}
        >
          <Typography
            variant="caption-1"
            style={[
              baseStyles.badgeText,
              {
                color: badgeColors.text,
                fontWeight: theme.component.badge.fontWeight,
              },
            ]}
          >
            {displayCount}
          </Typography>
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
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  badgeText: {},
});
