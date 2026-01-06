import {
  Pressable,
  PressableProps,
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { useTheme } from "../theme";

type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends Omit<PressableProps, "children"> {
  source?: ImageSourcePropType;
  fallback?: string;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
}

export const Avatar = ({
  source,
  fallback = "",
  size = "md",
  style,
  ...props
}: AvatarProps) => {
  const { theme, colorScheme } = useTheme();

  const renderContent = ({ pressed }: { pressed: boolean }) => {
    const avatarSize = theme.component.avatar.size[size];
    const textSizeMap = {
      sm: theme.primitive.fontSize.xs,
      md: theme.primitive.fontSize.lg,
      lg: theme.primitive.fontSize["2xl"],
      xl: theme.primitive.fontSize["3xl"],
    };

    const containerStyles = [
      baseStyles.container,
      {
        width: avatarSize,
        height: avatarSize,
        borderRadius: theme.component.avatar.borderRadius,
        backgroundColor: !source
          ? theme.component.avatar.variant[colorScheme].background
          : undefined,
        opacity: pressed ? theme.semantic.state.pressed.opacity : 1,
      },
      style,
    ];

    return (
      <View style={containerStyles}>
        {source ? (
          <Image source={source} style={baseStyles.image} />
        ) : (
          <Text
            style={[
              baseStyles.text,
              {
                fontSize: textSizeMap[size],
                fontWeight: theme.primitive.fontWeight.semibold,
                color: theme.component.avatar.variant[colorScheme].text,
              },
            ]}
          >
            {fallback}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Pressable accessibilityRole="imagebutton" {...props}>
      {renderContent}
    </Pressable>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {},
});
