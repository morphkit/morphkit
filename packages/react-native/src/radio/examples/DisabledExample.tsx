import { useState } from "react";
import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { RadioGroup, RadioButton } from "../Radio";

export const DisabledExample = () => {
  const [individualValue, setIndividualValue] = useState("enabled1");
  const [groupValue, setGroupValue] = useState("group1");

  return (
    <Flex gap="lg">
      <Flex gap="sm">
        <Typography variant="subhead">Individual Disabled</Typography>
        <RadioGroup value={individualValue} onChange={setIndividualValue}>
          <RadioButton value="enabled1">
            <Typography variant="body">Enabled option</Typography>
          </RadioButton>
          <RadioButton value="disabled1" disabled>
            <Typography variant="body">Disabled option</Typography>
          </RadioButton>
          <RadioButton value="enabled2">
            <Typography variant="body">Another enabled option</Typography>
          </RadioButton>
        </RadioGroup>
      </Flex>

      <Flex gap="sm">
        <Typography variant="subhead">Group Disabled</Typography>
        <RadioGroup value={groupValue} onChange={setGroupValue} disabled>
          <RadioButton value="group1">
            <Typography variant="body">Option 1</Typography>
          </RadioButton>
          <RadioButton value="group2">
            <Typography variant="body">Option 2</Typography>
          </RadioButton>
          <RadioButton value="group3">
            <Typography variant="body">Option 3</Typography>
          </RadioButton>
        </RadioGroup>
      </Flex>
    </Flex>
  );
};
