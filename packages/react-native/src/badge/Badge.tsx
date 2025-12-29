import {
  View,
  ViewProps,
  Text,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";

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
  const colorScheme = useColorScheme() ?? "light";
  const shouldShowBadge = count > 0;
  const displayCount = count > maxCount ? `${maxCount}+` : `${count}`;
  const badgeThemeStyles = badgeColors[colorScheme][color];

  const getTextStyle = () => {
    if (displayCount.length >= 4) return baseStyles.badgeTextTiny;
    if (displayCount.length === 3) return baseStyles.badgeTextSmaller;
    if (displayCount.length === 2) return baseStyles.badgeTextSmall;
    return baseStyles.badgeText;
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
          style={[baseStyles.badge, badgeThemeStyles, getBadgePositioning()]}
        >
          <Text style={getTextStyle()}>{displayCount}</Text>
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
    borderRadius: 10,
    paddingHorizontal: 3,
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
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  badgeTextSmall: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  badgeTextSmaller: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "600",
  },
  badgeTextTiny: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "600",
  },
});

const badgeColors = {
  light: StyleSheet.create({
    red: {
      backgroundColor: "#EF5350",
    },
    blue: {
      backgroundColor: "#4A90E2",
    },
  }),
  dark: StyleSheet.create({
    red: {
      backgroundColor: "#E57373",
    },
    blue: {
      backgroundColor: "#5AA2F5",
    },
  }),
};
