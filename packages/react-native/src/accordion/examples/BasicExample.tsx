import { Accordion, AccordionItem } from "../Accordion";
import { Text } from "react-native";
import { useState } from "react";

export const BasicExample = () => {
  const [activeItem, setActiveItem] = useState("item-1");

  return (
    <Accordion
      type="single"
      value={activeItem}
      onValueChange={(value) => setActiveItem(value as string)}
    >
      <AccordionItem value="item-1" title="What is React Native?">
        <Text>
          React Native is a framework for building native mobile apps using
          React.
        </Text>
      </AccordionItem>
      <AccordionItem value="item-2" title="How do I get started?">
        <Text>Follow our quickstart guide to create your first app.</Text>
      </AccordionItem>
      <AccordionItem value="item-3" title="Is it production ready?">
        <Text>
          Yes, React Native is used by many major companies in production.
        </Text>
      </AccordionItem>
    </Accordion>
  );
};
