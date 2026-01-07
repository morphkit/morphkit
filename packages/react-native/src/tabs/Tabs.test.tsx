import { render, fireEvent } from "../test-utils";
import { Text, View, StyleSheet } from "react-native";
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const TestIcon = () => <Text>Icon</Text>;

describe("Tabs", () => {
  describe("TabsContainer", () => {
    it("renders children", () => {
      const { getByText } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
        </TabsContainer>,
      );
      expect(getByText("Tab 1")).toBeTruthy();
      expect(getByText("Tab 2")).toBeTruthy();
    });

    it("provides value to context", () => {
      const { getAllByRole } = render(
        <TabsContainer value="tab2" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
        </TabsContainer>,
      );
      const triggers = getAllByRole("tab");
      expect(triggers[0].props.accessibilityState.selected).toBe(false);
      expect(triggers[1].props.accessibilityState.selected).toBe(true);
    });

    it("calls onValueChange when trigger is pressed", () => {
      const handleChange = jest.fn();
      const { getAllByRole } = render(
        <TabsContainer value="tab1" onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
        </TabsContainer>,
      );

      fireEvent.press(getAllByRole("tab")[1]);
      expect(handleChange).toHaveBeenCalledWith("tab2");
    });

    it("disables all triggers when disabled", () => {
      const { getAllByRole } = render(
        <TabsContainer value="tab1" onValueChange={() => {}} disabled>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
        </TabsContainer>,
      );
      const triggers = getAllByRole("tab");
      expect(triggers[0].props.accessibilityState.disabled).toBe(true);
      expect(triggers[1].props.accessibilityState.disabled).toBe(true);
    });

    it("supports horizontal orientation", () => {
      const { getByTestId } = render(
        <TabsContainer
          value="tab1"
          onValueChange={() => {}}
          orientation="horizontal"
        >
          <TabsList testID="tabs-list">
            <TabsTrigger value="tab1" label="Tab 1" />
          </TabsList>
        </TabsContainer>,
      );
      const tablist = getByTestId("tabs-list");
      const styles = StyleSheet.flatten(tablist.props.style);
      expect(styles.flexDirection).toBe("row");
    });

    it("supports vertical orientation", () => {
      const { getByTestId } = render(
        <TabsContainer
          value="tab1"
          onValueChange={() => {}}
          orientation="vertical"
        >
          <TabsList testID="tabs-list">
            <TabsTrigger value="tab1" label="Tab 1" />
          </TabsList>
        </TabsContainer>,
      );
      const tablist = getByTestId("tabs-list");
      const styles = StyleSheet.flatten(tablist.props.style);
      expect(styles.flexDirection).toBe("column");
    });

    it("supports line variant", () => {
      const { getAllByRole } = render(
        <TabsContainer value="tab1" onValueChange={() => {}} variant="line">
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
        </TabsContainer>,
      );
      const activeTab = getAllByRole("tab")[0];
      const styles = StyleSheet.flatten(activeTab.props.style);
      expect(styles.borderBottomWidth).toBe(2);
      expect(styles.borderBottomColor).toBeTruthy();
    });

    it("supports filled variant", () => {
      const { getAllByRole } = render(
        <TabsContainer value="tab1" onValueChange={() => {}} variant="filled">
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
        </TabsContainer>,
      );
      const activeTab = getAllByRole("tab")[0];
      const styles = StyleSheet.flatten(activeTab.props.style);
      expect(styles.backgroundColor).toBeTruthy();
    });

    it("supports pills variant", () => {
      const { getAllByRole } = render(
        <TabsContainer value="tab1" onValueChange={() => {}} variant="pills">
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
        </TabsContainer>,
      );
      const activeTab = getAllByRole("tab")[0];
      const styles = StyleSheet.flatten(activeTab.props.style);
      expect(styles.borderRadius).toBe(8);
      expect(styles.backgroundColor).toBeTruthy();
    });

    it("forwards ViewProps", () => {
      const { getByTestId } = render(
        <TabsContainer
          value="tab1"
          onValueChange={() => {}}
          testID="custom-container"
        >
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
          </TabsList>
        </TabsContainer>,
      );
      expect(getByTestId("custom-container")).toBeTruthy();
    });

    it("applies custom styles", () => {
      const customStyle = { paddingTop: 20 };
      const { getByTestId } = render(
        <TabsContainer
          value="tab1"
          onValueChange={() => {}}
          style={customStyle}
          testID="styled-container"
        >
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
          </TabsList>
        </TabsContainer>,
      );
      const container = getByTestId("styled-container");
      const styles = StyleSheet.flatten(container.props.style);
      expect(styles.paddingTop).toBe(20);
    });
  });

  describe("TabsList", () => {
    it("renders children", () => {
      const { getByText } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
        </TabsContainer>,
      );
      expect(getByText("Tab 1")).toBeTruthy();
      expect(getByText("Tab 2")).toBeTruthy();
    });

    it("has tablist accessibility role", () => {
      const { getByTestId } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList testID="tabs-list">
            <TabsTrigger value="tab1" label="Tab 1" />
          </TabsList>
        </TabsContainer>,
      );
      const tablist = getByTestId("tabs-list");
      expect(tablist.props.accessibilityRole).toBe("tablist");
    });

    it("applies horizontal layout by default", () => {
      const { getByTestId } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList testID="tabs-list">
            <TabsTrigger value="tab1" label="Tab 1" />
          </TabsList>
        </TabsContainer>,
      );
      const tablist = getByTestId("tabs-list");
      const styles = StyleSheet.flatten(tablist.props.style);
      expect(styles.flexDirection).toBe("row");
    });

    it("applies vertical layout when orientation is vertical", () => {
      const { getByTestId } = render(
        <TabsContainer
          value="tab1"
          onValueChange={() => {}}
          orientation="vertical"
        >
          <TabsList testID="tabs-list">
            <TabsTrigger value="tab1" label="Tab 1" />
          </TabsList>
        </TabsContainer>,
      );
      const tablist = getByTestId("tabs-list");
      const styles = StyleSheet.flatten(tablist.props.style);
      expect(styles.flexDirection).toBe("column");
      expect(styles.width).toBe(200);
    });

    it("forwards ViewProps", () => {
      const { getByTestId } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList testID="custom-list">
            <TabsTrigger value="tab1" label="Tab 1" />
          </TabsList>
        </TabsContainer>,
      );
      expect(getByTestId("custom-list")).toBeTruthy();
    });

    it("applies custom styles", () => {
      const customStyle = { marginBottom: 10 };
      const { getByTestId } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList style={customStyle} testID="styled-list">
            <TabsTrigger value="tab1" label="Tab 1" />
          </TabsList>
        </TabsContainer>,
      );
      const list = getByTestId("styled-list");
      const styles = StyleSheet.flatten(list.props.style);
      expect(styles.marginBottom).toBe(10);
    });

    it("throws error when used outside TabsContainer", () => {
      const consoleError = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => {
        render(
          <TabsList>
            <View />
          </TabsList>,
        );
      }).toThrow("Tabs components must be used within TabsContainer");
      consoleError.mockRestore();
    });
  });

  describe("TabsTrigger", () => {
    it("renders with label", () => {
      const { getByText } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger value="tab1" label="My Tab" />
          </TabsList>
        </TabsContainer>,
      );
      expect(getByText("My Tab")).toBeTruthy();
    });

    it("renders with icon and label", () => {
      const { getByText } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" icon={<TestIcon />} />
          </TabsList>
        </TabsContainer>,
      );
      expect(getByText("Tab 1")).toBeTruthy();
      expect(getByText("Icon")).toBeTruthy();
    });

    it("shows active state with line variant", () => {
      const { getAllByRole } = render(
        <TabsContainer value="tab1" onValueChange={() => {}} variant="line">
          <TabsList>
            <TabsTrigger value="tab1" label="Active" />
            <TabsTrigger value="tab2" label="Inactive" />
          </TabsList>
        </TabsContainer>,
      );
      const activeTab = getAllByRole("tab")[0];
      const inactiveTab = getAllByRole("tab")[1];

      const activeStyles = StyleSheet.flatten(activeTab.props.style);
      const inactiveStyles = StyleSheet.flatten(inactiveTab.props.style);

      expect(activeStyles.borderBottomWidth).toBe(2);
      expect(inactiveStyles.borderBottomWidth).toBeUndefined();
      expect(activeTab.props.accessibilityState.selected).toBe(true);
      expect(inactiveTab.props.accessibilityState.selected).toBe(false);
    });

    it("shows active state with filled variant", () => {
      const { getAllByRole } = render(
        <TabsContainer value="tab1" onValueChange={() => {}} variant="filled">
          <TabsList>
            <TabsTrigger value="tab1" label="Active" />
            <TabsTrigger value="tab2" label="Inactive" />
          </TabsList>
        </TabsContainer>,
      );
      const activeTab = getAllByRole("tab")[0];
      const inactiveTab = getAllByRole("tab")[1];

      const activeStyles = StyleSheet.flatten(activeTab.props.style);
      const inactiveStyles = StyleSheet.flatten(inactiveTab.props.style);

      expect(activeStyles.backgroundColor).toBeTruthy();
      expect(inactiveStyles.backgroundColor).toBeUndefined();
    });

    it("shows active state with pills variant", () => {
      const { getAllByRole } = render(
        <TabsContainer value="tab1" onValueChange={() => {}} variant="pills">
          <TabsList>
            <TabsTrigger value="tab1" label="Active" />
            <TabsTrigger value="tab2" label="Inactive" />
          </TabsList>
        </TabsContainer>,
      );
      const activeTab = getAllByRole("tab")[0];
      const inactiveTab = getAllByRole("tab")[1];

      const activeStyles = StyleSheet.flatten(activeTab.props.style);
      const inactiveStyles = StyleSheet.flatten(inactiveTab.props.style);

      expect(activeStyles.borderRadius).toBe(8);
      expect(inactiveStyles.borderRadius).toBe(8);
      expect(activeStyles.backgroundColor).toBeTruthy();
      expect(inactiveStyles.backgroundColor).toBeTruthy();
    });

    it("shows active state in vertical line variant", () => {
      const { getAllByRole } = render(
        <TabsContainer
          value="tab1"
          onValueChange={() => {}}
          orientation="vertical"
          variant="line"
        >
          <TabsList>
            <TabsTrigger value="tab1" label="Active" />
            <TabsTrigger value="tab2" label="Inactive" />
          </TabsList>
        </TabsContainer>,
      );
      const activeTab = getAllByRole("tab")[0];
      const activeStyles = StyleSheet.flatten(activeTab.props.style);

      expect(activeStyles.borderLeftWidth).toBe(3);
      expect(activeStyles.borderLeftColor).toBeTruthy();
    });

    it("calls onValueChange when pressed", () => {
      const handleChange = jest.fn();
      const { getByText } = render(
        <TabsContainer value="tab1" onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
        </TabsContainer>,
      );

      fireEvent.press(getByText("Tab 2"));
      expect(handleChange).toHaveBeenCalledWith("tab2");
    });

    it("can be individually disabled", () => {
      const handleChange = jest.fn();
      const { getByRole } = render(
        <TabsContainer value="tab1" onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="tab2" label="Disabled Tab" disabled />
          </TabsList>
        </TabsContainer>,
      );

      const trigger = getByRole("tab");
      fireEvent.press(trigger);
      expect(handleChange).not.toHaveBeenCalled();
      expect(trigger.props.accessibilityState.disabled).toBe(true);

      const styles = StyleSheet.flatten(trigger.props.style);
      expect(styles.opacity).toBe(0.5);
    });

    it("applies container disabled state", () => {
      const handleChange = jest.fn();
      const { getAllByRole } = render(
        <TabsContainer value="tab1" onValueChange={handleChange} disabled>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
        </TabsContainer>,
      );

      const triggers = getAllByRole("tab");
      fireEvent.press(triggers[1]);
      expect(handleChange).not.toHaveBeenCalled();

      triggers.forEach((trigger) => {
        expect(trigger.props.accessibilityState.disabled).toBe(true);
        const styles = StyleSheet.flatten(trigger.props.style);
        expect(styles.opacity).toBe(0.5);
      });
    });

    it("has tab accessibility role with selected state", () => {
      const { getAllByRole } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
        </TabsContainer>,
      );

      const triggers = getAllByRole("tab");
      expect(triggers[0].props.accessibilityRole).toBe("tab");
      expect(triggers[0].props.accessibilityState.selected).toBe(true);
      expect(triggers[1].props.accessibilityState.selected).toBe(false);
    });

    it("forwards ViewProps", () => {
      const { getByTestId } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" testID="custom-trigger" />
          </TabsList>
        </TabsContainer>,
      );
      expect(getByTestId("custom-trigger")).toBeTruthy();
    });

    it("applies custom styles", () => {
      const customStyle = { padding: 20 };
      const { getByTestId } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger
              value="tab1"
              label="Tab 1"
              style={customStyle}
              testID="styled-trigger"
            />
          </TabsList>
        </TabsContainer>,
      );
      const trigger = getByTestId("styled-trigger");
      const styles = StyleSheet.flatten(trigger.props.style);
      expect(styles.padding).toBe(20);
    });

    it("throws error when used outside TabsContainer", () => {
      const consoleError = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => {
        render(<TabsTrigger value="tab1" label="Tab 1" />);
      }).toThrow("Tabs components must be used within TabsContainer");
      consoleError.mockRestore();
    });
  });

  describe("TabsContent", () => {
    it("renders when value matches", () => {
      const { getByText } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsContent value="tab1">
            <Text>Content 1</Text>
          </TabsContent>
        </TabsContainer>,
      );
      expect(getByText("Content 1")).toBeTruthy();
    });

    it("does not render when value does not match", () => {
      const { queryByText } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsContent value="tab2">
            <Text>Content 2</Text>
          </TabsContent>
        </TabsContainer>,
      );
      expect(queryByText("Content 2")).toBeNull();
    });

    it("renders content correctly", () => {
      const { getByTestId } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsContent value="tab1" testID="tabs-content">
            <Text>Content</Text>
          </TabsContent>
        </TabsContainer>,
      );
      const content = getByTestId("tabs-content");
      expect(content).toBeTruthy();
    });

    it("forwards ViewProps", () => {
      const { getByTestId } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsContent value="tab1" testID="custom-content">
            <Text>Content</Text>
          </TabsContent>
        </TabsContainer>,
      );
      expect(getByTestId("custom-content")).toBeTruthy();
    });

    it("applies custom styles", () => {
      const customStyle = { marginTop: 30 };
      const { getByTestId } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsContent value="tab1" style={customStyle} testID="styled-content">
            <Text>Content</Text>
          </TabsContent>
        </TabsContainer>,
      );
      const content = getByTestId("styled-content");
      const styles = StyleSheet.flatten(content.props.style);
      expect(styles.marginTop).toBe(30);
    });

    it("throws error when used outside TabsContainer", () => {
      const consoleError = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => {
        render(
          <TabsContent value="tab1">
            <Text>Content</Text>
          </TabsContent>,
        );
      }).toThrow("Tabs components must be used within TabsContainer");
      consoleError.mockRestore();
    });
  });

  describe("Integration", () => {
    it("switches content when tab is pressed", () => {
      const { getByText, queryByText } = render(
        <TabsContainer value="tab1" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
          </TabsList>
          <TabsContent value="tab1">
            <Text>Content 1</Text>
          </TabsContent>
          <TabsContent value="tab2">
            <Text>Content 2</Text>
          </TabsContent>
        </TabsContainer>,
      );

      expect(getByText("Content 1")).toBeTruthy();
      expect(queryByText("Content 2")).toBeNull();
    });

    it("works with multiple tabs", () => {
      let currentValue = "tab1";
      const handleChange = (value: string) => {
        currentValue = value;
      };

      const { rerender, getByText, queryByText } = render(
        <TabsContainer value={currentValue} onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
            <TabsTrigger value="tab3" label="Tab 3" />
          </TabsList>
          <TabsContent value="tab1">
            <Text>Content 1</Text>
          </TabsContent>
          <TabsContent value="tab2">
            <Text>Content 2</Text>
          </TabsContent>
          <TabsContent value="tab3">
            <Text>Content 3</Text>
          </TabsContent>
        </TabsContainer>,
      );

      expect(getByText("Content 1")).toBeTruthy();
      expect(queryByText("Content 2")).toBeNull();
      expect(queryByText("Content 3")).toBeNull();

      fireEvent.press(getByText("Tab 2"));
      currentValue = "tab2";

      rerender(
        <TabsContainer value={currentValue} onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="tab1" label="Tab 1" />
            <TabsTrigger value="tab2" label="Tab 2" />
            <TabsTrigger value="tab3" label="Tab 3" />
          </TabsList>
          <TabsContent value="tab1">
            <Text>Content 1</Text>
          </TabsContent>
          <TabsContent value="tab2">
            <Text>Content 2</Text>
          </TabsContent>
          <TabsContent value="tab3">
            <Text>Content 3</Text>
          </TabsContent>
        </TabsContainer>,
      );

      expect(queryByText("Content 1")).toBeNull();
      expect(getByText("Content 2")).toBeTruthy();
      expect(queryByText("Content 3")).toBeNull();
    });
  });
});
