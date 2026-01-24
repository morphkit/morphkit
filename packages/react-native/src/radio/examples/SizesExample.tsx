import { useState } from "react";
import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { RadioGroup, RadioButton } from "../Radio";

export const SizesExample = () => {
  const [smallValue, setSmallValue] = useState("sm1");
  const [mediumValue, setMediumValue] = useState("md1");
  const [largeValue, setLargeValue] = useState("lg1");

  return (
    <Flex gap="lg">
      <Flex gap="sm">
        <Typography variant="subhead">Small (sm)</Typography>
        <RadioGroup value={smallValue} onChange={setSmallValue}>
          <RadioButton value="sm1" size="sm">
            <Typography variant="body">Small option 1</Typography>
          </RadioButton>
          <RadioButton value="sm2" size="sm">
            <Typography variant="body">Small option 2</Typography>
          </RadioButton>
        </RadioGroup>
      </Flex>

      <Flex gap="sm">
        <Typography variant="subhead">Medium (md) - Default</Typography>
        <RadioGroup value={mediumValue} onChange={setMediumValue}>
          <RadioButton value="md1" size="md">
            <Typography variant="body">Medium option 1</Typography>
          </RadioButton>
          <RadioButton value="md2" size="md">
            <Typography variant="body">Medium option 2</Typography>
          </RadioButton>
        </RadioGroup>
      </Flex>

      <Flex gap="sm">
        <Typography variant="subhead">Large (lg)</Typography>
        <RadioGroup value={largeValue} onChange={setLargeValue}>
          <RadioButton value="lg1" size="lg">
            <Typography variant="body">Large option 1</Typography>
          </RadioButton>
          <RadioButton value="lg2" size="lg">
            <Typography variant="body">Large option 2</Typography>
          </RadioButton>
        </RadioGroup>
      </Flex>
    </Flex>
  );
};
