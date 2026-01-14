import { useState } from "react";
import { Typography } from "../../typography";
import { Accordion, AccordionItem } from "../Accordion";

export const BasicExample = () => {
  const [value, setValue] = useState("item-1");

  return (
    <Accordion value={value} onValueChange={(v) => setValue(v as string)}>
      <AccordionItem value="item-1" title="What is an accordion?">
        <Typography variant="body">
          An accordion is a UI pattern that allows users to expand and collapse
          content sections to manage information density.
        </Typography>
      </AccordionItem>
      <AccordionItem value="item-2" title="When should I use it?">
        <Typography variant="body">
          Use accordions when you have multiple sections of content that users
          may not need to see all at once.
        </Typography>
      </AccordionItem>
    </Accordion>
  );
};
