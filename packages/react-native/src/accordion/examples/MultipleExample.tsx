import { Accordion, AccordionItem } from "../Accordion";
import { Text } from "react-native";
import { useState } from "react";

export const MultipleExample = () => {
  const [openItems, setOpenItems] = useState(["item-1"]);

  return (
    <Accordion
      type="multiple"
      value={openItems}
      onValueChange={(value) => setOpenItems(value as string[])}
    >
      <AccordionItem value="item-1" title="Account Settings">
        <Text>Manage your account information and preferences</Text>
      </AccordionItem>
      <AccordionItem value="item-2" title="Privacy & Security">
        <Text>Configure your security and privacy options</Text>
      </AccordionItem>
      <AccordionItem value="item-3" title="Notification Preferences">
        <Text>Control your notification settings</Text>
      </AccordionItem>
    </Accordion>
  );
};
