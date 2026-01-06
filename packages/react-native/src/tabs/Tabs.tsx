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
  StyleProp,
  ViewStyle,
  StyleSheet,
  PanResponder,
} from "react-native";
import { useTheme } from "../theme";
import { Typography } from "../typography";

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
        style={[orientation === "vertical" && styles.verticalContainer, style]}
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
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.tabsList,
        context.orientation === "horizontal"
          ? {
              flexDirection: "row",
              gap: theme.component.tabs.horizontal.gap,
            }
          : {
              flexDirection: "column",
              width: theme.component.tabs.width.vertical,
              gap: theme.component.tabs.gap,
            },
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
  const { theme, colorScheme } = useTheme();

  const isActive = context.value === value;
  const isDisabled = disabled || context.disabled;

  const handlePress = () => {
    if (isDisabled) return;
    context.onValueChange(value);
  };

  const variantColors = theme.component.tabs.variant[colorScheme];

  const getVariantStyles = (): ViewStyle => {
    if (context.variant === "line") {
      if (context.orientation === "horizontal") {
        return isActive
          ? {
              borderBottomWidth: theme.component.tabs.borderWidth.line,
              borderBottomColor: variantColors.tab.active.border,
            }
          : {};
      } else {
        return isActive
          ? {
              borderLeftWidth: theme.component.tabs.borderWidth.lineVertical,
              borderLeftColor: variantColors.tab.active.border,
            }
          : {};
      }
    } else if (context.variant === "filled") {
      return isActive
        ? { backgroundColor: variantColors.tab.active.background }
        : {};
    } else if (context.variant === "pills") {
      return {
        backgroundColor: isActive
          ? variantColors.tab.active.background
          : variantColors.tab.inactive.background,
        borderRadius: theme.component.tabs.borderRadius,
        paddingHorizontal: theme.component.tabs.pill.paddingHorizontal,
        paddingVertical: theme.component.tabs.pill.paddingVertical,
      };
    }
    return {};
  };

  const getTextColor = (): string => {
    if (context.variant === "filled" && isActive) {
      return variantColors.filled.text;
    }
    if (context.variant === "pills" && isActive) {
      return variantColors.pills.text;
    }
    return isActive
      ? variantColors.tab.active.text
      : variantColors.tab.inactive.text;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={[
        styles.tabsTrigger,
        context.orientation === "horizontal"
          ? {
              paddingVertical: theme.component.tabs.padding,
              paddingHorizontal:
                theme.component.tabs.horizontal.paddingHorizontal,
            }
          : {
              paddingVertical: theme.component.tabs.vertical.paddingVertical,
              paddingHorizontal: theme.component.tabs.padding,
            },
        getVariantStyles(),
        isDisabled && { opacity: variantColors.disabled.opacity },
        style,
      ]}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled: isDisabled }}
      {...props}
    >
      <View style={styles.triggerContent}>
        {icon && (
          <View style={{ marginRight: theme.component.tabs.iconMargin }}>
            {icon}
          </View>
        )}
        <Typography
          variant="body"
          style={{
            fontWeight: theme.component.tabs.label.fontWeight,
            color: getTextColor(),
          }}
        >
          {label}
        </Typography>
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
  const { theme } = useTheme();

  if (context.value !== value) {
    return null;
  }

  return (
    <View
      style={[
        { flex: 1, paddingTop: theme.component.tabs.content.paddingTop },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  verticalContainer: {
    flexDirection: "row",
  },
  tabsList: {},
  tabsTrigger: {},
  triggerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
