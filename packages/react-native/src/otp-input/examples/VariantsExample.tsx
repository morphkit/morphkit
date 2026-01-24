import { useState } from "react";
import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { OTPInput } from "../OTPInput";

export const VariantsExample = () => {
  const [outlineValue, setOutlineValue] = useState("123");
  const [filledValue, setFilledValue] = useState("456");

  return (
    <Flex gap="lg">
      <Flex gap="xs">
        <Typography variant="caption-1">Outline</Typography>
        <OTPInput
          variant="outline"
          value={outlineValue}
          onChange={setOutlineValue}
          autoFocus={false}
        />
      </Flex>
      <Flex gap="xs">
        <Typography variant="caption-1">Filled</Typography>
        <OTPInput
          variant="filled"
          value={filledValue}
          onChange={setFilledValue}
          autoFocus={false}
        />
      </Flex>
    </Flex>
  );
};
