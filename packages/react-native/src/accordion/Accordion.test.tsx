import { render, fireEvent } from "@testing-library/react-native";
import { Text, StyleSheet } from "react-native";
import { Accordion, AccordionItem } from "./Accordion";

describe("Accordion", () => {
  describe("Accordion (container)", () => {
    it("renders children", () => {
      const { getByText } = render(
        <Accordion type="single" value="item1" onValueChange={() => {}}>
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(getByText("Item 1")).toBeTruthy();
      expect(getByText("Item 2")).toBeTruthy();
    });

    it("provides value to context in single mode", () => {
      const { getByText, queryByText } = render(
        <Accordion type="single" value="item2" onValueChange={() => {}}>
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(queryByText("Content 1")).toBeNull();
      expect(getByText("Content 2")).toBeTruthy();
    });

    it("single mode: only one item open at a time", () => {
      const { getByText, queryByText } = render(
        <Accordion type="single" value="item1" onValueChange={() => {}}>
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(getByText("Content 1")).toBeTruthy();
      expect(queryByText("Content 2")).toBeNull();
    });

    it("multiple mode: multiple items can be open", () => {
      const { getByText } = render(
        <Accordion
          type="multiple"
          value={["item1", "item2"]}
          onValueChange={() => {}}
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(getByText("Content 1")).toBeTruthy();
      expect(getByText("Content 2")).toBeTruthy();
    });

    it("calls onValueChange when item is pressed in single mode", () => {
      const handleChange = jest.fn();
      const { getByText } = render(
        <Accordion type="single" value="item1" onValueChange={handleChange}>
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );

      fireEvent.press(getByText("Item 2"));
      expect(handleChange).toHaveBeenCalledWith("item2");
    });

    it("calls onValueChange with array in multiple mode", () => {
      const handleChange = jest.fn();
      const { getByText } = render(
        <Accordion
          type="multiple"
          value={["item1"]}
          onValueChange={handleChange}
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );

      fireEvent.press(getByText("Item 2"));
      expect(handleChange).toHaveBeenCalledWith(["item1", "item2"]);
    });

    it("toggles item off in multiple mode", () => {
      const handleChange = jest.fn();
      const { getByText } = render(
        <Accordion
          type="multiple"
          value={["item1", "item2"]}
          onValueChange={handleChange}
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );

      fireEvent.press(getByText("Item 2"));
      expect(handleChange).toHaveBeenCalledWith(["item1"]);
    });

    it("disables all items when disabled", () => {
      const handleChange = jest.fn();
      const { getAllByRole } = render(
        <Accordion
          type="single"
          value="item1"
          onValueChange={handleChange}
          disabled
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );

      const buttons = getAllByRole("button");
      fireEvent.press(buttons[1]);
      expect(handleChange).not.toHaveBeenCalled();

      buttons.forEach((button) => {
        expect(button.props.accessibilityState.disabled).toBe(true);
      });
    });

    it("collapsible mode allows closing the only open item in single mode", () => {
      const handleChange = jest.fn();
      const { getByText } = render(
        <Accordion
          type="single"
          value="item1"
          onValueChange={handleChange}
          collapsible={true}
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );

      fireEvent.press(getByText("Item 1"));
      expect(handleChange).toHaveBeenCalledWith("");
    });

    it("non-collapsible mode keeps item open in single mode", () => {
      const handleChange = jest.fn();
      const { getByText } = render(
        <Accordion
          type="single"
          value="item1"
          onValueChange={handleChange}
          collapsible={false}
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );

      fireEvent.press(getByText("Item 1"));
      expect(handleChange).toHaveBeenCalledWith("item1");
    });

    it("defaults to single type", () => {
      const handleChange = jest.fn();
      const { getByText } = render(
        <Accordion value="item1" onValueChange={handleChange}>
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );

      fireEvent.press(getByText("Item 2"));
      expect(handleChange).toHaveBeenCalledWith("item2");
    });

    it("defaults to collapsible true", () => {
      const handleChange = jest.fn();
      const { getByText } = render(
        <Accordion type="single" value="item1" onValueChange={handleChange}>
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
        </Accordion>,
      );

      fireEvent.press(getByText("Item 1"));
      expect(handleChange).toHaveBeenCalledWith("");
    });

    it("forwards ViewProps", () => {
      const { getByTestId } = render(
        <Accordion
          type="single"
          value="item1"
          onValueChange={() => {}}
          testID="custom-accordion"
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(getByTestId("custom-accordion")).toBeTruthy();
    });

    it("applies custom styles", () => {
      const customStyle = { paddingTop: 20 };
      const { getByTestId } = render(
        <Accordion
          type="single"
          value="item1"
          onValueChange={() => {}}
          style={customStyle}
          testID="styled-accordion"
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content</Text>
          </AccordionItem>
        </Accordion>,
      );
      const accordion = getByTestId("styled-accordion");
      const styles = StyleSheet.flatten(accordion.props.style);
      expect(styles.paddingTop).toBe(20);
    });
  });

  describe("AccordionItem", () => {
    it("renders title", () => {
      const { getByText } = render(
        <Accordion type="single" value="" onValueChange={() => {}}>
          <AccordionItem value="item1" title="My Title">
            <Text>Content</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(getByText("My Title")).toBeTruthy();
    });

    it("expands when value matches in single mode", () => {
      const { getByText, getAllByRole } = render(
        <Accordion type="single" value="item1" onValueChange={() => {}}>
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(getByText("Content 1")).toBeTruthy();
      const button = getAllByRole("button")[0];
      expect(button.props.accessibilityState.expanded).toBe(true);
    });

    it("collapses when value does not match in single mode", () => {
      const { queryByText, getAllByRole } = render(
        <Accordion type="single" value="item2" onValueChange={() => {}}>
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(queryByText("Content 1")).toBeNull();
      const button = getAllByRole("button")[0];
      expect(button.props.accessibilityState.expanded).toBe(false);
    });

    it("expands when value in array in multiple mode", () => {
      const { getByText } = render(
        <Accordion
          type="multiple"
          value={["item1", "item2"]}
          onValueChange={() => {}}
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(getByText("Content 1")).toBeTruthy();
    });

    it("collapses when value not in array in multiple mode", () => {
      const { queryByText } = render(
        <Accordion
          type="multiple"
          value={["item2"]}
          onValueChange={() => {}}
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(queryByText("Content 1")).toBeNull();
    });

    it("renders children when expanded", () => {
      const { getByText } = render(
        <Accordion type="single" value="item1" onValueChange={() => {}}>
          <AccordionItem value="item1" title="Item 1">
            <Text>My Content</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(getByText("My Content")).toBeTruthy();
    });

    it("does not render children when collapsed", () => {
      const { queryByText } = render(
        <Accordion type="single" value="item2" onValueChange={() => {}}>
          <AccordionItem value="item1" title="Item 1">
            <Text>My Content</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(queryByText("My Content")).toBeNull();
    });

    it("calls onValueChange when pressed", () => {
      const handleChange = jest.fn();
      const { getByText } = render(
        <Accordion type="single" value="item1" onValueChange={handleChange}>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content</Text>
          </AccordionItem>
        </Accordion>,
      );

      fireEvent.press(getByText("Item 2"));
      expect(handleChange).toHaveBeenCalledWith("item2");
    });

    it("can be individually disabled", () => {
      const handleChange = jest.fn();
      const { getByRole } = render(
        <Accordion type="single" value="" onValueChange={handleChange}>
          <AccordionItem value="item1" title="Disabled Item" disabled>
            <Text>Content</Text>
          </AccordionItem>
        </Accordion>,
      );

      const button = getByRole("button");
      fireEvent.press(button);
      expect(handleChange).not.toHaveBeenCalled();
      expect(button.props.accessibilityState.disabled).toBe(true);
    });

    it("applies container disabled state", () => {
      const handleChange = jest.fn();
      const { getAllByRole } = render(
        <Accordion
          type="single"
          value=""
          onValueChange={handleChange}
          disabled
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );

      const buttons = getAllByRole("button");
      buttons.forEach((button) => {
        fireEvent.press(button);
        expect(button.props.accessibilityState.disabled).toBe(true);
      });
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("has button accessibility role with expanded state", () => {
      const { getAllByRole } = render(
        <Accordion type="single" value="item1" onValueChange={() => {}}>
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );

      const buttons = getAllByRole("button");
      expect(buttons[0].props.accessibilityRole).toBe("button");
      expect(buttons[0].props.accessibilityState.expanded).toBe(true);
      expect(buttons[1].props.accessibilityState.expanded).toBe(false);
    });

    it("forwards ViewProps", () => {
      const { getByTestId } = render(
        <Accordion type="single" value="" onValueChange={() => {}}>
          <AccordionItem value="item1" title="Item 1" testID="custom-item">
            <Text>Content</Text>
          </AccordionItem>
        </Accordion>,
      );
      expect(getByTestId("custom-item")).toBeTruthy();
    });

    it("applies custom styles", () => {
      const customStyle = { marginBottom: 10 };
      const { getByTestId } = render(
        <Accordion type="single" value="" onValueChange={() => {}}>
          <AccordionItem
            value="item1"
            title="Item 1"
            style={customStyle}
            testID="styled-item"
          >
            <Text>Content</Text>
          </AccordionItem>
        </Accordion>,
      );
      const item = getByTestId("styled-item");
      const styles = StyleSheet.flatten(item.props.style);
      expect(styles.marginBottom).toBe(10);
    });

    it("throws error when used outside Accordion", () => {
      const consoleError = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => {
        render(
          <AccordionItem value="item1" title="Item 1">
            <Text>Content</Text>
          </AccordionItem>,
        );
      }).toThrow("AccordionItem must be used within Accordion");
      consoleError.mockRestore();
    });
  });

  describe("Integration", () => {
    it("switches content when item is pressed in single mode", () => {
      let currentValue = "item1";
      const handleChange = (value: string | string[]) => {
        currentValue = value as string;
      };

      const { rerender, getByText, queryByText } = render(
        <Accordion type="single" value={currentValue} onValueChange={handleChange}>
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );

      expect(getByText("Content 1")).toBeTruthy();
      expect(queryByText("Content 2")).toBeNull();

      fireEvent.press(getByText("Item 2"));
      currentValue = "item2";

      rerender(
        <Accordion type="single" value={currentValue} onValueChange={handleChange}>
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
        </Accordion>,
      );

      expect(queryByText("Content 1")).toBeNull();
      expect(getByText("Content 2")).toBeTruthy();
    });

    it("works with multiple items open in multiple mode", () => {
      const { getByText, queryByText } = render(
        <Accordion
          type="multiple"
          value={["item1", "item3"]}
          onValueChange={() => {}}
        >
          <AccordionItem value="item1" title="Item 1">
            <Text>Content 1</Text>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <Text>Content 2</Text>
          </AccordionItem>
          <AccordionItem value="item3" title="Item 3">
            <Text>Content 3</Text>
          </AccordionItem>
        </Accordion>,
      );

      expect(getByText("Content 1")).toBeTruthy();
      expect(queryByText("Content 2")).toBeNull();
      expect(getByText("Content 3")).toBeTruthy();
    });
  });
});
