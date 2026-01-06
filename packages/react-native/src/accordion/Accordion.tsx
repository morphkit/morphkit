import { createContext, useContext, ReactNode, useEffect, useRef } from "react";
import {
  View,
  ViewProps,
  Pressable,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";

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
    throw new Error("AccordionItem must be used within Accordion");
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
  const { theme } = useTheme();

  const contextValue: AccordionContextValue = {
    value,
    onValueChange,
    type,
    collapsible,
    disabled,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <View style={[{ gap: theme.component.accordion.gap }, style]} {...props}>
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
  const { theme, colorScheme } = useTheme();
  const iconColor = theme.component.accordion.variant[colorScheme].header.icon;

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
      <Ionicons
        name="chevron-down"
        size={theme.component.accordion.iconSize}
        color={iconColor}
      />
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
  const { theme, colorScheme } = useTheme();

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const isExpanded =
    context.type === "single"
      ? context.value === value
      : (context.value as string[]).includes(value);

  const isDisabled = disabled || context.disabled;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: theme.component.accordion.duration,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim, theme.component.accordion.duration]);

  const handlePress = () => {
    if (isDisabled) return;

    if (Platform.OS !== "web") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    if (context.type === "single") {
      const newValue = isExpanded && context.collapsible ? "" : value;
      context.onValueChange(newValue);
    } else {
      const currentValues = context.value as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      context.onValueChange(newValues);
    }
  };

  const variantColors = theme.component.accordion.variant[colorScheme];

  return (
    <View
      style={[
        {
          borderRadius: theme.component.accordion.borderRadius,
          overflow: "hidden",
          borderBottomColor: variantColors.header.border,
        },
        style,
      ]}
      {...props}
    >
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.header,
          {
            backgroundColor: variantColors.header.background,
            padding: theme.component.accordion.padding,
          },
          pressed && {
            backgroundColor: variantColors.header.pressed,
          },
          isDisabled && { opacity: variantColors.disabled.opacity },
        ]}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded, disabled: isDisabled }}
        accessibilityLabel={title}
      >
        <Text
          style={[
            {
              flex: 1,
              fontSize: theme.component.accordion.header.fontSize,
              fontWeight: theme.component.accordion.header.fontWeight,
              color: variantColors.header.text,
            },
            isDisabled && { opacity: variantColors.disabled.opacity },
          ]}
        >
          {title}
        </Text>
        <ChevronIcon rotation={rotateAnim} />
      </Pressable>

      {isExpanded && (
        <View
          style={[
            {
              padding: theme.component.accordion.padding,
              backgroundColor: variantColors.content.background,
            },
          ]}
        >
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
