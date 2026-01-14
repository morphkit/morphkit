import { useState } from "react";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Accordion, AccordionItem } from "../Accordion";

export const ModesExample = () => {
  const [singleValue, setSingleValue] = useState("single-1");
  const [multipleValue, setMultipleValue] = useState<string[]>([
    "multi-1",
    "multi-2",
  ]);

  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <Typography variant="subhead">Single Mode (default)</Typography>
        <Accordion
          type="single"
          value={singleValue}
          onValueChange={(v) => setSingleValue(v as string)}
        >
          <AccordionItem value="single-1" title="First Section">
            <Typography variant="body">
              Only one section can be open at a time in single mode.
            </Typography>
          </AccordionItem>
          <AccordionItem value="single-2" title="Second Section">
            <Typography variant="body">
              Opening this section closes the other.
            </Typography>
          </AccordionItem>
        </Accordion>
      </Stack>

      <Stack gap="sm">
        <Typography variant="subhead">Multiple Mode</Typography>
        <Accordion
          type="multiple"
          value={multipleValue}
          onValueChange={(v) => setMultipleValue(v as string[])}
        >
          <AccordionItem value="multi-1" title="First Section">
            <Typography variant="body">
              Multiple sections can be open simultaneously.
            </Typography>
          </AccordionItem>
          <AccordionItem value="multi-2" title="Second Section">
            <Typography variant="body">
              This section can be open alongside others.
            </Typography>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Stack>
  );
};
