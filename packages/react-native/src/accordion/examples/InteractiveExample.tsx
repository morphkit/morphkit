import { useState } from "react";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Accordion, AccordionItem } from "../Accordion";

export const InteractiveExample = () => {
  const [value, setValue] = useState("");
  const [nonCollapsibleValue, setNonCollapsibleValue] = useState("always-1");

  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <Typography variant="subhead">Disabled States</Typography>
        <Accordion value={value} onValueChange={(v) => setValue(v as string)}>
          <AccordionItem value="enabled-1" title="Enabled Item">
            <Typography variant="body">
              This item can be expanded and collapsed normally.
            </Typography>
          </AccordionItem>
          <AccordionItem value="disabled-1" title="Disabled Item" disabled>
            <Typography variant="body">
              This content is not accessible because the item is disabled.
            </Typography>
          </AccordionItem>
        </Accordion>
      </Stack>

      <Stack gap="sm">
        <Typography variant="subhead">Non-Collapsible</Typography>
        <Accordion
          value={nonCollapsibleValue}
          onValueChange={(v) => setNonCollapsibleValue(v as string)}
          collapsible={false}
        >
          <AccordionItem value="always-1" title="Always One Open">
            <Typography variant="body">
              With collapsible=false, at least one item must remain expanded.
            </Typography>
          </AccordionItem>
          <AccordionItem value="always-2" title="Try Closing Both">
            <Typography variant="body">
              You cannot close the last remaining open item.
            </Typography>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Stack>
  );
};
