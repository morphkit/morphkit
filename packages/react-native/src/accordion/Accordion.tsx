import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import {
  View,
  ViewProps,
  Pressable,
  Text,
  StyleProp,
  ViewStyle,
  useColorScheme,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AccordionContextValue {
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  type: "single" | "multiple";
  collapsible: boolean;
  disabled?: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "AccordionItem must be used within Accordion",
    );
  }
  return context;
};

export interface AccordionProps extends Omit<ViewProps, "children"> {
  type?: "single" | "multiple";
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  collapsible?: boolean;
  disabled?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Accordion = ({
  type = "single",
  value,
  onValueChange,
  collapsible = true,
  disabled = false,
  children,
  style,
  ...props
}: AccordionProps) => {
  const contextValue: AccordionContextValue = {
    value,
    onValueChange,
    type,
    collapsible,
    disabled,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <View style={[styles.accordion, style]} {...props}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps extends Omit<ViewProps, "children"> {
  value: string;
  title: string;
  children: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ChevronIcon = ({ rotation }: { rotation: Animated.Value }) => {
  const colorScheme = useColorScheme();
  const colors = {
    light: { chevron: "#6B7280" },
    dark: { chevron: "#9CA3AF" },
  };
  const currentColors = colors[colorScheme ?? "light"];

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ rotate: rotateInterpolation }],
      }}
    >
      <Ionicons name="chevron-down" size={20} color={currentColors.chevron} />
    </Animated.View>
  );
};

export const AccordionItem = ({
  value,
  title,
  children,
  disabled = false,
  style,
  ...props
}: AccordionItemProps) => {
  const context = useAccordionContext();
  const colorScheme = useColorScheme();

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const isExpanded =
    context.type === "single"
      ? context.value === value
      : (context.value as string[]).includes(value);

  const isDisabled = disabled || context.disabled;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const handlePress = () => {
    if (isDisabled) return;

    if (Platform.OS !== "web") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    if (context.type === "single") {
      const newValue =
        isExpanded && context.collapsible ? "" : value;
      context.onValueChange(newValue);
    } else {
      const currentValues = context.value as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      context.onValueChange(newValues);
    }
  };

  const colors = {
    light: {
      headerBg: "#F9FAFB",
      pressedBg: "#F3F4F6",
      border: "#E5E7EB",
      contentBg: "#FFFFFF",
      text: "#111827",
    },
    dark: {
      headerBg: "#1F2937",
      pressedBg: "#374151",
      border: "#374151",
      contentBg: "#111827",
      text: "#F9FAFB",
    },
  };

  const currentColors = colors[colorScheme ?? "light"];

  return (
    <View
      style={[
        styles.accordionItem,
        { borderBottomColor: currentColors.border },
        style,
      ]}
      {...props}
    >
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.header,
          { backgroundColor: currentColors.headerBg },
          pressed && { backgroundColor: currentColors.pressedBg },
          isDisabled && styles.disabledHeader,
        ]}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded, disabled: isDisabled }}
        accessibilityLabel={title}
      >
        <Text
          style={[
            styles.title,
            { color: currentColors.text },
            isDisabled && styles.disabledText,
          ]}
        >
          {title}
        </Text>
        <ChevronIcon rotation={rotateAnim} />
      </Pressable>

      {isExpanded && (
        <View
          style={[
            styles.content,
            { backgroundColor: currentColors.contentBg },
          ]}
        >
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    gap: 8,
  },
  accordionItem: {
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  disabledHeader: {
    opacity: 0.5,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  disabledText: {
    opacity: 0.5,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
