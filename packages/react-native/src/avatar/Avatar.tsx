import {
  Pressable,
  PressableProps,
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  useColorScheme,
  ViewStyle,
  StyleProp,
} from "react-native";

type AvatarSize = "sm" | "md" | "lg";

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
  const colorScheme = useColorScheme() ?? "light";

  const renderContent = ({ pressed }: { pressed: boolean }) => {
    const containerStyles = [
      baseStyles.container,
      sizeStyles[size],
      !source && fallbackTheme[colorScheme],
      pressed && { opacity: 0.8 },
      style,
    ];

    return (
      <View style={containerStyles}>
        {source ? (
          <Image source={source} style={baseStyles.image} />
        ) : (
          <Text style={[textSizeStyles[size], textTheme[colorScheme]]}>
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
});

const sizeStyles = StyleSheet.create({
  sm: { width: 32, height: 32, borderRadius: 16 },
  md: { width: 40, height: 40, borderRadius: 20 },
  lg: { width: 48, height: 48, borderRadius: 24 },
});

const textSizeStyles = StyleSheet.create({
  sm: { fontSize: 12, fontWeight: "600" },
  md: { fontSize: 16, fontWeight: "600" },
  lg: { fontSize: 20, fontWeight: "600" },
});

const fallbackTheme = StyleSheet.create({
  light: { backgroundColor: "#E0E0E0" },
  dark: { backgroundColor: "#424242" },
});

const textTheme = StyleSheet.create({
  light: { color: "#333333" },
  dark: { color: "#E0E0E0" },
});
