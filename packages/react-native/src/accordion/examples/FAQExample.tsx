import { Accordion, AccordionItem } from "../Accordion";
import { Text } from "react-native";
import { useState } from "react";

export const FAQExample = () => {
  const [activeItem, setActiveItem] = useState("");

  return (
    <Accordion
      type="single"
      value={activeItem}
      onValueChange={(value) => setActiveItem(value as string)}
    >
      <AccordionItem value="shipping" title="What are the shipping options?">
        <Text style={{ lineHeight: 20 }}>
          We offer standard (5-7 business days) and express (2-3 business days)
          shipping. Free standard shipping on orders over $50.
        </Text>
      </AccordionItem>
      <AccordionItem value="returns" title="What is your return policy?">
        <Text style={{ lineHeight: 20 }}>
          We accept returns within 30 days of purchase. Items must be unused and
          in original packaging.
        </Text>
      </AccordionItem>
      <AccordionItem value="warranty" title="Do you offer a warranty?">
        <Text style={{ lineHeight: 20 }}>
          All products come with a 1-year manufacturer warranty covering defects
          in materials and workmanship.
        </Text>
      </AccordionItem>
      <AccordionItem value="international" title="Do you ship internationally?">
        <Text style={{ lineHeight: 20 }}>
          Yes, we ship to over 50 countries worldwide. International shipping
          rates vary by destination.
        </Text>
      </AccordionItem>
    </Accordion>
  );
};
