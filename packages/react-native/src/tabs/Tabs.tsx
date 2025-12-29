import {
  createContext,
  useContext,
  ReactNode,
  Children,
  isValidElement,
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
  PanResponder,
} from "react-native";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: "horizontal" | "vertical";
  variant: "line" | "filled" | "pills";
  disabled?: boolean;
  tabValues: string[];
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within TabsContainer");
  }
  return context;
};

export interface TabsContainerProps extends Omit<ViewProps, "children"> {
  value: string;
  onValueChange: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "line" | "filled" | "pills";
  disabled?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const TabsContainer = ({
  value,
  onValueChange,
  orientation = "horizontal",
  variant = "line",
  disabled = false,
  children,
  style,
  ...props
}: TabsContainerProps) => {
  const tabValues = useRef<string[]>([]);

  const extractTabValues = (children: ReactNode): string[] => {
    const values: string[] = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        if (child.type === TabsList) {
          const listProps = child.props as { children?: ReactNode };
          Children.forEach(listProps.children, (tabChild) => {
            if (isValidElement(tabChild) && tabChild.type === TabsTrigger) {
              const triggerProps = tabChild.props as { value?: string };
              if (triggerProps.value) {
                values.push(triggerProps.value);
              }
            }
          });
        }
      }
    });
    return values;
  };

  tabValues.current = extractTabValues(children);

  const handleSwipe = (direction: "left" | "right") => {
    if (disabled || orientation !== "horizontal") return;

    const currentIndex = tabValues.current.indexOf(value);
    if (currentIndex === -1) return;

    let newIndex = currentIndex;
    if (direction === "left" && currentIndex < tabValues.current.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === "right" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    const newValue = tabValues.current[newIndex];
    if (newIndex !== currentIndex && newValue) {
      onValueChange(newValue);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => orientation === "horizontal",
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return orientation === "horizontal" && Math.abs(gestureState.dx) > 10;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > 50) {
          if (gestureState.dx > 0) {
            handleSwipe("right");
          } else {
            handleSwipe("left");
          }
        }
      },
    }),
  ).current;

  const contextValue: TabsContextValue = {
    value,
    onValueChange,
    orientation,
    variant,
    disabled,
    tabValues: tabValues.current,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <View
        style={[
          orientation === "vertical" && styles.verticalContainer,
          style,
        ]}
        {...props}
        {...(orientation === "horizontal" ? panResponder.panHandlers : {})}
      >
        {children}
      </View>
    </TabsContext.Provider>
  );
};

export interface TabsListProps extends Omit<ViewProps, "children"> {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const TabsList = ({ children, style, ...props }: TabsListProps) => {
  const context = useTabsContext();

  return (
    <View
      style={[
        styles.tabsList,
        context.orientation === "horizontal"
          ? styles.tabsListHorizontal
          : styles.tabsListVertical,
        style,
      ]}
      accessibilityRole="tablist"
      {...props}
    >
      {children}
    </View>
  );
};

export interface TabsTriggerProps extends Omit<ViewProps, "children"> {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const TabsTrigger = ({
  value,
  label,
  icon,
  disabled = false,
  style,
  ...props
}: TabsTriggerProps) => {
  const context = useTabsContext();
  const colorScheme = useColorScheme();

  const isActive = context.value === value;
  const isDisabled = disabled || context.disabled;

  const handlePress = () => {
    if (isDisabled) return;
    context.onValueChange(value);
  };

  const colors = {
    light: {
      inactiveText: "#6B7280",
      activeText: "#4A90E2",
      primary: "#4A90E2",
      pillsInactiveBg: "#F3F4F6",
    },
    dark: {
      inactiveText: "#9CA3AF",
      activeText: "#5AA2F5",
      primary: "#5AA2F5",
      pillsInactiveBg: "#374151",
    },
  };

  const currentColors = colors[colorScheme ?? "light"];

  const getVariantStyles = (): ViewStyle => {
    if (context.variant === "line") {
      if (context.orientation === "horizontal") {
        return isActive
          ? { borderBottomWidth: 2, borderBottomColor: currentColors.primary }
          : {};
      } else {
        return isActive
          ? { borderLeftWidth: 3, borderLeftColor: currentColors.primary }
          : {};
      }
    } else if (context.variant === "filled") {
      return isActive ? { backgroundColor: currentColors.primary } : {};
    } else if (context.variant === "pills") {
      return {
        backgroundColor: isActive
          ? currentColors.primary
          : currentColors.pillsInactiveBg,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
      };
    }
    return {};
  };

  const getTextColor = (): string => {
    if (context.variant === "filled" && isActive) {
      return "#FFFFFF";
    }
    if (context.variant === "pills" && isActive) {
      return "#FFFFFF";
    }
    return isActive ? currentColors.activeText : currentColors.inactiveText;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={[
        styles.tabsTrigger,
        context.orientation === "horizontal"
          ? styles.tabsTriggerHorizontal
          : styles.tabsTriggerVertical,
        getVariantStyles(),
        isDisabled && styles.disabled,
        style,
      ]}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled: isDisabled }}
      {...props}
    >
      <View style={styles.triggerContent}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
      </View>
    </Pressable>
  );
};

export interface TabsContentProps extends Omit<ViewProps, "children"> {
  value: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const TabsContent = ({
  value,
  children,
  style,
  ...props
}: TabsContentProps) => {
  const context = useTabsContext();

  if (context.value !== value) {
    return null;
  }

  return (
    <View style={[styles.tabsContent, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  verticalContainer: {
    flexDirection: "row",
  },
  tabsList: {},
  tabsListHorizontal: {
    flexDirection: "row",
    gap: 16,
  },
  tabsListVertical: {
    flexDirection: "column",
    width: 200,
    gap: 8,
  },
  tabsTrigger: {},
  tabsTriggerHorizontal: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tabsTriggerVertical: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  triggerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.4,
  },
  tabsContent: {
    flex: 1,
    paddingTop: 16,
  },
});
