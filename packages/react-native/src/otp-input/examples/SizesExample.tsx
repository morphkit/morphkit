import { useState } from "react";
import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { OTPInput } from "../OTPInput";

export const SizesExample = () => {
  const [smValue, setSmValue] = useState("12");
  const [mdValue, setMdValue] = useState("34");
  const [lgValue, setLgValue] = useState("56");

  return (
    <Flex gap="lg">
      <Flex gap="xs">
        <Typography variant="caption-1">Small (sm)</Typography>
        <OTPInput
          size="sm"
          value={smValue}
          onChange={setSmValue}
          autoFocus={false}
        />
      </Flex>
      <Flex gap="xs">
        <Typography variant="caption-1">Medium (md)</Typography>
        <OTPInput
          size="md"
          value={mdValue}
          onChange={setMdValue}
          autoFocus={false}
        />
      </Flex>
      <Flex gap="xs">
        <Typography variant="caption-1">Large (lg)</Typography>
        <OTPInput
          size="lg"
          value={lgValue}
          onChange={setLgValue}
          autoFocus={false}
        />
      </Flex>
    </Flex>
  );
};
